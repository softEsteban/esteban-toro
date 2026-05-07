"use client";

const LEMON_SQUEEZY_URL = "https://estebantoro.lemonsqueezy.com";
const HOME = "/";

// ─── Toolkit data ──────────────────────────────────────────────────────────────

const featured = {
    emoji: "🤖",
    tag: "Daily driver · AI",
    title: "Claude Pro",
    subtitle: "Anthropic · claude-sonnet-4-6",
    desc: "The AI I use for everything — coding, writing, research, and building products. Powers most of the agents I ship.",
    specs: ["Context window: 200k tokens", "Vision · Code · Files", "claude.ai/code CLI"],
    store: "Anthropic",
    url: "https://claude.ai",
    accent: "#f59e0b",
};

type ToolkitItem = {
    id: number;
    emoji: string;
    tag: string;
    title: string;
    subtitle: string;
    desc: string;
    specs: string[];
    store: string;
    url: string;
    glow: string;
    border: string;
};

const toolkit: ToolkitItem[] = [
    {
        id: 1,
        emoji: "⚡",
        tag: "IDE · AI",
        title: "Cursor",
        subtitle: "AI-native code editor",
        desc: "Where I write every line of code. Cursor's tab-complete and agent mode cut my build time in half.",
        specs: ["Codebase-aware AI", "Multi-file edits", "Claude & GPT-4o"],
        store: "cursor.com",
        url: "https://cursor.com",
        glow: "rgba(139,92,246,0.15)",
        border: "rgba(139,92,246,0.25)",
    },
    {
        id: 2,
        emoji: "▲",
        tag: "Hosting · Cloud",
        title: "Vercel",
        subtitle: "Zero-config deployments",
        desc: "Every Next.js app I ship lives on Vercel. Push to main, live in seconds — it's the fastest way to ship.",
        specs: ["Edge Network", "Instant rollbacks", "Analytics built-in"],
        store: "vercel.com",
        url: "https://vercel.com",
        glow: "rgba(255,255,255,0.08)",
        border: "rgba(255,255,255,0.12)",
    },
    {
        id: 3,
        emoji: "🗄️",
        tag: "Database · Backend",
        title: "Supabase",
        subtitle: "Open-source Firebase alternative",
        desc: "My go-to for Postgres + auth + storage. Lets me skip backend boilerplate and focus on what matters.",
        specs: ["Postgres + RLS", "Auth & storage", "Edge functions"],
        store: "supabase.com",
        url: "https://supabase.com",
        glow: "rgba(62,207,142,0.12)",
        border: "rgba(62,207,142,0.2)",
    },
    {
        id: 4,
        emoji: "🔷",
        tag: "Language · Framework",
        title: "Next.js + TypeScript",
        subtitle: "App Router · React 19",
        desc: "The stack this very site runs on. Full-stack in one repo, server components, zero config deploy.",
        specs: ["App Router", "Server Components", "Tailwind CSS v4"],
        store: "nextjs.org",
        url: "https://nextjs.org",
        glow: "rgba(59,130,246,0.12)",
        border: "rgba(59,130,246,0.2)",
    },
    {
        id: 5,
        emoji: "🐙",
        tag: "Version control",
        title: "GitHub",
        subtitle: "Code home · CI/CD",
        desc: "All my code lives here. Actions run my builds, and every project starts with a fresh repo.",
        specs: ["Private repos", "GitHub Actions", "Copilot"],
        store: "github.com",
        url: "https://github.com",
        glow: "rgba(255,255,255,0.06)",
        border: "rgba(255,255,255,0.1)",
    },
    {
        id: 6,
        emoji: "📝",
        tag: "Writing · Notes",
        title: "Notion",
        subtitle: "Second brain · wiki",
        desc: "Every idea, project plan, and system doc lives in Notion. My thinking happens here before it becomes code.",
        specs: ["AI assist", "Database views", "Team wikis"],
        store: "notion.so",
        url: "https://notion.so",
        glow: "rgba(255,255,255,0.06)",
        border: "rgba(255,255,255,0.1)",
    },
];

