import React from "react";
import Image from "next/image";
import { Bot, Smartphone, Layers, Monitor, Target, Gauge, Rocket, Code2, Flag } from "lucide-react";
import type { TimelineArtName } from "./TimelineArt";

/* ------------------------------------------------------------------ *
 * Shared content for the About page variants.
 * NOTE: `stats` and `beyondCode` are grounded in the timeline below —
 * personalise the "Beyond Code" interests to your own.
 * ------------------------------------------------------------------ */

// Company logo badges
const LogoBadge = ({ src, alt }: { src: string; alt: string }) => (
    <div
        className="relative w-6 h-6 shrink-0 overflow-hidden rounded bg-white flex items-center justify-center border border-zinc-200 dark:border-zinc-700 shadow-sm"
        aria-hidden="true"
    >
        <Image src={src} alt={alt} width={24} height={24} className="object-contain p-0.5" />
    </div>
);

export const SolarioTechLogo = () => <LogoBadge src="/solarioLogo.png" alt="SolarioTech Logo" />;
export const BluestockLogo = () => <LogoBadge src="/BluestockLogo.webp" alt="Bluestock Fintech Logo" />;

export interface PhotoItem {
    /** Path under /public, e.g. "/photos/hoi-an.jpg". */
    src: string;
    alt: string;
    /** Rendered width in px. */
    width: number;
    /** Rendered height in px. Alternate tall and short down the list. */
    height: number;
}

/**
 * Marquee photos for the About hero. Drop images in `public/photos/` and list
 * them here; the strip hides itself entirely while this is empty.
 *
 * Every tile sits on a shared bottom baseline, so height is what creates the
 * rhythm — alternate roughly 280 and 200 rather than nudging tiles vertically.
 *
 * e.g. { src: "/photos/ha-long-bay.jpg", alt: "On a boat in Ha Long Bay",
 *        width: 210, height: 280 }
 */
export const photos: PhotoItem[] = [
    { src: "/photos/snow-frame.webp", alt: "Standing inside an empty picture frame in the snow", width: 215, height: 290 },
    { src: "/photos/mountain-layers.webp", alt: "Ridges of the Himalayas fading into haze", width: 300, height: 200 },
    { src: "/photos/office-corridor.webp", alt: "Walking an office corridor with a teammate", width: 205, height: 285 },
    { src: "/photos/pine-forest.webp", alt: "Looking up through a stand of deodar pines", width: 295, height: 200 },
    { src: "/photos/forest-stream.webp", alt: "Sitting on the rocks beside a forest stream", width: 210, height: 290 },
    { src: "/photos/hackathon-certificate.webp", alt: "Certificate from the EMPOWER Tech for Good hackathon at IIM Ahmedabad", width: 165, height: 205 },
    { src: "/photos/river-rocks.webp", alt: "Sitting on the boulders of a river bed in a green valley", width: 215, height: 285 },
    { src: "/photos/hilltop-view.webp", alt: "The view from a hilltop under an open sky", width: 300, height: 195 },
    { src: "/photos/iima-gate.webp", alt: "At the gates of IIM Ahmedabad", width: 205, height: 290 },
    { src: "/photos/azure-badge.webp", alt: "An Azure Developer Community badge in hand", width: 160, height: 200 },
    { src: "/photos/snow-peaks.webp", alt: "Snow-covered peaks under a heavy sky", width: 210, height: 285 },
    { src: "/photos/mountain-portrait.webp", alt: "Bundled up against the cold with the mountains behind", width: 280, height: 205 },
    { src: "/photos/desk-window.webp", alt: "A working setup at a window looking over the city", width: 205, height: 290 },
    { src: "/photos/tech-collage.webp", alt: "A machine-and-code installation seen up close", width: 165, height: 200 },
    { src: "/photos/pine-valley.webp", alt: "Pines opening onto a valley below", width: 215, height: 285 },
    { src: "/photos/office-tower.webp", alt: "An office tower on a clear morning", width: 160, height: 205 },
    { src: "/photos/iima-campus.webp", alt: "The brick and concrete architecture of the IIM Ahmedabad campus", width: 205, height: 290 },
    { src: "/photos/night-drive.webp", alt: "On a drive after dark", width: 165, height: 200 },
];

export interface TimelineItem {
    /** Small label above the card — "Early Years", "The Shift", "What I do now". */
    kicker: string;
    period: string;
    /** Card headline. For role entries this is the job title. */
    title: string;
    /** Present only on role entries; personal chapters omit these. */
    company?: string;
    role?: string;
    logo?: React.ReactNode;
    description: string;
    /** Optional callout pinned to the bottom of the card. */
    highlight?: string;
    /** Left-column visual. A photo takes precedence; otherwise `art` draws a
     *  one-line illustration, and failing both the "Add photo" frame shows. */
    visual?: { src: string; alt: string };
    /** One-line-art illustration for the left column (see TimelineArt). */
    art?: TimelineArtName;
}

