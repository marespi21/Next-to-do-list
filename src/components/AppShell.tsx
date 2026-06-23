"use client";

import { ReactNode } from "react";
import { ThemeToggle } from "@/src/components/ThemeToggle";
import { LanguageSelector } from "@/src/components/LanguageSelector";

interface AppShellProps {
  children: ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <>
      <header className="app-toolbar">
        <LanguageSelector />
        <ThemeToggle />
      </header>
      <main className="app-main">{children}</main>
    </>
  );
};
