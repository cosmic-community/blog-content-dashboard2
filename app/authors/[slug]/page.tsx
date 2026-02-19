// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getAuthors, getPosts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PostCard from '@/components/PostCard'

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors.map((author) => ({ slug: author.slug }))
}

export default async function AuthorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [author, allPosts] = await Promise.all([
    getAuthorBySlug(slug),
    getPosts(),
  ])

  if (!author) {
    notFound()
  }

  const authorPosts = allPosts.filter(
    (p) => p.metadata?.author?.slug === author.slug
  )

  const avatar = author.metadata?.avatar

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        href="/authors"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
      >
        ← Back to authors
      </Link>

      {/* Profile */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {avatar?.imgix_url ? (
          <img
            src={`${avatar.imgix_url}?w=256&h=256&fit=crop&auto=format,compress`}
            alt={author.metadata?.name || author.title}
            width={96}
            height={96}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-gray-100 flex-shrink-0"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-brand-100 flex items-center justify-center text-4xl flex-shrink-0">
            ✍️
          </div>
        )}
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold text-gray-900">
            {author.metadata?.name || author.title}
          </h1>
          {author.metadata?.bio && (
            <p className="text-gray-600 mt-2 max-w-xl">{author.metadata.bio}</p>
          )}
          <div className="mt-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brand-50 text-brand-700">
              {authorPosts.length} {authorPosts.length === 1 ? 'post' : 'posts'}
            </span>
          </div>
        </div>
      </div>

      {/* Author Posts */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Posts by {author.metadata?.name || author.title}
        </h2>
        {authorPosts.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <span className="text-4xl mb-3 block">📭</span>
            <p className="text-gray-500">This author hasn&apos;t published any posts yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {authorPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}