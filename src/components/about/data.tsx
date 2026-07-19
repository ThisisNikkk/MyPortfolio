import React from "react";
import Image from "next/image";
import { Bot, Smartphone, Layers, Monitor, Target, Gauge, Rocket, Code2 } from "lucide-react";

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
}

export const timelineData: TimelineItem[] = [
    {
        kicker: "Early Years",
        period: "TODO — your years",
        title: "TODO — what pulled you in",
        description:
            "TODO: replace before shipping. Malavika's equivalent covers what she was drawn to long before it was a job — art, movies, making things with her hands. Yours is the stretch before QSpiders: what first made you open a code editor, what you were studying, what you kept building for no reason.",
    },
    {
        kicker: "The Shift",
        period: "TODO — your years",
        title: "TODO — the turn",
        description:
            "TODO: replace before shipping. Hers is architecture → UX: the moment curiosity about people redirected the craft she already had. Yours is whatever turned casual tinkering into a decision to build software seriously.",
    },
    {
        kicker: "First Contact",
        period: "Jun 2024 – Jul 2024",
        title: "Summer Intern",
        company: "QSpiders",
        role: "Summer Intern",
        logo: <QSpidersLogo />,
        description:
            "My first real taste of building for people who'd actually use it. That summer I turned HTML, CSS, and JavaScript into responsive interfaces — and found that thoughtful, reusable components could cut our build time by around 20%. That's the moment shipping stopped feeling like a class project and started feeling like something I loved.",
    },
    {
        kicker: "Building With Others",
        period: "Aug 2024 – Sep 2024",
        title: "SDE Intern",
        company: "Bluestock Fintech",
        role: "SDE Intern",
        logo: <BluestockLogo />,
        description:
            "My first time building alongside a team. Remote from Pune, five of us in an Agile rhythm, I turned Figma designs into a fully responsive IPO platform with HTML, CSS, JavaScript, and Bootstrap. I learned how real products actually come together — and how to write code that plays well with everyone else's.",
    },
    {
        kicker: "Going All In",
        period: "Jun 2025 – Nov 2025",
        title: "Intern",
        company: "SolarioTech",
        role: "Intern",
        logo: <SolarioTechLogo />,
        description:
            "This is where everything clicked. Six months, all-in on mobile. I fell for React Native — the idea that one codebase could live on countless phones — and pushed myself from following tutorials to shipping production-ready, cross-platform apps.",
    },
    {
        kicker: "What I Do Now",
        period: "Nov 2025 – Present",
        title: "React Native Developer",
        company: "SolarioTech",
        role: "React Native Developer",
        logo: <SolarioTechLogo />,
        description:
            "Today I build scalable, cross-platform mobile apps full-time — and I finally have a real seat in shaping where our products go next. Proof, at least to me, that betting on curiosity pays off.",
        highlight:
            "The internship became a full-time offer — six months in, before the term was up.",
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
    /** The group the tool belongs to — rendered as its subtitle. */
    category: string;
    icon: React.ComponentType<{ className?: string }>;
}

/** Flattened one-card-per-tool view of `skillGroups`. */
export const stack: StackItem[] = skillGroups.flatMap((group) =>
    group.skills.map((name) => ({
        name,
        category: group.label,
        icon: groupIcons[group.label] ?? Code2,
    }))
);

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
        title: "User-First Thinking",
        text: "Great software starts with a deep understanding of the person using it, and ends with pixel-perfect execution.",
        icon: Layers,
    },
    {
        title: "Performance Is a Feature",
        text: "Fast, reliable, and clean. Speed isn't an afterthought — it's the baseline every product deserves.",
        icon: Gauge,
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
