'use client';

// import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState, ReactNode, CSSProperties, useEffect } from "react";
import { PDFDocument } from "./PDFDocument";
import { supabase } from "@/lib/supabase";

import dynamic from "next/dynamic";

const PDFDownloadLink = dynamic(
    () =>
        import("@react-pdf/renderer").then(
            (mod) => mod.PDFDownloadLink
        ),
    { ssr: false }
);

type NodeType = "course" | "folder" | "document";

interface TreeNode {
    id: string;
    name: string;
    type: NodeType;
    parent_id: string | null;
    children?: TreeNode[];
}


// ─── TYPES ────────────────────────────────────────────────────────────────────

type BlockType = "cover" | "text" | "code" | "callout" | "checklist" | "table" | "cta";
type CalloutVariant = "tip" | "warning" | "danger" | "info" | "success";
type HeadingLevel = 1 | 2 | 3;
type TabType = "preview" | "editor";
type MoveDirection = "up" | "down";

interface CoverData {
    title: string;
    subtitle: string;
    version: string;
    author: string;
    accentColor: string;
    theme: "dark" | "light";
}

interface TextData {
    heading?: string;
    headingLevel?: HeadingLevel;
    body: string;
    style?: "normal" | "intro" | "caption";
}

interface CodeData {
    language: string;
    code: string;
    caption?: string;
    showLineNumbers?: boolean;
}

interface CalloutData {
    variant: CalloutVariant;
    title: string;
    body: string;
    icon?: string;
}

interface ChecklistItem {
    id: string;
    label: string;
    description?: string;
    done: boolean;
}

interface ChecklistData {
    title?: string;
    items: ChecklistItem[];
}

interface TableData {
    caption?: string;
    headers: string[];
    rows: string[][];
    highlightFirstColumn?: boolean;
}

interface CTAData {
    headline: string;
    subtext: string;
    buttonText: string;
    buttonUrl: string;
    variant: "dark" | "accent";
}

type BlockData = CoverData | TextData | CodeData | CalloutData | ChecklistData | TableData | CTAData;

interface Block {
    id: string;
    type: BlockType;
    order: number;
    data: BlockData;
}

interface CalloutStyle {
    bg: string;
    border: string;
    icon: string;
    label: string;
}

async function createNode(
    name: string,
    type: NodeType,
    parent_id: string | null
) {
    const { data } = await supabase
        .from("nodes")
        .insert({ name, type, parent_id })
        .select()
        .single();

    if (!data) return;

    if (type === "document") {
        await supabase.from("documents").insert({
            title: name,
            blocks: [],
            node_id: data.id,
        });
    }

    location.reload(); // or re-fetch tree properly
}

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

// const INITIAL_BLOCKS: Block[] = [
//     {
//         id: "b1", type: "cover", order: 0,
//         data: { title: "AI SaaS Starter Kit - Construye y Despliega tu Primer Agente con\nNext.js + Claude API", subtitle: "Tu sistema listo para monetizar en 48h", version: "v1.0", author: "Tu Nombre", accentColor: "#818cf8", theme: "dark" } as CoverData
//     },
//     {
//         id: "b2", type: "callout", order: 1,
//         data: { variant: "tip", title: "Antes de empezar", body: "Asegúrate de tener Node 18+, cuenta Vercel y Namecheap configurados.", icon: "💡" } as CalloutData
//     },
//     {
//         id: "b3", type: "text", order: 2,
//         data: { heading: "Módulo 1: Arquitectura Base", headingLevel: 1, body: "El proyecto usa Next.js App Router con TypeScript. La estructura está optimizada para escalar desde MVP a producto completo sin refactors dolorosos." } as TextData
//     },
//     {
//         id: "b4", type: "code", order: 3,
//         data: { language: "bash", code: "npx create-next-app@latest mi-ai-saas --typescript\ncd mi-ai-saas\nnpm install @react-pdf/renderer zod", caption: "Setup inicial del proyecto" } as CodeData
//     },
//     {
//         id: "b5", type: "checklist", order: 4,
//         data: {
//             title: "Deploy Checklist", items: [
//                 { id: "c1", label: "Conectar repo a Vercel", description: "Importar desde GitHub en vercel.com/new", done: true },
//                 { id: "c2", label: "Configurar variables de entorno", description: "STUDIO_ACCESS_TOKEN + claves de API", done: true },
//                 { id: "c3", label: "Apuntar dominio Namecheap", description: "CNAME → cname.vercel-dns.com", done: false },
//             ]
//         } as ChecklistData
//     },
//     {
//         id: "b6", type: "table", order: 5,
//         data: {
//             caption: "Comparativa de planes", headers: ["Plan", "Precio", "Guías", "Usuarios"], rows: [
//                 ["Starter", "$0", "1", "1"],
//                 ["Pro", "$29/mo", "Ilimitadas", "5"],
//                 ["Enterprise", "$99/mo", "Ilimitadas", "Ilimitados"],
//             ], highlightFirstColumn: true
//         } as TableData
//     },
//     {
//         id: "b7", type: "cta", order: 6,
//         data: { headline: "¿Listo para lanzar?", subtext: "Descarga el repo, configura en 30 min, empieza a cobrar.", buttonText: "Obtener Acceso →", buttonUrl: "#", variant: "dark" } as CTAData
//     },
// ];

