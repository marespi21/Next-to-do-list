"use client";

import { useTranslation } from "@/src/context/i18nContext";
import { Language } from "@/src/locales/translations";

const languages: { value: Language; label: string }[] = [
  { value: "es", label: "ES" },
  { value: "en", label: "EN" },
  { value: "pt", label: "PT" },
];

export const LanguageSelector = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as Language)}
      className="lang-select"
      aria-label="Seleccionar idioma"
    >
      {languages.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};
