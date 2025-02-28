"use client";
import { createContext, useContext, useState, useEffect } from "react";

interface LanguageContextProps {
  language: string;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: "en",
  toggleLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("app-language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "hi" : "en";
    setLanguage(newLang);
    localStorage.setItem("app-language", newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
