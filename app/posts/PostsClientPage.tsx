'use client'

import { useState } from 'react'
import type { Post, Category } from '@/types'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'

interface PostsClientPageProps {
  posts: Post[]
  categories: Category[]
}

export default function PostsClientPage({ posts, categories }: PostsClientPageProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredPosts = activeCategory
    ? posts.filter((post) => post.metadata?.category?.slug === activeCategory)
    : posts

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
        <p className="text-gray-500 mt-1">
          Browse and manage all {posts.length} blog posts.
        </p>
      </div>

      {/* Filters */}
      {categories.length > 0 && (
        <CategoryFilter
          categories={categories}
          activeSlug={activeCategory}
          onSelect={setActiveCategory}
        />
      )}

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <span className="text-4xl mb-3 block">🔍</span>
          <p className="text-gray-500">
            {activeCategory
              ? 'No posts found in this category.'
              : 'No posts yet. Create your first post in Cosmic.'}
          </p>
          {activeCategory && (
            <button
              onClick={() => setActiveCategory(null)}
              className="mt-3 text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              Clear filter
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}