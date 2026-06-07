"use client";

import { useState, useEffect, useRef } from "react";

const AGENT_APP = "/agent-app";
const WHATSAPP = "https://wa.me/573045500182?text=Hola%20Esteban%2C%20quiero%20hablar%20sobre%20un%20proyecto";
const EMAIL = "mailto:hola@estebantoro.dev";

// ─── Environment data ──────────────────────────────────────────────────────────

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

const ENV_PARTICLES = [
    { x: 12, y: 28, size: 4, idx: 0, delay: 0 },
    { x: 35, y: 55, size: 6, idx: 1, delay: 1.2 },
    { x: 60, y: 20, size: 3, idx: 2, delay: 2.1 },
    { x: 78, y: 65, size: 5, idx: 3, delay: 0.7 },
    { x: 88, y: 35, size: 4, idx: 0, delay: 3.0 },
    { x: 22, y: 75, size: 3, idx: 1, delay: 1.8 },
    { x: 50, y: 82, size: 6, idx: 2, delay: 0.4 },
    { x: 70, y: 10, size: 3, idx: 3, delay: 2.5 },
];

// ─── Atoms ─────────────────────────────────────────────────────────────────────

function Dot({ color = "bg-emerald-400" }: { color?: string }) {
    return <span className={`inline-block h-1.5 w-1.5 rounded-full ${color}`} />;
}

function IconArrow({ className = "h-4 w-4" }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
    );
}

// ─── Nav Icons ────────────────────────────────────────────────────────────────

function NavIconBulb() {
    return (
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21h6M10 17h4M12 3a6 6 0 00-4.243 10.243A4 4 0 009 15v2h6v-2a4 4 0 001.243-1.757A6 6 0 0012 3z" />
        </svg>
    );
}

function NavIconWrench() {
    return (
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
    );
}

function NavIconGrid() {
    return (
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
    );
}

function NavIconHome() {
    return (
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    );
}

function NavIconChip() {
    return (
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <rect x="9" y="9" width="6" height="6" rx="1" />
            <path d="M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2" />
        </svg>
    );
}

