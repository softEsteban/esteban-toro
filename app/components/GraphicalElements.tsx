"use client";

import { useState, useEffect, useRef } from "react";

// ─── Static data ───────────────────────────────────────────────────────────────

const NODES = [
  { id: 0, x: 100, y: 80,  label: "Systems",  desc: "The backbone of everything",  active: true  },
  { id: 1, x: 250, y: 45,  label: "Design",   desc: "How it feels to use it",      active: true  },
  { id: 2, x: 400, y: 105, label: "Writing",  desc: "Thinking through words",      active: false },
  { id: 3, x: 170, y: 170, label: "Code",     desc: "Ideas made executable",       active: true  },
  { id: 4, x: 340, y: 195, label: "Strategy", desc: "Zooming out for leverage",    active: false },
  { id: 5, x: 470, y: 55,  label: "Ideas",    desc: "The raw material",             active: true  },
  { id: 6, x: 60,  y: 185, label: "Nature",   desc: "The original system",         active: false },
];

const EDGES = [[0,1],[0,3],[1,2],[1,5],[3,4],[2,4],[5,2],[0,6],[6,3]] as [number,number][];

// fixed particles — no Math.random to avoid hydration issues
const GRAPH_PARTICLES = [
  { cx: 45,  cy: 120, r: 1.2, dur: 4.5, delay: 0.3 },
  { cx: 200, cy: 28,  r: 0.9, dur: 5.2, delay: 1.1 },
  { cx: 320, cy: 195, r: 1.6, dur: 3.9, delay: 0.7 },
  { cx: 490, cy: 140, r: 1,   dur: 6.1, delay: 2.0 },
  { cx: 130, cy: 220, r: 1.4, dur: 4.8, delay: 0.5 },
  { cx: 390, cy: 20,  r: 0.8, dur: 5.7, delay: 1.8 },
  { cx: 520, cy: 200, r: 1.1, dur: 4.2, delay: 0.9 },
  { cx: 75,  cy: 50,  r: 1.3, dur: 5.5, delay: 1.4 },
  { cx: 280, cy: 230, r: 0.9, dur: 3.6, delay: 2.3 },
  { cx: 445, cy: 165, r: 1.5, dur: 4.9, delay: 0.2 },
];

const SYSTEM_CARDS = [
  { input: "Morning silence",  process: "Deep focus",       output: "Clarity",  inputIcon: "☀️", processIcon: "⚙️", outputIcon: "✦" },
  { input: "Raw idea",         process: "Research + Build", output: "Product",  inputIcon: "💡", processIcon: "🔧", outputIcon: "✦" },
  { input: "A problem",        process: "Framework",        output: "Decision", inputIcon: "❓", processIcon: "🗂️", outputIcon: "✦" },
];

const TIMELINE = [
  { year: "2018", role: "Student",            note: "Learning to think",      icon: "📖" },
  { year: "2020", role: "First Code",         note: "Hello, world.",          icon: "💻" },
  { year: "2021", role: "First Product",      note: "Shipped something real", icon: "🚀" },
  { year: "2022", role: "Going Deep",         note: "Systems over shortcuts", icon: "🌊" },
  { year: "2023", role: "Systems Thinker",    note: "Frameworks everywhere",  icon: "🕸️" },
  { year: "2024", role: "Builder + Designer", note: "Beauty meets function",  icon: "🎨" },
  { year: "2025", role: "Living the Work",    note: "This is the way",        icon: "⚡" },
];

const IDENTITY_LAYERS = [
  { role: "Builder",    accent: "#f59e0b", bg: "#1c1917", desc: "I build systems that solve real problems. Code is just the material.",            icon: "B" },
  { role: "Thinker",   accent: "#38bdf8", bg: "#292524", desc: "I think in frameworks, not tasks. The map is the product.",                        icon: "T" },
  { role: "Explorer",  accent: "#34d399", bg: "#3c3837", desc: "I explore edges where disciplines meet. Leverage hides there.",                    icon: "E" },
  { role: "Strategist",accent: "#f87171", bg: "#57534e", desc: "I zoom out to find the leverage point. Then I zoom in to execute.",               icon: "S" },
];

const ARTIFACTS = [
  { physical: "Field Notebook", digital: "Notion Doc",  icon: "📓" },
  { physical: "Camera Roll",    digital: "Figma Frame", icon: "📸" },
  { physical: "Whiteboard",     digital: "Miro Board",  icon: "🗒️" },
  { physical: "Old Journal",    digital: "Blog Draft",  icon: "📔" },
  { physical: "Sticky Notes",   digital: "Task List",   icon: "🗂️" },
  { physical: "Morning Coffee", digital: "Brain Dump",  icon: "☕" },
];

const THOUGHTS = [
  { text: "systems eat processes for breakfast", size: "text-xl",                            x: 4,  y: 8,  drift: 0, detail: "When a system is well-designed, individual processes become irrelevant. The structure holds everything." },
  { text: "build in public",                     size: "text-sm",                            x: 60, y: 7,  drift: 1, detail: "Transparency is a forcing function for quality. If you wouldn't show it, it's not ready."              },
  { text: "less, but better",                    size: "text-4xl font-light tracking-tight", x: 15, y: 40, drift: 2, detail: "Dieter Rams said it. It applies to code, design, life, conversations."                               },
  { text: "the map is not the territory",        size: "text-xs",                            x: 58, y: 54, drift: 3, detail: "Every model is wrong. Some are useful. Know which one you're holding."                                 },
  { text: "friction is information",             size: "text-base",                          x: 4,  y: 70, drift: 4, detail: "Resistance tells you something. Either the path is wrong, or your muscle isn't ready yet."             },
  { text: "slow is smooth",                      size: "text-sm",                            x: 68, y: 77, drift: 5, detail: "Speed comes from not having to redo things. Slow deliberate work compounds."                           },
];

