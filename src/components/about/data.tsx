import React from "react";
import Image from "next/image";
import { Bot, Smartphone, Layers, Monitor, Target, Gauge, Rocket, Code2, Flag } from "lucide-react";

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
export const QSpidersLogo = () => <LogoBadge src="/qSpiderLogo.png" alt="QSpiders Logo" />;

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
export const photos: PhotoItem[] = [];

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
    /** Left-column visual. Omit to render the "Add photo" placeholder frame. */
    visual?: { src: string; alt: string };
}

export const timelineData: TimelineItem[] = [
    {
        kicker: "Early Years",
        period: "Class 3 onward",
        title: "A PC, and a question I couldn't drop",
        description:
            "My dad brought home our first computer when I was in class 3, and I've been taking it apart in my head ever since — how does this actually work, how is the software even made? That question never left. Topping every computer class only turned the volume up, and somewhere in there the goal quietly set itself: I was going to be an engineer.",
        highlight:
            "Off-screen I was chasing footballs, new places, and the odd page of writing — proof the curiosity was never only about screens.",
    },
    {
        kicker: "The Shift",
        period: "B.Tech CSE",
        title: "College, and the AI reckoning",
        description:
            "College made the goal official — B.Tech in Computer Science, and a clear target: become the kind of engineer who can actually solve real-world problems. Then the AI wave hit and reset the bar overnight. Skilled but with zero AI to your name? You're cooked. So I dove in headfirst, and the deeper I went, the less it felt like a survival move.",
        highlight:
            "What we can genuinely build with AI is unimaginable — that's the moment engineering went from a plan to an obsession.",
    },
    {
        kicker: "Leading & Shipping",
        period: "Aug 2024 – Oct 2024",
        title: "Software Development Intern",
        company: "Bluestock Fintech",
        role: "SDE Intern",
        logo: <BluestockLogo />,
        description:
            "My first time owning real product surface — and a team. Remote from Pune, I led a five-person Agile squad to turn Figma designs into a fully responsive IPO platform, then engineered a Node.js REST API to serve live IPO data and RHP/DRHP downloads. Real users, real financial data, real deadlines.",
        highlight:
            "Led a 5-person team to ship a best-in-class solution — my first proof that I could own the outcome, not just the code.",
    },
    {
        kicker: "What I Built",
        period: "2024 – 2025",
        title: "Turning AI into real products",
        description:
            "The AI obsession needed an outlet. PrepAI — an AI mock-interview platform (Next.js, Vapi voice AI, Firebase) that runs real-time voice interviews and hands back instant, personalized feedback. CareConnect — a patient-management system with real-time scheduling and Twilio SMS, built on Appwrite. Two products, both aimed at a real problem people actually have.",
        highlight:
            "Not toy demos — real products solving real problems with AI. Exactly the engineer I set out to become.",
    },
    {
        kicker: "What I Do Now",
        period: "Jun 2025 – Present",
        title: "React Native Developer",
        company: "SolarioTech",
        role: "React Native Developer",
        logo: <SolarioTechLogo />,
        description:
            "This is where the AI obsession met production. I ship real cross-platform apps and websites — Langofunk, MyCareerAssessment, Heal — and build the automation behind them: agentic n8n workflows and a RAG chatbot for SolidAppMaker that together act less like tools and more like an extra team member who never sleeps.",
        highlight:
            "The goal now is to build automation that works like a superhuman — agents and RAG systems quietly doing the work of a whole team.",
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
        title: "Craft Over Shortcuts",
        text: "Every line of code is a design decision. I sweat the details others skip — because that's where quality lives.",
        icon: Target,
    },
    {
        title: "Turning AI Into Products",
        text: "Not demos — shipped tools. I take agents, RAG, and automation from a cool idea to something people actually use.",
        icon: Bot,
    },
    {
        title: "Performance Is a Feature",
        text: "Fast, reliable, and clean. Speed isn't an afterthought — it's the baseline every product deserves.",
        icon: Gauge,
    },
    {
        title: "User-First Thinking",
        text: "Great software starts with a deep understanding of the person using it, and ends with pixel-perfect execution.",
        icon: Layers,
    },
    {
        title: "Ownership End-to-End",
        text: "From idea to shipped, and the outcome after. I take responsibility for the result, not just my slice of it.",
        icon: Flag,
    },
    {
        title: "Ship, Then Refine",
        text: "A bias toward shipping real, working software over endless planning. Momentum compounds.",
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
            "Cross-platform mobile apps in React Native and Expo, web products in Next.js, and the AI automation that sits behind them — agentic workflows, RAG chatbots, LLM integrations. Most projects end up being some mix of all three.",
    },
    {
        question: "What kind of work are you best suited to?",
        answer:
            "Products that need to ship, not prototypes that need a demo. I'm strongest when I own a surface end to end — design handoff through release — and when there's a real user on the other side of it.",
    },
    {
        question: "How do you actually use AI in a project?",
        answer:
            "As infrastructure, not decoration. That means agents that take real work off a team's plate, retrieval over your own data so answers are grounded, and automation wired into the tools you already use. If AI doesn't make the product measurably better, it doesn't go in.",
    },
    {
        question: "How long does a typical project take?",
        answer:
            "A focused MVP is usually four to eight weeks. A full product with a real backend, auth, and polish runs longer. I'd rather scope honestly up front than quote fast and renegotiate later.",
    },
    {
        question: "What does working together look like?",
        answer:
            "Short cycles and visible progress. We agree on the problem and the shape of the solution, then I ship in slices you can actually click through, so feedback lands while it's still cheap to act on.",
    },
    {
        question: "Are you available for new work?",
        answer:
            "I'm building at SolarioTech full-time and take on select freelance projects alongside it. If the problem is interesting and the timeline is realistic, tell me about it.",
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