const BLOCK_TYPES: { type: BlockType; label: string; icon: string }[] = [
    { type: "text", label: "Texto", icon: "T" },
    { type: "code", label: "Código", icon: "</>" },
    { type: "callout", label: "Callout", icon: "!" },
    { type: "checklist", label: "Checklist", icon: "✓" },
    { type: "table", label: "Tabla", icon: "⊞" },
    { type: "cta", label: "CTA", icon: "→" },
];

const CALLOUT_STYLES: Record<CalloutVariant, CalloutStyle> = {
    tip: { bg: "#1e1b4b", border: "#818cf8", icon: "💡", label: "Tip" },
    warning: { bg: "#1c1708", border: "#facc15", icon: "⚠️", label: "Warning" },
    danger: { bg: "#1f0a0a", border: "#f87171", icon: "🚨", label: "Danger" },
    info: { bg: "#071726", border: "#38bdf8", icon: "ℹ️", label: "Info" },
    success: { bg: "#071a0e", border: "#4ade80", icon: "✅", label: "Success" },
};

// ─── BLOCK RENDERERS ──────────────────────────────────────────────────────────

function BlockCover({ data }: { data: CoverData }): ReactNode {
    return (
        <div style={{
            background: "linear-gradient(135deg, #0f0f1a 0%, #1a1035 50%, #0f0f1a 100%)",
            padding: "60px 48px", borderRadius: 12, position: "relative", overflow: "hidden",
            minHeight: 280
        }}>
            <div style={{
                position: "absolute", top: -60, right: -60, width: 300, height: 300,
                borderRadius: "50%", background: `radial-gradient(circle, ${data.accentColor}33 0%, transparent 70%)`
            }} />
            <div style={{
                position: "absolute", bottom: -40, left: -40, width: 200, height: 200,
                borderRadius: "50%", background: `radial-gradient(circle, ${data.accentColor}22 0%, transparent 70%)`
            }} />
            <div style={{
                display: "inline-block", background: `${data.accentColor}22`, border: `1px solid ${data.accentColor}44`,
                borderRadius: 20, padding: "4px 12px", fontSize: 11, color: data.accentColor, marginBottom: 20,
                fontFamily: "monospace"
            }}>{data.version}</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 12, fontFamily: "'Georgia', serif" }}>
                {data.title}
            </div>
            <div style={{ fontSize: 15, color: "#a5b4fc", lineHeight: 1.5, marginBottom: 24 }}>{data.subtitle}</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>Por <span style={{ color: "#e2e8f0" }}>{data.author}</span></div>
        </div>
    );
}

function BlockText({ data }: { data: TextData }): ReactNode {
    const sizes: Record<HeadingLevel, number> = { 1: 22, 2: 17, 3: 14 };
    const level = data.headingLevel ?? 1;
    return (
        <div style={{ padding: "0 4px" }}>
            {data.heading && (
                <div style={{
                    fontSize: sizes[level], fontWeight: 700,
                    color: "#f1f5f9", marginBottom: 10,
                    borderLeft: level === 1 ? "3px solid #818cf8" : "none",
                    paddingLeft: level === 1 ? 12 : 0,
                }}>{data.heading}</div>
            )}
            <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>{data.body}</div>
        </div>
    );
}

