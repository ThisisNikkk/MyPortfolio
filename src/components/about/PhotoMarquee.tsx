import Image from "next/image";
import { photos, type PhotoItem } from "./data";

/**
 * Stand-in tiles so the strip is visible while `photos` is still empty.
 * Development only — in production an empty list renders nothing at all.
 */
const placeholders: PhotoItem[] = [
    { src: "", alt: "", width: 210, height: 285 },
    { src: "", alt: "", width: 190, height: 215 },
    { src: "", alt: "", width: 230, height: 290 },
    { src: "", alt: "", width: 180, height: 205 },
    { src: "", alt: "", width: 220, height: 280 },
    { src: "", alt: "", width: 200, height: 220 },
];

/**
 * Full-bleed horizontal photo strip that loops forever.
 *
 * The list is rendered twice back to back and the track is shifted by exactly
 * -50%, so the second copy lands where the first began and the seam never
 * shows. The scroll is a CSS animation rather than framer-motion: a percentage
 * `x` cannot resolve against a max-content track, and framer resolves it to
 * `transform: none`. Keyframes live in globals.css.
 */
export default function PhotoMarquee() {
    const isPlaceholder = photos.length === 0;

    // Nothing to show in a real build until photos are added.
    if (isPlaceholder && process.env.NODE_ENV !== "development") return null;

    const source = isPlaceholder ? placeholders : photos;

    // Each tile carries a 24px trailing margin (mr-6).
    const GAP = 24;
    // Widest viewport worth covering (4K at 100% scaling); the track is built
    // to exceed it. Repeats only add DOM nodes - the browser serves every copy
    // of a given photo from cache after the first.
    const TARGET_HALF_WIDTH = 3840;

    // The track is two identical halves and shifts by exactly one half. If a
    // half is narrower than the viewport, that shift drags its trailing edge
    // into view and leaves a blank gap, so repeat the list until a half is
    // wide enough to cover any screen on its own.
    const listWidth = source.reduce((sum, p) => sum + p.width + GAP, 0);
    const repeats = Math.max(1, Math.ceil(TARGET_HALF_WIDTH / listWidth));
    const half = Array.from({ length: repeats }, () => source).flat();
    const strip = [...half, ...half];

    return (
        <div
            className="relative left-1/2 -translate-x-1/2 w-screen overflow-hidden py-10"
            aria-label="Photos of Nikhil"
        >
            {/*
              items-end puts every tile on one baseline; height alone varies.

              Spacing is a trailing margin per tile, NOT `gap`. With `gap` and
              2n tiles there are only 2n-1 gaps, so a -50% shift lands half a
              gap short of the seam and the loop visibly jumps. A margin on
              every tile gives 2n gaps, making half the track exactly one copy.
            */}
            <div className="about-marquee-track flex items-end w-max">
                {strip.map((photo, i) => {
                    // The second half is a visual duplicate, so keep it out of
                    // the accessibility tree.
                    const isDuplicate = i >= half.length;
                    return (
                        <div
                            key={`${photo.src}-${i}`}
                            className="shrink-0 mr-6 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900"
                            style={{ width: photo.width, height: photo.height }}
                        >
                            {isPlaceholder ? (
                                <div
                                    className="w-full h-full flex items-center justify-center border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl"
                                    aria-hidden
                                >
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
                                        Add photo
                                    </span>
                                </div>
                            ) : (
                                <Image
                                    src={photo.src}
                                    alt={isDuplicate ? "" : photo.alt}
                                    width={photo.width}
                                    height={photo.height}
                                    // Above the fold, so skip lazy loading.
                                    priority
                                    className="w-full h-full object-cover"
                                    aria-hidden={isDuplicate}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
