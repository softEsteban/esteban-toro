"use client";

import { use } from "react";
import { notFound } from "next/navigation";

// ─── Config ───────────────────────────────────────────────────────────────────

const WHATSAPP_BASE = "https://wa.me/573045500182";

// ─── Product data (mirrors ProductsPage) ──────────────────────────────────────

const DETAIL_PRODUCTS = {
    "guide-quit-9-5": {
        id: "guide-quit-9-5",
        type: "guide",
        badge: "Guide",
        title: "Quit Your 9-5",
        tagline: "Prepare yourself to quit your 9-5",
        headline: "Your exit plan. Built around what actually works.",
        price: 29,
        priceLabel: "$29",
        description: `Most people don't quit their job because they don't have a plan — not because they lack the skills or the courage. This guide gives you the plan.

It's built around real income streams, not vague advice. You'll find out what you're already good at, how to turn that into offers people pay for, and how to build the audience that makes it sustainable — with AI as your unfair advantage.`,
        icon: "🏝️",
        gradient: "from-orange-600/20 via-orange-900/10 to-stone-950",
        badgeStyle: "border-orange-500/30 bg-orange-500/10 text-orange-400",
        glowStyle: "bg-orange-500/20",
        ctaPrimary: "bg-orange-500 hover:bg-orange-400 shadow-orange-500/20 text-white",
        accentText: "text-orange-400",
        sections: [
            {
                title: "What's inside",
                items: [
                    { icon: "🗺️", label: "Exit roadmap", desc: "A 6-month step-by-step plan to replace your salary, with milestones and checkpoints." },
                    { icon: "💰", label: "Income stream frameworks", desc: "Which income models work and why. Consulting, digital products, communities, and more — powered by AI." },
                    { icon: "📣", label: "Social media playbooks", desc: "How to grow on LinkedIn, X, and Instagram from zero. Platform-specific strategies that actually convert." },
                    { icon: "📖", label: "Real case studies", desc: "People who made the jump. What they did, what failed, and what finally worked." },
                    { icon: "📄", label: "Ready-to-use templates", desc: "Offer pages, outreach scripts, and client onboarding documents." },
                    { icon: "🤖", label: "AI leverage guide", desc: "Concrete ways to use AI to build faster, produce more content, and automate your systems." },
                ],
            },
        ],
        forWho: [
            "You're employed but feel the ceiling getting closer",
            "You want independence but don't know what to sell",
            "You've tried to 'build an audience' and it didn't go anywhere",
            "You're willing to do the work — you just need a clear sequence",
        ],
        notFor: [
            "People looking for a get-rich-quick scheme",
            "Anyone not willing to invest time in the first 1-3 months",
        ],
        testimonial: {
            quote: "I left my corporate job 4 months after following this sequence. The income stream framework was the thing that finally made it click.",
            author: "M.R., Medellin — ex-strategy consultant",
        },
    },
    "guide-5-books": {
        id: "guide-5-books",
        type: "guide",
        badge: "Guide",
        title: "The 5 Books Cheat Sheet",
        tagline: "From consumer to producer mindset",
        headline: "Five books. The ideas that actually stick.",
        price: 19,
        priceLabel: "$19",
        description: `Most people read books but don't change. Not because the books are bad — because reading without implementation is just entertainment.

This cheat sheet gives you the core idea from each book, why it matters, and exactly what to do with it. Five books that — if you actually apply them — permanently rewire how you think about work, time, money, and your identity.`,
        icon: "📚",
        gradient: "from-emerald-600/20 via-emerald-900/10 to-stone-950",
        badgeStyle: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
        glowStyle: "bg-emerald-500/20",
        ctaPrimary: "bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/20 text-white",
        accentText: "text-emerald-400",
        sections: [
            {
                title: "What's inside",
                items: [
                    { icon: "📖", label: "The core thesis of each book", desc: "Distilled to one page — no filler, no padding." },
                    { icon: "⚡", label: "The single most important idea", desc: "The thing that, once you get it, changes how you see the world." },
                    { icon: "🎯", label: "The exercise", desc: "One concrete exercise per book. Designed to produce a shift, not just insight." },
                    { icon: "🔄", label: "Mindset before / after", desc: "The exact mental shift each book produces — and how to know if it's worked for you." },
                    { icon: "🧭", label: "Reading order and sequencing", desc: "Which order produces the most compound effect. Which to revisit after 6 months." },
                    { icon: "✍️", label: "Implementation guide", desc: "How to apply all 5 books as a system — not a reading list, but a curriculum." },
                ],
            },
        ],
        forWho: [
            "You read books but struggle to apply what you learn",
            "You feel like you're consuming more than you're creating",
            "You want to shift from reactive to intentional",
            "You're in a season of building your identity, not just your skills",
        ],
        notFor: [
            "People looking for a book summary app — this is about doing, not reading",
            "Anyone who already has a strong producer identity and routine",
        ],
        testimonial: {
            quote: "The sequencing alone was worth it. I'd read 3 of the 5 books and didn't get them until I read them in the right order with these exercises.",
            author: "D.A., Buenos Aires — freelance designer",
        },
    },
    "agent-kit-service": {
        id: "agent-kit-service",
        type: "service",
        badge: "Done for You",
        title: "Agent Kit — Full Deployment",
        tagline: "I deploy. I set up. I make it live.",
        headline: "Your AI solution, built and launched by me.",
        price: null as number | null,
        priceLabel: "Custom pricing",
        description: `You have a use case. You know AI agents could solve it. But you don't want to spend weeks figuring out infrastructure, prompt engineering, and integrations.

I do this for you. I take the Agent Kit platform — which I built and run — and configure it entirely for your business. White-label or under your own domain. Connected to your data. Integrated with WhatsApp and web. Live within days.`,
        icon: "⚡",
        gradient: "from-violet-600/20 via-violet-900/10 to-stone-950",
        badgeStyle: "border-violet-500/30 bg-violet-500/10 text-violet-400",
        glowStyle: "bg-violet-500/20",
        ctaPrimary: "bg-violet-500 hover:bg-violet-400 shadow-violet-500/20 text-white",
        accentText: "text-violet-400",
        sections: [
            {
                title: "What's included",
                items: [
                    { icon: "🤖", label: "Custom agent build", desc: "Designed around your specific use case, trained on your language and context." },
                    { icon: "🏷️", label: "White-label or own-domain deploy", desc: "Your brand, your domain, your app. No 'Powered by Agent Kit' visible to your clients." },
                    { icon: "🧠", label: "Knowledge base setup", desc: "I import and structure your documents, FAQs, and product info so the agent knows your business." },
                    { icon: "💬", label: "WhatsApp + web integration", desc: "Your agent responds on WhatsApp and your website from day one." },
                    { icon: "🔧", label: "Custom behavior and logic", desc: "Tables, functions, conditional flows — built for what your agent actually needs to do." },
                    { icon: "🛡️", label: "30-day post-launch support", desc: "I stay available for fixes, tuning, and guidance for a month after go-live." },
                ],
            },
        ],
        forWho: [
            "Businesses that want AI agents but not an engineering team",
            "Founders who want to offer an AI layer to their clients",
            "Agencies looking to white-label an AI solution",
            "Teams that have a clear use case but no time to build",
        ],
        notFor: [
            "People still exploring whether they need an agent (start with Agent Kit subscription first)",
            "Projects that need complex custom software beyond agent workflows",
        ],
        testimonial: null as { quote: string; author: string } | null,
    },
} as const;

