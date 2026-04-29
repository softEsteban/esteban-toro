"use client";

// IMPORTANT: Replace LEMON_SQUEEZY_URL with your actual Lemon Squeezy store URL
const LEMON_SQUEEZY_URL = "https://estebantoro.lemonsqueezy.com";
const HOME = "/";

const wishlist = [
    {
        id: 1,
        emoji: "📽️",
        title: "Proyector Mini Magcubic HY320",
        subtitle: "Ultra HD 4K · WiFi · Android · 12 000 lúmenes",
        desc: "Para montar un espacio de cine y presentaciones en Ancestralis House.",
        store: "Mercado Libre",
        url: "https://www.mercadolibre.com.co/proyector-mini-magcubic-hy320-ultra-hd-4k-wifi-android-12000-lumenes/p/MCO43935877",
        accent: "border-amber-100 bg-amber-50",
        badgeColor: "bg-amber-100 text-amber-700",
    },
    {
        id: 2,
        emoji: "💧",
        title: "Bomba de Agua Periférica APM37",
        subtitle: "0.5HP · Aquastrong",
        desc: "Esencial para el sistema de agua del proyecto en Isla Fuerte.",
        store: "Homecenter",
        url: "https://www.homecenter.com.co/homecenter-co/product/775525/bomba-de-agua-periferica-apm37-05hp-aquastrong/775525/",
        accent: "border-blue-100 bg-blue-50",
        badgeColor: "bg-blue-100 text-blue-700",
    },
    {
        id: 3,
        emoji: "🔩",
        title: "Tubo Rectangular Estructural HR50",
        subtitle: "90 × 50 × 20 mm · 6 m",
        desc: "Estructura metálica para las instalaciones del campamento digital.",
        store: "Homecenter",
        url: "https://www.homecenter.com.co/homecenter-co/product/13303/tubo-rectangular-90-x-50-x-20mm-x-6m-estructural-hr50/13303/",
        accent: "border-stone-100 bg-stone-50",
        badgeColor: "bg-stone-100 text-stone-700",
    },
];

function IconArrow({ className = "h-4 w-4" }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
    );
}

function IconHeart({ className = "h-5 w-5" }: { className?: string }) {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
    );
}

function IconExternalLink({ className = "h-4 w-4" }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
    );
}

export default function SupportPage() {
    return (
        <main
            className="min-h-screen antialiased bg-[#faf9f7]"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,800&family=DM+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', Georgia, serif; }
        h1,h2,h3 { font-family: 'Fraunces', Georgia, serif; }
      `}</style>

            {/* Navbar */}
            <header className="fixed inset-x-0 top-0 z-50 bg-[#faf9f7]/90 backdrop-blur-md border-b border-stone-200/60 shadow-sm">
                <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
                    <a href={HOME} className="font-display text-base font-bold tracking-tight text-stone-900">
                        et<span className="text-amber-500">.</span>
                    </a>
                    <a href={HOME} className="text-sm text-stone-500 hover:text-stone-900 transition-colors">
                        ← Back home
                    </a>
                </nav>
            </header>

            {/* Hero */}
            <section className="relative overflow-hidden px-6 pt-36 pb-20">
                <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/4 translate-x-1/4 rounded-full bg-amber-100/60 blur-[140px]" />
                <div className="relative mx-auto max-w-3xl text-center">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600">
                        <IconHeart className="h-3.5 w-3.5" />
                        Support my work
                    </div>

                    <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-tight tracking-tight text-stone-900">
                        If my work
                        <br />
                        <span className="text-amber-500">means something to you</span>
                    </h1>

                    <p className="mt-6 max-w-xl mx-auto text-lg leading-relaxed text-stone-500">
                        I build in public, write honestly, and share everything I learn. If you want to fuel that work —
                        a small contribution makes a bigger difference than you think.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href={LEMON_SQUEEZY_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-13 items-center justify-center gap-2.5 rounded-2xl bg-amber-500 px-8 text-sm font-semibold text-white shadow-lg shadow-amber-500/25 transition-all hover:bg-amber-400 hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
                        >
                            <IconHeart className="h-4 w-4" />
                            Support on Lemon Squeezy
                        </a>
                    </div>

                    <p className="mt-4 text-xs text-stone-400">Secure payment · One-time or recurring · Cancel anytime</p>
                </div>
            </section>

            {/* What your support does */}
            <section className="bg-white px-6 py-20">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-12 text-center">
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-stone-400">Your impact</p>
                        <h2 className="font-display text-3xl font-bold text-stone-900">What it goes towards</h2>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-5">
                        {[
                            { icon: "🖊️", title: "Writing & thinking", desc: "Long-form essays, frameworks, and ideas published freely for anyone." },
                            { icon: "🌿", title: "Ancestralis House", desc: "Building a digital nomads village in Isla Fuerte — infrastructure, tools, and community." },
                            { icon: "🤖", title: "Open experiments", desc: "AI projects, agent research, and tools I share before they become products." },
                        ].map((item) => (
                            <div key={item.title} className="rounded-2xl border border-stone-100 p-6 text-center">
                                <span className="text-3xl">{item.icon}</span>
                                <h3 className="mt-4 font-display font-bold text-stone-900">{item.title}</h3>
                                <p className="mt-2 text-sm text-stone-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Wishlist */}
            <section className="px-6 py-20 bg-[#faf9f7]">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-12">
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-stone-400">Gift an item</p>
                        <h2 className="font-display text-3xl font-bold text-stone-900">
                            Wish list
                        </h2>
                        <p className="mt-3 text-stone-500 leading-relaxed max-w-lg">
                            These are specific things that would directly accelerate the work — mostly for Ancestralis House.
                            If something resonates, you can buy it directly from the store.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {wishlist.map((item) => (
                            <div
                                key={item.id}
                                className={`flex items-start gap-6 rounded-2xl border p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${item.accent}`}
                            >
                                <span className="text-4xl shrink-0">{item.emoji}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <h3 className="font-display font-bold text-stone-900">{item.title}</h3>
                                        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${item.badgeColor}`}>
                                            {item.store}
                                        </span>
                                    </div>
                                    <p className="text-xs text-stone-400 font-medium mb-2">{item.subtitle}</p>
                                    <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
                                </div>
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="shrink-0 inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-stone-700 shadow-sm transition-all hover:bg-stone-50 hover:border-stone-300 active:scale-95"
                                >
                                    View <IconExternalLink className="h-3 w-3" />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA bottom */}
            <section className="bg-stone-900 px-6 py-20 text-white">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="font-display text-3xl font-bold mb-4">Thank you for being here.</p>
                    <p className="text-stone-400 leading-relaxed mb-8">
                        Whether you support financially or just follow the work — it matters.
                        Every reader, every fan, every conversation pushes this further.
                    </p>
                    <a
                        href={LEMON_SQUEEZY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-12 items-center gap-2 rounded-xl bg-amber-500 px-7 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-400 active:scale-95"
                    >
                        <IconHeart className="h-4 w-4" />
                        Support the work <IconArrow className="h-3.5 w-3.5" />
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-stone-800 bg-stone-900 px-6 py-6">
                <div className="mx-auto max-w-5xl flex items-center justify-between">
                    <span className="font-display text-sm font-bold text-white">
                        et<span className="text-amber-500">.</span>
                    </span>
                    <p className="text-xs text-stone-500">© {new Date().getFullYear()} Esteban Toro</p>
                </div>
            </footer>
        </main>
    );
}