const DESK_CONTENT = {
  working: [
    { cmd: true,  text: "$ git push origin main"                 },
    { cmd: false, text: "→ Enumerating objects: 12, done."       },
    { cmd: false, text: "→ main 5179750 Agent Kit pack"          },
    { cmd: true,  text: "$ npm run dev"                          },
    { cmd: false, text: "✓ Compiled in 842ms → localhost:3000"   },
  ],
  living: [
    { cmd: true,  text: "$ walk --direction coast --time morning" },
    { cmd: false, text: "→ Loading: salt air, quiet streets..."   },
    { cmd: false, text: "→ Status: phone in pocket, present."    },
    { cmd: true,  text: "$ brew coffee --double"                  },
    { cmd: false, text: "→ Output: one good hour."               },
  ],
  thinking: [
    { cmd: true,  text: "$ think --mode deep --no-interruptions"  },
    { cmd: false, text: "→ Context: the problem with X is..."    },
    { cmd: false, text: "→ Insight: leverage is at system level." },
    { cmd: true,  text: "$ write --raw --no-filter"               },
    { cmd: false, text: "→ Cursor blinking..."                   },
  ],
};

const ENV = {
  island: {
    label: "Island Mode",
    grad: ["#fdf9f0", "#fef3e2", "#fde8cc"],
    accent: "#f59e0b",
    text: "#92400e",
    desc: "Disconnected. Present. Just the work and the water.",
    particles: ["#f59e0b", "#fb923c", "#fbbf24", "#f97316"],
    speed: 9,
  },
  builder: {
    label: "Builder Mode",
    grad: ["#0c0a09", "#141211", "#1c1917"],
    accent: "#22c55e",
    text: "#4ade80",
    desc: "Terminal open. Music on. Building something that didn't exist.",
    particles: ["#22c55e", "#34d399", "#4ade80", "#6ee7b7"],
    speed: 4,
  },
  reflect: {
    label: "Reflect Mode",
    grad: ["#f5f3ff", "#ede9fe", "#e0e7ff"],
    accent: "#818cf8",
    text: "#4338ca",
    desc: "Quiet. Rereading. Connecting dots that took a year to appear.",
    particles: ["#818cf8", "#a5b4fc", "#c4b5fd", "#93c5fd"],
    speed: 14,
  },
};

// Fixed particle positions for the env switcher
const ENV_PARTICLES = [
  { x: 12, y: 28, size: 4,  idx: 0, delay: 0   },
  { x: 35, y: 55, size: 6,  idx: 1, delay: 1.2 },
  { x: 60, y: 20, size: 3,  idx: 2, delay: 2.1 },
  { x: 78, y: 65, size: 5,  idx: 3, delay: 0.7 },
  { x: 88, y: 35, size: 4,  idx: 0, delay: 3.0 },
  { x: 22, y: 75, size: 3,  idx: 1, delay: 1.8 },
  { x: 50, y: 82, size: 6,  idx: 2, delay: 0.4 },
  { x: 70, y: 10, size: 3,  idx: 3, delay: 2.5 },
];

// ─── Scroll-reveal hook ────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // If already in view on mount (e.g. first section), reveal immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setRevealed(true); return; }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, revealed };
}

// ─── Inline SVG icons ──────────────────────────────────────────────────────────

function IcoUser() {
  return <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><circle cx={12} cy={8} r={4}/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>;
}
function IcoNetwork() {
  return <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><circle cx={5} cy={12} r={2}/><circle cx={19} cy={5} r={2}/><circle cx={19} cy={19} r={2}/><path d="M7 12h10M17 7l-10 5M17 17L7 12"/></svg>;
}
function IcoSplit() {
  return <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M3 6h4M3 12h4M3 18h4M17 6h4M17 12h4M17 18h4"/></svg>;
}
function IcoTerminal() {
  return <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><rect x={2} y={4} width={20} height={16} rx={2}/><path d="M7 9l3 3-3 3M13 15h4"/></svg>;
}
function IcoBubble() {
  return <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.4-4 8-9 8a9.9 9.9 0 01-4-.8L3 20l.8-4A7.9 7.9 0 013 12c0-4.4 4-8 9-8s9 3.6 9 8z"/></svg>;
}
function IcoTimeline() {
  return <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M8 7l-5 5 5 5"/></svg>;
}
function IcoGlobe() {
  return <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><circle cx={12} cy={12} r={9}/><path d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18"/></svg>;
}
function IcoFlow() {
  return <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><rect x={2} y={3} width={6} height={5} rx={1}/><rect x={9} y={10} width={6} height={5} rx={1}/><rect x={16} y={17} width={6} height={5} rx={1}/><path d="M8 5.5h4a1 1 0 011 1v2M15 12.5h1a1 1 0 011 1v2"/></svg>;
}
function IcoGrid() {
  return <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><rect x={3} y={3} width={7} height={7} rx={1}/><rect x={14} y={3} width={7} height={7} rx={1}/><rect x={3} y={14} width={7} height={7} rx={1}/><rect x={14} y={14} width={7} height={7} rx={1}/></svg>;
}
function IcoLayers() {
  return <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>;
}