type SlugKey = keyof typeof DETAIL_PRODUCTS;

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

// ─── Detail Page ──────────────────────────────────────────────────────────────

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);

    if (!(slug in DETAIL_PRODUCTS)) {
        notFound();
    }

    const p = DETAIL_PRODUCTS[slug as SlugKey];

    const whatsappMsg =
        p.type === "guide"
            ? `Hola Esteban, quiero comprar "${p.title}" — ${p.priceLabel}`
            : `Hola Esteban, me interesa el servicio "${p.title}". ¿Podemos hablar?`;

    const whatsapp = `${WHATSAPP_BASE}?text=${encodeURIComponent(whatsappMsg)}`;

    return (
        <main className="min-h-screen antialiased bg-stone-950">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,400&family=DM+Sans:wght@400;500;600&display=swap');
                *, *::before, *::after { box-sizing: border-box; }
                body { font-family: 'DM Sans', system-ui, sans-serif; background-color: #0c0a09; }
                .font-display { font-family: 'Fraunces', Georgia, serif; }
                h1, h2, h3 { font-family: 'Fraunces', Georgia, serif; }
            `}</style>

            {/* Minimal nav */}
            <header className="fixed inset-x-0 top-0 z-30 bg-stone-950/95 backdrop-blur-md border-b border-stone-800/60">
                <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
                    <a href="/" className="font-display text-base font-bold tracking-tight text-white">
                        et<span className="text-amber-500">.</span>
                    </a>
                    <a href="/products" className="text-sm text-stone-400 hover:text-white transition-colors">
                        ← All products
                    </a>
                </nav>
            </header>

            {/* Hero */}
            <section className={`relative overflow-hidden bg-gradient-to-br ${p.gradient} pt-32 pb-16 px-6`}>
                <div className={`pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/3 rounded-full blur-[120px] ${p.glowStyle} opacity-40`} />
                <div className="relative mx-auto max-w-4xl">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${p.badgeStyle}`}>
                        {p.badge}
                    </span>
                    <h1 className="font-display mt-5 text-5xl font-bold text-white leading-tight sm:text-6xl">
                        {p.headline}
                    </h1>
                    <p className={`mt-2 text-base font-medium ${p.accentText}`}>{p.tagline}</p>
                    <p className="mt-5 text-lg leading-relaxed text-stone-300 max-w-2xl whitespace-pre-line">
                        {p.description}
                    </p>
                </div>
            </section>

            {/* Main content */}
            <div className="mx-auto max-w-4xl px-6 py-16 grid lg:grid-cols-[1fr_340px] gap-12 items-start">

                {/* Left: sections */}
                <div className="space-y-12">
                    {p.sections.map((section) => (
                        <div key={section.title}>
                            <h2 className="font-display text-2xl font-bold text-white mb-6">{section.title}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {section.items.map((item) => (
                                    <div
                                        key={item.label}
                                        className={`rounded-2xl border border-stone-800 ${p.glowStyle} bg-opacity-10 p-5 transition-colors hover:border-stone-700`}
                                    >
                                        <div className="mb-3 text-2xl">{item.icon}</div>
                                        <h3 className="text-sm font-semibold text-white">{item.label}</h3>
                                        <p className="mt-1 text-xs leading-relaxed text-stone-400">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* For who */}
                    <div>
                        <h2 className="font-display text-2xl font-bold text-white mb-6">Who this is for</h2>
                        <div className="space-y-3">
                            {p.forWho.map((f) => (
                                <div key={f} className="flex items-start gap-3">
                                    <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${p.glowStyle}`}>
                                        <IconCheck className="h-3 w-3 text-white" />
                                    </span>
                                    <p className="text-sm text-stone-300">{f}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-5 space-y-2.5">
                            {p.notFor.map((f) => (
                                <div key={f} className="flex items-start gap-3">
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-stone-800 text-stone-500 text-xs">✕</span>
                                    <p className="text-sm text-stone-500">{f}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Testimonial */}
                    {p.testimonial && (
                        <blockquote className={`rounded-2xl border border-stone-800 ${p.glowStyle} bg-opacity-5 p-6`}>
                            <p className="text-base leading-relaxed text-stone-300 italic">
                                &ldquo;{p.testimonial.quote}&rdquo;
                            </p>
                            <footer className={`mt-3 text-xs font-medium ${p.accentText}`}>
                                — {p.testimonial.author}
                            </footer>
                        </blockquote>
                    )}
                </div>

                {/* Right: sticky buy box */}
                <div className="lg:sticky lg:top-24">
                    <div className="rounded-3xl border border-stone-800 bg-stone-900/60 p-6 shadow-2xl shadow-black/40">
                        <div className="text-5xl mb-4 text-center">{p.icon}</div>
                        <h3 className="font-display text-xl font-bold text-white text-center">{p.title}</h3>
                        <p className={`text-sm text-center mt-1 ${p.accentText}`}>{p.tagline}</p>

                        <div className="mt-5 border-t border-stone-800 pt-5">
                            {p.price ? (
                                <div className="flex items-baseline justify-between mb-5">
                                    <span className="text-sm text-stone-400">Price</span>
                                    <span className="text-3xl font-bold text-white">${p.price}</span>
                                </div>
                            ) : (
                                <div className="mb-5 rounded-xl bg-stone-800/60 px-4 py-3 text-center">
                                    <p className="text-xs text-stone-500">Pricing</p>
                                    <p className="text-lg font-bold text-white mt-0.5">Custom per project</p>
                                </div>
                            )}

                            {p.type === "guide" ? (
                                <>
                                    <a
                                        href={whatsapp}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-full inline-flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-semibold shadow-lg transition-all active:scale-95 ${p.ctaPrimary}`}
                                    >
                                        Buy now — {p.priceLabel} <IconArrow className="h-3.5 w-3.5" />
                                    </a>
                                    <a
                                        href="/products"
                                        className="mt-2 w-full inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-stone-700 text-xs font-medium text-stone-400 hover:text-white hover:border-stone-600 transition-all"
                                    >
                                        ← Back to store
                                    </a>
                                </>
                            ) : (
                                <>
                                    <a
                                        href={whatsapp}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-full inline-flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-semibold shadow-lg transition-all active:scale-95 ${p.ctaPrimary}`}
                                    >
                                        Book a free call <IconArrow className="h-3.5 w-3.5" />
                                    </a>
                                    <a
                                        href="/products"
                                        className="mt-2 w-full inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-stone-700 text-xs font-medium text-stone-400 hover:text-white hover:border-stone-600 transition-all"
                                    >
                                        ← Back to store
                                    </a>
                                </>
                            )}
                        </div>

                        <div className="mt-5 space-y-2">
                            {["Secure via WhatsApp", "Response within 24h", "No commitment required"].map((t) => (
                                <div key={t} className="flex items-center gap-2 text-xs text-stone-500">
                                    <span className="h-1 w-1 rounded-full bg-stone-600" />
                                    {t}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-stone-800 px-6 py-8">
                <div className="mx-auto max-w-5xl flex items-center justify-between">
                    <a href="/" className="font-display text-sm font-bold text-white">
                        et<span className="text-amber-500">.</span>
                    </a>
                    <p className="text-xs text-stone-600">© {new Date().getFullYear()} Esteban Toro</p>
                </div>
            </footer>
        </main>
    );
}
