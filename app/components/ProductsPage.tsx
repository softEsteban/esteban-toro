"use client";

import { useState, useEffect, useRef } from "react";

// ─── Config ────────────────────────────────────────────────────────────────────

const WHATSAPP_BASE = "https://wa.me/573045500182";
const DAILI_URL = "https://www.dailiapp.co";
const AGENT_KIT_URL = "/agent-app";

// ─── Types ────────────────────────────────────────────────────────────────────

type ProductType = "subscription" | "guide" | "service";

interface CartItem {
    id: string;
    title: string;
    price: number;
}

// ─── Products ─────────────────────────────────────────────────────────────────

const PRODUCTS = [
    {
        id: "dailiapp",
        type: "subscription" as ProductType,
        badge: "Subscription",
        title: "DailiApp",
        tagline: "The Founder Life OS Path",
        description:
            "One place for tasks, habits, calendar, notes, and AI — fully integrated so nothing falls through the cracks while you build.",
        priceLabel: "From $9 / mo",
        features: [
            "Tasks + habits + calendar in one workspace",
            "AI Studio with Groq, Anthropic, OpenAI",
            "Workspaces for life, work, and side projects",
            "Notes with idea dump and markdown",
        ],
        href: DAILI_URL,
        external: true,
        buyable: false,
        slug: null as string | null,
        icon: "📅",
        gradient: "from-indigo-600/20 via-indigo-900/10 to-stone-950",
        badgeStyle: "border-indigo-500/30 bg-indigo-500/10 text-indigo-400",
        glowStyle: "bg-indigo-500/20",
        ctaPrimary: "bg-indigo-500 hover:bg-indigo-400 shadow-indigo-500/20 text-white",
        ctaSecondary: "border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10",
        accentText: "text-indigo-400",
        image: "/daili_app.png",
    },
    {
        id: "agent-kit",
        type: "subscription" as ProductType,
        badge: "Subscription",
        title: "Agent Kit",
        tagline: "The Agents OS Platform",
        description:
            "Deploy multiple AI agents from one platform — with knowledge bases, multi-provider LLMs, and WhatsApp out of the box. No assembly required.",
        priceLabel: "From $29 / mo",
        features: [
            "Multiple agents from a single dashboard",
            "Knowledge base trained on your own data",
            "OpenAI, Anthropic, Groq — swap anytime",
            "WhatsApp integration built in",
        ],
        href: AGENT_KIT_URL,
        external: false,
        buyable: false,
        slug: null as string | null,
        icon: "🤖",
        gradient: "from-amber-600/20 via-amber-900/10 to-stone-950",
        badgeStyle: "border-amber-500/30 bg-amber-500/10 text-amber-400",
        glowStyle: "bg-amber-500/20",
        ctaPrimary: "bg-amber-500 hover:bg-amber-400 shadow-amber-500/20 text-white",
        ctaSecondary: "border-amber-500/30 text-amber-400 hover:bg-amber-500/10",
        accentText: "text-amber-400",
        image: null as string | null,
    },
    {
        id: "guide-quit-9-5",
        type: "guide" as ProductType,
        badge: "Guide",
        title: "Quit Your 9-5",
        tagline: "Prepare yourself to quit your 9-5",
        description:
            "A complete exit plan — case studies, income stream frameworks, AI tools, and social playbooks to replace your salary on your terms.",
        priceLabel: "$29",
        price: 29,
        features: [
            "Step-by-step exit roadmap",
            "Income stream frameworks with AI",
            "LinkedIn, X, Instagram playbooks",
            "Templates and real case studies",
        ],
        href: null as string | null,
        external: false,
        buyable: true,
        slug: "guide-quit-9-5",
        icon: "🏝️",
        gradient: "from-orange-600/20 via-orange-900/10 to-stone-950",
        badgeStyle: "border-orange-500/30 bg-orange-500/10 text-orange-400",
        glowStyle: "bg-orange-500/20",
        ctaPrimary: "bg-orange-500 hover:bg-orange-400 shadow-orange-500/20 text-white",
        ctaSecondary: "border-orange-500/30 text-orange-400 hover:bg-orange-500/10",
        accentText: "text-orange-400",
        image: null as string | null,
    },
    {
        id: "guide-5-books",
        type: "guide" as ProductType,
        badge: "Guide",
        title: "The 5 Books Cheat Sheet",
        tagline: "From consumer to producer mindset",
        description:
            "The condensed lessons from 5 books that permanently shift your identity — from passive consumer to intentional creator who builds things that matter.",
        priceLabel: "$19",
        price: 19,
        features: [
            "Core principles distilled per book",
            "Actionable exercises and prompts",
            "Mindset shift framework",
            "Reading + implementation guide",
        ],
        href: null as string | null,
        external: false,
        buyable: true,
        slug: "guide-5-books",
        icon: "📚",
        gradient: "from-emerald-600/20 via-emerald-900/10 to-stone-950",
        badgeStyle: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
        glowStyle: "bg-emerald-500/20",
        ctaPrimary: "bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/20 text-white",
        ctaSecondary: "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10",
        accentText: "text-emerald-400",
        image: null as string | null,
    },
    {
        id: "agent-kit-service",
        type: "service" as ProductType,
        badge: "Done for You",
        title: "Agent Kit — Full Deployment",
        tagline: "I deploy. I set up. I make it live.",
        description:
            "I build and deploy your complete AI agent solution under your brand or domain — connected to your data, integrated with WhatsApp, and live within days.",
        priceLabel: "Custom",
        features: [
            "Custom agent built around your use case",
            "White-label or own-domain deployment",
            "Knowledge base setup and training",
            "WhatsApp + web channel integrations",
            "30-day post-launch support included",
        ],
        href: null as string | null,
        external: false,
        buyable: false,
        slug: "agent-kit-service",
        icon: "⚡",
        gradient: "from-violet-600/20 via-violet-900/10 to-stone-950",
        badgeStyle: "border-violet-500/30 bg-violet-500/10 text-violet-400",
        glowStyle: "bg-violet-500/20",
        ctaPrimary: "bg-violet-500 hover:bg-violet-400 shadow-violet-500/20 text-white",
        ctaSecondary: "border-violet-500/30 text-violet-400 hover:bg-violet-500/10",
        accentText: "text-violet-400",
        image: null as string | null,
    },
] as const;

