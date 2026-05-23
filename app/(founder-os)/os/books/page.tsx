import type { Metadata } from 'next'
import { BOOKS, DOMAINS } from '@/lib/founder-os/data'
import BookCard from '../_components/BookCard'

export const metadata: Metadata = { title: 'Books' }

export default function BooksPage() {
  const byDomain = DOMAINS.map(domain => ({
    domain,
    books: BOOKS.filter(b => b.domains.includes(domain.slug)).slice(0, 4),
  })).filter(g => g.books.length > 0)

  return (
    <div className="px-8 py-8 max-w-[1100px] mx-auto space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Books</h1>
        <p className="text-sm text-zinc-500 mt-1">
          {BOOKS.length} books transformed into actionable knowledge systems.
        </p>
      </div>

      {/* All Books Grid */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">All Books</h2>
          <div className="h-px flex-1 bg-zinc-800/60" />
        </div>
        <div className="grid grid-cols-5 gap-3">
          {BOOKS.map(book => <BookCard key={book.id} book={book} />)}
        </div>
      </section>

      {/* By Domain */}
      {byDomain.slice(0, 4).map(({ domain, books }) => (
        <section key={domain.id}>
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: domain.color }} />
              <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">{domain.name}</h2>
            </div>
            <div className="h-px flex-1 bg-zinc-800/60" />
            <span className="text-[10px] text-zinc-600">{books.length} books</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {books.map(book => <BookCard key={book.id} book={book} compact />)}
          </div>
        </section>
      ))}
    </div>
  )
}
