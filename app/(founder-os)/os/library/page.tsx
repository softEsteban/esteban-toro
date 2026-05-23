import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Brain, Dumbbell, Layers, ArrowRight, BookMarked } from 'lucide-react'
import { BOOKS, MENTAL_MODELS, EXERCISES, FRAMEWORKS } from '@/lib/founder-os/data'

export const metadata: Metadata = { title: 'Library' }

export default function LibraryPage() {
  const featured = BOOKS.slice(0, 3)
  const featuredModels = MENTAL_MODELS.slice(0, 4)
  const featuredExercises = EXERCISES.slice(0, 3)

  return (
    <div className="px-8 py-8 max-w-[1000px] mx-auto space-y-10">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Library</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Your saved books, models, and notes in one place.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Books',         count: BOOKS.length,         icon: BookOpen, color: 'text-amber-400', bg: 'bg-amber-400/10',   href: '/os/books' },
          { label: 'Mental Models', count: MENTAL_MODELS.length, icon: Brain,    color: 'text-violet-400', bg: 'bg-violet-400/10', href: '/os/mental-models' },
          { label: 'Exercises',     count: EXERCISES.length,     icon: Dumbbell, color: 'text-emerald-400', bg: 'bg-emerald-400/10', href: '/os/exercises' },
          { label: 'Frameworks',    count: FRAMEWORKS.length,    icon: Layers,   color: 'text-blue-400',  bg: 'bg-blue-400/10',   href: '/os/frameworks' },
        ].map(item => (
          <Link
            key={item.label}
            href={item.href}
            className="group p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900 transition-all"
          >
            <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center mb-3`}>
              <item.icon className={`w-4 h-4 ${item.color}`} />
            </div>
            <p className="text-2xl font-semibold text-zinc-100">{item.count}</p>
            <p className="text-xs text-zinc-500 mt-0.5 group-hover:text-zinc-400 transition-colors">
              {item.label} <ArrowRight className="w-3 h-3 inline ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </p>
          </Link>
        ))}
      </div>

      {/* Recent Books */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-zinc-200">Books</h2>
          <Link href="/os/books" className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-2">
          {featured.map(book => (
            <Link
              key={book.id}
              href={`/os/books/${book.slug}`}
              className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900 transition-all group"
            >
              <div
                className="w-9 h-12 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: book.coverColor }}
              >
                <BookMarked className="w-4 h-4 text-white/70" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-200 group-hover:text-white truncate">{book.title}</p>
                <p className="text-xs text-zinc-500">{book.author}</p>
              </div>
              <div className="shrink-0 text-right">
                <span className="text-[10px] text-zinc-600 capitalize">{book.difficulty}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-700 group-hover:text-zinc-500 shrink-0" />
            </Link>
          ))}
        </div>
      </section>

      {/* Mental Models */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-zinc-200">Mental Models</h2>
          <Link href="/os/mental-models" className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {featuredModels.map(model => (
            <Link
              key={model.id}
              href={`/os/mental-models/${model.slug}`}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-zinc-800/60 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900 transition-all group"
            >
              <div className="w-7 h-7 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                <Brain className="w-3.5 h-3.5 text-violet-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-zinc-200 group-hover:text-white truncate">{model.title}</p>
                <p className="text-[10px] text-zinc-600 capitalize">{model.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Exercises */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-zinc-200">Exercises</h2>
          <Link href="/os/exercises" className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {featuredExercises.map(ex => (
            <Link
              key={ex.id}
              href={`/os/exercises/${ex.slug}`}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-zinc-800/60 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900 transition-all group"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-zinc-200 group-hover:text-white truncate">{ex.title}</p>
                <p className="text-[10px] text-zinc-600">{ex.estimatedMinutes}m</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