const wishlist: ToolkitItem[] = [
    {
        id: 10,
        emoji: "📽️",
        tag: "Hardware · AV",
        title: "Proyector Mini Magcubic HY320",
        subtitle: "Ultra HD 4K · WiFi · Android · 12 000 lúmenes",
        desc: "Para montar un espacio de cine y presentaciones en Ancestralis House.",
        specs: ["4K Ultra HD", "Android built-in", "12 000 lúmenes"],
        store: "Mercado Libre",
        url: "https://www.mercadolibre.com.co/proyector-mini-magcubic-hy320-ultra-hd-4k-wifi-android-12000-lumenes/p/MCO43935877",
        glow: "rgba(245,158,11,0.12)",
        border: "rgba(245,158,11,0.2)",
    },
    {
        id: 11,
        emoji: "💧",
        tag: "Infrastructure · Ancestralis",
        title: "Bomba de Agua Periférica APM37",
        subtitle: "0.5 HP · Aquastrong",
        desc: "Esencial para el sistema de agua del proyecto en Isla Fuerte.",
        specs: ["0.5 HP", "Periférica", "Aquastrong"],
        store: "Homecenter",
        url: "https://www.homecenter.com.co/homecenter-co/product/775525/bomba-de-agua-periferica-apm37-05hp-aquastrong/775525/",
        glow: "rgba(59,130,246,0.12)",
        border: "rgba(59,130,246,0.2)",
    },
    {
        id: 12,
        emoji: "🔩",
        tag: "Construcción · Ancestralis",
        title: "Tubo Rectangular Estructural HR50",
        subtitle: "90 × 50 × 20 mm · 6 m",
        desc: "Estructura metálica para las instalaciones del campamento digital.",
        specs: ["90 × 50 × 20 mm", "6 m de largo", "Acero estructural"],
        store: "Homecenter",
        url: "https://www.homecenter.com.co/homecenter-co/product/13303/tubo-rectangular-90-x-50-x-20mm-x-6m-estructural-hr50/13303/",
        glow: "rgba(161,161,170,0.1)",
        border: "rgba(161,161,170,0.18)",
    },
];

// ─── Icons ─────────────────────────────────────────────────────────────────────

function IconExternal({ className = "h-3.5 w-3.5" }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
    );
}

function IconHeart({ className = "h-4 w-4" }: { className?: string }) {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
    );
}

// ─── Card ──────────────────────────────────────────────────────────────────────

