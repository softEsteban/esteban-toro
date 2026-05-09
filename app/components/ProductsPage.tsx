"use client";

import { useState, useEffect } from "react";

const AGENT_APP = "/agent-app";
const DAILI_APP = "https://daili-app-nu.vercel.app";
const WHATSAPP = "https://wa.me/573045500182?text=Hola%20Esteban%2C%20quiero%20saber%20m%C3%A1s%20sobre%20los%20productos";

// ─── Atoms ─────────────────────────────────────────────────────────────────────

function IconArrow({ className = "h-4 w-4" }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
    );
}

function IconCheck({ className = "h-4 w-4" }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
    );
}

function Badge({ children, color = "amber" }: { children: React.ReactNode; color?: "amber" | "blue" | "emerald" }) {
    const colors = {
        amber: "border-amber-200 bg-amber-50 text-amber-700",
        blue: "border-blue-200 bg-blue-50 text-blue-700",
        emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
    };
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${colors[color]}`}>
            {children}
        </span>
    );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────

function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
                scrolled ? "bg-[#faf9f7]/90 backdrop-blur-md border-b border-stone-200/60 shadow-sm" : ""
            }`}
        >
            <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
                <a href="/" className="font-display text-base font-bold tracking-tight text-stone-900">
                    et<span className="text-amber-500">.</span>
                </a>
                <div className="hidden items-center gap-6 md:flex">
                    <a href="/" className="text-sm text-stone-500 transition-colors hover:text-stone-900">Home</a>
                    <a href="#daili" className="text-sm text-stone-500 transition-colors hover:text-stone-900">Daili App</a>
                    <a href="#agent" className="text-sm text-stone-500 transition-colors hover:text-stone-900">Agent App</a>
                    <a href="#templates" className="text-sm text-stone-500 transition-colors hover:text-stone-900">Templates</a>
                </div>
                <a
                    href={AGENT_APP}
                    className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 text-xs font-semibold text-white transition-all hover:bg-amber-400 active:scale-95"
                >
                    Get the Agent <IconArrow className="h-3 w-3" />
                </a>
            </nav>
        </header>
    );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
    return (
        <section className="relative overflow-hidden bg-[#faf9f7] px-6 pt-32 pb-20">
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                    backgroundSize: "180px",
                }}
            />
            <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-amber-100/60 blur-[120px]" />

            <div className="relative mx-auto max-w-5xl text-center">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-stone-500 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Products by Esteban Toro
                </div>
                <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-tight tracking-tight text-stone-900">
                    Tools built for people
                    <br />
                    <span className="text-stone-400">who mean business.</span>
                </h1>
                <p className="mt-6 mx-auto max-w-xl text-base leading-relaxed text-stone-500">
                    Three products. One mission: close the gap between where you are and what you're building.
                    Pick what fits your stage.
                </p>

                <div className="mt-10 flex justify-center gap-3 flex-wrap">
                    <a href="#daili" className="inline-flex h-10 items-center gap-2 rounded-xl border border-stone-200 bg-white px-5 text-sm font-semibold text-stone-700 shadow-sm transition-all hover:bg-stone-50 active:scale-95">
                        Daili App
                    </a>
                    <a href="#agent" className="inline-flex h-10 items-center gap-2 rounded-xl bg-amber-500 px-5 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-400 active:scale-95">
                        Agent App
                    </a>
                    <a href="#templates" className="inline-flex h-10 items-center gap-2 rounded-xl border border-stone-200 bg-white px-5 text-sm font-semibold text-stone-700 shadow-sm transition-all hover:bg-stone-50 active:scale-95">
                        Templates
                    </a>
                </div>
            </div>
        </section>
    );
}

// ─── Daili App — interactive demo card ────────────────────────────────────────

const INITIAL_TODOS = [
    { id: 1, text: "Review Q2 strategy doc", done: true },
    { id: 2, text: "Ship agent app landing update", done: true },
    { id: 3, text: "Block focus time for deep work", done: false },
    { id: 4, text: "Weekly review — 30 min", done: false },
];

