"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

// next-themes injects an inline <script> that sets the theme class before
// first paint. It only needs to run from the server HTML; React never runs
// scripts it creates on the client, and React 19 warns whenever a client
// component renders one ("Encountered a script tag while rendering React
// component"). So: real JavaScript on the server, an inert data block on the
// client. next-themes puts suppressHydrationWarning on that tag, which covers
// the differing `type` during hydration.
const themeScriptProps = {
  type: typeof window === "undefined" ? "text/javascript" : "text/plain",
};

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider scriptProps={themeScriptProps} {...props}>
      {children}
    </NextThemesProvider>
  );
}
