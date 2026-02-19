import { getPosts, getAuthors, getCategories } from '@/lib/cosmic'
import StatsCard from '@/components/StatsCard'
import PostCard from '@/components/PostCard'
import AuthorCard from '@/components/AuthorCard'
import Link from 'next/link'

export default async function DashboardPage() {
  const [posts, authors, categories] = await Promise.all([
    getPosts(),
    getAuthors(),
    getCategories(),
  ])

  const recentPosts = posts
    .sort((a, b) => {
      const dateA = new Date(a.created_at || '').getTime()
      const dateB = new Date(b.created_at || '').getTime()
      return dateB - dateA
    })
    .slice(0, 4)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back. Here&apos;s an overview of your blog content.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard
          emoji="📝"
          label="Total Posts"
          count={posts.length}
          description="Published blog posts"
          color="blue"
        />
        <StatsCard
          emoji="✍️"
          label="Authors"
          count={authors.length}
          description="Contributing writers"
          color="green"
        />
        <StatsCard
          emoji="🏷️"
          label="Categories"
          count={categories.length}
          description="Content categories"
          color="purple"
        />
      </div>

      {/* Recent Posts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Posts</h2>
          <Link
            href="/posts"
            className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            View all →
          </Link>
        </div>
        {recentPosts.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <span className="text-4xl mb-3 block">📭</span>
            <p className="text-gray-500">No posts yet. Create your first post in Cosmic.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      {/* Authors */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Authors</h2>
          <Link
            href="/authors"
            className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            View all →
          </Link>
        </div>
        {authors.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <span className="text-4xl mb-3 block">👤</span>
            <p className="text-gray-500">No authors yet.</p>
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
    </div>
  )
}