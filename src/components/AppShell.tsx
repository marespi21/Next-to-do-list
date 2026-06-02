"use client";

import { ReactNode } from "react";
import { ThemeToggle } from "@/src/components/ThemeToggle";

interface AppShellProps {
  children: ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <>
      <header className="app-toolbar">
        <ThemeToggle />
      </header>
      <main className="app-main">{children}</main>
    </>
  );
};
