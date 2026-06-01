"use client";
import React, { useState } from "react";
import {
    Navbar as ResizableNavbar,
    MobileNav,
    NavBody,
    NavItems,
    Logo,
} from "./ui/resizable-navbar";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
    const [activeLink, setActiveLink] = useState("Home");

    const links = [
        { name: "Home", link: "/" },
        { name: "About", link: "#about" },
        { name: "Work", link: "#work" },
        { name: "Contact", link: "#contact" },
    ];

    return (
        <ResizableNavbar>
            <NavBody>
                <Logo>
                    <Image src="/logo.png" loading="eager" priority alt="Nikhil Siwan" width={42} height={42} sizes="42px" className="object-contain" />
                </Logo>

                <NavItems>
                    {links.map((link, idx) => {
                        const isActive = activeLink === link.name;
                        return (
                            <Link
                                key={idx}
                                href={link.link}
                                onClick={() => setActiveLink(link.name)}
                                className={cn(
                                    "px-5 py-2 text-sm font-bold uppercase tracking-widest rounded-md transition-all duration-200",
                                    isActive
                                        ? "bg-zinc-950 text-white shadow-sm"
                                        : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/50"
                                )}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                    <div className="ml-2 pl-2 border-l border-zinc-200 flex items-center">
                        <ThemeToggle />
                    </div>
                </NavItems>
            </NavBody>

            <MobileNav>
                <Logo>
                    <Image src="/logo.png" loading="eager" priority alt="Nikhil Siwan" width={40} height={40} sizes="40px" className="object-contain" />
                </Logo>
                {links.map((link, idx) => {
                    const isActive = activeLink === link.name;
                    return (
                        <Link
                            key={idx}
                            href={link.link}
                            onClick={() => setActiveLink(link.name)}
                            className={cn(
                                "w-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-md transition-all duration-200 text-center",
                                isActive
                                    ? "bg-zinc-950 text-white shadow-sm"
                                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/50"
                            )}
                        >
                            {link.name}
                        </Link>
                    );
                })}
                <div className="mt-4 pt-4 border-t border-zinc-200 flex justify-center items-center w-full">
                    <ThemeToggle />
                </div>
            </MobileNav>
        </ResizableNavbar>
    );
}
