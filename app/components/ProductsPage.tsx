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
        { label: "Daili App",  href: "#daili"     },
        { label: "Agent App",  href: "#agent"     },
        { label: "Guide",      href: "#guide"     },
        { label: "Templates",  href: "#templates" },
    ];

    return (
        <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
            scrolled ? "bg-stone-950/95 backdrop-blur-md border-b border-stone-800/60 shadow-sm" : ""
        }`}>
            <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
                <a href="/" className="font-display text-base font-bold tracking-tight text-white">
                    et<span className="text-amber-500">.</span>
                </a>
                <div className="hidden items-center gap-1 md:flex">
                    {links.map((l) => (
                        <a key={l.href} href={l.href}
                            className="rounded-lg px-3 py-1.5 text-sm font-medium text-stone-300 transition-all hover:bg-white/10 hover:text-white">
                            {l.label}
                        </a>
                    ))}
                </div>
                <div className="hidden md:flex items-center gap-2">
                    <a href="/" className="text-sm text-stone-400 hover:text-white transition-colors">← Home</a>
                    <a href={AGENT_APP}
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 text-xs font-semibold text-white transition-all hover:bg-amber-400 active:scale-95">
                        Get Agent Kit <IconArrow className="h-3 w-3" />
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
                        <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                            className="block rounded-lg px-2 py-2.5 text-sm text-stone-300 hover:bg-stone-800 hover:text-white">
                            {l.label}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
    return (
        <section className="relative overflow-hidden bg-stone-950 px-6 pt-32 pb-24">
            <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-amber-500/10 blur-[140px]" />
            <div className="pointer-events-none absolute left-0 bottom-0 h-[400px] w-[400px] translate-y-1/3 -translate-x-1/3 rounded-full bg-amber-900/10 blur-[100px]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                backgroundSize: "180px",
            }} />

            <div className="relative mx-auto max-w-5xl text-center">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-stone-700 bg-stone-800/80 px-3 py-1.5 text-xs font-medium text-stone-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                    Products by Esteban Toro
                </div>
                <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-tight tracking-tight text-white">
                    Tools built for people
                    <br />
                    <span className="text-stone-500">who mean business.</span>
                </h1>
                <p className="mt-6 mx-auto max-w-xl text-base leading-relaxed text-stone-400">
                    Apps, agents, and guides. Each one closes the gap between where you are and what you&apos;re building.
                </p>

                <div className="mt-10 flex justify-center gap-3 flex-wrap">
                    {[
                        { label: "Daili App",  href: "#daili"     },
                        { label: "Agent App",  href: "#agent",   amber: true },
                        { label: "Guide",      href: "#guide"     },
                        { label: "Templates",  href: "#templates" },
                    ].map((l) => (
                        <a key={l.href} href={l.href}
                            className={`inline-flex h-10 items-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all active:scale-95 ${
                                l.amber
                                    ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20 hover:bg-amber-400"
                                    : "border border-stone-700 bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white"
                            }`}>
                            {l.label}
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Daili App — interactive demo card ────────────────────────────────────────

const INITIAL_TODOS = [
    { id: 1, text: "Review Q2 strategy doc",          done: true  },
    { id: 2, text: "Ship agent app landing update",   done: true  },
    { id: 3, text: "Block focus time for deep work",  done: false },
    { id: 4, text: "Weekly review — 30 min",          done: false },
];

function DailiDemoCard() {
    const [todos, setTodos]         = useState(INITIAL_TODOS);
    const [focusMode, setFocusMode] = useState(false);
    const [note, setNote]           = useState("The key is not to prioritize what's on your schedule, but to schedule your priorities...");
    const [newTodo, setNewTodo]     = useState("");

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
            <div className="flex items-center gap-2 mb-5">
                <div className="h-3 w-3 rounded-full bg-red-300" />
                <div className="h-3 w-3 rounded-full bg-amber-300" />
                <div className="h-3 w-3 rounded-full bg-emerald-300" />
                <div className="ml-3 flex-1 rounded-md bg-stone-200/60 h-5 flex items-center px-2">
                    <span className="text-[10px] text-stone-400">daili.app — Today</span>
                </div>
            </div>

            <div className="flex items-center justify-between mb-5 rounded-xl bg-white border border-stone-200 px-4 py-3">
                <div>
                    <p className="text-xs font-semibold text-stone-700">Focus mode</p>
                    <p className="text-[10px] text-stone-400">{focusMode ? "Notifications paused" : "All notifications on"}</p>
                </div>
                <button onClick={() => setFocusMode(p => !p)}
                    className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${focusMode ? "bg-stone-900" : "bg-stone-200"}`}>
                    <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${focusMode ? "translate-x-5" : "translate-x-0"}`} />
                </button>
            </div>

            <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Today</p>
                    <p className="text-[10px] text-stone-400">{done}/{todos.length} done</p>
                </div>
                <div className="space-y-2">
                    {todos.map((t) => (
                        <button key={t.id} onClick={() => toggleTodo(t.id)}
                            className="flex items-center gap-3 w-full text-left group">
                            <div className={`h-4 w-4 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${t.done ? "bg-stone-900 border-stone-900" : "border-stone-300 group-hover:border-stone-400"}`}>
                                {t.done && <IconCheck className="h-2.5 w-2.5 text-white" />}
                            </div>
                            <span className={`text-sm transition-colors ${t.done ? "line-through text-stone-400" : "text-stone-700"}`}>{t.text}</span>
                        </button>
                    ))}
                </div>
                <form onSubmit={addTodo} className="mt-3 flex gap-2">
                    <input value={newTodo} onChange={e => setNewTodo(e.target.value)}
                        placeholder="Add a task..."
                        className="flex-1 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs text-stone-700 placeholder-stone-300 outline-none focus:border-stone-400" />
                    <button type="submit"
                        className="rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-stone-700">+</button>
                </form>
            </div>

            <div className="rounded-xl bg-white border border-stone-200 p-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1.5">Quick note</p>
                <textarea value={note} onChange={e => setNote(e.target.value)} rows={3}
                    className="w-full resize-none text-xs text-stone-600 leading-relaxed bg-transparent outline-none placeholder-stone-300"
                    placeholder="Capture a thought..." />
            </div>
        </div>
    );
}

// ─── Daili App section — light ─────────────────────────────────────────────────

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
                    <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700">
                            Subscription
                        </span>
                        <h2 className="font-display mt-5 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl leading-tight">
                            Daili App
                        </h2>
                        <p className="mt-2 text-lg text-stone-400 font-medium">Your daily operating system</p>
                        <p className="mt-5 text-base leading-relaxed text-stone-500">
                            One place for everything you need to run your day. Todos that actually sync,
                            a calendar that makes sense, and notes that don&apos;t get lost. No friction, no clutter.
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
                            <a href={DAILI_APP} target="_blank" rel="noopener noreferrer"
                                className="inline-flex h-12 items-center gap-2 rounded-xl bg-stone-900 px-6 text-sm font-semibold text-white shadow-md transition-all hover:bg-stone-700 active:scale-95">
                                Start with Daili <IconArrow />
                            </a>
                            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                                className="inline-flex h-12 items-center gap-2 rounded-xl border border-stone-200 px-6 text-sm font-semibold text-stone-600 transition-all hover:bg-stone-50 active:scale-95">
                                Ask a question
                            </a>
                        </div>
                    </div>

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

// ─── Agent App section — dark ──────────────────────────────────────────────────

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
        { num: "1", label: "Pick a template",  desc: "Choose from purpose, strategy, habits, and more" },
        { num: "2", label: "Build with AI",    desc: "Describe what you want — the LLM handles the logic" },
        { num: "3", label: "Run your agent",   desc: "It works in the background while you focus on what matters" },
    ];

    return (
        <section id="agent" className="relative overflow-hidden bg-stone-950 px-6 py-24">
            <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/4 rounded-full bg-amber-500/8 blur-[140px]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
            }} />

            <div className="relative mx-auto max-w-5xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left — visual card */}
                    <div className="relative order-2 lg:order-1">
                        <div className="rounded-3xl border border-stone-700/60 bg-stone-900/80 p-6 shadow-2xl shadow-black/40">
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

                            <div className="space-y-3 mb-5">
                                <div className="rounded-xl rounded-tl-sm bg-stone-800 px-4 py-3 text-xs text-stone-300 max-w-[85%]">
                                    What&apos;s your top priority this week?
                                </div>
                                <div className="ml-auto rounded-xl rounded-tr-sm bg-amber-500 px-4 py-3 text-xs text-white max-w-[85%]">
                                    Finishing the agent app onboarding flow.
                                </div>
                                <div className="rounded-xl rounded-tl-sm bg-stone-800 px-4 py-3 text-xs text-stone-300 max-w-[85%]">
                                    Got it. I&apos;ve blocked 3 focus sessions and moved low-priority tasks to Friday. Want me to draft the checklist?
                                </div>
                            </div>

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
                        <div className="absolute -bottom-3 -left-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-400 shadow-md">
                            Built with your templates
                        </div>
                    </div>

                    {/* Right */}
                    <div className="order-1 lg:order-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                            Subscription
                        </span>
                        <h2 className="font-display mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
                            Agent App
                        </h2>
                        <p className="mt-2 text-lg text-stone-500 font-medium">Your personal AI system</p>
                        <p className="mt-5 text-base leading-relaxed text-stone-400">
                            Start from a battle-tested template and let LLMs do the heavy lifting. No coding required —
                            just describe what you need and your agent builds it, runs it, and improves it over time.
                        </p>

                        <ul className="mt-8 space-y-3">
                            {features.map((f) => (
                                <li key={f} className="flex items-start gap-3 text-sm text-stone-400">
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-500">
                                        <IconCheck className="h-3 w-3" />
                                    </span>
                                    {f}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-10 flex flex-wrap gap-3">
                            <a href={AGENT_APP}
                                className="inline-flex h-12 items-center gap-2 rounded-xl bg-amber-500 px-6 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-400 active:scale-95">
                                Get the Agent App <IconArrow />
                            </a>
                            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                                className="inline-flex h-12 items-center gap-2 rounded-xl border border-stone-700 px-6 text-sm font-semibold text-stone-400 transition-all hover:border-stone-500 hover:text-white active:scale-95">
                                Ask a question
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Guide Section — warm light ────────────────────────────────────────────────

function GuideSection() {
    const contents = [
        { icon: "📖", label: "Case studies",      desc: "Real people who made the jump" },
        { icon: "🗺️", label: "Exit roadmap",      desc: "Step-by-step planning guides"  },
        { icon: "📄", label: "Templates",          desc: "Offers, pages, outreach scripts" },
        { icon: "🤖", label: "AI frameworks",      desc: "Build income streams with AI"  },
        { icon: "📣", label: "Social playbooks",   desc: "Grow on LinkedIn, X, Instagram" },
        { icon: "💰", label: "Income models",      desc: "Multiple monetization paths"   },
    ];

    const journey = [
        { stage: "Now",        label: "Trading time for money",    note: "Fixed salary, someone else's rules",     icon: "⏰" },
        { stage: "Month 1–2",  label: "Clarity & positioning",     note: "Define your niche and knowledge offer",  icon: "🧭" },
        { stage: "Month 3–4",  label: "First income streams",      note: "Content + AI tools + first paid offers", icon: "⚡" },
        { stage: "Month 5–6",  label: "Scale & replace",           note: "Replace your salary, exit on your terms",icon: "🏝️" },
    ];

    return (
        <section id="guide" className="relative overflow-hidden bg-[#fdf8f0] px-6 py-24">
            <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/4 rounded-full bg-amber-200/50 blur-[140px]" />
            <div className="pointer-events-none absolute left-0 bottom-0 h-[400px] w-[400px] -translate-x-1/3 translate-y-1/3 rounded-full bg-orange-100/60 blur-[100px]" />

            <div className="relative mx-auto max-w-5xl">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left */}
                    <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-orange-700">
                            Guide · One-time
                        </span>
                        <h2 className="font-display mt-5 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl leading-tight">
                            Free yourself
                            <br />
                            <span className="text-amber-600">from the 9-5.</span>
                        </h2>
                        <p className="mt-2 text-lg text-stone-500 font-medium">Monetize your knowledge with AI &amp; Social Media</p>
                        <p className="mt-5 text-base leading-relaxed text-stone-600">
                            A complete guide to plan your exit from employment — packed with case studies,
                            frameworks, and templates to start monetizing your skills and knowledge starting today.
                        </p>

                        <div className="mt-8 grid grid-cols-2 gap-2.5">
                            {contents.map((c) => (
                                <div key={c.label} className="flex items-start gap-3 rounded-2xl bg-white border border-amber-100 p-3.5 shadow-sm">
                                    <span className="text-lg shrink-0">{c.icon}</span>
                                    <div>
                                        <p className="text-sm font-semibold text-stone-800">{c.label}</p>
                                        <p className="text-[11px] text-stone-500">{c.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 flex flex-wrap gap-3">
                            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                                className="inline-flex h-12 items-center gap-2 rounded-xl bg-amber-500 px-6 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-400 active:scale-95">
                                Get the guide <IconArrow />
                            </a>
                        </div>
                    </div>

                    {/* Right — journey card */}
                    <div className="relative lg:sticky lg:top-24">
                        <div className="rounded-3xl border border-amber-200/60 bg-white p-7 shadow-xl shadow-amber-900/6">
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400 mb-6">The journey</p>

                            <div className="relative">
                                {/* Vertical connector line */}
                                <div className="absolute left-4 top-4 bottom-4 w-px bg-amber-100" />

                                <div className="space-y-6">
                                    {journey.map((step, i) => (
                                        <div key={i} className="flex items-start gap-4 relative">
                                            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm z-10 ${
                                                i === 0
                                                    ? "bg-stone-100 border border-stone-200"
                                                    : "bg-amber-50 border border-amber-200"
                                            }`}>
                                                {step.icon}
                                            </div>
                                            <div className="flex-1 pt-0.5">
                                                <span className={`text-[10px] font-bold uppercase tracking-widest ${i === 0 ? "text-stone-400" : "text-amber-500"}`}>
                                                    {step.stage}
                                                </span>
                                                <p className={`text-sm font-semibold mt-0.5 ${i === 0 ? "text-stone-500" : "text-stone-800"}`}>
                                                    {step.label}
                                                </p>
                                                <p className="text-xs text-stone-400 mt-0.5">{step.note}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-7 rounded-2xl bg-amber-50 border border-amber-100 px-4 py-3 flex items-center gap-3">
                                <span className="text-xl">🎁</span>
                                <p className="text-xs text-stone-600 leading-relaxed">
                                    Includes <span className="font-semibold text-stone-800">templates, case studies, and playbooks</span> ready to use from day one.
                                </p>
                            </div>
                        </div>

                        <div className="absolute -bottom-3 -right-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-700 shadow-md">
                            AI + Social Media focused
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Templates — dark ──────────────────────────────────────────────────────────