const SECTION_ICONS = [IcoUser, IcoNetwork, IcoSplit, IcoTerminal, IcoBubble, IcoTimeline, IcoGlobe, IcoFlow, IcoGrid, IcoLayers];

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function GraphicalElements() {
  const [activeNode,      setActiveNode]      = useState<number | null>(null);
  const [deskState,       setDeskState]       = useState<"working" | "living" | "thinking">("working");
  const [expandedThought, setExpandedThought] = useState<number | null>(null);
  const [envMode,         setEnvMode]         = useState<"island" | "builder" | "reflect">("island");
  const [expandedLayer,   setExpandedLayer]   = useState<number | null>(null);
  const [hoveredArtifact, setHoveredArtifact] = useState<number | null>(null);
  const [sliderX,         setSliderX]         = useState(50);
  const [nodeStates,      setNodeStates]      = useState<boolean[]>(NODES.map(n => n.active));

  const panelRef   = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current || !panelRef.current) return;
      const rect = panelRef.current.getBoundingClientRect();
      setSliderX(Math.min(85, Math.max(15, ((e.clientX - rect.left) / rect.width) * 100)));
    };
    const onUp = () => { isDragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  const toggleNode = (id: number) =>
    setNodeStates(prev => prev.map((v, i) => i === id ? !v : v));

  return (
    <>
      <style>{`
        /* ── blob morph ── */
        @keyframes morphBlob {
          0%,100% { border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%; }
          25%      { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
          50%      { border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%; }
          75%      { border-radius: 45% 55% 35% 65% / 60% 35% 65% 40%; }
        }
        .morph-blob { animation: morphBlob 12s ease-in-out infinite; }

        /* ── SVG edge flow ── */
        @keyframes flowEdge {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -18; }
        }

        /* ── thought drifts (each unique) ── */
        @keyframes drift0 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(3px,-7px)} }
        @keyframes drift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-4px,-5px)} }
        @keyframes drift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(5px,-9px)} }
        @keyframes drift3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-3px,-6px)} }
        @keyframes drift4 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(4px,-4px)} }
        @keyframes drift5 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-5px,-8px)} }
        .drift-0 { animation: drift0 7s  ease-in-out infinite; }
        .drift-1 { animation: drift1 9s  ease-in-out infinite; }
        .drift-2 { animation: drift2 11s ease-in-out infinite; }
        .drift-3 { animation: drift3 8s  ease-in-out infinite; }
        .drift-4 { animation: drift4 10s ease-in-out infinite; }
        .drift-5 { animation: drift5 6s  ease-in-out infinite; }

        /* ── graph particles ── */
        @keyframes particleFlt {
          0%,100% { opacity:.25; transform:translateY(0) scale(1); }
          50%      { opacity:.7;  transform:translateY(-8px) scale(1.3); }
        }

        /* ── node pulse ring ── */
        @keyframes nodePulse {
          0%,100% { opacity:.1; }
          50%      { opacity:.4; }
        }
        .node-pulse { animation: nodePulse 3s ease-in-out infinite; }

        /* ── timeline line draw ── */
        @keyframes drawLine {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        /* ── arrow bounce ── */
        @keyframes arrowBounce {
          0%,100% { transform:translateY(0); }
          50%      { transform:translateY(4px); }
        }
        .arrow-bounce { animation: arrowBounce 1.8s ease-in-out infinite; }

        /* ── scan line ── */
        @keyframes scanLine {
          0%   { top: 0%; opacity: 0; }
          10%  { opacity: .06; }
          90%  { opacity: .06; }
          100% { top: 100%; opacity: 0; }
        }
        .scan-line { animation: scanLine 4s linear infinite; }

        /* ── fade slide up ── */
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(6px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-up { animation: fadeSlideUp 0.35s ease forwards; }

        /* ── shimmer glow on output cards ── */
        @keyframes shimmerGlow {
          0%,100% { box-shadow: 0 0 0px #22c55e00; }
          50%      { box-shadow: 0 0 14px #22c55e30; }
        }
        .output-glow { animation: shimmerGlow 3s ease-in-out infinite; }

        /* ── particle float in env switcher ── */
        @keyframes envParticle {
          0%,100% { transform: translateY(0) scale(1); opacity: .35; }
          50%      { transform: translateY(-14px) scale(1.15); opacity: .7; }
        }

        /* ── status blink ── */
        @keyframes statusBlink {
          0%,100% { opacity:1; }
          50%      { opacity:.3; }
        }

        /* ── ripple ── */
        @keyframes ripple {
          from { transform: scale(0); opacity: .5; }
          to   { transform: scale(3); opacity: 0; }
        }
      `}</style>

      {/* Grain */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 200,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.038,
          backgroundSize: "180px 180px",
        }}
      />

      <main className="min-h-screen" style={{ background: "#fafaf9" }}>

        {/* ── header ── */}
        <header className="px-8 pt-16 pb-10" style={{ borderBottom: "1px solid #f0ece8" }}>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "#22c55e", animation: "statusBlink 2.5s ease-in-out infinite" }}
              />
              <p className="text-[10px] text-stone-400 uppercase tracking-[0.25em] font-mono">
                Gallery · Live
              </p>
            </div>
            <h1 className="text-4xl font-light text-stone-800 tracking-tight">
              Graphical Elements
            </h1>
            <p className="text-stone-400 text-sm mt-3 max-w-xl leading-relaxed">
              A living collection of visual components. Each one is a fragment of a philosophy — the fusion between digital systems and real life.
            </p>
            {/* mini legend */}
            <div className="flex gap-4 mt-5">
              {["hover", "click", "drag"].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-xs text-stone-400">
                  <span className="w-1 h-1 rounded-full bg-stone-300" />
                  {t} to interact
                </span>
              ))}
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-8 py-20 space-y-36">

          <Section n="01" title="Presence Card" desc="Existing in digital + real worlds at the same time." Icon={SECTION_ICONS[0]}>
            <PresenceCard />
          </Section>

          <Section n="02" title="System Nodes" desc="Click nodes to activate or deactivate connections." Icon={SECTION_ICONS[1]}>
            <SystemNodes
              active={activeNode}
              setActive={setActiveNode}
              nodeStates={nodeStates}
              toggleNode={toggleNode}
            />
          </Section>

          <Section n="03" title="Dual Panel" desc="Drag the handle — digital precision vs real-world texture." Icon={SECTION_ICONS[2]}>
            <DualPanel
              sliderX={sliderX}
              panelRef={panelRef}
              onStart={() => { isDragging.current = true; }}
            />
          </Section>

          <Section n="04" title="Live Desk Window" desc="A terminal as a window into different modes of being." Icon={SECTION_ICONS[3]}>
            <LiveDeskWindow state={deskState} setState={setDeskState} />
          </Section>

          <Section n="05" title="Thought Fragments" desc="Ideas floating in the space between tasks. Click to expand." Icon={SECTION_ICONS[4]}>
            <ThoughtFragments expanded={expandedThought} setExpanded={setExpandedThought} />
          </Section>

          <Section n="06" title="Timeline of Becoming" desc="Versions of self, each one made by the previous." Icon={SECTION_ICONS[5]}>
            <TimelineOfBecoming />
          </Section>

          <Section n="07" title="Environment Switcher" desc="The same person, different context, different energy." Icon={SECTION_ICONS[6]}>
            <EnvironmentSwitcher mode={envMode} setMode={setEnvMode} />
          </Section>

          <Section n="08" title="System Cards" desc="Every action is a mini-engine: input, process, output." Icon={SECTION_ICONS[7]}>
            <SystemCards />
          </Section>

          <Section n="09" title="Digital Artifacts Shelf" desc="Physical tools and their digital mirrors. Hover to transform." Icon={SECTION_ICONS[8]}>
            <ArtifactsShelf hovered={hoveredArtifact} setHovered={setHoveredArtifact} />
          </Section>

          <Section n="10" title="Identity Layers" desc="Multiple selves, stacked and integrated. Click to open." Icon={SECTION_ICONS[9]}>
            <IdentityLayers expanded={expandedLayer} setExpanded={setExpandedLayer} />
          </Section>

        </div>

        <footer className="px-8 py-12 border-t border-stone-100 max-w-5xl mx-auto">
          <p className="text-xs text-stone-300 font-mono">
            /graphical-elements · a mind building systems while designing a life
          </p>
        </footer>
      </main>
    </>
  );
}

