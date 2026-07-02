import type { Metadata } from "next";
import { LanguageProvider } from "../content-engine/components/LanguageProvider";
import { LanguageSwitch } from "../content-engine/components/LanguageSwitch";
import { GuideShell } from "./components/GuideShell";

export const metadata: Metadata = {
  title: "The AI Content Engine — Developer Handbook",
  description:
    "Build an AI-powered video factory. The complete handbook for generating unlimited short-form videos with Claude Code, Remotion and CapCut — architecture, compositions, prompt library and automation.",
  robots: { index: false, follow: false },
};

export default function ContentEngineGuidePage() {
  return (
    // Force the always-dark documentation theme for this route.
    <LanguageProvider>
      <div className="min-h-screen bg-[#050507] font-sans text-white antialiased">
        <LanguageSwitch />
        <GuideShell />
      </div>
    </LanguageProvider>
  );
}
