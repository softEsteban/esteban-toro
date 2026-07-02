// ─────────────────────────────────────────────────────────────────────────────
// The entire guide as data.
//
// Every chapter is a list of typed `Block`s. The SAME data drives both the web
// page (components/blocks/*) and the downloadable PDF (components/pdf/GuidePDF).
//
// Locale-independent structure (code snippets, folder trees, flow steps whose
// labels are proper nouns, composition/prompt names) lives in the `SHARED`
// object so it is never duplicated between languages. Only human prose is
// translated. `es` is typed as `GuideContent` (= the shape of `en`), so the
// compiler flags any key that drifts out of sync.
// ─────────────────────────────────────────────────────────────────────────────

import type { Locale } from "../../content-engine/lib/i18n";

// ── Block model ──────────────────────────────────────────────────────────────

export type CalloutTone = "tip" | "warning" | "note" | "success";

export type TreeNode = {
  label: string;
  kind: "dir" | "file";
  note?: string;
  children?: TreeNode[];
};

export type Block =
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "code"; title?: string; lang?: string; code: string }
  | { kind: "callout"; tone: CalloutTone; title: string; text: string }
  | { kind: "flow"; title?: string; steps: { label: string; note?: string }[] }
  | { kind: "tree"; title?: string; nodes: TreeNode[] }
  | {
      kind: "grid";
      columns?: 2 | 3;
      items: { name: string; desc: string }[];
    }
  | { kind: "prompts"; groups: { category: string; items: string[] }[] }
  | {
      kind: "split";
      left: { title: string; items: string[] };
      right: { title: string; items: string[] };
    }
  | { kind: "stats"; items: { value: string; label: string }[] };

export type Chapter = {
  id: string;
  number: number;
  title: string;
  tagline: string;
  blocks: Block[];
};

export type GuideContent = {
  meta: {
    kicker: string;
    title: string;
    subtitle: string;
    author: string;
    readingTime: string;
    version: string;
  };
  ui: {
    contents: string;
    download: string;
    downloading: string;
    chapter: string;
    backToLanding: string;
    intro: string[];
  };
  chapters: Chapter[];
};

// ── Shared, locale-independent structure ─────────────────────────────────────

const SHARED = {
  code: {
    installClaude: `# 1 — Install the Claude Code CLI (Node 18+)
npm install -g @anthropic-ai/claude-code

# 2 — Authenticate once
claude login

# 3 — Drop into any project and start a session
cd ~/projects/content-engine
claude`,

    projectInit: `# Scaffold the workspace
mkdir content-engine && cd content-engine
npm init -y

# Let Claude read the whole repo: create a CLAUDE.md at the root
echo "# Content Engine\\nRemotion video factory. Compositions live in /src/compositions." > CLAUDE.md`,

    installRemotion: `# Scaffold a Remotion project (interactive)
npm create video@latest

# …or add Remotion to an existing repo
npm i remotion @remotion/cli @remotion/player

# Live preview studio at http://localhost:3000
npx remotion studio`,

    composition: `// src/Root.tsx — every template is registered as a <Composition>
import { Composition } from "remotion";
import { QuoteScene } from "./compositions/QuoteScene";

export const RemotionRoot = () => (
  <Composition
    id="Quote"                // referenced by the renderer
    component={QuoteScene}    // your reusable template
    durationInFrames={180}    // 6s at 30fps
    fps={30}
    width={1080}              // vertical, 9:16
    height={1920}
    defaultProps={{
      quote: "Building is no longer the bottleneck.",
      author: "Esteban Toro",
      accent: "#a78bfa",
    }}
  />
);`,

    render: `# Render one composition to an MP4
npx remotion render Quote out/quote.mp4 \\
  --props='{"quote":"Ship, then get seen.","author":"Esteban"}'

# Render a batch by passing a props file per video
npx remotion render Quote out/q-$(date +%s).mp4 --props=./content/quote-01.json`,

    propsSchema: `// src/compositions/QuoteScene.tsx — props ARE the content API
import { z } from "zod";

export const quoteSchema = z.object({
  quote: z.string(),
  author: z.string(),
  accent: z.string().default("#a78bfa"),
});

// Claude writes JSON that matches this schema — one file per video.
// The schema is the contract between "the idea" and "the render".`,

    reusableComponent: `// src/motion/AnimatedText.tsx — one primitive, used everywhere
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const AnimatedText: React.FC<{ text: string; delay?: number }> = ({
  text,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const y = interpolate(enter, [0, 1], [24, 0]);
  return <div style={{ opacity: enter, transform: \`translateY(\${y}px)\` }}>{text}</div>;
};`,

    batchScript: `// scripts/render-all.mjs — turn a folder of JSON into a folder of MP4s
import { readdir } from "node:fs/promises";
import { execSync } from "node:child_process";

const jobs = await readdir("./content");
for (const job of jobs.filter((f) => f.endsWith(".json"))) {
  const id = job.replace(".json", "");
  execSync(
    \`npx remotion render Quote out/\${id}.mp4 --props=./content/\${job}\`,
    { stdio: "inherit" },
  );
}`,

    cron: `// A daily agent: pull sources → write props → render → queue for review.
// Wire it to GitHub Actions, a cron job, or a Vercel scheduled function.
{
  "schedule": "0 7 * * *",
  "steps": [
    "fetch: rss + github-trending + saved-tweets",
    "claude: draft 5 hooks -> content/*.json",
    "render: scripts/render-all.mjs",
    "notify: post previews to Slack for approval"
  ]
}`,
  },

  trees: {
    project: [
      {
        label: "content-engine/",
        kind: "dir",
        children: [
          { label: "CLAUDE.md", kind: "file", note: "repo map for the AI" },
          {
            label: "src/",
            kind: "dir",
            children: [
              {
                label: "components/",
                kind: "dir",
                note: "dumb, presentational pieces",
              },
              {
                label: "compositions/",
                kind: "dir",
                note: "reusable video templates",
              },
              {
                label: "motion/",
                kind: "dir",
                note: "animation primitives & easings",
              },
              { label: "Root.tsx", kind: "file", note: "registers every composition" },
            ],
          },
          {
            label: "assets/",
            kind: "dir",
            children: [
              { label: "fonts/", kind: "dir" },
              { label: "images/", kind: "dir" },
              { label: "audio/", kind: "dir" },
            ],
          },
          {
            label: "content/",
            kind: "dir",
            note: "one JSON file = one video",
          },
          {
            label: "prompts/",
            kind: "dir",
            note: "your saved Claude Code prompts",
          },
          {
            label: "scripts/",
            kind: "dir",
            note: "render-all, batch, publish",
          },
          { label: "renders/", kind: "dir", note: "MP4 output (gitignored)" },
        ],
      },
    ] as TreeNode[],
  },

  flows: {
    // Chapter 2 — overall architecture
    architecture: [
      "Idea",
      "Claude Code",
      "Remotion Composition",
      "Rendered Video",
      "CapCut Polish",
      "TikTok / Instagram / YouTube",
    ],
    // Chapter 9 — AI production workflow
    aiWorkflow: [
      "Idea",
      "Script",
      "Storyboard",
      "Composition",
      "Render",
      "Revision",
      "Render",
      "Publish",
    ],
  },

  // Composition library (chapter 16) — names are proper nouns, shared.
  compositions: [
    "Interview", "Quote", "Timeline", "Comparison", "Tweet",
    "Product Showcase", "Travel", "B-Roll", "Tutorial", "Listicle",
    "Hook + Reveal", "Talking Head", "Code Demo", "Before / After",
    "Big Statement", "Stat Card", "Countdown", "Explainer", "Testimonial",
    "News Ticker", "Poll", "Roadmap", "Feature Grid", "Pricing Table",
    "Chart Reveal", "Map Route", "Photo Carousel", "Lyric / Captions",
    "Split Screen", "Intro / Outro", "Lower Third", "FAQ",
  ],
} as const;

// ── English ──────────────────────────────────────────────────────────────────