// ─── Section wrapper with scroll reveal ───────────────────────────────────────

function Section({
  n, title, desc, children, Icon,
}: {
  n: string; title: string; desc: string;
  children: React.ReactNode;
  Icon: React.ComponentType;
}) {
  const { ref, revealed } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity:    revealed ? 1 : 0,
        transform:  revealed ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.75s ease, transform 0.75s ease",
      }}
    >
      <div className="flex items-start gap-4 mb-8">
        <div className="flex items-center gap-2 mt-0.5 shrink-0">
          <span className="text-xs text-stone-300 font-mono w-5">{n}</span>
          <span className="text-stone-300 opacity-80">
            <Icon />
          </span>
        </div>
        <div>
          <h2 className="text-lg font-medium text-stone-800">{title}</h2>
          <p className="text-sm text-stone-400 mt-0.5">{desc}</p>
        </div>
      </div>
      <div className="ml-12">{children}</div>
    </div>
  );
}

// ─── 01. Presence Card ────────────────────────────────────────────────────────

const STATUSES = ["Present", "Building", "Thinking", "In flow"];

function PresenceCard() {
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStatusIdx(p => (p + 1) % STATUSES.length), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative h-72 flex items-center">
      {/* Organic morphing blob */}
      <div
        className="morph-blob absolute left-0 shrink-0 overflow-hidden"
        style={{
          width: 210, height: 250,
          background: "linear-gradient(155deg, #5d7c52 0%, #3a5c35 45%, #243d20 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 70%, #8fba7d44, transparent 55%), radial-gradient(ellipse at 75% 25%, #6a9e5c33, transparent 50%)",
          }}
        />
        {/* Animated leaf veins */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 210 250">
          <line x1="105" y1="20"  x2="105" y2="230" stroke="#fff" strokeWidth="0.7" opacity="0.12" />
          <line x1="105" y1="80"  x2="60"  y2="160" stroke="#fff" strokeWidth="0.5" opacity="0.09" />
          <line x1="105" y1="80"  x2="150" y2="160" stroke="#fff" strokeWidth="0.5" opacity="0.09" />
          <line x1="105" y1="130" x2="75"  y2="195" stroke="#fff" strokeWidth="0.4" opacity="0.07" />
          <line x1="105" y1="130" x2="135" y2="195" stroke="#fff" strokeWidth="0.4" opacity="0.07" />
          {/* Animated dew drops */}
          <circle cx="90" cy="120" r="3" fill="#ffffff18">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="125" cy="90" r="2" fill="#ffffff18">
            <animate attributeName="opacity" values="0.1;0.5;0.1" dur="5.5s" repeatCount="indefinite" />
          </circle>
        </svg>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.45) 100%)" }}
        />
        <p className="absolute bottom-6 left-6 text-white/45 text-xs font-light italic">real world</p>
      </div>

      {/* Floating badge (bridges both panels) */}
      <div
        className="absolute"
        style={{
          left: 148, top: 10,
          background: "white",
          border: "1px solid #f0ece8",
          borderRadius: 999,
          padding: "4px 12px",
          fontSize: 11,
          color: "#78716c",
          boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
          animation: "drift1 8s ease-in-out infinite",
        }}
      >
        ✦ digital system
      </div>

      {/* "Currently building" badge */}
      <div
        className="absolute"
        style={{
          left: 195, bottom: 24,
          background: "#1c1917",
          borderRadius: 8,
          padding: "5px 10px",
          fontSize: 10,
          color: "#6ee7b7",
          fontFamily: "ui-monospace, monospace",
          animation: "drift3 10s ease-in-out infinite",
        }}
      >
        🔨 currently building
      </div>

      {/* Profile card */}
      <div
        className="relative ml-36 bg-white/90 backdrop-blur-md border border-stone-100 rounded-2xl p-6 w-56"
        style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)" }}
      >
        {/* Animated rings behind avatar */}
        <div className="relative flex items-center gap-3 mb-4">
          <div className="relative shrink-0">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: "1px solid #e7e5e4",
                transform: "scale(1.4)",
                animation: "nodePulse 3s ease-in-out infinite",
              }}
            />
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: "1px solid #e7e5e4",
                transform: "scale(1.75)",
                animation: "nodePulse 3s ease-in-out infinite 0.8s",
              }}
            />
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
              style={{ background: "linear-gradient(135deg, #292524, #78716c)" }}
            >
              ET
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-stone-800 truncate">Esteban Toro</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span
                className="text-xs text-stone-400"
                style={{ transition: "opacity 0.3s" }}
              >
                {STATUSES[statusIdx]}
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs text-stone-500 leading-relaxed">
          Building at the edge of digital and real.
        </p>

        <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
          <span className="text-xs text-stone-400">Buenos Aires 🌿</span>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ background: "#f5f5f4", color: "#78716c" }}
          >
            Builder
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── 02. System Nodes ─────────────────────────────────────────────────────────

