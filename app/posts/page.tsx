import { getPosts, getCategories } from '@/lib/cosmic'
import PostsClientPage from './PostsClientPage'

export default async function PostsPage() {
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories(),
  ])

  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.created_at || '').getTime()
    const dateB = new Date(b.created_at || '').getTime()
    return dateB - dateA
  })

  return <PostsClientPage posts={sortedPosts} categories={categories} />
}