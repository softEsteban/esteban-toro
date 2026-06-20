"use client";

import { useState } from "react";

const GALLERY_IMAGES = [
    {
        kind: "image" as const,
        src: "/gallery/infographic_system_design_setup.png",
        title: "System Design Setup",
        tag: "Infographic",
    },
    {
        kind: "image" as const,
        src: "/gallery/print_mystical_farm_spot.png",
        title: "Mystical Farm Spot",
        tag: "Print",
    },
    {
        kind: "image" as const,
        src: "/gallery/print_mystical_river_spot.png",
        title: "Mystical River Spot",
        tag: "Print",
    },
    {
        kind: "image" as const,
        src: "/gallery/wallpaper_working_desktop.png",
        title: "Working Desktop",
        tag: "Wallpaper",
    },
];

const AESTHETIC_ENTRIES = [
    {
        kind: "entry" as const,
        filterTag: "Speculative",
        name: "Solarpunk",
        category: "Speculative / Optimistic",
        accent: "#4ade80",
        accentBg: "rgba(74,222,128,0.08)",
        accentBorder: "rgba(74,222,128,0.25)",
        description:
            "A movement and aesthetic that envisions a sustainable future built on renewable energy, community care, and radical ecological harmony. Merges Art Nouveau ornament with brass-pipe infrastructure, rooftop gardens cascading over glass towers, and public spaces reclaimed from cars. Solarpunk refuses dystopia — it insists the future can be earned, grown, and shared.",
        traits: ["Renewable energy", "Community gardens", "Art Nouveau", "Afrofuturism", "Decentralization"],
    },
    {
        kind: "entry" as const,
        filterTag: "Aesthetic",
        name: "Liminal Spaces",
        category: "Uncanny / Transitional",
        accent: "#fde68a",
        accentBg: "rgba(253,230,138,0.07)",
        accentBorder: "rgba(253,230,138,0.22)",
        description:
            "The photographic and architectural genre capturing spaces that exist between destinations — empty swimming pools at 3 a.m., fluorescent-lit hallways, hotel corridors nobody walks. Liminal imagery exploits the uncanny valley of place: familiar enough to recognize, empty enough to unsettle. The feeling of a world on pause.",
        traits: ["Empty corridors", "Fluorescent light", "Transitional architecture", "Nostalgia", "SCP-adjacent"],
    },
    {
        kind: "entry" as const,
        filterTag: "Aesthetic",
        name: "The Backrooms",
        category: "Found-Fiction / Horror",
        accent: "#fbbf24",
        accentBg: "rgba(251,191,36,0.07)",
        accentBorder: "rgba(251,191,36,0.22)",
        description:
            "Originating from a single 4chan image in 2019, The Backrooms expanded into an entire mythology of infinite office spaces: yellow walls, moist carpet, hum of fluorescent bulbs, and the constant sensation of being watched. To \"noclip\" out of reality is to fall into Level 0. The canon is crowdsourced, recursive, and inexhaustible.",
        traits: ["Yellow wallpaper", "Moist carpet", "Infinite rooms", "Found footage", "Collaborative fiction"],
    },
    {
        kind: "entry" as const,
        filterTag: "Sonic",
        name: "Lofi",
        category: "Sonic / Visual",
        accent: "#a78bfa",
        accentBg: "rgba(167,139,250,0.08)",
        accentBorder: "rgba(167,139,250,0.25)",
        description:
            "A genre that weaponizes imperfection — vinyl crackle, tape hiss, rain on glass. Visually anchored by the anime girl studying alone under a warm lamp, a cat on the windowsill, cities blurred through rain. Lofi aestheticizes focus, solitude, and productive melancholy. The music is designed to disappear into the background and become the texture of time.",
        traits: ["Vinyl crackle", "Rain & windows", "Warm amber light", "Productive solitude", "Cassette culture"],
    },
    {
        kind: "entry" as const,
        filterTag: "Speculative",
        name: "La Isla de las Rosas",
        category: "Micro-utopia / Maritime",
        accent: "#38bdf8",
        accentBg: "rgba(56,189,248,0.07)",
        accentBorder: "rgba(56,189,248,0.22)",
        description:
            "In 1968, engineer Giorgio Rosa built a steel platform seven miles off the Rimini coast and declared it the independent Republic of Rose Island — Insulo de la Rozoj — with Esperanto as its official language. The experiment lasted 55 days before the Italian navy demolished it. A parable about the desire to exit, to build something new from nothing, and the forces that resist it.",
        traits: ["Micronation", "Esperanto", "Self-determination", "Adriatic Sea", "Architecture as protest"],
    },
    {
        kind: "entry" as const,
        filterTag: "Film",
        name: "Waking Life",
        category: "Film / Rotoscope",
        accent: "#fb923c",
        accentBg: "rgba(251,146,60,0.07)",
        accentBorder: "rgba(251,146,60,0.22)",
        description:
            "Richard Linklater's 2001 rotoscoped film follows a dreamer drifting through conversations about free will, consciousness, and the nature of reality. Shot on video and painted over frame-by-frame, the technique makes every scene shiver at its edges — as though reality itself is undecided. It is a film about lucid dreaming that feels like one: beautiful, unstable, impossible to hold.",
        traits: ["Rotoscope animation", "Lucid dreaming", "Existentialism", "Austin TX", "Stream of consciousness"],
    },
    {
        kind: "entry" as const,
        filterTag: "Film",
        name: "2001: A Space Odyssey",
        category: "Film / Cosmic Horror",
        accent: "#c084fc",
        accentBg: "rgba(192,132,252,0.07)",
        accentBorder: "rgba(192,132,252,0.22)",
        description:
            "Kubrick's 1968 monolith is less a narrative than a meditation on the gap between human ambition and cosmic indifference. The match cut from bone to satellite — cinema's greatest edit — collapses 4 million years in a single frame. HAL 9000 speaks in the gentlest voice possible as he commits murder. The film ends not with an answer but with a giant eye, and a door.",
        traits: ["HAL 9000", "Match cut", "Slow cinema", "The Monolith", "Jupiter and Beyond the Infinite"],
    },
    {
        kind: "entry" as const,
        filterTag: "Film",
        name: "The Secret of Kells",
        category: "Film / Celtic Animation",
        accent: "#2dd4bf",
        accentBg: "rgba(45,212,191,0.07)",
        accentBorder: "rgba(45,212,191,0.22)",
        description:
            "Tomm Moore's 2009 animated film about a young monk in a medieval Irish monastery who helps illuminate the Book of Kells. The visual style is flat, geometric, and hypnotic — Celtic knotwork rendered as living things, forests as interlocking spirals, the eye of a cat as a labyrinth. The film treats illuminated manuscripts not as historical artifacts but as portals: art as a technology for containing light.",
        traits: ["Celtic knotwork", "Illuminated manuscripts", "Flat 2D animation", "Medieval Ireland", "Iona monastery", "Brendan the scribe"],
    },
    {
        kind: "entry" as const,
        filterTag: "Fantasy",
        name: "The Sidequest",
        category: "Fantasy / Naturalist",
        accent: "#fcd34d",
        accentBg: "rgba(252,211,77,0.07)",
        accentBorder: "rgba(252,211,77,0.22)",
        description:
            "The aesthetic of background characters who never got the main story. Gnomes who tend their gardens with the same devotion a hero brings to dragon-slaying. Wizards who set out for the capital three decades ago, got distracted by a particularly interesting mushroom, and just stayed. The sidequest is not a failure to find the main quest — it is the discovery that the main quest was always beside the point. Life at the margins of the map, where the forest is dense and the errands are small and everything matters enormously.",
        traits: ["Gnomes", "Wandering wizards", "Herb alchemy", "Mushroom cottages", "NPC backstories", "Perpetual sidequests"],
    },
];

