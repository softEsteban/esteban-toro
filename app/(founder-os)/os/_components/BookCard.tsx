import Link from 'next/link'
import { Clock, ArrowUpRight } from 'lucide-react'
import type { Book } from '@/lib/founder-os/types'

const difficultyLabel: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

const difficultyColor: Record<string, string> = {
  beginner: 'text-emerald-400 bg-emerald-400/10',
  intermediate: 'text-amber-400 bg-amber-400/10',
  advanced: 'text-rose-400 bg-rose-400/10',
}

interface Props {
  book: Book
  compact?: boolean
}

export default function BookCard({ book, compact = false }: Props) {
  return (
    <Link
      href={`/os/books/${book.slug}`}
      className="group flex flex-col rounded-xl border border-zinc-800/60 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200 overflow-hidden"
    >
      {/* Cover */}
      <div
        className="relative flex items-end p-4 h-[120px]"
        style={{ backgroundColor: book.coverColor + '22', borderBottom: `1px solid ${book.coverColor}22` }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: `linear-gradient(135deg, ${book.coverColor}55 0%, transparent 60%)` }}
        />
        <div
          className="relative w-14 h-20 rounded-md shadow-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: book.coverColor }}
        >
          <span className="text-white/90 text-[10px] font-bold text-center leading-tight px-1.5">
            {book.title.split(' ').slice(0, 3).join('\n')}
          </span>
        </div>
        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="w-4 h-4 text-zinc-400" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div>
          <h3 className="text-sm font-semibold text-zinc-100 leading-snug group-hover:text-white transition-colors line-clamp-2">
            {book.title}
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">{book.author}</p>
        </div>

        {!compact && (
          <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 flex-1">
            {book.coreIdea}
          </p>
        )}

        <div className="flex items-center justify-between pt-1">
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${difficultyColor[book.difficulty]}`}>
            {difficultyLabel[book.difficulty]}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-zinc-600">
            <Clock className="w-3 h-3" />
            {Math.round(book.readTimeMinutes / 60)}h
          </span>
        </div>
      </div>
    </Link>
  )
}