function BlockCode({ data }: { data: CodeData }): ReactNode {
    const [expanded, setExpanded] = useState(false);
    const [copied, setCopied] = useState(false);

    const MAX_HEIGHT = 180;

    const lines = data.code.split("\n").length;
    const isLong = lines > 8;

    function handleCopy() {
        navigator.clipboard.writeText(data.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }

    return (
        <div
            style={{
                borderRadius: 10,
                overflow: "hidden",
                border: "1px solid #1e293b",
            }}
        >
            {/* ─── Header ─── */}
            <div
                style={{
                    background: "#0d1117",
                    padding: "8px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #1e293b",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {/* Mac dots */}
                    <div style={{ display: "flex", gap: 6 }}>
                        {(["#f87171", "#facc15", "#4ade80"] as const).map((c) => (
                            <div
                                key={c}
                                style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: "50%",
                                    background: c,
                                }}
                            />
                        ))}
                    </div>

                    {/* Language */}
                    <span
                        style={{
                            fontSize: 11,
                            color: "#475569",
                            fontFamily: "monospace",
                        }}
                    >
                        {data.language}
                    </span>

                    {/* Line counter */}
                    <span
                        style={{
                            fontSize: 11,
                            color: "#334155",
                            fontFamily: "monospace",
                        }}
                    >
                        {lines} lines
                    </span>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 8 }}>
                    {/* Copy */}
                    <button
                        onClick={handleCopy}
                        style={{
                            background: "#0f172a",
                            border: "1px solid #1e293b",
                            borderRadius: 6,
                            padding: "4px 10px",
                            fontSize: 11,
                            color: copied ? "#4ade80" : "#818cf8",
                            cursor: "pointer",
                            transition: "all 0.15s",
                        }}
                    >
                        {copied ? "Copied ✓" : "Copy"}
                    </button>

                    {/* Expand toggle */}
                    {isLong && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            style={{
                                background: "transparent",
                                border: "1px solid #1e293b",
                                borderRadius: 6,
                                padding: "4px 10px",
                                fontSize: 11,
                                color: "#94a3b8",
                                cursor: "pointer",
                                transition: "all 0.15s",
                            }}
                        >
                            {expanded ? "Show less ↑" : "Show more ↓"}
                        </button>
                    )}
                </div>
            </div>

            {/* ─── Code Body ─── */}
            <div
                style={{
                    background: "#0a0e1a",
                    padding: "16px 20px",
                    maxHeight: expanded ? "none" : MAX_HEIGHT,
                    overflow: "hidden",
                    position: "relative",
                    transition: "max-height 0.25s ease",
                }}
            >
                <pre
                    style={{
                        margin: 0,
                        fontFamily: "monospace",
                        fontSize: 12,
                        color: "#e2e8f0",
                        lineHeight: 1.7,
                        whiteSpace: "pre-wrap",
                    }}
                >
                    {data.code}
                </pre>

                {/* Gradient fade when collapsed */}
                {!expanded && isLong && (
                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: 60,
                            background:
                                "linear-gradient(to bottom, rgba(10,14,26,0) 0%, #0a0e1a 100%)",
                        }}
                    />
                )}
            </div>

            {/* ─── Caption ─── */}
            {data.caption && (
                <div
                    style={{
                        background: "#0d1117",
                        padding: "6px 16px",
                        fontSize: 11,
                        color: "#475569",
                        borderTop: "1px solid #1e293b",
                    }}
                >
                    {data.caption}
                </div>
            )}
        </div>
    );
}

function BlockCallout({ data }: { data: CalloutData }): ReactNode {
    const s = CALLOUT_STYLES[data.variant] ?? CALLOUT_STYLES.tip;
    return (
        <div style={{ background: s.bg, border: `1px solid ${s.border}33`, borderLeft: `3px solid ${s.border}`, borderRadius: 10, padding: "14px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 15 }}>{data.icon ?? s.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: s.border }}>{data.title}</span>
            </div>
            <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.6 }}>{data.body}</div>
        </div>
    );
}