function NavIconCanvas() {
    return (
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="2" />
            <path d="M2 8l4 6 4-4 4 5 3-3 4 4" />
            <circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none" />
        </svg>
    );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    const links = [
        {
            label: "How I think",
            href: "#pillars",
            icon: <NavIconBulb />,
            hover: "hover:bg-white/10 hover:text-stone-100",
            mobileHover: "hover:bg-stone-800",
        },
        {
            label: "What I build",
            href: "/products",
            icon: <NavIconWrench />,
            hover: "hover:bg-white/10 hover:text-amber-300",
            mobileHover: "hover:bg-stone-800",
        },
        {
            label: "Journal",
            href: "/blog",
            icon: <NavIconBulb />,
            hover: "hover:bg-white/10 hover:text-stone-100",
            mobileHover: "hover:bg-stone-800",
        },
        {
            label: "Aesthetics",
            href: "/aesthetics",
            icon: <NavIconCanvas />,
            hover: "hover:bg-white/10 hover:text-violet-300",
            mobileHover: "hover:bg-stone-800",
        },
    ];

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-stone-950/95 backdrop-blur-md border-b border-stone-800/60 shadow-sm" : ""
                }`}
        >
            <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
                <a href="#" className="font-display text-base font-bold tracking-tight text-white">
                    et<span className="text-amber-500">.</span>
                </a>

                <div className="hidden items-center gap-0.5 md:flex">
                    {links.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className={`group flex items-center rounded-lg px-3 py-1.5 text-sm font-medium text-stone-300 transition-all duration-150 ${l.hover}`}
                        >
                            <span className="inline-flex max-w-0 overflow-hidden opacity-0 transition-all duration-200 ease-out group-hover:max-w-[1.375rem] group-hover:opacity-100">
                                <span className="mr-1.5 shrink-0 -translate-x-2 scale-50 transition-transform duration-200 ease-out group-hover:translate-x-0 group-hover:scale-100">
                                    {l.icon}
                                </span>
                            </span>
                            {l.label}
                        </a>
                    ))}

                </div>
                <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-1.5 p-1 md:hidden">
                    <span className={`block h-0.5 w-5 bg-stone-300 transition-all ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
                    <span className={`block h-0.5 w-5 bg-stone-300 transition-all ${menuOpen ? "opacity-0" : ""}`} />
                    <span className={`block h-0.5 w-5 bg-stone-300 transition-all ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
                </button>
            </nav>

            {menuOpen && (
                <div className="border-t border-stone-800 bg-stone-950 px-4 pb-4 pt-3 md:hidden">
                    {links.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            onClick={() => setMenuOpen(false)}
                            className={`flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-stone-300 transition-all duration-150 hover:text-white ${l.mobileHover}`}
                        >
                            <span className="shrink-0">{l.icon}</span>
                            {l.label}
                        </a>
                    ))}
                    <a
                        href={AGENT_APP}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 rounded-lg border border-amber-500/30 bg-amber-500/8 px-2 py-2.5 text-sm font-semibold text-amber-400"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                        Agent Kit
                    </a>
                    <a
                        href={AGENT_APP}
                        className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-amber-500 text-xs font-semibold text-white"
                    >
                        Get started <IconArrow className="h-3 w-3" />
                    </a>
                </div>
            )}
        </header>
    );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-stone-950 px-6 pt-32 pb-24 flex items-center">
            {/* Ambient glows */}
            <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/4 translate-x-1/4 rounded-full bg-amber-500/10 blur-[140px]" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] translate-y-1/4 -translate-x-1/4 rounded-full bg-amber-900/15 blur-[100px]" />
            {/* Grain */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                    backgroundSize: "180px",
                }}
            />
            {/* Sketch wave art */}
            <svg
                className="pointer-events-none absolute bottom-0 left-0 w-full opacity-[0.09] text-stone-400"
                viewBox="0 0 1200 420"
                fill="none"
                preserveAspectRatio="xMidYMax slice"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <filter id="sketchy-waves">
                        <feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves="2" seed="5" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
                <g filter="url(#sketchy-waves)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M-20,360 C60,330 140,375 230,355 C320,335 410,310 510,328 C610,346 690,372 780,358 C870,344 950,318 1040,332 C1130,346 1180,362 1240,350" strokeWidth="1.6" />
                    <path d="M-20,385 C80,360 170,392 270,374 C360,356 450,338 550,352 C650,366 730,388 820,376 C910,364 990,342 1080,354 C1160,364 1200,378 1240,372" strokeWidth="1.1" />
                    <path d="M-20,408 C100,388 190,415 290,398 C380,381 470,368 570,378 C670,388 750,408 840,398 C930,388 1010,370 1100,380 C1170,388 1210,400 1240,393" strokeWidth="0.8" />
                    <path d="M-20,330 C50,298 145,342 240,322 C335,302 420,280 515,296 C610,312 700,340 795,328 C890,316 975,290 1065,304 C1150,318 1195,334 1240,326" strokeWidth="1.3" />
                    <path d="M-20,300 C70,270 165,308 255,290 C345,272 435,252 530,266 C625,280 710,306 805,295 C900,284 985,260 1075,272 C1155,282 1200,298 1240,290" strokeWidth="0.9" />
                    <path d="M-20,268 C90,242 180,275 275,258 C365,241 450,224 548,237 C646,250 730,272 824,263 C918,254 1000,233 1090,244 C1168,253 1205,266 1240,260" strokeWidth="0.6" />
                </g>
            </svg>

            <div className="relative mx-auto max-w-5xl w-full">
                <div className="grid lg:grid-cols-[1fr_360px] gap-14 items-center">

                    {/* Left: text */}
                    <div>
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-700 bg-stone-800/80 px-3 py-1.5 text-xs font-medium text-stone-400">
                            <Dot color="bg-amber-400" />
                            Philosophy · Software · Strategy
                        </div>

                        <h1 className="font-display text-[clamp(2.75rem,6vw,5rem)] font-bold leading-[1.0] tracking-tight text-white">
                            Most people have goals.
                            <br />
                            <span className="text-stone-500">Few have systems.</span>
                        </h1>

                        <p className="mt-7 max-w-lg text-[1.05rem] leading-relaxed text-stone-400">
                            I help you find your purpose, design your architecture, and build the tools to make it all work —
                            combining{" "}
                            <span className="font-semibold text-stone-200">philosophical clarity</span>,{" "}
                            <span className="font-semibold text-stone-200">software craft</span>, and{" "}
                            <span className="font-semibold text-stone-200">strategic execution</span>.
                        </p>

                        <div className="mt-9 flex flex-col gap-3">
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { icon: "🧭", text: "Find your direction" },
                                    { icon: "⚙️", text: "Build your system" },
                                    { icon: "🤖", text: "Automate the rest" },
                                ].map((p) => (
                                    <div
                                        key={p.text}
                                        className="flex items-center gap-1.5 rounded-full border border-stone-700 bg-stone-800/60 px-3 py-1 text-xs text-stone-400"
                                    >
                                        <span>{p.icon}</span>
                                        {p.text}
                                    </div>
                                ))}
                            </div>
                            <a
                                href={WHATSAPP}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-12 items-center gap-2 rounded-xl bg-amber-500 px-6 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-400 hover:shadow-xl active:scale-95 self-start"
                            >
                                Talk to me <IconArrow />
                            </a>
                        </div>
                    </div>

                    {/* Right: small image card */}
                    <div className="hidden lg:block group cursor-pointer">
                        <div className="overflow-hidden rounded-2xl border border-stone-700/60 shadow-xl transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:shadow-2xl group-hover:shadow-amber-500/15 group-hover:border-stone-500/50 relative">
                            {/* Complete image at natural proportions */}
                            <div className="overflow-hidden">
                                <img
                                    src="/esteban_toro_linkedin_header.png"
                                    alt="Esteban Toro"
                                    className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                />
                            </div>
                            {/* Profile text section */}
                            <div className="bg-stone-900 border-t border-stone-700/60 px-4 py-4">
                                <p className="font-display text-sm font-bold text-white leading-none">Esteban Toro</p>
                                <p className="mt-2.5 text-[11px] leading-relaxed text-stone-400">
                                    Building{" "}<span className="text-amber-400">@Ancestralis House</span>{" "}|{" "}
                                    Building{" "}<span className="text-amber-400">@AgentKit</span> &{" "}
                                    <span className="text-amber-400">@DailiApp</span>{" "}|{" "}
                                    Software Engineer | Maker | Designer of a sustainable, meaningful and fun life-style | I Prefer Going Fastlane 🏝️ 🏠 💻🩴
                                </p>
                            </div>
                            {/* Shimmer sweep on hover */}
                            <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

// ─── Pillars ───────────────────────────────────────────────────────────────────

function Pillars() {
    const pillars = [
        {
            number: "01",
            icon: "🧠",
            title: "Think clearly",
            subtitle: "Philosophy",
            desc: "Before building anything, you need the right question. I draw from philosophy, stoicism, and first-principles thinking to cut through noise and find what actually matters — for your life, your work, your next move.",
            accent: "bg-blue-100 border-blue-200",
            numberColor: "text-blue-300",
            image: "/descartes.png",
            imageAlt: "Descartes",
            imageBorder: "border-blue-200",
        },
        {
            number: "02",
            icon: "⚙️",
            title: "Build deliberately",
            subtitle: "Software",
            desc: "Ideas need infrastructure. I design and build the tools, agents, and automations that turn your clarity into working systems — not just plans that live in a notebook, but products that ship and run.",
            accent: "bg-amber-100 border-amber-200",
            numberColor: "text-amber-300",
            image: "/rick_sanchez.png",
            imageAlt: "Rick Sanchez",
            imageBorder: "border-amber-200",
        },
        {
            number: "03",
            icon: "🎯",
            title: "Execute strategically",
            subtitle: "Strategy",
            desc: "Clarity and tools mean nothing without a game plan. I help you design the roadmap — what to do, in what order, with what resources — so momentum compounds instead of scattering.",
            accent: "bg-emerald-100 border-emerald-200",
            numberColor: "text-emerald-300",
            image: "/profesor.png",
            imageAlt: "Professor",
            imageBorder: "border-emerald-200",
        },
    ];

    return (
        <section id="pillars" className="relative overflow-hidden bg-stone-50 px-6 pt-24 pb-36">
            <div className="mx-auto max-w-5xl">
                <div className="mb-14">
                    <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-stone-400">
                        <Dot /> How I think
                    </p>
                    <h2 className="font-display text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
                        Three lenses.
                        <br />
                        One system.
                    </h2>
                    <p className="mt-4 max-w-xl text-base text-stone-500 leading-relaxed">
                        Purpose, software, and strategy are not separate disciplines — they are three layers of the same architecture.
                    </p>
                </div>

                <div className="grid gap-5 lg:grid-cols-3">
                    {pillars.map((p) => (
                        <div
                            key={p.number}
                            className={`group relative rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${p.accent}`}
                        >
                            {/* Number always floats top-right */}
                            <p className={`font-display text-7xl font-bold absolute right-5 top-3 select-none z-10 ${p.numberColor}`}>
                                {p.number}
                            </p>

                            <div className="p-8">
                                <span className="mb-5 block text-3xl">{p.icon}</span>

                                <div className="overflow-hidden">
                                    {/* Portrait floats right, text wraps around it */}
                                    {"image" in p && p.image && (
                                        <img
                                            src={p.image}
                                            alt={"imageAlt" in p ? p.imageAlt : ""}
                                            className="float-right ml-3 mb-2 w-24 shrink-0 -rotate-3 transition-all duration-500 ease-out group-hover:rotate-1 group-hover:scale-110 drop-shadow-md group-hover:drop-shadow-lg"
                                        />
                                    )}
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">{p.subtitle}</p>
                                    <h3 className="font-display text-2xl font-bold text-stone-900 mb-3">{p.title}</h3>
                                    <p className="text-sm leading-relaxed text-stone-600">{p.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Wave transition into DailiApp */}
            <div className="pointer-events-none absolute bottom-0 inset-x-0">
                <svg
                    viewBox="0 0 1440 96"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    className="w-full block"
                    style={{ height: 96 }}
                >
                    <path
                        d="M0,96 C240,32 480,80 720,48 C960,16 1200,64 1440,96 Z"
                        fill="#0c0a09"
                    />
                </svg>
            </div>
        </section>
    );
}

// ─── Daili App Mockup ─────────────────────────────────────────────────────────

type DailiWorkspace = "Personal" | "Master plan";
type DailiPriority = "All" | "High" | "Medium" | "Low" | "None";
type DailiTaskPriority = "high" | "medium" | "low" | "none";

interface DailiTask {
    id: string;
    title: string;
    priority: DailiTaskPriority;
    done?: boolean;
    children?: DailiTask[];
}

const DAILI_TASKS: Record<DailiWorkspace, DailiTask[]> = {
    "Master plan": [
        {
            id: "daili-app",
            title: "Daili App",
            priority: "high",
            children: [
                { id: "da-1", title: "Design workspace switcher", priority: "high" },
                { id: "da-2", title: "Build task list UI", priority: "medium" },
                { id: "da-3", title: "Add note editor", priority: "none", done: true },
            ],
        },
        {
            id: "agent-kit",
            title: "Agent Kit",
            priority: "high",
            children: [
                { id: "ak-1", title: "Create use cases", priority: "high" },
                { id: "ak-2", title: "Redeploy database and application", priority: "none" },
                { id: "ak-3", title: "Define Subscription model in website", priority: "none", done: true },
                { id: "ak-4", title: "Backlog", priority: "none" },
                { id: "ak-5", title: "Create subscription in Lemon Squeeze", priority: "none" },
            ],
        },
    ],
    "Personal": [
        { id: "p-1", title: "Morning routine — journal + cold shower", priority: "high" },
        { id: "p-2", title: "Read 30 minutes", priority: "medium" },
        { id: "p-3", title: "Exercise (calisthenics)", priority: "high", done: true },
        { id: "p-4", title: "Write one thing I'm grateful for", priority: "low" },
        { id: "p-5", title: "Limit social media to 20 min", priority: "medium" },
    ]
};

const DAILI_NOTES: Record<string, string> = {
    "Today":
        `Tareas del día
- Deploy Agent Kit v2
- Review Daili UI feedback
- Write 500 words

Ideas que surgieron:
- Onboarding flow simplificado
- Push notifications para tareas`,
    "Videos Ideas":
        `Ideas de video
1. "Cómo construyo mis herramientas"
2. Sistema de productividad real
3. Daili App — walkthrough
4. Por qué salí del trabajo corporativo
5. Vivir en la isla Fuerte`,
};

const PRIORITY_DOT: Record<DailiTaskPriority, string> = {
    high: "bg-red-500",
    medium: "bg-orange-400",
    low: "bg-blue-400",
    none: "bg-stone-300",
};

function DailiCheckbox({ checked, onToggle, checkBorder = "border-stone-300 hover:border-stone-400" }: { checked: boolean; onToggle: () => void; checkBorder?: string }) {
    return (
        <button
            onClick={onToggle}
            className={`h-3.5 w-3.5 shrink-0 rounded flex items-center justify-center border transition-colors ${checked ? "bg-emerald-500 border-emerald-500" : `${checkBorder} bg-transparent`
                }`}
        >
            {checked && (
                <svg viewBox="0 0 12 12" fill="none" className="h-2.5 w-2.5">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )}
        </button>
    );
}

function DailiAppMockup({ dark }: { dark: boolean }) {
    const [workspace, setWorkspace] = useState<DailiWorkspace>("Master plan");
    const [priority, setPriority] = useState<DailiPriority>("All");
    const [expanded, setExpanded] = useState<Set<string>>(new Set(["agent-kit"]));
    const [checked, setChecked] = useState<Set<string>>(new Set(["ak-3", "da-3"]));
    const [activeNote, setActiveNote] = useState("Note 1");
    const [newTask, setNewTask] = useState("");
    const [extraTasks, setExtraTasks] = useState<Record<DailiWorkspace, DailiTask[]>>({
        "Personal": [], "Master plan": []
    });
    const [noteContents, setNoteContents] = useState<Record<string, string>>(DAILI_NOTES);

    const tasks = [...DAILI_TASKS[workspace], ...extraTasks[workspace]];

    const filterTask = (t: DailiTask): boolean => {
        if (priority === "All") return true;
        const levels: Record<string, DailiTaskPriority> = { High: "high", Medium: "medium", Low: "low", None: "none" };
        return t.priority === levels[priority];
    };

    const toggleExpand = (id: string) => {
        setExpanded(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const toggleCheck = (id: string) => {
        setChecked(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const handleAddTask = (e: React.KeyboardEvent) => {
        if (e.key !== "Enter" || !newTask.trim()) return;
        const id = `user-${Date.now()}`;
        setExtraTasks(prev => ({
            ...prev,
            [workspace]: [...prev[workspace], { id, title: newTask.trim(), priority: "none" }],
        }));
        setNewTask("");
    };

    const d = {
        bg: dark ? "bg-stone-900" : "bg-white",
        border: dark ? "border-stone-700/60" : "border-stone-700/40",
        divider: dark ? "border-stone-800" : "border-stone-100",
        panelBg: dark ? "bg-stone-900" : "",
        hoverRow: dark ? "hover:bg-stone-800/60" : "hover:bg-stone-50",
        searchBg: dark ? "bg-stone-800" : "bg-stone-50",
        labelText: dark ? "text-stone-500" : "text-stone-400",
        bodyText: dark ? "text-stone-300" : "text-stone-700",
        subText: dark ? "text-stone-400" : "text-stone-600",
        mutedText: dark ? "text-stone-500" : "text-stone-400",
        activeTab: dark ? "bg-stone-100 text-stone-900" : "bg-stone-900 text-white",
        inactiveTab: dark ? "text-stone-400 hover:bg-stone-800" : "text-stone-500 hover:bg-stone-100",
        btnBorder: dark ? "border-stone-700" : "border-stone-200",
        btnText: dark ? "text-stone-400 hover:bg-stone-800" : "text-stone-500 hover:bg-stone-50",
        checkBorder: dark ? "border-stone-600 hover:border-stone-400" : "border-stone-300 hover:border-stone-400",
        noteHeader: dark ? "text-stone-300" : "text-stone-600",
        noteText: dark ? "text-stone-300" : "text-stone-600",
    };

    return (
        <div className={`rounded-xl border ${d.border} ${d.bg} overflow-hidden shadow-2xl shadow-black/50 select-none transition-colors duration-300`} style={{ fontSize: 13 }}>
            <div className="flex" style={{ height: 380 }}>

                {/* ── Left panel: Tasks ── */}
                <div className={`flex flex-1 flex-col border-r ${d.divider} min-w-0`}>

                    {/* Workspace tabs */}
                    <div className={`flex items-center gap-1 border-b ${d.divider} px-3 py-2 overflow-x-auto`}>
                        <span className={`shrink-0 text-[9px] font-bold tracking-[0.12em] uppercase ${d.labelText} mr-1`}>WORKSPACES</span>
                        {(["Personal", "Master plan"] as DailiWorkspace[]).map(w => (
                            <button
                                key={w}
                                onClick={() => { setWorkspace(w); setExpanded(new Set()); }}
                                className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors ${workspace === w ? d.activeTab : d.inactiveTab
                                    }`}
                            >
                                {w}
                            </button>
                        ))}
                        <button className={`shrink-0 px-1 ${d.mutedText} hover:text-stone-400 leading-none text-base`}>+</button>
                        <div className="ml-auto flex shrink-0 items-center gap-1">
                            <button className={`flex items-center gap-1 rounded border ${d.btnBorder} px-2 py-0.5 text-[10px] ${d.btnText} transition-colors`}>
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-stone-400" /> Done
                            </button>
                            <button className={`rounded border ${d.btnBorder} px-2 py-0.5 text-[10px] ${d.btnText} transition-colors`}>Archive</button>
                        </div>
                    </div>

                    {/* Search */}
                    <div className={`border-b ${d.divider} px-3 py-2`}>
                        <div className={`flex items-center gap-2 rounded-lg ${d.searchBg} px-2.5 py-1`}>
                            <svg className={`h-3 w-3 shrink-0 ${d.mutedText}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeLinecap="round" />
                            </svg>
                            <span className={`text-[11px] ${d.mutedText}`}>Search todos...</span>
                        </div>
                    </div>

                    {/* Priority filter */}
                    <div className={`flex flex-wrap items-center gap-1 border-b ${d.divider} px-3 py-1.5`}>
                        <span className={`text-[9px] font-bold tracking-[0.12em] uppercase ${d.labelText} mr-0.5`}>PRIORITY</span>
                        {(["All", "High", "Medium", "Low", "None"] as DailiPriority[]).map(p => (
                            <button
                                key={p}
                                onClick={() => setPriority(p)}
                                className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors ${priority === p ? d.activeTab : d.inactiveTab
                                    }`}
                            >
                                {p !== "All" && (
                                    <span className={`h-1.5 w-1.5 rounded-full ${PRIORITY_DOT[p.toLowerCase() as DailiTaskPriority]}`} />
                                )}
                                {p}
                            </button>
                        ))}
                    </div>

                    {/* New task input */}
                    <div className={`border-b ${d.divider} px-3 py-2`}>
                        <input
                            type="text"
                            value={newTask}
                            onChange={e => setNewTask(e.target.value)}
                            onKeyDown={handleAddTask}
                            placeholder="What needs to be done? (Enter)"
                            className={`w-full bg-transparent text-[11px] ${d.subText} placeholder-stone-400 outline-none`}
                        />
                    </div>

                    {/* Task list */}
                    <div className="flex-1 overflow-y-auto">
                        {tasks.filter(filterTask).map(task => (
                            <div key={task.id}>
                                <div className={`flex items-center gap-1.5 px-3 py-2 ${d.hoverRow} transition-colors`}>
                                    {task.children ? (
                                        <button onClick={() => toggleExpand(task.id)} className={`h-3 w-3 shrink-0 ${d.mutedText}`}>
                                            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.75}>
                                                {expanded.has(task.id)
                                                    ? <path d="M2 4l4 4 4-4" strokeLinecap="round" />
                                                    : <path d="M4 2l4 4-4 4" strokeLinecap="round" />}
                                            </svg>
                                        </button>
                                    ) : (
                                        <span className="h-3 w-3 shrink-0 flex items-center justify-center">
                                            <span className="h-1 w-1 rounded-full bg-stone-400" />
                                        </span>
                                    )}
                                    <DailiCheckbox checked={checked.has(task.id)} onToggle={() => toggleCheck(task.id)} checkBorder={d.checkBorder} />
                                    <span className={`h-2 w-2 shrink-0 rounded-sm ${PRIORITY_DOT[task.priority]}`} />
                                    <span className={`text-[12px] font-medium truncate ${checked.has(task.id) ? "line-through text-stone-500" : d.bodyText}`}>
                                        {task.title}
                                    </span>
                                </div>
                                {task.children && expanded.has(task.id) && task.children.map(child => (
                                    <div key={child.id} className={`flex items-center gap-1.5 px-3 py-1.5 pl-8 ${d.hoverRow} transition-colors`}>
                                        <span className="h-3 w-3 shrink-0 flex items-center justify-center">
                                            <span className="h-0.5 w-2 rounded-full bg-stone-500" />
                                        </span>
                                        <DailiCheckbox checked={checked.has(child.id)} onToggle={() => toggleCheck(child.id)} checkBorder={d.checkBorder} />
                                        <span className={`h-1.5 w-1.5 shrink-0 rounded-sm ${PRIORITY_DOT[child.priority]}`} />
                                        <span className={`text-[11px] truncate ${checked.has(child.id) ? "line-through text-stone-500" : d.subText}`}>
                                            {child.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Right panel: Notes ── */}
                <div className={`hidden sm:flex w-[220px] shrink-0 flex-col`}>
                    <div className={`flex items-center gap-2 border-b ${d.divider} px-3 py-2`}>
                        <svg className={`h-3.5 w-3.5 shrink-0 ${d.labelText}`} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                        </svg>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${d.noteHeader}`}>IDEAS DUMP</span>
                    </div>

                    <div className={`flex items-center gap-0.5 overflow-x-auto border-b ${d.divider} px-2 py-1.5`}>
                        {Object.keys(DAILI_NOTES).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveNote(tab)}
                                className={`shrink-0 rounded px-2 py-0.5 text-[11px] font-medium whitespace-nowrap transition-colors ${activeNote === tab ? d.activeTab : d.inactiveTab
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                        <button className={`shrink-0 px-1 ${d.mutedText} text-base leading-none hover:text-stone-400`}>+</button>
                    </div>

                    <div className="flex-1 overflow-hidden px-3 py-3">
                        <textarea
                            value={noteContents[activeNote]}
                            onChange={e => setNoteContents(prev => ({ ...prev, [activeNote]: e.target.value }))}
                            className={`w-full h-full resize-none bg-transparent text-[11px] leading-relaxed ${d.noteText} outline-none font-sans placeholder-stone-500`}
                            placeholder="Start writing..."
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

// ─── Daili System Section ──────────────────────────────────────────────────────

function DailiSystemSection() {
    return (
        <section className="relative bg-stone-950 px-6 pt-24 pb-24 overflow-hidden">
            <div className="mx-auto max-w-5xl">
                <div className="flex flex-col lg:flex-row lg:items-center gap-16">

                    {/* ── Left: text + CTA ── */}
                    <div className="flex flex-col gap-6 lg:w-[38%] shrink-0">
                        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-stone-400">
                            <Dot color="bg-indigo-400" /> DailiApp
                        </p>
                        <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl leading-[1.15]">
                            You&apos;re not busy.
                            <br />
                            <span className="text-stone-400">You&apos;re fragmented.</span>
                        </h2>
                        <div className="flex flex-col gap-4">
                            <p className="text-[15px] text-stone-400 leading-[1.9]">
                                Your habits live in one place.<br />
                                Your work in another.<br />
                                Your direction somewhere you don&apos;t revisit.
                            </p>
                            <p className="text-sm text-stone-500 leading-[1.85]">
                                It&apos;s not a discipline problem.<br />
                                It&apos;s a system problem.
                            </p>
                            <p className="text-[15px] text-stone-300 leading-[1.9]">
                                Everything, in one place.{" "}
                                <span className="text-white font-medium">Not organized. Integrated.</span>
                            </p>
                        </div>
                        <a
                            href="https://www.dailiapp.co/signup"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="self-start inline-flex h-12 items-center gap-2 rounded-xl bg-indigo-500 px-7 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-400 hover:shadow-indigo-400/30 active:scale-95"
                        >
                            Try Daili App <IconArrow />
                        </a>
                    </div>

                    {/* ── Right: interactive slider ── */}
                    <div className="flex-1 min-w-0">
                        <DailiSlider />
                    </div>

                </div>
            </div>

        </section>
    );
}

// ─── Daili Habits Mockup ──────────────────────────────────────────────────────

interface DailiHabitItem { id: string; name: string; }

const DAILI_HABIT_LIST: DailiHabitItem[] = [
    { id: "h1", name: "WAKE UP 5.30" },
    { id: "h2", name: "DEEP WORK" },
    { id: "h3", name: "WASH TEETHS" },
    { id: "h4", name: "DRINK WATER" },
    { id: "h5", name: "RUN" },
    { id: "h6", name: "BREAK FAST" },
    { id: "h7", name: "LUNCH" },
];

// 15-day window: May 7–21, 2026. Today = index 14 (May 21)
const HABIT_DAY_LABELS = ["W", "T", "F", "S", "S", "M", "T", "W", "T", "F", "S", "S", "M", "T", "W"];
const HABIT_DAY_NUMS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
const HABIT_TODAY_IDX = 14;

const HABIT_SEED: Record<string, number[]> = {
    h1: [0, 2, 5, 7, 9, 12],
    h2: [1, 4, 6, 8, 11],
    h3: [0, 3, 5, 7, 10, 13],
    h4: [2, 5, 6, 8, 11],
    h5: [1, 5, 7, 9],
    h6: [0, 3, 5, 7, 12],
    h7: [3, 5, 8, 11],
};

function DailiHabitsMockup({ dark }: { dark: boolean }) {
    const [habits, setHabits] = useState<DailiHabitItem[]>(DAILI_HABIT_LIST);
    const [completions, setCompletions] = useState<Record<string, Set<number>>>(() =>
        Object.fromEntries(DAILI_HABIT_LIST.map(h => [h.id, new Set<number>(HABIT_SEED[h.id] ?? [])]))
    );
    const [newHabit, setNewHabit] = useState("");

    const doneToday = habits.filter(h => completions[h.id]?.has(HABIT_TODAY_IDX)).length;

    const longestStreak = (id: string) => {
        const days = completions[id];
        let max = 0, cur = 0;
        HABIT_DAY_NUMS.forEach((_, i) => { days?.has(i) ? (cur++, max = Math.max(max, cur)) : (cur = 0); });
        return max;
    };
    const globalBest = Math.max(0, ...habits.map(h => longestStreak(h.id)));

    const toggleToday = (id: string) => {
        setCompletions(prev => {
            const s = new Set(prev[id]);
            s.has(HABIT_TODAY_IDX) ? s.delete(HABIT_TODAY_IDX) : s.add(HABIT_TODAY_IDX);
            return { ...prev, [id]: s };
        });
    };

    const addHabit = (e: React.KeyboardEvent) => {
        if (e.key !== "Enter" || !newHabit.trim()) return;
        const id = `uh-${Date.now()}`;
        setHabits(prev => [...prev, { id, name: newHabit.trim().toUpperCase() }]);
        setCompletions(prev => ({ ...prev, [id]: new Set<number>() }));
        setNewHabit("");
    };

    const d = {
        bg: dark ? "bg-stone-900" : "bg-white",
        border: dark ? "border-stone-700/60" : "border-stone-700/40",
        divider: dark ? "border-stone-800" : "border-stone-100",
        hoverRow: dark ? "hover:bg-stone-800/50" : "hover:bg-stone-50",
        searchBg: dark ? "bg-stone-800" : "bg-stone-50",
        labelText: dark ? "text-stone-500" : "text-stone-400",
        bodyText: dark ? "text-stone-100" : "text-stone-800",
        subText: dark ? "text-stone-300" : "text-stone-600",
        mutedText: dark ? "text-stone-500" : "text-stone-400",
        btnBorder: dark ? "border-stone-700" : "border-stone-200",
        btnText: dark ? "text-stone-400 hover:bg-stone-800" : "text-stone-500 hover:bg-stone-50",
        trackBg: dark ? "bg-stone-700" : "bg-stone-100",
        cellEmpty: dark ? "bg-stone-800" : "bg-stone-100",
    };

    return (
        <div className={`rounded-xl border ${d.border} ${d.bg} overflow-hidden shadow-2xl shadow-black/50 transition-colors duration-300`} style={{ height: 380, fontSize: 13 }}>
            <div className="flex h-full">

                {/* ── Left: habit list ── */}
                <div className={`w-[270px] shrink-0 flex flex-col border-r ${d.divider}`}>
                    {/* Stats */}
                    <div className={`flex gap-2 px-3 py-2 border-b ${d.divider}`}>
                        {[
                            { val: `${doneToday}/${habits.length}`, label: "Done today" },
                            { val: globalBest || "—", label: "Best streak" },
                            { val: habits.length, label: "Total habits" },
                        ].map(s => (
                            <div key={s.label} className={`flex-1 rounded-lg border ${d.btnBorder} px-2 py-1.5 text-center`}>
                                <p className={`text-sm font-bold ${d.bodyText}`}>{s.val}</p>
                                <p className={`text-[9px] ${d.mutedText} mt-0.5`}>{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Header */}
                    <div className={`flex items-center justify-between px-3 py-2 border-b ${d.divider}`}>
                        <span className={`text-[12px] font-bold ${d.bodyText}`}>Habits</span>
                        <div className="flex items-center gap-1.5">
                            <button className="flex items-center gap-1 rounded-lg bg-stone-900 text-white px-2.5 py-1 text-[11px] font-semibold">
                                + New
                            </button>
                        </div>
                    </div>

                    {/* Habit rows */}
                    <div className="flex-1 overflow-y-auto">
                        {habits.map(h => {
                            const todayDone = completions[h.id]?.has(HABIT_TODAY_IDX) ?? false;
                            const pct = Math.round(((completions[h.id]?.size ?? 0) / HABIT_DAY_NUMS.length) * 100);
                            return (
                                <div key={h.id} className={`flex items-center gap-2 pl-0 pr-3 py-2.5 border-b border-l-2 border-l-indigo-500 ${d.divider} ${d.hoverRow} transition-colors`}>
                                    <span className={`px-2 text-[10px] ${d.mutedText} cursor-grab select-none`}>⠿</span>
                                    <div className="h-7 w-7 shrink-0 rounded-full bg-indigo-100 flex items-center justify-center">
                                        <svg viewBox="0 0 12 12" fill="none" className="h-3.5 w-3.5">
                                            <path d="M2 6l3 3 5-5" stroke="#6366f1" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-[11px] font-bold tracking-wide truncate ${d.bodyText}`}>{h.name}</p>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <div className={`h-0.5 flex-1 rounded-full ${d.trackBg}`}>
                                                <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${Math.max(pct, 2)}%` }} />
                                            </div>
                                            <span className={`text-[9px] shrink-0 ${d.mutedText}`}>{pct}%</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toggleToday(h.id)}
                                        className={`h-7 w-7 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${todayDone ? "bg-indigo-500 border-indigo-500" : `${dark ? "border-stone-600 hover:border-indigo-400" : "border-stone-200 hover:border-indigo-300"}`
                                            }`}
                                    >
                                        {todayDone && (
                                            <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3">
                                                <path d="M2 6l3 3 5-5" stroke="white" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            );
                        })}
                        <div className={`px-3 py-2 border-l-2 border-l-stone-300`}>
                            <input
                                type="text"
                                value={newHabit}
                                onChange={e => setNewHabit(e.target.value)}
                                onKeyDown={addHabit}
                                placeholder="Add habit... (Enter)"
                                className={`w-full bg-transparent text-[11px] ${d.subText} placeholder-stone-400 outline-none`}
                            />
                        </div>
                    </div>
                </div>

                {/* ── Right: history grid ── */}
                <div className="flex-1 flex flex-col min-w-0">
                    <div className={`flex items-center justify-between px-4 py-2.5 border-b ${d.divider}`}>
                        <div>
                            <p className={`text-[12px] font-bold ${d.bodyText}`}>History</p>
                            <p className={`text-[10px] ${d.mutedText}`}>May 2026</p>
                        </div>
                        <div className="flex gap-1">
                            {["←", "→"].map(dir => (
                                <button key={dir} className={`h-6 w-6 rounded flex items-center justify-center text-[11px] border ${d.btnBorder} ${d.btnText} transition-colors`}>{dir}</button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-auto px-4 py-3">
                        {/* Day header */}
                        <div className="flex items-end mb-2" style={{ minWidth: 400 }}>
                            <div className={`w-24 shrink-0 text-[9px] font-bold uppercase tracking-wider ${d.labelText}`}>HABIT</div>
                            {HABIT_DAY_LABELS.map((lbl, i) => (
                                <div key={i} className="flex-1 text-center">
                                    <p className={`text-[9px] font-medium ${i === HABIT_TODAY_IDX ? "text-indigo-500" : d.mutedText}`}>{lbl}</p>
                                    <p className={`text-[9px] ${i === HABIT_TODAY_IDX ? "text-indigo-500 font-bold" : d.mutedText}`}>{HABIT_DAY_NUMS[i]}</p>
                                </div>
                            ))}
                        </div>

                        {/* Habit rows */}
                        {habits.map(h => (
                            <div key={h.id} className="flex items-center mb-1.5" style={{ minWidth: 400 }}>
                                <div className={`w-24 shrink-0 flex items-center gap-1`}>
                                    <svg viewBox="0 0 12 12" fill="none" className="h-2.5 w-2.5 shrink-0">
                                        <path d="M2 6l3 3 5-5" stroke="#6366f1" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className={`text-[9px] font-medium truncate ${d.subText}`}>{h.name}</span>
                                </div>
                                {HABIT_DAY_NUMS.map((_, i) => {
                                    const done = completions[h.id]?.has(i) ?? false;
                                    return (
                                        <div key={i} className="flex-1 flex justify-center">
                                            <div className={`h-4 w-4 rounded transition-colors ${done ? (i === HABIT_TODAY_IDX ? "bg-blue-500" : "bg-indigo-400") : d.cellEmpty}`} />
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

// ─── Daili Coming Soon ─────────────────────────────────────────────────────────

function DailiComingSoon({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="rounded-xl border border-stone-700/40 bg-stone-900/40 overflow-hidden flex items-center justify-center" style={{ height: 380 }}>
            <div className="text-center px-8">
                <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[10px] font-medium text-indigo-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" /> Coming soon
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-stone-500 max-w-xs leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

// ─── Daili Calendar Mockup ────────────────────────────────────────────────────

interface CalEvent { id: string; day: number; title: string; }

const CAL_WEEKS: (number | null)[][] = [
    [null, null, null, null, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30, 31],
];
const CAL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const CAL_TODAY = 21;

const CALENDAR_EVENTS: CalEvent[] = [
    { id: "ce1", day: 1, title: "Slush" },
    { id: "ce2", day: 4, title: "Trading Plan Meet" },
    { id: "ce3", day: 5, title: "Slush" },
    { id: "ce4", day: 8, title: "Slush" },
    { id: "ce5", day: 12, title: "Despliegue Agent Kit - Semille..." },
    { id: "ce6", day: 12, title: "Slush" },
    { id: "ce7", day: 12, title: "Team sync" },
    { id: "ce8", day: 14, title: "PeerSpot Product Reviews wit..." },
    { id: "ce9", day: 15, title: "Slush" },
    { id: "ce10", day: 18, title: "Trading Plan Meet" },
    { id: "ce11", day: 19, title: "Slush" },
    { id: "ce12", day: 22, title: "Slush" },
    { id: "ce13", day: 25, title: "Trading Plan Meet" },
    { id: "ce14", day: 26, title: "Slush" },
    { id: "ce15", day: 29, title: "Slush" },
];

function DailiCalendarMockup({ dark }: { dark: boolean }) {
    const [events, setEvents] = useState<CalEvent[]>(CALENDAR_EVENTS);
    const [addingDay, setAddingDay] = useState<number | null>(null);
    const [newEventTitle, setNewEventTitle] = useState("");

    const d = {
        bg: dark ? "bg-stone-900" : "bg-white",
        border: dark ? "border-stone-700/60" : "border-stone-700/40",
        divider: dark ? "border-stone-800" : "border-stone-100",
        bodyText: dark ? "text-stone-100" : "text-stone-800",
        subText: dark ? "text-stone-300" : "text-stone-500",
        mutedText: dark ? "text-stone-500" : "text-stone-400",
        btnBorder: dark ? "border-stone-700" : "border-stone-200",
        btnText: dark ? "text-stone-400 hover:bg-stone-800" : "text-stone-500 hover:bg-stone-50",
        hoverCell: dark ? "hover:bg-stone-800/40" : "hover:bg-stone-50/80",
        todayBg: dark ? "bg-indigo-950/60" : "bg-indigo-50/70",
        pillBg: dark ? "bg-indigo-900/50 text-indigo-300" : "bg-indigo-50 text-indigo-600",
        inputBg: dark ? "bg-stone-800 border-indigo-500 text-stone-200" : "bg-white border-indigo-300 text-stone-700",
    };

    const eventsForDay = (day: number) => events.filter(e => e.day === day);

    const commitEvent = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") { setAddingDay(null); setNewEventTitle(""); return; }
        if (e.key !== "Enter" || !newEventTitle.trim() || addingDay === null) return;
        setEvents(prev => [...prev, { id: `ce-${Date.now()}`, day: addingDay, title: newEventTitle.trim() }]);
        setNewEventTitle("");
        setAddingDay(null);
    };

    return (
        <div
            className={`rounded-xl border ${d.border} ${d.bg} overflow-hidden shadow-2xl shadow-black/50 transition-colors duration-300 flex flex-col`}
            style={{ height: 380, fontSize: 13 }}
        >
            {/* Header */}
            <div className={`flex items-center justify-between px-4 py-2 border-b ${d.divider} shrink-0`}>
                <div className="flex items-center gap-2">
                    {["‹", "›"].map((ch, i) => (
                        <button key={ch} className={`h-6 w-6 rounded flex items-center justify-center text-sm ${d.btnText} border ${d.btnBorder} transition-colors`}>{ch}</button>
                    ))}
                    <span className={`text-[13px] font-bold ${d.bodyText}`}>May 2026</span>
                    <button className={`text-[11px] ${d.mutedText} hover:text-stone-300 transition-colors`}>Today</button>
                </div>
                <div className="flex items-center gap-2">
                    <button className={`h-7 w-7 rounded-full border ${d.btnBorder} flex items-center justify-center ${d.btnText} transition-colors`}>
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-3.5 w-3.5">
                            <path d="M13.5 8A5.5 5.5 0 112.9 5M2.5 2v3.5H6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button className="flex items-center gap-1.5 rounded-lg bg-stone-900 text-white px-3 py-1 text-[11px] font-semibold">
                        + Add Event
                    </button>
                </div>
            </div>

            {/* Day column labels */}
            <div className={`grid grid-cols-7 border-b ${d.divider} shrink-0`}>
                {CAL_DAYS.map(label => (
                    <div key={label} className={`py-1.5 text-center text-[10px] font-medium ${d.mutedText}`}>{label}</div>
                ))}
            </div>

            {/* Weeks grid */}
            <div className="flex-1 grid min-h-0" style={{ gridTemplateRows: "repeat(5, 1fr)" }}>
                {CAL_WEEKS.map((week, wi) => (
                    <div key={wi} className={`grid grid-cols-7 border-b last:border-b-0 ${d.divider}`}>
                        {week.map((day, di) => {
                            if (day === null) {
                                return <div key={di} className={`border-r last:border-r-0 ${d.divider}`} />;
                            }
                            const dayEvents = eventsForDay(day);
                            const shown = dayEvents.slice(0, 2);
                            const extra = dayEvents.length - 2;
                            const isToday = day === CAL_TODAY;
                            const isAdding = day === addingDay;
                            return (
                                <div
                                    key={di}
                                    onClick={() => { setAddingDay(day); setNewEventTitle(""); }}
                                    className={`border-r last:border-r-0 ${d.divider} px-1 pt-1 cursor-pointer overflow-hidden transition-colors ${isToday ? d.todayBg : d.hoverCell}`}
                                >
                                    <div className="flex justify-start mb-0.5">
                                        <span className={`text-[10px] font-medium h-5 w-5 flex items-center justify-center rounded-full ${isToday ? "bg-indigo-500 text-white font-bold" : d.subText
                                            }`}>
                                            {day}
                                        </span>
                                    </div>
                                    {shown.map(ev => (
                                        <div key={ev.id} className={`mb-0.5 rounded px-1 py-px text-[9px] truncate ${d.pillBg}`}>
                                            {ev.title}
                                        </div>
                                    ))}
                                    {extra > 0 && <p className={`text-[9px] ${d.mutedText}`}>+{extra} more</p>}
                                    {isAdding && (
                                        <input
                                            autoFocus
                                            type="text"
                                            value={newEventTitle}
                                            onChange={e => setNewEventTitle(e.target.value)}
                                            onKeyDown={commitEvent}
                                            onBlur={() => { setAddingDay(null); setNewEventTitle(""); }}
                                            placeholder="Event…"
                                            onClick={e => e.stopPropagation()}
                                            className={`mt-0.5 w-full rounded border px-1 py-px text-[9px] outline-none ${d.inputBg}`}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Daili AI Studio Mockup ────────────────────────────────────────────────────

interface AIChatMsg { id: string; role: "user" | "ai"; content: string; }

const AI_STUDIO_SEED: Record<string, AIChatMsg[]> = {
    "conv-1": [
        { id: "m1", role: "user", content: "Que es Dailiapp" },
        { id: "m2", role: "ai", content: "**Dailiapp: Una Herramienta para Mejorar la Productividad**\n\nDailiapp es una aplicación diseñada para ayudar a creativos, traders, creadores, fundadores y nómadas digitales a mantenerse enfocados en su trabajo profundo, mientras que la aplicación se encarga de gestionar la información diaria para tener una claridad de intención y objetivos.\n\n**Funcionalidades de Dailiapp**\n\n• Gestión de tareas y proyectos\n• Organización de la información diaria, como recordatorios y eventos\n• Herramientas de enfoque y concentración, como temporizadores\n• Integración con otras herramientas para una mayor eficiencia\n• Análisis y seguimiento del progreso para establecer metas claras" },
    ],
    "conv-2": [
        { id: "m3", role: "user", content: "Hola" },
        { id: "m4", role: "ai", content: "¡Hola! ¿En qué puedo ayudarte hoy? Estoy aquí para asistirte con cualquier pregunta sobre Dailiapp o lo que necesites." },
    ],
};

const AI_CANNED: string[] = [
    "Entiendo tu pregunta. Dailiapp integra todos los aspectos de tu productividad en un sistema coherente — tareas, hábitos, calendario y notas — eliminando la fragmentación que te impide avanzar.",
    "Buena pregunta. El objetivo de Dailiapp es que tengas claridad de intención y dirección, no solo una lista más de cosas por hacer. ¿Quieres que profundice en algún aspecto?",
    "Exacto. La diferencia entre estar ocupado y estar productivo es el sistema que usas. Dailiapp está diseñada para cerrar esa brecha con un enfoque integrado.",
    "Con Dailiapp puedes gestionar workspaces, hacer seguimiento de hábitos con un histórico visual, ver tu calendario integrado y chatear con AI Studio — todo en un solo lugar.",
];

const AI_PROVIDERS: Record<string, string[]> = {
    "Groq": ["Llama 3.3 70B", "Llama 3.1 8B", "Mixtral 8x7B"],
    "Anthropic": ["claude-sonnet-4", "claude-opus-4", "claude-haiku-4"],
    "OpenAI": ["GPT-4o", "GPT-4o mini", "o3"],
};

function AIMsgContent({ content }: { content: string }) {
    return (
        <div className="space-y-1">
            {content.split("\n").map((line, i) => {
                if (line === "") return <div key={i} className="h-1" />;
                if (line.startsWith("**") && line.endsWith("**"))
                    return <p key={i} className="font-bold text-[12px]">{line.slice(2, -2)}</p>;
                if (line.startsWith("• "))
                    return (
                        <div key={i} className="flex items-start gap-1.5">
                            <span className="mt-0.5 text-[10px] text-stone-400 shrink-0">•</span>
                            <p className="text-[11px] leading-relaxed">{line.slice(2)}</p>
                        </div>
                    );
                return <p key={i} className="text-[11px] leading-relaxed">{line}</p>;
            })}
        </div>
    );
}

function DailiAIStudioMockup({ dark }: { dark: boolean }) {
    const [activeConvId, setActiveConvId] = useState("conv-1");
    const [allMessages, setAllMessages] = useState<Record<string, AIChatMsg[]>>(AI_STUDIO_SEED);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [provider, setProvider] = useState("Groq");
    const [model, setModel] = useState("Llama 3.3 70B");
    const messagesRef = useRef<HTMLDivElement>(null);

    const messages = allMessages[activeConvId] ?? [];
    const convTitles: Record<string, string> = { "conv-1": "Que es Dailiapp", "conv-2": "Hola" };
    const activeTitle = convTitles[activeConvId] ?? "New chat";

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const sendMessage = () => {
        if (!input.trim() || isTyping) return;
        const userMsg: AIChatMsg = { id: `u-${Date.now()}`, role: "user", content: input.trim() };
        setAllMessages(prev => ({ ...prev, [activeConvId]: [...(prev[activeConvId] ?? []), userMsg] }));
        setInput("");
        setIsTyping(true);
        setTimeout(() => {
            const aiMsg: AIChatMsg = { id: `a-${Date.now()}`, role: "ai", content: AI_CANNED[Math.floor(Math.random() * AI_CANNED.length)] };
            setAllMessages(prev => ({ ...prev, [activeConvId]: [...(prev[activeConvId] ?? []), aiMsg] }));
            setIsTyping(false);
        }, 1200);
    };

    const d = {
        bg: dark ? "bg-stone-900" : "bg-white",
        border: dark ? "border-stone-700/60" : "border-stone-700/40",
        divider: dark ? "border-stone-800" : "border-stone-100",
        sidebarBg: dark ? "bg-stone-950" : "bg-stone-50",
        bodyText: dark ? "text-stone-100" : "text-stone-800",
        subText: dark ? "text-stone-300" : "text-stone-600",
        mutedText: dark ? "text-stone-500" : "text-stone-400",
        labelText: dark ? "text-stone-600" : "text-stone-400",
        btnBorder: dark ? "border-stone-700" : "border-stone-200",
        btnHover: dark ? "hover:bg-stone-800" : "hover:bg-stone-50",
        btnText: dark ? "text-stone-400" : "text-stone-500",
        searchBg: dark ? "bg-stone-800" : "bg-stone-200/60",
        activeConv: dark ? "bg-stone-700 text-stone-100" : "bg-white text-stone-800 shadow-sm",
        inactiveConv: dark ? "text-stone-400 hover:bg-stone-800" : "text-stone-500 hover:bg-white",
        tagBg: dark ? "bg-stone-800 text-stone-400" : "bg-stone-200 text-stone-500",
        userBubble: dark ? "bg-stone-700 text-stone-100" : "bg-stone-900 text-white",
        aiBubble: dark ? "bg-stone-800 text-stone-200" : "bg-stone-100 text-stone-700",
        selectBg: dark ? "bg-stone-800 text-stone-300" : "bg-transparent text-stone-600",
        userAvatar: dark ? "bg-stone-700 text-stone-200" : "bg-stone-200 text-stone-600",
    };

    const convList = [{ id: "conv-1", title: "Que es Dailiapp" }, { id: "conv-2", title: "Hola" }];

    return (
        <div className={`rounded-xl border ${d.border} overflow-hidden shadow-2xl shadow-black/50 transition-colors duration-300 flex`} style={{ height: 380, fontSize: 13 }}>

            {/* ── Sidebar ── */}
            <div className={`w-[185px] shrink-0 flex flex-col border-r ${d.divider} ${d.sidebarBg}`}>
                <div className="px-2 pt-2.5 pb-1.5">
                    <div className={`flex items-center gap-1.5 rounded-lg ${d.searchBg} px-2.5 py-1.5`}>
                        <svg className={`h-3 w-3 ${d.mutedText} shrink-0`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeLinecap="round" />
                        </svg>
                        <span className={`text-[11px] ${d.mutedText}`}>Search...</span>
                    </div>
                </div>

                <div className="flex gap-1.5 px-2 pb-2">
                    <button className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-stone-900 text-white py-1 text-[11px] font-semibold">+ Chat</button>
                    <button className={`flex-1 flex items-center justify-center gap-1 rounded-lg border ${d.btnBorder} py-1 text-[11px] ${d.btnText} ${d.btnHover} transition-colors`}>Project</button>
                </div>

                <div className="px-2 mb-2">
                    <p className={`text-[9px] font-bold uppercase tracking-[0.12em] ${d.labelText} mb-1 px-1`}>UNFILED</p>
                    <button className={`w-full flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] text-left ${d.inactiveConv} transition-colors`}>
                        <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        New chat
                    </button>
                </div>

                <div className="px-2 flex-1 overflow-y-auto">
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                        <svg className="h-3.5 w-3.5 text-amber-500 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                        <span className={`text-[11px] font-semibold ${d.bodyText}`}>DailiApp</span>
                    </div>
                    <div className="flex flex-wrap gap-1 px-1 mb-1.5">
                        {["marketing", "founder", "webapp"].map(t => (
                            <span key={t} className={`text-[9px] rounded px-1.5 py-0.5 ${d.tagBg}`}>{t}</span>
                        ))}
                    </div>
                    {convList.map(conv => (
                        <button key={conv.id} onClick={() => setActiveConvId(conv.id)}
                            className={`w-full flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] text-left mb-0.5 transition-colors ${activeConvId === conv.id ? d.activeConv : d.inactiveConv}`}>
                            <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            <span className="truncate">{conv.title}</span>
                        </button>
                    ))}
                </div>

                <div className={`border-t ${d.divider} px-3 py-2`}>
                    <button className={`flex items-center gap-1.5 text-[10px] ${d.mutedText} hover:text-stone-400 transition-colors`}>
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        API Keys & Settings
                    </button>
                </div>
            </div>

            {/* ── Main chat ── */}
            <div className={`flex-1 flex flex-col min-w-0 ${d.bg}`}>
                {/* Header */}
                <div className={`flex items-center justify-between px-4 py-2 border-b ${d.divider} shrink-0`}>
                    <div>
                        <p className={`text-[12px] font-bold ${d.bodyText}`}>{activeTitle}</p>
                        <p className={`text-[9px] ${d.mutedText}`}><span className="text-amber-500 font-medium">DailiApp</span> · {provider} · {model}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <button className={`flex items-center gap-1 text-[10px] border ${d.btnBorder} rounded px-2 py-0.5 ${d.btnText} ${d.btnHover} transition-colors`}>
                            <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            Save log
                        </button>
                        <select value={provider} onChange={e => { setProvider(e.target.value); setModel(AI_PROVIDERS[e.target.value][0]); }}
                            className={`text-[10px] border ${d.btnBorder} rounded px-1.5 py-0.5 outline-none cursor-pointer ${d.selectBg}`}>
                            {Object.keys(AI_PROVIDERS).map(p => <option key={p}>{p}</option>)}
                        </select>
                        <select value={model} onChange={e => setModel(e.target.value)}
                            className={`text-[10px] border ${d.btnBorder} rounded px-1.5 py-0.5 outline-none cursor-pointer ${d.selectBg}`}>
                            {AI_PROVIDERS[provider].map(m => <option key={m}>{m}</option>)}
                        </select>
                        <button className={`h-6 w-6 flex items-center justify-center rounded border ${d.btnBorder} ${d.btnText} ${d.btnHover} transition-colors`}>
                            <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div ref={messagesRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex items-start gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
                            {msg.role === "ai" && (
                                <div className="h-7 w-7 rounded-full bg-stone-900 flex items-center justify-center shrink-0">
                                    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 text-white" stroke="currentColor" strokeWidth={1.5}>
                                        <rect x="2" y="4" width="12" height="9" rx="2" /><path d="M8 4V2M5 4V2M11 4V2" strokeLinecap="round" />
                                    </svg>
                                </div>
                            )}
                            <div className={`max-w-[80%] rounded-2xl px-3 py-2.5 ${msg.role === "user" ? d.userBubble : d.aiBubble}`}>
                                <AIMsgContent content={msg.content} />
                            </div>
                            {msg.role === "user" && (
                                <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${d.userAvatar}`}>U</div>
                            )}
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex items-start gap-2">
                            <div className="h-7 w-7 rounded-full bg-stone-900 flex items-center justify-center shrink-0">
                                <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 text-white" stroke="currentColor" strokeWidth={1.5}>
                                    <rect x="2" y="4" width="12" height="9" rx="2" /><path d="M8 4V2M5 4V2M11 4V2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div className={`rounded-2xl px-4 py-3 ${d.aiBubble}`}>
                                <div className="flex items-center gap-1">
                                    {[0, 1, 2].map(i => (
                                        <div key={i} className="h-1.5 w-1.5 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input */}
                <div className={`border-t ${d.divider} px-4 py-2.5 shrink-0`}>
                    <div className="flex items-end gap-2">
                        <textarea
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                            placeholder="Ask anything..."
                            rows={1}
                            className={`flex-1 resize-none bg-transparent text-[12px] ${d.subText} placeholder-stone-400 outline-none`}
                        />
                        <button onClick={sendMessage} disabled={!input.trim() || isTyping}
                            className="h-7 w-7 rounded-lg bg-stone-900 flex items-center justify-center text-white disabled:opacity-30 transition-opacity shrink-0">
                            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-3 w-3">
                                <path d="M6 10V2M2 6l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <p className={`text-[9px] ${d.mutedText} mt-0.5`}>Enter to send · Shift+Enter for newline</p>
                </div>
            </div>
        </div>
    );
}

// ─── Daili Slider ──────────────────────────────────────────────────────────────

const DAILI_SLIDES = [
    { id: "todos", label: "Todos" },
    { id: "habits", label: "Habits" },
    { id: "calendar", label: "Calendar" },
    { id: "ai-studio", label: "AI Studio" },
] as const;

function DailiSlider() {
    const [active, setActive] = useState(0);
    const [dark, setDark] = useState(false);

    return (
        <div>
            {/* Navigation bar */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-1 rounded-full border border-stone-700/60 bg-stone-900/60 p-1">
                    {DAILI_SLIDES.map((slide, i) => (
                        <button
                            key={slide.id}
                            onClick={() => setActive(i)}
                            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium transition-all ${active === i
                                    ? "bg-indigo-500 text-white shadow-sm"
                                    : "text-stone-400 hover:text-stone-200"
                                }`}
                        >
                            {slide.label}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setDark(v => !v)}
                        className="h-7 w-7 flex items-center justify-center rounded-full border border-stone-700 text-stone-400 hover:text-white hover:border-stone-500 transition-all text-[13px]"
                        title="Toggle dark mode"
                    >
                        {dark ? "☀️" : "🌙"}
                    </button>
                    <div className="flex items-center">
                        <button
                            onClick={() => setActive(i => Math.max(0, i - 1))}
                            disabled={active === 0}
                            className="h-7 w-7 flex items-center justify-center rounded-l-full border border-stone-700 text-stone-400 hover:text-white hover:border-stone-500 disabled:opacity-25 transition-all"
                        >
                            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-3 w-3">
                                <path d="M8 2L4 6l4 4" strokeLinecap="round" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setActive(i => Math.min(3, i + 1))}
                            disabled={active >= 3}
                            className="h-7 w-7 flex items-center justify-center rounded-r-full border border-l-0 border-stone-700 text-stone-400 hover:text-white hover:border-stone-500 disabled:opacity-25 transition-all"
                        >
                            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-3 w-3">
                                <path d="M4 2l4 4-4 4" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Slide content */}
            {active === 0 && <DailiAppMockup dark={dark} />}
            {active === 1 && <DailiHabitsMockup dark={dark} />}
            {active === 2 && <DailiCalendarMockup dark={dark} />}
            {active === 3 && <DailiAIStudioMockup dark={dark} />}
        </div>
    );
}

// ─── Monetize Kit ──────────────────────────────────────────────────────────────

const DUST = [
    { ox: -38, oy: -10, size: 3, delay: 0 },
    { ox: 22, oy: -20, size: 2, delay: 70 },
    { ox: -14, oy: -5, size: 4, delay: 140 },
    { ox: 40, oy: -8, size: 2, delay: 40 },
    { ox: -28, oy: -15, size: 3, delay: 200 },
    { ox: 10, oy: -25, size: 2, delay: 110 },
    { ox: -50, oy: -3, size: 2, delay: 250 },
    { ox: 50, oy: -12, size: 3, delay: 80 },
    { ox: 0, oy: -30, size: 2, delay: 170 },
    { ox: -20, oy: -18, size: 3, delay: 300 },
];

function Dust({ color, glow }: { color: string; glow: string }) {
    return (
        <>
            {DUST.map((p, i) => (
                <div key={i} className="absolute rounded-full pointer-events-none"
                    style={{
                        left: `calc(50% + ${p.ox}px)`, top: `${p.oy}px`,
                        width: p.size * 2, height: p.size * 2,
                        background: color,
                        boxShadow: `0 0 ${p.size * 4}px ${p.size}px ${glow}`,
                        animation: "mkDust 1.5s ease-out forwards",
                        animationDelay: `${p.delay}ms`,
                        opacity: 0,
                    }}
                />
            ))}
        </>
    );
}

// ─── Environment Switcher ──────────────────────────────────────────────────────

function EnvironmentSwitcher({
    mode, setMode,
}: {
    mode: "island" | "builder" | "reflect";
    setMode: (m: "island" | "builder" | "reflect") => void;
}) {
    const env = ENV[mode];
    return (
        <div
            className="rounded-2xl overflow-hidden"
            style={{
                border: `1px solid ${env.accent}28`,
                transition: "border-color 0.5s ease",
            }}
        >
            {/* Mode tabs */}
            <div
                className="grid grid-cols-3"
                style={{ borderBottom: `1px solid ${env.accent}20` }}
            >
                {(["island", "builder", "reflect"] as const).map((k, i) => (
                    <button
                        key={k}
                        onClick={() => setMode(k)}
                        className="relative py-5 px-6 text-left transition-all duration-500"
                        style={{
                            background: mode === k
                                ? `linear-gradient(135deg, ${ENV[k].grad[0]}, ${ENV[k].grad[1]})`
                                : "transparent",
                            borderRight: i < 2 ? `1px solid ${env.accent}20` : "none",
                        }}
                    >
                        <span
                            className="block text-xl mb-1.5 transition-all duration-500"
                            style={{ opacity: mode === k ? 1 : 0.4 }}
                        >
                            {k === "island" ? "🏝️" : k === "builder" ? "⚡" : "🌫️"}
                        </span>
                        <span
                            className="block text-sm font-semibold transition-all duration-500"
                            style={{
                                color: env.text,
                                opacity: mode === k ? 1 : 0.4,
                            }}
                        >
                            {ENV[k].label}
                        </span>
                        {mode === k && (
                            <span
                                className="absolute bottom-0 inset-x-0 h-[2px]"
                                style={{ background: ENV[k].accent }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Description area */}
            <div
                className="relative overflow-hidden px-10 py-10"
                style={{
                    background: `linear-gradient(135deg, ${env.grad[0]} 0%, ${env.grad[1]} 50%, ${env.grad[2]} 100%)`,
                    transition: "background 0.7s ease",
                }}
            >
                {/* Floating particles */}
                {ENV_PARTICLES.map((p, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: p.size,
                            height: p.size,
                            background: env.particles[p.idx],
                            opacity: 0.35,
                            animation: `envParticle ${env.speed + p.delay}s ease-in-out ${p.delay}s infinite`,
                            transition: "background 0.7s ease",
                            filter: "blur(1px)",
                        }}
                    />
                ))}

                <p
                    className="relative text-lg font-light leading-relaxed max-w-2xl"
                    style={{ color: env.text, transition: "color 0.5s ease" }}
                >
                    {env.desc}
                </p>

                <div className="relative mt-6 flex items-center gap-2">
                    <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                            background: env.accent,
                            transition: "background 0.5s ease",
                            animation: "statusBlink 2.5s ease-in-out infinite",
                        }}
                    />
                    <span
                        className="text-xs font-mono"
                        style={{ color: env.text, opacity: 0.5, transition: "color 0.5s ease" }}
                    >
                        mode: {mode}
                    </span>
                </div>
            </div>
        </div>
    );
}

// ─── Environment Section ───────────────────────────────────────────────────────

function EnvironmentSection() {
    const [envMode, setEnvMode] = useState<"island" | "builder" | "reflect">("island");
    const env = ENV[envMode];

    return (
        <section
            className="relative overflow-hidden pt-44 pb-40 px-6"
            style={{
                background: `linear-gradient(160deg, ${env.grad[0]} 0%, ${env.grad[1]} 55%, ${env.grad[2]} 100%)`,
                transition: "background 0.7s ease",
            }}
        >
            {/* Wave in from DailiSection (stone-950 → gradient) */}
            <div className="pointer-events-none absolute top-0 inset-x-0 z-10">
                <svg viewBox="0 0 1440 110" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: 110 }}>
                    <path
                        d="M0,0 L0,72 C180,100 360,55 560,78 C760,101 940,60 1120,80 C1270,96 1380,68 1440,72 L1440,0 Z"
                        fill="#0c0a09"
                        fillOpacity="0.35"
                    />
                    <path
                        d="M0,0 L0,60 C200,88 400,44 600,66 C800,88 980,48 1160,68 C1300,83 1390,56 1440,60 L1440,0 Z"
                        fill="#0c0a09"
                    />
                </svg>
            </div>

            {/* Wave out to SupportTeaser (gradient → stone-950) */}
            <div className="pointer-events-none absolute bottom-0 inset-x-0 z-10">
                <svg viewBox="0 0 1440 110" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: 110 }}>
                    <path
                        d="M0,110 L0,48 C180,20 360,65 560,42 C760,19 940,60 1120,40 C1270,24 1380,52 1440,48 L1440,110 Z"
                        fill="#0c0a09"
                        fillOpacity="0.35"
                    />
                    <path
                        d="M0,110 L0,60 C200,32 400,76 600,54 C800,32 980,72 1160,52 C1300,37 1390,64 1440,60 L1440,110 Z"
                        fill="#0c0a09"
                    />
                </svg>
            </div>

            {/* Immersive background particles */}
            {ENV_PARTICLES.map((p, i) => (
                <div
                    key={i}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size * 5,
                        height: p.size * 5,
                        background: env.particles[p.idx],
                        opacity: 0.15,
                        animation: `envParticle ${env.speed + p.delay}s ease-in-out ${p.delay}s infinite`,
                        filter: "blur(3px)",
                    }}
                />
            ))}

            <div className="relative mx-auto max-w-5xl">
                {/* Centered heading */}
                <div className="text-center mb-12">
                    <p
                        className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em]"
                        style={{ color: env.text, opacity: 0.55, transition: "color 0.7s ease" }}
                    >
                        Environment
                    </p>
                    <h2
                        className="font-display text-5xl font-bold sm:text-6xl leading-[1.1]"
                        style={{ color: env.text, transition: "color 0.7s ease" }}
                    >
                        Same person.
                        <br />
                        Different energy.
                    </h2>
                    <p
                        className="mt-5 text-sm leading-relaxed max-w-sm mx-auto"
                        style={{ color: env.text, opacity: 0.6, transition: "color 0.7s ease" }}
                    >
                        Same systems, different state. Where I am shapes how I think — and what gets built.
                    </p>
                </div>

                {/* Full-width switcher */}
                <EnvironmentSwitcher mode={envMode} setMode={setEnvMode} />
            </div>
        </section>
    );
}

// ─── What I Build ──────────────────────────────────────────────────────────────

function WhatIBuild() {
    const items = [
        {
            emoji: "🤖",
            title: "AI Agents",
            desc: "Custom agents that think, plan, and act on your behalf — so you stop doing the work a machine can do better.",
        },
        {
            emoji: "⚡",
            title: "Automation flows",
            desc: "End-to-end pipelines that take repetitive tasks off your plate and run them silently in the background.",
        },
        {
            emoji: "📐",
            title: "Personal systems",
            desc: "Structured frameworks for goals, decisions, and daily execution — built around how you actually think.",
        },
        {
            emoji: "🛠️",
            title: "Purpose-built apps",
            desc: "Bespoke web tools that solve your specific problem, not a generic one. Fast, focused, and built to last.",
        },
    ];

    return (
        <section id="builds" className="bg-stone-100 px-6 py-16">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                        <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-stone-400">
                            <Dot color="bg-amber-400" /> What I build
                        </p>
                        <h2 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                            Tools that make the system real.
                        </h2>
                    </div>
                    <p className="text-sm text-stone-500 leading-relaxed max-w-xs sm:text-right">
                        Strategy without execution is fiction. I build the tools that close the gap.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {items.map((item) => (
                        <div
                            key={item.title}
                            className="group flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-5 transition-all duration-300 hover:shadow-md hover:border-stone-300 hover:-translate-y-0.5"
                        >
                            <span className="text-2xl">{item.emoji}</span>
                            <div>
                                <h3 className="font-display font-bold text-stone-900 mb-1">{item.title}</h3>
                                <p className="text-sm leading-relaxed text-stone-500">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Agent Kit CTA ─────────────────────────────────────────────────────────────

function AgentKitCTA() {
    const features = [
        "Deploy multiple specialized agents from a single platform",
        "Knowledge base agents trained on your own documents and data",
        "Dynamic tables, functions, and custom behavior per agent",
        "Connect to OpenAI, Anthropic, Groq, and more — swap providers anytime",
        "WhatsApp integration built in — your agents respond where users already are",
    ];

    return (
        <section className="bg-stone-900 px-6 py-28 text-white relative overflow-hidden">
            <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/3 rounded-full bg-amber-500/10 blur-[120px]" />
            <div className="pointer-events-none absolute left-0 bottom-0 h-[300px] w-[300px] -translate-x-1/3 translate-y-1/3 rounded-full bg-amber-500/5 blur-[80px]" />

            <div className="relative mx-auto max-w-5xl">
                <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-center">
                    {/* Left */}
                    <div>
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                            Now available · Agent Kit
                        </div>

                        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl leading-tight">
                            Deploy agents.
                            <br />
                            <span className="text-amber-400">Ship faster.</span>
                        </h2>

                        <p className="mt-6 text-stone-400 leading-relaxed max-w-lg">
                            Agent Kit is a ready-to-use platform to deploy multiple AI agents — with knowledge bases, dynamic behavior,
                            multi-provider support, and WhatsApp out of the box. No assembly required.
                        </p>

                        <ul className="mt-8 space-y-3">
                            {features.map((f) => (
                                <li key={f} className="flex items-start gap-3 text-sm text-stone-300">
                                    <span className="mt-1 h-4 w-4 shrink-0 rounded-full bg-amber-500/20 flex items-center justify-center">
                                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                                    </span>
                                    {f}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-10 flex flex-wrap gap-3">
                            <a
                                href={AGENT_APP}
                                className="inline-flex h-12 items-center gap-2 rounded-xl bg-amber-500 px-6 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-400 active:scale-95"
                            >
                                Start with Agent Kit <IconArrow />
                            </a>
                            <a
                                href={WHATSAPP}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-12 items-center gap-2 rounded-xl border border-stone-700 px-6 text-sm font-semibold text-stone-300 transition-all hover:border-stone-500 hover:text-white active:scale-95"
                            >
                                Have questions?
                            </a>
                        </div>
                    </div>

                    {/* Right — pitch card */}
                    <div className="rounded-3xl border border-stone-700 bg-stone-800/60 p-8">
                        <p className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-6">What you get</p>

                        <div className="space-y-6">
                            {[
                                {
                                    before: "Months building agent infrastructure from scratch",
                                    after: "Platform ready to deploy on day one",
                                },
                                {
                                    before: "Locked into one LLM provider",
                                    after: "Switch between OpenAI, Anthropic, Groq and more",
                                },
                                {
                                    before: "Agents with no memory or context",
                                    after: "Knowledge bases trained on your own data",
                                },
                            ].map((row, i) => (
                                <div key={i} className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
                                    <p className="text-xs text-stone-500 leading-relaxed">{row.before}</p>
                                    <span className="text-stone-600 font-bold text-lg">→</span>
                                    <p className="text-xs text-stone-300 leading-relaxed font-medium">{row.after}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 border-t border-stone-700 pt-6">
                            <a
                                href={AGENT_APP}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-sm font-semibold text-white transition-all hover:bg-amber-400 active:scale-95"
                            >
                                See Agent Kit <IconArrow className="h-3.5 w-3.5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Nomad Game Teaser ─────────────────────────────────────────────────────────

const PREVIEW_MAP = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,7,7,7,7,1,1,1],
  [1,0,0,0,0,0,0,7,7,7,7,1,1,1],
  [1,0,8,8,0,4,4,4,4,0,0,0,0,1],
  [1,0,0,0,0,4,0,0,4,0,6,6,0,1],
  [1,1,0,0,4,4,4,4,4,0,6,6,0,1],
  [1,1,0,0,4,0,0,0,0,5,5,5,0,1],
  [1,1,1,0,0,0,0,0,0,5,5,5,0,1],
  [1,1,1,0,4,4,4,4,4,4,4,4,0,1],
  [1,1,1,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,2,2,2,2,2,2,2,2,2,2,2,1],
  [3,3,3,2,2,2,2,2,2,2,2,3,3,3],
];

const PREVIEW_COLORS: Record<number, string> = {
  0: "#3d7a4f", 1: "#2d5a27", 2: "#d4aa6a",
  3: "#2e6fad", 4: "#8b7355", 5: "#a0522d",
  6: "#708090", 7: "#1a1a2e", 8: "#4a8ab8",
};

function NomadGameTeaser() {
  return (
    <section className="relative bg-stone-950 px-6 py-24 overflow-hidden">
      <style>{`
        @keyframes scanMove { 0%{transform:translateY(-100%)} 100%{transform:translateY(200%)} }
        @keyframes pixelPulse { 0%,100%{opacity:.7} 50%{opacity:1} }
        @keyframes nomadBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        .nomad-bob { animation: nomadBob 1.2s ease-in-out infinite; display:inline-block; }
        .pixel-btn {
          position: relative;
          image-rendering: pixelated;
          transition: all 0.1s;
        }
        .pixel-btn:hover { transform: translateY(-2px); }
        .pixel-btn:active { transform: translateY(1px); }
      `}</style>

      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.025]">
        <div className="absolute inset-x-0 h-1 bg-white" style={{ animation: "scanMove 3s linear infinite" }} />
      </div>

      {/* Pixel grid bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-amber-500/6 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl">
        <div className="flex flex-col lg:flex-row lg:items-center gap-14">

          {/* ── Left: text ── */}
          <div className="flex-1">
            <div className="mb-5 inline-flex items-center gap-2 border border-amber-500/30 bg-amber-500/5 px-3 py-1.5">
              <span className="h-2 w-2 bg-amber-400 animate-pulse" />
              <span
                className="text-[9px] font-bold tracking-[0.2em] uppercase text-amber-400"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                Mini Game
              </span>
            </div>

            <h2
              className="text-4xl font-bold text-white leading-tight mb-6 sm:text-5xl"
              style={{ fontFamily: "'Press Start 2P', monospace", letterSpacing: "0.04em", lineHeight: 1.4 }}
            >
              <span className="text-amber-400">NOMAD</span>
              <br />
              <span className="text-stone-300 text-3xl sm:text-4xl">WORLD</span>
            </h2>

            <div className="mb-8 space-y-2 text-stone-400" style={{ fontFamily: "'Courier New', monospace", fontSize: 13 }}>
              <p><span className="text-amber-500">▶</span> Move your nomad with arrow keys</p>
              <p><span className="text-amber-500">▶</span> Explore 5 locations on the island</p>
              <p className="text-stone-500 pl-4 text-xs">
                Water Collection · Solar System ·<br />
                Ancestral House · Workshop · Beach
              </p>
              <p><span className="text-amber-500">▶</span> Collect all 15 Carb Claws <span className="text-lg">🦀</span></p>
            </div>

            <a
              href="/nomad-game"
              className="pixel-btn inline-flex items-center gap-3 bg-amber-500 px-6 py-3 text-stone-900 font-bold"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 10,
                boxShadow: "4px 4px 0px #8a6800, inset 0 1px 0 rgba(255,255,255,0.3)",
              }}
            >
              <span className="text-base">▶</span>
              PLAY NOW
            </a>
          </div>

          {/* ── Right: pixel art map preview ── */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Pixel border frame */}
              <div
                className="relative overflow-hidden"
                style={{
                  border: "4px solid #ffd700",
                  boxShadow: "0 0 0 4px #8a6800, 0 0 24px rgba(255,210,0,0.3), inset 0 0 30px rgba(0,0,0,0.5)",
                  imageRendering: "pixelated",
                }}
              >
                {/* Mini map grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(14, 20px)`,
                    gridTemplateRows: `repeat(12, 20px)`,
                    gap: 0,
                    imageRendering: "pixelated",
                  }}
                >
                  {PREVIEW_MAP.map((row, ri) =>
                    row.map((cell, ci) => (
                      <div
                        key={`${ri}-${ci}`}
                        style={{
                          width: 20,
                          height: 20,
                          background: PREVIEW_COLORS[cell] ?? "#3d7a4f",
                          outline: "1px solid rgba(0,0,0,0.12)",
                        }}
                      />
                    ))
                  )}
                </div>

                {/* Animated nomad character on map */}
                <div
                  className="absolute pointer-events-none"
                  style={{ left: 100, top: 95 }}
                >
                  <div className="nomad-bob text-lg leading-none">🧑‍🌾</div>
                </div>

                {/* CRT scanline effect */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.06]"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 4px)",
                  }}
                />
              </div>

              {/* Legend below map */}
              <div className="mt-3 flex flex-wrap gap-2 justify-center" style={{ fontFamily: "'Courier New', monospace", fontSize: 10 }}>
                {[
                  { color: "#4a8ab8", label: "💧 Water" },
                  { color: "#1a1a2e", label: "☀️ Solar" },
                  { color: "#a0522d", label: "🏠 House" },
                  { color: "#708090", label: "⚙️ Workshop" },
                  { color: "#d4aa6a", label: "🏖️ Beach" },
                ].map(({ color, label }) => (
                  <div key={label} className="flex items-center gap-1">
                    <div className="h-3 w-3 shrink-0" style={{ background: color, outline: "1px solid rgba(255,255,255,0.15)" }} />
                    <span className="text-stone-500">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Support Teaser ────────────────────────────────────────────────────────────

function SupportTeaser() {
    return (
        <section className="relative overflow-hidden bg-stone-950 px-6 py-36">
            {/* Ambient glows */}
            <div className="pointer-events-none absolute -top-48 right-0 h-[700px] w-[700px] rounded-full bg-rose-600/12 blur-[180px]" />
            <div className="pointer-events-none absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-amber-500/8 blur-[160px]" />
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[900px] w-[900px] rounded-full bg-rose-900/8 blur-[220px]" />

            {/* Subtle dot grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Grain */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                    backgroundSize: "180px",
                }}
            />

            <div className="relative mx-auto max-w-4xl text-center">
                {/* Badge */}
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
                    Support the work
                </div>

                {/* Headline */}
                <h2 className="font-display text-5xl font-bold text-white leading-tight sm:text-6xl lg:text-7xl">
                    If my work means
                    <br />
                    <span className="text-rose-400">something to you</span>
                </h2>

                <p className="mt-6 text-stone-400 leading-relaxed max-w-lg mx-auto text-base">
                    Every contribution goes directly into building Ancestralis House and keeping
                    this work alive — tools, writing, and presence.
                </p>

                {/* Cards */}
                <div className="mt-14 grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    <div className="group rounded-3xl border border-rose-500/20 bg-rose-500/5 p-8 text-left transition-all duration-300 hover:bg-rose-500/10 hover:border-rose-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-900/20">
                        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-500/15 text-xl">
                            ❤️
                        </div>
                        <h3 className="font-display text-lg font-bold text-white mb-2">Support directly</h3>
                        <p className="text-sm text-stone-400 leading-relaxed mb-7">
                            Contribute via Lemon Squeezy — any amount, whenever you feel it.
                        </p>
                        <a
                            href="/support"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-400 transition-colors hover:text-rose-300"
                        >
                            Support now <IconArrow className="h-3.5 w-3.5" />
                        </a>
                    </div>

                    <div className="group rounded-3xl border border-amber-500/20 bg-amber-500/5 p-8 text-left transition-all duration-300 hover:bg-amber-500/10 hover:border-amber-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-900/20">
                        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/15 text-xl">
                            🎁
                        </div>
                        <h3 className="font-display text-lg font-bold text-white mb-2">Gift from the wishlist</h3>
                        <p className="text-sm text-stone-400 leading-relaxed mb-7">
                            Help Ancestralis House move forward by gifting something from the list.
                        </p>
                        <a
                            href="/support#wishlist"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400 transition-colors hover:text-amber-300"
                        >
                            See wishlist <IconArrow className="h-3.5 w-3.5" />
                        </a>
                    </div>
                </div>

                {/* Bottom note */}
                <p className="mt-10 text-xs text-stone-700 tracking-wide">
                    No obligation &nbsp;·&nbsp; Every bit helps &nbsp;·&nbsp; Thank you
                </p>
            </div>
        </section>
    );
}

// ─── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
    return (
        <footer className="border-t border-stone-800 bg-stone-950 px-6 py-8">
            <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="font-display text-sm font-bold text-white">
                    et<span className="text-amber-500">.</span>
                </span>
                <p className="text-xs text-stone-500">© {new Date().getFullYear()} Esteban Toro</p>
                <div className="flex gap-4 text-xs text-stone-500">
                    <a href={AGENT_APP} className="hover:text-white transition-colors font-medium text-amber-500">Agent Kit</a>
                    <a href="/ancestralis" className="hover:text-white transition-colors font-medium text-emerald-500">Ancestralis</a>
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
                    <a href={EMAIL} className="hover:text-white transition-colors">Email</a>
                </div>
            </div>
        </footer>
    );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function EstebanToroSite() {
    return (
        <main className="min-h-screen antialiased">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,400&family=DM+Sans:wght@400;500;600&family=Press+Start+2P&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        body {
          font-family: 'DM Sans', system-ui, sans-serif;
          background-color: #0c0a09;
        }

        .font-display {
          font-family: 'Fraunces', Georgia, serif;
        }

        h1, h2, h3 {
          font-family: 'Fraunces', Georgia, serif;
        }

        html {
          scroll-behavior: smooth;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        section {
          animation: fadeUp 0.6s ease both;
        }

        @keyframes envParticle {
          0%,100% { transform: translateY(0) scale(1); opacity: .35; }
          50%      { transform: translateY(-14px) scale(1.15); opacity: .7; }
        }

        @keyframes statusBlink {
          0%,100% { opacity: 1; }
          50%      { opacity: .3; }
        }

        @keyframes dailiFloat {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-7px); }
        }
      `}</style>

            <Navbar />
            <Hero />
            <Pillars />
            <DailiSystemSection />
            <EnvironmentSection />
            <NomadGameTeaser />
            <SupportTeaser />
            <Footer />
        </main>
    );
}
