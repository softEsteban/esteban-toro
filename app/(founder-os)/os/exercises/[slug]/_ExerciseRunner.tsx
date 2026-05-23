'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Clock, ChevronDown, ChevronUp, CheckCircle2, Circle } from 'lucide-react'
import type { Exercise } from '@/lib/founder-os/types'

const difficultyColor: Record<string, string> = {
  easy:   'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  hard:   'text-rose-400 bg-rose-400/10 border-rose-400/20',
}

interface Props { exercise: Exercise }

export default function ExerciseRunner({ exercise }: Props) {
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [expanded, setExpanded] = useState<string>(exercise.questions[0]?.id ?? '')
  const [saved, setSaved] = useState(false)

  const completedCount = exercise.questions.filter(q => responses[q.id]?.trim()).length

  function handleChange(id: string, value: string) {
    setResponses(prev => ({ ...prev, [id]: value }))
    setSaved(false)
  }

  function handleSave() {
    const key = `founder-os-exercise-${exercise.slug}`
    localStorage.setItem(key, JSON.stringify(responses))
    setSaved(true)
  }

  return (
    <div className="px-8 py-8 max-w-[760px] mx-auto space-y-8">
      <Link
        href="/os/exercises"
        className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Exercises
      </Link>

      {/* Header */}
      <div className="p-6 rounded-2xl border border-zinc-800/60 bg-zinc-900/30">
        <div className="flex items-start gap-5">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <span className="text-emerald-400 text-lg">✦</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full border capitalize ${difficultyColor[exercise.difficulty]}`}>
                {exercise.difficulty}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-zinc-500">
                <Clock className="w-3 h-3" /> {exercise.estimatedMinutes}m
              </span>
            </div>
            <h1 className="text-xl font-bold text-zinc-100 mb-2">{exercise.title}</h1>
            <p className="text-sm text-zinc-400 leading-relaxed">{exercise.goal}</p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="p-5 rounded-xl border border-zinc-800/40 bg-zinc-900/20">
        <h2 className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-2">Instructions</h2>
        <p className="text-sm text-zinc-400 leading-relaxed">{exercise.instructions}</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / exercise.questions.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-zinc-500 shrink-0">
          {completedCount} / {exercise.questions.length} completed
        </span>
      </div>

      {/* Questions */}
      <div className="space-y-3">
        {exercise.questions.map((q, i) => {
          const isOpen = expanded === q.id
          const isDone = Boolean(responses[q.id]?.trim())

          return (
            <div
              key={q.id}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-zinc-700 bg-zinc-900'
                  : 'border-zinc-800/60 bg-zinc-900/30 hover:border-zinc-700/60'
              }`}
            >
              <button
                className="w-full flex items-center gap-3 p-4 text-left"
                onClick={() => setExpanded(isOpen ? '' : q.id)}
              >
                {isDone
                  ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  : <Circle className="w-4 h-4 text-zinc-600 shrink-0" />
                }
                <span className="flex-1 text-sm font-medium text-zinc-200">
                  <span className="text-zinc-600 mr-2">{i + 1}.</span>
                  {q.question}
                </span>
                {isOpen
                  ? <ChevronUp className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                  : <ChevronDown className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                }
              </button>

              {isOpen && (
                <div className="px-4 pb-4 space-y-3">
                  {q.context && (
                    <p className="text-xs text-zinc-600 italic border-l-2 border-zinc-700 pl-3">{q.context}</p>
                  )}
                  {q.type === 'number' ? (
                    <input
                      type="number"
                      value={responses[q.id] ?? ''}
                      onChange={e => handleChange(q.id, e.target.value)}
                      placeholder={q.placeholder ?? ''}
                      className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-lg px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/60 transition-colors"
                    />
                  ) : q.type === 'text' ? (
                    <input
                      type="text"
                      value={responses[q.id] ?? ''}
                      onChange={e => handleChange(q.id, e.target.value)}
                      placeholder={q.placeholder ?? ''}
                      className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-lg px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/60 transition-colors"
                    />
                  ) : (
                    <textarea
                      value={responses[q.id] ?? ''}
                      onChange={e => handleChange(q.id, e.target.value)}
                      placeholder={q.placeholder ?? 'Write your response here...'}
                      rows={5}
                      className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-lg px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/60 transition-colors resize-none leading-relaxed"
                    />
                  )}
                  {i < exercise.questions.length - 1 && (
                    <button
                      onClick={() => setExpanded(exercise.questions[i + 1].id)}
                      className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      Next question →
                    </button>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Save */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-xs text-zinc-600">
          Responses are saved locally in your browser.
        </p>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
            saved
              ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/20'
              : 'bg-violet-600 hover:bg-violet-500 text-white'
          }`}
        >
          {saved ? <><CheckCircle2 className="w-3.5 h-3.5" /> Saved</> : 'Save Responses'}
        </button>
      </div>
    </div>
  )
}
