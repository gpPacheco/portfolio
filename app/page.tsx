"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { DEFAULT_LOCALE, SiteLocale } from "@/lib/i18n";

export default function Home() {
  const [locale, setLocale] = useState<SiteLocale>(DEFAULT_LOCALE);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <main className="min-h-screen bg-background">
      <LanguageSwitcher locale={locale} onLocaleChange={setLocale} />
      <Hero locale={locale} />
      <FeaturedWork locale={locale} />
      <Education locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}