"use client";

import { useState, useEffect } from "react";

const AGENT_APP = "/agent-app";
const WHATSAPP = "https://wa.me/573045500182?text=Hola%20Esteban%2C%20quiero%20hablar%20sobre%20un%20proyecto";
const EMAIL = "mailto:hola@estebantoro.dev";

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
        { label: "How I think", href: "#pillars" },
        { label: "What I build", href: "#builds" },
        { label: "Products", href: "/products" },
        { label: "Ancestralis", href: "/ancestralis" },
        { label: "Agent Kit", href: AGENT_APP },
    ];

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#faf9f7]/90 backdrop-blur-md border-b border-stone-200/60 shadow-sm" : ""
                }`}
        >
            <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
                <a href="#" className="font-display text-base font-bold tracking-tight text-stone-900">
                    et<span className="text-amber-500">.</span>
                </a>

                <div className="hidden items-center gap-6 md:flex">
                    {links.map((l) => (
                        <a key={l.href} href={l.href} className="text-sm text-stone-500 transition-colors hover:text-stone-900">
                            {l.label}
                        </a>
                    ))}
                </div>

                <div className="hidden md:flex">
                    <a
                        href={AGENT_APP}
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 text-xs font-semibold text-white transition-all hover:bg-amber-400 active:scale-95"
                    >
                        Get Agent Kit <IconArrow className="h-3 w-3" />
                    </a>
                </div>

                <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-1.5 p-1 md:hidden">
                    <span className={`block h-0.5 w-5 bg-stone-700 transition-all ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
                    <span className={`block h-0.5 w-5 bg-stone-700 transition-all ${menuOpen ? "opacity-0" : ""}`} />
                    <span className={`block h-0.5 w-5 bg-stone-700 transition-all ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
                </button>
            </nav>

            {menuOpen && (
                <div className="border-t border-stone-100 bg-[#faf9f7] px-6 pb-5 pt-4 md:hidden">
                    {links.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            onClick={() => setMenuOpen(false)}
                            className="block py-2.5 text-sm text-stone-600 hover:text-stone-900"
                        >
                            {l.label}
                        </a>
                    ))}
                    <a
                        href={AGENT_APP}
                        className="mt-3 flex h-9 w-full items-center justify-center rounded-lg bg-amber-500 text-xs font-semibold text-white"
                    >
                        Get Agent Kit
                    </a>
                </div>
            )}
        </header>
    );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-[#faf9f7] px-6 pt-32 pb-24 flex items-center">
            {/* Grain */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                    backgroundSize: "180px",
                }}
            />
            <div className="pointer-events-none absolute right-0 top-0 h-[700px] w-[700px] -translate-y-1/4 translate-x-1/4 rounded-full bg-amber-100/70 blur-[140px]" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] translate-y-1/4 -translate-x-1/4 rounded-full bg-stone-200/80 blur-[100px]" />

            <div className="relative mx-auto max-w-5xl w-full">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-stone-500 shadow-sm">
                    <Dot color="bg-amber-400" />
                    Philosophy · Software · Strategy
                </div>

                <h1 className="font-display text-[clamp(3rem,7vw,5.5rem)] font-bold leading-[1.0] tracking-tight text-stone-900 max-w-3xl">
                    Most people have goals.
                    <br />
                    <span className="text-stone-400">Few have systems.</span>
                </h1>

                <p className="mt-8 max-w-xl text-[1.1rem] leading-relaxed text-stone-500">
                    I help you find your purpose, design your architecture, and build the tools to make it all work —
                    combining{" "}
                    <span className="font-semibold text-stone-700">philosophical clarity</span>,{" "}
                    <span className="font-semibold text-stone-700">software craft</span>, and{" "}
                    <span className="font-semibold text-stone-700">strategic execution</span>.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
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
                        className="inline-flex h-12 items-center gap-2 rounded-xl border border-stone-200 bg-white px-6 text-sm font-semibold text-stone-700 shadow-sm transition-all hover:bg-stone-50 hover:border-stone-300 active:scale-95"
                    >
                        Talk to me
                    </a>
                </div>

                {/* Three quick pills */}
                <div className="mt-16 flex flex-wrap gap-3">
                    {[
                        { icon: "🧭", text: "Find your direction" },
                        { icon: "⚙️", text: "Build your system" },
                        { icon: "🤖", text: "Automate the rest" },
                    ].map((p) => (
                        <div
                            key={p.text}
                            className="flex items-center gap-2 rounded-full border border-stone-200 bg-white/80 px-4 py-2 text-sm text-stone-600 shadow-sm"
                        >
                            <span>{p.icon}</span>
                            {p.text}
                        </div>
                    ))}
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
            accent: "bg-blue-50 border-blue-100",
            numberColor: "text-blue-200",
        },
        {
            number: "02",
            icon: "⚙️",
            title: "Build deliberately",
            subtitle: "Software",
            desc: "Ideas need infrastructure. I design and build the tools, agents, and automations that turn your clarity into working systems — not just plans that live in a notebook, but products that ship and run.",
            accent: "bg-amber-50 border-amber-100",
            numberColor: "text-amber-200",
        },
        {
            number: "03",
            icon: "🎯",
            title: "Execute strategically",
            subtitle: "Strategy",
            desc: "Clarity and tools mean nothing without a game plan. I help you design the roadmap — what to do, in what order, with what resources — so momentum compounds instead of scattering.",
            accent: "bg-emerald-50 border-emerald-100",
            numberColor: "text-emerald-200",
        },
    ];

    return (
        <section id="pillars" className="bg-white px-6 py-24">
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
                            className={`group relative overflow-hidden rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${p.accent}`}
                        >
                            <p className={`font-display text-7xl font-bold absolute right-5 top-3 select-none ${p.numberColor}`}>
                                {p.number}
                            </p>
                            <span className="mb-5 block text-3xl">{p.icon}</span>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">{p.subtitle}</p>
                            <h3 className="font-display text-2xl font-bold text-stone-900 mb-3">{p.title}</h3>
                            <p className="text-sm leading-relaxed text-stone-500">{p.desc}</p>
                        </div>
                    ))}
                </div>
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
        <section id="builds" className="bg-[#faf9f7] px-6 py-24">
            <div className="mx-auto max-w-5xl">
                <div className="mb-14">
                    <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-stone-400">
                        <Dot color="bg-amber-400" /> What I build
                    </p>
                    <h2 className="font-display text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
                        Tools that make
                        <br />
                        the system real.
                    </h2>
                    <p className="mt-4 max-w-xl text-base text-stone-500 leading-relaxed">
                        Strategy without execution is fiction. I build the tools that close the gap between knowing and doing.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    {items.map((item) => (
                        <div
                            key={item.title}
                            className="group flex gap-5 rounded-2xl border border-stone-200 bg-white p-6 transition-all duration-300 hover:shadow-md hover:border-stone-300 hover:-translate-y-0.5"
                        >
                            <span className="text-3xl shrink-0 mt-0.5">{item.emoji}</span>
                            <div>
                                <h3 className="font-display font-bold text-stone-900 mb-1.5">{item.title}</h3>
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

function AncestralısTeaser() {
    return (
        <section className="bg-white px-6 py-24 border-t border-stone-100">
            <div className="mx-auto max-w-5xl">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            In progress · Isla Fuerte, Colombia
                        </div>
                        <h2 className="font-display text-4xl font-bold tracking-tight text-stone-900 mb-4">
                            Ancestralis House
                        </h2>
                        <p className="text-stone-500 leading-relaxed mb-6">
                            A digital nomads village in Isla Fuerte — where builders and thinkers come to do their
                            best work surrounded by jungle, sea, real food, and people who get it.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-8">
                            {["🌿 Nature", "🍽️ Real food", "💻 Deep work", "🌊 Island life", "🤝 Community"].map((tag) => (
                                <span key={tag} className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <a
                            href="/ancestralis"
                            className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-500 hover:shadow-lg active:scale-95"
                        >
                            Discover Ancestralis <IconArrow />
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { icon: "🏝️", title: "No cars", desc: "Isla Fuerte has zero vehicles — only paths, sea, and silence." },
                            { icon: "🐠", title: "Coral reef", desc: "Crystal-clear Caribbean water at your door." },
                            { icon: "🌴", title: "Jungle trails", desc: "Forest walks that reset your nervous system." },
                            { icon: "🌅", title: "Slow rhythm", desc: "Real rest between deep work sessions." },
                        ].map((item) => (
                            <div key={item.title} className="rounded-2xl border border-stone-100 bg-[#faf9f7] p-5">
                                <span className="text-2xl">{item.icon}</span>
                                <h3 className="font-display font-bold text-stone-900 mt-3 mb-1 text-sm">{item.title}</h3>
                                <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Support Teaser ────────────────────────────────────────────────────────────

function SupportTeaser() {
    return (
        <section className="relative overflow-hidden bg-stone-950 px-6 py-20">
            {/* ambient glow */}
            <div className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-rose-600/20 blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-[350px] w-[350px] rounded-full bg-amber-500/10 blur-[100px]" />

            <div className="relative mx-auto max-w-5xl">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                    <div>
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
                            Support the work
                        </div>
                        <p className="font-display text-3xl font-bold text-white mb-3 leading-snug">
                            If my work means something to you
                        </p>
                        <p className="text-sm text-stone-400 max-w-md leading-relaxed">
                            Support directly via Lemon Squeezy, or gift an item from the wishlist that
                            helps Ancestralis House move forward.
                        </p>
                    </div>
                    <a
                        href="/support"
                        className="shrink-0 inline-flex h-12 items-center gap-2 rounded-xl bg-rose-500 px-7 text-sm font-semibold text-white shadow-lg shadow-rose-500/30 transition-all hover:bg-rose-400 hover:shadow-rose-400/40 active:scale-95"
                    >
                        Support & wishlist <IconArrow />
                    </a>
                </div>
            </div>
        </section>
    );
}

// ─── Contact strip ─────────────────────────────────────────────────────────────

function ContactStrip() {
    return (
        <section className="bg-stone-900 px-6 py-14 border-t border-stone-800">
            <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                    <p className="font-display text-xl font-bold text-white">Want something custom-built?</p>
                    <p className="text-sm text-stone-400 mt-1">I&apos;m available for strategic projects, AI builds, and consulting.</p>
                </div>
                <div className="flex gap-3 shrink-0">
                    <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 items-center gap-2 rounded-xl bg-amber-500 px-5 text-sm font-semibold text-white transition-all hover:bg-amber-400 active:scale-95"
                    >
                        Talk to me
                    </a>
                    <a
                        href={EMAIL}
                        className="inline-flex h-10 items-center gap-2 rounded-xl border border-stone-600 bg-stone-800 px-5 text-sm font-semibold text-stone-200 transition-all hover:bg-stone-700 active:scale-95"
                    >
                        Email
                    </a>
                </div>
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
          background-color: #faf9f7;
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
      `}</style>
{/* 
            <iframe
                src="http://localhost:3000/embed/7637098c-e0a6-4fc1-af1a-fe6d97610be3"
                width="400"
                height="600"
                style={{ border: 'none', borderRadius: '16px', boxShadow: '0 8px 40px rgba(0,0,0,0.2)' }}
                allow="clipboard-write"
            ></iframe> */}

            <Navbar />
            <Hero />
            <Pillars />
            <WhatIBuild />
            <AgentKitCTA />
            <AncestralısTeaser />
            <SupportTeaser />
            <ContactStrip />
            <Footer />
        </main>
    );
}
