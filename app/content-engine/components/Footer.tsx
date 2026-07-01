"use client";

import { useT } from "./LanguageProvider";

export function Footer() {
  const t = useT();
  return (
    <footer className="border-t border-white/5 px-6 py-10 text-center">
      <p className="text-sm text-white/40">{t.footer}</p>
    </footer>
  );
}
