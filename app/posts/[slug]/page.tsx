// app/posts/[slug]/page.tsx
import { getPostBySlug, getPosts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import CategoryBadge from '@/components/CategoryBadge'

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const author = post.metadata?.author
  const category = post.metadata?.category
  const featuredImage = post.metadata?.featured_image
  const content = post.metadata?.content || ''
  const createdAt = post.created_at
    ? new Date(post.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : ''

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back link */}
      <Link
        href="/posts"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
      >
        ← Back to posts
      </Link>

      {/* Article */}
      <article className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Featured image */}
        {featuredImage?.imgix_url && (
          <div className="aspect-[2/1] overflow-hidden">
            <img
              src={`${featuredImage.imgix_url}?w=1400&h=700&fit=crop&auto=format,compress`}
              alt={post.metadata?.title || post.title}
              width={700}
              height={350}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6 sm:p-8">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {category && (
              <CategoryBadge
                name={category.metadata?.name || category.title}
                slug={category.slug}
              />
            )}
            {createdAt && (
              <span className="text-sm text-gray-500">{createdAt}</span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {post.metadata?.title || post.title}
          </h1>

          {/* Author */}
          {author && (
            <Link
              href={`/authors/${author.slug}`}
              className="flex items-center gap-3 mb-8 group"
            >
              {author.metadata?.avatar?.imgix_url ? (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                  alt={author.metadata?.name || author.title}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-lg">
                  ✍️
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                  {author.metadata?.name || author.title}
                </p>
                {author.metadata?.bio && (
                  <p className="text-xs text-gray-500 line-clamp-1">{author.metadata.bio}</p>
                )}
              </div>
            </Link>
          )}

          {/* Content */}
          {content && <MarkdownRenderer content={content} />}
        </div>
      </article>
    </div>
  )
}