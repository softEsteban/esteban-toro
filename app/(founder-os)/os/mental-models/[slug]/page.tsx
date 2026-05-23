import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, BookOpen, ChevronRight, Lightbulb } from 'lucide-react'
import { MENTAL_MODELS, getMentalModelBySlug, getBookBySlug } from '@/lib/founder-os/data'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const model = getMentalModelBySlug(slug)
  if (!model) return { title: 'Not Found' }
  return { title: model.title }
}

export function generateStaticParams() {
  return MENTAL_MODELS.map(m => ({ slug: m.slug }))
}

export default async function MentalModelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const model = getMentalModelBySlug(slug)
  if (!model) notFound()

  const originBook = model.originBookSlug ? getBookBySlug(model.originBookSlug) : null
  const relatedModels = MENTAL_MODELS.filter(m => model.relatedModels.includes(m.slug))

  return (
    <div className="px-8 py-8 max-w-[760px] mx-auto space-y-10">
      <Link
        href="/os/mental-models"
        className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Mental Models
      </Link>

      {/* Hero */}
      <div className="p-7 rounded-2xl border border-zinc-800/60 bg-zinc-900/30">
        <div className="flex items-start gap-5">
          <div className="w-12 h-12 rounded-xl bg-violet-600/15 border border-violet-500/20 flex items-center justify-center shrink-0">
            <Lightbulb className="w-5 h-5 text-violet-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {model.category && (
                <span className="text-[10px] font-semibold text-violet-400 bg-violet-400/10 border border-violet-400/20 px-2.5 py-0.5 rounded-full capitalize">
                  {model.category}
                </span>
              )}
              {originBook && (
                <Link
                  href={`/os/books/${originBook.slug}`}
                  className="text-[10px] text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors"
                >
                  <BookOpen className="w-3 h-3" /> {originBook.title}
                </Link>
              )}
            </div>
            <h1 className="text-2xl font-bold text-zinc-100 mb-3">{model.title}</h1>
            <p className="text-sm text-zinc-400 leading-relaxed">{model.description}</p>
          </div>
        </div>
      </div>

      {/* Application Examples */}
      <section>
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">How to Apply It</h2>
        <div className="space-y-2">
          {model.applicationExamples.map((example, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/30">
              <div className="w-5 h-5 rounded-md bg-violet-600/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[9px] font-bold text-violet-400">{i + 1}</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">{example}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Origin Book */}
      {originBook && (
        <section>
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Origin</h2>
          <Link
            href={`/os/books/${originBook.slug}`}
            className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900 transition-all group"
          >
            <div
              className="w-10 h-14 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: originBook.coverColor }}
            >
              <span className="text-white/90 text-[8px] font-bold text-center px-1 leading-tight">
                {originBook.title.split(' ').slice(0, 2).join(' ')}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-zinc-200 group-hover:text-white">{originBook.title}</p>
              <p className="text-xs text-zinc-500">{originBook.author}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-zinc-500 transition-colors" />
          </Link>
        </section>
      )}

      {/* Related Models */}
      {relatedModels.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Related Models</h2>
          <div className="grid grid-cols-2 gap-3">
            {relatedModels.map(related => (
              <Link
                key={related.id}
                href={`/os/mental-models/${related.slug}`}
                className="flex items-center gap-3 p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-3.5 h-3.5 text-violet-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-zinc-200 group-hover:text-white">{related.title}</p>
                  <p className="text-[10px] text-zinc-600 capitalize">{related.category}</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-700 group-hover:text-zinc-500" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
