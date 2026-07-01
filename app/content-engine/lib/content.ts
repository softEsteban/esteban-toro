// ─────────────────────────────────────────────────────────────────────────────
// Structural, language-independent data: icons, layouts, accents, durations.
// All translatable copy lives in i18n.ts. Arrays here are parallel (by index)
// to their counterparts in the dictionary — keep them in the same order.
// ─────────────────────────────────────────────────────────────────────────────

import {
  Boxes,
  Terminal,
  LayoutTemplate,
  Sparkles,
  Users,
  Gauge,
  Workflow,
  AlertTriangle,
  Lightbulb,
  FileText,
  FileJson,
  Clapperboard,
  Film,
  Scissors,
  Code2,
  Rocket,
  Briefcase,
  Bot,
  Hammer,
  Video,
  Palmtree,
  type LucideIcon,
} from "lucide-react";

// Parallel to solution.pipeline
export const PIPELINE_ICONS: LucideIcon[] = [
  Lightbulb,
  Terminal,
  FileText,
  FileJson,
  Clapperboard,
  Film,
  Scissors,
];

// Brand names — identical across locales.
export const PIPELINE_OUTPUTS = [
  "TikTok",
  "LinkedIn",
  "Instagram",
  "YouTube Shorts",
];

// Parallel to output.hooks
export const OUTPUT_META: { platform: string; tag: string; accent: string }[] =
  [
    {
      platform: "TikTok",
      tag: "0:24",
      accent: "linear-gradient(160deg,#0f172a 0%,#4c1d95 55%,#db2777 100%)",
    },
    {
      platform: "Reels",
      tag: "0:31",
      accent: "linear-gradient(160deg,#0c1a2b 0%,#1d4ed8 55%,#22d3ee 100%)",
    },
    {
      platform: "Shorts",
      tag: "0:18",
      accent: "linear-gradient(160deg,#1a0b2e 0%,#7c3aed 55%,#f472b6 100%)",
    },
    {
      platform: "LinkedIn",
      tag: "0:42",
      accent: "linear-gradient(160deg,#0b1220 0%,#0e7490 55%,#34d399 100%)",
    },
  ];

// Parallel to templates.items
export const TEMPLATE_LAYOUTS = [
  "hook",
  "list",
  "talkinghead",
  "code",
  "beforeafter",
  "statement",
] as const;

// Parallel to learn.topics
export const LEARN_ICONS: LucideIcon[] = [
  Boxes,
  Terminal,
  LayoutTemplate,
  Sparkles,
  Users,
  Gauge,
  Workflow,
  AlertTriangle,
];

// Parallel to audience.personas
export const PERSONA_ICONS: LucideIcon[] = [
  Code2,
  Rocket,
  Briefcase,
  Bot,
  Hammer,
  Video,
  Palmtree,
];

/** Builds the illustrative scene JSON shown in the transformation visual. */
export function buildSceneJson(text: string, subtitle: string): string {
  return `{
  "scene": "hook",
  "text": ${JSON.stringify(text)},
  "subtitle": ${JSON.stringify(subtitle)},
  "duration": 3,
  "animation": "spring-in",
  "accent": "#a78bfa"
}`;
}
