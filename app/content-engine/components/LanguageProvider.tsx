"use client";

import * as React from "react";
import {
  dictionaries,
  DEFAULT_LOCALE,
  type Dictionary,
  type Locale,
} from "../lib/i18n";

const STORAGE_KEY = "content-engine-locale";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggle: () => void;
  t: Dictionary;
};

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>(DEFAULT_LOCALE);

  // Restore the saved choice (falls back to the browser language) after mount.
  React.useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && saved in dictionaries) {
      setLocaleState(saved);
    } else if (navigator.language?.toLowerCase().startsWith("es")) {
      setLocaleState("es");
    }
  }, []);

  const setLocale = React.useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  const toggle = React.useCallback(() => {
    setLocale(locale === "en" ? "es" : "en");
  }, [locale, setLocale]);

  const value = React.useMemo<LanguageContextValue>(
    () => ({ locale, setLocale, toggle, t: dictionaries[locale] }),
    [locale, setLocale, toggle],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

/** Convenience hook for components that only need the copy dictionary. */
export function useT(): Dictionary {
  return useLanguage().t;
}
