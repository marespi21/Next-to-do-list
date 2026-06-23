"use client";

import { Button } from "@heroui/react";
import { useContext } from "react";
import { ContextGlobal } from "@/src/context/Context";
import { useTranslation } from "@/src/context/i18nContext";

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ContextGlobal);
  const { t } = useTranslation();

  return (
    <Button variant="secondary" size="sm" onPress={toggleTheme}>
      {isDarkMode ? t.common.lightMode : t.common.darkMode}
    </Button>
  );
};
