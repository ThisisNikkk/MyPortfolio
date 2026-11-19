export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: "AI Agents" | "React Native" | "Next.js" | "Engineering";
  tags: string[];
  featured?: boolean;
  coverImage?: string;
  badge?: string; // e.g. "Featured", "Hot", "Deep Dive", "Interactive", "Architecture", "Performance"
  takeaways?: string[];
  content?: string;
}

export const blogCategories = [
  "All",
  "AI Agents",
  "React Native",
  "Next.js",
  "Engineering",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export const allTags = [
  "AI Agents",
  "Voice AI",
  "React Native",
  "Expo",
  "Next.js",
  "Vapi",
  "Gemini",
  "MCP",
  "Design Systems",
  "Spring Physics",
  "TypeScript",
  "Turbopack",
  "RAG",
  "Firebase",
] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: "building-prepai-voice-ai-interviews-nextjs-vapi",
    title: "How I Built PrepAI: Voice-Driven AI Interviews with Next.js and Vapi",
    description:
      "A deep dive into PrepAI, a mock interview platform where you talk to an AI interviewer in real time. How Vapi, Gemini, Firebase, and Next.js 16 fit together, plus the architectural bugs and speed optimizations along the way.",
    date: "19 Nov 2026",
    readTime: "9 min read",
    category: "AI Agents",
    badge: "Deep Dive",
    featured: true,
    coverImage: "/prepai-vector-card.jpg",
    tags: ["Next.js", "Vapi", "Voice AI", "Gemini", "Firebase", "TypeScript"],
    takeaways: [
      "Vapi handles live WebRTC voice transport, so the server only intervenes for generator tool calls and post-call scoring",
      "Two-assistant state machine: one agent collects interview parameters, the second conducts live Q&A with conversational pauses",
      "Structured output with Zod guarantees strict 0-100 rubric evaluations across 5 core dimensions without parsing errors",
      "React cache() and session deduplication eliminate duplicate auth queries between Next.js layouts and page components",
      "Optimized Firestore queries cut dashboard lookups from an N+1 cascade down to a single batch map and count aggregations",
    ],
    content: `Every interview my voice agent generated came back with five empty fields. Role, type, level, tech stack, question count: all blank. The AI had asked for each one out loud, the candidate had answered, and my server received nothing.

The cause was a single wrong property name in the webhook payload. But fixing that bug only makes sense once you understand how the pieces of PrepAI talk to each other under strict real-time latency budgets.

PrepAI is a mock interview platform where you talk to an AI interviewer over a real voice call. This post walks through how the system is architected, the real bugs encountered, and the performance optimizations that made navigation and calls feel immediate.

### What PrepAI does

The workflow consists of four steps:

1. **Parameter Gathering:** You tell a voice agent your target role, experience level, tech stack, and question count, and it builds a tailored question set.
2. **Live Interview Session:** A second voice agent conducts the interview live, asking questions naturally and handling conversational pauses.
3. **Structured Evaluation:** When the call ends, the transcript is scored from 0 to 100 across five categories: Communication Skills, Technical Knowledge, Problem Solving, Cultural Fit, and Confidence & Clarity. You also get concrete strengths and areas for improvement.
4. **Performance Dashboard:** A dashboard tracks your scores, interview history, and category trends over time.

The stack:

- **Next.js 16 (App Router)** with React 19 and TypeScript
- **Vapi** for WebRTC voice transport, paired with Deepgram Nova 2 for speech-to-text, ElevenLabs for voice synthesis, and GPT-4 as the conversational model
- **The Vercel AI SDK with Google Gemini** for dynamic question generation and rubric scoring
- **Firebase Auth, Firebase Admin, and Firestore** for session management and persistence
- **Tailwind CSS v4 and shadcn/ui** for UI architecture

### How the pieces fit together

Vapi runs the live voice call, which means I don't need to manage custom WebRTC audio infrastructure myself. The browser initiates a call through the Vapi client SDK, and Vapi handles audio transcription, language model reasoning, and speech synthesis.

My server gets involved at two points only: when the generator agent invokes a tool to write the interview, and when a call ends and the transcript needs scoring.

\`\`\`
Browser (Agent component)
   |  vapi.start(assistant, variableValues)
   v
Vapi cloud: Deepgram Nova 2 (STT) -> GPT-4 -> ElevenLabs (TTS)
   |                                   |
   | transcript events                 | tool call: generateInterview
   v                                   v
Browser buffers the transcript     POST /api/vapi/generate
   |                                   |  Gemini writes the questions
   | call ends                         v
   v                               Firestore (interviews)
createFeedback() server action
   |  Gemini scores the transcript
   v
Firestore (feedback) -> /interview/[id]/feedback
\`\`\`

### Two assistants, one component

In Vapi, an assistant is a declarative configuration object: which speech-to-text engine to use, which voice, which model, the system prompt, and the tools it can invoke. PrepAI defines two assistants:

- **The Generator:** Gathers the candidate's target role, focus, seniority level, tech stack, and question count, then calls a function tool.
- **The Interviewer:** Receives the generated questions as template variables and conducts the live interview.

Here is the generator assistant configuration:

\`\`\`typescript
export const generator: CreateAssistantDTO = {
  name: "Interview Generator",
  transcriber: { provider: "deepgram", model: "nova-2", language: "en" },
  voice: { provider: "11labs", voiceId: "sarah" },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      { role: "system", content: "Gather: role, focus, level, techstack, amount..." },
    ],
    tools: [
      {
        type: "function",
        server: { url: \`\${process.env.NEXT_PUBLIC_APP_URL}/api/vapi/generate\` },
        function: {
          name: "generateInterview",
          parameters: { /* role, type, level, techstack, amount, userid */ },
        },
      },
      { type: "endCall" },
    ],
  },
};
\`\`\`

Two details matter here. First, the user's ID is passed in through \`variableValues\`, and the system prompt explicitly instructs the model never to ask the candidate for it:

\`\`\`typescript
await vapi.start(generator, {
  variableValues: { username: userName, userid: userId },
});
\`\`\`

Second, \`NEXT_PUBLIC_APP_URL\` must be publicly reachable from the outside. The tool call originates from Vapi's cloud infrastructure, so \`localhost\` won't resolve.

The interviewer assistant receives its questions the same way: a formatted list injected into a \`{{questions}}\` placeholder in its system prompt:

\`\`\`typescript
const formattedQuestions = questions.map((q) => \`- \${q}\`).join("\\n");

await vapi.start(interviewer, {
  variableValues: { questions: formattedQuestions },
});
\`\`\`

Both assistants run through a single client component, \`Agent.tsx\`, driven by a discrete state machine:

\`\`\`typescript
enum CallStatus {
  INACTIVE = "INACTIVE",     // Ready to start
  CONNECTING = "CONNECTING", // WebRTC handshake in progress
  ACTIVE = "ACTIVE",         // Live duplex voice call
  FINISHED = "FINISHED",     // Call ended
}
\`\`\`

It listens to Vapi events in a \`useEffect\`: \`call-start\` transitions to \`ACTIVE\`, \`call-end\` transitions to \`FINISHED\`, and \`speech-start\` / \`speech-end\` drive speaking animations.

After a call ends, the generator redirects to \`/my-interviews\`, while the interviewer passes the accumulated transcript to a \`createFeedback()\` server action. That scoring step takes 8 to 17 seconds, so \`Agent\` maintains an \`isScoring\` state to keep the UI responsive and prevent duplicate submissions.

### The bug: one wrong property name

The generator's tool points at \`/api/vapi/generate\`. In Vapi's webhook payload, the tool call lives at \`body.message.toolCallList[0]\`.

The original code read \`toolCall.parameters\`. That property doesn't exist on Vapi's \`ToolCall\` type, which provides \`id\`, \`type\`, and \`function\`. Every field was returning undefined. The fix reads \`toolCall.function.arguments\`, which is a JSON string:

\`\`\`typescript
const toolCall = body.message.toolCallList[0];

// Fixed: function.arguments is a serialized JSON string
const args = JSON.parse(toolCall.function.arguments);
\`\`\`

The same route handles missing details conversationally. If the model calls the function without a role or level, the route returns an instructional error string:

\`\`\`typescript
if (missing.length > 0) {
  return Response.json({
    results: [
      {
        toolCallId: toolCall.id,
        result: \`Missing required detail: \${missing.join(", ")}. Ask the candidate for it and call the function again.\`,
      },
    ],
  });
}
\`\`\`

Because Vapi returns this string straight back to the model, an error message doubles as an instruction: the agent asks the candidate again and retries automatically.

### The interviewer that couldn't hang up

The second bug was quieter. The interviewer would say goodbye and then stay on the line indefinitely.

The cause was a missing \`{ type: "endCall" }\` entry in its tool configuration. In Vapi, that is the Hang Up tool: the model decides the conversation has concluded, invokes it, and Vapi terminates the WebRTC stream. Without this tool, the model had no mechanism to disconnect. Adding it, along with a prompt instruction to invoke \`endCall\` immediately following the goodbye, resolved the issue.

### Voice prompt design & input normalization

Generating questions for voice requires different rules than text. Questions are spoken aloud, so the prompt enforces specific audio constraints:

- One question per turn, no multi-part questions
- Answerable in one to three minutes of speaking
- No code snippets or complex syntax
- Technology names written phonetically: "Node js" instead of "Node.js"
- Calibrated difficulty matching junior, mid, or senior tiers

Spoken user input also requires normalization. When asked for interview focus, a candidate might say "both", "a bit of everything", or "balanced". A small normalizer maps conversational language into predictable enum values:

\`\`\`typescript
export const normalizeFocus = (type: unknown): Focus => {
  const raw = String(type ?? "").toLowerCase();
  if (/mix|both|combination|balanced/.test(raw)) return "Mixed";
  if (/behaviou?r|soft skill|situational/.test(raw)) return "Behavioral";
  if (/technical|tech|coding|engineering/.test(raw)) return "Technical";
  return "Mixed";
};
\`\`\`

Question counts get clamped between 3 and 15 (defaulting to 5) to prevent accidental marathon sessions if a spoken number is misheard.

### Structured evaluation with Gemini

Feedback scoring uses the Vercel AI SDK paired with a strict Zod schema:

\`\`\`typescript
export const feedbackSchema = z.object({
  totalScore: z.number().min(0).max(100),
  categoryScores: z.array(
    z.object({
      name: z.enum([
        "Communication Skills",
        "Technical Knowledge",
        "Problem Solving",
        "Cultural Fit",
        "Confidence & Clarity",
      ]),
      score: z.number().min(0).max(100),
      comment: z.string(),
    })
  ),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  finalAssessment: z.string(),
});
\`\`\`

Enforcing structured output guarantees a valid JSON shape matching our interface, completely eliminating brittle regex parsing.

Because transcript scoring takes 8 to 17 seconds, we configure the route timeout explicitly:

\`\`\`typescript
export const maxDuration = 60;
\`\`\`

Without this, serverless runtimes kill the scoring action mid-flight. Both question generation and evaluation share a single model constant (\`gemini-3.6-flash\`), ensuring model updates remain a one-line change.

### Auth: trading an ID token for a session cookie

The App Router structures auth using two route groups: \`(auth)\` wraps sign-in and sign-up, while \`(root)\` wraps protected pages.

Firebase Auth runs on the client only long enough to produce an ID token. That token is immediately sent to a server action, which exchanges it for an HTTP-only session cookie via Firebase Admin:

\`\`\`typescript
const SESSION_DURATION = 60 * 60 * 24 * 7; // 1 week

cookieStore.set("session", sessionCookie, {
  maxAge: SESSION_DURATION,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  sameSite: "lax",
});
\`\`\`

To eliminate duplicate session lookups between layouts and pages, we wrap \`getCurrentUser()\` in React's \`cache()\`:

\`\`\`typescript
export const getCurrentUser = cache(async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
  const userRecord = await db.collection("users").doc(decodedClaims.uid).get();
  return { ...userRecord.data(), id: userRecord.id } as User;
});
\`\`\`

React resets this cache per request. Layout and page components now share a single session verification instead of hitting Firebase Admin twice.

Next.js 16's \`proxy.ts\` handles fast route gating by verifying cookie presence before navigation, while the server component layout performs the cryptographic check.

### Firestore: eliminating the N+1 query

There are three collections: \`users\`, \`interviews\`, and \`feedback\`.

Early on, the dashboard suffered an N+1 query pattern: it fired 1 query for the interview list, then 6 additional queries to look up feedback per card.

We refactored this into a single batch query that constructs an in-memory \`Map<interviewId, Feedback>\`, handing each card its feedback object up front.

For metrics, rather than downloading document sets to count them with \`.length\`, we use Firestore's \`count()\` aggregation queries, drastically reducing index read costs.

### Making navigation feel instant

Every protected route has a dedicated \`loading.tsx\` that renders a skeleton matching the final page layout rather than a generic spinner. Skeletons tell users what layout is arriving, preventing visual jump when content streams in.

Radar score breakdowns and historical trends use server-rendered pure SVGs with native tooltip elements, shipping zero client-side charting libraries.

Here is how the performance optimizations add up:

| Optimization | Before | After |
|---|---|---|
| Session verification per navigation | 2 (layout + page) | 1 (React \`cache()\`) |
| Feedback queries on /my-interviews | 7 queries (N+1) | 1 batch query |
| Dashboard metric counts | Download all documents | Firestore \`count()\` aggregation |
| Charting footprint | Client charting library | Zero-JS Server SVG |
| Tab transitions | Full server render wait | Instant skeleton layout |

### Key engineering takeaways

1. **Verify Webhook Payloads First:** Log raw request bodies before writing handlers against third-party voice SDKs.
2. **Conversation-Driven Tool Errors:** Returning clear error messages in tool results lets models re-prompt candidates conversationally.
3. **Voice Prompts Require Audio Constraints:** Keep questions concise, single-part, and phonetically spelled.
4. **Deduplicate Server Work:** Wrap session resolvers in React \`cache()\` and batch database lookups to keep page transitions under 100ms.
5. **Always Supply \`endCall\`:** Voice agents need a programmatic mechanism to conclude conversations when the goodbye is spoken.`,
  },
];
