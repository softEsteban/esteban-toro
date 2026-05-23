import type { Metadata } from 'next'
import Sidebar from './_components/Sidebar'

export const metadata: Metadata = {
  title: { default: 'Founder OS', template: '%s — Founder OS' },
  description: 'Mental models, books, exercises, and systems for building meaningful work and a life by design.',
  robots: { index: false, follow: false },
}

export default function FounderOSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#09090B] text-zinc-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
