import Image from "next/image";
import { stack } from "./data";

/**
 * Full-bleed infinite logo bar for the stack section: brand logos in white
 * cells that scroll forever, like a "trusted by" strip.
 *
 * Same seam-free technique as PhotoMarquee — the list is repeated until one
 * half exceeds any viewport, the track holds two identical halves, and the CSS
 * keyframe (globals.css) shifts it exactly -50% so the loop never gaps. Cells
 * are flush (borders, not gaps), so -50% lands perfectly on the seam.
 */
const CELL_WIDTH = 200; // px, includes the divider (border-box)
const TARGET_HALF_WIDTH = 3840; // cover up to a 4K viewport

export default function StackMarquee() {
    if (stack.length === 0) return null;

    const listWidth = stack.length * CELL_WIDTH;
    const repeats = Math.max(1, Math.ceil(TARGET_HALF_WIDTH / listWidth));
    const half = Array.from({ length: repeats }, () => stack).flat();
    const strip = [...half, ...half];

    return (
        <div
            className="group relative left-1/2 -translate-x-1/2 w-screen overflow-hidden border-y border-zinc-200 dark:border-zinc-800"
            aria-label="Tools and technologies I work with"
        >
            <div className="about-marquee-track flex w-max">
                {strip.map((tool, i) => (
                    <div
                        key={`${tool.name}-${i}`}
                        className="shrink-0 flex items-center justify-center border-r border-zinc-200 dark:border-zinc-800"
                        style={{ width: CELL_WIDTH, height: 130 }}
                    >
                        <Image
                            src={tool.logo}
                            alt={i < half.length ? tool.name : ""}
                            aria-hidden={i >= half.length}
                            width={64}
                            height={44}
                            unoptimized
                            // Flatten each logo to a single tone on-palette:
                            // zinc in light mode, white in dark. Colour would
                            // fight the lime + zinc theme.
                            className="max-h-11 w-auto object-contain brightness-0 opacity-50 dark:brightness-0 dark:invert dark:opacity-70 transition-opacity duration-300 group-hover:opacity-90 dark:group-hover:opacity-100"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
