"use client";

import { Inter } from "next/font/google";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { LanguageProvider, useLanguage } from "@/components/LanguageContext";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1C1917] to-[#0C0A09] text-white">
            {/* 🔹 Sticky Header */}
            <Header />
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
            <Footer />
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
    title: "Shankh",
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

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#1C1917]/90 border-b border-amber-900/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src="/conch_1.jpg"
            width={44}
            height={44}
            alt="Cover"
            className="rounded-full ring-2 ring-amber-500/30 transition-transform hover:scale-105"
          />
          <h1 className={`text-3xl font-bold ${montserrat.className} tracking-wide bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-400 bg-clip-text text-transparent`}>
            {translations[currentLanguage].title}
          </h1>
        </div>
        <div className="flex items-center space-x-6">
          {/* Language Toggle Button */}
          <div className="flex items-center gap-3">
            <p className="text-sm text-amber-200/80 font-medium">Eng</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={language === "hi"}
                onChange={toggleLanguage}
              />
              <div className="group peer h-6 w-11 rounded-full bg-stone-800 transition-all duration-300 
                           after:content-[''] after:absolute after:top-0.5 after:left-0.5 
                           after:bg-amber-200 after:rounded-full after:h-5 after:w-5 after:transition-all
                           peer-checked:after:translate-x-5 peer-checked:bg-amber-700
                           hover:bg-stone-700 peer-checked:hover:bg-amber-600"></div>
            </label>
            <p className="text-sm text-amber-200/80 font-medium">हिंदी</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1C1917] text-white py-4 text-center border-t border-amber-900/20">
      <p className="text-sm">
        © 2024 Espello Technologies Private Limited. All rights reserved.
      </p>
      <p className="text-sm">
        <strong className="text-amber-400">Shankh</strong> is a trademark and brand of Espello Technologies
        Private Limited.
      </p>
    </footer>
  );
}
