"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, Language, Translations } from "@/src/locales/translations";

type I18nContextProps = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
};

export const I18nContext = createContext<I18nContextProps>({} as I18nContextProps);

export const useTranslation = () => useContext(I18nContext);

interface Props {
  children: React.ReactNode;
}

export const I18nProvider = ({ children }: Props) => {
  const [language, setLanguageState] = useState<Language>("es");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language | null;
    if (saved && translations[saved]) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
  };

  const t = translations[language];

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};