const FILTERS = ["All", "Aesthetic", "Speculative", "Film", "Sonic", "Fantasy"] as const;
type Filter = (typeof FILTERS)[number];

const ITEMS = [
    AESTHETIC_ENTRIES[0],
    GALLERY_IMAGES[0],
    GALLERY_IMAGES[1],
    AESTHETIC_ENTRIES[1],
    AESTHETIC_ENTRIES[2],
    GALLERY_IMAGES[2],
    AESTHETIC_ENTRIES[3],
    GALLERY_IMAGES[3],
    AESTHETIC_ENTRIES[4],
    AESTHETIC_ENTRIES[5],
    AESTHETIC_ENTRIES[6],
    AESTHETIC_ENTRIES[7],
    AESTHETIC_ENTRIES[8],
];

type ImageItem = (typeof GALLERY_IMAGES)[number];
type EntryItem = (typeof AESTHETIC_ENTRIES)[number];

function LightboxModal({ image, onClose }: { image: ImageItem; onClose: () => void }) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-stone-400 hover:text-white transition-colors text-sm"
                >
                    close
                </button>
                <img src={image.src} alt={image.title} className="w-full h-auto rounded-xl shadow-2xl" />
                <div className="mt-4 flex items-center gap-3">
                    <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400">
                        {image.tag}
                    </span>
                    <p className="text-sm font-medium text-stone-300">{image.title}</p>
                </div>
            </div>
        </div>
    );
}

