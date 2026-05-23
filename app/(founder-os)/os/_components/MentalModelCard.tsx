import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { MentalModel } from '@/lib/founder-os/types'

const categoryColor: Record<string, string> = {
  wealth: 'text-amber-400 bg-amber-400/10',
  systems: 'text-teal-400 bg-teal-400/10',
  thinking: 'text-violet-400 bg-violet-400/10',
  productivity: 'text-emerald-400 bg-emerald-400/10',
  business: 'text-indigo-400 bg-indigo-400/10',
  habits: 'text-green-400 bg-green-400/10',
  creativity: 'text-pink-400 bg-pink-400/10',
  freedom: 'text-purple-400 bg-purple-400/10',
}

interface Props {
  model: MentalModel
}

export default function MentalModelCard({ model }: Props) {
  const colorClass = categoryColor[model.category ?? ''] ?? 'text-zinc-400 bg-zinc-400/10'

  return (
    <Link
      href={`/os/mental-models/${model.slug}`}
      className="group flex flex-col gap-3 p-5 rounded-xl border border-zinc-800/60 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0 group-hover:bg-zinc-700 transition-colors">
          <span className="text-zinc-400 text-sm">◈</span>
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-700 group-hover:text-zinc-500 transition-colors shrink-0 mt-0.5" />
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors">
          {model.title}
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
          {model.description}
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto pt-1">
        {model.category && (
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${colorClass}`}>
            {model.category}
          </span>
        )}
        <span className="text-[10px] text-zinc-600 ml-auto">
          {model.applicationExamples.length} examples
        </span>
      </div>
    </Link>
  )
}