function DailiDemoCard() {
    const [todos, setTodos] = useState(INITIAL_TODOS);
    const [focusMode, setFocusMode] = useState(false);
    const [note, setNote] = useState("The key is not to prioritize what's on your schedule, but to schedule your priorities...");
    const [newTodo, setNewTodo] = useState("");

    function toggleTodo(id: number) {
        setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
    }

    function addTodo(e: React.FormEvent) {
        e.preventDefault();
        const text = newTodo.trim();
        if (!text) return;
        setTodos(prev => [...prev, { id: Date.now(), text, done: false }]);
        setNewTodo("");
    }

    const done = todos.filter(t => t.done).length;

    return (
        <div className="rounded-3xl border border-stone-200 bg-[#faf9f7] p-6 shadow-xl shadow-stone-900/5">
            {/* Window chrome */}
            <div className="flex items-center gap-2 mb-5">
                <div className="h-3 w-3 rounded-full bg-red-300" />
                <div className="h-3 w-3 rounded-full bg-amber-300" />
                <div className="h-3 w-3 rounded-full bg-emerald-300" />
                <div className="ml-3 flex-1 rounded-md bg-stone-200/60 h-5 flex items-center px-2">
                    <span className="text-[10px] text-stone-400">daili.app — Today</span>
                </div>
            </div>

            {/* Focus mode toggle */}
            <div className="flex items-center justify-between mb-5 rounded-xl bg-white border border-stone-200 px-4 py-3">
                <div>
                    <p className="text-xs font-semibold text-stone-700">Focus mode</p>
                    <p className="text-[10px] text-stone-400">{focusMode ? "Notifications paused" : "All notifications on"}</p>
                </div>
                <button
                    onClick={() => setFocusMode(p => !p)}
                    className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${focusMode ? "bg-stone-900" : "bg-stone-200"}`}
                    aria-label="Toggle focus mode"
                >
                    <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${focusMode ? "translate-x-5" : "translate-x-0"}`} />
                </button>
            </div>

            {/* Todos */}
            <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Today</p>
                    <p className="text-[10px] text-stone-400">{done}/{todos.length} done</p>
                </div>
                <div className="space-y-2">
                    {todos.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => toggleTodo(t.id)}
                            className="flex items-center gap-3 w-full text-left group"
                        >
                            <div className={`h-4 w-4 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${t.done ? "bg-stone-900 border-stone-900" : "border-stone-300 group-hover:border-stone-400"}`}>
                                {t.done && <IconCheck className="h-2.5 w-2.5 text-white" />}
                            </div>
                            <span className={`text-sm transition-colors ${t.done ? "line-through text-stone-400" : "text-stone-700"}`}>{t.text}</span>
                        </button>
                    ))}
                </div>

                {/* Add todo */}
                <form onSubmit={addTodo} className="mt-3 flex gap-2">
                    <input
                        value={newTodo}
                        onChange={e => setNewTodo(e.target.value)}
                        placeholder="Add a task..."
                        className="flex-1 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs text-stone-700 placeholder-stone-300 outline-none focus:border-stone-400"
                    />
                    <button
                        type="submit"
                        className="rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-stone-700"
                    >+</button>
                </form>
            </div>

            {/* Notes */}
            <div className="rounded-xl bg-white border border-stone-200 p-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1.5">Quick note</p>
                <textarea
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    rows={3}
                    className="w-full resize-none text-xs text-stone-600 leading-relaxed bg-transparent outline-none placeholder-stone-300"
                    placeholder="Capture a thought..."
                />
            </div>
        </div>
    );
}

// ─── Daili App section ─────────────────────────────────────────────────────────