type Product = typeof PRODUCTS[number];

// ─── Atoms ────────────────────────────────────────────────────────────────────

function IconArrow({ className = "h-4 w-4" }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
    );
}

function IconCheck({ className = "h-3.5 w-3.5" }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
    );
}

function IconX({ className = "h-4 w-4" }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
}

function IconShoppingBag({ className = "h-5 w-5" }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
        </svg>
    );
}

// ─── Cart Drawer ──────────────────────────────────────────────────────────────

function CartDrawer({
    items,
    open,
    onClose,
    onRemove,
}: {
    items: CartItem[];
    open: boolean;
    onClose: () => void;
    onRemove: (id: string) => void;
}) {
    const total = items.reduce((s, i) => s + i.price, 0);

    const handleCheckout = () => {
        if (items.length === 0) return;
        const list = items.map((i) => `• ${i.title} — $${i.price}`).join("\n");
        const msg = encodeURIComponent(
            `Hola Esteban, quiero comprar:\n${list}\n\nTotal: $${total}`
        );
        window.open(`${WHATSAPP_BASE}?text=${msg}`, "_blank");
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={onClose}
            />
            {/* Drawer */}
            <div
                className={`fixed right-0 top-0 z-50 h-full w-full max-w-sm bg-stone-950 border-l border-stone-800 flex flex-col transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-stone-800">
                    <div className="flex items-center gap-2.5">
                        <IconShoppingBag className="h-4.5 w-4.5 text-stone-300" />
                        <span className="font-semibold text-white text-sm">Cart</span>
                        {items.length > 0 && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
                                {items.length}
                            </span>
                        )}
                    </div>
                    <button onClick={onClose} className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-800 hover:text-white transition-colors">
                        <IconX className="h-4 w-4" />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                            <div className="h-16 w-16 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center text-2xl">
                                🛒
                            </div>
                            <p className="text-stone-400 text-sm">Your cart is empty.</p>
                            <p className="text-stone-600 text-xs">Add a guide to get started.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between rounded-xl border border-stone-800 bg-stone-900/60 px-4 py-3">
                                    <div>
                                        <p className="text-sm font-medium text-white">{item.title}</p>
                                        <p className="text-xs text-stone-500 mt-0.5">${item.price}</p>
                                    </div>
                                    <button
                                        onClick={() => onRemove(item.id)}
                                        className="text-stone-500 hover:text-red-400 transition-colors p-1 rounded"
                                    >
                                        <IconX className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-stone-800 px-6 py-5 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-stone-400">Total</span>
                        <span className="font-bold text-white">${total}</span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        disabled={items.length === 0}
                        className="w-full h-11 rounded-xl bg-amber-500 text-sm font-semibold text-white transition-all hover:bg-amber-400 active:scale-95 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-2"
                    >
                        Checkout via WhatsApp <IconArrow className="h-3.5 w-3.5" />
                    </button>
                    <p className="text-center text-[10px] text-stone-600">
                        You'll be redirected to WhatsApp to complete your order.
                    </p>
                </div>
            </div>
        </>
    );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────

function Navbar({
    cartCount,
    onOpenCart,
}: {
    cartCount: number;
    onOpenCart: () => void;
}) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    return (
        <header className={`fixed inset-x-0 top-0 z-30 transition-all duration-500 ${scrolled ? "bg-stone-950/95 backdrop-blur-md border-b border-stone-800/60 shadow-sm" : ""}`}>
            <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
                <a href="/" className="font-display text-base font-bold tracking-tight text-white">
                    et<span className="text-amber-500">.</span>
                </a>

                <div className="hidden items-center gap-1 md:flex">
                    {(["Subscriptions", "Guides", "Services"] as const).map((label) => (
                        <a
                            key={label}
                            href={`#${label.toLowerCase()}`}
                            className="rounded-lg px-3 py-1.5 text-sm font-medium text-stone-400 transition-all hover:bg-white/8 hover:text-white"
                        >
                            {label}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <a href="/" className="hidden md:block text-sm text-stone-500 hover:text-white transition-colors">
                        ← Home
                    </a>
                    <button
                        onClick={onOpenCart}
                        className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-stone-700 text-stone-400 hover:border-stone-500 hover:text-white transition-all"
                    >
                        <IconShoppingBag className="h-4 w-4" />
                        {cartCount > 0 && (
                            <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-white">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </nav>
        </header>
    );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
    return (
        <section className="relative overflow-hidden bg-stone-950 px-6 pt-32 pb-20">
            <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/3 translate-x-1/3 rounded-full bg-amber-500/8 blur-[140px]" />
            <div className="pointer-events-none absolute left-0 bottom-0 h-[400px] w-[400px] translate-y-1/3 -translate-x-1/3 rounded-full bg-indigo-500/6 blur-[120px]" />
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />
            <div className="relative mx-auto max-w-5xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-stone-700 bg-stone-800/80 px-3 py-1.5 text-xs font-medium text-stone-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                    Built by Esteban Toro
                </div>
                <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-tight tracking-tight text-white max-w-2xl">
                    Tools to build the life
                    <br />
                    <span className="text-stone-500">you actually want.</span>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-400">
                    Apps, guides, and done-for-you services. Each one closes the gap between where you are and what you&apos;re building.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                    {[
                        { label: "Subscriptions", href: "#subscriptions", color: "border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10" },
                        { label: "Guides", href: "#guides", color: "border-orange-500/30 text-orange-400 hover:bg-orange-500/10" },
                        { label: "Done for You", href: "#services", color: "border-violet-500/30 text-violet-400 hover:bg-violet-500/10" },
                    ].map((l) => (
                        <a
                            key={l.label}
                            href={l.href}
                            className={`inline-flex h-9 items-center rounded-full border px-4 text-xs font-semibold transition-all ${l.color}`}
                        >
                            {l.label}
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Section divider ──────────────────────────────────────────────────────────

function SectionLabel({ id, label }: { id: string; label: string }) {
    return (
        <div id={id} className="mx-auto max-w-5xl px-6 pt-16 pb-4">
            <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-stone-800" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600">{label}</span>
                <div className="h-px flex-1 bg-stone-800" />
            </div>
        </div>
    );
}

// ─── Subscription Card ────────────────────────────────────────────────────────

function SubscriptionCard({ product }: { product: Product }) {
    const p = product as typeof PRODUCTS[0];
    return (
        <div className={`group relative flex flex-col overflow-hidden rounded-3xl border border-stone-800 bg-gradient-to-br ${p.gradient} transition-all duration-300 hover:-translate-y-1 hover:border-stone-700 hover:shadow-2xl hover:shadow-black/40`}>
            {/* Glow */}
            <div className={`pointer-events-none absolute top-0 right-0 h-48 w-48 translate-x-1/3 -translate-y-1/3 rounded-full blur-[60px] ${p.glowStyle} opacity-50 group-hover:opacity-80 transition-opacity`} />

            {/* Image / visual header */}
            <div className="relative h-48 overflow-hidden">
                {p.image ? (
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover object-top opacity-50 group-hover:opacity-65 transition-opacity duration-300" />
                ) : (
                    <div className="flex h-full items-center justify-center text-7xl opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                        {p.icon}
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                <div className="absolute bottom-4 left-5">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${p.badgeStyle}`}>
                        {p.badge}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-6 pt-4">
                <h2 className="font-display text-2xl font-bold text-white">{p.title}</h2>
                <p className={`mt-0.5 text-sm font-medium ${p.accentText}`}>{p.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-stone-400 flex-1">{p.description}</p>

                <ul className="mt-5 space-y-2">
                    {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-xs text-stone-400">
                            <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${p.glowStyle}`}>
                                <IconCheck className="h-2.5 w-2.5 text-white" />
                            </span>
                            {f}
                        </li>
                    ))}
                </ul>

                <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs text-stone-500">{p.priceLabel}</span>
                </div>

                <a
                    href={p.href ?? "#"}
                    target={p.external ? "_blank" : undefined}
                    rel={p.external ? "noopener noreferrer" : undefined}
                    className={`mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold shadow-lg transition-all active:scale-95 ${p.ctaPrimary}`}
                >
                    Go to {p.title} <IconArrow className="h-3.5 w-3.5" />
                </a>
            </div>
        </div>
    );
}

// ─── Guide Card ───────────────────────────────────────────────────────────────

function GuideCard({
    product,
    onAddToCart,
    inCart,
}: {
    product: Product;
    onAddToCart: () => void;
    inCart: boolean;
}) {
    const p = product as typeof PRODUCTS[2];
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        onAddToCart();
        setAdded(true);
        setTimeout(() => setAdded(false), 1800);
    };

    return (
        <div className={`group relative flex flex-col overflow-hidden rounded-3xl border border-stone-800 bg-gradient-to-br ${p.gradient} transition-all duration-300 hover:-translate-y-1 hover:border-stone-700 hover:shadow-2xl hover:shadow-black/40`}>
            {/* Glow */}
            <div className={`pointer-events-none absolute top-0 right-0 h-40 w-40 translate-x-1/3 -translate-y-1/3 rounded-full blur-[50px] ${p.glowStyle} opacity-40 group-hover:opacity-70 transition-opacity`} />

            {/* Visual header */}
            <div className="relative flex h-40 items-center justify-center overflow-hidden">
                <div className="text-8xl opacity-15 group-hover:opacity-25 transition-opacity duration-300 select-none">{p.icon}</div>
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${p.badgeStyle}`}>
                        {p.badge}
                    </span>
                    <span className={`text-2xl font-bold ${p.accentText}`}>{p.priceLabel}</span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-6 pt-4">
                <h2 className="font-display text-xl font-bold text-white leading-snug">{p.title}</h2>
                <p className={`mt-0.5 text-xs font-medium ${p.accentText}`}>{p.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-stone-400 flex-1">{p.description}</p>

                <ul className="mt-4 space-y-1.5">
                    {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs text-stone-400">
                            <span className={`mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full ${p.glowStyle}`}>
                                <IconCheck className="h-2 w-2 text-white" />
                            </span>
                            {f}
                        </li>
                    ))}
                </ul>

                <div className="mt-5 flex gap-2">
                    <a
                        href={`/products/${p.slug}`}
                        className={`flex-1 inline-flex h-10 items-center justify-center rounded-xl border text-xs font-semibold transition-all active:scale-95 ${p.ctaSecondary}`}
                    >
                        View details
                    </a>
                    <button
                        onClick={handleAdd}
                        disabled={inCart}
                        className={`flex-1 inline-flex h-10 items-center justify-center gap-1.5 rounded-xl text-xs font-semibold shadow-md transition-all active:scale-95 ${inCart || added ? "bg-stone-700 text-stone-400 cursor-default" : p.ctaPrimary}`}
                    >
                        {inCart ? (
                            <>
                                <IconCheck className="h-3 w-3" /> In cart
                            </>
                        ) : added ? (
                            <>✓ Added</>
                        ) : (
                            <>Add to cart</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({ product }: { product: Product }) {
    const p = product as typeof PRODUCTS[4];
    const whatsapp = `${WHATSAPP_BASE}?text=${encodeURIComponent("Hola Esteban, me interesa el servicio de Agent Kit Full Deployment. ¿Podemos hablar?")}`;

    const process = [
        { step: "01", label: "Discovery call", desc: "We map your use case, data, and requirements." },
        { step: "02", label: "Build & integrate", desc: "Agent + knowledge base + channels configured." },
        { step: "03", label: "Deploy & go live", desc: "Your solution live under your brand in days." },
        { step: "04", label: "30-day support", desc: "Fixes, tweaks, and guidance post-launch." },
    ];

    return (
        <div className={`group relative overflow-hidden rounded-3xl border border-stone-800 bg-gradient-to-br ${p.gradient} transition-all duration-300 hover:border-stone-700 hover:shadow-2xl hover:shadow-black/40`}>
            <div className={`pointer-events-none absolute top-0 right-0 h-64 w-64 translate-x-1/4 -translate-y-1/4 rounded-full blur-[80px] ${p.glowStyle} opacity-40 group-hover:opacity-70 transition-opacity`} />

            <div className="relative grid lg:grid-cols-[1fr_1fr] gap-0">
                {/* Left */}
                <div className="p-8 lg:p-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className={`h-10 w-10 rounded-xl ${p.glowStyle} flex items-center justify-center text-lg`}>
                            {p.icon}
                        </div>
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${p.badgeStyle}`}>
                            {p.badge}
                        </span>
                    </div>
                    <h2 className="font-display text-3xl font-bold text-white leading-tight">{p.title}</h2>
                    <p className={`mt-1 text-sm font-medium ${p.accentText}`}>{p.tagline}</p>
                    <p className="mt-4 text-sm leading-relaxed text-stone-400 max-w-md">{p.description}</p>

                    <ul className="mt-6 space-y-2">
                        {p.features.map((f) => (
                            <li key={f} className="flex items-start gap-2.5 text-sm text-stone-400">
                                <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${p.glowStyle}`}>
                                    <IconCheck className="h-2.5 w-2.5 text-white" />
                                </span>
                                {f}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <a
                            href={whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex h-12 items-center gap-2 rounded-xl px-6 text-sm font-semibold shadow-lg transition-all active:scale-95 ${p.ctaPrimary}`}
                        >
                            Book a call <IconArrow className="h-3.5 w-3.5" />
                        </a>
                        <a
                            href={`/products/${p.slug}`}
                            className={`inline-flex h-12 items-center gap-2 rounded-xl border px-6 text-sm font-semibold transition-all active:scale-95 ${p.ctaSecondary}`}
                        >
                            Learn more
                        </a>
                    </div>
                </div>

                {/* Right — process */}
                <div className="border-t border-stone-800/60 lg:border-t-0 lg:border-l p-8 lg:p-10">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-600 mb-6">How it works</p>
                    <div className="space-y-5">
                        {process.map((s, i) => (
                            <div key={s.step} className="flex items-start gap-4">
                                <div className={`h-8 w-8 shrink-0 rounded-xl border border-stone-700 flex items-center justify-center text-[11px] font-bold ${p.accentText}`}>
                                    {s.step}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-stone-200">{s.label}</p>
                                    <p className="text-xs text-stone-500 mt-0.5">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={`mt-8 rounded-2xl border border-stone-700/50 ${p.glowStyle} p-4`}>
                        <p className="text-xs font-semibold text-stone-300 mb-1">Pricing</p>
                        <p className="text-sm text-stone-400 leading-relaxed">
                            Custom scoped per project. Starts with a free 30-min call — no commitment, no pressure.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
    return (
        <footer className="border-t border-stone-800 bg-stone-950 px-6 py-8">
            <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <a href="/" className="font-display text-sm font-bold text-white">
                    et<span className="text-amber-500">.</span>
                </a>
                <p className="text-xs text-stone-600">© {new Date().getFullYear()} Esteban Toro</p>
                <div className="flex gap-4 text-xs text-stone-500">
                    <a href="/" className="hover:text-white transition-colors">Home</a>
                    <a href={DAILI_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-medium text-indigo-400">DailiApp</a>
                    <a href={AGENT_KIT_URL} className="hover:text-white transition-colors font-medium text-amber-500">Agent Kit</a>
                </div>
            </div>
        </footer>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [cartOpen, setCartOpen] = useState(false);

    const addToCart = (product: Product) => {
        const p = product as typeof PRODUCTS[2];
        if (cart.find((i) => i.id === p.id)) return;
        setCart((prev) => [...prev, { id: p.id, title: p.title, price: (p as any).price ?? 0 }]);
        setCartOpen(true);
    };

    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((i) => i.id !== id));
    };

    const subscriptions = PRODUCTS.filter((p) => p.type === "subscription");
    const guides = PRODUCTS.filter((p) => p.type === "guide");
    const services = PRODUCTS.filter((p) => p.type === "service");

    return (
        <main className="min-h-screen antialiased bg-stone-950">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,400&family=DM+Sans:wght@400;500;600&display=swap');
                *, *::before, *::after { box-sizing: border-box; }
                body { font-family: 'DM Sans', system-ui, sans-serif; background-color: #0c0a09; }
                .font-display { font-family: 'Fraunces', Georgia, serif; }
                h1, h2, h3 { font-family: 'Fraunces', Georgia, serif; }
                html { scroll-behavior: smooth; }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .fade-up { animation: fadeUp 0.5s ease both; }
            `}</style>

            <Navbar cartCount={cart.length} onOpenCart={() => setCartOpen(true)} />
            <Hero />

            {/* Subscriptions */}
            <SectionLabel id="subscriptions" label="Subscriptions" />
            <div className="mx-auto max-w-5xl px-6 pb-6">
                <div className="grid sm:grid-cols-2 gap-5">
                    {subscriptions.map((p) => (
                        <div key={p.id} className="fade-up">
                            <SubscriptionCard product={p} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Guides */}
            <SectionLabel id="guides" label="Guides" />
            <div className="mx-auto max-w-5xl px-6 pb-6">
                <div className="grid sm:grid-cols-2 gap-5">
                    {guides.map((p) => (
                        <div key={p.id} className="fade-up">
                            <GuideCard
                                product={p}
                                onAddToCart={() => addToCart(p)}
                                inCart={!!cart.find((i) => i.id === p.id)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Services */}
            <SectionLabel id="services" label="Done for You" />
            <div className="mx-auto max-w-5xl px-6 pb-24">
                {services.map((p) => (
                    <div key={p.id} className="fade-up">
                        <ServiceCard product={p} />
                    </div>
                ))}
            </div>

            <Footer />

            <CartDrawer
                items={cart}
                open={cartOpen}
                onClose={() => setCartOpen(false)}
                onRemove={removeFromCart}
            />
        </main>
    );
}
