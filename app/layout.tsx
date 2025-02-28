"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider, useLanguage } from "@/components/LanguageContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <div className="flex flex-col min-h-screen bg-black text-white">
            {/* 🔹 Sticky Header */}
            <Header />
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">{children}</main>
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
    title: "Music Streaming Apps",
    toggleText: "Eng",
    getStarted: "Get Started",
  },
  hi: {
    title: "म्यूजिक स्ट्रीमिंग ऐप्स",
    toggleText: "हिंदी",
    getStarted: "शुरू करें",
  },
};

function Header() {
  const { language, toggleLanguage } = useLanguage();

  // Ensure TypeScript recognizes `language` as a valid key
  const currentLanguage = language as Language;

  return (
    <header className="sticky top-0 z-50 bg-zinc-900 p-4 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-3">
        <h1 className="text-2xl font-bold">
          {translations[currentLanguage].title}
        </h1>
        <img
          src="/cover.jpg"
          width={40}
          height={40}
          alt="Cover"
          className="rounded-full"
        />
      </div>
      <div className="flex items-center space-x-3">
        <Button variant="default">
          {translations[currentLanguage].getStarted}
        </Button>
        <button
          onClick={toggleLanguage}
          className=" text-white px-3 py-1 rounded-md transition"
        >
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" value="" />
            <div
              onClick={toggleLanguage}
              className="group peer bg-white rounded-full duration-300 w-16 h-8 ring-2 ring-red-500 after:duration-300 after:bg-red-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95"
            ></div>
          </label>
        </button>
        {/* <Switch />
        <p>{translations[currentLanguage].toggleText}</p> */}
      </div>
    </header>
  );
}
