import type { Metadata } from 'next'
import { BOOKS, MENTAL_MODELS, EXERCISES, DOMAINS } from '@/lib/founder-os/data'
import KnowledgeGraph from '../_components/KnowledgeGraph'

export const metadata: Metadata = { title: 'Knowledge Graph' }

export default function GraphPage() {
  return (
    <div className="px-8 py-8 max-w-[1100px] mx-auto space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Knowledge Graph</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Visualizing the connections between books, mental models, exercises, and domains.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-zinc-500">
          <span>{BOOKS.length} books</span>
          <span>{MENTAL_MODELS.length} models</span>
          <span>{EXERCISES.length} exercises</span>
          <span>{DOMAINS.length} domains</span>
        </div>
      </div>

      {/* Graph */}
      <KnowledgeGraph />

      {/* Connection table */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Notable Connections</h2>
          <div className="h-px flex-1 bg-zinc-800/60" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { from: 'Leverage (Naval)', to: 'Compounding (Atomic Habits)', note: 'Both power exponential outcomes over time' },
            { from: 'Deep Work', to: 'Atomic Habits', note: 'Focus and systems are synergistic' },
            { from: 'The Resistance (War of Art)', to: 'Systems vs Goals', note: 'Defeating Resistance requires systems, not willpower' },
            { from: 'Zero to One', to: 'Millionaire Fastlane', note: 'Both argue: create new markets, don\'t compete in old ones' },
            { from: 'Man\'s Search for Meaning', to: 'The Almanack of Naval', note: 'Meaning and happiness are practices, not destinations' },
            { from: 'Psychology of Money', to: 'Compounding', note: 'Long time horizons + patience = the core financial insight' },
          ].map((conn, i) => (
            <div key={i} className="p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-medium text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full truncate max-w-[140px]">
                  {conn.from}
                </span>
                <span className="text-zinc-700">→</span>
                <span className="text-[10px] font-medium text-violet-400 bg-violet-400/10 px-2 py-0.5 rounded-full truncate max-w-[140px]">
                  {conn.to}
                </span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">{conn.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
