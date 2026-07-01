import type { Metadata } from "next";
import { Hero } from "./components/Hero";
import { Problem } from "./components/Problem";
import { Solution } from "./components/Solution";
import { OutputShowcase } from "./components/OutputShowcase";
import { TemplateGallery } from "./components/TemplateGallery";
import { Learn } from "./components/Learn";
import { Audience } from "./components/Audience";
import { GuideContents } from "./components/GuideContents";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { LanguageProvider } from "./components/LanguageProvider";
import { LanguageSwitch } from "./components/LanguageSwitch";

const TITLE = "AI Content Engine — Turn One Idea Into Weeks of Content";
const DESCRIPTION =
  "The free guide to building a content system with Claude Code, Remotion and AI. Stop creating every post from scratch — get the workflow, templates and reusable architecture to publish consistently across TikTok, Reels, Shorts and LinkedIn.";
const URL = "https://estebantoro.com/content-engine";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "AI content engine",
    "Claude Code",
    "Remotion",
    "content automation",
    "AI video generation",
    "content system for developers",
    "indie hacker distribution",
  ],
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    url: URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "AI Content Engine",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@estebantoro",
  },
  robots: { index: true, follow: true },
};

export default function ContentEnginePage() {
  return (
    // Force always-dark theme for this route (globals use a media query).
    <LanguageProvider>
      <main className="min-h-screen bg-[#050507] font-sans text-white antialiased">
        <LanguageSwitch />
        <Hero />
        <Problem />
        <Solution />
        <OutputShowcase />
        <TemplateGallery />
        <Learn />
        <Audience />
        <GuideContents />
        <CTA />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
