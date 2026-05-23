import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { DOMAINS, BOOKS, getBooksByDomain } from '@/lib/founder-os/data'

export const metadata: Metadata = { title: 'Knowledge Domains' }

export default function KnowledgePage() {
  return (
    <div className="px-8 py-8 max-w-[1100px] mx-auto space-y-10">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Knowledge Domains</h1>
        <p className="text-sm text-zinc-500 mt-1">
          8 areas of mastery for founders, creators, and people who want to live by design.
        </p>
      </div>

      {/* Domain Grid */}
      <div className="grid grid-cols-2 gap-4">
        {DOMAINS.map(domain => {
          const books = getBooksByDomain(domain.slug)

          return (
            <div
              key={domain.id}
              className="group relative rounded-xl border border-zinc-800/60 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all duration-200 overflow-hidden p-6"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ backgroundColor: domain.color, transform: 'translate(30%, -30%)' }}
              />

              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: domain.color + '20', border: `1px solid ${domain.color}30` }}
                >
                  <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: domain.color }} />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-zinc-100">{domain.name}</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">{domain.description}</p>
                </div>
              </div>

              {/* Book list */}
              <div className="space-y-1.5">
                {books.slice(0, 4).map(book => (
                  <Link
                    key={book.id}
                    href={`/os/books/${book.slug}`}
                    className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-zinc-800/60 transition-colors group/book"
                  >
                    <div
                      className="w-5 h-7 rounded flex items-center justify-center shrink-0"
                      style={{ backgroundColor: book.coverColor + 'CC' }}
                    />
                    <span className="text-xs text-zinc-400 group-hover/book:text-zinc-200 transition-colors flex-1 min-w-0 truncate">
                      {book.title}
                    </span>
                    <ArrowRight className="w-3 h-3 text-zinc-700 group-hover/book:text-zinc-500 shrink-0 opacity-0 group-hover/book:opacity-100 transition-all" />
                  </Link>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-800/40">
                <span className="text-[10px] text-zinc-600">{books.length} books in this domain</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
