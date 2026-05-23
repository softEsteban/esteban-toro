'use client'

import { GRAPH_NODES, GRAPH_EDGES } from '@/lib/founder-os/data'

const typePositions: Record<string, { x: number; y: number }[]> = {
  domain: [
    { x: 400, y: 80 }, { x: 620, y: 160 }, { x: 680, y: 380 }, { x: 540, y: 560 },
    { x: 260, y: 560 }, { x: 120, y: 380 }, { x: 180, y: 160 }, { x: 400, y: 300 },
  ],
  book: [
    { x: 400, y: 180 }, { x: 560, y: 240 }, { x: 600, y: 380 }, { x: 520, y: 480 },
    { x: 380, y: 500 }, { x: 240, y: 480 }, { x: 200, y: 360 }, { x: 220, y: 240 },
    { x: 340, y: 130 }, { x: 460, y: 130 },
  ],
  mental_model: [
    { x: 400, y: 300 }, { x: 470, y: 260 }, { x: 500, y: 340 }, { x: 460, y: 400 },
    { x: 400, y: 420 }, { x: 340, y: 400 }, { x: 300, y: 340 }, { x: 330, y: 260 },
    { x: 430, y: 220 }, { x: 480, y: 300 }, { x: 370, y: 220 }, { x: 320, y: 300 },
  ],
  exercise: [
    { x: 400, y: 350 }, { x: 440, y: 320 }, { x: 460, y: 370 }, { x: 430, y: 400 },
    { x: 390, y: 400 }, { x: 360, y: 380 }, { x: 350, y: 330 },
  ],
}

const nodeColors: Record<string, string> = {
  book: '#F59E0B',
  mental_model: '#8B5CF6',
  exercise: '#10B981',
  domain: '#3B82F6',
}

const nodeLabels: Record<string, string> = {
  book: 'Book',
  mental_model: 'Mental Model',
  exercise: 'Exercise',
  domain: 'Domain',
}

export default function KnowledgeGraph() {
  const typeGroups = GRAPH_NODES.reduce(
    (acc, node) => {
      if (!acc[node.type]) acc[node.type] = []
      acc[node.type].push(node)
      return acc
    },
    {} as Record<string, typeof GRAPH_NODES>
  )

  const nodeCoords: Record<string, { x: number; y: number; node: (typeof GRAPH_NODES)[0] }> = {}

  Object.entries(typeGroups).forEach(([type, nodes]) => {
    const positions = typePositions[type] ?? []
    nodes.forEach((node, i) => {
      const pos = positions[i] ?? { x: 400 + Math.random() * 100, y: 300 + Math.random() * 100 }
      nodeCoords[node.id] = { x: pos.x, y: pos.y, node }
    })
  })

  return (
    <div className="relative w-full rounded-xl border border-zinc-800/60 bg-zinc-900/30 overflow-hidden">
      {/* Legend */}
      <div className="absolute top-4 left-4 flex items-center gap-4 z-10">
        {Object.entries(nodeColors).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[10px] text-zinc-500">{nodeLabels[type]}</span>
          </div>
        ))}
      </div>

      {/* Placeholder badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-zinc-800 text-zinc-500 border border-zinc-700/50">
          Interactive graph coming soon
        </span>
      </div>

      <svg
        viewBox="0 0 800 640"
        className="w-full h-full"
        style={{ minHeight: 400 }}
      >
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1f1f2e" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="800" height="640" fill="url(#grid)" />

        {/* Edges */}
        {GRAPH_EDGES.map((edge, i) => {
          const from = nodeCoords[edge.source]
          const to = nodeCoords[edge.target]
          if (!from || !to) return null
          return (
            <line
              key={i}
              x1={from.x} y1={from.y}
              x2={to.x} y2={to.y}
              stroke="#2a2a3a"
              strokeWidth="1"
            />
          )
        })}

        {/* Nodes */}
        {Object.values(nodeCoords).map(({ x, y, node }) => {
          const r = node.size ?? 14
          const color = nodeColors[node.type] ?? '#6366F1'
          return (
            <g key={node.id} className="cursor-pointer">
              <circle cx={x} cy={y} r={r + 4} fill={color} fillOpacity="0.08" />
              <circle cx={x} cy={y} r={r} fill={color} fillOpacity="0.85" />
              {node.type === 'domain' && (
                <text
                  x={x} y={y + r + 12}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#71717a"
                >
                  {node.label.split(' ')[0]}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