const EDGE_DURATIONS = [2.2, 3.0, 2.7, 2.4, 3.5, 2.9, 2.6, 3.2, 2.8];

function SystemNodes({
  active, setActive, nodeStates, toggleNode,
}: {
  active: number | null;
  setActive: (n: number | null) => void;
  nodeStates: boolean[];
  toggleNode: (id: number) => void;
}) {
  const activeCount = nodeStates.filter(Boolean).length;

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        height: 280,
        background: "linear-gradient(160deg, #0c0a09 0%, #1c1917 100%)",
        border: "1px solid #292524",
      }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff0d 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 560 240"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background particles */}
        {GRAPH_PARTICLES.map((p, i) => (
          <circle
            key={i}
            cx={p.cx} cy={p.cy} r={p.r}
            fill="#6ee7b7"
            style={{
              animation: `particleFlt ${p.dur}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}

        {/* Edges */}
        {EDGES.map(([a, b], i) => {
          const na = NODES[a], nb = NODES[b];
          const lit = nodeStates[a] && nodeStates[b];
          return (
            <line
              key={i}
              x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke={lit ? "#6ee7b7" : "#3c3837"}
              strokeWidth={lit ? 1.5 : 1}
              strokeDasharray={lit ? "6 12" : "4 8"}
              opacity={lit ? 0.5 : 0.2}
              style={
                lit
                  ? { animation: `flowEdge ${EDGE_DURATIONS[i]}s linear infinite` }
                  : undefined
              }
            />
          );
        })}

        {/* Pulse rings on active nodes */}
        {NODES.map(n =>
          nodeStates[n.id] ? (
            <circle
              key={`ring-${n.id}`}
              cx={n.x} cy={n.y} r={20}
              fill="none"
              stroke="#6ee7b7"
              strokeWidth={0.8}
              className={active !== n.id ? "node-pulse" : ""}
              opacity={active === n.id ? 0.55 : 0.15}
            />
          ) : null
        )}

        {/* Nodes */}
        {NODES.map(n => {
          const isActive = nodeStates[n.id];
          return (
            <g
              key={n.id}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setActive(n.id)}
              onMouseLeave={() => setActive(null)}
              onClick={() => toggleNode(n.id)}
            >
              {/* Click glow */}
              {isActive && (
                <circle
                  cx={n.x} cy={n.y} r={13}
                  fill="none"
                  stroke="#6ee7b7"
                  strokeWidth={4}
                  opacity={0.06}
                />
              )}
              <circle
                cx={n.x} cy={n.y} r={13}
                fill={isActive ? "#1c1917" : "#0f0d0c"}
                stroke={isActive ? (active === n.id ? "#6ee7b7" : "#44403c") : "#292524"}
                strokeWidth={active === n.id ? 2 : 1.5}
                style={{ transition: "stroke 0.25s, stroke-width 0.25s" }}
              />
              {/* Active glow filter */}
              {isActive && (
                <circle
                  cx={n.x} cy={n.y} r={13}
                  fill="none"
                  stroke="#6ee7b7"
                  strokeWidth={1}
                  opacity={0.15}
                  style={{ filter: "blur(4px)" }}
                />
              )}
              <text
                x={n.x} y={n.y + 0.5}
                textAnchor="middle" dominantBaseline="middle"
                fontSize={8.5}
                fill={isActive ? (active === n.id ? "#e7e5e4" : "#a8a29e") : "#44403c"}
                fontFamily="ui-monospace, monospace"
                style={{ pointerEvents: "none", userSelect: "none", transition: "fill 0.25s" }}
              >
                {n.label}
              </text>

              {/* Hover tooltip */}
              {active === n.id && (
                <g className="fade-up">
                  <rect
                    x={n.x - 50} y={n.y + 20}
                    width={100} height={26}
                    rx={6}
                    fill="#292524"
                    stroke="#44403c"
                    strokeWidth={0.5}
                  />
                  <text
                    x={n.x} y={n.y + 34}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize={7.5}
                    fill="#a8a29e"
                    fontFamily="ui-sans-serif, sans-serif"
                    style={{ pointerEvents: "none", userSelect: "none" }}
                  >
                    {n.desc}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Counter */}
      <div
        className="absolute bottom-4 right-5 font-mono flex items-center gap-2"
        style={{ fontSize: 11, color: "#57534e" }}
      >
        <span
          className="px-1.5 py-0.5 rounded"
          style={{
            background: "#292524",
            color: "#6ee7b7",
            transition: "color 0.4s",
          }}
        >
          {activeCount}
        </span>
        <span>/ {NODES.length} active</span>
      </div>

      {/* Hint */}
      <div
        className="absolute bottom-4 left-5 font-mono"
        style={{ fontSize: 10, color: "#44403c" }}
      >
        click nodes to toggle
      </div>
    </div>
  );
}

// ─── 03. Dual Panel ───────────────────────────────────────────────────────────

function DualPanel({
  sliderX, panelRef, onStart,
}: {
  sliderX: number;
  panelRef: React.RefObject<HTMLDivElement | null>;
  onStart: () => void;
}) {
  return (
    <div
      ref={panelRef}
      className="relative h-72 rounded-2xl overflow-hidden border border-stone-200 select-none"
      style={{ cursor: "col-resize" }}
    >
      {/* Left — system */}
      <div
        className="absolute inset-0 flex items-center overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderX}% 0 0)`, background: "#0c0a09" }}
      >
        <div className="font-mono text-xs leading-7 p-8 whitespace-nowrap">
          <p style={{ color: "#44403c" }}>// system.config.ts</p>
          <p>
            <span style={{ color: "#7dd3fc" }}>const</span>{" "}
            <span style={{ color: "#e7e5e4" }}>config</span>{" "}
            <span style={{ color: "#57534e" }}>=</span>{" "}
            <span style={{ color: "#78716c" }}>{"{"}</span>
          </p>
          <p>
            {"  "}<span style={{ color: "#fcd34d" }}>model</span>
            <span style={{ color: "#57534e" }}>: </span>
            <span style={{ color: "#6ee7b7" }}>&quot;claude-opus&quot;</span>
            <span style={{ color: "#57534e" }}>,</span>
          </p>
          <p>
            {"  "}<span style={{ color: "#fcd34d" }}>tools</span>
            <span style={{ color: "#57534e" }}>: [</span>
            <span style={{ color: "#6ee7b7" }}>&quot;search&quot;</span>
            <span style={{ color: "#57534e" }}>, </span>
            <span style={{ color: "#6ee7b7" }}>&quot;code&quot;</span>
            <span style={{ color: "#57534e" }}>],</span>
          </p>
          <p>
            {"  "}<span style={{ color: "#fcd34d" }}>memory</span>
            <span style={{ color: "#57534e" }}>: </span>
            <span style={{ color: "#7dd3fc" }}>true</span>
          </p>
          <p><span style={{ color: "#78716c" }}>{"}"}</span></p>
          <p className="mt-2" style={{ color: "#44403c" }}>// compiled: 842ms</p>
          <p style={{ color: "#44403c" }}>// status: production ✓</p>
        </div>
        <div
          className="absolute top-4 left-4 font-mono"
          style={{ fontSize: 10, color: "#44403c", opacity: sliderX > 12 ? 1 : 0, transition: "opacity 0.3s" }}
        >
          ← system
        </div>
      </div>

      {/* Right — real */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        style={{
          clipPath: `inset(0 0 0 ${sliderX}%)`,
          background: "linear-gradient(135deg, #fdf4e7 0%, #f0e3cc 50%, #e8d5b7 100%)",
        }}
      >
        <div
          className="absolute morph-blob"
          style={{
            top: 16, right: 48, width: 72, height: 72, opacity: 0.45,
            background: "radial-gradient(circle, #d4a574, transparent 70%)",
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: 20, left: 36, width: 100, height: 60, opacity: 0.3,
            background: "radial-gradient(circle, #b8956a, transparent 70%)",
            borderRadius: "40% 60% 55% 45%",
            animation: "drift4 9s ease-in-out infinite",
          }}
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          viewBox="0 0 500 280"
          preserveAspectRatio="xMidYMid slice"
        >
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={i} x1={0} y1={i * 22} x2={500} y2={i * 22 + 18} stroke="#7c5c3a" strokeWidth={0.8} />
          ))}
        </svg>
        <div className="text-center z-10">
          <p className="text-stone-600 font-light text-base">morning light</p>
          <p className="text-xs mt-1" style={{ color: "#a8a29e" }}>6:47am · Buenos Aires 🌿</p>
        </div>
        <div
          className="absolute top-4 right-4"
          style={{ fontSize: 10, color: "#a8a29e", opacity: sliderX < 88 ? 1 : 0, transition: "opacity 0.3s" }}
        >
          real →
        </div>
      </div>

      {/* Drag handle */}
      <div
        className="absolute top-0 bottom-0 z-10 flex items-center justify-center"
        style={{ left: `${sliderX}%`, transform: "translateX(-50%)" }}
        onMouseDown={onStart}
      >
        <div className="absolute top-0 bottom-0 w-px" style={{ background: "rgba(255,255,255,0.7)" }} />
        <div
          className="relative w-7 h-7 bg-white rounded-full flex items-center justify-center"
          style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.15)" }}
        >
          <svg className="w-3 h-3 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 4 4 4M16 9l4 4-4 4" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── 04. Live Desk Window ─────────────────────────────────────────────────────