function TemplatesSection() {
    const templates = [
        {
            emoji: "💰",
            name: "Finance Tracker",
            tagline: "Know exactly where your money goes",
            desc: "A complete system to track income, expenses, savings goals, and investments. Built around clarity, not complexity.",
            features: ["Monthly budget planner", "Expense categories with targets", "Savings goal tracker", "Net worth snapshot", "Weekly review prompts"],
            accent: "border-emerald-500/25 bg-emerald-500/6",
            check: "bg-emerald-500/20 text-emerald-400",
            cta: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20",
            tag: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
        },
        {
            emoji: "🧭",
            name: "Main Purpose",
            tagline: "Find direction, build conviction",
            desc: "A guided framework to identify what matters most, define your north star, and turn abstract purpose into daily action.",
            features: ["Values clarification exercise", "Life areas audit", "10-year vision builder", "Monthly intention setting", "Weekly alignment check"],
            accent: "border-amber-500/25 bg-amber-500/6",
            check: "bg-amber-500/20 text-amber-400",
            cta: "bg-amber-500 hover:bg-amber-400 shadow-amber-500/20",
            tag: "border-amber-500/30 bg-amber-500/10 text-amber-400",
        },
        {
            emoji: "📈",
            name: "Habits Tracker",
            tagline: "Make consistency your superpower",
            desc: "A habit system that actually sticks — with streaks, context stacking, and weekly reviews that reinforce the behaviors you&apos;re building.",
            features: ["Daily habit dashboard", "Streak tracking and recovery", "Context stacking planner", "Progress heatmap view", "Monthly habits review"],
            accent: "border-sky-500/25 bg-sky-500/6",
            check: "bg-sky-500/20 text-sky-400",
            cta: "bg-sky-600 hover:bg-sky-500 shadow-sky-600/20",
            tag: "border-sky-500/30 bg-sky-500/10 text-sky-400",
        },
    ];

    return (
        <section id="templates" className="relative overflow-hidden bg-stone-950 px-6 py-24">
            <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-[600px] w-[400px] -translate-x-1/2 rounded-full bg-amber-900/10 blur-[120px]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
            }} />

            <div className="relative mx-auto max-w-5xl">
                <div className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                    <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-600 bg-stone-800 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                            One-time payment
                        </span>
                        <h2 className="font-display mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
                            Templates
                        </h2>
                        <p className="mt-3 max-w-lg text-base leading-relaxed text-stone-400">
                            Pre-built systems for the areas that matter most. Buy once, use forever — plug straight into the Agent App.
                        </p>
                    </div>
                    <div className="shrink-0 rounded-2xl border border-amber-500/20 bg-amber-500/8 px-5 py-4 text-center">
                        <p className="text-xs text-stone-500 font-medium mb-1">Works with</p>
                        <p className="text-sm font-bold text-amber-400">Agent App</p>
                        <p className="text-[10px] text-stone-500 mt-0.5">Import in one click</p>
                    </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-3">
                    {templates.map((t) => (
                        <div key={t.name}
                            className={`group relative flex flex-col rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 ${t.accent}`}>
                            <span className="mb-4 block text-4xl">{t.emoji}</span>
                            <h3 className="font-display text-xl font-bold text-white">{t.name}</h3>
                            <p className="mt-1 text-sm font-medium text-stone-500">{t.tagline}</p>
                            <p className="mt-3 text-sm leading-relaxed text-stone-400">{t.desc}</p>

                            <ul className="mt-5 space-y-2 flex-1">
                                {t.features.map((f) => (
                                    <li key={f} className="flex items-center gap-2.5 text-xs text-stone-400">
                                        <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${t.check}`}>
                                            <IconCheck className="h-2.5 w-2.5" />
                                        </span>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                                className={`mt-7 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white shadow-lg transition-all active:scale-95 ${t.cta}`}>
                                Get this template <IconArrow className="h-3.5 w-3.5" />
                            </a>
                        </div>
                    ))}
                </div>

                <div className="mt-8 rounded-2xl border border-stone-700/60 bg-stone-900/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <p className="font-display font-bold text-white">Want all three?</p>
                        <p className="text-sm text-stone-400 mt-0.5">Get the full bundle and save — plus direct import into the Agent App.</p>
                    </div>
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                        className="shrink-0 inline-flex h-10 items-center gap-2 rounded-xl bg-stone-700 px-5 text-sm font-semibold text-white transition-all hover:bg-stone-600 active:scale-95">
                        Get the bundle <IconArrow className="h-3.5 w-3.5" />
                    </a>
                </div>
            </div>
        </section>
    );
}

// ─── Final CTA — light ─────────────────────────────────────────────────────────

function FinalCTA() {
    return (
        <section className="bg-white px-6 py-20 relative overflow-hidden">
            <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] translate-x-1/3 -translate-y-1/3 rounded-full bg-amber-100/80 blur-[100px]" />
            <div className="relative mx-auto max-w-5xl text-center">
                <h2 className="font-display text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
                    Not sure where to start?
                </h2>
                <p className="mt-5 text-stone-500 max-w-lg mx-auto leading-relaxed">
                    If you have a goal but not a system, start with the Agent App. If you want clarity first, grab a template or the guide.
                </p>
                <div className="mt-8 flex flex-wrap gap-3 justify-center">
                    <a href={AGENT_APP}
                        className="inline-flex h-12 items-center gap-2 rounded-xl bg-amber-500 px-6 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-400 active:scale-95">
                        Start with the Agent <IconArrow />
                    </a>
                    <a href="#guide"
                        className="inline-flex h-12 items-center gap-2 rounded-xl border border-stone-200 px-6 text-sm font-semibold text-stone-700 transition-all hover:bg-stone-50 active:scale-95">
                        See the guide
                    </a>
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                        className="inline-flex h-12 items-center gap-2 rounded-xl border border-stone-200 px-6 text-sm font-semibold text-stone-500 transition-all hover:bg-stone-50 active:scale-95">
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
        <footer className="border-t border-stone-800 bg-stone-950 px-6 py-8">
            <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <a href="/" className="font-display text-sm font-bold text-white">
                    et<span className="text-amber-500">.</span>
                </a>
                <p className="text-xs text-stone-500">© {new Date().getFullYear()} Esteban Toro</p>
                <div className="flex gap-4 text-xs text-stone-500">
                    <a href="/" className="hover:text-white transition-colors">Home</a>
                    <a href={AGENT_APP} className="hover:text-white transition-colors font-medium text-amber-500">Agent App</a>
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
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

        body { font-family: 'DM Sans', system-ui, sans-serif; background-color: #0c0a09; }

        .font-display { font-family: 'Fraunces', Georgia, serif; }

        h1, h2, h3 { font-family: 'Fraunces', Georgia, serif; }

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
            <GuideSection />
            <TemplatesSection />
            <FinalCTA />
            <Footer />
        </main>
    );
}
