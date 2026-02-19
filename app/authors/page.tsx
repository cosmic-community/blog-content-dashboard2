import { getAuthors, getPosts } from '@/lib/cosmic'
import AuthorCard from '@/components/AuthorCard'

export default async function AuthorsPage() {
  const [authors, posts] = await Promise.all([getAuthors(), getPosts()])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Authors</h1>
        <p className="text-gray-500 mt-1">
          Meet the {authors.length} writers behind the blog.
        </p>
      </div>

      {/* Authors grid */}
      {authors.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <span className="text-4xl mb-3 block">👤</span>
          <p className="text-gray-500">No authors yet. Add your first author in Cosmic.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {authors.map((author) => {
            const authorPostCount = posts.filter(
              (p) => p.metadata?.author?.slug === author.slug
            ).length
            return (
              <AuthorCard key={author.id} author={author} postCount={authorPostCount} />
            )
          })}
        </div>
      )}
    </div>
  )
}