function LiveDeskWindow({
  state, setState,
}: {
  state: "working" | "living" | "thinking";
  setState: (s: "working" | "living" | "thinking") => void;
}) {
  const lines = DESK_CONTENT[state];
  const [showCount, setShowCount] = useState(lines.length);

  useEffect(() => {
    setShowCount(0);
    const timers = lines.map((_, i) =>
      setTimeout(() => setShowCount(i + 1), i * 320 + 120)
    );
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "#0c0a09",
        border: "1px solid #292524",
        boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
      }}
    >
      {/* Chrome */}
      <div
        className="flex items-center px-4 py-3 border-b"
        style={{ background: "#1c1917", borderColor: "#292524" }}
      >
        <div className="flex gap-1.5">
          {["#ef4444", "#f59e0b", "#22c55e"].map(c => (
            <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div className="flex-1 flex justify-center gap-1">
          {(["working", "living", "thinking"] as const).map(s => (
            <button
              key={s}
              onClick={() => setState(s)}
              className="px-3 py-1 rounded-md text-xs transition-all duration-200"
              style={{
                background: state === s ? "#292524" : "transparent",
                color:      state === s ? "#e7e5e4" : "#57534e",
              }}
            >
              {s === "working" ? "⚙️ " : s === "living" ? "🌿 " : "💭 "}
              {s}
            </button>
          ))}
        </div>
        <div className="w-16" />
      </div>

      {/* Terminal body */}
      <div className="relative p-6 min-h-44 font-mono text-xs leading-7 overflow-hidden">
        {/* Scan line */}
        <div
          className="scan-line absolute left-0 right-0 h-8 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, transparent, rgba(110,231,183,0.04), transparent)",
          }}
        />
        {lines.slice(0, showCount).map((line, i) => (
          <p
            key={`${state}-${i}`}
            className="fade-up"
            style={{
              color: line.cmd ? "#e7e5e4" : "#57534e",
              animationDelay: `${i * 0.05}s`,
            }}
          >
            {line.text}
            {i === showCount - 1 && i === lines.length - 1 && (
              <span
                className="animate-pulse inline-block ml-0.5 align-middle"
                style={{ width: 6, height: 13, background: "#6ee7b7", verticalAlign: "text-bottom" }}
              />
            )}
          </p>
        ))}
      </div>
    </div>
  );
}

