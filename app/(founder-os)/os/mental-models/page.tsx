import type { Metadata } from 'next'
import { MENTAL_MODELS } from '@/lib/founder-os/data'
import MentalModelCard from '../_components/MentalModelCard'

export const metadata: Metadata = { title: 'Mental Models' }

const categoryOrder = ['thinking', 'wealth', 'systems', 'productivity', 'business', 'habits', 'creativity', 'freedom']
const categoryLabel: Record<string, string> = {
  thinking:     'Thinking Frameworks',
  wealth:       'Wealth & Leverage',
  systems:      'Systems & Compounding',
  productivity: 'Productivity',
  business:     'Business',
  habits:       'Habits & Behavior',
  creativity:   'Creativity',
  freedom:      'Freedom & Optionality',
}

export default function MentalModelsPage() {
  const grouped = categoryOrder.map(cat => ({
    category: cat,
    label: categoryLabel[cat] ?? cat,
    models: MENTAL_MODELS.filter(m => m.category === cat),
  })).filter(g => g.models.length > 0)

  return (
    <div className="px-8 py-8 max-w-[1100px] mx-auto space-y-10">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Mental Models</h1>
        <p className="text-sm text-zinc-500 mt-1">
          {MENTAL_MODELS.length} frameworks for thinking clearly and acting with leverage.
        </p>
      </div>

      {/* All Cards */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">All Models</h2>
          <div className="h-px flex-1 bg-zinc-800/60" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {MENTAL_MODELS.map(model => <MentalModelCard key={model.id} model={model} />)}
        </div>
      </section>

      {/* By Category */}
      {grouped.map(({ category, label, models }) => (
        <section key={category}>
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">{label}</h2>
            <div className="h-px flex-1 bg-zinc-800/60" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {models.map(model => <MentalModelCard key={model.id} model={model} />)}
          </div>
        </section>
      ))}
    </div>
  )
}
