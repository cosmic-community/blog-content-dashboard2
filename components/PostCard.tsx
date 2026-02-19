import Link from 'next/link'
import type { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const createdAt = post.created_at
    ? new Date(post.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : ''

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 hover:border-gray-300"
    >
      {/* Image */}
      {featuredImage?.imgix_url ? (
        <div className="aspect-[16/9] overflow-hidden bg-gray-100">
          <img
            src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={post.metadata?.title || post.title}
            width={400}
            height={225}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-[16/9] bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
          <span className="text-4xl">📝</span>
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        {category && (
          <div className="mb-2">
            <CategoryBadge
              name={category.metadata?.name || category.title}
              slug={category.slug}
              linked={false}
            />
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2 mb-2">
          {post.metadata?.title || post.title}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-gray-500">
          {author && (
            <div className="flex items-center gap-2">
              {author.metadata?.avatar?.imgix_url ? (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=48&h=48&fit=crop&auto=format,compress`}
                  alt={author.metadata?.name || author.title}
                  width={20}
                  height={20}
                  className="w-5 h-5 rounded-full object-cover"
                />
              ) : (
                <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                  ✍️
                </span>
              )}
              <span className="font-medium text-gray-700">
                {author.metadata?.name || author.title}
              </span>
            </div>
          )}
          {createdAt && (
            <>
              <span className="text-gray-300">·</span>
              <span>{createdAt}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}