import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, BookOpen, Brain, Dumbbell, HelpCircle, ChevronRight } from 'lucide-react'
import { BOOKS, getBookBySlug, getRelatedBooks, getBookMentalModels, getBookExercises } from '@/lib/founder-os/data'
import BookCard from '../../_components/BookCard'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const book = getBookBySlug(slug)
  if (!book) return { title: 'Book Not Found' }
  return { title: book.title }
}

export function generateStaticParams() {
  return BOOKS.map(b => ({ slug: b.slug }))
}

const difficultyLabel: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

const difficultyColor: Record<string, string> = {
  beginner: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  intermediate: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  advanced: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
}

export default async function BookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const book = getBookBySlug(slug)
  if (!book) notFound()

  const relatedBooks = getRelatedBooks(book.relatedBooks)
  const mentalModels = getBookMentalModels(book.mentalModels)
  const exercises = getBookExercises(book.exercises)

  return (
    <div className="px-8 py-8 max-w-[860px] mx-auto space-y-10">
      {/* Back */}
      <Link
        href="/os/books"
        className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Books
      </Link>

      {/* Hero */}
      <div
        className="relative rounded-2xl overflow-hidden p-8"
        style={{ background: `linear-gradient(135deg, ${book.coverColor}20 0%, ${book.coverColor}08 100%)` }}
      >
        <div className="absolute inset-0 border border-zinc-800/60 rounded-2xl pointer-events-none" />
        <div className="flex items-start gap-7">
          {/* Cover */}
          <div
            className="w-24 h-36 rounded-xl shadow-2xl flex items-center justify-center shrink-0 relative"
            style={{ backgroundColor: book.coverColor }}
          >
            <div className="absolute inset-0 rounded-xl" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)' }} />
            <span className="text-white/90 text-[11px] font-bold text-center px-2 leading-tight">
              {book.title}
            </span>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 pt-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${difficultyColor[book.difficulty]}`}>
                {difficultyLabel[book.difficulty]}
              </span>
              {book.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-[10px] font-medium px-2.5 py-1 rounded-full border border-zinc-700/60 text-zinc-400">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-2xl font-bold text-zinc-100 leading-tight mb-1">{book.title}</h1>
            <p className="text-base text-zinc-400 mb-4">{book.author} · {book.publishedYear}</p>
            <div className="flex items-center gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {book.readTimeMinutes / 60}h read</span>
              <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> {book.keyConcepts.length} concepts</span>
              <span className="flex items-center gap-1.5"><Brain className="w-3.5 h-3.5" /> {book.mentalModels.length} mental models</span>
              <span className="flex items-center gap-1.5"><Dumbbell className="w-3.5 h-3.5" /> {book.exercises.length} exercises</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Thesis */}
      <section>
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Core Thesis</h2>
        <div
          className="relative p-5 rounded-xl border-l-4"
          style={{ borderLeftColor: book.coverColor, backgroundColor: book.coverColor + '0C' }}
        >
          <p className="text-sm text-zinc-200 leading-relaxed font-medium">{book.coreIdea}</p>
        </div>
        <p className="text-sm text-zinc-400 leading-relaxed mt-4">{book.summary}</p>
      </section>

      {/* Key Concepts */}
      <section>
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Key Concepts</h2>
        <div className="grid grid-cols-2 gap-3">
          {book.keyConcepts.map((concept, i) => (
            <div
              key={concept.id}
              className="p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/50"
            >
              <div className="flex items-start gap-3 mb-2">
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5"
                  style={{ backgroundColor: book.coverColor + 'CC' }}
                >
                  {i + 1}
                </div>
                <h3 className="text-sm font-semibold text-zinc-100 leading-snug">{concept.title}</h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed pl-9">{concept.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mental Models */}
      {mentalModels.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Mental Models</h2>
          <div className="space-y-2">
            {mentalModels.map(model => (
              <Link
                key={model.id}
                href={`/os/mental-models/${model.slug}`}
                className="flex items-center gap-3 p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                  <Brain className="w-4 h-4 text-violet-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-200 group-hover:text-white">{model.title}</p>
                  <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">{model.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-zinc-500 transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Exercises */}
      {exercises.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Practical Exercises</h2>
          <div className="space-y-2">
            {exercises.map(ex => (
              <Link
                key={ex.id}
                href={`/os/exercises/${ex.slug}`}
                className="flex items-center gap-3 p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Dumbbell className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-200 group-hover:text-white">{ex.title}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{ex.estimatedMinutes}m · {ex.questions.length} prompts</p>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-zinc-500 transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Reflection Questions */}
      {book.reflectionQuestions.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Reflection Questions</h2>
          <div className="space-y-3">
            {book.reflectionQuestions.map((q, i) => (
              <div key={q.id} className="flex items-start gap-3 p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/30">
                <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700/60 flex items-center justify-center shrink-0 mt-0.5">
                  <HelpCircle className="w-3.5 h-3.5 text-zinc-500" />
                </div>
                <div>
                  <p className="text-sm text-zinc-200 leading-relaxed">{q.question}</p>
                  {q.context && <p className="text-xs text-zinc-600 mt-1.5">{q.context}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Related Books</h2>
          <div className="grid grid-cols-3 gap-3">
            {relatedBooks.map(b => <BookCard key={b.id} book={b} compact />)}
          </div>
        </section>
      )}
    </div>
  )
}
