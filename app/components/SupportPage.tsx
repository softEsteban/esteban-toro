"use client";

const HOME = "/";

// ─── Wishlist data ─────────────────────────────────────────────────────────────

type WishlistItem = {
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
    priority: "essential" | "upgrade" | "nice";
    why: string;
};

const wishlist: WishlistItem[] = [
    {
        id: 10,
        emoji: "📽️",
        tag: "AV · Ancestralis",
        title: "Proyector Mini Magcubic HY320",
        subtitle: "Ultra HD 4K · WiFi · Android · 12 000 lúmenes",
        desc: "Para montar un espacio de cine y presentaciones en Ancestralis House. El corazón audiovisual del espacio.",
        specs: ["4K Ultra HD", "Android built-in", "12 000 lúmenes"],
        store: "Mercado Libre",
        url: "https://www.mercadolibre.com.co/proyector-mini-magcubic-hy320-ultra-hd-4k-wifi-android-12000-lumenes/p/MCO43935877",
        glow: "rgba(245,158,11,0.15)",
        border: "rgba(245,158,11,0.25)",
        priority: "essential",
        why: "Cine, presentaciones y eventos en vivo",
    },
    {
        id: 13,
        emoji: "🎬",
        tag: "AV · Ancestralis",
        title: "Telón Retráctil 100\"",
        subtitle: "100 pulgadas · 16:9 · Con trípode",
        desc: "Pantalla de proyección para acompañar el proyector. Instala en segundos con el trípode incluido.",
        specs: ["100 pulgadas", "Relación 16:9", "Trípode incluido"],
        store: "Mercado Libre",
        url: "https://www.mercadolibre.com.co/telon-retractil-manual-con-tripode-100-pulgada-relacion-169/up/MCOU3713186368",
        glow: "rgba(245,158,11,0.12)",
        border: "rgba(245,158,11,0.2)",
        priority: "essential",
        why: "Complemento directo del proyector",
    },
    {
        id: 11,
        emoji: "💧",
        tag: "Infraestructura · Ancestralis",
        title: "Bomba de Agua Periférica APM37",
        subtitle: "0.5 HP · Aquastrong",
        desc: "Esencial para el sistema de agua del proyecto en Isla Fuerte. Sin esto no hay presión estable.",
        specs: ["0.5 HP", "Periférica", "Aquastrong"],
        store: "Homecenter",
        url: "https://www.homecenter.com.co/homecenter-co/product/775525/bomba-de-agua-periferica-apm37-05hp-aquastrong/775525/",
        glow: "rgba(59,130,246,0.12)",
        border: "rgba(59,130,246,0.2)",
        priority: "essential",
        why: "Agua con presión para todo el campamento",
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
        priority: "upgrade",
        why: "Estructura base de las instalaciones",
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

// ─── Wishlist Card ─────────────────────────────────────────────────────────────

const PRIORITY_STYLES = {
    essential: {
        bar:    "bg-rose-500",
        badge:  { background: "rgba(244,63,94,0.15)", color: "#fb7185", border: "1px solid rgba(244,63,94,0.25)" },
        label:  "Essential",
        dot:    "bg-rose-400",
    },
    upgrade: {
        bar:    "bg-amber-500",
        badge:  { background: "rgba(245,158,11,0.15)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.25)" },
        label:  "Upgrade",
        dot:    "bg-amber-400",
    },
    nice: {
        bar:    "bg-sky-500",
        badge:  { background: "rgba(56,189,248,0.12)", color: "#7dd3fc", border: "1px solid rgba(56,189,248,0.2)" },
        label:  "Nice to have",
        dot:    "bg-sky-400",
    },
};

function WishlistCard({ item }: { item: WishlistItem }) {
    const p = PRIORITY_STYLES[item.priority];
    return (
        <div
            className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
            style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${item.border}` }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 48px -8px ${item.glow}, 0 0 0 1px ${item.border}`; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
        >
            {/* Emoji hero */}
            <div
                className="relative flex items-center justify-center h-36"
                style={{
                    background: `linear-gradient(160deg, ${item.glow} 0%, rgba(255,255,255,0.015) 100%)`,
                    borderBottom: `1px solid ${item.border}`,
                }}
            >
                <span className="text-5xl drop-shadow-sm">{item.emoji}</span>
                <span
                    className={`absolute top-3 right-3 h-2 w-2 rounded-full ${p.dot} opacity-80`}
                />
            </div>

            <div className="flex flex-col flex-1 p-5">
                <span
                    className="self-start rounded-full px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wide mb-3"
                    style={p.badge}
                >
                    {p.label}
                </span>

                <h3 className="font-display text-base font-bold text-white leading-snug mb-0.5">{item.title}</h3>
                <p className="text-[11px] font-mono mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>{item.subtitle}</p>
                <p className="text-[11px] italic mb-3" style={{ color: "rgba(255,255,255,0.38)" }}>{item.why}</p>

                <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>{item.desc}</p>

                <ul className="mb-5 space-y-1.5">
                    {item.specs.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-[11px] font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>
                            <span className={`h-1 w-1 rounded-full ${p.dot} shrink-0 opacity-70`} />
                            {s}
                        </li>
                    ))}
                </ul>

                <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all active:scale-95 hover:-translate-y-0.5"
                    style={{ background: item.glow, border: `1px solid ${item.border}`, color: "rgba(255,255,255,0.8)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.8)"; }}
                >
                    <IconHeart className="h-3.5 w-3.5" />
                    Gift · {item.store}
                    <IconExternal className="h-3 w-3 opacity-50" />
                </a>
            </div>
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
                    <a href={HOME} className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                    >
                        ← Home
                    </a>
                </nav>
            </header>

            {/* Hero */}
            <section className="relative overflow-hidden px-6 pt-36 pb-16">
                <div
                    className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full"
                    style={{ background: "radial-gradient(ellipse, rgba(245,158,11,0.1) 0%, transparent 70%)" }}
                />
                <div className="relative mx-auto max-w-3xl text-center">
                    <div
                        className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono font-medium"
                        style={{ background: "rgba(251,146,60,0.08)", border: "1px solid rgba(251,146,60,0.2)", color: "#fb923c" }}
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                        Ancestralis House · Isla Fuerte
                    </div>
                    <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-white">
                        Help build
                        <br />
                        <span style={{ color: "#f59e0b" }}>the house.</span>
                    </h1>
                    <p className="mt-6 max-w-lg mx-auto text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                        These are physical items that go directly into Ancestralis House. Click any card to gift it straight from the store.
                    </p>
                </div>
            </section>

            {/* Wishlist */}
            <section className="px-6 pb-28 pt-8">
                <div className="mx-auto max-w-5xl">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {wishlist.map((item) => (
                            <WishlistCard key={item.id} item={item} />
                        ))}
                    </div>
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
