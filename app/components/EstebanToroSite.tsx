"use client";

import { useState, useEffect, useRef } from "react";

// ─── Config ────────────────────────────────────────────────────────────────────
const WHATSAPP = "https://wa.me/573045500182?text=Hola%20Esteban%2C%20quiero%20hablar%20sobre%20un%20proyecto";
const GITHUB = "https://github.com/softEsteban";
const LINKEDIN = "https://linkedin.com/in/esteban-toro-63517b204";
const EMAIL = "mailto:hola@estebantoro.dev";

// ─── Types ─────────────────────────────────────────────────────────────────────
type NavItem = { label: string; href: string };

// ─── Reusable Atoms ────────────────────────────────────────────────────────────

function Dot({ color = "bg-emerald-400" }: { color?: string }) {
    return <span className={`inline-block h-1.5 w-1.5 rounded-full ${color}`} />;
}

function Tag({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center rounded-md border border-stone-200 bg-stone-50 px-2 py-0.5 text-[11px] font-medium text-stone-500">
            {children}
        </span>
    );
}

function SectionHeading({ label, title, subtitle }: { label: string; title: React.ReactNode; subtitle?: string }) {
    return (
        <div className="mb-14">
            <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-stone-400">
                <Dot /> {label}
            </p>
            <h2 className="font-display text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">{title}</h2>
            {subtitle && <p className="mt-4 max-w-xl text-base text-stone-500 leading-relaxed">{subtitle}</p>}
        </div>
    );
}

function IconArrow({ className = "h-4 w-4" }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
    );
}

