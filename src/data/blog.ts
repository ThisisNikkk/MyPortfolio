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
  "Distributed Systems",
  "CAP Theorem",
  "Databases",
  "Consistency",
  "Engineering",
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
  {
    slug: "cap-theorem-explained",
    title: "CAP Theorem Explained: Why 'Pick Two' Is Misleading",
    description:
      "Why 'pick two' is a myth, told through an exclusive sneaker drop. How network splits cause double-selling, why quorums prevent stale reads, and how real databases handle the split.",
    date: "21 Nov 2026",
    readTime: "6 min read",
    category: "Engineering",
    badge: "Deep Dive",
    featured: false,
    tags: ["Distributed Systems", "CAP Theorem", "Databases", "Consistency", "Engineering"],
    takeaways: [
      "Consistency in CAP means linearizability (no stale reads across any counter), while availability requires every live node to return a non-error response.",
      "Partitions are physical network realities, not architectural toggles: the real trade-off is choosing between consistency or availability when a split occurs.",
      "The choice is made per-operation: modern distributed databases allow tuning consistency and availability knobs rather than forcing a rigid binary label.",
    ],
    content: `You have almost certainly seen the famous triangle: **Consistency**, **Availability**, and **Partition Tolerance**, with a bold caption instructing you to *"Pick Two"*. It shows up in system design interviews, in database marketing slides, and across endless debates on SQL versus NoSQL.

It makes a memorable slide, but it is a misleading mental model.

Eric Brewer, who originally formulated the conjecture at PODC in 2000, clarified in his 2012 retrospective that the "2 of 3" framing was always an oversimplification. You do not get to pick partition tolerance—the laws of physics and network hardware pick it for you. 

To understand why, let's put aside consensus algorithms, Raft heartbeats, and database shards for a moment. Instead, let's step into an exclusive sneaker boutique on the night of the biggest drop of the year.

---

### Act 1: The Solo Hustle (Single-Node System)

You open a boutique sneaker store called **The Vault**, specializing in ultra-rare collector kicks.

In the early days, you run the entire shop yourself:
- You stand behind a single wooden counter with one cash register.
- Behind you rests a physical leather-bound **Ledger Book** listing every sneaker in stock, its size, and whether it has been sold.

When a customer walks in and asks: *"Do you have the Nike Dunk Lows in size 10?"*, the workflow is seamless:
1. You flip open the ledger.
2. You see \`Dunk Low Size 10 — IN STOCK (Qty: 1)\`.
3. The customer hands you \\$300.
4. You scratch out \`IN STOCK\`, write \`SOLD\`, hand over the shoebox, and slide the cash into the drawer.

Because there is only **one person** and **one ledger**, your shop is flawless:
- **Consistent:** Every read sees the latest write. No sneaker can ever be sold twice.
- **Available:** As long as you are standing behind the counter, every customer who walks in gets an immediate answer.

---

### Act 2: Scaling Up (The VIP Lounge)

Business explodes. Celebrity athletes, collectors, and hypebeasts are lining up around the block. You are losing customers because the line is moving too slowly, and whenever you step out for lunch, the whole store grinds to a halt.

You decide to scale out your operation horizontally:
1. You build a soundproof **VIP Lounge** at the back of the store for private buyers.
2. You hire your friend Alex to run the VIP Lounge while you manage the **Main Front Counter**.
3. Alex gets their own checkout register and their own separate **Ledger Book**.
4. Both of you share the same inventory pool stored in the central backroom warehouse.

Customers can now check out from either the Front Counter or the VIP Lounge. Throughput doubles overnight.

---

### Act 3: The Travis Scott Disaster (The First Stale Read)

On Friday night, you host a drop for the most hyped sneaker in the world: the **Travis Scott Air Jordan 1 Reverse Mocha**. You have exactly **one pair** left in size 10.

Here is what happens at 8:02 PM:

- **At the VIP Lounge:** A high-profile rapper walks in and tells Alex: *"I want the Reverse Mocha size 10."* Alex opens their ledger, sees it marked \`IN STOCK\`, accepts \\$1,500, marks their ledger as \`SOLD\`, and prepares the bag.
- **At the Front Counter (30 seconds later):** A sneaker collector rushes up to your desk: *"Do you still have the Reverse Mocha size 10?!"*
- You open your ledger. Because nobody told your ledger book about Alex's sale, your book still says: \`Reverse Mocha Size 10 — IN STOCK (Qty: 1)\`.
- You smile: *"You're in luck! Last pair!"* You swipe their card for \\$1,500, mark your ledger \`SOLD\`, and walk into the backroom to grab the shoebox.

In the backroom, you bump into Alex holding the exact same shoebox.

Two customers have just paid \\$1,500 for the identical, irreplaceable pair of sneakers. One of them is going to leave your store furious, threatening a lawsuit on Instagram.

What went wrong? Your distributed system suffered from a **stale read**. Your store had **lost Consistency**.

---

### Act 4: The Walkie-Talkie Protocol (Synchronous Replication)

Determined never to repeat that nightmare, you and Alex create a strict protocol:

> *"From now on, whenever either of us receives an offer to buy a shoe, before taking the customer's money and before marking our ledger, we must pick up the store walkie-talkie, call the other person, and wait for confirmation.*
> 
> *Only when both ledgers are simultaneously updated do we swipe the card and hand over the box."*

Now, when a buyer at the VIP Lounge wants a shoe:
1. Alex picks up the walkie-talkie: *"Checking out Reverse Mocha size 10. Can I claim it?"*
2. You check your ledger: *"Confirmed. Marking it SOLD on my end now."*
3. Alex marks their ledger \`SOLD\`.
4. Alex completes the transaction with the customer.

Does this work? **Yes.** Reads and writes are now globally synchronized (linearizable). Neither desk can sell a shoe the other desk has already claimed.

The trade-off? **Latency.** Every sale now takes 15 extra seconds of walkie-talkie coordination. But your data is consistent.

---

### Act 5: The Thunderstorm (The Network Partition)

Then comes Saturday evening. A violent thunderstorm rolls in over the city.

A lightning strike knocks out a power transformer outside. The store's primary lights flicker off, backup battery lights kick on, and a massive electromagnetic surge fries the walkie-talkie base station. 

The heavy steel fire-doors between the Main Storefront and the VIP Lounge automatically slam shut and lock for safety. 

**You and Alex cannot see each other, cannot talk to each other, and cannot reach each other's ledgers.**

A few seconds later, a customer runs up to your counter with cash in hand:

> *"I see the Off-White Air Force 1s on display! Here is \\$1,200 cash. Sell it to me right now!"*

You look at your ledger. It says \`IN STOCK\`. But you cannot reach Alex over the radio to verify whether they just sold it in the VIP lounge five seconds ago.

You now face an unavoidable dilemma. You have exactly two choices:

#### Choice 1: Prioritize Consistency (The "CP" Path)
You tell the customer: *"I am terribly sorry. Our internal inventory sync line is down. Because I cannot verify if the VIP lounge has sold this pair, store policy forbids me from completing this sale. Please wait until the storm clears."*

- **Result:** You refused a valid request. Your store is **Unavailable**.
- **The Guarantee:** You protect the store from ever double-selling a shoe. Your system remains **100% Consistent**.

#### Choice 2: Prioritize Availability (The "AP" Path)
You take the customer's \\$1,200 cash, mark your ledger \`SOLD\`, and hand them the shoebox.

- **Result:** The customer walks out happy. Your store remained **Available**.
- **The Risk:** What if Alex did the exact same thing in the VIP lounge two minutes ago? When the doors unlock and the ledgers are compared, you may discover you sold the same sneaker twice. You sacrificed **Consistency**.

---

### Why You Cannot "Pick Two"

Now step back and ask the critical question:

**Could you have chosen "CA" (Consistency and Availability together)?**

To choose CA during the storm, you would need to magically complete the sale *and* guarantee that Alex didn't sell the same shoe, all while the walkie-talkie is dead and the steel doors are locked. 

That is mathematically and physically impossible. 

The storm (the **Network Partition**) was not a feature you opted into. It was an environmental failure inflicted upon your infrastructure. 

\`\`\`text
 Client at Front Desk               Client at VIP Lounge
         |                                   |
      +------+      walkie-talkie        +------+
      | Your |  -------  DEAD  --------  | Alex |
      | Desk |          (Split)          | Desk |
      |  N1  |                           |  N2  |
      +------+                           +------+
\`\`\`

As Eric Brewer summarized in his 2012 retrospective:
> *"The '2 of 3' view of CAP is misleading because you do not get to choose Partition Tolerance. You can only choose between Consistency and Availability **when a partition occurs**."*

When the network is healthy (which is 99.9% of the time), you get **both** Consistency and Availability. When the network splits, you must choose how your system degrades.

---

### The Three Letters, Precisely

To reason about distributed systems without getting confused by marketing jargon, we must use the exact definitions from Seth Gilbert and Nancy Lynch's formal 2002 MIT proof:

- **Consistency (Linearizability / Atomic Consistency):** Every read operation must return the value of the most recent write, or throw an explicit error. The distributed system behaves as if there is only one single copy of the data updated instantaneously.  
  *(Crucial note: This is NOT the "C" in ACID database transactions. ACID's consistency means preserving schema invariants, like a balance never dropping below zero or foreign keys remaining valid. CAP consistency is strictly linearizability).*
- **Availability:** Every non-failing node must return a non-error response to every request it receives.  
  *(Crucial note: This is NOT your SLA uptime like "99.99%". A node that takes 45 seconds to answer still counts as available under CAP. But a node that quickly returns HTTP 503, an error code, or "Quorum Lost" counts as an availability failure).*
- **Partition Tolerance:** The network is permitted to drop, delay, or duplicate an arbitrary number of messages between nodes without causing the system to crash.

---

### The Gilbert & Lynch Proof in One Diagram

Take two nodes, $N_1$ and $N_2$. Both hold a variable \`x\` initialized to \`0\`. A network partition cuts the wire between them.

\`\`\`text
 Client A: write(x = 1)           Client B: read(x)
        |                                |
     +------+     wire is severed    +------+
     |  N1  |  --------  X  -------  |  N2  |
     | x=1  |                        | x=0  |
     +------+                        +------+
\`\`\`

1. Client A sends \`write(x = 1)\` to $N_1$. $N_1$ updates its local storage to \`1\`.
2. $N_1$ tries to replicate the new value to $N_2$, but every message is dropped.
3. Client B immediately sends \`read(x)\` to $N_2$.
4. **The conflict:**
   - If $N_2$ answers immediately with \`x = 0\`, it preserves **Availability**, but violates **Linearizability** (Client B did not see the write that already finished).
   - If $N_2$ waits for the message or returns an error, it preserves **Consistency**, but violates **Availability** (a live node failed to answer).

Gilbert and Lynch proved that in any asynchronous network where messages can be delayed or lost, no algorithm can guarantee both properties simultaneously.

---

### Watching It Happen: A Runnable TypeScript Simulation

To see the mechanics in action, here is a complete, executable simulation of a 3-node distributed inventory cluster. 

In **CP mode**, a node requires a **majority quorum** ($2 \\text{ of } 3$ nodes) to accept writes or serve reads. An isolated minority node will refuse operations. In **AP mode**, nodes answer immediately from their local view and reconcile later via Last-Write-Wins timestamps.

You can test this directly with \`npx tsx cap-sim.ts\`:

\`\`\`typescript
type ClusterMode = "CP" | "AP";

interface InventoryRecord {
  item: string;
  status: "IN_STOCK" | "SOLD";
  timestamp: number;
}

class StoreNode {
  constructor(
    public name: string,
    public records: Map<string, InventoryRecord> = new Map()
  ) {}
}

class SneakerCluster {
  private nodes: Map<string, StoreNode> = new Map();
  private isolatedNodes: Set<string> = new Set();
  private logicalClock = 0;

  constructor(private mode: ClusterMode, nodeNames: string[]) {
    for (const name of nodeNames) {
      const node = new StoreNode(name);
      node.records.set("travis-scott-10", {
        item: "Travis Scott Jordan 1 (Size 10)",
        status: "IN_STOCK",
        timestamp: 0,
      });
      this.nodes.set(name, node);
    }
  }

  // Simulate network split isolating specific nodes
  splitNetwork(...cutOffNames: string[]) {
    cutOffNames.forEach((n) => this.isolatedNodes.add(n));
  }

  healNetwork() {
    this.isolatedNodes.clear();
  }

  private canCommunicate(from: string, to: string): boolean {
    const fromIsolated = this.isolatedNodes.has(from);
    const toIsolated = this.isolatedNodes.has(to);
    return fromIsolated === toIsolated;
  }

  sellItem(targetNode: string, sku: string): { ok: boolean; message: string } {
    this.logicalClock++;
    const node = this.nodes.get(targetNode);
    if (!node) throw new Error("Node not found");

    const reachableNodes = Array.from(this.nodes.keys()).filter((n) =>
      this.canCommunicate(targetNode, n)
    );

    if (this.mode === "CP") {
      const majority = Math.floor(this.nodes.size / 2) + 1; // 2 out of 3
      if (reachableNodes.length < majority) {
        return {
          ok: false,
          message: \`[CP_REJECT] Node \${targetNode} cannot reach quorum (\${reachableNodes.length}/\${majority} live). Transaction blocked to prevent double-spending.\`,
        };
      }

      // Quorum achieved: replicate to all reachable nodes
      reachableNodes.forEach((n) => {
        this.nodes.get(n)!.records.set(sku, {
          item: "Travis Scott Jordan 1 (Size 10)",
          status: "SOLD",
          timestamp: this.logicalClock,
        });
      });
      return { ok: true, message: \`[CP_SUCCESS] Sold on quorum (\${reachableNodes.join(", ")})\` };
    } else {
      // AP Mode: accept write locally regardless of network isolation
      node.records.set(sku, {
        item: "Travis Scott Jordan 1 (Size 10)",
        status: "SOLD",
        timestamp: this.logicalClock,
      });
      return {
        ok: true,
        message: \`[AP_SUCCESS] Sold on \${targetNode} locally. High availability maintained (risk of split-brain conflict).\`,
      };
    }
  }

  checkStock(targetNode: string, sku: string): { ok: boolean; status?: string; message: string } {
    const reachableNodes = Array.from(this.nodes.keys()).filter((n) =>
      this.canCommunicate(targetNode, n)
    );

    if (this.mode === "CP") {
      const majority = Math.floor(this.nodes.size / 2) + 1;
      if (reachableNodes.length < majority) {
        return {
          ok: false,
          message: \`[CP_REJECT] Node \${targetNode} cannot verify linearizable stock without quorum.\`,
        };
      }
      const record = this.nodes.get(targetNode)!.records.get(sku);
      return { ok: true, status: record?.status, message: \`[CP_READ] Accurate stock: \${record?.status}\` };
    } else {
      // AP Mode: return whatever local memory has
      const record = this.nodes.get(targetNode)!.records.get(sku);
      return { ok: true, status: record?.status, message: \`[AP_READ] Local stock view: \${record?.status}\` };
    }
  }
}

// ==========================================
// Execution Comparison
// ==========================================

console.log("--- 1. CP CLUSTER UNDER PARTITION ---");
const cpStore = new SneakerCluster("CP", ["FrontCounter", "BackroomWarehouse", "VIPLounge"]);
cpStore.splitNetwork("VIPLounge"); // VIPLounge is isolated (1 node vs 2 nodes)

console.log(cpStore.sellItem("FrontCounter", "travis-scott-10").message);
// => [CP_SUCCESS] Sold on quorum (FrontCounter, BackroomWarehouse)

console.log(cpStore.checkStock("VIPLounge", "travis-scott-10").message);
// => [CP_REJECT] Node VIPLounge cannot verify linearizable stock without quorum. (Prevents stale read!)

console.log("\\n--- 2. AP CLUSTER UNDER PARTITION ---");
const apStore = new SneakerCluster("AP", ["FrontCounter", "BackroomWarehouse", "VIPLounge"]);
apStore.splitNetwork("VIPLounge");

console.log(apStore.sellItem("FrontCounter", "travis-scott-10").message);
// => [AP_SUCCESS] Sold on FrontCounter locally.

console.log(apStore.checkStock("VIPLounge", "travis-scott-10").message);
// => [AP_READ] Local stock view: IN_STOCK (Stale read! Availability won, consistency lost)
\`\`\`

---

### How Real Databases Behave

Martin Kleppmann famously argued that engineers should stop classifying entire databases into binary buckets of "CP" or "AP". Modern distributed databases expose **configuration knobs** that let you decide the trade-off per table, per query, or per write concern:

| Database | Partition Behavior | The Primary Configuration Knob |
|---|---|---|
| **etcd / Consul** | **CP.** Built on Raft consensus. If a minority partition is cut off, it rejects all mutations and linearizable reads. | Non-negotiable Raft protocol (no AP mode). |
| **Apache Cassandra** | **Tunable (AP by default).** Replicas accept local writes; quorum overlap guarantees consistency when desired. | Read/Write consistency levels (\`ONE\`, \`QUORUM\`, \`ALL\`). |
| **MongoDB** | **Tunable (CP with replica sets).** Secondaries can serve eventual reads, or primary can require majority ACKs. | Write concern (\`w: "majority"\`) and Read concern (\`"linearizable"\`). |
| **Google Cloud Spanner** | **Technically CP, effectively CA.** Chooses consistency on split, but uses hardware atomic GPS clocks (TrueTime) so partitions are near-zero. | Managed private fiber network achieves >99.999% uptime. |
`,
  },
];
