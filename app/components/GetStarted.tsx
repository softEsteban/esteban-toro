"use client";

import { useState, useEffect } from "react";

// ─── Config ────────────────────────────────────────────────────────────────
// Replace with your actual Lemon Squeezy checkout URL (add ?embed=1 for overlay)
const CHECKOUT_URL = "https://estebantoroar.lemonsqueezy.com/checkout/buy/4508ec85-41ca-452d-a545-8f8c9760e088?embed=1";

const WHATSAPP_NUMBER = "573045500182";
const WHATSAPP_MSG = encodeURIComponent(
  "Hola Esteban! Vi la demo de Agent Kit y tengo algunas preguntas. ¿Podemos hablar?"
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

// ─── Step definitions ──────────────────────────────────────────────────────

const STEPS = [
  {
    id: "welcome",
    icon: "◈",
    iconColor: "#c97c3a",
    tag: "Bienvenido",
    title: "Tu agente de IA,\nconfigured your way.",
    description:
      "AgentStudio te permite crear agentes conversacionales inteligentes conectados a tus LLMs favoritos y a tu propia base de conocimiento. En menos de 5 minutos tendrás tu primer agente listo.",
    visual: "welcome",
    cta: "Empezar →",
  },
  {
    id: "profile",
    icon: "◇",
    iconColor: "#6366f1",
    tag: "Paso 1 — Perfil",
    title: "Define quién es\ntu agente.",
    description:
      "En Perfil configuras la identidad del agente: su nombre, rol, tono de voz y comportamiento base. Esto determina cómo se presentará ante tus usuarios.",
    visual: "profile",
    cta: "Siguiente →",
  },
  {
    id: "prompt",
    icon: "❯",
    iconColor: "#22c55e",
    tag: "Paso 2 — Prompt Base",
    title: "Instrucciones que\nguían cada respuesta.",
    description:
      "El Prompt Base es el sistema de instrucciones permanente que el agente sigue en cada conversación. Aquí defines reglas, contexto de negocio, restricciones y objetivos.",
    visual: "prompt",
    cta: "Siguiente →",
  },
  {
    id: "llm",
    icon: "✦",
    iconColor: "#c97c3a",
    tag: "Paso 3 — LLMs",
    title: "Elige el modelo\nque impulsa tu agente.",
    description:
      "Conecta Claude, OpenAI o Gemini con tu API key. Puedes cambiar de modelo en cualquier momento y probar la conexión antes de activar.",
    visual: "llm",
    cta: "Siguiente →",
  },
  {
    id: "knowledge",
    icon: "▣",
    iconColor: "#4285f4",
    tag: "Paso 4 — Knowledge Base",
    title: "Tu agente aprende\nde tus documentos.",
    description:
      "Sube PDFs con manuales, catálogos, políticas o cualquier documento. El agente los indexará y los usará para responder con información precisa de tu negocio.",
    visual: "knowledge",
    cta: "Siguiente →",
  },
  {
    id: "functions",
    icon: "⚡",
    iconColor: "#a855f7",
    tag: "Paso 5 — Funciones y Tablas",
    title: "Acciones reales\ny datos estructurados.",
    description:
      "Las Funciones permiten que tu agente ejecute tareas concretas: enviar mensajes, crear leads, buscar en la web y más. Las Tablas le dan acceso a información estructurada de tu negocio en tiempo real.",
    visual: "functions",
    cta: "Siguiente →",
  },
  {
    id: "ready",
    icon: "★",
    iconColor: "#f59e0b",
    tag: "¡Listo!",
    title: "Tu agente está\npreparado.",
    description:
      "Usa Preview para probar la conversación en tiempo real. Cuando estés satisfecho, guarda los cambios y comparte tu agente con el mundo.",
    visual: "ready",
    cta: "Ir al Studio →",
  },
];

// ─── Visual illustrations per step ────────────────────────────────────────

function StepVisual({ id }: { id: string }) {
  switch (id) {
    case "welcome":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
          {[
            { label: "Perfil", icon: "◇", color: "#6366f1", w: "70%" },
            { label: "Prompt Base", icon: "❯", color: "#22c55e", w: "90%" },
            { label: "LLMs", icon: "✦", color: "#c97c3a", w: "55%" },
            { label: "Knowledge Base", icon: "▣", color: "#4285f4", w: "80%" },
            { label: "Funciones y Tablas", icon: "⚡", color: "#a855f7", w: "65%" },
          ].map((item, i) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.04)",
                animation: `gsSlideIn 0.4s ease ${i * 0.08}s both`,
              }}
            >
              <span style={{ color: item.color, fontSize: 14, width: 16 }}>{item.icon}</span>
              <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.7)", flex: 1 }}>{item.label}</span>
              <div style={{ height: 4, width: item.w, borderRadius: 2, background: item.color, opacity: 0.5 }} />
            </div>
          ))}
        </div>
      );

    case "profile":
      return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 8, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(99,102,241,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>◇</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Ms. Sofía Rodríguez</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>Sales Representative</div>
            </div>
          </div>
          {[
            { label: "Nombre", value: "Sofía" },
            { label: "Rol", value: "Sales Rep" },
            { label: "Tono", value: "Profesional · Cercano" },
          ].map((row) => (
            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 14px", borderRadius: 7, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.4)" }}>{row.label}</span>
              <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.75)" }}>{row.value}</span>
            </div>
          ))}
        </div>
      );

    case "prompt":
      return (
        <div style={{ width: "100%", fontFamily: "monospace" }}>
          <div style={{ padding: "12px 14px", borderRadius: 8, background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)", fontSize: 11.5, lineHeight: 1.8, color: "rgba(255,255,255,0.6)" }}>
            <span style={{ color: "#22c55e" }}>Eres</span> un asistente de ventas experto
            {" "}<span style={{ color: "rgba(255,255,255,0.3)" }}>para la empresa</span>{" "}
            <span style={{ color: "#c97c3a" }}>Acme Corp</span>.<br />
            <span style={{ color: "#22c55e" }}>Tu objetivo</span>{" "}
            <span style={{ color: "rgba(255,255,255,0.3)" }}>es ayudar a los clientes a</span>{" "}
            encontrar el producto ideal.<br />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>Siempre sé</span>{" "}
            <span style={{ color: "#6366f1" }}>claro, honesto</span>{" "}
            <span style={{ color: "rgba(255,255,255,0.3)" }}>y conciso.</span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.2)" }}>{"//"} No discutas precios sin consultar...</span>
          </div>
        </div>
      );

    case "llm":
      return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { icon: "✦", label: "Claude", model: "Sonnet 4.5", color: "#c97c3a", active: false },
            { icon: "⬡", label: "OpenAI", model: "GPT-4o", color: "#19c37d", active: false },
            { icon: "◈", label: "Gemini", model: "2.0 Flash", color: "#4285f4", active: true },
          ].map((p) => (
            <div key={p.label} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "11px 14px",
              borderRadius: 8,
              border: `1px solid ${p.active ? p.color : "rgba(255,255,255,0.07)"}`,
              background: p.active ? `${p.color}18` : "rgba(255,255,255,0.03)",
            }}>
              <span style={{ color: p.color, fontSize: 16, width: 18 }}>{p.icon}</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", flex: 1 }}>{p.label}</span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{p.model}</span>
              {p.active && <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />}
            </div>
          ))}
        </div>
      );

    case "knowledge":
      return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { name: "catalogo-2024.pdf", size: "2.4 MB", chunks: 142, status: "ok" },
            { name: "politicas-devoluciones.pdf", size: "380 KB", chunks: 28, status: "ok" },
            { name: "manual-tecnico.pdf", size: "5.1 MB", chunks: 0, status: "loading" },
          ].map((f) => (
            <div key={f.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <span style={{ fontSize: 16 }}>📄</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</div>
                <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>
                  {f.size}{f.status === "ok" && ` · ${f.chunks} chunks`}
                </div>
              </div>
              {f.status === "ok"
                ? <span style={{ fontSize: 12, color: "#22c55e" }}>✓</span>
                : <span style={{ fontSize: 10, color: "#c97c3a", animation: "gsPulse 1s ease infinite" }}>⟳</span>
              }
            </div>
          ))}
        </div>
      );

    case "functions":
      return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { icon: "💬", label: "Send WhatsApp", category: "Communication", color: "#a855f7", active: true },
            { icon: "🎯", label: "Create Lead", category: "CRM", color: "#6366f1", active: true },
            { icon: "🔍", label: "Web Search", category: "Research", color: "#22c55e", active: false },
          ].map((fn, i) => (
            <div
              key={fn.label}
              style={{
                display: "flex", alignItems: "center", gap: 10, padding: "10px 13px",
                borderRadius: 8,
                background: fn.active ? `${fn.color}12` : "rgba(255,255,255,0.03)",
                border: `1px solid ${fn.active ? fn.color + "35" : "rgba(255,255,255,0.07)"}`,
                animation: `gsSlideIn 0.4s ease ${i * 0.08}s both`,
              }}
            >
              <span style={{ fontSize: 14, width: 20 }}>{fn.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, color: fn.active ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.45)", fontWeight: 500 }}>{fn.label}</div>
                <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.25)", marginTop: 1 }}>{fn.category}</div>
              </div>
              <div style={{
                width: 28, height: 16, borderRadius: 8,
                background: fn.active ? fn.color : "rgba(255,255,255,0.1)",
                position: "relative", flexShrink: 0,
              }}>
                <div style={{
                  position: "absolute", top: 2, left: fn.active ? 14 : 2,
                  width: 12, height: 12, borderRadius: "50%",
                  background: "#fff",
                }} />
              </div>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 13px", borderRadius: 8, background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.18)", marginTop: 2 }}>
            <span style={{ fontSize: 12 }}>🗄️</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>Tabla: clientes_potenciales</div>
              <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.25)", marginTop: 1 }}>3 columnas · 128 filas</div>
            </div>
            <span style={{ fontSize: 10, color: "#a855f7", fontWeight: 500 }}>LIVE</span>
          </div>
        </div>
      );

    case "ready":
      return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ padding: "12px 14px", borderRadius: 8, background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Preview — Sofía</div>
            {[
              { who: "user", msg: "Hola, ¿qué productos tienen?" },
              { who: "agent", msg: "¡Hola! Tenemos más de 200 productos. ¿Te interesa alguna categoría en particular?" },
            ].map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.who === "user" ? "flex-end" : "flex-start", marginBottom: 6 }}>
                <div style={{
                  maxWidth: "80%", padding: "7px 11px", borderRadius: m.who === "user" ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
                  background: m.who === "user" ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.08)",
                  fontSize: 11.5, color: "rgba(255,255,255,0.8)", lineHeight: 1.5,
                }}>
                  {m.msg}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["✓ LLM activo", "✓ 2 docs", "✓ Perfil listo"].map(t => (
              <div key={t} style={{ flex: 1, padding: "7px 0", textAlign: "center", fontSize: 10.5, color: "#22c55e", background: "rgba(34,197,94,0.08)", borderRadius: 6, border: "1px solid rgba(34,197,94,0.2)" }}>{t}</div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

// ─── Main component ────────────────────────────────────────────────────────

interface GetStartedProps {
  onDismiss?: () => void;
}

export function GetStarted({ onDismiss }: GetStartedProps) {
  const [step, setStep] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (document.querySelector('script[src*="lemonsqueezy"]')) return;
    const script = document.createElement("script");
    script.src = "https://app.lemonsqueezy.com/js/lemon.js";
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const progress = (step / (STEPS.length - 1)) * 100;

  const goNext = () => {
    if (isLast) {
      onDismiss?.();
      return;
    }
    setExiting(true);
    setTimeout(() => {
      setStep((s) => s + 1);
      setExiting(false);
    }, 180);
  };

  const goPrev = () => {
    if (step === 0) return;
    setExiting(true);
    setTimeout(() => {
      setStep((s) => s - 1);
      setExiting(false);
    }, 180);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        .gs-root * { box-sizing: border-box; }

        .gs-root {
          font-family: 'DM Sans', sans-serif;
          background: transparent;
          min-height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .gs-card {
          width: 100%;
          max-width: 460px;
          border-radius: 16px;
          background: #141416;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 8px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset;
          overflow: hidden;
          position: relative;
        }

        .gs-progress-bar {
          height: 2px;
          background: rgba(255,255,255,0.06);
          position: relative;
        }
        .gs-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #c97c3a, #f59e0b);
          transition: width 0.4s cubic-bezier(.4,0,.2,1);
          border-radius: 1px;
        }

        .gs-top {
          padding: 24px 28px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .gs-tag {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }

        .gs-close {
          background: none; border: none; cursor: pointer;
          color: rgba(255,255,255,0.3); padding: 4px;
          font-size: 18px; line-height: 1;
          transition: color .15s;
        }
        .gs-close:hover { color: rgba(255,255,255,0.7); }

        .gs-body {
          padding: 20px 28px 28px;
          opacity: 1;
          transform: translateY(0);
          transition: opacity .18s ease, transform .18s ease;
        }
        .gs-body.exiting {
          opacity: 0;
          transform: translateY(8px);
        }

        .gs-icon-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }
        .gs-icon-glyph {
          font-size: 22px;
        }

        .gs-title {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          line-height: 1.2;
          color: #fff;
          white-space: pre-line;
          margin-bottom: 14px;
          letter-spacing: -0.01em;
        }

        .gs-desc {
          font-size: 13.5px;
          line-height: 1.7;
          color: rgba(255,255,255,0.45);
          margin-bottom: 24px;
          font-weight: 300;
        }

        .gs-visual {
          margin-bottom: 28px;
          min-height: 130px;
          display: flex;
          align-items: flex-start;
        }

        .gs-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .gs-back {
          background: none; border: none; cursor: pointer;
          color: rgba(255,255,255,0.3); font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          padding: 0;
          transition: color .15s;
        }
        .gs-back:hover { color: rgba(255,255,255,0.6); }

        .gs-dots {
          display: flex;
          gap: 5px;
          align-items: center;
        }
        .gs-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(255,255,255,0.15);
          transition: all .2s;
          border: none; cursor: pointer; padding: 0;
        }
        .gs-dot.active {
          background: #c97c3a;
          width: 16px;
          border-radius: 3px;
        }

        .gs-cta {
          padding: 10px 22px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          border: none;
          transition: opacity .15s, transform .1s;
        }
        .gs-cta:hover { opacity: 0.88; }
        .gs-cta:active { transform: scale(0.97); }

        @keyframes gsSlideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @keyframes gsPulse {
          0%, 100% { opacity: 1; transform: rotate(0deg); }
          50% { opacity: 0.6; transform: rotate(180deg); }
        }
      `}</style>

      <div className="gs-root">
        <div className="gs-card">
          <div className="gs-progress-bar">
            <div className="gs-progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="gs-top">
            <span className="gs-tag">{current.tag}</span>
            <button className="gs-close" onClick={onDismiss} title="Cerrar">×</button>
          </div>

          <div className={`gs-body ${exiting ? "exiting" : ""}`}>
            <div className="gs-icon-row">
              <span className="gs-icon-glyph" style={{ color: current.iconColor }}>{current.icon}</span>
            </div>

            <div className="gs-title">{current.title}</div>

            <p className="gs-desc">{current.description}</p>

            <div className="gs-visual">
              <StepVisual id={current.id} />
            </div>

            {isLast ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div className="gs-actions" style={{ marginBottom: 4 }}>
                  <button className="gs-back" onClick={goPrev}>← Atrás</button>
                  <div className="gs-dots">
                    {STEPS.map((s, i) => (
                      <button key={s.id} className={`gs-dot ${i === step ? "active" : ""}`} onClick={() => setStep(i)} />
                    ))}
                  </div>
                  <div style={{ width: 60 }} />
                </div>
                <a
                  href={CHECKOUT_URL}
                  className="lemonsqueezy-button"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "13px 0", borderRadius: 10,
                    background: "linear-gradient(135deg, #c97c3a, #f59e0b)",
                    color: "#fff", fontWeight: 600, fontSize: 14,
                    fontFamily: "'DM Sans', sans-serif",
                    textDecoration: "none", cursor: "pointer",
                    transition: "opacity .15s, transform .1s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  <span style={{ fontSize: 16 }}>🛒</span>
                  Agregar al carrito
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "12px 0", borderRadius: 10,
                    background: "rgba(37,211,102,0.12)",
                    border: "1px solid rgba(37,211,102,0.3)",
                    color: "#25d366", fontWeight: 500, fontSize: 13.5,
                    fontFamily: "'DM Sans', sans-serif",
                    textDecoration: "none", cursor: "pointer",
                    transition: "opacity .15s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Consultar por WhatsApp
                </a>
              </div>
            ) : (
              <div className="gs-actions">
                <button className="gs-back" onClick={goPrev} style={{ visibility: step === 0 ? "hidden" : "visible" }}>
                  ← Atrás
                </button>
                <div className="gs-dots">
                  {STEPS.map((s, i) => (
                    <button key={s.id} className={`gs-dot ${i === step ? "active" : ""}`} onClick={() => setStep(i)} />
                  ))}
                </div>
                <button
                  className="gs-cta"
                  onClick={goNext}
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.8)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  {current.cta}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