const en: GuideContent = {
  meta: {
    kicker: "The Developer Handbook",
    title: "The AI Content Engine",
    subtitle:
      "Build an AI-powered video factory. Generate unlimited short-form videos with Claude Code + Remotion + CapCut.",
    author: "by Esteban Toro",
    readingTime: "~45 min read",
    version: "v1.0 · 2026",
  },
  ui: {
    contents: "Contents",
    download: "Download PDF",
    downloading: "Preparing…",
    chapter: "Chapter",
    backToLanding: "Back to the guide page",
    intro: [
      "This is the exact system I use to turn a single idea into weeks of short-form video — without opening a timeline editor for every clip.",
      "You write code once. The AI remixes it forever. Read it top to bottom, or jump to a chapter from the sidebar.",
    ],
  },
  chapters: [
    {
      id: "why",
      number: 1,
      title: "Why this workflow",
      tagline: "Code is the leverage. Manual editing is the tax.",
      blocks: [
        {
          kind: "p",
          text: "Manual video editing does not scale. Every clip starts from a blank timeline, and every change means dragging keyframes by hand. This workflow replaces that loop with a system where the hard work is done once, in code, and reused forever.",
        },
        {
          kind: "p",
          text: "Four ideas make the whole thing work. Each one removes a bottleneck that keeps most creators stuck at one post a week.",
        },
        {
          kind: "grid",
          columns: 2,
          items: [
            {
              name: "AI writes the code",
              desc: "Claude Code turns plain-English intent into TypeScript. You describe the scene; it writes the component, the animation, and the props schema.",
            },
            {
              name: "Remotion renders the video",
              desc: "Video is just React. Deterministic, version-controlled, and rendered from data — so the same template produces a thousand different videos.",
            },
            {
              name: "CapCut polishes the video",
              desc: "The last 10% — captions, music, sound design — is faster by hand. Use CapCut for taste, not for structure.",
            },
            {
              name: "Templates beat manual editing",
              desc: "A composition is a template you fill with data. Build it once, and every future video is a JSON file away instead of an afternoon away.",
            },
          ],
        },
        {
          kind: "flow",
          title: "The shift, in one line",
          steps: [
            { label: "Manual", note: "1 idea → hours of editing → 1 video" },
            { label: "Engine", note: "1 idea → 1 prompt → many videos" },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The mental model",
          text: "Stop thinking 'How do I edit this video?' and start thinking 'What template does this video belong to?'. If the answer is a new template, you build it once and never again.",
        },
      ],
    },
    {
      id: "architecture",
      number: 2,
      title: "Overall architecture",
      tagline: "One pipeline, six stages, fully inspectable.",
      blocks: [
        {
          kind: "p",
          text: "The engine is a linear pipeline. An idea enters on the left and a platform-ready video leaves on the right. Every stage has a single job and hands a clean artifact to the next.",
        },
        {
          kind: "flow",
          title: "The pipeline",
          steps: SHARED.flows.architecture.map((label) => ({ label })),
        },
        {
          kind: "h",
          text: "What each stage does",
        },
        {
          kind: "grid",
          columns: 2,
          items: [
            { name: "Idea", desc: "A single thought worth sharing — a lesson, a hot take, a launch. This is the only manual creative input." },
            { name: "Claude Code", desc: "Expands the idea into a script and structured props (JSON) that match a composition's schema." },
            { name: "Remotion Composition", desc: "The reusable template. It reads the props and renders motion — text, transitions, backgrounds." },
            { name: "Rendered Video", desc: "A deterministic MP4. Same props in, same frames out — every time, on any machine." },
            { name: "CapCut Polish", desc: "Human taste layer: captions, music, SFX, and per-platform export presets." },
            { name: "Distribution", desc: "The finished asset, cut for TikTok, Instagram Reels, and YouTube Shorts." },
          ],
        },
        {
          kind: "callout",
          tone: "note",
          title: "Why linear beats a monolith",
          text: "Because each stage produces a file, you can inspect, cache, and re-run any step alone. A bad render never means a bad idea — you just re-render the last stage.",
        },
      ],
    },
    {
      id: "install-claude",
      number: 3,
      title: "Installing Claude Code",
      tagline: "Your AI pair-programmer, wired into the repo.",
      blocks: [
        {
          kind: "p",
          text: "Claude Code is a terminal-native agent that reads and writes files in your project. Install it globally, authenticate once, and run it from inside any repository.",
        },
        { kind: "code", title: "Install & authenticate", lang: "bash", code: SHARED.code.installClaude },
        {
          kind: "h",
          text: "Project setup",
        },
        {
          kind: "p",
          text: "The single highest-leverage file in your repo is CLAUDE.md. It's a map the agent reads on every session — where compositions live, your naming rules, which commands to run. Keep it short and current.",
        },
        { kind: "code", title: "Scaffold the workspace", lang: "bash", code: SHARED.code.projectInit },
        {
          kind: "callout",
          tone: "tip",
          title: "Treat CLAUDE.md as onboarding docs",
          text: "Everything you'd tell a new teammate on day one belongs here: folder structure, conventions, and 'always do X, never do Y'. The clearer it is, the less you repeat yourself in prompts.",
        },
      ],
    },
    {
      id: "install-remotion",
      number: 4,
      title: "Installing Remotion",
      tagline: "Video as React. Preview, then render.",
      blocks: [
        {
          kind: "p",
          text: "Remotion lets you build videos with React components. You get a live studio to preview your work frame-by-frame, and a CLI to render final MP4s headlessly.",
        },
        { kind: "code", title: "Install & preview", lang: "bash", code: SHARED.code.installRemotion },
        {
          kind: "h",
          text: "Preview vs. render",
        },
        {
          kind: "ul",
          items: [
            "Studio (`remotion studio`) — a hot-reloading preview. Scrub the timeline, tweak props, see changes instantly.",
            "Render (`remotion render`) — headless export to MP4. This is what runs in scripts and CI.",
          ],
        },
        { kind: "code", title: "Render to MP4", lang: "bash", code: SHARED.code.render },
        {
          kind: "h",
          text: "Why compositions matter",
        },
        {
          kind: "p",
          text: "A Composition is Remotion's unit of a video: a component plus its dimensions, frame rate, and duration. Crucially, it takes props — which means one composition is not one video. It's an infinite family of videos, each defined by the data you pass in.",
        },
        {
          kind: "callout",
          tone: "success",
          title: "This is the whole trick",
          text: "Compositions turn 'making a video' into 'providing data'. Once the template exists, producing the next video is a JSON file — not an editing session.",
        },
      ],
    },
    {
      id: "compositions",
      number: 5,
      title: "Understanding compositions",
      tagline: "Every composition is a reusable video template.",
      blocks: [
        {
          kind: "p",
          text: "This is the most important chapter. Internalize it and the rest of the system clicks into place. A composition is a parameterized template: it declares what data it needs, and renders motion from that data.",
        },
        { kind: "code", title: "Registering a composition", lang: "tsx", code: SHARED.code.composition },
        {
          kind: "p",
          text: "The `defaultProps` are just examples. The real power comes from passing different props per render — one composition, unlimited videos. Define the props with a schema so the contract is explicit.",
        },
        { kind: "code", title: "Props are the content API", lang: "tsx", code: SHARED.code.propsSchema },
        {
          kind: "h",
          text: "A starter set of templates",
        },
        {
          kind: "p",
          text: "You don't need many to start. These formats cover the vast majority of short-form content:",
        },
        {
          kind: "grid",
          columns: 3,
          items: [
            { name: "Interview", desc: "Question/answer pairs with speaker labels." },
            { name: "Quote", desc: "A single bold statement with attribution." },
            { name: "Timeline", desc: "Sequential steps or a story arc." },
            { name: "Comparison", desc: "Side-by-side 'this vs. that'." },
            { name: "Tweet", desc: "A rendered social post with reveal." },
            { name: "Product Showcase", desc: "Feature callouts over a mockup." },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Let Claude create new compositions",
          text: "When a format doesn't exist yet, describe it: 'Create a Comparison composition that animates two columns in from the sides with a spring, using our AnimatedText primitive.' Claude scaffolds the file, wires it into Root.tsx, and matches your conventions.",
        },
      ],
    },
    {
      id: "prompting",
      number: 6,
      title: "Prompt engineering",
      tagline: "Direct the agent with intent, not micro-instructions.",
      blocks: [
        {
          kind: "p",
          text: "Prompting Claude Code well is a skill, and it compounds. The goal is to describe outcomes and constraints clearly enough that the agent can make good local decisions — not to dictate every line.",
        },
        {
          kind: "h",
          text: "Principles",
        },
        {
          kind: "ol",
          items: [
            "State the outcome first. 'A 6-second quote scene that feels calm and premium' beats a list of CSS values.",
            "Name your primitives. Tell it to reuse AnimatedText, your easings, your accent tokens — so output stays consistent.",
            "Constrain, don't over-specify. Give ranges ('duration 5–7s', 'spring, not linear') and let it fill the gaps.",
            "Iterate in small diffs. One change per prompt is faster to review and easier to revert.",
            "Show, then generalize. Get one scene perfect, then say 'apply this same treatment to the others'.",
          ],
        },
        {
          kind: "h",
          text: "Example prompts",
        },
        {
          kind: "prompts",
          groups: [
            {
              category: "Create",
              items: [
                "Create a composition that reveals a stat with a counting-up number and a subtle glow.",
                "Generate a title scene: big kicker, headline, and an animated underline.",
              ],
            },
            {
              category: "Refine",
              items: [
                "Modify the animation speed so the entrance is 20% snappier.",
                "Replace all easing with spring animations using our default damping.",
                "Improve the typography — tighten tracking and balance the line breaks.",
              ],
            },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Don't prompt for pixels",
          text: "Asking for 'margin-top: 42px' makes the agent a typist. Asking for 'more breathing room above the headline' makes it a designer. Prompt for the second one.",
        },
      ],
    },
    {
      id: "organizing",
      number: 7,
      title: "Organizing your project",
      tagline: "A folder architecture that scales to hundreds of videos.",
      blocks: [
        {
          kind: "p",
          text: "Structure is what lets the system grow without collapsing into chaos. Separate the reusable (components, motion) from the disposable (content JSON, renders). Here's the layout I use:",
        },
        {
          kind: "tree",
          title: "content-engine/",
          nodes: SHARED.trees.project,
        },
        {
          kind: "grid",
          columns: 2,
          items: [
            { name: "/components", desc: "Presentational, prop-driven pieces. No animation logic — just layout and style." },
            { name: "/compositions", desc: "Reusable video templates registered in Root.tsx. One file per format." },
            { name: "/motion", desc: "Animation primitives, easings, and springs shared across every composition." },
            { name: "/assets", desc: "Fonts, images, and audio. Everything static the renders depend on." },
            { name: "/content", desc: "One JSON file per video. This folder is your production queue." },
            { name: "/prompts", desc: "Your saved, reusable Claude Code prompts — a growing prompt library." },
            { name: "/scripts", desc: "Automation: batch renders, publishing, source scraping." },
            { name: "/renders", desc: "MP4 output. Gitignored — it's a build artifact, not source." },
          ],
        },
        {
          kind: "callout",
          tone: "note",
          title: "The dividing line",
          text: "Anything under /src is code you build once. Anything under /content is data you generate endlessly. Keep that boundary clean and the engine stays fast.",
        },
      ],
    },
    {
      id: "motion-library",
      number: 8,
      title: "Building a motion graphics library",
      tagline: "Your reusable primitives are the moat.",
      blocks: [
        {
          kind: "p",
          text: "This is where your competitive advantage lives. Anyone can render a video; a library of polished, reusable motion primitives is what makes your videos instantly recognizable and fast to produce.",
        },
        {
          kind: "p",
          text: "Build each of these once, then compose them into every template:",
        },
        {
          kind: "grid",
          columns: 3,
          items: [
            { name: "Transitions", desc: "Wipes, fades, and slides between scenes." },
            { name: "Text animations", desc: "Word-by-word reveals, typewriters, kinetic type." },
            { name: "Counters", desc: "Numbers that count up with easing." },
            { name: "Progress bars", desc: "Timelines and loaders that fill on cue." },
            { name: "Cards", desc: "Elevated surfaces with entrance springs." },
            { name: "Graphs & charts", desc: "Animated bars and lines from data." },
            { name: "Backgrounds", desc: "Gradients, grids, and noise fields." },
            { name: "Particles", desc: "Subtle floating accents and confetti." },
            { name: "Lower thirds", desc: "Name/title bars for talking-head clips." },
            { name: "Call-to-actions", desc: "End cards that drive the follow/click." },
            { name: "Icons", desc: "A consistent, animated icon set." },
            { name: "Scene wrappers & layouts", desc: "Safe-area frames and grid systems." },
          ],
        },
        { kind: "code", title: "A primitive you'll reuse everywhere", lang: "tsx", code: SHARED.code.reusableComponent },
        {
          kind: "callout",
          tone: "success",
          title: "Compounding returns",
          text: "Every primitive you add makes the next video faster and every future template richer. Six months in, a new format is an afternoon of composition — because the hard parts already exist.",
        },
      ],
    },
    {
      id: "ai-workflow",
      number: 9,
      title: "The AI workflow",
      tagline: "How Claude moves an idea to a published video.",
      blocks: [
        {
          kind: "p",
          text: "With the pieces in place, here's the loop the agent runs. It's the same every time, which is exactly why it scales.",
        },
        {
          kind: "flow",
          title: "Idea → Publish",
          steps: SHARED.flows.aiWorkflow.map((label) => ({ label })),
        },
        {
          kind: "ol",
          items: [
            "Idea — you provide the seed thought.",
            "Script — Claude drafts a hook, body, and payoff.",
            "Storyboard — it maps the script to scenes and picks compositions.",
            "Composition — it writes or reuses templates and generates the props JSON.",
            "Render — the batch script turns JSON into MP4.",
            "Revision — you give one note; it edits the props or the template.",
            "Render — re-render only what changed.",
            "Publish — export, caption in CapCut, and post.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Keep the human in one place",
          text: "Your judgment belongs at two gates: the idea (is this worth making?) and the revision (is this good?). Everything between them is mechanical — let the agent own it.",
        },
      ],
    },
    {
      id: "iteration",
      number: 10,
      title: "Iteration",
      tagline: "Never touch the timeline. Change the code.",
      blocks: [
        {
          kind: "p",
          text: "The instinct from manual editing is to fix things by hand. Resist it. In this system every change is a prompt, which means every change is repeatable, reviewable, and reversible.",
        },
        {
          kind: "prompts",
          groups: [
            {
              category: "The revision vocabulary",
              items: [
                "Make the animations smoother.",
                "Reduce the duration to 5 seconds.",
                "Improve the pacing — the middle drags.",
                "Change the color palette to match our brand accent.",
                "Use the Comparison composition instead.",
                "Replace the font with our display typeface.",
              ],
            },
          ],
        },
        {
          kind: "split",
          left: {
            title: "Manual editing",
            items: [
              "Every change is one-off",
              "Nothing is reusable",
              "Undo is fragile",
              "Consistency is manual",
            ],
          },
          right: {
            title: "Code-based video",
            items: [
              "Every change is a diff",
              "Fixes apply to all videos",
              "Git is your undo",
              "Consistency is enforced",
            ],
          },
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The one rule",
          text: "If you find yourself dragging a keyframe to fix a Remotion render, stop. That fix should be a prompt, so it survives the next render and applies to every video that uses the template.",
        },
      ],
    },
    {
      id: "capcut",
      number: 11,
      title: "The CapCut workflow",
      tagline: "Code for structure. CapCut for taste.",
      blocks: [
        {
          kind: "p",
          text: "Remotion is unbeatable for anything systematic and repeatable. CapCut is unbeatable for the human, fiddly last mile. Draw a clean line between them and you get the best of both.",
        },
        {
          kind: "split",
          left: {
            title: "Stays in Remotion",
            items: [
              "Layout & typography",
              "Branded motion & transitions",
              "Data-driven scenes",
              "Anything you'll reuse",
            ],
          },
          right: {
            title: "Happens in CapCut",
            items: [
              "Auto-captions & styling",
              "Music & sound effects",
              "Camera shake & final polish",
              "Per-platform export presets",
            ],
          },
        },
        {
          kind: "ul",
          items: [
            "Captions — CapCut's auto-caption is fast and accurate; style it once and save a template.",
            "Music & SFX — sound design is taste-driven and best done by ear, not by code.",
            "Final polish — subtle shake, speed ramps, and grain add a human feel.",
            "Exports — use CapCut's platform presets so each cut fits TikTok, Reels, and Shorts.",
          ],
        },
        {
          kind: "callout",
          tone: "note",
          title: "Best practice",
          text: "Render clean, caption-free video from Remotion. Add captions and audio in CapCut last. That keeps your renders reusable and your captions editable per platform.",
        },
      ],
    },
    {
      id: "automation",
      number: 12,
      title: "Automation ideas",
      tagline: "Feed the engine while you sleep.",
      blocks: [
        {
          kind: "p",
          text: "Once rendering is a script, sourcing becomes the frontier. Point the agent at a stream of raw material and let it draft videos on a schedule for you to approve.",
        },
        {
          kind: "grid",
          columns: 3,
          items: [
            { name: "RSS", desc: "Turn every new post from a feed into a video draft." },
            { name: "YouTube", desc: "Repurpose long-form uploads into short clips." },
            { name: "Blogs", desc: "Convert articles into carousel or quote videos." },
            { name: "News", desc: "Daily digest videos from a news API." },
            { name: "Tweets", desc: "Render your best tweets as social clips." },
            { name: "Reddit", desc: "Top threads become story-time videos." },
            { name: "Product Hunt", desc: "Auto-generate launch announcement clips." },
            { name: "GitHub", desc: "Trending repos → dev-news shorts." },
            { name: "AI Agents", desc: "A scout agent proposes ideas nightly." },
          ],
        },
        { kind: "code", title: "A daily rendering agent", lang: "json", code: SHARED.code.cron },
        {
          kind: "callout",
          tone: "tip",
          title: "Batch, then approve",
          text: "The winning pattern is generate-many, approve-few. Let automation produce ten drafts overnight; you spend five minutes picking the two worth polishing.",
        },
      ],
    },
    {
      id: "best-practices",
      number: 13,
      title: "Best practices",
      tagline: "The habits that keep the engine fast.",
      blocks: [
        {
          kind: "grid",
          columns: 2,
          items: [
            { name: "Small files", desc: "One composition per file. Small surfaces are easier for both you and the agent to reason about." },
            { name: "Reusable assets", desc: "Centralize fonts, colors, and audio. Never hardcode a hex value twice." },
            { name: "Consistent naming", desc: "PascalCase compositions, kebab-case content files. Predictable names, predictable prompts." },
            { name: "Git everything", desc: "Templates and content are text. Commit often; every video is reproducible from a hash." },
            { name: "Versioning", desc: "Tag template changes so old videos still render. Breaking a template shouldn't break the archive." },
            { name: "Component library", desc: "Grow /motion deliberately. It's the asset that appreciates." },
            { name: "Prompt library", desc: "Save the prompts that worked. Your /prompts folder is institutional memory." },
            { name: "Consistency over cleverness", desc: "A recognizable style beats a novel one. Reuse beats reinvention." },
          ],
        },
        {
          kind: "callout",
          tone: "success",
          title: "The north star",
          text: "Optimize for reuse. Every decision that makes the next video cheaper to produce is the right one — even when it costs you more today.",
        },
      ],
    },
    {
      id: "folder-structure",
      number: 14,
      title: "Example folder structure",
      tagline: "The full tree, ready to copy.",
      blocks: [
        {
          kind: "p",
          text: "Here's the complete structure again, annotated — a reference you can scaffold on day one.",
        },
        {
          kind: "tree",
          title: "content-engine/",
          nodes: SHARED.trees.project,
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Scaffold it with one prompt",
          text: "'Create this exact folder structure with placeholder index files and a starter Root.tsx that registers a Quote composition.' Claude builds the skeleton in seconds.",
        },
      ],
    },
    {
      id: "prompt-library",
      number: 15,
      title: "Prompt library",
      tagline: "25+ prompts, grouped and ready to paste.",
      blocks: [
        {
          kind: "p",
          text: "Copy these into your /prompts folder and adapt them. They're written to describe outcomes — swap in your own primitives and tokens.",
        },
        {
          kind: "prompts",
          groups: [
            {
              category: "Scaffolding",
              items: [
                "Create the full project folder structure with placeholder files and a starter Root.tsx.",
                "Register a new composition called Quote with a Zod props schema for quote, author, and accent.",
                "Add a CLAUDE.md that documents our conventions: PascalCase compositions, tokens in /motion.",
              ],
            },
            {
              category: "Creating compositions",
              items: [
                "Create a Stat Card composition: a big number that counts up with a spring and a label below.",
                "Build a Comparison composition with two columns that slide in from opposite sides.",
                "Generate a Tweet composition that renders an avatar, handle, and body with a staggered reveal.",
                "Make a Timeline composition that draws a vertical line and pops in dated events.",
                "Create a Big Statement scene: one line of text, perfectly balanced, with an animated underline.",
              ],
            },
            {
              category: "Animation & motion",
              items: [
                "Replace all linear easings with springs using our default damping of 200.",
                "Make the entrance 20% snappier and add a subtle overshoot.",
                "Add a word-by-word reveal to the headline using our AnimatedText primitive.",
                "Introduce a 6-frame stagger between list items.",
                "Add a slow parallax drift to the background gradient.",
              ],
            },
            {
              category: "Typography & design",
              items: [
                "Improve the typography: tighten tracking, balance line breaks, and cap line length.",
                "Switch the display font to our brand typeface and adjust the scale.",
                "Increase vertical breathing room above the headline.",
                "Ensure all text passes safe-area margins for vertical video.",
              ],
            },
            {
              category: "Refactoring",
              items: [
                "Extract the repeated card markup into a reusable Card primitive in /motion.",
                "Pull every hardcoded color into a tokens file and reference it everywhere.",
                "Split this 200-line composition into smaller scene components.",
              ],
            },
            {
              category: "Content generation",
              items: [
                "From this idea, draft five hooks and write a props JSON file for each in /content.",
                "Turn this blog post into a six-scene storyboard mapped to our compositions.",
                "Rewrite this script to be 15% shorter without losing the payoff.",
              ],
            },
            {
              category: "Automation",
              items: [
                "Write a render-all script that renders every JSON file in /content to /renders.",
                "Create a scheduled agent spec that pulls RSS, drafts hooks, and renders overnight.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "composition-library",
      number: 16,
      title: "Composition library",
      tagline: "30+ templates worth building.",
      blocks: [
        {
          kind: "p",
          text: "A menu of formats that cover almost any short-form idea. Build the ones you'll use weekly first; let the rest arrive on demand when a video needs them.",
        },
        {
          kind: "grid",
          columns: 3,
          items: [
            { name: "Interview", desc: "Q&A pairs with speaker labels and cuts." },
            { name: "Quote", desc: "A bold statement with attribution." },
            { name: "Timeline", desc: "A sequence of dated events or steps." },
            { name: "Comparison", desc: "Two options weighed side by side." },
            { name: "Tweet", desc: "A rendered social post with reveal." },
            { name: "Product Showcase", desc: "Feature callouts over a mockup." },
            { name: "Travel", desc: "Location cards over photo backdrops." },
            { name: "B-Roll", desc: "Text overlays on ambient footage." },
            { name: "Tutorial", desc: "Numbered steps with code or UI." },
            { name: "Listicle", desc: "A countdown of ranked items." },
            { name: "Hook + Reveal", desc: "A tease that resolves on the payoff." },
            { name: "Talking Head", desc: "Framed speaker with lower thirds." },
            { name: "Code Demo", desc: "Syntax-highlighted, typed-in code." },
            { name: "Before / After", desc: "A transformation with a wipe." },
            { name: "Big Statement", desc: "One line, maximum weight." },
            { name: "Stat Card", desc: "A counting-up number with a label." },
            { name: "Countdown", desc: "A ticking timer for launches." },
            { name: "Explainer", desc: "Diagram-driven concept breakdown." },
            { name: "Testimonial", desc: "A customer quote with avatar." },
            { name: "News Ticker", desc: "Scrolling headlines and updates." },
            { name: "Poll", desc: "Animated bars for a question." },
            { name: "Roadmap", desc: "Milestones on a progress track." },
            { name: "Feature Grid", desc: "A grid of icons and labels." },
            { name: "Pricing Table", desc: "Tiers with animated highlights." },
            { name: "Chart Reveal", desc: "Bars or lines that draw from data." },
            { name: "Map Route", desc: "An animated path across a map." },
            { name: "Photo Carousel", desc: "A paced sequence of images." },
            { name: "Lyric / Captions", desc: "Kinetic type synced to audio." },
            { name: "Split Screen", desc: "Two synced panels side by side." },
            { name: "Intro / Outro", desc: "Branded bookends for every video." },
            { name: "Lower Third", desc: "A name/title bar overlay." },
            { name: "FAQ", desc: "Question-and-answer reveal pairs." },
          ],
        },
      ],
    },
    {
      id: "future",
      number: 17,
      title: "Future improvements",
      tagline: "Where the engine goes next.",
      blocks: [
        {
          kind: "p",
          text: "The system you've built is a foundation. Here's the frontier — each of these plugs into the same pipeline you already have.",
        },
        {
          kind: "grid",
          columns: 2,
          items: [
            { name: "Voice cloning", desc: "Generate narration in your own voice from the script — no recording session." },
            { name: "AI avatars", desc: "A synthetic presenter for talking-head formats, driven by the same props." },
            { name: "Agent workflows", desc: "Autonomous scouts that research, draft, and queue videos without a prompt." },
            { name: "Automatic publishing", desc: "Push approved renders straight to each platform's API on a schedule." },
            { name: "Analytics", desc: "Feed performance data back in so the agent learns which hooks land." },
            { name: "A/B testing", desc: "Render variants of a hook and let the numbers pick the winner." },
          ],
        },
        {
          kind: "callout",
          tone: "success",
          title: "You're not editing videos anymore",
          text: "You're operating a factory. The work shifts from making each video to improving the machine that makes them — and that's a game with compounding returns.",
        },
      ],
    },
  ],
};

// ── Spanish ────────────────────────────────────────────────────────────────

const es: GuideContent = {
  meta: {
    kicker: "El Manual del Desarrollador",
    title: "El Motor de Contenido con IA",
    subtitle:
      "Construye una fábrica de video con IA. Genera videos cortos ilimitados con Claude Code + Remotion + CapCut.",
    author: "por Esteban Toro",
    readingTime: "~45 min de lectura",
    version: "v1.0 · 2026",
  },
  ui: {
    contents: "Contenido",
    download: "Descargar PDF",
    downloading: "Preparando…",
    chapter: "Capítulo",
    backToLanding: "Volver a la página de la guía",
    intro: [
      "Este es el sistema exacto que uso para convertir una sola idea en semanas de video corto — sin abrir un editor de timeline para cada clip.",
      "Escribes el código una vez. La IA lo remezcla para siempre. Léelo de principio a fin, o salta a un capítulo desde la barra lateral.",
    ],
  },
  chapters: [
    {
      id: "why",
      number: 1,
      title: "Por qué este flujo de trabajo",
      tagline: "El código es la palanca. La edición manual es el impuesto.",
      blocks: [
        {
          kind: "p",
          text: "La edición manual de video no escala. Cada clip empieza desde un timeline en blanco, y cada cambio significa arrastrar keyframes a mano. Este flujo reemplaza ese bucle por un sistema donde el trabajo difícil se hace una vez, en código, y se reutiliza para siempre.",
        },
        {
          kind: "p",
          text: "Cuatro ideas hacen que todo funcione. Cada una elimina un cuello de botella que mantiene a la mayoría de creadores atascados en un post por semana.",
        },
        {
          kind: "grid",
          columns: 2,
          items: [
            {
              name: "La IA escribe el código",
              desc: "Claude Code convierte la intención en lenguaje natural en TypeScript. Describes la escena; él escribe el componente, la animación y el esquema de props.",
            },
            {
              name: "Remotion renderiza el video",
              desc: "El video es solo React. Determinista, versionado y renderizado desde datos — así la misma plantilla produce mil videos distintos.",
            },
            {
              name: "CapCut pule el video",
              desc: "El último 10% — subtítulos, música, diseño de sonido — es más rápido a mano. Usa CapCut para el gusto, no para la estructura.",
            },
            {
              name: "Las plantillas ganan a la edición manual",
              desc: "Una composición es una plantilla que rellenas con datos. Constrúyela una vez, y cada video futuro está a un archivo JSON de distancia, no a una tarde.",
            },
          ],
        },
        {
          kind: "flow",
          title: "El cambio, en una línea",
          steps: [
            { label: "Manual", note: "1 idea → horas de edición → 1 video" },
            { label: "Motor", note: "1 idea → 1 prompt → muchos videos" },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "El modelo mental",
          text: "Deja de pensar '¿cómo edito este video?' y empieza a pensar '¿a qué plantilla pertenece este video?'. Si la respuesta es una plantilla nueva, la construyes una vez y nunca más.",
        },
      ],
    },
    {
      id: "architecture",
      number: 2,
      title: "Arquitectura general",
      tagline: "Un pipeline, seis etapas, totalmente inspeccionable.",
      blocks: [
        {
          kind: "p",
          text: "El motor es un pipeline lineal. Una idea entra por la izquierda y un video listo para la plataforma sale por la derecha. Cada etapa tiene un solo trabajo y entrega un artefacto limpio a la siguiente.",
        },
        {
          kind: "flow",
          title: "El pipeline",
          steps: SHARED.flows.architecture.map((label) => ({ label })),
        },
        {
          kind: "h",
          text: "Qué hace cada etapa",
        },
        {
          kind: "grid",
          columns: 2,
          items: [
            { name: "Idea", desc: "Un solo pensamiento que vale la pena compartir — una lección, una opinión, un lanzamiento. Es el único aporte creativo manual." },
            { name: "Claude Code", desc: "Expande la idea en un guion y props estructurados (JSON) que coinciden con el esquema de una composición." },
            { name: "Composición Remotion", desc: "La plantilla reutilizable. Lee las props y renderiza motion — texto, transiciones, fondos." },
            { name: "Video renderizado", desc: "Un MP4 determinista. Las mismas props entran, los mismos frames salen — siempre, en cualquier máquina." },
            { name: "Ajuste en CapCut", desc: "Capa de gusto humano: subtítulos, música, efectos y presets de exportación por plataforma." },
            { name: "Distribución", desc: "El activo terminado, editado para TikTok, Instagram Reels y YouTube Shorts." },
          ],
        },
        {
          kind: "callout",
          tone: "note",
          title: "Por qué lineal gana a un monolito",
          text: "Como cada etapa produce un archivo, puedes inspeccionar, cachear y re-ejecutar cualquier paso por separado. Un mal render nunca significa una mala idea — solo vuelves a renderizar la última etapa.",
        },
      ],
    },
    {
      id: "install-claude",
      number: 3,
      title: "Instalando Claude Code",
      tagline: "Tu programador de IA, conectado al repositorio.",
      blocks: [
        {
          kind: "p",
          text: "Claude Code es un agente nativo de terminal que lee y escribe archivos en tu proyecto. Instálalo globalmente, autentícate una vez y ejecútalo desde dentro de cualquier repositorio.",
        },
        { kind: "code", title: "Instalar y autenticar", lang: "bash", code: SHARED.code.installClaude },
        {
          kind: "h",
          text: "Configuración del proyecto",
        },
        {
          kind: "p",
          text: "El archivo con más palanca de tu repo es CLAUDE.md. Es un mapa que el agente lee en cada sesión — dónde viven las composiciones, tus reglas de nombres, qué comandos ejecutar. Mantenlo corto y actual.",
        },
        { kind: "code", title: "Preparar el espacio de trabajo", lang: "bash", code: SHARED.code.projectInit },
        {
          kind: "callout",
          tone: "tip",
          title: "Trata CLAUDE.md como docs de onboarding",
          text: "Todo lo que le dirías a un compañero nuevo el primer día va aquí: estructura de carpetas, convenciones y 'siempre haz X, nunca hagas Y'. Cuanto más claro sea, menos te repites en los prompts.",
        },
      ],
    },
    {
      id: "install-remotion",
      number: 4,
      title: "Instalando Remotion",
      tagline: "Video como React. Previsualiza, luego renderiza.",
      blocks: [
        {
          kind: "p",
          text: "Remotion te permite construir videos con componentes de React. Tienes un studio en vivo para previsualizar tu trabajo frame por frame, y una CLI para renderizar MP4s finales sin interfaz.",
        },
        { kind: "code", title: "Instalar y previsualizar", lang: "bash", code: SHARED.code.installRemotion },
        {
          kind: "h",
          text: "Preview vs. render",
        },
        {
          kind: "ul",
          items: [
            "Studio (`remotion studio`) — una vista previa con recarga en caliente. Recorre el timeline, ajusta props, ve los cambios al instante.",
            "Render (`remotion render`) — exportación sin interfaz a MP4. Esto es lo que corre en scripts y CI.",
          ],
        },
        { kind: "code", title: "Renderizar a MP4", lang: "bash", code: SHARED.code.render },
        {
          kind: "h",
          text: "Por qué importan las composiciones",
        },
        {
          kind: "p",
          text: "Una Composición es la unidad de video de Remotion: un componente más sus dimensiones, frame rate y duración. Lo crucial: recibe props — lo que significa que una composición no es un video. Es una familia infinita de videos, cada uno definido por los datos que le pasas.",
        },
        {
          kind: "callout",
          tone: "success",
          title: "Este es todo el truco",
          text: "Las composiciones convierten 'hacer un video' en 'proveer datos'. Una vez que la plantilla existe, producir el siguiente video es un archivo JSON — no una sesión de edición.",
        },
      ],
    },
    {
      id: "compositions",
      number: 5,
      title: "Entendiendo las composiciones",
      tagline: "Cada composición es una plantilla de video reutilizable.",
      blocks: [
        {
          kind: "p",
          text: "Este es el capítulo más importante. Interiorízalo y el resto del sistema encaja. Una composición es una plantilla parametrizada: declara qué datos necesita y renderiza motion a partir de esos datos.",
        },
        { kind: "code", title: "Registrar una composición", lang: "tsx", code: SHARED.code.composition },
        {
          kind: "p",
          text: "Las `defaultProps` son solo ejemplos. El poder real viene de pasar props distintos por render — una composición, videos ilimitados. Define las props con un esquema para que el contrato sea explícito.",
        },
        { kind: "code", title: "Las props son la API de contenido", lang: "tsx", code: SHARED.code.propsSchema },
        {
          kind: "h",
          text: "Un set inicial de plantillas",
        },
        {
          kind: "p",
          text: "No necesitas muchas para empezar. Estos formatos cubren la gran mayoría del contenido corto:",
        },
        {
          kind: "grid",
          columns: 3,
          items: [
            { name: "Interview", desc: "Pares de pregunta/respuesta con etiquetas de quien habla." },
            { name: "Quote", desc: "Una sola frase potente con atribución." },
            { name: "Timeline", desc: "Pasos secuenciales o un arco narrativo." },
            { name: "Comparison", desc: "Lado a lado 'esto vs. aquello'." },
            { name: "Tweet", desc: "Un post social renderizado con revelación." },
            { name: "Product Showcase", desc: "Destacados de funciones sobre un mockup." },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Deja que Claude cree composiciones nuevas",
          text: "Cuando un formato aún no existe, descríbelo: 'Crea una composición Comparison que anime dos columnas entrando desde los lados con un spring, usando nuestro primitivo AnimatedText.' Claude arma el archivo, lo conecta en Root.tsx y respeta tus convenciones.",
        },
      ],
    },
    {
      id: "prompting",
      number: 6,
      title: "Ingeniería de prompts",
      tagline: "Dirige al agente con intención, no con microinstrucciones.",
      blocks: [
        {
          kind: "p",
          text: "Escribir buenos prompts para Claude Code es una habilidad, y compone. La meta es describir resultados y restricciones con la claridad suficiente para que el agente tome buenas decisiones locales — no dictar cada línea.",
        },
        {
          kind: "h",
          text: "Principios",
        },
        {
          kind: "ol",
          items: [
            "Enuncia el resultado primero. 'Una escena de cita de 6 segundos que se sienta calmada y premium' gana a una lista de valores CSS.",
            "Nombra tus primitivos. Dile que reutilice AnimatedText, tus easings, tus tokens de acento — para que la salida sea consistente.",
            "Restringe, no sobre-especifiques. Da rangos ('duración 5–7s', 'spring, no lineal') y deja que rellene los huecos.",
            "Itera en diffs pequeños. Un cambio por prompt es más rápido de revisar y más fácil de revertir.",
            "Muestra, luego generaliza. Deja una escena perfecta, luego di 'aplica este mismo tratamiento a las demás'.",
          ],
        },
        {
          kind: "h",
          text: "Prompts de ejemplo",
        },
        {
          kind: "prompts",
          groups: [
            {
              category: "Crear",
              items: [
                "Crea una composición que revele una estadística con un número que cuenta hacia arriba y un brillo sutil.",
                "Genera una escena de título: kicker grande, titular y un subrayado animado.",
              ],
            },
            {
              category: "Refinar",
              items: [
                "Modifica la velocidad de la animación para que la entrada sea 20% más ágil.",
                "Reemplaza todos los easings con animaciones spring usando nuestro damping por defecto.",
                "Mejora la tipografía — ajusta el tracking y equilibra los saltos de línea.",
              ],
            },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "No pidas píxeles",
          text: "Pedir 'margin-top: 42px' convierte al agente en un mecanógrafo. Pedir 'más aire arriba del titular' lo convierte en un diseñador. Pide lo segundo.",
        },
      ],
    },
    {
      id: "organizing",
      number: 7,
      title: "Organizando tu proyecto",
      tagline: "Una arquitectura de carpetas que escala a cientos de videos.",
      blocks: [
        {
          kind: "p",
          text: "La estructura es lo que deja crecer al sistema sin colapsar en el caos. Separa lo reutilizable (componentes, motion) de lo desechable (JSON de contenido, renders). Este es el layout que uso:",
        },
        {
          kind: "tree",
          title: "content-engine/",
          nodes: SHARED.trees.project,
        },
        {
          kind: "grid",
          columns: 2,
          items: [
            { name: "/components", desc: "Piezas presentacionales, guiadas por props. Sin lógica de animación — solo layout y estilo." },
            { name: "/compositions", desc: "Plantillas de video reutilizables registradas en Root.tsx. Un archivo por formato." },
            { name: "/motion", desc: "Primitivos de animación, easings y springs compartidos por cada composición." },
            { name: "/assets", desc: "Fuentes, imágenes y audio. Todo lo estático de lo que dependen los renders." },
            { name: "/content", desc: "Un archivo JSON por video. Esta carpeta es tu cola de producción." },
            { name: "/prompts", desc: "Tus prompts de Claude Code guardados y reutilizables — una librería de prompts que crece." },
            { name: "/scripts", desc: "Automatización: renders por lotes, publicación, scraping de fuentes." },
            { name: "/renders", desc: "Salida MP4. En gitignore — es un artefacto de build, no código fuente." },
          ],
        },
        {
          kind: "callout",
          tone: "note",
          title: "La línea divisoria",
          text: "Todo bajo /src es código que construyes una vez. Todo bajo /content son datos que generas sin fin. Mantén ese límite limpio y el motor sigue rápido.",
        },
      ],
    },
    {
      id: "motion-library",
      number: 8,
      title: "Construyendo una librería de motion graphics",
      tagline: "Tus primitivos reutilizables son el foso defensivo.",
      blocks: [
        {
          kind: "p",
          text: "Aquí vive tu ventaja competitiva. Cualquiera puede renderizar un video; una librería de primitivos de motion pulidos y reutilizables es lo que hace que tus videos sean reconocibles al instante y rápidos de producir.",
        },
        {
          kind: "p",
          text: "Construye cada uno de estos una vez, luego compónlos en cada plantilla:",
        },
        {
          kind: "grid",
          columns: 3,
          items: [
            { name: "Transiciones", desc: "Barridos, fundidos y deslizamientos entre escenas." },
            { name: "Animaciones de texto", desc: "Revelaciones palabra por palabra, máquina de escribir, tipografía cinética." },
            { name: "Contadores", desc: "Números que cuentan hacia arriba con easing." },
            { name: "Barras de progreso", desc: "Timelines y loaders que se llenan a tiempo." },
            { name: "Tarjetas", desc: "Superficies elevadas con springs de entrada." },
            { name: "Gráficos y charts", desc: "Barras y líneas animadas desde datos." },
            { name: "Fondos", desc: "Gradientes, grillas y campos de ruido." },
            { name: "Partículas", desc: "Acentos flotantes sutiles y confeti." },
            { name: "Lower thirds", desc: "Barras de nombre/título para clips a cámara." },
            { name: "Llamados a la acción", desc: "Tarjetas finales que impulsan el follow/clic." },
            { name: "Íconos", desc: "Un set de íconos animado y consistente." },
            { name: "Wrappers y layouts de escena", desc: "Marcos de área segura y sistemas de grilla." },
          ],
        },
        { kind: "code", title: "Un primitivo que reutilizarás en todas partes", lang: "tsx", code: SHARED.code.reusableComponent },
        {
          kind: "callout",
          tone: "success",
          title: "Retornos que componen",
          text: "Cada primitivo que agregas hace el siguiente video más rápido y cada plantilla futura más rica. A los seis meses, un formato nuevo es una tarde de composición — porque las partes difíciles ya existen.",
        },
      ],
    },
    {
      id: "ai-workflow",
      number: 9,
      title: "El flujo de trabajo con IA",
      tagline: "Cómo Claude lleva una idea a un video publicado.",
      blocks: [
        {
          kind: "p",
          text: "Con las piezas en su lugar, este es el bucle que ejecuta el agente. Es el mismo cada vez, y por eso exactamente escala.",
        },
        {
          kind: "flow",
          title: "Idea → Publicar",
          steps: SHARED.flows.aiWorkflow.map((label) => ({ label })),
        },
        {
          kind: "ol",
          items: [
            "Idea — tú aportas el pensamiento semilla.",
            "Guion — Claude redacta un hook, cuerpo y remate.",
            "Storyboard — mapea el guion a escenas y elige composiciones.",
            "Composición — escribe o reutiliza plantillas y genera el JSON de props.",
            "Render — el script por lotes convierte el JSON en MP4.",
            "Revisión — das una sola nota; edita las props o la plantilla.",
            "Render — vuelve a renderizar solo lo que cambió.",
            "Publicar — exporta, subtitula en CapCut y publica.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Mantén al humano en un solo lugar",
          text: "Tu criterio va en dos puertas: la idea (¿vale la pena hacerlo?) y la revisión (¿está bueno?). Todo lo que hay entre medio es mecánico — deja que el agente sea el dueño.",
        },
      ],
    },
    {
      id: "iteration",
      number: 10,
      title: "Iteración",
      tagline: "Nunca toques el timeline. Cambia el código.",
      blocks: [
        {
          kind: "p",
          text: "El instinto de la edición manual es arreglar las cosas a mano. Resístelo. En este sistema cada cambio es un prompt, lo que significa que cada cambio es repetible, revisable y reversible.",
        },
        {
          kind: "prompts",
          groups: [
            {
              category: "El vocabulario de revisión",
              items: [
                "Haz las animaciones más suaves.",
                "Reduce la duración a 5 segundos.",
                "Mejora el ritmo — el medio se arrastra.",
                "Cambia la paleta de colores para que coincida con nuestro acento de marca.",
                "Usa la composición Comparison en su lugar.",
                "Reemplaza la fuente con nuestra tipografía display.",
              ],
            },
          ],
        },
        {
          kind: "split",
          left: {
            title: "Edición manual",
            items: [
              "Cada cambio es único",
              "Nada es reutilizable",
              "Deshacer es frágil",
              "La consistencia es manual",
            ],
          },
          right: {
            title: "Video basado en código",
            items: [
              "Cada cambio es un diff",
              "Los arreglos aplican a todos los videos",
              "Git es tu deshacer",
              "La consistencia se impone",
            ],
          },
        },
        {
          kind: "callout",
          tone: "warning",
          title: "La única regla",
          text: "Si te encuentras arrastrando un keyframe para arreglar un render de Remotion, detente. Ese arreglo debería ser un prompt, para que sobreviva al siguiente render y aplique a cada video que usa la plantilla.",
        },
      ],
    },
    {
      id: "capcut",
      number: 11,
      title: "El flujo de trabajo con CapCut",
      tagline: "Código para la estructura. CapCut para el gusto.",
      blocks: [
        {
          kind: "p",
          text: "Remotion es imbatible para todo lo sistemático y repetible. CapCut es imbatible para la última milla humana y detallista. Traza una línea limpia entre ambos y obtienes lo mejor de los dos.",
        },
        {
          kind: "split",
          left: {
            title: "Se queda en Remotion",
            items: [
              "Layout y tipografía",
              "Motion y transiciones de marca",
              "Escenas guiadas por datos",
              "Todo lo que reutilizarás",
            ],
          },
          right: {
            title: "Sucede en CapCut",
            items: [
              "Autosubtítulos y estilo",
              "Música y efectos de sonido",
              "Camera shake y ajuste final",
              "Presets de exportación por plataforma",
            ],
          },
        },
        {
          kind: "ul",
          items: [
            "Subtítulos — el autosubtitulado de CapCut es rápido y preciso; dale estilo una vez y guarda una plantilla.",
            "Música y SFX — el diseño de sonido va guiado por el gusto y se hace mejor de oído, no con código.",
            "Ajuste final — un shake sutil, rampas de velocidad y grano dan una sensación humana.",
            "Exportaciones — usa los presets de plataforma de CapCut para que cada corte encaje en TikTok, Reels y Shorts.",
          ],
        },
        {
          kind: "callout",
          tone: "note",
          title: "Buena práctica",
          text: "Renderiza video limpio y sin subtítulos desde Remotion. Agrega subtítulos y audio en CapCut al final. Eso mantiene tus renders reutilizables y tus subtítulos editables por plataforma.",
        },
      ],
    },
    {
      id: "automation",
      number: 12,
      title: "Ideas de automatización",
      tagline: "Alimenta el motor mientras duermes.",
      blocks: [
        {
          kind: "p",
          text: "Una vez que renderizar es un script, conseguir fuentes se vuelve la frontera. Apunta el agente a un flujo de material bruto y deja que redacte videos en un horario para que tú apruebes.",
        },
        {
          kind: "grid",
          columns: 3,
          items: [
            { name: "RSS", desc: "Convierte cada post nuevo de un feed en un borrador de video." },
            { name: "YouTube", desc: "Reutiliza subidas largas en clips cortos." },
            { name: "Blogs", desc: "Convierte artículos en videos de carrusel o cita." },
            { name: "Noticias", desc: "Videos de resumen diario desde una API de noticias." },
            { name: "Tweets", desc: "Renderiza tus mejores tweets como clips sociales." },
            { name: "Reddit", desc: "Los hilos top se vuelven videos tipo story-time." },
            { name: "Product Hunt", desc: "Genera clips de anuncio de lanzamiento automáticamente." },
            { name: "GitHub", desc: "Repos en tendencia → shorts de dev-news." },
            { name: "Agentes de IA", desc: "Un agente explorador propone ideas cada noche." },
          ],
        },
        { kind: "code", title: "Un agente de render diario", lang: "json", code: SHARED.code.cron },
        {
          kind: "callout",
          tone: "tip",
          title: "Genera por lotes, luego aprueba",
          text: "El patrón ganador es generar-muchos, aprobar-pocos. Deja que la automatización produzca diez borradores durante la noche; tú gastas cinco minutos eligiendo los dos que vale la pena pulir.",
        },
      ],
    },
    {
      id: "best-practices",
      number: 13,
      title: "Buenas prácticas",
      tagline: "Los hábitos que mantienen rápido al motor.",
      blocks: [
        {
          kind: "grid",
          columns: 2,
          items: [
            { name: "Archivos pequeños", desc: "Una composición por archivo. Las superficies pequeñas son más fáciles de razonar para ti y para el agente." },
            { name: "Assets reutilizables", desc: "Centraliza fuentes, colores y audio. Nunca codifiques un valor hex dos veces." },
            { name: "Nombres consistentes", desc: "Composiciones en PascalCase, archivos de contenido en kebab-case. Nombres predecibles, prompts predecibles." },
            { name: "Todo en Git", desc: "Plantillas y contenido son texto. Commitea seguido; cada video es reproducible desde un hash." },
            { name: "Versionado", desc: "Etiqueta los cambios de plantilla para que los videos viejos aún rendericen. Romper una plantilla no debería romper el archivo histórico." },
            { name: "Librería de componentes", desc: "Haz crecer /motion con intención. Es el activo que se revaloriza." },
            { name: "Librería de prompts", desc: "Guarda los prompts que funcionaron. Tu carpeta /prompts es memoria institucional." },
            { name: "Consistencia sobre ingenio", desc: "Un estilo reconocible gana a uno novedoso. Reutilizar gana a reinventar." },
          ],
        },
        {
          kind: "callout",
          tone: "success",
          title: "La estrella polar",
          text: "Optimiza para la reutilización. Cada decisión que hace más barato producir el siguiente video es la correcta — incluso cuando hoy te cuesta más.",
        },
      ],
    },
    {
      id: "folder-structure",
      number: 14,
      title: "Estructura de carpetas de ejemplo",
      tagline: "El árbol completo, listo para copiar.",
      blocks: [
        {
          kind: "p",
          text: "Aquí está de nuevo la estructura completa, anotada — una referencia que puedes armar el primer día.",
        },
        {
          kind: "tree",
          title: "content-engine/",
          nodes: SHARED.trees.project,
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Ármala con un solo prompt",
          text: "'Crea esta estructura de carpetas exacta con archivos index de placeholder y un Root.tsx inicial que registre una composición Quote.' Claude construye el esqueleto en segundos.",
        },
      ],
    },
    {
      id: "prompt-library",
      number: 15,
      title: "Librería de prompts",
      tagline: "Más de 25 prompts, agrupados y listos para pegar.",
      blocks: [
        {
          kind: "p",
          text: "Copia estos a tu carpeta /prompts y adáptalos. Están escritos para describir resultados — cambia tus propios primitivos y tokens.",
        },
        {
          kind: "prompts",
          groups: [
            {
              category: "Andamiaje",
              items: [
                "Crea la estructura de carpetas completa del proyecto con archivos placeholder y un Root.tsx inicial.",
                "Registra una composición nueva llamada Quote con un esquema Zod de props para quote, author y accent.",
                "Agrega un CLAUDE.md que documente nuestras convenciones: composiciones en PascalCase, tokens en /motion.",
              ],
            },
            {
              category: "Crear composiciones",
              items: [
                "Crea una composición Stat Card: un número grande que cuenta hacia arriba con un spring y una etiqueta debajo.",
                "Construye una composición Comparison con dos columnas que se deslizan desde lados opuestos.",
                "Genera una composición Tweet que renderice un avatar, handle y cuerpo con una revelación escalonada.",
                "Haz una composición Timeline que dibuje una línea vertical y haga aparecer eventos con fecha.",
                "Crea una escena Big Statement: una línea de texto, perfectamente equilibrada, con un subrayado animado.",
              ],
            },
            {
              category: "Animación y motion",
              items: [
                "Reemplaza todos los easings lineales con springs usando nuestro damping por defecto de 200.",
                "Haz la entrada 20% más ágil y agrega un overshoot sutil.",
                "Agrega una revelación palabra por palabra al titular usando nuestro primitivo AnimatedText.",
                "Introduce un stagger de 6 frames entre los ítems de la lista.",
                "Agrega una deriva de parallax lenta al gradiente de fondo.",
              ],
            },
            {
              category: "Tipografía y diseño",
              items: [
                "Mejora la tipografía: ajusta el tracking, equilibra los saltos de línea y limita el largo de línea.",
                "Cambia la fuente display a nuestra tipografía de marca y ajusta la escala.",
                "Aumenta el aire vertical arriba del titular.",
                "Asegura que todo el texto respete los márgenes de área segura para video vertical.",
              ],
            },
            {
              category: "Refactorización",
              items: [
                "Extrae el markup de tarjeta repetido a un primitivo Card reutilizable en /motion.",
                "Lleva cada color hardcodeado a un archivo de tokens y referéncialo en todas partes.",
                "Divide esta composición de 200 líneas en componentes de escena más pequeños.",
              ],
            },
            {
              category: "Generación de contenido",
              items: [
                "A partir de esta idea, redacta cinco hooks y escribe un archivo JSON de props para cada uno en /content.",
                "Convierte este post de blog en un storyboard de seis escenas mapeado a nuestras composiciones.",
                "Reescribe este guion para que sea 15% más corto sin perder el remate.",
              ],
            },
            {
              category: "Automatización",
              items: [
                "Escribe un script render-all que renderice cada archivo JSON en /content a /renders.",
                "Crea una especificación de agente programado que traiga RSS, redacte hooks y renderice de noche.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "composition-library",
      number: 16,
      title: "Librería de composiciones",
      tagline: "Más de 30 plantillas que vale la pena construir.",
      blocks: [
        {
          kind: "p",
          text: "Un menú de formatos que cubre casi cualquier idea de video corto. Construye primero las que usarás cada semana; deja que el resto llegue a demanda cuando un video las necesite.",
        },
        {
          kind: "grid",
          columns: 3,
          items: [
            { name: "Interview", desc: "Pares de Q&A con etiquetas de quien habla y cortes." },
            { name: "Quote", desc: "Una frase potente con atribución." },
            { name: "Timeline", desc: "Una secuencia de eventos con fecha o pasos." },
            { name: "Comparison", desc: "Dos opciones sopesadas lado a lado." },
            { name: "Tweet", desc: "Un post social renderizado con revelación." },
            { name: "Product Showcase", desc: "Destacados de funciones sobre un mockup." },
            { name: "Travel", desc: "Tarjetas de ubicación sobre fondos de fotos." },
            { name: "B-Roll", desc: "Texto superpuesto sobre metraje ambiente." },
            { name: "Tutorial", desc: "Pasos numerados con código o UI." },
            { name: "Listicle", desc: "Una cuenta regresiva de ítems rankeados." },
            { name: "Hook + Reveal", desc: "Una intriga que se resuelve en el remate." },
            { name: "Talking Head", desc: "Orador enmarcado con lower thirds." },
            { name: "Code Demo", desc: "Código tipeado con resaltado de sintaxis." },
            { name: "Before / After", desc: "Una transformación con un barrido." },
            { name: "Big Statement", desc: "Una línea, máximo peso." },
            { name: "Stat Card", desc: "Un número que cuenta hacia arriba con etiqueta." },
            { name: "Countdown", desc: "Un temporizador para lanzamientos." },
            { name: "Explainer", desc: "Desglose de concepto guiado por diagramas." },
            { name: "Testimonial", desc: "Una cita de cliente con avatar." },
            { name: "News Ticker", desc: "Titulares y actualizaciones en scroll." },
            { name: "Poll", desc: "Barras animadas para una pregunta." },
            { name: "Roadmap", desc: "Hitos en una pista de progreso." },
            { name: "Feature Grid", desc: "Una grilla de íconos y etiquetas." },
            { name: "Pricing Table", desc: "Planes con destacados animados." },
            { name: "Chart Reveal", desc: "Barras o líneas que se dibujan desde datos." },
            { name: "Map Route", desc: "Un camino animado por un mapa." },
            { name: "Photo Carousel", desc: "Una secuencia rítmica de imágenes." },
            { name: "Lyric / Captions", desc: "Tipografía cinética sincronizada al audio." },
            { name: "Split Screen", desc: "Dos paneles sincronizados lado a lado." },
            { name: "Intro / Outro", desc: "Cierres de marca para cada video." },
            { name: "Lower Third", desc: "Una barra superpuesta de nombre/título." },
            { name: "FAQ", desc: "Pares de pregunta y respuesta con revelación." },
          ],
        },
      ],
    },
    {
      id: "future",
      number: 17,
      title: "Mejoras futuras",
      tagline: "Hacia dónde va el motor.",
      blocks: [
        {
          kind: "p",
          text: "El sistema que construiste es una base. Esta es la frontera — cada una de estas se conecta al mismo pipeline que ya tienes.",
        },
        {
          kind: "grid",
          columns: 2,
          items: [
            { name: "Clonación de voz", desc: "Genera narración con tu propia voz desde el guion — sin sesión de grabación." },
            { name: "Avatares de IA", desc: "Un presentador sintético para formatos a cámara, guiado por las mismas props." },
            { name: "Flujos de agentes", desc: "Exploradores autónomos que investigan, redactan y encolan videos sin un prompt." },
            { name: "Publicación automática", desc: "Envía renders aprobados directo a la API de cada plataforma en un horario." },
            { name: "Analítica", desc: "Retroalimenta datos de rendimiento para que el agente aprenda qué hooks funcionan." },
            { name: "Pruebas A/B", desc: "Renderiza variantes de un hook y deja que los números elijan al ganador." },
          ],
        },
        {
          kind: "callout",
          tone: "success",
          title: "Ya no editas videos",
          text: "Operas una fábrica. El trabajo se mueve de hacer cada video a mejorar la máquina que los hace — y ese es un juego con retornos que componen.",
        },
      ],
    },
  ],
};

// ── Public API ────────────────────────────────────────────────────────────

export const guideContent: Record<Locale, GuideContent> = { en, es };

export function getGuide(locale: Locale): GuideContent {
  return guideContent[locale];
}
