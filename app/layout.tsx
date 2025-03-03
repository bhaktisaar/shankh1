"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider, useLanguage } from "@/components/LanguageContext";
import { Button } from "@/components/ui/button";

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

        {/* Language Toggle Button */}
        <div className="flex items-center gap-2">
          <p className="text-white"> Eng</p>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={language === "hi"} // Sync checkbox with language state
              onChange={toggleLanguage} // Change language on toggle
            />
            <div className="group peer bg-white rounded-full duration-300 w-14 h-5 ring-2 ring-slate-200 after:duration-300 after:bg-slate-200 peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-3 after:w-3 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95"></div>
          </label>
          <p className="text-white">हिंदी</p>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-zinc-900 text-white py-4 text-center">
      <p className="text-sm">
        © 2024 Espello Technologies Private Limited. All rights reserved.
      </p>
      <p className="text-sm">
        <strong>Shankh</strong> is a trademark and brand of Espello Technologies
        Private Limited.
      </p>
    </footer>
  );
}
