"use client";

import { Button } from "@heroui/react";
import { useContext } from "react";
import { ContextGlobal } from "@/src/context/Context";

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ContextGlobal);

  return (
    <Button variant="secondary" size="sm" onPress={toggleTheme}>
      {isDarkMode ? "Modo claro" : "Modo oscuro"}
    </Button>
  );
};
