import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { EXERCISES, getExerciseBySlug } from '@/lib/founder-os/data'
import ExerciseRunner from './_ExerciseRunner'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const ex = getExerciseBySlug(slug)
  if (!ex) return { title: 'Not Found' }
  return { title: ex.title }
}

export function generateStaticParams() {
  return EXERCISES.map(e => ({ slug: e.slug }))
}

export default async function ExerciseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const exercise = getExerciseBySlug(slug)
  if (!exercise) notFound()

  return <ExerciseRunner exercise={exercise} />
}
