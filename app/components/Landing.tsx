"use client";

import { track } from "@vercel/analytics";
import Image from "next/image";
import { useState, useEffect } from "react";
import { GetStarted } from "./GetStarted";

// ─── Constants ─────────────────────────────────────────────────────────────────

// Replace with your actual Lemon Squeezy variant URL (add ?embed=1 for overlay)
const CHECKOUT_URL = "https://estebantoroar.lemonsqueezy.com/checkout/buy/4508ec85-41ca-452d-a545-8f8c9760e088?embed=1";

const WHATSAPP_NUMBER = "573045500182";
const WHATSAPP_MSG = encodeURIComponent(
    "Hola Esteban! Me interesa Agent Kit para mi negocio. ¿Podemos hablar?"
);
const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

// ─── Atoms ─────────────────────────────────────────────────────────────────────

function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
    );
}

function CheckIcon({ className = "h-4 w-4 text-emerald-500 shrink-0" }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
    );
}

function XIcon() {
    return (
        <svg className="h-4 w-4 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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

// ─── Navbar ────────────────────────────────────────────────────────────────────

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md border-b border-zinc-100 shadow-sm" : "bg-transparent"}`}>
            <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-900 tracking-tight">
                    agent<span className="text-emerald-500">.</span>kit
                </span>
                <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("navbar_cta")}
                    className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3.5 text-xs font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 hover:border-zinc-300 transition-all active:scale-[0.98]"
                >
                    Habla con nosotros
                </a>
            </div>
        </header>
    );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function Hero({ onOpenDemo }: { onOpenDemo: () => void }) {
    return (
        <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-white">
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                    backgroundSize: "48px 48px",
                }}
            />
            <div className="absolute top-16 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

            <div className="relative mx-auto max-w-4xl text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Agentes de IA listos para tu negocio · Claude · ChatGPT · Gemini
                </span>

                <h1 className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.05]">
                    Tu agente de ventas
                    <br />
                    <span className="relative inline-block">
                        trabaja 24/7.
                        <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-emerald-400 rounded-full" />
                    </span>
                    <br />
                    <span className="text-zinc-400">Tú, cuando quieras.</span>
                </h1>

                <p className="mt-8 text-lg sm:text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
                    Agent Kit crea agentes conversacionales inteligentes que{" "}
                    <strong className="text-zinc-700 font-medium">automatizan ventas</strong>,{" "}
                    <strong className="text-zinc-700 font-medium">gestionan reservas</strong> y{" "}
                    <strong className="text-zinc-700 font-medium">responden preguntas</strong>{" "}
                    sobre tus productos y servicios — entrenados con tu propia información.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track("hero_cta_whatsapp")}
                        className="inline-flex h-12 items-center gap-2 rounded-xl bg-zinc-900 px-7 text-sm font-semibold text-white shadow-lg hover:bg-zinc-700 active:scale-[0.98] transition-all"
                    >
                        Quiero un agente para mi negocio
                        <ArrowRight className="h-4 w-4" />
                    </a>
                    <button
                        onClick={onOpenDemo}
                        className="inline-flex h-12 items-center gap-2 px-6 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                        Ver demo del Studio
                    </button>
                </div>

                <p className="mt-5 text-sm text-zinc-400">
                    Setup en 5 minutos · Sin código · Conectado a WhatsApp
                </p>

                {/* Live demo preview */}
                <div className="mt-16 mx-auto max-w-sm rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-900/8 overflow-hidden text-left">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-100 bg-zinc-50">
                        <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-sm">🤖</div>
                        <div>
                            <p className="text-xs font-semibold text-zinc-900">Sofía · Agente de Ventas</p>
                            <p className="text-[10px] text-emerald-600 flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" /> En línea ahora
                            </p>
                        </div>
                    </div>
                    <div className="p-4 space-y-3">
                        <div className="flex gap-2">
                            <div className="h-6 w-6 rounded-full bg-zinc-100 flex items-center justify-center text-xs shrink-0">👤</div>
                            <div className="rounded-2xl rounded-tl-none bg-zinc-100 px-3 py-2 text-xs text-zinc-700 max-w-[200px]">
                                ¿Tienen disponibilidad para el sábado?
                            </div>
                        </div>
                        <div className="flex gap-2 justify-end">
                            <div className="rounded-2xl rounded-tr-none bg-emerald-500 px-3 py-2 text-xs text-white max-w-[220px]">
                                ¡Hola! Sí, tenemos horarios disponibles el sábado. ¿A qué hora prefieres? Puedo registrar tu reserva ahora mismo.
                            </div>
                            <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs shrink-0">🤖</div>
                        </div>
                        <div className="flex gap-2">
                            <div className="h-6 w-6 rounded-full bg-zinc-100 flex items-center justify-center text-xs shrink-0">👤</div>
                            <div className="rounded-2xl rounded-tl-none bg-zinc-100 px-3 py-2 text-xs text-zinc-700 max-w-[160px]">
                                A las 3pm, somos 4 personas.
                            </div>
                        </div>
                        <div className="flex gap-2 justify-end">
                            <div className="rounded-2xl rounded-tr-none bg-emerald-500 px-3 py-2 text-xs text-white max-w-[220px]">
                                Perfecto, reserva confirmada para el sábado a las 3pm, 4 personas. Te envío la confirmación. ✅
                            </div>
                            <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs shrink-0">🤖</div>
                        </div>
                    </div>
                    <div className="px-4 pb-3">
                        <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2">
                            <span className="text-xs text-zinc-400 flex-1">Escribe aquí...</span>
                            <div className="h-5 w-5 rounded-lg bg-emerald-500 flex items-center justify-center">
                                <ArrowRight className="h-3 w-3 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Problem ───────────────────────────────────────────────────────────────────

