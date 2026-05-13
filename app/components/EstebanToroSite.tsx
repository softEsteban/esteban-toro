"use client";

import { useState, useEffect } from "react";

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
    { x: 12, y: 28, size: 4,  idx: 0, delay: 0   },
    { x: 35, y: 55, size: 6,  idx: 1, delay: 1.2 },
    { x: 60, y: 20, size: 3,  idx: 2, delay: 2.1 },
    { x: 78, y: 65, size: 5,  idx: 3, delay: 0.7 },
    { x: 88, y: 35, size: 4,  idx: 0, delay: 3.0 },
    { x: 22, y: 75, size: 3,  idx: 1, delay: 1.8 },
    { x: 50, y: 82, size: 6,  idx: 2, delay: 0.4 },
    { x: 70, y: 10, size: 3,  idx: 3, delay: 2.5 },
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
            href: "#builds",
            icon: <NavIconWrench />,
            hover: "hover:bg-white/10 hover:text-amber-300",
            mobileHover: "hover:bg-stone-800",
        },
        {
            label: "Products",
            href: "/products",
            icon: <NavIconGrid />,
            hover: "hover:bg-white/10 hover:text-stone-100",
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
            label: "Ancestralis",
            href: "/ancestralis",
            icon: <NavIconHome />,
            hover: "hover:bg-white/10 hover:text-emerald-300",
            mobileHover: "hover:bg-stone-800",
        },
    ];

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
                scrolled ? "bg-stone-950/95 backdrop-blur-md border-b border-stone-800/60 shadow-sm" : ""
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
                    <a
                        href={AGENT_APP}
                        className="ml-1 inline-flex items-center gap-1.5 rounded-lg border border-amber-500/35 bg-amber-500/10 px-3 py-1.5 text-sm font-semibold text-amber-400 transition-all duration-150 hover:bg-amber-500/18 hover:border-amber-500/60 hover:text-amber-300"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                        Agent Kit
                    </a>
                </div>

                <div className="hidden md:flex">
                    <a
                        href={AGENT_APP}
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 text-xs font-semibold text-white transition-all hover:bg-amber-400 active:scale-95"
                    >
                        Get started <IconArrow className="h-3 w-3" />
                    </a>
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

                        <div className="mt-9 flex flex-wrap gap-3">
                            <a
                                href={AGENT_APP}
                                className="inline-flex h-12 items-center gap-2 rounded-xl bg-amber-500 px-6 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-400 hover:shadow-xl active:scale-95"
                            >
                                Get Agent Kit <IconArrow />
                            </a>
                            <a
                                href={WHATSAPP}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-12 items-center gap-2 rounded-xl border border-stone-700 bg-stone-800 px-6 text-sm font-semibold text-stone-200 transition-all hover:bg-stone-700 hover:border-stone-600 active:scale-95"
                            >
                                Talk to me
                            </a>
                        </div>

                        <div className="mt-12 flex flex-wrap gap-3">
                            {[
                                { icon: "🧭", text: "Find your direction" },
                                { icon: "⚙️", text: "Build your system" },
                                { icon: "🤖", text: "Automate the rest" },
                            ].map((p) => (
                                <div
                                    key={p.text}
                                    className="flex items-center gap-2 rounded-full border border-stone-700 bg-stone-800/60 px-4 py-2 text-sm text-stone-400"
                                >
                                    <span>{p.icon}</span>
                                    {p.text}
                                </div>
                            ))}
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
        <section id="pillars" className="bg-stone-50 px-6 py-24">
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
        </section>
    );
}

// ─── Monetize Kit ──────────────────────────────────────────────────────────────

