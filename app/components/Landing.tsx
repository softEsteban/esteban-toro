"use client";

import { track } from "@vercel/analytics";
import Image from "next/image";
import { useState, useEffect } from "react";

// ─── Reusable Components ───────────────────────────────────────────────────────

function Badge({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {children}
        </span>
    );
}

function Button({
    children,
    variant = "primary",
    size = "md",
    href,
    onClick,
}: {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    href?: string;
    onClick?: () => void;
}) {
    const base =
        "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

    const variants = {
        primary:
            "bg-zinc-900 text-white shadow-sm hover:bg-zinc-700 active:scale-[0.98]",
        secondary:
            "border border-zinc-200 bg-white text-zinc-800 shadow-sm hover:bg-zinc-50 hover:border-zinc-300 active:scale-[0.98]",
        ghost: "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100",
    };

    const sizes = {
        sm: "h-8 rounded-lg px-3 text-sm gap-1.5",
        md: "h-10 rounded-xl px-4 text-sm gap-2",
        lg: "h-12 rounded-xl px-6 text-base gap-2",
    };

    const className = `${base} ${variants[variant]} ${sizes[size]}`;

    if (href) {
        return (
            <a href={href} className={className}>
                {children}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    );
}

function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg
            className="h-4 w-4 text-emerald-600 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
            />
        </svg>
    );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
            {children}
        </p>
    );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-white/80 backdrop-blur-md border-b border-zinc-100 shadow-sm"
                    : "bg-transparent"
            }`}
        >
            <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-900 tracking-tight">
                    agent<span className="text-emerald-500">.</span>kit
                </span>
                <Button variant="secondary" size="sm" href="#cta">
                    Quiero esto
                </Button>
            </div>
        </header>
    );
}

function Hero() {
    return (
        <section className="relative pt-32 pb-24 px-6 overflow-hidden">
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                    backgroundSize: "48px 48px",
                }}
            />
            <div className="absolute top-20 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

            <div className="relative mx-auto max-w-4xl text-center">
                <Badge>Para builders que quieren vivir del código — no solo escribirlo</Badge>

                <h1 className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.05]">
                    Convierte tu conocimiento
                    <br />
                    <span className="relative inline-block">
                        en un producto de IA
                        <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-emerald-400 rounded-full" />
                    </span>
                    <br />
                    que trabaja por ti.
                </h1>

                <p className="mt-8 text-lg sm:text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
                    Un proyecto Next.js + Supabase listo para clonar, personalizar y vender.
                    Dashboard completo, Agent Studio y los tres LLMs integrados:{" "}
                    <strong className="text-zinc-700 font-medium">Claude</strong>,{" "}
                    <strong className="text-zinc-700 font-medium">ChatGPT</strong> y{" "}
                    <strong className="text-zinc-700 font-medium">Gemini</strong>.
                    Tú decides el agente. La infraestructura ya existe.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button
                        variant="primary"
                        size="lg"
                        href="#cta"
                        onClick={() => track("hero_cta_clicked")}
                    >
                        Quiero monetizar esto
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="lg" href="#que-incluye">
                        Ver qué incluye
                    </Button>
                </div>

                <p className="mt-5 text-sm text-zinc-400">
                    Pago único · Código 100% tuyo · Deploy desde cualquier parte del mundo
                </p>

                {/* Terminal */}
                <div className="mt-16 rounded-2xl border border-zinc-200 bg-zinc-950 text-left overflow-hidden shadow-2xl shadow-zinc-900/10 mx-auto max-w-2xl">
                    <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800">
                        <span className="h-3 w-3 rounded-full bg-red-500/70" />
                        <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                        <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
                        <span className="ml-2 text-xs text-zinc-500 font-mono">terminal — Bali, Indonesia</span>
                    </div>
                    <div className="px-5 py-4 font-mono text-sm leading-relaxed">
                        <p className="text-zinc-500">$ git clone agent-kit mi-saas-de-ia</p>
                        <p className="text-emerald-400 mt-1">✓ Proyecto clonado</p>
                        <p className="text-zinc-500 mt-1">$ cp .env.example .env.local</p>
                        <p className="text-zinc-500 mt-1">$ npm install && npm run dev</p>
                        <p className="text-emerald-400 mt-1">▲ Ready — Dashboard en localhost:3000</p>
                        <p className="text-zinc-500 mt-1">$ vercel --prod</p>
                        <p className="text-emerald-400 mt-1">✓ Production: https://mi-saas-de-ia.vercel.app</p>
                        <p className="text-zinc-400 mt-2 text-xs">💸 Primer cliente pagó mientras dormías.</p>
                        <p className="text-zinc-600 mt-1 flex items-center gap-1">
                            <span className="animate-pulse">█</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Problem() {
    const problems = [
        "Llevas semanas configurando integraciones, bases de datos y auth que ningún cliente va a valorar.",
        "Cobras por hora cuando podrías tener un producto que genera ingresos mientras duermes.",
        "Cada proyecto de agentes empieza desde cero: mismas tablas, mismas APIs, mismos errores.",
        "Tienes el conocimiento para monetizarlo, pero no la infraestructura para empaquetarlo.",
    ];

    return (
        <section className="py-24 px-6 bg-zinc-950 text-white">
            <div className="mx-auto max-w-4xl">
                <SectionLabel>El problema real</SectionLabel>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-snug max-w-2xl">
                    Sabes construir. El problema es que sigues intercambiando tiempo por dinero.
                </h2>

                <div className="mt-12 grid sm:grid-cols-2 gap-4">
                    {problems.map((p, i) => (
                        <div
                            key={i}
                            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 flex gap-3"
                        >
                            <span className="text-red-400 mt-0.5 shrink-0">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </span>
                            <p className="text-sm text-zinc-300 leading-relaxed">{p}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
                    <p className="text-emerald-400 font-semibold text-sm mb-2">
                        Hay una salida.
                    </p>
                    <p className="text-zinc-300 text-base leading-relaxed">
                        Un producto listo para desplegar que convierte tu conocimiento técnico en un
                        SaaS de agentes IA. Lo personalizas, le pones precio y lo vendes.
                        La infraestructura ya la construí yo.
                    </p>
                </div>
            </div>
        </section>
    );
}

function HowItWorks() {
    const layers = [
        {
            tag: "Dashboard",
            icon: "🖥️",
            title: "Control total desde un panel unificado",
            items: [
                "Crea y gestiona múltiples agentes desde un solo lugar",
                "Administra acceso de usuarios por roles y permisos",
                "Configura las API keys de cada LLM por separado",
                "Monitorea uso de tokens en tiempo real",
            ],
        },
        {
            tag: "Agent Studio",
            icon: "🧠",
            title: "Configura cada agente sin tocar código",
            items: [
                "Elige el LLM preferido: Claude, ChatGPT o Gemini",
                "Define nombre, título, diseño y colores del agente",
                "Escribe el prompt base con contexto y comportamiento",
                "Sube documentos a la base de conocimiento del agente",
            ],
        },
        {
            tag: "Capacidades avanzadas",
            icon: "⚙️",
            title: "Poder real cuando lo necesitas",
            items: [
                "Crea tablas SQL personalizadas por agente",
                "Define funciones y herramientas propias (tool use)",
                "Configura límites de tokens mínimos y máximos",
                "Embeddings e indexación de documentos incluida",
            ],
        },
        {
            tag: "Deploy",
            icon: "🚀",
            title: "Publica tu agente en minutos",
            items: [
                "URL pública dedicada por agente",
                "Widget embebible en cualquier sitio web",
                "CORS configurado para dominios autorizados",
                "Listo para producción desde el primer día",
            ],
        },
    ];

    return (
        <section id="que-incluye" className="py-24 px-6 bg-zinc-50">
            <div className="mx-auto max-w-4xl">
                <SectionLabel>Arquitectura</SectionLabel>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-snug max-w-xl">
                    Todo lo que necesitas para operar agentes IA a escala.
                </h2>
                <p className="mt-4 text-zinc-500 max-w-lg">
                    Cuatro capas integradas. Cada una construida y probada en producción.
                </p>

                <div className="mt-12 grid sm:grid-cols-2 gap-4">
                    {layers.map((layer, i) => (
                        <div
                            key={i}
                            className="rounded-2xl border border-zinc-200 bg-white p-6 hover:shadow-md transition-all duration-200"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-xl">{layer.icon}</span>
                                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                                    {layer.tag}
                                </span>
                            </div>
                            <h3 className="font-semibold text-zinc-900 text-sm mb-3">
                                {layer.title}
                            </h3>
                            <ul className="space-y-2">
                                {layer.items.map((item, j) => (
                                    <li
                                        key={j}
                                        className="flex items-start gap-2.5 text-sm text-zinc-600"
                                    >
                                        <CheckIcon />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Stack badge */}
                <div className="mt-4 rounded-2xl border border-dashed border-zinc-300 bg-white p-6">
                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
                        Stack incluido
                    </p>
                    <div className="grid sm:grid-cols-3 gap-4">
                        {[
                            "Next.js 14 App Router + TypeScript",
                            "Supabase: auth, DB, storage y edge functions",
                            "SDK oficial de Claude, OpenAI y Gemini",
                        ].map((b, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-2 text-sm text-zinc-600"
                            >
                                <CheckIcon />
                                {b}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function MoneyAngles() {
    const angles = [
        {
            icon: "🏄",
            title: "Véndelo como servicio a clientes",
            desc: "Configura un agente para un restaurante, clínica o e-commerce. Cobra mensualidad. Escala sin límite de horas.",
        },
        {
            icon: "📦",
            title: "Empaquétalo como producto propio",
            desc: "Personaliza el branding, ponle precio y lanza tu SaaS de agentes IA en días, no en meses.",
        },
        {
            icon: "🧪",
            title: "Prueba de concepto para clientes enterprise",
            desc: "Muestra algo real en la primera reunión. Nada convence más que un demo funcional con datos del cliente.",
        },
        {
            icon: "🌍",
            title: "Opera desde cualquier parte del mundo",
            desc: "Deploy en Vercel, base de datos en Supabase. Tu oficina es donde haya WiFi y ganas de construir.",
        },
        {
            icon: "💡",
            title: "Monetiza lo que ya sabes",
            desc: "Tienes conocimiento de un nicho específico. Empaquétalo en un agente y véndelo al sector que mejor conoces.",
        },
        {
            icon: "📈",
            title: "Ingreso que no depende de tu tiempo",
            desc: "Un agente desplegado responde 24/7. Tus clientes pagan aunque tú estés desconectado.",
        },
    ];

    return (
        <section className="py-24 px-6">
            <div className="mx-auto max-w-4xl">
                <SectionLabel>Formas de monetizar</SectionLabel>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-snug max-w-xl">
                    No es solo un proyecto. Es el punto de partida de tu independencia económica.
                </h2>
                <p className="mt-4 text-zinc-500 max-w-lg">
                    Cada builder lo usa diferente. Estas son las formas más directas de convertir esto en ingreso real.
                </p>

                <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {angles.map((item, i) => (
                        <div
                            key={i}
                            className="group rounded-2xl border border-zinc-100 bg-white p-6 hover:border-emerald-100 hover:shadow-md transition-all duration-200"
                        >
                            <span className="text-2xl">{item.icon}</span>
                            <h3 className="mt-3 font-semibold text-zinc-900 text-sm">
                                {item.title}
                            </h3>
                            <p className="mt-1.5 text-sm text-zinc-500 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ForWho() {
    const yes = [
        "Developers que quieren vivir del código sin depender de un solo empleador",
        "Indie hackers buscando su primer producto con ingresos recurrentes",
        "Nómadas digitales que necesitan un negocio que funcione desde cualquier ciudad",
        "Freelancers cansados de cotizar por hora y listos para vender por valor",
        "Founders técnicos que quieren validar un nicho de IA sin meses de desarrollo",
        "Consultores que quieren ofrecer algo concreto, no solo asesoría",
    ];

    const no = [
        "Personas sin conocimiento básico de JavaScript o TypeScript",
        "Quienes buscan una solución no-code o sin ningún código",
        "Quienes ya tienen su propia plataforma de agentes funcionando",
    ];

    return (
        <section className="py-24 px-6 bg-zinc-50">
            <div className="mx-auto max-w-4xl">
                <SectionLabel>Para quién es</SectionLabel>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-snug max-w-xl">
                    Para quien ya decidió que el código es su camino a la libertad.
                </h2>

                <div className="mt-12 grid sm:grid-cols-2 gap-8">
                    <div>
                        <p className="text-sm font-semibold text-zinc-900 mb-4">
                            ✅ Es para ti si eres
                        </p>
                        <ul className="space-y-3">
                            {yes.map((y, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-600">
                                    <CheckIcon />
                                    {y}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-zinc-900 mb-4">
                            ❌ No es para ti si
                        </p>
                        <ul className="space-y-3">
                            {no.map((n, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-500">
                                    <svg className="h-4 w-4 text-zinc-300 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    {n}
                                </li>
                            ))}
                        </ul>

                        {/* Nomad callout */}
                        <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-5">
                            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">Bonus mindset</p>
                            <p className="text-sm text-zinc-600 leading-relaxed">
                                Este kit lo compran personas que ven el código como un activo,
                                no como un trabajo. Si eso te resuena, estás en el lugar correcto.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function AuthorStory() {
    return (
        <section className="py-24 px-6 bg-zinc-950 text-white overflow-hidden">
            <div className="mx-auto max-w-4xl">
                <SectionLabel>Quién lo construyó</SectionLabel>

                <div className="mt-8 grid lg:grid-cols-[280px_1fr] gap-12 items-start">
                    {/* Photo + identity card */}
                    <div className="flex flex-col items-center lg:items-start gap-4">
                        <div className="relative">
                            <div className="relative h-36 w-36 rounded-3xl border-2 border-zinc-700 bg-zinc-800 overflow-hidden shadow-xl">
                                <Image
                                    src="/headshot.jpeg"
                                    alt="Esteban Toro"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-zinc-950 shadow-sm" />
                        </div>

                        <div>
                            <p className="font-bold text-white text-lg">Esteban Toro</p>
                            <p className="text-zinc-400 text-sm">
                                Software Engineer · Founder
                            </p>
                        </div>

                        {/* Social links */}
                        <div className="flex flex-col gap-2 w-full">
                            <a
                                href="https://github.com/softEsteban"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2.5 text-sm text-zinc-400 hover:text-white transition-colors group"
                            >
                                <svg
                                    className="h-4 w-4 shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                                <span className="group-hover:underline">
                                    github.com/softEsteban
                                </span>
                            </a>
                            <a
                                href="https://linkedin.com/in/esteban-toro-63517b204"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2.5 text-sm text-zinc-400 hover:text-white transition-colors group"
                            >
                                <svg
                                    className="h-4 w-4 shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                <span className="group-hover:underline">LinkedIn</span>
                            </a>
                        </div>
                    </div>

                    {/* Story */}
                    <div className="space-y-6">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug">
                            Por qué construí esto — y por qué lo vendo.
                        </h2>

                        <div className="space-y-4 text-zinc-400 leading-relaxed text-[15px]">
                            <p>
                                Llevo años construyendo software por encargo. Buenos proyectos,
                                buenos clientes. Pero siempre el mismo techo:{" "}
                                <span className="text-zinc-200">
                                    tu ingreso está atado a las horas que trabajas.
                                </span>{" "}
                                No escala. No viaja contigo. Cuando paras, para todo.
                            </p>
                            <p>
                                Cuando empecé a integrar LLMs en proyectos, noté algo: cada
                                cliente necesitaba lo mismo. Dashboard, agentes, base de datos,
                                auth, embed. Construí eso una y otra vez hasta que decidí{" "}
                                <span className="text-zinc-200">
                                    hacerlo una sola vez, bien, y convertirlo en producto.
                                </span>
                            </p>
                            <p>
                                Lo que tienes acá es exactamente eso: la infraestructura que
                                yo uso para montar agentes para clientes, empaquetada para que
                                tú la personalices y vendas.{" "}
                                <span className="text-zinc-200">
                                    Desde Medellín, Bogotá, Lisboa o donde sea que estés construyendo.
                                </span>
                            </p>
                        </div>

                        {/* Builder stats */}
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
                            {[
                                { val: "5+", label: "años como engineer" },
                                { val: "3", label: "LLMs integrados" },
                                { val: "∞", label: "clientes que puedes tener" },
                            ].map((s, i) => (
                                <div key={i}>
                                    <p className="text-2xl font-bold text-white">{s.val}</p>
                                    <p className="text-xs text-zinc-500 mt-0.5">{s.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Quote */}
                        <blockquote className="border-l-2 border-emerald-500 pl-4 mt-2">
                            <p className="text-zinc-300 italic text-sm leading-relaxed">
                                &quot;El código que escribes una vez y vende mil veces es el
                                único que realmente te da libertad.&quot;
                            </p>
                            <footer className="mt-2 text-xs text-zinc-500">
                                — Esteban Toro
                            </footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Payment config ────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "+573045500182";

const WHATSAPP_MESSAGE_GENERAL = encodeURIComponent(
    'Hola Esteban! Quiero acceder al Agent Kit (Next.js + Supabase + Claude/ChatGPT/Gemini). ¿Cómo procedo con el pago?'
);

const WHATSAPP_MESSAGE_READY = encodeURIComponent(
    'Hola Esteban! Estoy listo para pagar el Agent Kit. Envíame los datos para completar el pago.'
);

const WHATSAPP_LINK_GENERAL = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${WHATSAPP_MESSAGE_GENERAL}`;
const WHATSAPP_LINK_READY = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${WHATSAPP_MESSAGE_READY}`;

function PaymentCard({
    icon,
    tag,
    tagColor,
    title,
    description,
    ctaLabel,
    ctaHref,
    ctaStyle,
    footnote,
}: {
    icon: React.ReactNode;
    tag: string;
    tagColor: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    ctaStyle: "dark" | "whatsapp";
    footnote: string;
}) {
    const ctaClass =
        ctaStyle === "dark"
            ? "mt-6 w-full inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-white text-zinc-900 font-semibold text-sm hover:bg-zinc-100 active:scale-[0.98] transition-all duration-200 shadow-sm"
            : "mt-6 w-full inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe5d] active:scale-[0.98] transition-all duration-200 shadow-sm shadow-[#25D366]/20";

    return (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7 flex flex-col">
            <span
                className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-5 ${tagColor}`}
            >
                {tag}
            </span>

            <div className="mb-4">{icon}</div>

            <h3 className="text-white font-bold text-lg">{title}</h3>
            <p className="text-zinc-400 text-sm mt-2 leading-relaxed flex-1">
                {description}
            </p>

            <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                    track("checkout_clicked", {
                        method: ctaStyle,
                        location: "final_cta",
                    });
                }}
                className={ctaClass}
            >
                {ctaLabel}
            </a>
            <p className="mt-3 text-xs text-zinc-600 text-center">{footnote}</p>
        </div>
    );
}