function IconExternal({ className = "h-3.5 w-3.5" }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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

    const links: NavItem[] = [
        { label: "Servicios", href: "#servicios" },
        { label: "Proyectos", href: "#proyectos" },
        { label: "Experiencia", href: "#experiencia" },
        { label: "Blog", href: "#blog" },
    ];

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#faf9f7]/90 backdrop-blur-md border-b border-stone-200/60 shadow-sm" : ""
                }`}
        >
            <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
                <a href="#" className="font-display text-base font-bold tracking-tight text-stone-900">
                    et<span className="text-amber-500">.</span>
                </a>

                {/* Desktop */}
                <div className="hidden items-center gap-6 md:flex">
                    {links.map((l) => (
                        <a key={l.href} href={l.href} className="text-sm text-stone-500 transition-colors hover:text-stone-900">
                            {l.label}
                        </a>
                    ))}
                </div>

                <div className="hidden items-center gap-2 md:flex">
                    <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-stone-900 px-3.5 text-xs font-semibold text-white transition-all hover:bg-stone-700 active:scale-95"
                    >
                        Hablemos
                    </a>
                </div>

                {/* Mobile toggle */}
                <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-1.5 p-1 md:hidden">
                    <span className={`block h-0.5 w-5 bg-stone-700 transition-all ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
                    <span className={`block h-0.5 w-5 bg-stone-700 transition-all ${menuOpen ? "opacity-0" : ""}`} />
                    <span className={`block h-0.5 w-5 bg-stone-700 transition-all ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
                </button>
            </nav>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="border-t border-stone-100 bg-[#faf9f7] px-6 pb-5 pt-4 md:hidden">
                    {links.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            onClick={() => setMenuOpen(false)}
                            className="block py-2.5 text-sm text-stone-600 hover:text-stone-900"
                        >
                            {l.label}
                        </a>
                    ))}
                    <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 flex h-9 w-full items-center justify-center rounded-lg bg-stone-900 text-xs font-semibold text-white"
                    >
                        Hablemos
                    </a>
                </div>
            )}
        </header>
    );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-[#faf9f7] px-6 pt-32 pb-20">
            {/* Grain overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundSize: "180px" }}
            />

            {/* Warm glow */}
            <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/4 translate-x-1/4 rounded-full bg-amber-100/60 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] translate-y-1/4 -translate-x-1/4 rounded-full bg-stone-200/80 blur-[100px]" />

            <div className="relative mx-auto max-w-5xl">
                <div className="grid lg:grid-cols-[1fr_340px] gap-16 items-center">
                    {/* Left */}
                    <div>
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-stone-500 shadow-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Disponible para proyectos · Cartagena, Colombia
                        </div>

                        <h1 className="font-display text-[clamp(2.6rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-tight text-stone-900">
                            Software Engineer
                            <br />
                            <span className="text-stone-400">&</span> AI Builder.
                        </h1>

                        <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-stone-500">
                            Building at the intersection of{" "}
                            <span className="font-medium text-stone-700">AI</span>,{" "}
                            <span className="font-medium text-stone-700">automation</span> and{" "}
                            <span className="font-medium text-stone-700">indie products</span>.
                            Currently shipping <span className="font-semibold text-amber-600">Daili App</span> and{" "}
                            <span className="font-semibold text-amber-600">agentrip.co</span> — and engineering AI platforms at{" "}
                            <span className="font-semibold text-stone-700">NeuralSeek</span>.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <a
                                href={WHATSAPP}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-11 items-center gap-2 rounded-xl bg-stone-900 px-5 text-sm font-semibold text-white shadow-md shadow-stone-900/10 transition-all hover:bg-stone-700 hover:shadow-lg active:scale-95"
                            >
                                Hablemos <IconArrow />
                            </a>
                            <a
                                href={GITHUB}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-11 items-center gap-2 rounded-xl border border-stone-200 bg-white px-5 text-sm font-semibold text-stone-700 shadow-sm transition-all hover:bg-stone-50 hover:border-stone-300 active:scale-95"
                            >
                                GitHub <IconExternal />
                            </a>
                        </div>

                        {/* Tech tags */}
                        <div className="mt-8 flex flex-wrap gap-2">
                            {["TypeScript", "Next.js", "NestJS", "Python", "PostgreSQL", "LLMs", "RPA", "NeuralSeek"].map((t) => (
                                <Tag key={t}>{t}</Tag>
                            ))}
                        </div>
                    </div>

                    {/* Right — identity card */}
                    <div className="hidden lg:block">
                        <div className="relative rounded-3xl border border-stone-200 bg-white p-6 shadow-xl shadow-stone-900/5">
                            {/* Photo placeholder */}
                            <div className="mb-5 flex items-center gap-4">
                                <div className="relative h-16 w-16 rounded-2xl border-2 border-stone-100 bg-gradient-to-br from-amber-100 to-stone-200 overflow-hidden flex items-center justify-center text-2xl shadow-sm">
                                    {/* Replace with: <img src="/esteban.jpg" className="h-full w-full object-cover" /> */}
                                    🧑‍💻
                                </div>
                                <div>
                                    <p className="font-display font-bold text-stone-900">Esteban Toro</p>
                                    <p className="text-xs text-stone-400">softEsteban</p>
                                </div>
                                <div className="ml-auto flex h-7 items-center gap-1 rounded-full bg-emerald-50 px-2.5 text-[11px] font-semibold text-emerald-600">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Open
                                </div>
                            </div>

                            <div className="space-y-2.5 text-sm">
                                {[
                                    { icon: "📍", val: "Isla Fuerte, Colombia" },
                                    { icon: "🏢", val: "NeuralSeek · TechD" },
                                    { icon: "🚀", val: "Daili App · agentrip.co" },
                                    { icon: "🎓", val: "Informatics Eng. @ UNIR" },
                                ].map((r) => (
                                    <div key={r.val} className="flex items-center gap-2.5 text-stone-500">
                                        <span className="text-base">{r.icon}</span>
                                        <span className="text-xs">{r.val}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 border-t border-stone-100 pt-4 flex gap-3">
                                <a href={GITHUB} target="_blank" rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-stone-200 py-2 text-xs font-medium text-stone-600 hover:bg-stone-50 transition-colors">
                                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                                    GitHub
                                </a>
                                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-stone-200 py-2 text-xs font-medium text-stone-600 hover:bg-stone-50 transition-colors">
                                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats bar */}
                <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {[
                        { val: "4+", label: "años de experiencia" },
                        { val: "3", label: "productos indie" },
                        { val: "2", label: "empresas tech actuales" },
                        { val: "10+", label: "stacks dominados" },
                    ].map((s) => (
                        <div key={s.label} className="rounded-2xl border border-stone-200 bg-white/80 px-5 py-4 shadow-sm">
                            <p className="font-display text-2xl font-bold text-stone-900">{s.val}</p>
                            <p className="mt-0.5 text-xs text-stone-400">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Services ─────────────────────────────────────────────────────────────────

function Services() {
    const services = [
        {
            emoji: "🤖",
            title: "Agentes de IA personalizados",
            desc: "Diseño e implementación de agentes con LLMs (Claude, GPT, NeuralSeek). RAG, memoria, workflows multi-agente y APIs propias. Desde POC hasta producción.",
            tags: ["Claude API", "NeuralSeek", "RAG", "Next.js"],
            cta: "Cotizar agente",
        },
        {
            emoji: "⚡",
            title: "Desarrollo freelance",
            desc: "Aplicaciones web full-stack con Next.js, NestJS y TypeScript. APIs REST robustas, bases de datos y deploys en Vercel o AWS. Código limpio, entregable rápido.",
            tags: ["Next.js", "NestJS", "PostgreSQL", "TypeScript"],
            cta: "Ver disponibilidad",
        },
        {
            emoji: "🔧",
            title: "Consultoría técnica en IA",
            desc: "Evaluación de tu stack actual, selección del LLM correcto, optimización de prompts y arquitectura de soluciones IA. Para equipos que quieren moverse con criterio.",
            tags: ["LLMs", "Prompt Engineering", "Architecture", "RAG"],
            cta: "Agendar sesión",
        },
        {
            emoji: "🎯",
            title: "Mentoría para devs",
            desc: "Sesiones 1:1 para developers que quieren entrar al mundo de la IA, mejorar su stack o lanzar su primer producto. Feedback directo, sin rodeos.",
            tags: ["1:1", "Career", "AI", "Product"],
            cta: "Ver disponibilidad",
        },
    ];

    return (
        <section id="servicios" className="bg-white px-6 py-24">
            <div className="mx-auto max-w-5xl">
                <SectionHeading
                    label="Servicios"
                    title={<>Lo que puedo<br />construir contigo.</>}
                    subtitle="Trabajo con founders, startups y equipos técnicos que quieren integrar IA de forma real y escalable."
                />

                <div className="grid gap-5 sm:grid-cols-2">
                    {services.map((s, i) => (
                        <div
                            key={i}
                            className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-[#faf9f7] p-7 transition-all duration-300 hover:border-stone-300 hover:shadow-lg hover:shadow-stone-900/5 hover:-translate-y-0.5"
                        >
                            <span className="mb-4 block text-3xl">{s.emoji}</span>
                            <h3 className="font-display text-lg font-bold text-stone-900">{s.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-stone-500">{s.desc}</p>

                            <div className="mt-4 flex flex-wrap gap-1.5">
                                {s.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                            </div>

                            <a
                                href={WHATSAPP}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-stone-900 transition-colors hover:text-amber-600"
                            >
                                {s.cta} <IconArrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                            </a>

                            {/* Subtle corner accent */}
                            <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 -translate-y-1/2 translate-x-1/2 rounded-full bg-amber-100/40 blur-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Products ─────────────────────────────────────────────────────────────────

function Products() {
    const products = [
        {
            name: "Daili App",
            tagline: "Tu sistema operativo personal",
            desc: "Productivity app para estructurar tareas, notas e ideas con workspaces, markdown y una capa de IA para no perder ningún output valioso. Built in public desde cero.",
            url: "https://daili-app-nu.vercel.app",
            status: "live",
            tags: ["Next.js", "TypeScript", "AI", "SaaS"],
            emoji: "📋",
        },
        {
            name: "agentrip.co",
            tagline: "Primer proyecto indie hacking",
            desc: "Plataforma de viajes potenciada con agentes de IA. Primer approach serio al indie hacking — construyendo públicamente con el stack que mejor domino.",
            url: "https://agentrip.co",
            status: "building",
            tags: ["Next.js", "Claude", "Agents", "Travel"],
            emoji: "✈️",
        },
        {
            name: "CV Builder",
            tagline: "Generador de CVs en PDF",
            desc: "Web app en Angular para generar CVs profesionales con pdfmake. Proyecto que explora generación de documentos estructurados desde JSON dinámico.",
            url: GITHUB,
            status: "open-source",
            tags: ["Angular", "pdfmake", "TypeScript"],
            emoji: "📄",
        },
        {
            name: "Chat App",
            tagline: "Real-time chat con SignalR",
            desc: "Aplicación de chat en tiempo real construida con Angular en el frontend y .NET Core + SignalR + MongoDB en el backend. Práctica de WebSockets y arquitectura real-time.",
            url: GITHUB,
            status: "open-source",
            tags: [".NET", "SignalR", "MongoDB", "Angular"],
            emoji: "💬",
        },
    ];

    const statusStyles: Record<string, { dot: string; text: string; label: string }> = {
        live: { dot: "bg-emerald-500", text: "text-emerald-600", label: "Live" },
        building: { dot: "bg-amber-400 animate-pulse", text: "text-amber-600", label: "Building" },
        "open-source": { dot: "bg-sky-400", text: "text-sky-600", label: "Open Source" },
    };

    return (
        <section id="proyectos" className="bg-[#faf9f7] px-6 py-24">
            <div className="mx-auto max-w-5xl">
                <SectionHeading
                    label="Productos"
                    title={<>Cosas que<br />he construido.</>}
                    subtitle="De la idea al deploy. Proyectos reales, con código público y aprendizajes genuinos."
                />

                <div className="grid gap-5 sm:grid-cols-2">
                    {products.map((p, i) => {
                        const s = statusStyles[p.status];
                        return (
                            <div
                                key={i}
                                className="group flex flex-col rounded-3xl border border-stone-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <span className="text-3xl">{p.emoji}</span>
                                    <span className={`flex items-center gap-1.5 rounded-full bg-stone-50 border border-stone-200 px-2.5 py-1 text-[11px] font-semibold ${s.text}`}>
                                        <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                                        {s.label}
                                    </span>
                                </div>

                                <h3 className="font-display text-xl font-bold text-stone-900">{p.name}</h3>
                                <p className="text-xs font-medium text-stone-400 mt-0.5">{p.tagline}</p>
                                <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-500">{p.desc}</p>

                                <div className="mt-4 flex flex-wrap gap-1.5">
                                    {p.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                                </div>

                                <a
                                    href={p.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-stone-900 transition-colors hover:text-amber-600"
                                >
                                    Ver proyecto <IconExternal className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// ─── Experience ────────────────────────────────────────────────────────────────

function Experience() {
    const roles = [
        {
            company: "NeuralSeek",
            role: "Software Engineer",
            period: "Mar 2025 – Present",
            type: "Full-time · Remote",
            location: "United States",
            highlights: [
                "Desarrollo de NeuralSeek: plataforma multi-agente, no-code y personalizable de IA",
                "Planificación de nuevas funcionalidades con el equipo de ingeniería",
                "Mantenimiento y actualización de documentación técnica",
            ],
            tags: ["PostgreSQL", "NeuralSeek", "AI Agents"],
            current: true,
        },
        {
            company: "TechD",
            role: "Analytics Developer",
            period: "Jun 2024 – Present",
            type: "Full-time · Remote",
            location: "United States",
            highlights: [
                "Desarrollo de aplicaciones web con IA usando Elastic Search como knowledge base",
                "Integración de NeuralSeek con motores de búsqueda, webapps y APIs",
                "+4 POCs y demos de soluciones IA para clientes reales",
                "Documentación de +14 funcionalidades en la documentación oficial de NeuralSeek",
                "Diseño de agentes de IA generativa y workflows automatizados",
            ],
            tags: ["NeuralSeek", "LLMs", "RAG", "ElasticSearch", "Prompt Engineering"],
            current: true,
        },
        {
            company: "Interactivo Grupo Marktel",
            role: "Data Science & Automation Analyst",
            period: "Feb 2023 – Jun 2024",
            type: "Full-time · Remote",
            location: "Bogotá, Colombia",
            highlights: [
                "+10 flujos RPA y bases de datos para automatizar procesamiento de datos con Python",
                "Colaboración con el equipo de BI para automatización de reportes",
                "2 soluciones web para automatizar tareas del negocio",
            ],
            tags: ["Python", "RPA", "BI", "Automation"],
            current: false,
        },
        {
            company: "TITANQ Ingeniería",
            role: "Fullstack Team Leader → Junior Dev",
            period: "Feb 2022 – Jan 2023",
            type: "Full-time · On-site",
            location: "Manizales, Colombia",
            highlights: [
                "Lideré equipo de 3+ devs backend y frontend",
                "+10 servicios API para conectar servicios y gestionar bases de datos",
                "Un proyecto llevado de cero a producción con éxito",
                "Implementación de Sonarqube para calidad de código",
            ],
            tags: [".NET", "Angular", "PostgreSQL", "C#"],
            current: false,
        },
        {
            company: "dataope.com",
            role: "Data Consultant",
            period: "Dec 2021 – Feb 2022",
            type: "Part-time · Remote",
            location: "Manizales, Colombia",
            highlights: [
                "Extracción de datos de +10 sitios web",
                "Estructuración de datos para el equipo de BI",
            ],
            tags: ["Web Scraping", "Excel", "Data"],
            current: false,
        },
    ];

    return (
        <section id="experiencia" className="bg-white px-6 py-24">
            <div className="mx-auto max-w-5xl">
                <SectionHeading
                    label="Experiencia"
                    title={<>De dónde viene<br />lo que sé.</>}
                    subtitle="4+ años construyendo software real, liderando equipos y diseñando soluciones de IA en producción."
                />

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-stone-100 sm:left-6" />

                    <div className="space-y-6">
                        {roles.map((r, i) => (
                            <div key={i} className="relative pl-12 sm:pl-16">
                                {/* Dot */}
                                <div className={`absolute left-[13px] top-5 h-3 w-3 rounded-full border-2 border-white shadow-sm sm:left-[19px] ${r.current ? "bg-amber-400" : "bg-stone-300"}`} />

                                <div className="rounded-2xl border border-stone-200 bg-[#faf9f7] p-6 transition-all hover:shadow-md hover:border-stone-300">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                        <div>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className="font-display font-bold text-stone-900">{r.company}</h3>
                                                {r.current && (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-600">
                                                        <span className="h-1 w-1 rounded-full bg-amber-500 animate-pulse" />
                                                        Activo
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm font-medium text-stone-600">{r.role}</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-xs font-medium text-stone-500">{r.period}</p>
                                            <p className="text-xs text-stone-400">{r.location}</p>
                                        </div>
                                    </div>

                                    <ul className="mt-3 space-y-1.5">
                                        {r.highlights.map((h, j) => (
                                            <li key={j} className="flex items-start gap-2 text-sm text-stone-500">
                                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-stone-300" />
                                                {h}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-4 flex flex-wrap gap-1.5">
                                        {r.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Education */}
                <div className="mt-16 grid sm:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-stone-200 bg-[#faf9f7] p-6">
                        <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">Educación</p>
                        <h4 className="font-display font-bold text-stone-900">Ingeniería Informática</h4>
                        <p className="text-sm text-stone-500">Fundación Universitaria UNIR</p>
                        <p className="text-xs text-stone-400 mt-1">Feb 2024 – Feb 2027</p>
                    </div>
                    <div className="rounded-2xl border border-stone-200 bg-[#faf9f7] p-6">
                        <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">Certificaciones</p>
                        <div className="space-y-2.5">
                            <div>
                                <p className="text-sm font-semibold text-stone-900">NeuralSeek Certification</p>
                                <p className="text-xs text-stone-400">NeuralSeek · Apr 2025</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-stone-900">Prompt Design in Vertex AI</p>
                                <p className="text-xs text-stone-400">Google · Apr 2025</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Blog ──────────────────────────────────────────────────────────────────────

function Blog() {
    const posts = [
        {
            date: "Feb 2025",
            tag: "Build in Public",
            title: "Cómo estructuro mi potencial con una app que construí yo mismo",
            excerpt: "Workspaces, Markdown, tareas y los outputs de IA que solemos perder. Una reflexión honesta sobre construir herramientas para uno mismo.",
            readTime: "4 min",
            emoji: "📋",
        },
        {
            date: "Ene 2025",
            tag: "Indie Hacking",
            title: "Lanzando Daili App: de la idea a producción en Vercel",
            excerpt: "El proceso completo de llevar un SaaS propio desde el primer commit hasta tener usuarios reales. Qué salió bien, qué salió mal y qué repetiría.",
            readTime: "6 min",
            emoji: "🚀",
        },
        {
            date: "Dic 2024",
            tag: "AI Engineering",
            title: "Memento Mori como herramienta de productividad",
            excerpt: "Recordar que la vida es finita tiene un efecto extraño: agudiza el foco en lugar de generar miedo. Así lo integré directamente en mi workflow.",
            readTime: "3 min",
            emoji: "💀",
        },
        {
            date: "Nov 2024",
            tag: "Tutorial",
            title: "Generación de PDFs en Angular con pdfmake desde JSON dinámico",
            excerpt: "Cómo estructurar documentos PDF complejos usando estructuras JSON en Angular. Walkthrough completo con ejemplos reales de CV Builder.",
            readTime: "8 min",
            emoji: "📄",
        },
    ];

    return (
        <section id="blog" className="bg-[#faf9f7] px-6 py-24">
            <div className="mx-auto max-w-5xl">
                <div className="flex items-end justify-between mb-14">
                    <SectionHeading
                        label="Blog"
                        title={<>Ideas que<br />vale compartir.</>}
                    />
                    <a
                        href={LINKEDIN}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-stone-500 hover:text-stone-900 transition-colors mb-14"
                    >
                        Ver todos <IconArrow />
                    </a>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    {posts.map((p, i) => (
                        <article
                            key={i}
                            className="group cursor-pointer rounded-3xl border border-stone-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-2xl">{p.emoji}</span>
                                <span className="rounded-full border border-stone-200 px-2.5 py-0.5 text-[11px] font-medium text-stone-400">
                                    {p.tag}
                                </span>
                            </div>

                            <h3 className="font-display font-bold text-stone-900 leading-snug group-hover:text-amber-700 transition-colors">
                                {p.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-stone-500 line-clamp-2">{p.excerpt}</p>

                            <div className="mt-5 flex items-center justify-between">
                                <div className="flex items-center gap-3 text-xs text-stone-400">
                                    <span>{p.date}</span>
                                    <span>·</span>
                                    <span>{p.readTime} lectura</span>
                                </div>
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-stone-400 group-hover:text-amber-600 transition-colors">
                                    Leer <IconArrow className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                                </span>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-6 text-center sm:hidden">
                    <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-500 hover:text-stone-900">
                        Ver todos los posts <IconArrow />
                    </a>
                </div>
            </div>
        </section>
    );
}

// ─── Final CTA ─────────────────────────────────────────────────────────────────

function Contact() {
    return (
        <section className="bg-stone-900 px-6 py-24 text-white">
            <div className="mx-auto max-w-4xl">
                <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
                    <div>
                        <p className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-stone-400">
                            <Dot color="bg-amber-400" /> Contacto
                        </p>
                        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                            ¿Construimos
                            <br />
                            algo juntos?
                        </h2>
                        <p className="mt-5 max-w-lg text-stone-400 leading-relaxed">
                            Estoy abierto a proyectos de IA, desarrollo freelance, consultoría y mentorías.
                            Si tienes una idea, un problema técnico o simplemente quieres hablar de tecnología —
                            escríbeme.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <a
                                href={WHATSAPP}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#25D366] px-5 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/20 transition-all hover:bg-[#1ebe5d] active:scale-95"
                            >
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp
                            </a>
                            <a
                                href={EMAIL}
                                className="inline-flex h-11 items-center gap-2 rounded-xl border border-stone-700 px-5 text-sm font-semibold text-stone-300 transition-all hover:border-stone-500 hover:text-white active:scale-95"
                            >
                                Email directo <IconArrow />
                            </a>
                        </div>
                    </div>

                    {/* Links card */}
                    <div className="rounded-2xl border border-stone-800 bg-stone-800/60 p-6 w-full lg:w-56">
                        <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-4">Encuéntrame en</p>
                        <div className="space-y-3">
                            {[
                                { label: "GitHub", handle: "@softEsteban", href: GITHUB, icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg> },
                                { label: "LinkedIn", handle: "Esteban Toro", href: LINKEDIN, icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
                            ].map((l) => (
                                <a
                                    key={l.label}
                                    href={l.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2.5 text-stone-400 transition-colors hover:text-white"
                                >
                                    {l.icon}
                                    <div>
                                        <p className="text-xs font-semibold text-stone-300">{l.label}</p>
                                        <p className="text-[11px] text-stone-500">{l.handle}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
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
                <span className="font-display text-sm font-bold text-stone-900">
                    et<span className="text-amber-500">.</span>
                </span>
                <p className="text-xs text-stone-400">
                    © {new Date().getFullYear()} Esteban Toro · Isla Fuerte, Colombia
                </p>
                <div className="flex gap-4 text-xs text-stone-400">
                    <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="hover:text-stone-700 transition-colors">GitHub</a>
                    <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-stone-700 transition-colors">LinkedIn</a>
                    <a href={EMAIL} className="hover:text-stone-700 transition-colors">Email</a>
                </div>
            </div>
        </footer>
    );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function EstebanToroSite() {
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

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        html {
          scroll-behavior: smooth;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        section {
          animation: fadeUp 0.6s ease both;
        }
      `}</style>

            <Navbar />
            <Hero />
            <Services />
            <Products />
            <Experience />
            <Blog />
            <Contact />
            <Footer />
        </main>
    );
}