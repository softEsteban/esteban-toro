import type { Metadata } from 'next'
import { EXERCISES } from '@/lib/founder-os/data'
import ExerciseCard from '../_components/ExerciseCard'

export const metadata: Metadata = { title: 'Exercises' }

const categoryLabel: Record<string, string> = {
  'self-knowledge': 'Self-Knowledge',
  wealth:           'Wealth & Finance',
  freedom:          'Freedom & Lifestyle',
  business:         'Business',
  meaning:          'Meaning & Purpose',
  focus:            'Focus & Deep Work',
}

export default function ExercisesPage() {
  const categories = [...new Set(EXERCISES.map(e => e.category).filter(Boolean))] as string[]

  return (
    <div className="px-8 py-8 max-w-[1100px] mx-auto space-y-10">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Exercises</h1>
        <p className="text-sm text-zinc-500 mt-1">
          {EXERCISES.length} interactive exercises for self-discovery and implementation.
        </p>
      </div>

      {/* All Exercises */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">All Exercises</h2>
          <div className="h-px flex-1 bg-zinc-800/60" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {EXERCISES.map(ex => <ExerciseCard key={ex.id} exercise={ex} />)}
        </div>
      </section>

      {/* By Category */}
      {categories.map(cat => {
        const items = EXERCISES.filter(e => e.category === cat)
        return (
          <section key={cat}>
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                {categoryLabel[cat] ?? cat}
              </h2>
              <div className="h-px flex-1 bg-zinc-800/60" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {items.map(ex => <ExerciseCard key={ex.id} exercise={ex} />)}
            </div>
          </section>
        )
      })}
    </div>
  )
}