export const timelineData: TimelineItem[] = [
    {
        kicker: "Early Years",
        period: "Class 3 onward",
        title: "A PC, and a question I couldn't drop",
        art: "pc",
        description:
            "My dad brought home our first computer when I was in class 3, and I couldn't stop wondering how it worked. How does anyone even make software? That question stuck around. I topped every computer class at school, and somewhere along the way I decided I was going to be an engineer.",
        highlight:
            "It wasn't all screens, though. I played a lot of football, went wherever I could, and wrote the odd page when something was on my mind.",
    },
    {
        kicker: "The Shift",
        period: "B.Tech CSE",
        title: "College, and the AI reckoning",
        art: "grad",
        description:
            "College made it official: a B.Tech in Computer Science, and one goal, to become an engineer who can fix actual problems. Then AI showed up and moved the bar overnight. Good skills but no AI on your CV? You're cooked. So I went all in, and pretty quickly it stopped feeling like something I had to do.",
        highlight:
            "Once I saw what you can build with AI, engineering stopped being the plan and became the thing I can't stop thinking about.",
    },
    {
        kicker: "Leading & Shipping",
        period: "Aug 2024 – Oct 2024",
        title: "Software Development Intern",
        company: "Bluestock Fintech",
        role: "SDE Intern",
        logo: <BluestockLogo />,
        art: "team",
        description:
            "The first time I owned part of a product, and a team along with it. It was a remote role with Bluestock in Pune. I led five people through Agile sprints to turn Figma designs into a responsive IPO platform, and I wrote the Node.js REST API behind it for live IPO data and the RHP/DRHP downloads. People used it to check live financial data, so it had to be right, and it had to ship on time.",
        highlight:
            "Getting five people to ship something good together was the first time I felt responsible for how a whole product turned out.",
    },
    {
        kicker: "What I Built",
        period: "2024 – 2025",
        title: "Turning AI into real products",
        art: "voice",
        description:
            "All that AI obsession needed somewhere to go. PrepAI is a mock-interview platform (Next.js, Vapi voice AI, Firebase) that runs voice interviews live and gives you feedback the moment you finish. CareConnect is a patient-management system with live scheduling and Twilio SMS, built on Appwrite. Both started from a problem people actually deal with.",
        highlight:
            "Both made it past the demo stage, and building them is when I started to feel like the engineer I'd meant to become.",
    },
    {
        kicker: "What I Do Now",
        period: "Jun 2025 – Present",
        title: "React Native Developer",
        company: "SolarioTech",
        role: "React Native Developer",
        logo: <SolarioTechLogo />,
        art: "mobile",
        description:
            "This is where the AI side met production. I ship cross-platform apps and websites, including LangoFunk, MyCareerAssessment and Heal, and I build the automation around them: n8n agent workflows, and a RAG chatbot for SolidAppMaker. Most days they feel less like tools and more like a teammate who never logs off.",
        highlight:
            "What I'm working toward now is automation that can carry a whole team's busywork, with agents and RAG systems doing it in the background.",
    },
];

export interface StatItem {
    value: number;
    suffix?: string;
    label: string;
}

export const stats: StatItem[] = [
    { value: 2, suffix: "+", label: "Years Building" },
    { value: 3, suffix: "", label: "Companies" },
    { value: 4, suffix: "", label: "Core Domains" },
    { value: 100, suffix: "%", label: "Craft Obsessed" },
];

export interface SkillGroup {
    label: string;
    skills: string[];
}

export const skillGroups: SkillGroup[] = [
    { label: "Mobile", skills: ["React Native", "Expo", "TypeScript"] },
    { label: "Web", skills: ["React", "Next.js", "Tailwind CSS", "JavaScript"] },
    { label: "AI", skills: ["AI Agents", "LLM Integration", "Automation"] },
    { label: "Design", skills: ["Figma", "UI/UX", "Design Systems"] },
    { label: "Foundations", skills: ["HTML", "CSS", "Bootstrap", "Git"] },
];

/** Icon shown beside every tool belonging to a group. */
export const groupIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    Mobile: Smartphone,
    Web: Monitor,
    AI: Bot,
    Design: Layers,
    Foundations: Code2,
};

export interface StackItem {
    name: string;
    /** Subtitle under the name. */
    category: string;
    /**
     * Logo file under /public/stacks (svg or png). Drop the brand logos there
     * using these exact filenames. Until a file exists, its tile shows a
     * lettered monogram, so the section works before the assets land.
     */
    logo: string;
}

