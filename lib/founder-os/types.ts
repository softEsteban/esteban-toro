export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
export type ExerciseDifficulty = 'easy' | 'medium' | 'hard'
export type ProgressStatus = 'not_started' | 'in_progress' | 'completed'

export interface KnowledgeDomain {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  bookCount?: number
}

export interface Tag {
  id: string
  name: string
  slug: string
  color: string
}

export interface KeyConcept {
  id: string
  title: string
  description: string
  icon?: string
}

export interface ReflectionQuestion {
  id: string
  question: string
  context?: string
}

export interface ExerciseQuestion {
  id: string
  question: string
  context?: string
  placeholder?: string
  type: 'text' | 'textarea' | 'number' | 'choice' | 'scale'
  options?: string[]
}

export interface Exercise {
  id: string
  title: string
  goal: string
  instructions: string
  questions: ExerciseQuestion[]
  estimatedMinutes: number
  difficulty: ExerciseDifficulty
  slug: string
  icon?: string
  category?: string
  relatedBooks?: string[]
}

export interface MentalModel {
  id: string
  title: string
  slug: string
  description: string
  originBookSlug?: string
  applicationExamples: string[]
  relatedModels: string[]
  icon?: string
  category?: string
}

export interface FrameworkStep {
  number: number
  title: string
  description: string
  action?: string
}

export interface Framework {
  id: string
  title: string
  slug: string
  description: string
  steps: FrameworkStep[]
  originBookSlug?: string
}

export interface Book {
  id: string
  title: string
  author: string
  coverColor: string
  summary: string
  coreIdea: string
  keyConcepts: KeyConcept[]
  mentalModels: string[]
  exercises: string[]
  relatedBooks: string[]
  difficulty: Difficulty
  tags: string[]
  domains: string[]
  publishedYear: number
  readTimeMinutes: number
  slug: string
  reflectionQuestions: ReflectionQuestion[]
}

export interface GraphNode {
  id: string
  label: string
  type: 'book' | 'mental_model' | 'exercise' | 'domain'
  color?: string
  size?: number
}

export interface GraphEdge {
  source: string
  target: string
  label?: string
}

export interface DashboardStats {
  booksStarted: number
  booksCompleted: number
  exercisesCompleted: number
  currentStreak: number
  totalReadingMinutes: number
}
