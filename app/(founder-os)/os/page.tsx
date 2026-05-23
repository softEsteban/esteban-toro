import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Brain, Dumbbell, Flame, Clock, TrendingUp } from 'lucide-react'
import { BOOKS, EXERCISES, MENTAL_MODELS, MOCK_STATS } from '@/lib/founder-os/data'
import BookCard from './_components/BookCard'

export const metadata: Metadata = { title: 'Dashboard' }

export default function DashboardPage() {
  const recentBooks = BOOKS.slice(0, 4)
  const featuredBook = BOOKS[3] // Naval
  const suggestedExercises = EXERCISES.slice(0, 3)
  const featuredModels = MENTAL_MODELS.slice(0, 4)

  return (
    <div className="px-8 py-8 max-w-[1100px] mx-auto space-y-10">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Good morning.</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Mental models, books, and systems for building meaningful work.
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20">
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-xs font-medium text-orange-400">{MOCK_STATS.currentStreak} day streak</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Books Started',       value: MOCK_STATS.booksStarted,       icon: BookOpen,   color: 'text-amber-400',  bg: 'bg-amber-400/10'  },
          { label: 'Books Completed',     value: MOCK_STATS.booksCompleted,     icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          { label: 'Exercises Done',      value: MOCK_STATS.exercisesCompleted, icon: Dumbbell,   color: 'text-violet-400', bg: 'bg-violet-400/10' },
          { label: 'Minutes Read',        value: MOCK_STATS.totalReadingMinutes, icon: Clock,     color: 'text-blue-400',   bg: 'bg-blue-400/10'   },
        ].map(stat => (
          <div key={stat.label} className="p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/50">
            <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <p className="text-2xl font-semibold text-zinc-100">{stat.value}</p>
            <p className="text-xs text-zinc-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Featured Book */}
      <div
        className="relative rounded-xl border border-zinc-800/60 overflow-hidden p-6"
        style={{ background: `linear-gradient(135deg, ${featuredBook.coverColor}18 0%, transparent 60%)` }}
      >
        <div className="absolute inset-0 bg-zinc-900/70" />
        <div className="relative flex items-center gap-6">
          <div
            className="w-16 h-24 rounded-lg shadow-2xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: featuredBook.coverColor }}
          >
            <span className="text-white/90 text-[9px] font-bold text-center px-1 leading-tight">
              {featuredBook.title.split(' ').slice(0, 3).join('\n')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-1">Suggested Next</p>
            <h2 className="text-lg font-semibold text-zinc-100">{featuredBook.title}</h2>
            <p className="text-sm text-zinc-500 mb-3">{featuredBook.author} · {featuredBook.readTimeMinutes / 60}h read</p>
            <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">{featuredBook.coreIdea}</p>
          </div>
          <Link
            href={`/os/books/${featuredBook.slug}`}
            className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
          >
            Explore <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Recent Books */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-zinc-200">Library</h2>
          <Link href="/os/books" className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {recentBooks.map(book => <BookCard key={book.id} book={book} />)}
        </div>
      </section>

      {/* Exercises + Mental Models */}
      <div className="grid grid-cols-2 gap-6">
        {/* Exercises */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-zinc-200">Exercises</h2>
            <Link href="/os/exercises" className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {suggestedExercises.map(ex => (
              <Link
                key={ex.id}
                href={`/os/exercises/${ex.slug}`}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-zinc-800/60 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-zinc-200 group-hover:text-white truncate">{ex.title}</p>
                  <p className="text-[10px] text-zinc-600">{ex.estimatedMinutes}m · {ex.difficulty}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-700 group-hover:text-zinc-500 transition-colors shrink-0" />
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
          <div className="space-y-2">
            {featuredModels.map(model => (
              <Link
                key={model.id}
                href={`/os/mental-models/${model.slug}`}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-zinc-800/60 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                  <Brain className="w-3.5 h-3.5 text-violet-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-zinc-200 group-hover:text-white truncate">{model.title}</p>
                  <p className="text-[10px] text-zinc-600 capitalize">{model.category}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-700 group-hover:text-zinc-500 transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