function GearCard({ item }: { item: ToolkitItem }) {
    return (
        <div
            className="group relative flex flex-col rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
            style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${item.border}`,
                boxShadow: `0 0 0 0 ${item.glow}`,
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 32px 4px ${item.glow}`;
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 0 ${item.glow}`;
            }}
        >
            <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{item.emoji}</span>
                <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase"
                    style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)" }}
                >
                    {item.tag}
                </span>
            </div>

            <h3 className="text-white font-bold text-base mb-0.5 font-display">{item.title}</h3>
            <p className="text-[11px] font-mono text-zinc-500 mb-3">{item.subtitle}</p>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4 flex-1">{item.desc}</p>

            <ul className="mb-5 space-y-1">
                {item.specs.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                        <span className="h-1 w-1 rounded-full bg-zinc-600 shrink-0" />
                        {s}
                    </li>
                ))}
            </ul>

            <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold transition-all active:scale-95"
                style={{
                    background: "rgba(255,255,255,0.06)",
                    border: `1px solid ${item.border}`,
                    color: "rgba(255,255,255,0.7)",
                }}
                onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)";
                }}
            >
                {item.store} <IconExternal />
            </a>
        </div>
    );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function SupportPage() {
    return (
        <main
            className="min-h-screen antialiased"
            style={{ background: "#09090b", fontFamily: "'DM Sans', system-ui, sans-serif", color: "#fff" }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Fraunces', Georgia, serif; }
        .font-mono { font-family: 'JetBrains Mono', 'Fira Mono', monospace; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #09090b; }
        ::-webkit-scrollbar-thumb { background: #27272a; border-radius: 3px; }
      `}</style>

            {/* Navbar */}
            <header
                className="fixed inset-x-0 top-0 z-50 backdrop-blur-md"
                style={{ background: "rgba(9,9,11,0.85)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
                <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
                    <a href={HOME} className="font-display text-base font-bold tracking-tight text-white">
                        et<span style={{ color: "#f59e0b" }}>.</span>
                    </a>
                    <div className="flex items-center gap-5">
                        <span
                            className="rounded-full px-2.5 py-1 text-[10px] font-mono font-medium tracking-widest uppercase"
                            style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.25)" }}
                        >
                            Build Stack
                        </span>
                        <a href={HOME} className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                        >
                            ← Home
                        </a>
                    </div>
                </nav>
            </header>

            {/* Hero */}
            <section className="relative overflow-hidden px-6 pt-36 pb-24">
                {/* grid background */}
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                    }}
                />
                <div
                    className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full"
                    style={{ background: "radial-gradient(ellipse, rgba(245,158,11,0.12) 0%, transparent 70%)" }}
                />

                <div className="relative mx-auto max-w-3xl text-center">
                    <div
                        className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono font-medium"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        esteban-toro / build-stack
                    </div>

                    <h1 className="font-display text-[clamp(2.8rem,7vw,5rem)] font-bold leading-[1.05] tracking-tight text-white">
                        Tools I use to
                        <br />
                        <span style={{ color: "#f59e0b" }}>ship ideas fast</span>
                    </h1>

                    <p className="mt-6 max-w-xl mx-auto text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                        This is my actual stack — the software, AI, and hardware I reach for every time I build.
                        If any of it helps you, supporting my work keeps the builds coming.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                        {/* <a
                            href={LEMON_SQUEEZY_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl px-8 text-sm font-semibold transition-all hover:-translate-y-0.5 active:scale-95"
                            style={{ background: "#f59e0b", color: "#000", boxShadow: "0 0 32px rgba(245,158,11,0.35)" }}
                        >
                            <IconHeart className="h-4 w-4" />
                            Support via Lemon Squeezy
                        </a> */}
                        <a
                            href="#wishlist"
                            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl px-7 text-sm font-semibold transition-all hover:-translate-y-0.5 active:scale-95"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
                        >
                            View wishlist ↓
                        </a>
                    </div>
                    <p className="mt-4 text-[11px] font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>
                        Secure · One-time or recurring · Cancel anytime
                    </p>
                </div>
            </section>

            {/* Featured tool */}
            <section className="px-6 pb-16">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-6 flex items-center gap-3">
                        <span
                            className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em]"
                            style={{ color: "#f59e0b" }}
                        >
                            Featured
                        </span>
                        <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
                    </div>

                    <div
                        className="rounded-3xl p-8 md:p-10"
                        style={{
                            background: "linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(255,255,255,0.02) 100%)",
                            border: "1px solid rgba(245,158,11,0.25)",
                        }}
                    >
                        <div className="flex flex-col md:flex-row items-start gap-8">
                            <div className="shrink-0 flex items-center justify-center h-20 w-20 rounded-2xl text-5xl"
                                style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
                                {featured.emoji}
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <span
                                        className="rounded-full px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wide"
                                        style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.25)" }}
                                    >
                                        {featured.tag}
                                    </span>
                                </div>
                                <h2 className="font-display text-3xl font-bold text-white mb-1">{featured.title}</h2>
                                <p className="text-xs font-mono mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>{featured.subtitle}</p>
                                <p className="text-base leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.55)" }}>{featured.desc}</p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {featured.specs.map((s) => (
                                        <span
                                            key={s}
                                            className="rounded-lg px-3 py-1 text-[11px] font-mono"
                                            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.08)" }}
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                                <a
                                    href={featured.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 active:scale-95"
                                    style={{ background: "#f59e0b", color: "#000" }}
                                >
                                    {featured.store} <IconExternal />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Software toolkit grid */}
            <section className="px-6 pb-20">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-6 flex items-center gap-3">
                        <span
                            className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em]"
                            style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                            Software Stack
                        </span>
                        <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
                        <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.2)" }}>
                            {toolkit.length} tools
                        </span>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {toolkit.map((item) => (
                            <GearCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Wishlist */}
            <section id="wishlist" className="px-6 pb-24">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-6 flex items-center gap-3">
                        <span
                            className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em]"
                            style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                            Wishlist · Ancestralis House
                        </span>
                        <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
                    </div>
                    <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.35)" }}>
                        Physical gear that would directly accelerate Ancestralis House — you can buy any of these directly from the store link.
                    </p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {wishlist.map((item) => (
                            <GearCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Support CTA */}
            <section
                className="relative overflow-hidden px-6 py-24"
                style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                    }}
                />
                <div className="relative mx-auto max-w-2xl text-center">
                    <p className="font-display text-3xl font-bold text-white mb-4">Thank you for being here.</p>
                    <p className="leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.4)" }}>
                        Whether you support financially or just follow the work — it matters.
                        Every reader, every fan, every conversation pushes this further.
                    </p>
                    {/* <a
                        href={LEMON_SQUEEZY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-12 items-center gap-2 rounded-xl px-8 text-sm font-semibold transition-all hover:-translate-y-0.5 active:scale-95"
                        style={{ background: "#f59e0b", color: "#000", boxShadow: "0 0 32px rgba(245,158,11,0.3)" }}
                    >
                        <IconHeart className="h-4 w-4" />
                        Support the work
                    </a> */}
                </div>
            </section>

            {/* Footer */}
            <footer
                className="px-6 py-6"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#09090b" }}
            >
                <div className="mx-auto max-w-5xl flex items-center justify-between">
                    <span className="font-display text-sm font-bold text-white">
                        et<span style={{ color: "#f59e0b" }}>.</span>
                    </span>
                    <p className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.2)" }}>
                        © {new Date().getFullYear()} Esteban Toro
                    </p>
                </div>
            </footer>
        </main>
    );
}
