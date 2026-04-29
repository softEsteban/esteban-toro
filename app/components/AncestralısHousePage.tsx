"use client";

const HOME = "/";
const WHATSAPP = "https://wa.me/573045500182?text=Hola%20Esteban%2C%20quiero%20saber%20m%C3%A1s%20sobre%20Ancestralis%20House";

function IconArrow({ className = "h-4 w-4" }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
    );
}

const pillars = [
    {
        icon: "🌿",
        title: "Nature first",
        desc: "Surrounded by jungle and sea in Isla Fuerte — a place where the environment is the architecture. No concrete towers, no noise, no rush.",
        accent: "bg-emerald-50 border-emerald-100",
    },
    {
        icon: "🍽️",
        title: "Real food",
        desc: "Fresh fish from the sea, local fruits, and slow-cooked meals. We eat well because everything else follows.",
        accent: "bg-amber-50 border-amber-100",
    },
    {
        icon: "🚶",
        title: "Move your body",
        desc: "Hiking trails, ocean swims, and morning walks. Physical movement is part of the daily rhythm, not a gym routine.",
        accent: "bg-blue-50 border-blue-100",
    },
    {
        icon: "💻",
        title: "Work that matters",
        desc: "High-speed internet, quiet zones, and a community that respects deep work. Build your business from one of the most beautiful spots in Colombia.",
        accent: "bg-stone-50 border-stone-100",
    },
    {
        icon: "🤝",
        title: "Real community",
        desc: "Not a co-working space with strangers — a curated group of builders, thinkers, and makers sharing meals, ideas, and momentum.",
        accent: "bg-rose-50 border-rose-100",
    },
    {
        icon: "🌊",
        title: "Island rhythm",
        desc: "Isla Fuerte operates on its own time. Slow mornings, long conversations, sunset swims. This is what balance actually looks like.",
        accent: "bg-cyan-50 border-cyan-100",
    },
];

export default function AncestralısHousePage() {
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
            <section className="relative min-h-screen overflow-hidden px-6 pt-36 pb-28 flex items-center">
                <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                        backgroundSize: "180px",
                    }}
                />
                <div className="pointer-events-none absolute right-0 top-0 h-[700px] w-[700px] -translate-y-1/4 translate-x-1/4 rounded-full bg-emerald-100/60 blur-[140px]" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] translate-y-1/4 -translate-x-1/4 rounded-full bg-amber-100/40 blur-[100px]" />

                <div className="relative mx-auto max-w-5xl w-full">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Isla Fuerte · Colombia · In progress
                    </div>

                    <h1 className="font-display text-[clamp(3rem,7vw,5.5rem)] font-bold leading-[1.0] tracking-tight text-stone-900 max-w-4xl">
                        Ancestralis House
                        <br />
                        <span className="text-emerald-600">Where nature meets</span>
                        <br />
                        <span className="text-stone-400">deep work.</span>
                    </h1>

                    <p className="mt-8 max-w-xl text-[1.1rem] leading-relaxed text-stone-500">
                        A digital nomads village in Isla Fuerte — where builders and thinkers come to do their best work,
                        surrounded by jungle, sea, real food, and a community that gets it.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <a
                            href={WHATSAPP}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-12 items-center gap-2 rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-500 hover:shadow-xl active:scale-95"
                        >
                            I want to visit <IconArrow />
                        </a>
                        <a
                            href="#what-is-it"
                            className="inline-flex h-12 items-center gap-2 rounded-xl border border-stone-200 bg-white px-6 text-sm font-semibold text-stone-700 shadow-sm transition-all hover:bg-stone-50 hover:border-stone-300 active:scale-95"
                        >
                            Learn more
                        </a>
                    </div>

                    <div className="mt-16 flex flex-wrap gap-3">
                        {["🏝️ Isla Fuerte", "🌿 Jungle & ocean", "🐟 Local food", "💻 Reliable internet", "🔆 Zero noise"].map((tag) => (
                            <div key={tag} className="flex items-center gap-2 rounded-full border border-stone-200 bg-white/80 px-4 py-2 text-sm text-stone-600 shadow-sm">
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What is it */}
            <section id="what-is-it" className="bg-white px-6 py-24">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-14">
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-stone-400">The vision</p>
                        <h2 className="font-display text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
                            Not a resort.
                            <br />
                            <span className="text-stone-400">Not a hostel.</span>
                        </h2>
                        <p className="mt-5 max-w-2xl text-lg text-stone-500 leading-relaxed">
                            Ancestralis House is a curated living and working experience in one of Colombia&apos;s most untouched islands.
                            It&apos;s for people who want to do serious work and live well at the same time — without choosing one over the other.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {pillars.map((p) => (
                            <div key={p.title} className={`rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${p.accent}`}>
                                <span className="text-3xl">{p.icon}</span>
                                <h3 className="font-display text-xl font-bold text-stone-900 mt-4 mb-2">{p.title}</h3>
                                <p className="text-sm text-stone-500 leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Isla Fuerte */}
            <section className="bg-[#faf9f7] px-6 py-24">
                <div className="mx-auto max-w-5xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-stone-400">The location</p>
                            <h2 className="font-display text-4xl font-bold text-stone-900 mb-5">
                                Isla Fuerte,
                                <br />
                                <span className="text-emerald-600">Colombia&apos;s hidden gem.</span>
                            </h2>
                            <p className="text-stone-500 leading-relaxed mb-6">
                                Off the Caribbean coast, Isla Fuerte is a small island with no cars, no crowds, and some of the
                                clearest water in the country. It&apos;s the kind of place that resets your nervous system.
                            </p>
                            <p className="text-stone-500 leading-relaxed">
                                Most people have never heard of it. The ones who find it, keep coming back.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { stat: "🏝️", label: "No cars on the island" },
                                { stat: "🐠", label: "Coral reef at your door" },
                                { stat: "🌴", label: "Tropical forest trails" },
                                { stat: "🌅", label: "Caribbean sunsets daily" },
                            ].map((item) => (
                                <div key={item.label} className="rounded-2xl border border-stone-200 bg-white p-5 text-center shadow-sm">
                                    <span className="text-3xl">{item.stat}</span>
                                    <p className="mt-2 text-xs font-medium text-stone-600 leading-snug">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-emerald-900 px-6 py-24 text-white relative overflow-hidden">
                <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/3 rounded-full bg-emerald-400/10 blur-[120px]" />
                <div className="relative mx-auto max-w-2xl text-center">
                    <h2 className="font-display text-4xl font-bold mb-5">Ready to join?</h2>
                    <p className="text-emerald-100/80 leading-relaxed mb-10 max-w-lg mx-auto">
                        Ancestralis House is being built right now. If you want to be among the first to visit, work from here,
                        or be part of the community — reach out.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a
                            href={WHATSAPP}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-7 text-sm font-semibold text-emerald-900 transition-all hover:bg-emerald-50 active:scale-95"
                        >
                            Get in touch <IconArrow />
                        </a>
                        <a
                            href="/support"
                            className="inline-flex h-12 items-center gap-2 rounded-xl border border-emerald-700 px-7 text-sm font-semibold text-emerald-100 transition-all hover:border-emerald-500 hover:text-white active:scale-95"
                        >
                            Support the project
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-emerald-950 bg-emerald-900 px-6 py-6">
                <div className="mx-auto max-w-5xl flex items-center justify-between">
                    <span className="font-display text-sm font-bold text-white">
                        et<span className="text-amber-400">.</span>
                    </span>
                    <p className="text-xs text-emerald-600">© {new Date().getFullYear()} Esteban Toro</p>
                </div>
            </footer>
        </main>
    );
}
