import Link from 'next/link'
import { Clock, ArrowUpRight } from 'lucide-react'
import type { Exercise } from '@/lib/founder-os/types'

const difficultyColor: Record<string, string> = {
  easy: 'text-emerald-400 bg-emerald-400/10',
  medium: 'text-amber-400 bg-amber-400/10',
  hard: 'text-rose-400 bg-rose-400/10',
}

interface Props {
  exercise: Exercise
}

export default function ExerciseCard({ exercise }: Props) {
  return (
    <Link
      href={`/os/exercises/${exercise.slug}`}
      className="group flex flex-col gap-3 p-5 rounded-xl border border-zinc-800/60 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
          <span className="text-emerald-400 text-sm">✦</span>
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-700 group-hover:text-zinc-500 transition-colors shrink-0 mt-0.5" />
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors">
          {exercise.title}
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
          {exercise.goal}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-auto pt-1">
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${difficultyColor[exercise.difficulty]}`}>
          {exercise.difficulty}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-zinc-600 ml-auto">
          <Clock className="w-3 h-3" />
          {exercise.estimatedMinutes}m
        </span>
        <span className="text-[10px] text-zinc-600">
          {exercise.questions.length} prompts
        </span>
      </div>
    </Link>
  )
}
