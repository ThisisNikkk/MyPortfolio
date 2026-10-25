"use client";
import React, { useEffect, useState } from "react";
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
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const links = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Work", link: "/#work" },
    { name: "Contact", link: "/contact" },
];

const hashOf = (href: string) => {
    const i = href.indexOf("#");
    return i === -1 ? "" : href.slice(i);
};

export default function Navbar() {
    const pathname = usePathname();
    // usePathname drops the fragment, so "Work" (/#work) needs the hash tracked separately
    const [hash, setHash] = useState("");

    useEffect(() => {
        const syncHash = () => setHash(window.location.hash);
        // covers direct loads and browser back/forward; in-app clicks set it eagerly below
        syncHash();
        window.addEventListener("hashchange", syncHash);
        window.addEventListener("popstate", syncHash);
        return () => {
            window.removeEventListener("hashchange", syncHash);
            window.removeEventListener("popstate", syncHash);
        };
    }, [pathname]);

    const lenis = useLenis();
    const reduceMotion = useReducedMotion();

    // Next's <Link> updates the URL with pushState, which fires no
    // `hashchange`, and a same-page link leaves the pathname unchanged — so
    // SmoothScrolling's scroll effect never runs. Clicking "Work" (or Home /
    // the logo) while already on "/" changed the URL and nothing else. When
    // the link targets the current page, scroll there ourselves.
    const navigate = (href: string) => {
        const fragment = hashOf(href);
        setHash(fragment);

        const path = href.split("#")[0] || "/";
        if (path !== pathname) return; // a real route change; SmoothScrolling handles it

        const target = fragment ? document.getElementById(fragment.slice(1)) : 0;
        if (target === null) return;
        if (lenis) {
            lenis.scrollTo(target, { immediate: !!reduceMotion });
        } else if (target === 0) {
            window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
        } else {
            target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        }
    };

    const activeLink = (() => {
        if (pathname.startsWith("/about")) return "About";
        if (pathname.startsWith("/contact")) return "Contact";
        if (pathname.startsWith("/projects")) return "Work";
        if (pathname === "/") return hash === "#work" ? "Work" : "Home";
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
                                    "px-5 py-1.5 text-sm font-bold uppercase tracking-widest rounded-md transition-[color,background-color,transform] duration-200 active:scale-95 active:duration-100",
                                    isActive
                                        ? "bg-zinc-950 text-white shadow-sm dark:bg-white dark:text-black"
                                        : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/50 dark:text-zinc-400 dark:hover:text-zinc-50 dark:hover:bg-zinc-800/50"
                                )}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                    <div className="ml-2 pl-2 border-l border-zinc-200 dark:border-zinc-800 flex items-center">
                        <ThemeToggle />
                    </div>
                </NavItems>
            </NavBody>

            <MobileNav>
                <Logo>
                    <Link href="/" scroll={false} onClick={() => navigate("/")} className="cursor-pointer flex items-center">
                        <Image src="/logo.png" loading="eager" priority alt="Nikhil Siwan" width={42} height={42} sizes="42px" className="dark:hidden object-contain" style={{ height: "auto" }} />
                        <Image src="/darkLogo.png" loading="eager" priority alt="Nikhil Siwan" width={42} height={42} sizes="42px" className="hidden dark:block object-contain" style={{ height: "auto" }} />
                    </Link>
                </Logo>
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