function AgentKitVisual() {
    const tools = [
        { label: "WhatsApp",      color: "border-amber-500/30 text-amber-400",  bg: "bg-amber-500/8"  },
        { label: "OpenAI",        color: "border-amber-500/25 text-amber-300",  bg: "bg-amber-500/5"  },
        { label: "Anthropic",     color: "border-amber-500/25 text-amber-300",  bg: "bg-amber-500/5"  },
        { label: "Knowledge Base",color: "border-amber-500/30 text-amber-400",  bg: "bg-amber-500/8"  },
        { label: "Groq",          color: "border-amber-500/20 text-stone-400",  bg: "bg-stone-800/60" },
        { label: "Webhooks",      color: "border-amber-500/20 text-stone-400",  bg: "bg-stone-800/60" },
        { label: "Multi-agent",   color: "border-amber-500/30 text-amber-400",  bg: "bg-amber-500/8"  },
        { label: "Dynamic tables",color: "border-amber-500/20 text-stone-400",  bg: "bg-stone-800/60" },
    ];
    return (
        <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-stone-950 border border-stone-800/80">
            <div className="absolute inset-0 opacity-[0.035]" style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
            }} />
            {/* Amber glow center */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-32 w-32 rounded-full bg-amber-500/8 blur-2xl" />
            </div>
            <div className="relative p-4 flex flex-col gap-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-600">Included tools</p>
                <div className="flex flex-wrap gap-2">
                    {tools.map((t) => (
                        <span key={t.label} className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-[11px] font-medium ${t.color} ${t.bg}`}>
                            {t.label}
                        </span>
                    ))}
                </div>
            </div>
            <div className="absolute bottom-0 inset-x-0 border-t border-stone-800/60 bg-stone-950/80 px-4 py-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                <span className="text-[10px] font-mono text-amber-600/80 tracking-wide">deploy-ready · multi-provider</span>
            </div>
        </div>
    );
}

const STEP_FLAGS = [
    { id: "doing",   dot: "bg-amber-400",  ring: "ring-amber-400/60",  label: "In progress" },
    { id: "done",    dot: "bg-sky-400",    ring: "ring-sky-400/60",    label: "Done"         },
    { id: "blocked", dot: "bg-rose-400",   ring: "ring-rose-400/60",   label: "Blocked"      },
];

function FlagIcon({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 12 14" className={`h-3 w-3 ${color}`} fill="currentColor">
            <path d="M1 1v12M1 1h8l-2 3.5L9 8H1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

function GuidelinesVisual() {
    const steps = [
        "Set your agent's role & context",
        "Configure CLAUDE.md base template",
        "Wire tools, memory & behavior",
        "Ship your first custom agent",
    ];

    const [flags, setFlags] = useState<(string | null)[]>([null, null, null, null]);

    const toggle = (stepIdx: number, flagId: string) => {
        setFlags(prev => prev.map((f, i) => i === stepIdx ? (f === flagId ? null : flagId) : f));
    };

    return (
        <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-stone-950 border border-stone-800/80">
            <div className="absolute inset-0 opacity-[0.035]" style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
            }} />
            <div className="absolute top-3 right-4 text-sky-400/20 text-4xl select-none pointer-events-none leading-none">✦</div>
            <div className="relative p-4 flex flex-col gap-2.5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-600">Guide steps</p>
                {steps.map((text, i) => {
                    const active = STEP_FLAGS.find(f => f.id === flags[i]);
                    return (
                        <div key={i} className="flex items-center gap-2.5">
                            {/* Active flag indicator */}
                            <span className={`shrink-0 h-1.5 w-1.5 rounded-full transition-colors duration-200 ${active ? active.dot : "bg-stone-700"}`} />
                            {/* Step text */}
                            <span className={`flex-1 text-[11px] font-mono truncate transition-colors duration-200 ${
                                active?.id === "done"    ? "text-sky-400/80" :
                                active?.id === "doing"   ? "text-amber-400/80" :
                                active?.id === "blocked" ? "text-rose-400/60 line-through" :
                                "text-stone-600"
                            }`}>{text}</span>
                            {/* Flag buttons */}
                            <div className="flex gap-1 shrink-0">
                                {STEP_FLAGS.map(flag => (
                                    <button
                                        key={flag.id}
                                        onClick={() => toggle(i, flag.id)}
                                        title={flag.label}
                                        className={`flex h-5 w-5 items-center justify-center rounded transition-all duration-150 ${
                                            flags[i] === flag.id
                                                ? `bg-stone-800 ring-1 ${flag.ring} scale-110`
                                                : "opacity-25 hover:opacity-60"
                                        }`}
                                    >
                                        <FlagIcon color={flags[i] === flag.id
                                            ? flag.id === "doing"   ? "text-amber-400"
                                            : flag.id === "done"    ? "text-sky-400"
                                            : "text-rose-400"
                                            : "text-stone-400"
                                        } />
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="absolute bottom-0 inset-x-0 border-t border-stone-800/60 bg-stone-950/80 px-4 py-2 flex items-center gap-2">
                <span className="text-sky-400/70 text-[11px] font-bold shrink-0">✦</span>
                <span className="text-[10px] font-mono text-sky-600/80 tracking-wide">prompt guide · from scratch</span>
            </div>
        </div>
    );
}


function MonetizeKit() {
    const items = [
        {
            number: "01",
            title: "Agent Kit",
            tagline: "Your AI infrastructure, live on day one.",
            desc: "Deploy specialized AI agents with knowledge bases, multi-provider LLM support, WhatsApp integration, and dynamic behavior — without months of setup.",
            color: "text-amber-400",
            bar: "bg-amber-500",
            visual: <AgentKitVisual />,
        },
        {
            number: "02",
            title: "Claude Code Guidelines",
            tagline: "From zero to your own agent setup.",
            desc: "A personal guide walking you through Claude Code prompts and the base CLAUDE.md template — so you can start building your agent from scratch, your way.",
            color: "text-sky-400",
            bar: "bg-sky-500",
            visual: <GuidelinesVisual />,
        },
    ];

    return (
        <section className="relative overflow-hidden bg-stone-950">
            {/* SVG wave transition from white Pillars section */}
            <svg
                className="block w-full"
                viewBox="0 0 1200 90"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: "block" }}
            >
                <defs>
                    <filter id="kit-wave-sketch" x="-5%" y="-5%" width="110%" height="110%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="9" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
                <rect x="-20" y="0" width="1240" height="35" fill="#fafaf9" />
                <path
                    d="M-20,0 L1220,0 L1220,48 C1000,82 800,22 600,60 C400,98 200,28 -20,65 Z"
                    fill="#fafaf9"
                    filter="url(#kit-wave-sketch)"
                />
            </svg>

            {/* Ambient glows */}
            <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[700px] w-[900px] rounded-full bg-amber-600/6 blur-[180px]" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-amber-900/10 blur-[120px]" />

            {/* Grain */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                    backgroundSize: "180px",
                }}
            />

            <div className="relative mx-auto max-w-5xl px-6 pb-28 pt-4">

                {/* Section label */}
                <div className="mb-10 text-center">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                        The Kit
                    </div>
                    <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        Monetize your time
                        <br />
                        <span className="text-amber-400">and knowledge.</span>
                    </h2>
                    <p className="mt-4 text-stone-400 max-w-md mx-auto leading-relaxed text-sm">
                        One subscription. Three tools that work together from day one.
                    </p>
                </div>

                {/* ── Pack container ── */}
                <div className="rounded-3xl border border-stone-700/70 bg-stone-900/60 overflow-hidden shadow-2xl shadow-black/40"
                    style={{ boxShadow: "0 0 0 1px rgba(245,158,11,0.08), 0 32px 80px rgba(0,0,0,0.5)" }}
                >
                    {/* Pack header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border-b border-stone-800 px-8 py-6"
                        style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.06) 0%, transparent 60%)" }}
                    >
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-1">Complete pack · 2 items</p>
                            <p className="font-display text-xl font-bold text-white">Monetize your time and knowledge kit</p>
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                            <div className="text-right">
                                <p className="font-display text-3xl font-bold text-white leading-none">$100</p>
                                <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-0.5">per month</p>
                            </div>
                            <a
                                href={AGENT_APP}
                                className="inline-flex h-11 items-center gap-2 rounded-xl bg-amber-500 px-5 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-400 active:scale-95 shrink-0"
                            >
                                Get the kit <IconArrow className="h-3.5 w-3.5" />
                            </a>
                        </div>
                    </div>

                    {/* Three cards */}
                    <div className="divide-y divide-stone-800 lg:divide-y-0 lg:grid lg:grid-cols-2 lg:divide-x lg:divide-stone-800">
                        {items.map((item) => (
                            <div key={item.number} className="group relative flex flex-col gap-5 p-7 transition-colors duration-200 hover:bg-stone-800/25">
                                {/* Top accent bar */}
                                <div className={`absolute inset-x-0 top-0 h-[2px] ${item.bar} opacity-0 group-hover:opacity-70 transition-opacity duration-300`} />

                                {/* Visual preview */}
                                {item.visual}

                                {/* Text */}
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-baseline gap-2.5">
                                        <span className="font-display text-3xl font-bold text-stone-800 leading-none select-none">{item.number}</span>
                                        <h3 className={`font-display text-base font-bold ${item.color}`}>{item.title}</h3>
                                    </div>
                                    <p className="text-xs font-semibold italic text-stone-500">{item.tagline}</p>
                                    <p className="text-sm leading-relaxed text-stone-400">{item.desc}</p>
                                </div>

                                {/* Included pill */}
                                <div className="mt-auto pt-1">
                                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-stone-600">
                                        <svg className="h-3 w-3 text-amber-500" viewBox="0 0 12 12" fill="none">
                                            <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        Included in pack
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom note */}
                <p className="mt-8 text-center text-xs text-stone-600 tracking-wide">
                    Cancel anytime &nbsp;·&nbsp; No lock-in &nbsp;·&nbsp; Spots limited each month
                </p>
            </div>
        </section>
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
            className="rounded-2xl p-8 relative overflow-hidden"
            style={{
                background: `linear-gradient(135deg, ${env.grad[0]} 0%, ${env.grad[1]} 50%, ${env.grad[2]} 100%)`,
                border: `1px solid ${env.accent}28`,
                transition: "border-color 0.5s ease",
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

            {/* Mode buttons */}
            <div className="relative flex flex-wrap gap-2 mb-6">
                {(["island", "builder", "reflect"] as const).map(k => (
                    <button
                        key={k}
                        onClick={() => setMode(k)}
                        className="px-4 py-1.5 rounded-full text-xs font-medium"
                        style={{
                            background: mode === k ? env.accent : "rgba(255,255,255,0.4)",
                            color: mode === k ? "white" : env.text,
                            border: `1px solid ${mode === k ? "transparent" : env.accent + "30"}`,
                            transition: "all 0.35s ease",
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
    );
}

// ─── Environment Section ───────────────────────────────────────────────────────

function EnvironmentSection() {
    const [envMode, setEnvMode] = useState<"island" | "builder" | "reflect">("island");
    const env = ENV[envMode];

    return (
        <section
            className="relative overflow-hidden py-28 px-6"
            style={{
                background: `linear-gradient(160deg, ${env.grad[0]} 0%, ${env.grad[1]} 55%, ${env.grad[2]} 100%)`,
            }}
        >
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

            <div className="relative mx-auto max-w-3xl">
                <div className="mb-14 text-center">
                    <p
                        className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em]"
                        style={{ color: env.text, opacity: 0.55 }}
                    >
                        Environment
                    </p>
                    <h2
                        className="font-display text-4xl font-bold sm:text-5xl"
                        style={{ color: env.text }}
                    >
                        Same person.
                        <br />
                        Different energy.
                    </h2>
                    <p
                        className="mt-4 text-sm leading-relaxed max-w-sm mx-auto"
                        style={{ color: env.text, opacity: 0.6 }}
                    >
                        Context changes everything. Island, terminal, or notebook — each mode unlocks something different.
                    </p>
                </div>

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

// ─── Ancestralis Teaser ────────────────────────────────────────────────────────

const JUNGLE_FIREFLIES = [
    { x: 17, y: 55, dur: 3.2, delay: 0    },
    { x: 27, y: 42, dur: 4.1, delay: 0.8  },
    { x: 73, y: 52, dur: 3.7, delay: 1.5  },
    { x: 81, y: 38, dur: 5.0, delay: 0.3  },
    { x: 38, y: 68, dur: 4.5, delay: 2.1  },
    { x: 62, y: 63, dur: 3.3, delay: 1.0  },
    { x: 47, y: 28, dur: 6.0, delay: 2.8  },
    { x: 89, y: 66, dur: 4.8, delay: 0.5  },
    { x: 9,  y: 72, dur: 3.9, delay: 1.7  },
    { x: 56, y: 48, dur: 5.2, delay: 3.2  },
    { x: 43, y: 80, dur: 4.0, delay: 0.9  },
    { x: 66, y: 34, dur: 5.5, delay: 2.4  },
    { x: 32, y: 76, dur: 3.6, delay: 1.2  },
    { x: 74, y: 79, dur: 4.4, delay: 3.5  },
];

const JUNGLE_STARS = [
    { cx: 118, cy: 38, r: 1.2, d: 0    },
    { cx: 198, cy: 24, r: 0.8, d: 0.5  },
    { cx: 318, cy: 58, r: 1.0, d: 1.0  },
    { cx: 378, cy: 28, r: 0.6, d: 1.5  },
    { cx: 458, cy: 14, r: 1.1, d: 2.0  },
    { cx: 528, cy: 43, r: 0.7, d: 0.3  },
    { cx: 608, cy: 18, r: 1.0, d: 0.8  },
    { cx: 698, cy: 52, r: 0.8, d: 1.3  },
    { cx: 758, cy: 28, r: 1.3, d: 1.8  },
    { cx: 828, cy: 13, r: 0.9, d: 0.6  },
    { cx: 868, cy: 43, r: 0.6, d: 2.2  },
    { cx: 52,  cy: 63, r: 0.8, d: 1.1  },
    { cx: 152, cy: 83, r: 0.7, d: 2.5  },
    { cx: 238, cy: 68, r: 1.0, d: 0.4  },
    { cx: 648, cy: 78, r: 0.9, d: 1.9  },
    { cx: 788, cy: 68, r: 0.7, d: 0.7  },
    { cx: 420, cy: 35, r: 0.8, d: 2.7  },
    { cx: 560, cy: 65, r: 0.6, d: 1.4  },
];

const JUNGLE_GRASS: [number, number, number, number, number][] = [
    [162, 395, 155, 342, 4], [178, 395, 185, 335, 3  ],
    [192, 395, 188, 350, 3], [148, 395, 140, 360, 2.5],
    [720, 395, 726, 345, 4], [736, 395, 730, 338, 3  ],
    [752, 395, 756, 352, 3], [765, 395, 770, 362, 2.5],
    [305, 395, 300, 365, 2], [318, 395, 322, 358, 2  ],
    [580, 395, 576, 368, 2], [595, 395, 599, 360, 2  ],
];

function AncestralısTeaser() {
    return (
        <section
            className="relative overflow-hidden"
            style={{ background: "#020805", minHeight: "92vh" }}
        >
            <style>{`
                @keyframes fireflyGlow {
                    0%, 100% { opacity: 0; transform: scale(0.6); }
                    40%, 60% { opacity: 1; transform: scale(1.5); }
                }
                @keyframes winFlicker {
                    0%, 100% { opacity: 0.88; }
                    45%      { opacity: 1; }
                    50%      { opacity: 0.9; }
                    55%      { opacity: 1; }
                }
                @keyframes jungleStar {
                    0%, 100% { opacity: 0.35; }
                    50%      { opacity: 1; }
                }
                @keyframes houseBreath {
                    0%, 100% { opacity: 0.35; }
                    50%      { opacity: 0.55; }
                }
                @keyframes jungleMist {
                    0%, 100% { opacity: 0.6; transform: translateX(0); }
                    50%      { opacity: 0.75; transform: translateX(14px); }
                }
            `}</style>

            {/* ── Scene SVG ── */}
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 900 520"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="jSky" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#030e07"/>
                        <stop offset="100%" stopColor="#010604"/>
                    </linearGradient>
                    <radialGradient id="jHouseAura" cx="50%" cy="50%" r="50%">
                        <stop offset="0%"   stopColor="#f59e0b" stopOpacity="0.55"/>
                        <stop offset="45%"  stopColor="#92400e" stopOpacity="0.18"/>
                        <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
                    </radialGradient>
                    <radialGradient id="jMoon" cx="38%" cy="35%" r="60%">
                        <stop offset="0%"   stopColor="#fefce8"/>
                        <stop offset="100%" stopColor="#fef3c7"/>
                    </radialGradient>
                    <filter id="jWinGlow" x="-80%" y="-80%" width="260%" height="260%">
                        <feGaussianBlur stdDeviation="5" result="blur"/>
                        <feMerge>
                            <feMergeNode in="blur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                    <filter id="jSoftGlow" x="-40%" y="-40%" width="180%" height="180%">
                        <feGaussianBlur stdDeviation="3" result="blur"/>
                        <feMerge>
                            <feMergeNode in="blur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                {/* Sky */}
                <rect width="900" height="520" fill="url(#jSky)"/>

                {/* Moon */}
                <circle cx="738" cy="68" r="25" fill="url(#jMoon)" opacity="0.72"/>
                <circle cx="738" cy="68" r="46" fill="#fefce8" opacity="0.05"/>
                <circle cx="738" cy="68" r="72" fill="#fefce8" opacity="0.022"/>

                {/* Stars */}
                {JUNGLE_STARS.map((s, i) => (
                    <circle
                        key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white"
                        style={{ animation: `jungleStar ${2.6 + i * 0.35}s ease-in-out ${s.d}s infinite` }}
                    />
                ))}

                {/* Wide house aura — the glow that fills the scene */}
                <ellipse
                    cx="450" cy="312" rx="235" ry="155"
                    fill="url(#jHouseAura)"
                    style={{ animation: "houseBreath 5.5s ease-in-out infinite" }}
                />

                {/* ── Far background tree silhouettes ── */}
                <path d="M260 442 L262 345 L255 345 L262 312 L269 345 L262 345" fill="#050f07" opacity="0.65"/>
                <path d="M640 442 L638 355 L631 355 L638 320 L645 355 L638 355" fill="#050f07" opacity="0.65"/>
                <path d="M356 442 L357 368 L350 368 L357 340 L363 368 L357 368" fill="#060f08" opacity="0.5"/>
                <path d="M546 442 L545 360 L538 360 L545 332 L552 360 L545 360" fill="#060f08" opacity="0.5"/>

                {/* ════ LEFT PALMS ════ */}

                {/* L-Palm 1 — tallest, anchored far left */}
                <path d="M 82 522 C 76 418, 72 302, 98 90"
                    stroke="#0a1d0d" strokeWidth="17" fill="none" strokeLinecap="round"/>
                <path d="M98 90 C 66 72, 30 58, -4 44"   stroke="#0d2612" strokeWidth="7" fill="none" strokeLinecap="round"/>
                <path d="M98 90 C 78 76, 50 78, 26 93"   stroke="#0d2612" strokeWidth="6" fill="none" strokeLinecap="round"/>
                <path d="M98 90 C 120 72, 156 57, 192 43" stroke="#0d2612" strokeWidth="7" fill="none" strokeLinecap="round"/>
                <path d="M98 90 C 126 76, 156 78, 178 94" stroke="#0d2612" strokeWidth="5" fill="none" strokeLinecap="round"/>
                <path d="M98 90 C 91 67, 87 44, 84 24"   stroke="#0d2612" strokeWidth="5" fill="none" strokeLinecap="round"/>
                <path d="M98 90 C 108 70, 118 50, 124 32" stroke="#0d2612" strokeWidth="4" fill="none" strokeLinecap="round"/>

                {/* L-Palm 2 — medium, set back slightly */}
                <path d="M 205 522 C 196 434, 182 352, 204 162"
                    stroke="#091b0c" strokeWidth="13" fill="none" strokeLinecap="round"/>
                <path d="M204 162 C 176 144, 142 134, 108 125" stroke="#0b2010" strokeWidth="6" fill="none" strokeLinecap="round"/>
                <path d="M204 162 C 186 150, 163 154, 142 168" stroke="#0b2010" strokeWidth="5" fill="none" strokeLinecap="round"/>
                <path d="M204 162 C 228 142, 262 129, 296 118" stroke="#0b2010" strokeWidth="6" fill="none" strokeLinecap="round"/>
                <path d="M204 162 C 218 148, 232 142, 246 148" stroke="#0b2010" strokeWidth="4" fill="none" strokeLinecap="round"/>
                <path d="M204 162 C 196 140, 190 116, 186 98" stroke="#0b2010" strokeWidth="4" fill="none" strokeLinecap="round"/>

                {/* L-Palm 3 — shorter, hugging left edge */}
                <path d="M 34 522 C 31 456, 36 384, 60 212"
                    stroke="#091b0c" strokeWidth="11" fill="none" strokeLinecap="round"/>
                <path d="M60 212 C 38 195, 10 190, -18 188" stroke="#0b2010" strokeWidth="5" fill="none" strokeLinecap="round"/>
                <path d="M60 212 C 84 193, 110 186, 136 190" stroke="#0b2010" strokeWidth="5" fill="none" strokeLinecap="round"/>
                <path d="M60 212 C 53 189, 46 166, 42 148"  stroke="#0b2010" strokeWidth="4" fill="none" strokeLinecap="round"/>
                <path d="M60 212 C 70 190, 78 168, 84 150"  stroke="#0b2010" strokeWidth="4" fill="none" strokeLinecap="round"/>

                {/* ════ RIGHT PALMS (mirror) ════ */}

                {/* R-Palm 1 — tallest */}
                <path d="M 818 522 C 824 418, 828 302, 802 90"
                    stroke="#0a1d0d" strokeWidth="17" fill="none" strokeLinecap="round"/>
                <path d="M802 90 C 834 72, 870 58, 904 44"   stroke="#0d2612" strokeWidth="7" fill="none" strokeLinecap="round"/>
                <path d="M802 90 C 822 76, 850 78, 874 93"   stroke="#0d2612" strokeWidth="6" fill="none" strokeLinecap="round"/>
                <path d="M802 90 C 780 72, 744 57, 708 43"   stroke="#0d2612" strokeWidth="7" fill="none" strokeLinecap="round"/>
                <path d="M802 90 C 774 76, 744 78, 722 94"   stroke="#0d2612" strokeWidth="5" fill="none" strokeLinecap="round"/>
                <path d="M802 90 C 809 67, 813 44, 816 24"   stroke="#0d2612" strokeWidth="5" fill="none" strokeLinecap="round"/>
                <path d="M802 90 C 792 70, 782 50, 776 32"   stroke="#0d2612" strokeWidth="4" fill="none" strokeLinecap="round"/>

                {/* R-Palm 2 — medium */}
                <path d="M 695 522 C 704 434, 718 352, 696 162"
                    stroke="#091b0c" strokeWidth="13" fill="none" strokeLinecap="round"/>
                <path d="M696 162 C 724 144, 758 134, 792 125" stroke="#0b2010" strokeWidth="6" fill="none" strokeLinecap="round"/>
                <path d="M696 162 C 714 150, 737 154, 758 168" stroke="#0b2010" strokeWidth="5" fill="none" strokeLinecap="round"/>
                <path d="M696 162 C 672 142, 638 129, 604 118" stroke="#0b2010" strokeWidth="6" fill="none" strokeLinecap="round"/>
                <path d="M696 162 C 682 148, 668 142, 654 148" stroke="#0b2010" strokeWidth="4" fill="none" strokeLinecap="round"/>
                <path d="M696 162 C 704 140, 710 116, 714 98" stroke="#0b2010" strokeWidth="4" fill="none" strokeLinecap="round"/>

                {/* R-Palm 3 — shorter, right edge */}
                <path d="M 866 522 C 869 456, 864 384, 840 212"
                    stroke="#091b0c" strokeWidth="11" fill="none" strokeLinecap="round"/>
                <path d="M840 212 C 862 195, 890 190, 918 188" stroke="#0b2010" strokeWidth="5" fill="none" strokeLinecap="round"/>
                <path d="M840 212 C 816 193, 790 186, 764 190" stroke="#0b2010" strokeWidth="5" fill="none" strokeLinecap="round"/>
                <path d="M840 212 C 847 189, 854 166, 858 148" stroke="#0b2010" strokeWidth="4" fill="none" strokeLinecap="round"/>
                <path d="M840 212 C 830 190, 822 168, 816 150" stroke="#0b2010" strokeWidth="4" fill="none" strokeLinecap="round"/>

                {/* ════ HOUSE ════ */}

                {/* Ground glow beneath door */}
                <ellipse cx="450" cy="400" rx="112" ry="17" fill="#f59e0b" opacity="0.07"/>

                {/* Chimney */}
                <rect x="500" y="220" width="20" height="50" rx="2" fill="#0d2212"/>

                {/* Roof */}
                <polygon points="362,288 450,214 538,288" fill="#0e2312"/>
                <line x1="362" y1="288" x2="538" y2="288" stroke="#0a1a09" strokeWidth="2"/>

                {/* House body */}
                <rect x="374" y="288" width="152" height="112" rx="1" fill="#0c1f10"/>

                {/* Door (warm amber glow) */}
                <rect x="432" y="338" width="36" height="62" rx="4"
                    fill="#92400e" opacity="0.65" filter="url(#jSoftGlow)"/>
                <ellipse cx="450" cy="401" rx="22" ry="8" fill="#f59e0b" opacity="0.13"/>

                {/* Left window */}
                <rect x="386" y="303" width="34" height="26" rx="3"
                    fill="#fbbf24"
                    filter="url(#jWinGlow)"
                    style={{ animation: "winFlicker 5s ease-in-out infinite" }}
                />
                <line x1="403" y1="303" x2="403" y2="329" stroke="#92400e" strokeWidth="1" opacity="0.45"/>
                <line x1="386" y1="316" x2="420" y2="316" stroke="#92400e" strokeWidth="1" opacity="0.45"/>

                {/* Right window */}
                <rect x="480" y="303" width="34" height="26" rx="3"
                    fill="#fbbf24"
                    filter="url(#jWinGlow)"
                    style={{ animation: "winFlicker 5s ease-in-out 1.8s infinite" }}
                />
                <line x1="497" y1="303" x2="497" y2="329" stroke="#92400e" strokeWidth="1" opacity="0.45"/>
                <line x1="480" y1="316" x2="514" y2="316" stroke="#92400e" strokeWidth="1" opacity="0.45"/>

                {/* ════ GROUND & FOREGROUND ════ */}

                {/* Ground fill */}
                <rect x="0" y="400" width="900" height="120" fill="#010604"/>

                {/* Tropical leaf clusters — LEFT */}
                <path d="M 0 432 C 82 380, 168 394, 204 448 C 142 422, 56 434, 0 432 Z"  fill="#071209" opacity="0.95"/>
                <path d="M 0 464 C 98 404, 190 418, 230 472 C 158 444, 64 456, 0 464 Z"  fill="#071209" opacity="0.9"/>
                <path d="M 0 496 C 114 436, 206 450, 256 504 C 170 470, 70 484, 0 496 Z" fill="#060f08" opacity="0.95"/>
                <path d="M 0 440 C 74 394, 152 404, 190 442" stroke="#0a1d0c" strokeWidth="1.5" fill="none" opacity="0.6"/>
                <path d="M 0 470 C 90 420, 174 430, 214 466" stroke="#0a1d0c" strokeWidth="1.5" fill="none" opacity="0.6"/>

                {/* Tropical leaf clusters — RIGHT */}
                <path d="M 900 432 C 818 380, 732 394, 696 448 C 758 422, 844 434, 900 432 Z"  fill="#071209" opacity="0.95"/>
                <path d="M 900 464 C 802 404, 710 418, 670 472 C 742 444, 836 456, 900 464 Z"  fill="#071209" opacity="0.9"/>
                <path d="M 900 496 C 786 436, 694 450, 644 504 C 730 470, 830 484, 900 496 Z" fill="#060f08" opacity="0.95"/>
                <path d="M 900 440 C 826 394, 748 404, 710 442" stroke="#0a1d0c" strokeWidth="1.5" fill="none" opacity="0.6"/>
                <path d="M 900 470 C 810 420, 726 430, 686 466" stroke="#0a1d0c" strokeWidth="1.5" fill="none" opacity="0.6"/>

                {/* Reed / grass blades */}
                {JUNGLE_GRASS.map(([x1, y1, x2, y2, w], i) => (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke="#0c2010" strokeWidth={w} strokeLinecap="round"/>
                ))}

                {/* Ground mist layers */}
                <rect x="0" y="380" width="900" height="58" fill="#030e06" opacity="0.6"
                    style={{ animation: "jungleMist 9s ease-in-out infinite" }}/>
                <rect x="0" y="392" width="900" height="36" fill="#020b04" opacity="0.72"
                    style={{ animation: "jungleMist 13s ease-in-out 3.5s infinite" }}/>
            </svg>

            {/* ── Fireflies ── */}
            {JUNGLE_FIREFLIES.map((f, i) => (
                <div
                    key={i}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        left: `${f.x}%`,
                        top: `${f.y}%`,
                        width: 5,
                        height: 5,
                        background: "#a3e635",
                        boxShadow: "0 0 8px 3px #84cc16",
                        animation: `fireflyGlow ${f.dur}s ease-in-out ${f.delay}s infinite`,
                    }}
                />
            ))}

            {/* ── Readability gradient ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "linear-gradient(to top, rgba(1,6,3,0.97) 0%, rgba(1,6,3,0.7) 28%, rgba(1,6,3,0.12) 58%, transparent 80%)",
                }}
            />

            {/* ── Content ── */}
            <div className="relative flex flex-col justify-end px-6 pb-16 pt-40" style={{ minHeight: "92vh" }}>
                <div className="mx-auto max-w-5xl w-full">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        In progress · Isla Fuerte, Colombia
                    </div>

                    <h2 className="font-display text-5xl font-bold text-white mb-5 leading-tight sm:text-6xl lg:text-7xl">
                        Ancestralis House
                    </h2>

                    <p className="text-stone-300 leading-relaxed mb-8 max-w-lg text-base">
                        A light in the jungle — where builders, thinkers, and wanderers come to rest,
                        create, and share surrounded by sea, real food, and people who get it.
                    </p>

                    {/* Activity tags */}
                    <div className="flex flex-wrap gap-2 mb-10">
                        {[
                            { icon: "🌿", label: "rest"  },
                            { icon: "💻", label: "work"  },
                            { icon: "✍️", label: "write" },
                            { icon: "🎵", label: "sing"  },
                            { icon: "🍳", label: "cook"  },
                            { icon: "🌊", label: "swim"  },
                            { icon: "🤝", label: "share" },
                            { icon: "🍹", label: "drink" },
                        ].map((tag) => (
                            <span
                                key={tag.label}
                                className="flex items-center gap-1.5 rounded-full border border-emerald-800/50 bg-emerald-950/60 px-3 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-sm"
                            >
                                <span>{tag.icon}</span>
                                {tag.label}
                            </span>
                        ))}
                    </div>

                    <a
                        href="/ancestralis"
                        className="inline-flex h-12 items-center gap-2 rounded-xl bg-emerald-600 px-7 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-500 hover:shadow-emerald-500/30 active:scale-95"
                    >
                        Discover Ancestralis <IconArrow />
                    </a>
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
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,400&family=DM+Sans:wght@400;500;600&display=swap');

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
      `}</style>

            <Navbar />
            <Hero />
            <Pillars />
            <MonetizeKit />
            <EnvironmentSection />
            <AncestralısTeaser />
            <SupportTeaser />
            <Footer />
        </main>
    );
}
