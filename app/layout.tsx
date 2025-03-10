"use client";

import { Inter } from "next/font/google";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { LanguageProvider, useLanguage } from "@/components/LanguageContext";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <div className="flex flex-col min-h-screen bg-gradient-to-b from-stone-100 to-amber-50 text-stone-800">
            {/* 🔹 Sticky Header */}
            <Header />
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pb-20">
              {children}
              {/* Footer as part of main content */}
              <footer className="bg-stone-100 text-stone-600 py-4 text-center border-t border-amber-200/20 shadow-inner mt-8">
                <div className="max-w-7xl mx-auto px-4">
                  <p className="text-sm">
                    © 2024 Espello Technologies Private Limited. All rights
                    reserved.
                  </p>
                  <p className="text-sm">
                    <strong className="text-amber-600">Shankh</strong> is a
                    trademark and brand of Espello Technologies Private Limited.
                  </p>
                </div>
              </footer>
            </main>
            {/* Space reserved for fixed music player */}
            <div className="h-20" />{" "}
            {/* This ensures content doesn't hide behind the player */}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}

// Define the type for supported languages
type Language = "en" | "hi";

const translations: Record<
  Language,
  { title: string; toggleText: string; getStarted: string }
> = {
  en: {
    title: "Music App",
    toggleText: "Eng",
    getStarted: "About Us",
  },
  hi: {
    title: "शंख",
    toggleText: "हिंदी",
    getStarted: "About Us",
  },
};

function Header() {
  const { language, toggleLanguage } = useLanguage();
  const currentLanguage = language as Language;

  const handleHomeClick = () => {
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-stone-100/80 border-b border-amber-200/20 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src="https://pub-821e7514c97d42cfb1b90453dffd7cf3.r2.dev/shankh_logo_1.jpg"
            width={44}
            height={44}
            alt="Shankh Logo"
            className="rounded-full ring-2 ring-amber-500/30 transition-transform hover:scale-105 cursor-pointer"
            onClick={handleHomeClick}
          />
          <h1
            className={`text-3xl font-bold ${montserrat.className} tracking-wide bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity`}
            onClick={handleHomeClick}
          >
            {translations[currentLanguage].title}
          </h1>
        </div>
        <div className="flex items-center space-x-6">
          {/* Language Toggle Button */}
          <div className="flex items-center gap-3">
            <p className="text-sm text-stone-600 font-medium">Eng</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={language === "hi"}
                onChange={toggleLanguage}
              />
              <div
                className="group peer h-6 w-11 rounded-full bg-stone-200 transition-all duration-300 
                           after:content-[''] after:absolute after:top-0.5 after:left-0.5 
                           after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
                           peer-checked:after:translate-x-5 peer-checked:bg-amber-500
                           hover:bg-stone-300 peer-checked:hover:bg-amber-400"
              ></div>
            </label>
            <p className="text-sm text-stone-600 font-medium">हिंदी</p>
          </div>
        </div>
      </div>
    </header>
  );
}