function Problem() {
    const problems = [
        "Tu equipo pierde horas respondiendo las mismas preguntas sobre precios, horarios y disponibilidad.",
        "Clientes potenciales escriben fuera de horario y no obtienen respuesta — se van con la competencia.",
        "Las reservas se pierden en el chat porque no hay un sistema que las capture y confirme automáticamente.",
        "No tienes forma de escalar la atención sin contratar más personal de soporte.",
    ];

    return (
        <section className="py-24 px-6 bg-zinc-950 text-white">
            <div className="mx-auto max-w-4xl">
                <SectionLabel>El problema real</SectionLabel>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-snug max-w-2xl">
                    Estás perdiendo ventas que ya deberían ser tuyas.
                </h2>

                <div className="mt-12 grid sm:grid-cols-2 gap-4">
                    {problems.map((p, i) => (
                        <div key={i} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 flex gap-3">
                            <XIcon />
                            <p className="text-sm text-zinc-300 leading-relaxed">{p}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
                    <p className="text-emerald-400 font-semibold text-sm mb-2">La solución.</p>
                    <p className="text-zinc-300 text-base leading-relaxed">
                        Un agente inteligente configurado con tu información — precios, catálogo, políticas —
                        que responde, vende y agenda mientras tú te dedicas a lo que importa.
                        Sin código. Sin contratar a nadie extra.
                    </p>
                </div>
            </div>
        </section>
    );
}

// ─── Use Cases ────────────────────────────────────────────────────────────────

function UseCases() {
    const cases = [
        {
            icon: "💬",
            tag: "Ventas automáticas",
            tagColor: "bg-amber-500/10 text-amber-400",
            title: "Tu agente cierra ventas mientras duermes",
            desc: "Configurado con tu catálogo de productos, tu agente califica prospectos, responde objeciones y guía al cliente hasta el pago — sin intervención humana para las conversiones simples.",
            items: [
                "Presenta productos según el interés del cliente",
                "Responde preguntas sobre precios, especificaciones y disponibilidad",
                "Captura leads y los registra en tu CRM automáticamente",
                "Envía seguimiento por WhatsApp a prospectos inactivos",
            ],
        },
        {
            icon: "📅",
            tag: "Reservas y agendamiento",
            tagColor: "bg-blue-500/10 text-blue-400",
            title: "Cero llamadas para agendar. Cero filas de espera.",
            desc: "Tu agente gestiona disponibilidad, confirma reservas y las registra en tu tabla de datos en tiempo real. Perfecto para restaurantes, clínicas, spas, hoteles y cualquier negocio con citas.",
            items: [
                "Consulta disponibilidad en tiempo real con acceso a tus tablas",
                "Confirma, modifica o cancela reservas sin asistencia humana",
                "Envía recordatorios automáticos por WhatsApp",
                "Registra datos del cliente para seguimiento posterior",
            ],
        },
        {
            icon: "📚",
            tag: "Soporte con base de conocimiento",
            tagColor: "bg-emerald-500/10 text-emerald-400",
            title: "Respuestas precisas de tus propios documentos",
            desc: "Sube tus manuales, catálogos, políticas y FAQs. El agente aprende de ellos y responde con exactitud, citando tu información — no inventando respuestas genéricas.",
            items: [
                "Indexa PDFs, manuales y catálogos completos",
                "Responde con información de tu negocio, no datos genéricos",
                "Escala la atención sin aumentar el equipo de soporte",
                "Actualiza la base de conocimiento en cualquier momento",
            ],
        },
    ];

    return (
        <section className="py-24 px-6 bg-zinc-50">
            <div className="mx-auto max-w-5xl">
                <SectionLabel>Casos de uso</SectionLabel>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-snug max-w-2xl">
                    Un agente que vende, agenda y responde — todo en uno.
                </h2>
                <p className="mt-4 text-zinc-500 max-w-xl">
                    No es solo un chatbot. Es un miembro del equipo entrenado en tu negocio, disponible 24/7 sin sueldo fijo.
                </p>

                <div className="mt-14 space-y-6">
                    {cases.map((c, i) => (
                        <div key={i} className="rounded-2xl border border-zinc-200 bg-white p-7 hover:shadow-md transition-all duration-200">
                            <div className="grid lg:grid-cols-[1fr_340px] gap-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-2xl">{c.icon}</span>
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.tagColor}`}>{c.tag}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-zinc-900 mb-2">{c.title}</h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed">{c.desc}</p>
                                </div>
                                <ul className="space-y-2.5 self-start">
                                    {c.items.map((item, j) => (
                                        <li key={j} className="flex items-start gap-2.5 text-sm text-zinc-600">
                                            <CheckIcon />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── How It Works ──────────────────────────────────────────────────────────────

function HowItWorks() {
    const steps = [
        {
            number: "01",
            icon: "◇",
            title: "Perfil del agente",
            desc: "Define el nombre, rol y tono de voz de tu agente. ¿Es Sofía, tu asesora de ventas? ¿Carlos, el coordinador de reservas? Tú decides su identidad.",
            detail: "Nombre · Rol · Tono · Comportamiento base",
        },
        {
            number: "02",
            icon: "❯",
            title: "Prompt base",
            desc: "Escribe las instrucciones permanentes: contexto de negocio, reglas, objetivos. El agente las sigue en cada conversación sin que tengas que repetirlas.",
            detail: "Reglas de negocio · Restricciones · Objetivos · Contexto",
        },
        {
            number: "03",
            icon: "✦",
            title: "Elige tu LLM",
            desc: "Conecta Claude, ChatGPT o Gemini con tu API key. Puedes cambiar o probar diferentes modelos sin perder la configuración.",
            detail: "Claude Sonnet · GPT-4o · Gemini 2.0 Flash",
        },
        {
            number: "04",
            icon: "▣",
            title: "Base de conocimiento",
            desc: "Sube PDFs con tu catálogo, manual de precios, políticas o cualquier documento. El agente los indexa y los usa para responder con precisión.",
            detail: "PDFs · Manuales · Catálogos · FAQs · Políticas",
        },
        {
            number: "05",
            icon: "⚡",
            title: "Funciones y Tablas",
            desc: "Activa acciones concretas: enviar mensajes por WhatsApp, crear leads en tu CRM, buscar disponibilidad en tiempo real desde tus tablas de datos.",
            detail: "WhatsApp · Create Lead · Web Search · Tablas en vivo",
        },
    ];

    return (
        <section id="como-funciona" className="py-24 px-6 bg-white">
            <div className="mx-auto max-w-5xl">
                <SectionLabel>Cómo funciona</SectionLabel>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-snug max-w-xl">
                    Tu agente, configurado en 5 pasos.
                </h2>
                <p className="mt-4 text-zinc-500 max-w-lg">
                    AgentStudio te guía paso a paso. Sin código, sin integrations complicadas.
                    En menos de 5 minutos tienes tu primer agente listo para conversar.
                </p>

                <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {steps.slice(0, 3).map((step) => (
                        <StepCard key={step.number} step={step} />
                    ))}
                </div>
                <div className="mt-4 grid sm:grid-cols-2 gap-4 lg:max-w-[calc(66.66%_+_8px)]">
                    {steps.slice(3).map((step) => (
                        <StepCard key={step.number} step={step} />
                    ))}
                </div>

                {/* Result card */}
                <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-7">
                    <div className="flex items-start gap-4">
                        <span className="text-2xl mt-0.5">★</span>
                        <div>
                            <p className="font-bold text-zinc-900 mb-1">Tu agente está listo.</p>
                            <p className="text-sm text-zinc-600 leading-relaxed">
                                Usa Preview para probar la conversación en tiempo real. Cuando estés satisfecho,
                                publica tu agente con una URL pública o incrústalo en tu sitio web con un widget.
                                Desde ese momento trabaja por ti, 24/7.
                            </p>
                            <div className="mt-4 flex flex-wrap gap-3">
                                {["✓ LLM activo", "✓ Base de conocimiento indexada", "✓ WhatsApp conectado", "✓ Reservas en tiempo real"].map((tag) => (
                                    <span key={tag} className="text-xs font-medium text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function StepCard({ step }: { step: { number: string; icon: string; title: string; desc: string; detail: string } }) {
    return (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 hover:shadow-md transition-all duration-200 relative overflow-hidden">
            <p className="absolute right-4 top-3 text-5xl font-bold text-zinc-50 select-none leading-none">{step.number}</p>
            <span className="text-xl text-zinc-400 font-mono">{step.icon}</span>
            <h3 className="mt-3 font-bold text-zinc-900">{step.title}</h3>
            <p className="mt-2 text-sm text-zinc-500 leading-relaxed">{step.desc}</p>
            <p className="mt-3 text-[11px] font-medium text-zinc-400 border-t border-zinc-100 pt-3">{step.detail}</p>
        </div>
    );
}

// ─── LLM Support ──────────────────────────────────────────────────────────────

function LLMSection() {
    const providers = [
        {
            name: "Claude",
            sub: "Anthropic · Sonnet 4.5",
            icon: "✦",
            color: "text-orange-500",
            bg: "bg-orange-50 border-orange-100",
            desc: "Razonamiento profundo, respuestas largas, contexto extendido.",
        },
        {
            name: "ChatGPT",
            sub: "OpenAI · GPT-4o",
            icon: "⬡",
            color: "text-emerald-600",
            bg: "bg-emerald-50 border-emerald-100",
            desc: "El modelo más conocido. Velocidad y versatilidad para conversaciones de alta frecuencia.",
        },
        {
            name: "Gemini",
            sub: "Google · 2.0 Flash",
            icon: "◈",
            color: "text-blue-500",
            bg: "bg-blue-50 border-blue-100",
            desc: "Multimodal y rápido. Ideal cuando la velocidad de respuesta es crítica.",
        },
    ];

    return (
        <section className="py-24 px-6 bg-zinc-950 text-white">
            <div className="mx-auto max-w-5xl">
                <SectionLabel>Modelos soportados</SectionLabel>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight max-w-xl leading-snug">
                    El mejor modelo para cada negocio.
                    <br />
                    <span className="text-zinc-400">Tú eliges. Nosotros integramos.</span>
                </h2>
                <p className="mt-4 text-zinc-400 max-w-lg">
                    Conecta con tu API key y cambia de modelo en cualquier momento.
                    Sin reconfigurar el agente. Sin perder el historial.
                </p>

                <div className="mt-12 grid sm:grid-cols-3 gap-4">
                    {providers.map((p) => (
                        <div key={p.name} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border text-xl font-mono mb-4 ${p.bg} ${p.color}`}>
                                {p.icon}
                            </div>
                            <p className="font-bold text-white">{p.name}</p>
                            <p className="text-xs text-zinc-500 mt-0.5 mb-3">{p.sub}</p>
                            <p className="text-sm text-zinc-400 leading-relaxed">{p.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-1">
                        <p className="font-semibold text-white">¿No sabes qué modelo elegir?</p>
                        <p className="text-sm text-zinc-400 mt-1">
                            Para la mayoría de casos de ventas y reservas, Claude Sonnet o GPT-4o son la opción correcta.
                            Te ayudamos a elegir según tu caso específico.
                        </p>
                    </div>
                    <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex h-10 items-center gap-2 rounded-xl bg-[#25D366] px-5 text-sm font-semibold text-white transition-all hover:bg-[#1ebe5d] active:scale-[0.98]"
                    >
                        Preguntar por WhatsApp <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                </div>
            </div>
        </section>
    );
}

// ─── Capabilities ─────────────────────────────────────────────────────────────

function Capabilities() {
    const caps = [
        { icon: "💬", title: "WhatsApp nativo", desc: "Tu agente atiende directo en WhatsApp. El canal donde ya está tu cliente." },
        { icon: "📄", title: "Base de conocimiento", desc: "Sube PDFs y tu agente responde basado en tu información real, no en datos genéricos." },
        { icon: "🗄️", title: "Tablas en tiempo real", desc: "Acceso a datos estructurados — disponibilidad, stock, precios — en cada conversación." },
        { icon: "🎯", title: "Creación de leads", desc: "Captura automática al CRM cuando un prospecto está listo. Ninguna oportunidad se pierde." },
        { icon: "🔍", title: "Búsqueda web", desc: "El agente puede consultar información actualizada en tiempo real cuando la necesita." },
        { icon: "🔄", title: "Multi-agente", desc: "Crea diferentes agentes para diferentes propósitos — ventas, soporte, reservas — desde un panel." },
        { icon: "🌍", title: "Widget embebible", desc: "Incruста el agente en tu web con una sola línea de código. Compatible con cualquier stack." },
        { icon: "🔑", title: "Tu API key, tu control", desc: "Conectas tu propia API key. El tráfico va directo al proveedor. Sin intermediarios en la data." },
    ];

    return (
        <section className="py-24 px-6 bg-white">
            <div className="mx-auto max-w-5xl">
                <SectionLabel>Capacidades</SectionLabel>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-snug max-w-xl">
                    Más que un chatbot.
                    <br />
                    Un sistema completo de atención.
                </h2>

                <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {caps.map((c) => (
                        <div key={c.title} className="rounded-2xl border border-zinc-100 p-5 hover:border-emerald-100 hover:shadow-sm transition-all duration-200">
                            <span className="text-2xl">{c.icon}</span>
                            <h3 className="mt-3 font-semibold text-zinc-900 text-sm">{c.title}</h3>
                            <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed">{c.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── For Who ──────────────────────────────────────────────────────────────────

function ForWho() {
    const yes = [
        "Restaurantes que quieren gestionar reservas sin llamadas telefónicas",
        "E-commerces que necesitan un agente de ventas disponible 24/7",
        "Clínicas y consultorios que agenden citas automáticamente",
        "Hoteles y alojamientos que quieren automatizar disponibilidad",
        "Tiendas con catálogo amplio que requieren soporte de producto",
        "Cualquier negocio que pierda clientes por responder lento o fuera de horario",
    ];

    const no = [
        "Personas sin negocio establecido o sin base de clientes activa",
        "Quienes buscan un chatbot genérico sin personalización",
        "Proyectos que no tienen información suficiente para entrenar el agente",
    ];

    return (
        <section className="py-24 px-6 bg-zinc-50">
            <div className="mx-auto max-w-4xl">
                <SectionLabel>¿Para quién es?</SectionLabel>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-snug max-w-xl">
                    Para negocios que quieren atender mejor sin crecer el equipo.
                </h2>

                <div className="mt-12 grid sm:grid-cols-2 gap-8">
                    <div>
                        <p className="text-sm font-semibold text-zinc-900 mb-4">✅ Es para ti si tienes</p>
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
                        <p className="text-sm font-semibold text-zinc-900 mb-4">❌ No es para ti si</p>
                        <ul className="space-y-3">
                            {no.map((n, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-500">
                                    <XIcon />
                                    {n}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-5">
                            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">Lo que distingue a nuestros clientes</p>
                            <p className="text-sm text-zinc-600 leading-relaxed">
                                Los negocios que más resultado obtienen son aquellos con volumen real de consultas
                                repetitivas. Si tu equipo responde las mismas preguntas más de 20 veces al día,
                                un agente te da el ROI en la primera semana.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Author ────────────────────────────────────────────────────────────────────

function Author() {
    return (
        <section className="py-24 px-6 bg-zinc-950 text-white overflow-hidden">
            <div className="mx-auto max-w-4xl">
                <SectionLabel>Quién está detrás</SectionLabel>
                <div className="mt-8 grid lg:grid-cols-[260px_1fr] gap-12 items-start">
                    <div className="flex flex-col items-center lg:items-start gap-4">
                        <div className="relative">
                            <div className="relative h-32 w-32 rounded-3xl border-2 border-zinc-700 bg-zinc-800 overflow-hidden shadow-xl">
                                <Image src="/headshot.jpeg" alt="Esteban Toro" fill className="object-cover" />
                            </div>
                            <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-zinc-950" />
                        </div>
                        <div>
                            <p className="font-bold text-white text-lg">Esteban Toro</p>
                            <p className="text-zinc-400 text-sm">Software Engineer · AI Builder</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            {[
                                { label: "github.com/softEsteban", href: "https://github.com/softEsteban" },
                                { label: "LinkedIn", href: "https://linkedin.com/in/esteban-toro-63517b204" },
                            ].map((l) => (
                                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 hover:text-white transition-colors hover:underline">
                                    {l.label}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-5">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug">
                            Construí esto porque vi el problema en docenas de negocios.
                        </h2>
                        <div className="space-y-4 text-zinc-400 leading-relaxed text-[15px]">
                            <p>
                                Trabajo con negocios en toda Latinoamérica integrando IA a sus procesos. El patrón
                                se repite:{" "}
                                <span className="text-zinc-200">dueños y equipos perdiendo tiempo en tareas que un sistema puede resolver.</span>
                            </p>
                            <p>
                                Agent Kit nació de construir la misma infraestructura una y otra vez para diferentes clientes —
                                dashboard, agentes, base de conocimiento, WhatsApp —{" "}
                                <span className="text-zinc-200">hasta decidir hacerlo una sola vez y bien.</span>
                            </p>
                            <p>
                                Cada agente que configuramos libera horas reales de trabajo humano y captura oportunidades que antes
                                se perdían.{" "}
                                <span className="text-zinc-200">Eso tiene un valor concreto para tu negocio.</span>
                            </p>
                        </div>
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
                            {[
                                { val: "5+", label: "años en software" },
                                { val: "3", label: "LLMs integrados" },
                                { val: "24/7", label: "disponibilidad del agente" },
                            ].map((s, i) => (
                                <div key={i}>
                                    <p className="text-2xl font-bold text-white">{s.val}</p>
                                    <p className="text-xs text-zinc-500 mt-0.5">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTA() {
    const includes = [
        "Agente configurado con tu información",
        "Knowledge base entrenada con tus documentos",
        "WhatsApp conectado y funcionando",
        "Tablas de reservas o leads en tiempo real",
        "Soporte directo durante el setup",
    ];

    return (
        <section id="cta" className="py-24 px-6 bg-zinc-950">
            <div className="mx-auto max-w-3xl text-center text-white">
                <SectionLabel>Empieza ahora</SectionLabel>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
                    Tu agente puede estar
                    <br />
                    funcionando hoy.
                </h2>
                <p className="mt-6 text-zinc-400 text-lg max-w-xl mx-auto leading-relaxed">
                    Escríbeme por WhatsApp, cuéntame de tu negocio y en 24 horas tienes
                    un agente configurado, probado y listo para atender clientes.
                </p>

                <div className="mt-10 flex flex-wrap gap-3 justify-center">
                    {includes.map((item, i) => (
                        <span key={i} className="flex items-center gap-1.5 text-sm text-zinc-400">
                            <CheckIcon className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                            {item}
                        </span>
                    ))}
                </div>

                <div className="mt-12 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-6">Habla directo con el equipo</p>

                    <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track("final_cta_whatsapp")}
                        className="w-full inline-flex items-center justify-center gap-2.5 h-14 rounded-2xl bg-[#25D366] text-white font-semibold text-base shadow-lg shadow-[#25D366]/20 hover:bg-[#1ebe5d] active:scale-[0.98] transition-all duration-200"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Escribir por WhatsApp ahora
                    </a>

                    <p className="mt-4 text-xs text-zinc-600">
                        Respuesta en menos de 24h · Esteban Toro · Podemos hacer un demo en vivo
                    </p>
                </div>

                <p className="mt-6 text-xs text-zinc-600">
                    ¿Tienes preguntas antes de empezar? Escríbeme. Te muestro un agente funcionando
                    con datos reales antes de comprometerte con nada.
                </p>
            </div>
        </section>
    );
}

// ─── Pricing CTA ──────────────────────────────────────────────────────────────

function PricingCTA() {
    const includes = [
        "Agente configurado a tu medida",
        "Knowledge base con tus documentos",
        "LLM de tu elección (Claude · GPT-4o · Gemini)",
        "WhatsApp conectado",
        "Funciones: leads, reservas, búsqueda web",
        "Soporte directo durante el setup",
    ];

    return (
        <section className="py-24 px-6 bg-white border-t border-zinc-100">
            <div className="mx-auto max-w-3xl">
                <div className="rounded-3xl border border-zinc-200 overflow-hidden shadow-xl shadow-zinc-900/5">
                    {/* Header */}
                    <div className="bg-zinc-950 px-8 pt-10 pb-8 text-center">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400 mb-5">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse inline-block" />
                            Suscripción mensual · Cancela cuando quieras
                        </span>
                        <div className="mt-2 flex items-end justify-center gap-2">
                            <span className="text-6xl font-bold text-white tracking-tight">$15</span>
                            <span className="text-zinc-400 text-base mb-2">/mes</span>
                        </div>
                        <p className="mt-3 text-zinc-400 text-sm max-w-xs mx-auto">
                            Acceso continuo a AgentStudio. Tu agente siempre activo, siempre actualizable.
                        </p>
                    </div>

                    {/* Includes */}
                    <div className="bg-zinc-50 px-8 py-6 border-t border-zinc-200">
                        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                            {includes.map((item, i) => (
                                <li key={i} className="flex items-center gap-2.5 text-sm text-zinc-600">
                                    <CheckIcon className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Actions */}
                    <div className="bg-white px-8 py-7 border-t border-zinc-100 flex flex-col gap-3">
                        <a
                            href={CHECKOUT_URL}
                            className="lemonsqueezy-button w-full inline-flex items-center justify-center gap-2.5 h-14 rounded-2xl bg-zinc-950 text-white font-semibold text-base shadow-lg hover:bg-zinc-800 active:scale-[0.98] transition-all duration-200"
                            onClick={() => track("pricing_cta_checkout")}
                        >
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M1 1h4l2.68 13.39a2 2 0 001.98 1.61h9.72a2 2 0 001.98-1.61L23 6H6" />
                            </svg>
                            Comprar ahora
                        </a>
                        <a
                            href={WHATSAPP}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => track("pricing_cta_whatsapp")}
                            className="w-full inline-flex items-center justify-center gap-2 h-11 rounded-xl border border-zinc-200 text-zinc-600 text-sm font-medium hover:border-zinc-300 hover:bg-zinc-50 active:scale-[0.98] transition-all duration-200"
                        >
                            ¿Tienes preguntas? Escríbeme por WhatsApp
                        </a>
                        <p className="text-center text-xs text-zinc-400">
                            Pago seguro vía Lemon Squeezy · Sin permanencia · Cancela en cualquier momento
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
    return (
        <footer className="border-t border-zinc-100 py-8 px-6 bg-white">
            <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-zinc-900">
                        agent<span className="text-emerald-500">.</span>kit
                    </span>
                    <span className="text-zinc-200">·</span>
                    <span className="text-xs text-zinc-400">
                        by{" "}
                        <a href="/" className="text-zinc-600 hover:text-zinc-900 transition-colors font-medium">
                            Esteban Toro
                        </a>
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <a href="https://github.com/softEsteban" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors">GitHub</a>
                    <a href="https://linkedin.com/in/esteban-toro-63517b204" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors">LinkedIn</a>
                    <span className="text-xs text-zinc-300">© {new Date().getFullYear()}</span>
                </div>
            </div>
        </footer>
    );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function LandingPage() {
    const [showDemo, setShowDemo] = useState(false);

    useEffect(() => {
        if (document.querySelector('script[src*="lemonsqueezy"]')) return;
        const script = document.createElement("script");
        script.src = "https://app.lemonsqueezy.com/js/lemon.js";
        script.defer = true;
        document.head.appendChild(script);
    }, []);

    return (
        <main className="min-h-screen bg-white font-sans antialiased">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Geist+Mono:wght@400;500&display=swap');
        body { font-family: 'Geist', system-ui, -apple-system, sans-serif; }
        .font-mono { font-family: 'Geist Mono', monospace; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        main > * { animation: fadeInUp 0.5s ease both; }
        main > *:nth-child(1) { animation-delay: 0ms; }
        main > *:nth-child(2) { animation-delay: 80ms; }
        main > *:nth-child(3) { animation-delay: 160ms; }
        main > *:nth-child(4) { animation-delay: 240ms; }
      `}</style>

            {showDemo && (
                <div
                    style={{
                        position: "fixed", inset: 0, zIndex: 9999,
                        background: "rgba(0,0,0,0.72)",
                        backdropFilter: "blur(6px)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                    onClick={(e) => { if (e.target === e.currentTarget) setShowDemo(false); }}
                >
                    <GetStarted onDismiss={() => setShowDemo(false)} />
                </div>
            )}

            <Navbar />
            <Hero onOpenDemo={() => { track("hero_demo_stepper"); setShowDemo(true); }} />
            <Problem />
            <UseCases />
            <HowItWorks />
            <LLMSection />
            <Capabilities />
            <ForWho />
            <Author />
            <FinalCTA />
            <PricingCTA />
            <Footer />
        </main>
    );
}
