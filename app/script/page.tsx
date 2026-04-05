"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

type NodeProps = {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
};

function FlowNode({ title, children, defaultOpen = false }: NodeProps) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="border border-neutral-200 rounded-2xl bg-white shadow-sm transition-all">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between p-5 text-left"
            >
                <span className="font-semibold text-lg">{title}</span>
                {open ? (
                    <ChevronDown className="w-5 h-5" />
                ) : (
                    <ChevronRight className="w-5 h-5" />
                )}
            </button>

            {open && (
                <div className="px-5 pb-6 text-neutral-700 space-y-4 text-[15px] leading-relaxed border-t border-neutral-100">
                    {children}
                </div>
            )}
        </div>
    );
}

function Connector() {
    return (
        <div className="flex justify-center">
            <div className="w-[2px] h-8 bg-neutral-300" />
        </div>
    );
}

export default function ScriptPremiumPage() {
    return (
        <main className="min-h-screen bg-neutral-50 px-6 py-16">
            <div className="max-w-4xl mx-auto space-y-6">

                <div className="text-center space-y-3 mb-12">
                    <h1 className="text-4xl font-bold">
                        🧠 Arquitectura del Script de Venta
                    </h1>
                    <p className="text-neutral-600">
                        Flujo estratégico para vender la Guía + Template Agente IA
                    </p>
                </div>

                {/* 1️⃣ FILTRO INICIAL */}
                <FlowNode title="1️⃣ Filtro Inicial" defaultOpen>
                    <p>
                        Hola 👋 gracias por escribir.
                    </p>
                    <p>
                        Esta guía + template está diseñada para personas que quieren implementar su propio agente de IA profesional, no algo improvisado.
                    </p>
                    <p className="font-medium">
                        Pregunta clave:
                    </p>
                    <p>
                        ¿Quieres usarlo para tu propio proyecto o para ofrecerlo como servicio a clientes?
                    </p>
                </FlowNode>

                <Connector />

                {/* RAMAS */}
                <div className="grid md:grid-cols-2 gap-6">

                    {/* Proyecto propio */}
                    <FlowNode title="2️⃣ Rama: Para mi proyecto">
                        <ul className="list-disc ml-5 space-y-2">
                            <li>Template base listo para desplegar</li>
                            <li>Arquitectura organizada en Next.js</li>
                            <li>Guía PDF paso a paso</li>
                            <li>Configuración de prompts y personalidad</li>
                            <li>Checklist técnico de dominio y entorno</li>
                        </ul>

                        <p className="mt-4">
                            No es solo teoría, es implementación real.
                        </p>

                        <p className="font-medium">
                            Pregunta de avance:
                        </p>
                        <p>
                            ¿Ya tienes algo construido o empezarías desde cero?
                        </p>
                    </FlowNode>

                    {/* Para clientes */}
                    <FlowNode title="3️⃣ Rama: Para venderlo a clientes">
                        <p>
                            Excelente decisión.
                        </p>
                        <p>
                            Muchos lo usan como base para ofrecer soluciones de IA personalizadas sin desarrollar desde cero.
                        </p>
                        <p>
                            Te ahorra semanas de arquitectura y pruebas.
                        </p>

                        <p className="font-medium">
                            Pregunta de avance:
                        </p>
                        <p>
                            ¿Actualmente trabajas como freelance o tienes agencia?
                        </p>
                    </FlowNode>

                </div>

                <Connector />

                {/* OFERTA */}
                <FlowNode title="4️⃣ Presentación Formal de la Oferta">
                    <ul className="list-disc ml-5 space-y-2">
                        <li>Template base funcional</li>
                        <li>Guía PDF paso a paso</li>
                        <li>Acceso inmediato tras pago</li>
                        <li>Garantía de 7 días</li>
                        <li>Soporte técnico 7 días</li>
                    </ul>

                    <div className="bg-neutral-100 p-4 rounded-xl mt-4">
                        <p className="font-semibold text-lg">
                            Inversión: $365.000 COP
                        </p>
                        <p>Acepto Nequi.</p>
                    </div>
                </FlowNode>

                <Connector />

                {/* OBJECIONES */}
                <FlowNode title="5️⃣ Manejo de Objeciones">

                    <div className="space-y-4">

                        <div>
                            <p className="font-semibold">“Está caro”</p>
                            <p>
                                Está pensado para quienes quieren ahorrar tiempo técnico y lanzar algo profesional rápidamente.
                            </p>
                        </div>

                        <div>
                            <p className="font-semibold">“Lo voy a pensar”</p>
                            <p>
                                ¿Qué te gustaría tener claro antes de decidir?
                            </p>
                        </div>

                        <div>
                            <p className="font-semibold">“No tengo dinero ahora”</p>
                            <p>
                                Cuando decidas implementarlo, con gusto puedo enviarte la información nuevamente.
                            </p>
                        </div>

                    </div>
                </FlowNode>

                <Connector />

                {/* PRINCIPIOS */}
                <FlowNode title="🎯 Principios del Tono Premium">
                    <ul className="list-disc ml-5 space-y-2">
                        <li>No perseguir</li>
                        <li>No justificar de más</li>
                        <li>No bajar precio</li>
                        <li>No crear urgencia falsa</li>
                        <li>Filtrar curiosos</li>
                        <li>Hablar como arquitecto, no como vendedor</li>
                    </ul>
                </FlowNode>

            </div>
        </main>
    );
}