function EntryCard({
    entry,
    index,
    onHover,
    onLeave,
}: {
    entry: EntryItem;
    index: number;
    onHover: (accent: string) => void;
    onLeave: () => void;
}) {
    return (
        <div
            className="fade-up break-inside-avoid rounded-2xl border overflow-hidden transition-all duration-300 hover:scale-[1.015] hover:shadow-2xl"
            style={{
                backgroundColor: entry.accentBg,
                borderColor: entry.accentBorder,
                animationDelay: `${index * 0.06}s`,
            }}
            onMouseEnter={() => onHover(entry.accent)}
            onMouseLeave={onLeave}
        >
            <div className="h-0.5 w-full transition-all duration-300" style={{ backgroundColor: entry.accent }} />

            <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <span
                        className="text-[10px] font-semibold tracking-widest uppercase"
                        style={{ color: entry.accent }}
                    >
                        Aesthetics Wiki
                    </span>
                    <span className="text-stone-600 text-[10px]">·</span>
                    <span className="text-[10px] text-stone-500 tracking-wide">{entry.category}</span>
                </div>

                <h2 className="font-display text-2xl font-bold leading-tight mb-3" style={{ color: entry.accent }}>
                    {entry.name}
                </h2>

                <div className="h-px bg-stone-800 mb-4" />

                <p className="text-sm text-stone-300 leading-relaxed">{entry.description}</p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                    {entry.traits.map((t) => (
                        <span
                            key={t}
                            className="text-[10px] px-2 py-0.5 rounded-full border font-medium"
                            style={{
                                color: entry.accent,
                                borderColor: entry.accentBorder,
                                backgroundColor: "rgba(0,0,0,0.3)",
                            }}
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ImageCard({ image, index, onClick }: { image: ImageItem; index: number; onClick: () => void }) {
    return (
        <div
            className="fade-up group relative break-inside-avoid cursor-zoom-in overflow-hidden rounded-2xl border border-stone-800 bg-stone-900"
            style={{ animationDelay: `${index * 0.06}s` }}
            onClick={onClick}
        >
            <img
                src={image.src}
                alt={image.title}
                className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 inset-x-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="rounded-full border border-violet-500/40 bg-violet-500/20 px-2.5 py-0.5 text-[10px] font-medium text-violet-300 mr-2">
                    {image.tag}
                </span>
                <span className="text-xs font-medium text-white">{image.title}</span>
            </div>
        </div>
    );
}

export default function AestheticsPage() {
    const [lightbox, setLightbox] = useState<ImageItem | null>(null);
    const [activeFilter, setActiveFilter] = useState<Filter>("All");
    const [ambientAccent, setAmbientAccent] = useState<string | null>(null);

    const filteredItems =
        activeFilter === "All"
            ? ITEMS
            : ITEMS.filter(
                  (item) => item.kind === "image" || (item.kind === "entry" && item.filterTag === activeFilter),
              );

    return (
        <main
            className="min-h-screen antialiased relative"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif", backgroundColor: "#0c0a09" }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,400&family=DM+Sans:wght@400;500;600&display=swap');
                *, *::before, *::after { box-sizing: border-box; }
                .font-display { font-family: 'Fraunces', Georgia, serif; }
                h1, h2, h3 { font-family: 'Fraunces', Georgia, serif; }
                html { scroll-behavior: smooth; }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .fade-up { animation: fadeUp 0.45s ease both; }
            `}</style>

            {/* Ambient glow layer */}
            <div
                className="pointer-events-none fixed inset-0 z-0 transition-all duration-700 ease-out"
                style={{
                    background: ambientAccent
                        ? `radial-gradient(ellipse 70% 50% at 50% 10%, ${ambientAccent}1a 0%, transparent 75%)`
                        : "transparent",
                }}
            />

            {/* Nav */}
            <header className="fixed inset-x-0 top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-stone-800/60">
                <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
                    <a href="/" className="font-display text-base font-bold tracking-tight text-white">
                        et<span className="text-amber-500">.</span>
                    </a>
                    <div className="flex items-center gap-4 text-sm text-stone-400">
                        <a href="/" className="hover:text-white transition-colors">
                            Home
                        </a>
                        <a href="/products" className="hover:text-white transition-colors">
                            Products
                        </a>
                        <span className="text-violet-400 font-medium">Aesthetics</span>
                    </div>
                </nav>
            </header>

            {/* Hero */}
            <section className="pt-32 pb-12 px-6 relative z-10">
                <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/4 translate-x-1/4 rounded-full bg-violet-500/8 blur-[140px]" />
                <div className="relative mx-auto max-w-5xl">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                        Creations
                    </div>
                    <h1 className="font-display text-5xl font-bold text-white leading-tight sm:text-6xl">Aesthetics</h1>
                    <p className="mt-4 text-stone-400 leading-relaxed max-w-md">
                        A canvas of visual explorations — prints, wallpapers, and a personal encyclopedia of styles that
                        shape the way I see.
                    </p>
                </div>
            </section>

            {/* Filter tabs */}
            <section className="px-6 pb-8 relative z-10">
                <div className="mx-auto max-w-5xl">
                    <div className="flex gap-2 flex-wrap">
                        {FILTERS.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border"
                                style={
                                    activeFilter === filter
                                        ? {
                                              backgroundColor: ambientAccent ?? "#8b5cf6",
                                              borderColor: ambientAccent ?? "#8b5cf6",
                                              color: "#0c0a09",
                                          }
                                        : {
                                              backgroundColor: "transparent",
                                              borderColor: "rgba(255,255,255,0.08)",
                                              color: "#a8a29e",
                                          }
                                }
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Grid */}
            <section className="px-6 pb-24 relative z-10">
                <div key={activeFilter} className="mx-auto max-w-5xl columns-1 sm:columns-2 gap-5 space-y-5">
                    {filteredItems.map((item, i) =>
                        item.kind === "image" ? (
                            <ImageCard key={item.src} image={item} index={i} onClick={() => setLightbox(item)} />
                        ) : (
                            <EntryCard
                                key={item.name}
                                entry={item}
                                index={i}
                                onHover={setAmbientAccent}
                                onLeave={() => setAmbientAccent(null)}
                            />
                        ),
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-stone-800 px-6 py-8 relative z-10">
                <div className="mx-auto max-w-5xl flex items-center justify-between">
                    <span className="font-display text-sm font-bold text-white">
                        et<span className="text-amber-500">.</span>
                    </span>
                    <p className="text-xs text-stone-600">© {new Date().getFullYear()} Esteban Toro</p>
                </div>
            </footer>

            {lightbox && <LightboxModal image={lightbox} onClose={() => setLightbox(null)} />}
        </main>
    );
}
