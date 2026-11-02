"use client";
import React from "react";
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
    // Its own route now. It used to be /#work, which meant rebuilding the
    // whole homepage (sticky hero and all) and then scrolling down to reach it.
    { name: "Work", link: "/work" },
    { name: "Contact", link: "/contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const lenis = useLenis();
    const reduceMotion = useReducedMotion();

    // A link to the page you're already on changes nothing in the router
    // (same pathname), so SmoothScrolling's scroll-to-top never runs and the
    // tap seemed to do nothing. In that case, scroll to the top ourselves.
    const navigate = (href: string) => {
        if (href !== pathname) return; // a real route change; SmoothScrolling handles it
        if (lenis) {
            lenis.scrollTo(0, { immediate: !!reduceMotion });
        } else {
            window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
        }
    };

    const activeLink = (() => {
        if (pathname.startsWith("/about")) return "About";
        if (pathname.startsWith("/contact")) return "Contact";
        if (pathname.startsWith("/work") || pathname.startsWith("/projects")) return "Work";
        if (pathname === "/") return "Home";
        return null;
    })();

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
                    {links.map((link, idx) => {
                        const isActive = activeLink === link.name;
                        return (
                            <Link
                                key={idx}
                                href={link.link}
                                scroll={false}
                                onClick={() => navigate(link.link)}
                                className={cn(
                                    "relative px-5 py-1.5 text-sm font-bold uppercase tracking-widest rounded-md transition-[color,background-color,transform] duration-200 active:scale-95 active:duration-100",
                                    isActive
                                        ? "text-white dark:text-black"
                                        : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/50 dark:text-zinc-400 dark:hover:text-zinc-50 dark:hover:bg-zinc-800/50"
                                )}
                            >
                                {/* One shared pill that slides to the active
                                    item, so moving between pages reads as
                                    going from one place to another. The navbar
                                    stays mounted across routes, which is what
                                    lets it travel. */}
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-active-pill"
                                        aria-hidden
                                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                        className="absolute inset-0 rounded-md bg-zinc-950 shadow-sm dark:bg-white"
                                    />
                                )}
                                <span className="relative">{link.name}</span>
                            </Link>
                        );
                    })}
                    <div className="ml-2 pl-2 border-l border-zinc-200 dark:border-zinc-800 flex items-center">
                        <ThemeToggle />
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