function DailiAppSection() {
    const features = [
        "Sync todos across all your devices instantly",
        "Calendar integration — see your week at a glance",
        "Notes with markdown — capture ideas fast",
        "Workspaces to separate life, work, and projects",
        "AI-powered summaries of your daily output",
        "Built for focus, not feature bloat",
    ];

    return (
        <section id="daili" className="bg-white px-6 py-24">
            <div className="mx-auto max-w-5xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left */}
                    <div>
                        <Badge color="blue">Subscription</Badge>
                        <h2 className="font-display mt-5 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl leading-tight">
                            Daili App
                        </h2>
                        <p className="mt-2 text-lg text-stone-400 font-medium">Your daily operating system</p>
                        <p className="mt-5 text-base leading-relaxed text-stone-500">
                            One place for everything you need to run your day. Todos that actually sync,
                            a calendar that makes sense, and notes that don't get lost. No friction, no clutter.
                        </p>

                        <ul className="mt-8 space-y-3">
                            {features.map((f) => (
                                <li key={f} className="flex items-start gap-3 text-sm text-stone-600">
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                        <IconCheck className="h-3 w-3" />
                                    </span>
                                    {f}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-10 flex flex-wrap gap-3">
                            <a
                                href={DAILI_APP}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-12 items-center gap-2 rounded-xl bg-stone-900 px-6 text-sm font-semibold text-white shadow-md transition-all hover:bg-stone-700 active:scale-95"
                            >
                                Start with Daili <IconArrow />
                            </a>
                            <a
                                href={WHATSAPP}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-12 items-center gap-2 rounded-xl border border-stone-200 px-6 text-sm font-semibold text-stone-600 transition-all hover:bg-stone-50 active:scale-95"
                            >
                                Ask a question
                            </a>
                        </div>
                    </div>

                    {/* Right — interactive demo */}
                    <div className="relative">
                        <DailiDemoCard />
                        <div className="absolute -top-3 -right-3 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 shadow-md">
                            Try it live ↓
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Agent App ─────────────────────────────────────────────────────────────────

function AgentAppSection() {
    const features = [
        "Start from a curated template built for your goal",
        "Customize every step with LLMs in plain language",
        "Your agent learns your context over time",
        "Automate repetitive decisions and recurring tasks",
        "Connect to your tools, notes, and workflows",
        "Ship your own AI-powered system in minutes",
    ];

    const steps = [
        { num: "1", label: "Pick a template", desc: "Choose from purpose, strategy, habits, and more" },
        { num: "2", label: "Build with AI", desc: "Describe what you want — the LLM handles the logic" },
        { num: "3", label: "Run your agent", desc: "It works in the background while you focus on what matters" },
    ];

    return (
        <section id="agent" className="bg-[#faf9f7] px-6 py-24">
            <div className="mx-auto max-w-5xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left — visual */}
                    <div className="relative order-2 lg:order-1">
                        <div className="rounded-3xl border border-stone-200 bg-stone-900 p-6 shadow-xl">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-xl bg-amber-500 flex items-center justify-center text-white text-sm font-bold">A</div>
                                    <div>
                                        <p className="text-xs font-semibold text-white">My Agent</p>
                                        <p className="text-[10px] text-stone-500">Purpose · Strategy</p>
                                    </div>
                                </div>
                                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Running
                                </span>
                            </div>

                            {/* Chat-like messages */}
                            <div className="space-y-3 mb-5">
                                <div className="rounded-xl rounded-tl-sm bg-stone-800 px-4 py-3 text-xs text-stone-300 max-w-[85%]">
                                    What's your top priority this week?
                                </div>
                                <div className="ml-auto rounded-xl rounded-tr-sm bg-amber-500 px-4 py-3 text-xs text-white max-w-[85%]">
                                    Finishing the agent app onboarding flow.
                                </div>
                                <div className="rounded-xl rounded-tl-sm bg-stone-800 px-4 py-3 text-xs text-stone-300 max-w-[85%]">
                                    Got it. I've blocked 3 focus sessions and moved low-priority tasks to Friday. Want me to draft the checklist?
                                </div>
                            </div>

                            {/* Steps */}
                            <div className="border-t border-stone-800 pt-4 space-y-2.5">
                                {steps.map((s) => (
                                    <div key={s.num} className="flex items-start gap-3">
                                        <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[10px] font-bold text-amber-400 shrink-0 mt-0.5">
                                            {s.num}
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-stone-300">{s.label}</p>
                                            <p className="text-[10px] text-stone-500">{s.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Floating badge */}
                        <div className="absolute -bottom-3 -left-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-700 shadow-md">
                            Built with your templates
                        </div>
                    </div>

                    {/* Right */}
                    <div className="order-1 lg:order-2">
                        <Badge color="amber">Subscription</Badge>
                        <h2 className="font-display mt-5 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl leading-tight">
                            Agent App
                        </h2>
                        <p className="mt-2 text-lg text-stone-400 font-medium">Your personal AI system</p>
                        <p className="mt-5 text-base leading-relaxed text-stone-500">
                            Start from a battle-tested template and let LLMs do the heavy lifting. No coding required —
                            just describe what you need and your agent builds it, runs it, and improves it over time.
                        </p>

                        <ul className="mt-8 space-y-3">
                            {features.map((f) => (
                                <li key={f} className="flex items-start gap-3 text-sm text-stone-600">
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                                        <IconCheck className="h-3 w-3" />
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
                                Get the Agent App <IconArrow />
                            </a>
                            <a
                                href={WHATSAPP}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-12 items-center gap-2 rounded-xl border border-stone-200 px-6 text-sm font-semibold text-stone-600 transition-all hover:bg-stone-50 active:scale-95"
                            >
                                Ask a question
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Templates ─────────────────────────────────────────────────────────────────

function TemplatesSection() {
    const templates = [
        {
            emoji: "💰",
            name: "Finance Tracker",
            tagline: "Know exactly where your money goes",
            desc: "A complete system to track income, expenses, savings goals, and investments. Built around clarity, not complexity.",
            features: [
                "Monthly budget planner",
                "Expense categories with targets",
                "Savings goal tracker",
                "Net worth snapshot",
                "Weekly review prompts",
            ],
            accent: "border-emerald-200 bg-emerald-50",
            badgeColor: "emerald" as const,
            ctaColor: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20",
        },
        {
            emoji: "🧭",
            name: "Main Purpose",
            tagline: "Find direction, build conviction",
            desc: "A guided framework to identify what matters most, define your north star, and turn abstract purpose into daily action.",
            features: [
                "Values clarification exercise",
                "Life areas audit",
                "10-year vision builder",
                "Monthly intention setting",
                "Weekly alignment check",
            ],
            accent: "border-amber-200 bg-amber-50",
            badgeColor: "amber" as const,
            ctaColor: "bg-amber-500 hover:bg-amber-400 shadow-amber-500/20",
        },
        {
            emoji: "📈",
            name: "Habits Tracker",
            tagline: "Make consistency your superpower",
            desc: "A habit system that actually sticks — with streaks, context stacking, and weekly reviews that reinforce the behaviors you're building.",
            features: [
                "Daily habit dashboard",
                "Streak tracking and recovery",
                "Context stacking planner",
                "Progress heatmap view",
                "Monthly habits review",
            ],
            accent: "border-blue-200 bg-blue-50",
            badgeColor: "blue" as const,
            ctaColor: "bg-blue-600 hover:bg-blue-500 shadow-blue-600/20",
        },
    ];

    return (
        <section id="templates" className="bg-white px-6 py-24">
            <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                    <div>
                        <Badge color="emerald">One-time payment</Badge>
                        <h2 className="font-display mt-5 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl leading-tight">
                            Templates
                        </h2>
                        <p className="mt-3 max-w-lg text-base leading-relaxed text-stone-500">
                            Pre-built systems for the areas that matter most. Buy once, use forever — and plug them straight into the Agent App.
                        </p>
                    </div>
                    <div className="shrink-0 rounded-2xl border border-stone-200 bg-[#faf9f7] px-5 py-4 text-center">
                        <p className="text-xs text-stone-400 font-medium mb-1">Works with</p>
                        <p className="text-sm font-bold text-stone-900">Agent App</p>
                        <p className="text-[10px] text-stone-400 mt-0.5">Import in one click</p>
                    </div>
                </div>

                {/* Template cards */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {templates.map((t) => (
                        <div
                            key={t.name}
                            className={`group relative flex flex-col rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/5 ${t.accent}`}
                        >
                            <span className="mb-4 block text-4xl">{t.emoji}</span>
                            <h3 className="font-display text-xl font-bold text-stone-900">{t.name}</h3>
                            <p className="mt-1 text-sm font-medium text-stone-500">{t.tagline}</p>
                            <p className="mt-3 text-sm leading-relaxed text-stone-500">{t.desc}</p>

                            <ul className="mt-5 space-y-2 flex-1">
                                {t.features.map((f) => (
                                    <li key={f} className="flex items-center gap-2 text-xs text-stone-600">
                                        <span className="h-1 w-1 rounded-full bg-stone-400 shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <a
                                href={WHATSAPP}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`mt-7 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white shadow-lg transition-all active:scale-95 ${t.ctaColor}`}
                            >
                                Get this template <IconArrow className="h-3.5 w-3.5" />
                            </a>
                        </div>
                    ))}
                </div>

                {/* Bundle nudge */}
                <div className="mt-8 rounded-2xl border border-stone-200 bg-[#faf9f7] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <p className="font-display font-bold text-stone-900">Want all three?</p>
                        <p className="text-sm text-stone-500 mt-0.5">Get the full bundle and save — plus direct import into the Agent App.</p>
                    </div>
                    <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex h-10 items-center gap-2 rounded-xl bg-stone-900 px-5 text-sm font-semibold text-white transition-all hover:bg-stone-700 active:scale-95"
                    >
                        Get the bundle <IconArrow className="h-3.5 w-3.5" />
                    </a>
                </div>
            </div>
        </section>
    );
}

// ─── Final CTA ─────────────────────────────────────────────────────────────────

function FinalCTA() {
    return (
        <section className="bg-stone-900 px-6 py-20 text-white relative overflow-hidden">
            <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] translate-x-1/3 -translate-y-1/3 rounded-full bg-amber-500/10 blur-[100px]" />
            <div className="relative mx-auto max-w-5xl text-center">
                <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                    Not sure where to start?
                </h2>
                <p className="mt-5 text-stone-400 max-w-lg mx-auto leading-relaxed">
                    If you have a goal but not a system, start with the Agent App. If you want a shortcut to clarity, grab a template first.
                </p>
                <div className="mt-8 flex flex-wrap gap-3 justify-center">
                    <a
                        href={AGENT_APP}
                        className="inline-flex h-12 items-center gap-2 rounded-xl bg-amber-500 px-6 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-400 active:scale-95"
                    >
                        Start with the Agent <IconArrow />
                    </a>
                    <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-12 items-center gap-2 rounded-xl border border-stone-700 px-6 text-sm font-semibold text-stone-300 transition-all hover:border-stone-500 hover:text-white active:scale-95"
                    >
                        Talk to me first
                    </a>
                </div>
            </div>
        </section>
    );
}

// ─── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
    return (
        <footer className="border-t border-stone-100 bg-[#faf9f7] px-6 py-8">
            <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <a href="/" className="font-display text-sm font-bold text-stone-900">
                    et<span className="text-amber-500">.</span>
                </a>
                <p className="text-xs text-stone-400">© {new Date().getFullYear()} Esteban Toro</p>
                <div className="flex gap-4 text-xs text-stone-400">
                    <a href="/" className="hover:text-stone-700 transition-colors">Home</a>
                    <a href={AGENT_APP} className="hover:text-stone-700 transition-colors font-medium text-amber-600">Agent App</a>
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="hover:text-stone-700 transition-colors">WhatsApp</a>
                </div>
            </div>
        </footer>
    );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
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

        html { scroll-behavior: smooth; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        section { animation: fadeUp 0.6s ease both; }
      `}</style>

            <Navbar />
            <Hero />
            <DailiAppSection />
            <AgentAppSection />
            <TemplatesSection />
            <FinalCTA />
            <Footer />
        </main>
    );
}