function FinalCTA() {
    const features = [
        "Proyecto Next.js + Supabase completo",
        "Dashboard y Agent Studio incluidos",
        "Integración Claude, ChatGPT y Gemini",
        "Knowledge base y embeddings",
        "Código 100% tuyo, sin licencias",
    ];

    return (
        <section id="cta" className="py-24 px-6 bg-zinc-950">
            <div className="mx-auto max-w-4xl text-center">
                <SectionLabel>Empieza hoy</SectionLabel>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                    Tu primer ingreso digital
                    <br />
                    puede ser esta semana.
                </h2>
                <p className="mt-6 text-zinc-400 text-lg max-w-xl mx-auto leading-relaxed">
                    La infraestructura ya está lista. El agente que quieres construir y
                    vender solo necesita tu conocimiento y este kit para arrancar.
                </p>

                {/* Price */}
                <div className="mt-10 flex items-end justify-center gap-1">
                    <span className="text-6xl font-bold text-white">$500.000</span>
                    <span className="text-zinc-500 mb-2 text-lg">COP</span>
                </div>
                <p className="text-zinc-500 text-sm mt-1">Pago único · Sin suscripción · Código 100% tuyo</p>

                {/* What's included */}
                <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
                    {features.map((f, i) => (
                        <span
                            key={i}
                            className="flex items-center gap-1.5 text-sm text-zinc-400"
                        >
                            <CheckIcon />
                            {f}
                        </span>
                    ))}
                </div>

                {/* Divider */}
                <div className="mt-10 flex items-center gap-4 max-w-sm mx-auto">
                    <div className="flex-1 h-px bg-zinc-800" />
                    <span className="text-xs text-zinc-600 uppercase tracking-widest">
                        Elige cómo pagar
                    </span>
                    <div className="flex-1 h-px bg-zinc-800" />
                </div>

                {/* Payment cards */}
                <div className="mt-6 grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
                    <PaymentCard
                        tag="Recomendado · Acceso inmediato"
                        tagColor="bg-indigo-500/10 text-indigo-400"
                        icon={
                            <svg
                                className="h-8 w-8 text-indigo-400"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
                            </svg>
                        }
                        title="Pagar con tarjeta"
                        description="Nequi, tarjeta débito o crédito. Acceso inmediato al repositorio tras confirmar el pago."
                        ctaLabel="Ir a pago seguro →"
                        ctaHref={WHATSAPP_LINK_READY}
                        ctaStyle="dark"
                        footnote="🔒 Garantía de 7 días · Acceso inmediato"
                    />

                    <PaymentCard
                        tag="Habla directo conmigo"
                        tagColor="bg-[#25D366]/10 text-[#25D366]"
                        icon={
                            <svg
                                className="h-8 w-8 text-[#25D366]"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        }
                        title="Pagar por WhatsApp"
                        description="Escríbeme directamente. Te resuelvo cualquier duda, te muestro el proyecto y coordinamos el acceso."
                        ctaLabel="Abrir WhatsApp →"
                        ctaHref={WHATSAPP_LINK_GENERAL}
                        ctaStyle="whatsapp"
                        footnote="💬 Respuesta en menos de 24h · Esteban Toro"
                    />
                </div>

                <p className="mt-8 text-xs text-zinc-600">
                    ¿Tienes dudas? Escríbeme antes de comprar. Te muestro el proyecto,
                    resuelvo tus preguntas y tú decides. Sin presión.
                </p>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="border-t border-zinc-100 py-8 px-6">
            <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-zinc-900">
                        agent<span className="text-emerald-500">.</span>kit
                    </span>
                    <span className="text-zinc-200">·</span>
                    <span className="text-xs text-zinc-400">
                        by{" "}
                        <a
                            href="https://github.com/softEsteban"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-600 hover:text-zinc-900 transition-colors font-medium"
                        >
                            Esteban Toro
                        </a>
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com/softEsteban"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://linkedin.com/in/esteban-toro-63517b204"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
                    >
                        LinkedIn
                    </a>
                    <span className="text-xs text-zinc-300">
                        © {new Date().getFullYear()} · Next.js + Supabase + Claude + OpenAI + Gemini
                    </span>
                </div>
            </div>
        </footer>
    );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-white font-sans antialiased">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Geist+Mono:wght@400;500&display=swap');

        body {
          font-family: 'Geist', system-ui, -apple-system, sans-serif;
        }

        .font-mono {
          font-family: 'Geist Mono', monospace;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        main > * {
          animation: fadeInUp 0.5s ease both;
        }

        main > *:nth-child(1) { animation-delay: 0ms; }
        main > *:nth-child(2) { animation-delay: 80ms; }
        main > *:nth-child(3) { animation-delay: 160ms; }
        main > *:nth-child(4) { animation-delay: 240ms; }
      `}</style>
            <Navbar />
            <Hero />
            <Problem />
            <MoneyAngles />
            <HowItWorks />
            <ForWho />
            <AuthorStory />
            <FinalCTA />
            <Footer />
        </main>
    );
}
