"use client";

import { createContext } from "react";

type ContextProps = {
  name: string;
  pi: number;
  contador: number;
  setContador: (contador: number) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
};

export const ContextGlobal = createContext<ContextProps>({} as ContextProps);
