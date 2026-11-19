"use client";
import React, { useEffect, useRef, useState } from "react";
import {
    Navbar as ResizableNavbar,
    MobileNav,
    NavBody,
    NavItems,
    Logo,
} from "./ui/resizable-navbar";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const links = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Work", link: "/work" },
    { name: "Blog", link: "/blog" },
    { name: "Contact", link: "/contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const lenis = useLenis();
    const reduceMotion = useReducedMotion();

    const navRowRef = useRef<HTMLDivElement>(null);
    const [pillRect, setPillRect] = useState<{ left: number; width: number; height: number; top: number } | null>(null);

    const activeLink = (() => {
        if (pathname.startsWith("/about")) return "About";
        if (pathname.startsWith("/contact")) return "Contact";
        if (pathname.startsWith("/work") || pathname.startsWith("/projects")) return "Work";
        if (pathname.startsWith("/blog")) return "Blog";
        if (pathname === "/") return "Home";
        return null;
    })();

    const activeIndex = links.findIndex((l) => l.name === activeLink);

    // Measure active tab offset relative to the navbar row (strictly horizontal)
    useEffect(() => {
        const updatePill = () => {
            if (!navRowRef.current || activeIndex === -1) {
                setPillRect(null);
                return;
            }
            const tabs = navRowRef.current.querySelectorAll<HTMLAnchorElement>("a[data-nav-pill]");
            const activeTab = tabs[activeIndex];
            if (activeTab) {
                setPillRect({
                    left: activeTab.offsetLeft,
                    top: activeTab.offsetTop,
                    width: activeTab.offsetWidth,
                    height: activeTab.offsetHeight,
                });
            }
        };

        updatePill();
        window.addEventListener("resize", updatePill);
        return () => window.removeEventListener("resize", updatePill);
    }, [activeIndex]);

    const navigate = (href: string) => {
        if (href !== pathname) return; // a real route change; SmoothScrolling handles it
        if (lenis) {
            lenis.scrollTo(0, { immediate: !!reduceMotion });
        } else {
            window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
        }
    };

    return (
        <ResizableNavbar>
            <NavBody>
                <Logo>
                    <Link href="/" scroll={false} onClick={() => navigate("/")} className="cursor-pointer flex items-center">
                        <Image src="/logo.png" loading="eager" priority alt="Nikhil Siwan" width={36} height={36} sizes="36px" className="dark:hidden object-contain" style={{ height: "auto" }} />
                        <Image src="/darkLogo.png" loading="eager" priority alt="Nikhil Siwan" width={36} height={36} sizes="36px" className="hidden dark:block object-contain" style={{ height: "auto" }} />
                    </Link>
                </Logo>

                <NavItems>
                    <div ref={navRowRef} className="relative flex items-center gap-1">
                        {/* Horizontal-only sliding active pill: strictly locked in Y */}
                        {pillRect && (
                            <motion.span
                                aria-hidden
                                className="absolute rounded-md bg-zinc-950 shadow-sm dark:bg-white pointer-events-none"
                                initial={false}
                                animate={{
                                    x: pillRect.left,
                                    width: pillRect.width,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 420,
                                    damping: 34,
                                    duration: reduceMotion ? 0 : undefined,
                                }}
                                style={{
                                    top: pillRect.top,
                                    height: pillRect.height,
                                }}
                            />
                        )}

                        {links.map((link, idx) => {
                            const isActive = activeLink === link.name;
                            return (
                                <Link
                                    key={idx}
                                    data-nav-pill
                                    href={link.link}
                                    scroll={false}
                                    onClick={() => navigate(link.link)}
                                    className={cn(
                                        "relative z-10 px-5 py-1.5 text-sm font-bold uppercase tracking-widest rounded-md transition-colors duration-200 select-none",
                                        isActive
                                            ? "text-white dark:text-black"
                                            : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/40 dark:text-zinc-400 dark:hover:text-zinc-50 dark:hover:bg-zinc-800/40"
                                    )}
                                >
                                    <span className="relative">{link.name}</span>
                                </Link>
                            );
                        })}
                        <div className="relative z-10 ml-2 pl-2 border-l border-zinc-200 dark:border-zinc-800 flex items-center">
                            <ThemeToggle />
                        </div>
                    </div>
                </NavItems>
            </NavBody>

            <MobileNav
                logo={
                    <Logo>
                        <Link href="/" scroll={false} onClick={() => navigate("/")} className="cursor-pointer flex items-center">
                            <Image src="/logo.png" loading="eager" priority alt="Nikhil Siwan" width={42} height={42} sizes="42px" className="dark:hidden object-contain" style={{ height: "auto" }} />
                            <Image src="/darkLogo.png" loading="eager" priority alt="Nikhil Siwan" width={42} height={42} sizes="42px" className="hidden dark:block object-contain" style={{ height: "auto" }} />
                        </Link>
                    </Logo>
                }
            >
                {links.map((link, idx) => {
                    const isActive = activeLink === link.name;
                    return (
                        <Link
                            key={idx}
                            href={link.link}
                            scroll={false}
                            onClick={() => navigate(link.link)}
                            className={cn(
                                "w-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-md transition-[color,background-color,transform] duration-200 active:scale-[0.97] active:duration-100 text-center",
                                isActive
                                    ? "bg-zinc-950 text-white shadow-sm dark:bg-white dark:text-black"
                                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/50 dark:text-zinc-400 dark:hover:text-zinc-50 dark:hover:bg-zinc-800/50"
                            )}
                        >
                            {link.name}
                        </Link>
                    );
                })}
                <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-center items-center w-full">
                    <ThemeToggle />
                </div>
            </MobileNav>
        </ResizableNavbar>
    );
}
