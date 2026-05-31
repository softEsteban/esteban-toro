'use client'

import { useState } from 'react'
import {
  Grid3X3, FileText, GripVertical,
  ChevronDown, ChevronRight, Check, X, Plus, Trash2,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type ColorKey = 'slate' | 'blue' | 'emerald' | 'amber' | 'violet' | 'rose' | 'indigo' | 'teal'

interface PlanNode {
  id: string
  title: string
  subtitle?: string
  body?: string
  tag?: string
  color: ColorKey
  children: PlanNode[]
}

// ─── Color map (full class strings so Tailwind picks them up) ─────────────────

const C: Record<ColorKey, {
  bg: string; border: string; dragover: string
  tagBg: string; tagTxt: string
  title: string; sub: string; dot: string; hover: string
}> = {
  slate:   { bg: 'bg-slate-50',   border: 'border-slate-200',   dragover: 'border-slate-500',   tagBg: 'bg-slate-200',   tagTxt: 'text-slate-700',   title: 'text-slate-900',   sub: 'text-slate-500',   dot: 'bg-slate-400',   hover: 'hover:bg-slate-100/70'   },
  blue:    { bg: 'bg-blue-50',    border: 'border-blue-200',    dragover: 'border-blue-500',    tagBg: 'bg-blue-100',    tagTxt: 'text-blue-700',    title: 'text-blue-900',    sub: 'text-blue-500',    dot: 'bg-blue-400',    hover: 'hover:bg-blue-100/70'    },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', dragover: 'border-emerald-500', tagBg: 'bg-emerald-100', tagTxt: 'text-emerald-700', title: 'text-emerald-900', sub: 'text-emerald-600', dot: 'bg-emerald-400', hover: 'hover:bg-emerald-100/70' },
  amber:   { bg: 'bg-amber-50',   border: 'border-amber-200',   dragover: 'border-amber-500',   tagBg: 'bg-amber-100',   tagTxt: 'text-amber-700',   title: 'text-amber-900',   sub: 'text-amber-600',   dot: 'bg-amber-400',   hover: 'hover:bg-amber-100/70'   },
  violet:  { bg: 'bg-violet-50',  border: 'border-violet-200',  dragover: 'border-violet-500',  tagBg: 'bg-violet-100',  tagTxt: 'text-violet-700',  title: 'text-violet-900',  sub: 'text-violet-600',  dot: 'bg-violet-400',  hover: 'hover:bg-violet-100/70'  },
  rose:    { bg: 'bg-rose-50',    border: 'border-rose-200',    dragover: 'border-rose-500',    tagBg: 'bg-rose-100',    tagTxt: 'text-rose-700',    title: 'text-rose-900',    sub: 'text-rose-600',    dot: 'bg-rose-400',    hover: 'hover:bg-rose-100/70'    },
  indigo:  { bg: 'bg-indigo-50',  border: 'border-indigo-200',  dragover: 'border-indigo-500',  tagBg: 'bg-indigo-100',  tagTxt: 'text-indigo-700',  title: 'text-indigo-900',  sub: 'text-indigo-600',  dot: 'bg-indigo-400',  hover: 'hover:bg-indigo-100/70'  },
  teal:    { bg: 'bg-teal-50',    border: 'border-teal-200',    dragover: 'border-teal-500',    tagBg: 'bg-teal-100',    tagTxt: 'text-teal-700',    title: 'text-teal-900',    sub: 'text-teal-600',    dot: 'bg-teal-400',    hover: 'hover:bg-teal-100/70'    },
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const INITIAL: PlanNode[] = [
  {
    id: 'meta', title: 'Meta Principal', tag: 'Meta', color: 'slate',
    body: 'Ingresos recurrentes de $3.000.000 COP/mes sin inversión grande, aprovechando habilidades actuales.',
    children: [
      { id: 'meta-1', title: '$3.000.000 COP/mes',      subtitle: 'Ingresos recurrentes', color: 'slate', children: [] },
      { id: 'meta-2', title: '6-12 meses',              subtitle: 'Objetivo temporal',    color: 'slate', children: [] },
      { id: 'meta-3', title: 'Sin inversión grande',    color: 'slate', children: [] },
      { id: 'meta-4', title: 'Habilidades actuales',    subtitle: 'Aprovechando lo que ya tienes', color: 'slate', children: [] },
    ],
  },
  {
    id: 'fase1', title: 'Crear distribución', tag: 'Fase 1', subtitle: 'Mes 1-2', color: 'blue',
    body: 'Conseguir las primeras 100 personas interesadas. No vender todavía.',
    children: [
      {
        id: 'f1-li', title: 'LinkedIn', subtitle: '3 posts/semana', color: 'blue',
        children: [
          { id: 'f1-li-1', title: 'Construcción de Daili',               color: 'blue', children: [] },
          { id: 'f1-li-2', title: 'Automatizaciones con IA',             color: 'blue', children: [] },
          { id: 'f1-li-3', title: 'Sistemas para ganar tiempo',          color: 'blue', children: [] },
          { id: 'f1-li-4', title: 'Libros que cambian la forma de pensar',color: 'blue', children: [] },
          { id: 'f1-li-5', title: 'Diseño de vida',                      color: 'blue', children: [] },
          { id: 'f1-li-6', title: 'Experimentos personales',             color: 'blue', children: [] },
        ],
      },
      {
        id: 'f1-nl', title: 'Newsletter', subtitle: '"The Freedom Systems" · Meta: 50 subs', color: 'blue',
        children: [
          { id: 'f1-nl-1', title: 'Frameworks',   color: 'blue', children: [] },
          { id: 'f1-nl-2', title: 'Libros',        color: 'blue', children: [] },
          { id: 'f1-nl-3', title: 'Herramientas', color: 'blue', children: [] },
          { id: 'f1-nl-4', title: 'IA',            color: 'blue', children: [] },
          { id: 'f1-nl-5', title: 'Productividad', color: 'blue', children: [] },
        ],
      },
      {
        id: 'f1-site', title: 'EstebanToro.co', subtitle: 'Base central para todo', color: 'blue',
        children: [
          { id: 'f1-s-1', title: 'Blog',         color: 'blue', children: [] },
          { id: 'f1-s-2', title: 'Recursos',     color: 'blue', children: [] },
          { id: 'f1-s-3', title: 'Founder Pack', color: 'blue', children: [] },
          { id: 'f1-s-4', title: 'Daili',        color: 'blue', children: [] },
        ],
      },
    ],
  },
  {
    id: 'fase2', title: 'Primer producto digital', tag: 'Fase 2', subtitle: 'Mes 2-3', color: 'emerald',
    body: 'El primer activo monetizable. Validar que la gente paga por tu conocimiento.',
    children: [
      {
        id: 'f2-fkp', title: 'Founder Knowledge Pack', color: 'emerald',
        children: [
          { id: 'f2-1', title: 'Top libros para emprendedores', color: 'emerald', children: [] },
          { id: 'f2-2', title: 'Resúmenes y frameworks',        color: 'emerald', children: [] },
          { id: 'f2-3', title: 'Recursos IA + Templates',       color: 'emerald', children: [] },
          { id: 'f2-4', title: 'Formato: página web privada',   color: 'emerald', children: [] },
        ],
      },
      {
        id: 'f2-meta', title: 'Meta financiera', subtitle: '20 ventas × 49.000 = ~980.000 COP', color: 'emerald',
        children: [
          { id: 'f2-m1', title: 'Precio: 39.000 – 49.000 COP',   color: 'emerald', children: [] },
          { id: 'f2-m2', title: '20 ventas = primeras validaciones', color: 'emerald', children: [] },
        ],
      },
    ],
  },
  {
    id: 'fase3', title: 'Servicio productizado', tag: 'Fase 3', subtitle: 'Mes 3-5', color: 'amber',
    body: 'El dinero más rápido. Un servicio repetible, no consultoría tradicional. Financia los demás activos.',
    children: [
      {
        id: 'f3-aws', title: 'AI Workspace Setup', subtitle: 'Para freelancers y emprendedores', color: 'amber',
        children: [
          { id: 'f3-1', title: 'Gmail IA',       color: 'amber', children: [] },
          { id: 'f3-2', title: 'Calendar IA',    color: 'amber', children: [] },
          { id: 'f3-3', title: 'Knowledge base', color: 'amber', children: [] },
          { id: 'f3-4', title: 'Automatizaciones', color: 'amber', children: [] },
        ],
      },
      {
        id: 'f3-meta', title: 'Meta financiera', subtitle: '4 clientes/mes = 2M-4M COP', color: 'amber',
        children: [
          { id: 'f3-m1', title: 'Precio: 500.000 – 1.000.000 COP', color: 'amber', children: [] },
          { id: 'f3-m2', title: '4 clientes/mes',                   color: 'amber', children: [] },
        ],
      },
    ],
  },
  {
    id: 'fase4', title: 'Daili como SaaS', tag: 'Fase 4', subtitle: 'Mes 4-8', color: 'violet',
    body: 'No competir con Notion. Resolver un problema específico con búsqueda IA.',
    children: [
      {
        id: 'f4-dm', title: 'Daili Memory', subtitle: 'Con búsqueda IA', color: 'violet',
        children: [
          { id: 'f4-1', title: 'Chats útiles',       color: 'violet', children: [] },
          { id: 'f4-2', title: 'Ideas y aprendizajes', color: 'violet', children: [] },
          { id: 'f4-3', title: 'Libros e insights',   color: 'violet', children: [] },
        ],
      },
      {
        id: 'f4-meta', title: 'Meta financiera', subtitle: '50 usuarios × 20.000 = 1M COP/mes', color: 'violet',
        children: [
          { id: 'f4-m1', title: 'Precio: 20.000 COP/mes',   color: 'violet', children: [] },
          { id: 'f4-m2', title: 'Meta inicial: 50 usuarios', color: 'violet', children: [] },
        ],
      },
    ],
  },
  {
    id: 'fase5', title: 'Ecosistema', tag: 'Fase 5', color: 'rose',
    body: 'Todo se conecta y se alimenta mutuamente. Cada activo impulsa a los demás.',
    children: [
      { id: 'f5-1', title: 'LinkedIn',      subtitle: 'Entrada de tráfico',  color: 'rose', children: [] },
      { id: 'f5-2', title: 'Newsletter',    subtitle: 'Captura y nurture',    color: 'rose', children: [] },
      { id: 'f5-3', title: 'Founder Pack',  subtitle: 'Primer producto',      color: 'rose', children: [] },
      { id: 'f5-4', title: 'Daili',         subtitle: 'SaaS recurrente',      color: 'rose', children: [] },
      { id: 'f5-5', title: 'Comunidad',     subtitle: 'Red de apoyo',         color: 'rose', children: [] },
    ],
  },
  {
    id: 'quarterly', title: 'Objetivos trimestrales', tag: 'Métricas', color: 'indigo',
    children: [
      {
        id: 'q1', title: 'Q1 — 300k-500k COP', color: 'indigo',
        children: [
          { id: 'q1-1', title: '100 seguidores relevantes nuevos', color: 'indigo', children: [] },
          { id: 'q1-2', title: '50 emails',                        color: 'indigo', children: [] },
          { id: 'q1-3', title: 'Founder Pack publicado',           color: 'indigo', children: [] },
          { id: 'q1-4', title: '10 ventas',                        color: 'indigo', children: [] },
        ],
      },
      {
        id: 'q2', title: 'Q2 — 2M-4M COP', color: 'indigo',
        children: [
          { id: 'q2-1', title: '300 emails',                      color: 'indigo', children: [] },
          { id: 'q2-2', title: '4 clientes de servicio al mes',   color: 'indigo', children: [] },
          { id: 'q2-3', title: 'Founder Pack mejorado',           color: 'indigo', children: [] },
        ],
      },
      {
        id: 'q3', title: 'Q3 — 3M-6M COP', color: 'indigo',
        children: [
          { id: 'q3-1', title: 'Lanzar Daili de pago', color: 'indigo', children: [] },
          { id: 'q3-2', title: '50 usuarios pagos',    color: 'indigo', children: [] },
        ],
      },
    ],
  },
  {
    id: 'weekly', title: 'Métricas semanales', tag: 'Hábitos', color: 'teal',
    body: 'Si mantienes esto 6 meses, llegas a $3.000.000 COP/mes con mucha más probabilidad que buscando "la idea perfecta".',
    children: [
      { id: 'w-1', title: '3 posts LinkedIn',              color: 'teal', children: [] },
      { id: 'w-2', title: '1 artículo o recurso',         color: 'teal', children: [] },
      { id: 'w-3', title: '10 personas contactadas',       color: 'teal', children: [] },
      { id: 'w-4', title: '1 mejora al Founder Pack',     color: 'teal', children: [] },
      { id: 'w-5', title: '1 mejora a Daili',             color: 'teal', children: [] },
      { id: 'w-6', title: '1 experimento de monetización',color: 'teal', children: [] },
    ],
  },
]

// ─── Tree utilities ───────────────────────────────────────────────────────────

function uid() { return `node-${Math.random().toString(36).slice(2, 9)}` }

function mapTree(nodes: PlanNode[], fn: (n: PlanNode) => PlanNode): PlanNode[] {
  return nodes.map(n => fn({ ...n, children: mapTree(n.children, fn) }))
}

function updateNode(nodes: PlanNode[], id: string, changes: Partial<PlanNode>): PlanNode[] {
  return mapTree(nodes, n => n.id === id ? { ...n, ...changes } : n)
}

function deleteNode(nodes: PlanNode[], id: string): PlanNode[] {
  return nodes.filter(n => n.id !== id).map(n => ({ ...n, children: deleteNode(n.children, id) }))
}

function addChild(nodes: PlanNode[], parentId: string, child: PlanNode): PlanNode[] {
  return mapTree(nodes, n => n.id === parentId ? { ...n, children: [...n.children, child] } : n)
}

function reorder(list: PlanNode[], fromId: string, toId: string): PlanNode[] {
  const from = list.findIndex(n => n.id === fromId)
  const to   = list.findIndex(n => n.id === toId)
  if (from === -1 || to === -1 || from === to) return list
  const next = [...list]
  const [moved] = next.splice(from, 1)
  next.splice(to, 0, moved)
  return next
}

function reorderChildren(nodes: PlanNode[], parentId: string, fromId: string, toId: string): PlanNode[] {
  return mapTree(nodes, n =>
    n.id === parentId ? { ...n, children: reorder(n.children, fromId, toId) } : n
  )
}

// ─── InlineEdit ───────────────────────────────────────────────────────────────

function InlineEdit({
  value, onSave, className = '', multiline = false,
}: {
  value: string; onSave: (v: string) => void; className?: string; multiline?: boolean
}) {
  const [editing, setEditing] = useState(false)
  const [draft,   setDraft]   = useState(value)

  const save   = () => { onSave(draft); setEditing(false) }
  const cancel = () => { setDraft(value); setEditing(false) }

  if (editing) {
    return (
      <span className="flex items-start gap-1 w-full">
        {multiline ? (
          <textarea
            autoFocus rows={3}
            value={draft} onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Escape') cancel() }}
            className={`flex-1 rounded border border-gray-300 bg-white px-2 py-1 text-sm resize-none ${className}`}
          />
        ) : (
          <input
            autoFocus value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') save(); if (e.key === 'Escape') cancel() }}
            className={`flex-1 rounded border border-gray-300 bg-white px-2 py-0.5 text-sm ${className}`}
          />
        )}
        <button onClick={save}   className="mt-0.5 text-green-500 hover:text-green-700"><Check size={13} /></button>
        <button onClick={cancel} className="mt-0.5 text-gray-400 hover:text-gray-600"><X size={13} /></button>
      </span>
    )
  }

  return (
    <span
      onClick={() => { setEditing(true); setDraft(value) }}
      title="Clic para editar"
      className={`cursor-text rounded hover:bg-white/70 transition-colors ${className}`}
    >
      {value}
    </span>
  )
}

// ─── ChildList ────────────────────────────────────────────────────────────────

function ChildList({
  parentId, children, color,
  onUpdate, onDelete, onAddChild, onReorderChildren,
  depth = 0,
}: {
  parentId: string; children: PlanNode[]; color: ColorKey; depth?: number
  onUpdate: (id: string, c: Partial<PlanNode>) => void
  onDelete: (id: string) => void
  onAddChild: (parentId: string) => void
  onReorderChildren: (parentId: string, from: string, to: string) => void
}) {
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [dragOverId, setDragOverId] = useState<string | null>(null)
  const c = C[color]

  return (
    <ul className={`space-y-0.5 ${depth > 0 ? 'pl-3 mt-1 border-l border-gray-200' : ''}`}>
      {children.map(child => (
        <li
          key={child.id}
          draggable
          onDragStart={e => { e.stopPropagation(); e.dataTransfer.setData('level', 'child'); setDraggedId(child.id) }}
          onDragOver={e => {
            if (e.dataTransfer.types.includes('level') || true) {
              e.preventDefault(); e.stopPropagation(); setDragOverId(child.id)
            }
          }}
          onDrop={e => {
            e.preventDefault(); e.stopPropagation()
            if (draggedId && dragOverId && draggedId !== dragOverId) {
              onReorderChildren(parentId, draggedId, dragOverId)
            }
            setDraggedId(null); setDragOverId(null)
          }}
          onDragEnd={() => { setDraggedId(null); setDragOverId(null) }}
          className={`
            group flex items-start gap-1.5 rounded-md px-2 py-1 transition-all
            ${dragOverId === child.id ? `${c.bg} ring-1 ring-gray-300` : c.hover}
            ${draggedId === child.id ? 'opacity-40' : ''}
          `}
        >
          <GripVertical size={12} className="mt-1 shrink-0 text-gray-300 opacity-0 group-hover:opacity-100 cursor-grab" />
          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${c.dot}`} />
          <div className="flex-1 min-w-0">
            <div className={`text-sm font-medium leading-snug ${c.title}`}>
              <InlineEdit value={child.title} onSave={v => onUpdate(child.id, { title: v })} />
            </div>
            {child.subtitle && (
              <div className={`text-xs ${c.sub}`}>
                <InlineEdit value={child.subtitle} onSave={v => onUpdate(child.id, { subtitle: v })} />
              </div>
            )}
            {child.children.length > 0 && (
              <ChildList
                parentId={child.id}
                children={child.children}
                color={color}
                depth={depth + 1}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onAddChild={onAddChild}
                onReorderChildren={onReorderChildren}
              />
            )}
          </div>
          <button
            onClick={() => onDelete(child.id)}
            className="mt-0.5 shrink-0 text-gray-200 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
          >
            <Trash2 size={11} />
          </button>
        </li>
      ))}
      <li>
        <button
          onClick={() => onAddChild(parentId)}
          className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-60 hover:opacity-100 transition-opacity ${c.sub}`}
        >
          <Plus size={11} /> Añadir
        </button>
      </li>
    </ul>
  )
}

// ─── NodeCard ─────────────────────────────────────────────────────────────────

function NodeCard({
  node, isDragging, isDragOver,
  onUpdate, onDelete, onAddChild, onReorderChildren,
  onDragStart, onDragOver: handleDragOver, onDrop,
}: {
  node: PlanNode; isDragging: boolean; isDragOver: boolean
  onUpdate: (id: string, c: Partial<PlanNode>) => void
  onDelete: (id: string) => void
  onAddChild: (parentId: string) => void
  onReorderChildren: (parentId: string, from: string, to: string) => void
  onDragStart: (id: string) => void
  onDragOver: (id: string) => void
  onDrop: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(true)
  const c = C[node.color]

  return (
    <div
      draggable
      onDragStart={e => { e.stopPropagation(); e.dataTransfer.setData('level', 'top'); onDragStart(node.id) }}
      onDragOver={e => { e.preventDefault(); e.stopPropagation(); handleDragOver(node.id) }}
      onDrop={e => { e.preventDefault(); e.stopPropagation(); onDrop(node.id) }}
      className={`
        group relative flex flex-col rounded-2xl border-2 p-4 transition-all duration-150 select-none
        ${c.bg} ${isDragOver ? c.dragover : c.border}
        ${isDragging ? 'opacity-30 scale-[0.97]' : 'opacity-100'}
      `}
    >
      {/* Drag handle */}
      <div className="absolute top-3 right-3 text-gray-300 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing transition-opacity">
        <GripVertical size={16} />
      </div>

      {/* Header */}
      <div className="flex items-start gap-2 mb-3 pr-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            {node.tag && (
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${c.tagBg} ${c.tagTxt}`}>
                {node.tag}
              </span>
            )}
            {node.subtitle && <span className={`text-xs ${c.sub}`}>{node.subtitle}</span>}
          </div>
          <h3 className={`font-bold text-base leading-tight ${c.title}`}>
            <InlineEdit value={node.title} onSave={v => onUpdate(node.id, { title: v })} className="font-bold" />
          </h3>
          {node.body && (
            <p className={`text-xs mt-1.5 leading-relaxed ${c.sub}`}>
              <InlineEdit value={node.body} onSave={v => onUpdate(node.id, { body: v })} multiline />
            </p>
          )}
        </div>
      </div>

      {/* Separator */}
      {node.children.length > 0 && <div className="border-t border-black/5 mb-2" />}

      {/* Collapse toggle */}
      {node.children.length > 0 && (
        <button
          onClick={() => setExpanded(e => !e)}
          className={`flex items-center gap-1 text-xs mb-2 w-fit ${c.sub} hover:opacity-80 transition-opacity`}
        >
          {expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          {node.children.length} {node.children.length === 1 ? 'elemento' : 'elementos'}
        </button>
      )}

      {/* Children */}
      {expanded && node.children.length > 0 && (
        <ChildList
          parentId={node.id}
          children={node.children}
          color={node.color}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onAddChild={onAddChild}
          onReorderChildren={onReorderChildren}
        />
      )}

      {/* Footer actions */}
      <div className="mt-3 flex items-center justify-between pt-2 border-t border-black/5">
        <button
          onClick={() => onAddChild(node.id)}
          className={`flex items-center gap-1 text-xs ${c.sub} opacity-0 group-hover:opacity-70 hover:opacity-100 transition-opacity`}
        >
          <Plus size={12} /> Añadir elemento
        </button>
        <button
          onClick={() => onDelete(node.id)}
          className="text-xs text-gray-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  )
}

// ─── GridView ─────────────────────────────────────────────────────────────────

function GridView({
  nodes, cols, onUpdate, onDelete, onAddChild, onReorder, onReorderChildren,
}: {
  nodes: PlanNode[]
  cols: number
  onUpdate: (id: string, c: Partial<PlanNode>) => void
  onDelete: (id: string) => void
  onAddChild: (parentId: string) => void
  onReorder: (from: string, to: string) => void
  onReorderChildren: (parentId: string, from: string, to: string) => void
}) {
  const [draggedId,  setDraggedId]  = useState<string | null>(null)
  const [dragOverId, setDragOverId] = useState<string | null>(null)

  const handleDrop = (toId: string) => {
    if (draggedId && draggedId !== toId) onReorder(draggedId, toId)
    setDraggedId(null); setDragOverId(null)
  }

  return (
    <div
      className="grid gap-4 p-6"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      onDragEnd={() => { setDraggedId(null); setDragOverId(null) }}
    >
      {nodes.map(node => (
        <NodeCard
          key={node.id}
          node={node}
          isDragging={draggedId === node.id}
          isDragOver={dragOverId === node.id}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onAddChild={onAddChild}
          onReorderChildren={onReorderChildren}
          onDragStart={setDraggedId}
          onDragOver={setDragOverId}
          onDrop={handleDrop}
        />
      ))}
    </div>
  )
}

// ─── TextView ─────────────────────────────────────────────────────────────────

function TextNode({ node, depth = 0 }: { node: PlanNode; depth?: number }) {
  const c = C[node.color]

  if (depth === 0) return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-2 flex-wrap">
        {node.tag && <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${c.tagBg} ${c.tagTxt}`}>{node.tag}</span>}
        {node.subtitle && <span className="text-sm text-gray-400">{node.subtitle}</span>}
      </div>
      <h2 className={`text-2xl font-bold mb-2 ${c.title}`}>{node.title}</h2>
      {node.body && <p className="text-gray-600 leading-relaxed mb-4 text-sm">{node.body}</p>}
      {node.children.length > 0 && (
        <div className="space-y-4 pl-5 border-l-2 border-gray-100">
          {node.children.map(child => <TextNode key={child.id} node={child} depth={1} />)}
        </div>
      )}
    </section>
  )

  if (depth === 1) return (
    <div className="mb-3">
      <h3 className={`text-base font-semibold ${c.title}`}>{node.title}</h3>
      {node.subtitle && <p className={`text-xs mb-1 ${c.sub}`}>{node.subtitle}</p>}
      {node.body && <p className="text-sm text-gray-600 mb-1 leading-relaxed">{node.body}</p>}
      {node.children.length > 0 && (
        <ul className="mt-1.5 space-y-1 pl-3">
          {node.children.map(child => <TextNode key={child.id} node={child} depth={2} />)}
        </ul>
      )}
    </div>
  )

  if (depth === 2) return (
    <li className="flex items-start gap-2 text-sm text-gray-700">
      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${c.dot}`} />
      <div>
        <span>{node.title}</span>
        {node.subtitle && <span className="text-gray-400 ml-1 text-xs">— {node.subtitle}</span>}
        {node.children.length > 0 && (
          <ul className="mt-1 space-y-0.5 pl-3">
            {node.children.map(child => <TextNode key={child.id} node={child} depth={3} />)}
          </ul>
        )}
      </div>
    </li>
  )

  return (
    <li className="flex items-center gap-1.5 text-xs text-gray-500">
      <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
      {node.title}
    </li>
  )
}

function TextView({ nodes }: { nodes: PlanNode[] }) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="mb-10 pb-6 border-b border-gray-100">
        <p className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-1">Plan estratégico</p>
        <h1 className="text-3xl font-bold text-gray-900">$3.000.000 COP / mes</h1>
        <p className="text-gray-500 mt-1.5 text-sm">6-12 meses · Sin inversión grande · Habilidades actuales</p>
      </div>
      {nodes.map(node => <TextNode key={node.id} node={node} depth={0} />)}
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function CanvasView() {
  const [nodes, setNodes] = useState<PlanNode[]>(INITIAL)
  const [view,  setView]  = useState<'grid' | 'text'>('grid')
  const [cols,  setCols]  = useState(3)

  const handleUpdate          = (id: string, c: Partial<PlanNode>) => setNodes(p => updateNode(p, id, c))
  const handleDelete          = (id: string) => setNodes(p => deleteNode(p, id))
  const handleAddChild        = (parentId: string) => {
    const color = nodes.find(n => n.id === parentId)?.color ?? 'slate'
    setNodes(p => addChild(p, parentId, { id: uid(), title: 'Nuevo elemento', color, children: [] }))
  }
  const handleReorder         = (from: string, to: string) => setNodes(p => reorder(p, from, to))
  const handleReorderChildren = (parentId: string, from: string, to: string) =>
    setNodes(p => reorderChildren(p, parentId, from, to))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toolbar */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div>
          <p className="font-semibold text-gray-900 text-sm leading-none mb-0.5">Plan estratégico</p>
          <p className="text-xs text-gray-400">$3.000.000 COP / mes · 6-12 meses</p>
        </div>
        <div className="flex items-center gap-3">
          {view === 'grid' && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-medium tabular-nums w-4 text-right">{cols}</span>
              <input
                type="range" min={1} max={5} value={cols}
                onChange={e => setCols(Number(e.target.value))}
                className="w-24 accent-gray-700 cursor-pointer"
              />
              <span className="text-xs text-gray-300">cols</span>
            </div>
          )}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            {(['grid', 'text'] as const).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  view === v ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                {v === 'grid' ? <Grid3X3 size={13} /> : <FileText size={13} />}
                {v === 'grid' ? 'Canvas' : 'Texto'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      {view === 'grid' ? (
        <GridView
          nodes={nodes}
          cols={cols}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onAddChild={handleAddChild}
          onReorder={handleReorder}
          onReorderChildren={handleReorderChildren}
        />
      ) : (
        <TextView nodes={nodes} />
      )}
    </div>
  )
}
