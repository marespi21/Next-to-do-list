"use client";

import { ReactNode, useEffect, useState } from "react";
import { ContextGlobal } from "./Context";
import { I18nProvider } from "./i18nContext";

interface ProviderProps {
  children: ReactNode;
}

export const Provider = ({ children }: ProviderProps) => {
  const name = "julio";
  const pi = 3.1416;

  const [contador, setContador] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const shouldUseDarkMode = savedTheme === "dark";
    setIsDarkMode(shouldUseDarkMode);
    document.documentElement.classList.toggle("dark", shouldUseDarkMode);
    document.documentElement.classList.toggle("light", !shouldUseDarkMode);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((current) => {
      const nextValue = !current;
      document.documentElement.classList.toggle("dark", nextValue);
      document.documentElement.classList.toggle("light", !nextValue);
      localStorage.setItem("theme", nextValue ? "dark" : "light");
      return nextValue;
    });
  };

  return (
    <ContextGlobal.Provider
      value={{ name, pi, contador, setContador, isDarkMode, toggleTheme }}
    >
      <I18nProvider>{children}</I18nProvider>
    </ContextGlobal.Provider>
  );
};
