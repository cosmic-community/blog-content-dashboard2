import { getCategories, getPosts } from '@/lib/cosmic'
import Link from 'next/link'

const categoryEmojis: Record<string, string> = {
  technology: '💻',
  travel: '✈️',
  lifestyle: '🌟',
  business: '💼',
  health: '❤️',
  food: '🍴',
}

function getCategoryEmoji(slug: string): string {
  return categoryEmojis[slug] ?? '🏷️'
}

const categoryBgColors: Record<string, string> = {
  technology: 'from-blue-500 to-blue-600',
  travel: 'from-emerald-500 to-emerald-600',
  lifestyle: 'from-pink-500 to-pink-600',
  business: 'from-amber-500 to-amber-600',
  health: 'from-red-500 to-red-600',
  food: 'from-orange-500 to-orange-600',
}

function getCategoryGradient(slug: string): string {
  return categoryBgColors[slug] ?? 'from-gray-500 to-gray-600'
}

export default async function CategoriesPage() {
  const [categories, posts] = await Promise.all([getCategories(), getPosts()])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <p className="text-gray-500 mt-1">
          Browse content organized across {categories.length} categories.
        </p>
      </div>

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <span className="text-4xl mb-3 block">🏷️</span>
          <p className="text-gray-500">No categories yet. Create your first category in Cosmic.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {categories.map((category) => {
            const categoryPostCount = posts.filter(
              (p) => p.metadata?.category?.slug === category.slug
            ).length

            return (
              <div
                key={category.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 hover:border-gray-300"
              >
                {/* Color bar */}
                <div className={`h-2 bg-gradient-to-r ${getCategoryGradient(category.slug)}`} />

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{getCategoryEmoji(category.slug)}</span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      {categoryPostCount} {categoryPostCount === 1 ? 'post' : 'posts'}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {category.metadata?.name || category.title}
                  </h3>

                  {category.metadata?.description && (
                    <p className="text-sm text-gray-500 mb-4">
                      {category.metadata.description}
                    </p>
                  )}

                  {/* Posts preview */}
                  {categoryPostCount > 0 && (
                    <div className="border-t border-gray-100 pt-4 space-y-2">
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                        Latest posts
                      </p>
                      {posts
                        .filter((p) => p.metadata?.category?.slug === category.slug)
                        .slice(0, 3)
                        .map((post) => (
                          <Link
                            key={post.id}
                            href={`/posts/${post.slug}`}
                            className="block text-sm text-gray-700 hover:text-brand-600 transition-colors truncate"
                          >
                            {post.metadata?.title || post.title}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}