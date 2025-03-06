"use client";
import { ThemeProvider } from "next-themes";

export default function ThemeProv({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <div className="min-h-screen" data-theme-transition>
        {children}
      </div>
    </ThemeProvider>
  );
}