// ─── 05. Thought Fragments ────────────────────────────────────────────────────

function ThoughtFragments({
  expanded, setExpanded,
}: {
  expanded: number | null;
  setExpanded: (i: number | null) => void;
}) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-stone-100"
      style={{ height: 340, background: "#fafaf9" }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(#e7e5e400 calc(100% - 1px), #e7e5e4 100%), linear-gradient(90deg, #e7e5e400 calc(100% - 1px), #e7e5e4 100%)",
          backgroundSize: "40px 40px",
          opacity: 0.5,
        }}
      />

      {THOUGHTS.map((t, i) => (
        <div
          key={i}
          className={`absolute cursor-pointer drift-${t.drift}`}
          style={{
            left: `${t.x}%`,
            top:  `${t.y}%`,
            animationPlayState: expanded === i ? "paused" : "running",
          }}
          onClick={() => setExpanded(expanded === i ? null : i)}
        >
          <div
            style={{
              background:   expanded === i ? "white"                 : "transparent",
              border:       expanded === i ? "1px solid #e7e5e4"    : "1px solid transparent",
              borderRadius: expanded === i ? 12                      : 4,
              padding:      expanded === i ? "12px 14px"            : "0",
              boxShadow:    expanded === i ? "0 4px 24px rgba(0,0,0,0.08)" : "none",
              maxWidth:     260,
              transition:   "background 0.35s, border-color 0.35s, box-shadow 0.35s, padding 0.35s, border-radius 0.35s",
            }}
          >
            <p
              className={`${t.size} text-stone-700 leading-tight select-none`}
              style={{ opacity: expanded !== null && expanded !== i ? 0.35 : 1, transition: "opacity 0.35s" }}
            >
              {t.text}
            </p>
            {expanded === i && (
              <p className="text-xs text-stone-400 mt-2 leading-relaxed fade-up">{t.detail}</p>
            )}
          </div>
        </div>
      ))}

      <p className="absolute bottom-4 right-4 text-xs text-stone-300 pointer-events-none font-mono">
        click · expand
      </p>
    </div>
  );
}

// ─── 06. Timeline of Becoming ─────────────────────────────────────────────────

function TimelineOfBecoming() {
  const { ref, revealed } = useReveal();
  return (
    <div ref={ref} className="overflow-x-auto pb-4" style={{ scrollbarWidth: "thin" }}>
      <div className="relative flex min-w-max">
        {/* Animated connector line */}
        <div
          className="absolute top-3.5 h-px"
          style={{
            left: 28,
            right: 28,
            background: "#e7e5e4",
            transformOrigin: "left",
            transform: revealed ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 1.4s cubic-bezier(0.22,1,0.36,1)",
          }}
        />

        {TIMELINE.map((item, i) => {
          const isLast = i === TIMELINE.length - 1;
          return (
            <div
              key={i}
              className="relative flex flex-col items-start w-36"
              style={{
                opacity:    revealed ? 1 : 0,
                transform:  revealed ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.5s ease ${i * 0.1 + 0.3}s, transform 0.5s ease ${i * 0.1 + 0.3}s`,
              }}
            >
              {/* Node */}
              <div
                className="relative z-10 w-7 h-7 rounded-full border-2 flex items-center justify-center"
                style={{
                  fontSize: 14,
                  background:  isLast ? "#1c1917" : "white",
                  borderColor: isLast ? "#1c1917" : "#d6d3d1",
                }}
              >
                {item.icon}
              </div>
              {/* Content */}
              <div className="mt-3 pr-4">
                <p className="font-mono" style={{ fontSize: 10, color: "#a8a29e" }}>{item.year}</p>
                <p
                  className="text-sm font-medium mt-0.5"
                  style={{ color: isLast ? "#1c1917" : "#57534e" }}
                >
                  {item.role}
                </p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#a8a29e" }}>
                  {item.note}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── 07. Environment Switcher ─────────────────────────────────────────────────

function EnvironmentSwitcher({
  mode, setMode,
}: {
  mode: "island" | "builder" | "reflect";
  setMode: (m: "island" | "builder" | "reflect") => void;
}) {
  const env = ENV[mode];
  return (
    <div
      className="rounded-2xl p-8 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${env.grad[0]} 0%, ${env.grad[1]} 50%, ${env.grad[2]} 100%)`,
        border: `1px solid ${env.accent}28`,
        transition: "background 0.7s ease, border-color 0.5s ease",
      }}
    >
      {/* Floating particles */}
      {ENV_PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top:  `${p.y}%`,
            width:  p.size,
            height: p.size,
            background: env.particles[p.idx],
            opacity: 0.35,
            animation: `envParticle ${env.speed + p.delay}s ease-in-out ${p.delay}s infinite`,
            transition: "background 0.7s ease",
            filter: "blur(1px)",
          }}
        />
      ))}

      {/* Mode buttons */}
      <div className="relative flex flex-wrap gap-2 mb-6">
        {(["island", "builder", "reflect"] as const).map(k => (
          <button
            key={k}
            onClick={() => setMode(k)}
            className="px-4 py-1.5 rounded-full text-xs font-medium"
            style={{
              background:  mode === k ? env.accent         : "rgba(255,255,255,0.4)",
              color:       mode === k ? "white"            : env.text,
              border:      `1px solid ${mode === k ? "transparent" : env.accent + "30"}`,
              transition:  "all 0.35s ease",
              backdropFilter: "blur(4px)",
            }}
          >
            {k === "island" ? "🏝️ " : k === "builder" ? "⚡ " : "🌫️ "}
            {ENV[k].label}
          </button>
        ))}
      </div>

      <p
        className="relative text-sm font-light leading-relaxed max-w-md"
        style={{ color: env.text, transition: "color 0.5s ease" }}
      >
        {env.desc}
      </p>

      {/* Status */}
      <div className="relative mt-6 flex items-center gap-2">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: env.accent, transition: "background 0.5s ease", animation: "statusBlink 2.5s ease-in-out infinite" }}
        />
        <span className="text-xs font-mono" style={{ color: env.text, opacity: 0.5, transition: "color 0.5s ease" }}>
          mode: {mode}
        </span>
      </div>
    </div>
  );
}

