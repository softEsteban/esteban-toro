"use client";

import { useState } from "react";

const GALLERY_IMAGES = [
    {
        src: "/gallery/infographic_system_design_setup.png",
        title: "System Design Setup",
        tag: "Infographic",
    },
    {
        src: "/gallery/print_mystical_farm_spot.png",
        title: "Mystical Farm Spot",
        tag: "Print",
    },
    {
        src: "/gallery/print_mystical_river_spot.png",
        title: "Mystical River Spot",
        tag: "Print",
    },
    {
        src: "/gallery/wallpaper_working_desktop.png",
        title: "Working Desktop",
        tag: "Wallpaper",
    },
];

function LightboxModal({
    image,
    onClose,
}: {
    image: (typeof GALLERY_IMAGES)[number];
    onClose: () => void;
}) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="relative max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-stone-400 hover:text-white transition-colors text-sm"
                >
                    ✕ close
                </button>
                <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-auto rounded-xl shadow-2xl"
                />
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

export default function AestheticsPage() {
    const [lightbox, setLightbox] = useState<(typeof GALLERY_IMAGES)[number] | null>(null);

    return (
        <main
            className="min-h-screen antialiased"
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
                .fade-up { animation: fadeUp 0.5s ease both; }
            `}</style>

            {/* Nav */}
            <header className="fixed inset-x-0 top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-stone-800/60">
                <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
                    <a href="/" className="font-display text-base font-bold tracking-tight text-white">
                        et<span className="text-amber-500">.</span>
                    </a>
                    <div className="flex items-center gap-4 text-sm text-stone-400">
                        <a href="/" className="hover:text-white transition-colors">Home</a>
                        <a href="/products" className="hover:text-white transition-colors">Products</a>
                        <span className="text-violet-400 font-medium">Aesthetics</span>
                    </div>
                </nav>
            </header>

            {/* Hero */}
            <section className="pt-32 pb-16 px-6 relative">
                <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/4 translate-x-1/4 rounded-full bg-violet-500/8 blur-[140px]" />
                <div className="relative mx-auto max-w-5xl">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                        Creations
                    </div>
                    <h1 className="font-display text-5xl font-bold text-white leading-tight sm:text-6xl">
                        Aesthetics
                    </h1>
                    <p className="mt-4 text-stone-400 leading-relaxed max-w-md">
                        A canvas of visual explorations — prints, wallpapers, and graphic work.
                    </p>
                </div>
            </section>

            {/* Gallery grid */}
            <section className="px-6 pb-24">
                <div className="mx-auto max-w-5xl columns-1 sm:columns-2 lg:columns-2 gap-5 space-y-5">
                    {GALLERY_IMAGES.map((img, i) => (
                        <div
                            key={img.src}
                            className="fade-up group relative break-inside-avoid cursor-zoom-in overflow-hidden rounded-2xl border border-stone-800 bg-stone-900"
                            style={{ animationDelay: `${i * 0.08}s` }}
                            onClick={() => setLightbox(img)}
                        >
                            <img
                                src={img.src}
                                alt={img.title}
                                className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 inset-x-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                <span className="rounded-full border border-violet-500/40 bg-violet-500/20 px-2.5 py-0.5 text-[10px] font-medium text-violet-300 mr-2">
                                    {img.tag}
                                </span>
                                <span className="text-xs font-medium text-white">{img.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-stone-800 px-6 py-8">
                <div className="mx-auto max-w-5xl flex items-center justify-between">
                    <span className="font-display text-sm font-bold text-white">
                        et<span className="text-amber-500">.</span>
                    </span>
                    <p className="text-xs text-stone-600">© {new Date().getFullYear()} Esteban Toro</p>
                </div>
            </footer>

            {lightbox && (
                <LightboxModal image={lightbox} onClose={() => setLightbox(null)} />
            )}
        </main>
    );
}
