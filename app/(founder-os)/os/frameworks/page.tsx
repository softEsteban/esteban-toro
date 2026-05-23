import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { FRAMEWORKS, getBookBySlug } from '@/lib/founder-os/data'

export const metadata: Metadata = { title: 'Frameworks' }

export default function FrameworksPage() {
  return (
    <div className="px-8 py-8 max-w-[900px] mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Frameworks</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Implementation systems extracted from the most powerful books.
        </p>
      </div>

      <div className="space-y-5">
        {FRAMEWORKS.map((fw, fi) => {
          const originBook = fw.originBookSlug ? getBookBySlug(fw.originBookSlug) : null
          const colors = ['#8B5CF6', '#F59E0B', '#10B981', '#EF4444', '#3B82F6']
          const color = colors[fi % colors.length]

          return (
            <div key={fw.id} className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 overflow-hidden">
              {/* Header */}
              <div
                className="px-6 py-5 border-b border-zinc-800/60"
                style={{ background: `linear-gradient(135deg, ${color}12 0%, transparent 60%)` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-base font-semibold text-zinc-100 mb-1">{fw.title}</h2>
                    <p className="text-sm text-zinc-400 leading-relaxed">{fw.description}</p>
                  </div>
                  {originBook && (
                    <Link
                      href={`/os/books/${originBook.slug}`}
                      className="flex items-center gap-1.5 text-[10px] text-zinc-500 hover:text-zinc-300 shrink-0 transition-colors"
                    >
                      <BookOpen className="w-3 h-3" />
                      {originBook.author}
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Steps */}
              <div className="divide-y divide-zinc-800/40">
                {fw.steps.map((step, si) => (
                  <div key={si} className="flex items-start gap-4 px-6 py-4 hover:bg-zinc-900/40 transition-colors">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5"
                      style={{ backgroundColor: color + 'BB' }}
                    >
                      {step.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-zinc-200 mb-1">{step.title}</p>
                      <p className="text-xs text-zinc-400 leading-relaxed">{step.description}</p>
                      {step.action && (
                        <div className="mt-2 flex items-start gap-1.5">
                          <span className="text-[10px] font-semibold text-zinc-600 uppercase tracking-wide shrink-0 mt-0.5">Action:</span>
                          <p className="text-xs text-zinc-500 italic">{step.action}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
