'use client'

import type { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
  activeSlug: string | null
  onSelect: (slug: string | null) => void
}

const categoryColors: Record<string, string> = {
  technology: 'bg-blue-100 text-blue-700 border-blue-200',
  travel: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  lifestyle: 'bg-pink-100 text-pink-700 border-pink-200',
  business: 'bg-amber-100 text-amber-700 border-amber-200',
  health: 'bg-red-100 text-red-700 border-red-200',
  food: 'bg-orange-100 text-orange-700 border-orange-200',
}

function getActiveClasses(slug: string): string {
  return categoryColors[slug] ?? 'bg-gray-200 text-gray-800 border-gray-300'
}

export default function CategoryFilter({ categories, activeSlug, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
          activeSlug === null
            ? 'bg-gray-900 text-white border-gray-900'
            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.slug)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
            activeSlug === cat.slug
              ? getActiveClasses(cat.slug)
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
          }`}
        >
          {cat.metadata?.name || cat.title}
        </button>
      ))}
    </div>
  )
}