// ─── 08. System Cards ─────────────────────────────────────────────────────────

function SystemCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {SYSTEM_CARDS.map((card, i) => (
        <div
          key={i}
          className="bg-white border border-stone-100 rounded-xl p-5"
          style={{
            boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.transform = "translateY(-5px)";
            el.style.boxShadow = "0 12px 36px rgba(0,0,0,0.09)";
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.transform = "translateY(0)";
            el.style.boxShadow = "0 2px 16px rgba(0,0,0,0.04)";
          }}
        >
          {/* Input */}
          <div className="rounded-lg p-3" style={{ background: "#fafaf9", border: "1px solid #f0ece8" }}>
            <p className="font-mono mb-1" style={{ fontSize: 9, color: "#a8a29e", letterSpacing: "0.12em" }}>
              INPUT
            </p>
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 16 }}>{card.inputIcon}</span>
              <p className="text-sm text-stone-600">{card.input}</p>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center my-2 arrow-bounce">
            <svg className="w-3 h-3" style={{ color: "#d6d3d1" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Process */}
          <div className="rounded-lg p-3" style={{ background: "#1c1917" }}>
            <p className="font-mono mb-1" style={{ fontSize: 9, color: "#57534e", letterSpacing: "0.12em" }}>
              PROCESS
            </p>
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 16 }}>{card.processIcon}</span>
              <p className="text-sm" style={{ color: "#e7e5e4" }}>{card.process}</p>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center my-2 arrow-bounce" style={{ animationDelay: "0.3s" }}>
            <svg className="w-3 h-3" style={{ color: "#d6d3d1" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Output */}
          <div
            className="output-glow rounded-lg p-3"
            style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}
          >
            <p className="font-mono mb-1" style={{ fontSize: 9, color: "#16a34a", letterSpacing: "0.12em" }}>
              OUTPUT
            </p>
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 14, color: "#22c55e" }}>✦</span>
              <p className="text-sm font-medium" style={{ color: "#15803d" }}>{card.output}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── 09. Digital Artifacts Shelf ──────────────────────────────────────────────

function ArtifactsShelf({
  hovered, setHovered,
}: {
  hovered: number | null;
  setHovered: (i: number | null) => void;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {ARTIFACTS.map((item, i) => (
        <div
          key={i}
          className="relative h-28 rounded-xl overflow-hidden border border-stone-100"
          style={{ cursor: "pointer" }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Physical */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-1.5"
            style={{
              background: "linear-gradient(135deg, #fdf4e7, #f5e6d3)",
              opacity:    hovered === i ? 0 : 1,
              transition: "opacity 0.45s ease",
            }}
          >
            <span style={{ fontSize: 24 }}>{item.icon}</span>
            <p className="text-xs font-medium text-stone-600">{item.physical}</p>
            <p style={{ fontSize: 10, color: "#a8a29e" }}>physical ↓</p>
          </div>

          {/* Digital */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-1.5"
            style={{
              background: "#0c0a09",
              opacity:    hovered === i ? 1 : 0,
              transition: "opacity 0.45s ease",
            }}
          >
            <span style={{ fontSize: 24 }}>{item.icon}</span>
            <p className="text-xs font-medium font-mono" style={{ color: "#6ee7b7" }}>{item.digital}</p>
            <p className="font-mono" style={{ fontSize: 10, color: "#44403c" }}>→ digital</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── 10. Identity Layers ──────────────────────────────────────────────────────

const LAYER_ICONS = {
  Builder:    <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
  Thinker:    <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3a6 6 0 00-4.243 10.243A4 4 0 009 15v2h6v-2a4 4 0 001.243-1.757A6 6 0 0012 3z"/></svg>,
  Explorer:   <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><circle cx={12} cy={12} r={9}/><path strokeLinecap="round" strokeLinejoin="round" d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/></svg>,
  Strategist: <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><circle cx={12} cy={12} r={9}/><circle cx={12} cy={12} r={4}/><circle cx={12} cy={12} r={1} fill="currentColor"/></svg>,
};

function IdentityLayers({
  expanded, setExpanded,
}: {
  expanded: number | null;
  setExpanded: (i: number | null) => void;
}) {
  return (
    <div className="space-y-2">
      {IDENTITY_LAYERS.map((layer, i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden"
          style={{
            background:  layer.bg,
            transform:   `translateY(${i * -3}px)`,
            position:    "relative",
            zIndex:      i,
            cursor:      "pointer",
            border:      "1px solid rgba(255,255,255,0.04)",
            transition:  "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onClick={() => setExpanded(expanded === i ? null : i)}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.transform = `translateY(${i * -3 - 3}px)`;
            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px rgba(0,0,0,0.2)`;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.transform = `translateY(${i * -3}px)`;
            (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
          }}
        >
          <div className="px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono" style={{ fontSize: 11, color: layer.accent }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* Role icon */}
              <span style={{ color: layer.accent }}>
                {LAYER_ICONS[layer.role as keyof typeof LAYER_ICONS]}
              </span>
              <span className="text-sm font-medium" style={{ color: "#f5f5f4" }}>
                {layer.role}
              </span>
            </div>
            <svg
              className="w-4 h-4"
              style={{
                color:     "#78716c",
                transform: expanded === i ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.35s ease",
              }}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Expanded content */}
          <div
            style={{
              maxHeight:  expanded === i ? 80 : 0,
              overflow:   "hidden",
              transition: "max-height 0.4s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <div className="px-5 pb-4 flex items-start gap-3">
              <div
                className="w-0.5 rounded-full shrink-0 mt-0.5"
                style={{ height: 36, background: layer.accent, opacity: 0.4 }}
              />
              <p className="text-sm leading-relaxed" style={{ color: "#a8a29e" }}>
                {layer.desc}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
