'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, BookOpen, Brain, Dumbbell, GitBranch,
  Library, Network, Map, ChevronRight, Layers
} from 'lucide-react'

type NavItem = { href: string; label: string; icon: React.ComponentType<{ className?: string }>; exact?: boolean }
type NavGroup = { label: string | null; items: NavItem[] }

const nav: NavGroup[] = [
  {
    label: null,
    items: [
      { href: '/os', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    ],
  },
  {
    label: 'Knowledge',
    items: [
      { href: '/os/knowledge',     label: 'Domains',       icon: Map },
      { href: '/os/books',         label: 'Books',         icon: BookOpen },
      { href: '/os/mental-models', label: 'Mental Models', icon: Brain },
    ],
  },
  {
    label: 'Practice',
    items: [
      { href: '/os/exercises',  label: 'Exercises',  icon: Dumbbell },
      { href: '/os/frameworks', label: 'Frameworks', icon: Layers },
    ],
  },
  {
    label: 'Personal',
    items: [
      { href: '/os/library', label: 'Library',         icon: Library },
      { href: '/os/graph',   label: 'Knowledge Graph', icon: Network },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  function isActive(href: string, exact = false) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <aside className="w-[220px] shrink-0 flex flex-col bg-[#0C0C0F] border-r border-zinc-800/60 h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-zinc-800/60">
        <Link href="/os" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center shrink-0">
            <GitBranch className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-zinc-100 leading-tight">Founder OS</p>
            <p className="text-[10px] text-zinc-500 leading-tight">v1.0</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {nav.map((group, gi) => (
          <div key={gi}>
            {group.label && (
              <p className="px-2 mb-1.5 text-[10px] font-semibold text-zinc-600 uppercase tracking-widest">
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map(item => {
                const active = isActive(item.href, item.exact)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] transition-all duration-150 group ${
                      active
                        ? 'bg-violet-600/15 text-violet-300 font-medium'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 shrink-0 ${active ? 'text-violet-400' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                    <span className="flex-1">{item.label}</span>
                    {active && <ChevronRight className="w-3 h-3 text-violet-500/60" />}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-zinc-800/60">
        <p className="text-[10px] text-zinc-700 leading-relaxed">
          Mental models &amp; systems for building meaningful work.
        </p>
      </div>
    </aside>
  )
}
