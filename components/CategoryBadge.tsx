import Link from 'next/link'

interface CategoryBadgeProps {
  name: string
  slug: string
  linked?: boolean
}

const categoryColors: Record<string, string> = {
  technology: 'bg-blue-100 text-blue-700',
  travel: 'bg-emerald-100 text-emerald-700',
  lifestyle: 'bg-pink-100 text-pink-700',
  business: 'bg-amber-100 text-amber-700',
  health: 'bg-red-100 text-red-700',
  food: 'bg-orange-100 text-orange-700',
}

function getColorClasses(slug: string): string {
  return categoryColors[slug] ?? 'bg-gray-100 text-gray-700'
}

export default function CategoryBadge({ name, slug, linked = true }: CategoryBadgeProps) {
  const classes = `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getColorClasses(slug)} transition-opacity hover:opacity-80`

  if (linked) {
    return (
      <Link href={`/categories`} className={classes}>
        {name}
      </Link>
    )
  }

  return <span className={classes}>{name}</span>
}