function BlockChecklist({ data }: { data: ChecklistData }): ReactNode {
    return (
        <div>
            {data.title && <div style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9", marginBottom: 12 }}>{data.title}</div>}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {data.items.map(item => (
                    <div key={item.id} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#0f172a", borderRadius: 8, padding: "10px 14px", border: "1px solid #1e293b" }}>
                        <div style={{
                            width: 18, height: 18, borderRadius: 5,
                            border: `2px solid ${item.done ? "#818cf8" : "#334155"}`,
                            background: item.done ? "#818cf8" : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0, marginTop: 1
                        }}>
                            {item.done && <span style={{ fontSize: 10, color: "#fff" }}>✓</span>}
                        </div>
                        <div>
                            <div style={{ fontSize: 13, color: item.done ? "#94a3b8" : "#e2e8f0", textDecoration: item.done ? "line-through" : "none" }}>{item.label}</div>
                            {item.description && <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>{item.description}</div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function BlockTable({ data }: { data: TableData }): ReactNode {
    return (
        <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid #1e293b" }}>
            {data.caption && (
                <div style={{ background: "#0d1117", padding: "8px 16px", fontSize: 11, color: "#475569", borderBottom: "1px solid #1e293b" }}>{data.caption}</div>
            )}
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ background: "#0f172a" }}>
                        {data.headers.map((h, i) => (
                            <th key={i} style={{ padding: "10px 14px", fontSize: 11, fontWeight: 600, color: "#818cf8", textAlign: "left", borderBottom: "1px solid #1e293b", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.rows.map((row, ri) => (
                        <tr key={ri} style={{ borderBottom: "1px solid #0f172a", background: ri % 2 === 0 ? "#050a14" : "#080e1c" }}>
                            {row.map((cell, ci) => (
                                <td key={ci} style={{ padding: "9px 14px", fontSize: 12, color: ci === 0 && data.highlightFirstColumn ? "#e2e8f0" : "#94a3b8" }}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function BlockCTA({ data }: { data: CTAData }): ReactNode {
    return (
        <div style={{
            background: "linear-gradient(135deg, #1e1b4b 0%, #2d1b69 100%)",
            border: "1px solid #4338ca44", borderRadius: 12, padding: "28px 32px", textAlign: "center"
        }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9", marginBottom: 8 }}>{data.headline}</div>
            <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 20 }}>{data.subtext}</div>
            <a href={data.buttonUrl} style={{
                display: "inline-block", background: "linear-gradient(135deg, #818cf8, #6366f1)",
                color: "#fff", padding: "10px 24px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                textDecoration: "none"
            }}>{data.buttonText}</a>
        </div>
    );
}

type BlockRendererMap = {
    [K in BlockType]?: React.FC<{ data: BlockData }>;
};

function BlockRenderer({ block }: { block: Block }): ReactNode {
    const map: BlockRendererMap = {
        cover: ({ data }) => <BlockCover data={data as CoverData} />,
        text: ({ data }) => <BlockText data={data as TextData} />,
        code: ({ data }) => <BlockCode data={data as CodeData} />,
        callout: ({ data }) => <BlockCallout data={data as CalloutData} />,
        checklist: ({ data }) => <BlockChecklist data={data as ChecklistData} />,
        table: ({ data }) => <BlockTable data={data as TableData} />,
        cta: ({ data }) => <BlockCTA data={data as CTAData} />,
    };
    const Component = map[block.type];
    return Component
        ? <Component data={block.data} />
        : <div style={{ color: "#ef4444", fontSize: 12 }}>Unknown block: {block.type}</div>;
}

// ─── BLOCK EDITOR ─────────────────────────────────────────────────────────────

interface BlockEditorProps {
    block: Block;
    onUpdate: (id: string, path: string, value: string) => void;
    onDelete: (id: string) => void;
    onMove: (id: string, dir: MoveDirection) => void;
    sortedBlocks: Block[];
}

function BlockEditor({ block, onUpdate, onDelete, onMove, sortedBlocks }: BlockEditorProps): ReactNode {
    const idx = sortedBlocks.findIndex(b => b.id === block.id);
    const isFirst = idx === 0;
    const isLast = idx === sortedBlocks.length - 1;

    const inputStyle: CSSProperties = {
        width: "100%", background: "#0f172a", border: "1px solid #1e293b",
        borderRadius: 8, padding: "9px 12px", color: "#e2e8f0", fontSize: 12, boxSizing: "border-box"
    };

    const textareaStyle: CSSProperties = {
        ...inputStyle, resize: "vertical", fontFamily: "monospace", lineHeight: 1.6
    };

    function field(
        label: string,
        path: string,
        value: string | undefined,
        type: string = "text",
        rows?: number
    ): ReactNode {
        return (
            <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>{label}</label>
                {rows ? (
                    <textarea
                        rows={rows}
                        value={value ?? ""}
                        onChange={e => onUpdate(block.id, path, e.target.value)}
                        style={textareaStyle}
                    />
                ) : (
                    <input
                        type={type}
                        value={value ?? ""}
                        onChange={e => onUpdate(block.id, path, e.target.value)}
                        style={inputStyle}
                    />
                )}
            </div>
        );
    }

    // const d = block.data as Record<string, string>;
    const d = block.data as unknown as Record<string, string>;

    return (
        <div style={{ maxWidth: 540 }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", textTransform: "capitalize" }}>{block.type} Block</div>
                    <div style={{ fontSize: 11, color: "#475569", fontFamily: "monospace" }}>id: {block.id}</div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                    <button
                        onClick={() => onMove(block.id, "up")}
                        disabled={isFirst}
                        style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 6, padding: "5px 10px", color: isFirst ? "#1e293b" : "#94a3b8", cursor: isFirst ? "default" : "pointer", fontSize: 14 }}
                    >↑</button>
                    <button
                        onClick={() => onMove(block.id, "down")}
                        disabled={isLast}
                        style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 6, padding: "5px 10px", color: isLast ? "#1e293b" : "#94a3b8", cursor: isLast ? "default" : "pointer", fontSize: 14 }}
                    >↓</button>
                    <button
                        onClick={() => onDelete(block.id)}
                        style={{ background: "#1a0a0a", border: "1px solid #7f1d1d", borderRadius: 6, padding: "5px 12px", color: "#f87171", cursor: "pointer", fontSize: 12 }}
                    >Eliminar</button>
                </div>
            </div>

            {/* Fields */}
            <div style={{ background: "#050a14", borderRadius: 12, border: "1px solid #0f172a", padding: "20px" }}>
                {block.type === "cover" && <>
                    {field("Título", "title", d.title)}
                    {field("Subtítulo", "subtitle", d.subtitle)}
                    {field("Versión", "version", d.version)}
                    {field("Autor", "author", d.author)}
                    {field("Color acento (hex)", "accentColor", d.accentColor, "color")}
                </>}

                {block.type === "text" && <>
                    {field("Título de sección", "heading", d.heading)}
                    {field("Cuerpo", "body", d.body, "text", 6)}
                </>}

                {block.type === "code" && <>
                    {field("Lenguaje", "language", d.language)}
                    {field("Código", "code", d.code, "text", 8)}
                    {field("Caption", "caption", d.caption)}
                </>}

                {block.type === "callout" && <>
                    {field("Título", "title", d.title)}
                    {field("Cuerpo", "body", d.body, "text", 4)}
                    {field("Emoji icono", "icon", d.icon)}
                </>}

                {block.type === "cta" && <>
                    {field("Headline", "headline", d.headline)}
                    {field("Subtexto", "subtext", d.subtext)}
                    {field("Texto botón", "buttonText", d.buttonText)}
                    {field("URL botón", "buttonUrl", d.buttonUrl)}
                </>}

                {(block.type === "checklist" || block.type === "table") && (
                    <div style={{ color: "#64748b", fontSize: 12, textAlign: "center", padding: 20 }}>
                        Edición avanzada de {block.type === "checklist" ? "items" : "filas/columnas"}
                        <br />
                        <span style={{ fontSize: 11, color: "#334155" }}>Disponible via JSON editor en v2</span>
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── SIDEBAR BLOCK ICON ───────────────────────────────────────────────────────

function blockIcon(type: BlockType): string {
    const icons: Record<BlockType, string> = {
        cover: "◼",
        text: "T",
        code: "</>",
        callout: "!",
        checklist: "✓",
        table: "⊞",
        cta: "→",
    };
    return icons[type];
}

function blockLabel(block: Block): string {
    // const d = block.data as Record<string, string>;
    // return d.title ?? d.heading ?? d.headline ?? block.type;

    return block.type;
}

// ─── MAIN STUDIO ──────────────────────────────────────────────────────────────

const BLOCK_TEMPLATES: Record<BlockType, BlockData> = {
    cover: { title: "Nuevo Cover", subtitle: "Subtítulo", version: "v1.0", author: "Tu Nombre", accentColor: "#818cf8", theme: "dark" } as CoverData,
    text: { heading: "Nuevo Módulo", headingLevel: 1, body: "Escribe tu contenido aquí..." } as TextData,
    code: { language: "typescript", code: "// Tu código aquí\nconst app = createApp();", caption: "" } as CodeData,
    callout: { variant: "tip", title: "Nota importante", body: "Descripción del callout.", icon: "💡" } as CalloutData,
    checklist: { title: "Lista de tareas", items: [{ id: "i1", label: "Primer item", description: "", done: false }] } as ChecklistData,
    table: { caption: "", headers: ["Columna 1", "Columna 2", "Columna 3"], rows: [["A", "B", "C"], ["D", "E", "F"]], highlightFirstColumn: false } as TableData,
    cta: { headline: "¡Actúa ahora!", subtext: "No esperes más.", buttonText: "Empezar →", buttonUrl: "#", variant: "dark" } as CTAData,
};

export default function PDFStudio(): ReactNode {

    function TreeItem({ node, level = 0 }: { node: TreeNode; level?: number }) {
        const isExpanded = expanded[node.id];

        function toggle() {
            setExpanded(prev => ({
                ...prev,
                [node.id]: !prev[node.id],
            }));
        }

        async function openDocument() {
            if (node.type !== "document") return;

            const { data } = await supabase
                .from("documents")
                .select("*")
                .eq("node_id", node.id)
                .single();

            if (data) {
                setBlocks(data.blocks);
                setDocumentId(data.id);
            }
        }

        return (
            <div>
                <div
                    style={{
                        padding: "6px 10px",
                        paddingLeft: 10 + level * 16,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12,
                        color: "#e2e8f0",
                    }}
                    onClick={node.type === "document" ? openDocument : toggle}
                >
                    {node.type !== "document" && (
                        <span>{isExpanded ? "▾" : "▸"}</span>
                    )}
                    <span>
                        {node.type === "course" && "📚"}
                        {node.type === "folder" && "📁"}
                        {node.type === "document" && "📄"}
                    </span>
                    {node.name}
                </div>

                {isExpanded &&
                    node.children?.map(child => (
                        <TreeItem key={child.id} node={child} level={level + 1} />
                    ))}
            </div>
        );
    }

    const [documentId, setDocumentId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    // const [blocks, setBlocks] = useState<Block[]>(INITIAL_BLOCKS);
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [tree, setTree] = useState<TreeNode[]>([]);
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    useEffect(() => {
        async function loadDocument() {
            const { data, error } = await supabase
                .from("documents")
                .select("*")
                // .eq("id", "")
                .single();

            if (data) {
                setBlocks(data.blocks);
                setDocumentId(data.id);
            }
        }

        loadDocument();
    }, []);

    useEffect(() => {
        async function loadTree() {
            const { data } = await supabase
                .from("nodes")
                .select("*");

            if (!data) return;

            const map: Record<string, TreeNode> = {};
            data.forEach((n: TreeNode) => {
                map[n.id] = { ...n, children: [] };
            });

            const roots: TreeNode[] = [];

            data.forEach((n: TreeNode) => {
                if (n.parent_id) {
                    map[n.parent_id]?.children?.push(map[n.id]);
                } else {
                    roots.push(map[n.id]);
                }
            });

            setTree(roots);
        }

        loadTree();
    }, []);

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [tab, setTab] = useState<TabType>("preview");

    const selected = blocks.find(b => b.id === selectedId) ?? null;
    const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);

    // const counterRef = useCallback(() => {
    //     let n = INITIAL_BLOCKS.length;
    //     return () => ++n;
    // }, [])();

    function addBlock(type: BlockType): void {
        const nb: Block = {
            // id: `b${counterRef()}`,
            id: `b${Date.now()}`,
            type,
            order: blocks.length,
            data: BLOCK_TEMPLATES[type],
        };
        setBlocks(prev => [...prev, nb]);
        setSelectedId(nb.id);
        setTab("editor");
    }

    function deleteBlock(id: string): void {
        setBlocks(prev => prev.filter(b => b.id !== id));
        if (selectedId === id) setSelectedId(null);
    }

    function moveBlock(id: string, dir: MoveDirection): void {
        setBlocks(prev => {
            const sorted = [...prev].sort((a, b) => a.order - b.order);
            const idx = sorted.findIndex(b => b.id === id);
            const newIdx = dir === "up" ? idx - 1 : idx + 1;
            if (newIdx < 0 || newIdx >= sorted.length) return prev;
            const a = sorted[idx];
            const b2 = sorted[newIdx];
            return prev.map(b => {
                if (b.id === a.id) return { ...b, order: b2.order };
                if (b.id === b2.id) return { ...b, order: a.order };
                return b;
            });
        });
    }

    function updateBlockData(id: string, path: string, value: string): void {
        setBlocks(prev => prev.map(b => {
            if (b.id !== id) return b;
            // const newData = { ...(b.data as Record<string, unknown>) };
            const newData = { ...(b.data as unknown as Record<string, unknown>) };
            const keys = path.split(".");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let obj: any = newData;
            for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
            obj[keys[keys.length - 1]] = value;
            // return { ...b, data: newData as BlockData };
            return { ...b, data: newData as unknown as BlockData };
        }));
    }

    useEffect(() => {
        if (!documentId) return;

        const timeout = setTimeout(() => {
            supabase
                .from("documents")
                .update({ blocks, updated_at: new Date() })
                .eq("id", documentId);
        }, 1500);

        return () => clearTimeout(timeout);
    }, [blocks]);

    async function saveDocument() {
        if (!documentId) return;

        await supabase
            .from("documents")
            .update({
                blocks,
                updated_at: new Date()
            })
            .eq("id", documentId);
    }

    async function createNewDocument() {
        try {
            setLoading(true);

            const { data, error } = await supabase
                .from("documents")
                .insert({
                    title: "Untitled Guide",
                    // blocks: INITIAL_BLOCKS,
                    blocks: [],
                })
                .select()
                .single();

            if (error) throw error;

            setBlocks(data.blocks);
            setDocumentId(data.id);

        } catch (err) {
            console.error("Error creating document:", err);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div style={{ display: "flex", height: "100vh", background: "#020617", color: "#e2e8f0", fontFamily: "'SF Pro Display', -apple-system, sans-serif", overflow: "hidden" }}>

            {/* ── SIDEBAR ── */}
            <div style={{ width: 220, borderRight: "1px solid #0f172a", display: "flex", flexDirection: "column", flexShrink: 0 }}>

                {/* Logo */}
                <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid #0f172a" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #818cf8, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>✦</div>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9" }}>PDF Studio</span>
                    </div>
                </div>

                {/* Block list */}
                <div style={{ flex: 1, overflowY: "auto", padding: "12px 8px" }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", padding: "0 8px 8px" }}>Bloques</div>
                    {sortedBlocks.map(block => (
                        <div
                            key={block.id}
                            onClick={() => { setSelectedId(block.id); setTab("editor"); }}
                            style={{
                                display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 7, cursor: "pointer", marginBottom: 2,
                                background: selectedId === block.id ? "#1e1b4b" : "transparent",
                                border: selectedId === block.id ? "1px solid #4338ca44" : "1px solid transparent",
                            }}
                        >
                            <div style={{ width: 22, height: 22, borderRadius: 5, background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#818cf8", flexShrink: 0, fontFamily: "monospace" }}>
                                {blockIcon(block.type)}
                            </div>
                            <div style={{ minWidth: 0 }}>
                                <div style={{ fontSize: 11, color: "#e2e8f0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    {blockLabel(block)}
                                </div>
                                <div style={{ fontSize: 10, color: "#475569" }}>{block.type}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ flex: 1, overflowY: "auto" }}>
                    {tree.map(node => (
                        <TreeItem key={node.id} node={node} />
                    ))}
                </div>

                {/* Add blocks */}
                <div style={{ padding: "12px 8px", borderTop: "1px solid #0f172a" }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", padding: "0 8px 8px" }}>Añadir</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                        {BLOCK_TYPES.map(bt => (
                            <button key={bt.type} onClick={() => addBlock(bt.type)} style={{
                                background: "#0f172a", border: "1px solid #1e293b", borderRadius: 6, padding: "6px 4px",
                                color: "#94a3b8", fontSize: 10, cursor: "pointer", transition: "all 0.15s",
                                display: "flex", flexDirection: "column", alignItems: "center", gap: 2
                            }}>
                                <span style={{ fontSize: 13 }}>{bt.icon}</span>
                                <span>{bt.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── CENTER ── */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

                {/* Tab bar */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", borderBottom: "1px solid #0f172a", height: 48, flexShrink: 0 }}>
                    <div style={{ display: "flex", gap: 4 }}>
                        {(["preview", "editor"] as TabType[]).map(t => (
                            <button key={t} onClick={() => setTab(t)} style={{
                                background: tab === t ? "#0f172a" : "transparent",
                                border: tab === t ? "1px solid #1e293b" : "1px solid transparent",
                                borderRadius: 7, padding: "5px 14px", color: tab === t ? "#f1f5f9" : "#475569",
                                fontSize: 12, fontWeight: tab === t ? 600 : 400, cursor: "pointer", transition: "all 0.15s",
                                textTransform: "capitalize"
                            }}>{t === "preview" ? "🖥 Preview" : "✏️ Editor"}</button>
                        ))}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={saveDocument}>
                            Guardar
                        </button>
                        <PDFDownloadLink
                            document={<PDFDocument blocks={sortedBlocks} />}
                            fileName="ai-saas-guide.pdf"
                            style={{
                                background: "linear-gradient(135deg, #818cf8, #6366f1)",
                                border: "none",
                                borderRadius: 7,
                                padding: "6px 16px",
                                color: "#fff",
                                fontSize: 12,
                                fontWeight: 600,
                                cursor: "pointer",
                                textDecoration: "none",
                            }}
                        >
                            {({ loading }) => (loading ? "Generating..." : "⬇ Exportar PDF")}
                        </PDFDownloadLink>
                        <button
                            onClick={createNewDocument}
                            style={{
                                background: "#0f172a",
                                border: "1px solid #1e293b",
                                borderRadius: 7,
                                padding: "6px 14px",
                                color: "#94a3b8",
                                fontSize: 12,
                                cursor: "pointer"
                            }}
                        >
                            {loading ? "Creating..." : "＋ New Guide"}
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
                    {tab === "preview" ? (
                        <div style={{ maxWidth: 700, margin: "0 auto" }}>
                            <div style={{
                                background: "#050a14", borderRadius: 12, border: "1px solid #0f172a",
                                overflow: "hidden", boxShadow: "0 25px 50px rgba(0,0,0,0.5)"
                            }}>
                                {/* Fake browser bar */}
                                <div style={{ background: "#0a0e1a", padding: "8px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #0f172a" }}>
                                    <div style={{ display: "flex", gap: 5 }}>
                                        {(["#f87171", "#facc15", "#4ade80"] as const).map(c => (
                                            <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                                        ))}
                                    </div>
                                    <span style={{ fontSize: 11, color: "#475569", marginLeft: 8 }}>preview.pdf — Página 1</span>
                                </div>
                                <div style={{ padding: "32px 40px", display: "flex", flexDirection: "column", gap: 20 }}>
                                    {sortedBlocks.map(block => (
                                        <div
                                            key={block.id}
                                            onClick={() => { setSelectedId(block.id); setTab("editor"); }}
                                            style={{
                                                cursor: "pointer", borderRadius: 10, transition: "all 0.15s",
                                                outline: selectedId === block.id ? "2px solid #818cf8" : "2px solid transparent",
                                                outlineOffset: 4,
                                            }}
                                        >
                                            <BlockRenderer block={block} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : selected ? (
                        <BlockEditor
                            block={selected}
                            onUpdate={updateBlockData}
                            onDelete={deleteBlock}
                            onMove={moveBlock}
                            sortedBlocks={sortedBlocks}
                        />
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "#475569", gap: 12 }}>
                            <div style={{ fontSize: 40 }}>←</div>
                            <div style={{ fontSize: 14 }}>Selecciona un bloque para editarlo</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
