import Link from 'next/link'
import type { Author } from '@/types'

interface AuthorCardProps {
  author: Author
  postCount?: number
}

export default function AuthorCard({ author, postCount }: AuthorCardProps) {
  const avatar = author.metadata?.avatar

  return (
    <Link
      href={`/authors/${author.slug}`}
      className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:border-gray-300 flex flex-col items-center text-center"
    >
      {/* Avatar */}
      {avatar?.imgix_url ? (
        <img
          src={`${avatar.imgix_url}?w=192&h=192&fit=crop&auto=format,compress`}
          alt={author.metadata?.name || author.title}
          width={80}
          height={80}
          className="w-20 h-20 rounded-full object-cover ring-3 ring-gray-100 group-hover:ring-brand-100 transition-all mb-4"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-brand-100 flex items-center justify-center text-3xl mb-4">
          ✍️
        </div>
      )}

      {/* Name */}
      <h3 className="text-base font-semibold text-gray-900 group-hover:text-brand-600 transition-colors mb-1">
        {author.metadata?.name || author.title}
      </h3>

      {/* Bio */}
      {author.metadata?.bio && (
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
          {author.metadata.bio}
        </p>
      )}

      {/* Post count */}
      {postCount !== undefined && (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
          {postCount} {postCount === 1 ? 'post' : 'posts'}
        </span>
      )}
    </Link>
  )
}