export const stack: StackItem[] = [
    { name: "React Native", category: "Mobile", logo: "/stacks/react-native.svg" },
    { name: "Next.js", category: "Web", logo: "/stacks/nextjs.svg" },
    { name: "TypeScript", category: "Language", logo: "/stacks/typescript.svg" },
    { name: "Tailwind CSS", category: "Styling", logo: "/stacks/tailwind.svg" },
    { name: "Node.js", category: "Backend", logo: "/stacks/nodejs.svg" },
    { name: "Firebase", category: "Backend", logo: "/stacks/firebase.svg" },
    { name: "Appwrite", category: "Backend", logo: "/stacks/appwrite.svg" },
    { name: "Claude", category: "AI", logo: "/stacks/claude.svg" },
    { name: "OpenAI", category: "AI", logo: "/stacks/openai.svg" },
    { name: "Cursor", category: "AI", logo: "/stacks/cursor.svg" },
    { name: "GitHub Copilot", category: "AI", logo: "/stacks/githubcopilot.svg" },
    { name: "LangChain", category: "AI", logo: "/stacks/langchain.svg" },
    { name: "Ollama", category: "AI", logo: "/stacks/ollama.svg" },
    { name: "Hugging Face", category: "AI", logo: "/stacks/huggingface.svg" },
    { name: "n8n", category: "Automation", logo: "/stacks/n8n.svg" },
    { name: "Figma", category: "Design", logo: "/stacks/figma.svg" },
    { name: "Git", category: "Tooling", logo: "/stacks/git.svg" },
];

export interface ValueItem {
    title: string;
    text: string;
    icon: React.ComponentType<{ className?: string }>;
}

export const values: ValueItem[] = [
    {
        title: "Care about the details",
        text: "Spacing, loading states, what happens when the network drops. Those small things are usually how you can tell someone cared.",
        icon: Target,
    },
    {
        title: "AI people actually use",
        text: "Agents, RAG and automation are fun to demo. The part I enjoy is getting them to where people rely on them every day.",
        icon: Bot,
    },
    {
        title: "Fast by default",
        text: "I build for speed from the first commit, because trying to make a slow app fast later is a lot harder.",
        icon: Gauge,
    },
    {
        title: "Start with the user",
        text: "I want to know who's going to use the thing and what they're trying to get done before I touch the design.",
        icon: Layers,
    },
    {
        title: "Own the outcome",
        text: "From the idea to launch and what comes after. If it isn't working for the people using it, I don't count it as done.",
        icon: Flag,
    },
    {
        title: "Ship, then refine",
        text: "I'd rather put working software in front of people early than plan for months. Every release makes the next one easier.",
        icon: Rocket,
    },
];

// Personalise these to your own interests.
export const beyondCode: string[] = [
    "Motion Design",
    "Design Systems",
    "Open Source",
    "UI Teardowns",
    "Continuous Learning",
    "Coffee",
];

export interface FaqItem {
    question: string;
    answer: string;
}

export const faqs: FaqItem[] = [
    {
        question: "What do you actually build?",
        answer:
            "Mobile apps in React Native and Expo, websites and web apps in Next.js, and the AI automation behind them, like agent workflows, RAG chatbots and LLM integrations. Most projects end up being a mix.",
    },
    {
        question: "What kind of work are you best suited to?",
        answer:
            "Products that are meant to ship. I do my best work when I own a piece from the design handoff all the way to release, and there's an actual person using it at the end.",
    },
    {
        question: "How do you actually use AI in a project?",
        answer:
            "As part of the plumbing. Usually that's agents that take work off your team, search over your own data so answers are grounded in it, and automation hooked into tools you already use. If AI doesn't clearly make the product better, I leave it out.",
    },
    {
        question: "How long does a typical project take?",
        answer:
            "A focused MVP usually takes four to eight weeks. A full product with a proper backend, auth and polish takes longer. I'd rather give you an honest estimate up front than a quick quote I have to walk back later.",
    },
    {
        question: "What does working together look like?",
        answer:
            "Short cycles where you can see progress. We agree on the problem and roughly what the fix looks like, then I ship in pieces you can click through, so your feedback comes in while it's still cheap to act on.",
    },
    {
        question: "Are you available for new work?",
        answer:
            "Yes. I'm wrapping up my time at SolarioTech and I'm open to what's next, whether that's a full-time role or a freelance project. If the problem is interesting and the timeline is realistic, tell me about it.",
    },
];

export interface CapabilityNode {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    x: string;
    y: string;
}

export const capabilityNodes: CapabilityNode[] = [
    { id: "ai", label: "AI Agents", icon: Bot, x: "25%", y: "25%" },
    { id: "mobile", label: "Mobile", icon: Smartphone, x: "75%", y: "25%" },
    { id: "design", label: "UI/UX", icon: Layers, x: "25%", y: "75%" },
    { id: "web", label: "Web Apps", icon: Monitor, x: "75%", y: "75%" },
];
