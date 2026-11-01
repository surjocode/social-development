
"use client";

import {
  ThemeProvider as NextThemeProvider,
} from "@teispace/next-themes";

import type { ThemeProviderProps } from "@teispace/next-themes";

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemeProvider {...props}>
      {children}
    </NextThemeProvider>
  );
}
