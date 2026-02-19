import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import CosmicBadge from '@/components/CosmicBadge'

export const metadata: Metadata = {
  title: 'Blog Content Dashboard',
  description: 'Manage your blog content powered by Cosmic',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className="bg-gray-50 font-sans text-gray-900 antialiased">
        <Sidebar />
        <main className="lg:ml-64 min-h-screen">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-16 lg:pt-8">
            {children}
          </div>
        </main>
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}