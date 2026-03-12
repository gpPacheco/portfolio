"use client";

import { cn } from "@/lib/utils";
import { SiteLocale, localeLabels } from "@/lib/i18n";

type LanguageSwitcherProps = {
  locale: SiteLocale;
  onLocaleChange: (locale: SiteLocale) => void;
};

const languageOrder: SiteLocale[] = ["en-US", "pt-BR"];

export default function LanguageSwitcher({ locale, onLocaleChange }: LanguageSwitcherProps) {
  return (
    <div className="fixed right-6 top-6 z-[1200] flex items-center rounded-full border border-white/10 bg-black/50 px-4 py-2 backdrop-blur-md">
      {languageOrder.map((currentLocale, index) => (
        <div key={currentLocale} className="flex items-center">
          <button
            type="button"
            onClick={() => onLocaleChange(currentLocale)}
            className={cn(
              "font-mono text-xs tracking-[0.25em] transition-colors duration-200",
              locale === currentLocale ? "text-accent" : "text-white/45 hover:text-white/85"
            )}
            aria-pressed={locale === currentLocale}
            aria-label={
              currentLocale === "en-US"
                ? "Switch site language to English"
                : "Mudar idioma do site para português"
            }
            data-cursor-hover
          >
            {localeLabels[currentLocale]}
          </button>

          {index < languageOrder.length - 1 && (
            <span className="px-2 font-mono text-xs tracking-[0.25em] text-white/45">-</span>
          )}
        </div>
      ))}
    </div>
  );
}
