# Blog Content Dashboard

![Blog Content Dashboard](https://imgix.cosmicjs.com/13b65cb0-0d4c-11f1-b972-459e0ce1e52b-photo-1555881400-74d7acaacd8b-1771475580259.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern React dashboard built with Next.js 16 for managing your blog content powered by Cosmic. View, filter, and explore your posts, authors, and categories from a sleek, responsive interface.

## Features

- 📊 **Dashboard Overview** — Visual stats cards showing content counts at a glance
- 📝 **Post Management** — Browse all posts with featured images, authors, and categories
- ✍️ **Author Profiles** — View author cards with avatars, bios, and associated post counts
- 🏷️ **Category Filtering** — Filter posts by category with interactive badges
- 📖 **Post Detail View** — Full markdown-rendered post pages with author info
- 📱 **Fully Responsive** — Clean layouts for desktop, tablet, and mobile
- ⚡ **Server-Side Rendering** — Fast, SEO-friendly pages with Next.js App Router

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=699691f5fc83ec3ef0727058&clone_repository=6996939efc83ec3ef07272ee)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, authors, and categories"

### Code Generation Prompt

> "Create a React dashboard that displays and manages my existing content"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type-safe development
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility-first CSS framework
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS for content management
- [react-markdown](https://github.com/remarkjs/react-markdown) — Markdown rendering

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with a bucket

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd blog-content-dashboard

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Run the development server
bun dev
```

### Environment Variables

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

### Fetching Posts with Connected Objects

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Post by Slug

```typescript
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post-slug' })
  .props(['id', 'title', 'slug', 'metadata', 'created_at'])
  .depth(1)
```

## Cosmic CMS Integration

This dashboard integrates with three Cosmic object types:

| Object Type | Fields | Description |
|-------------|--------|-------------|
| **Posts** | title, content (markdown), featured_image, author, category | Blog articles with rich content |
| **Authors** | name, bio, avatar | Content creators with profiles |
| **Categories** | name, description | Content organization tags |

Posts connect to Authors and Categories via object relationship metafields, resolved automatically using the `depth` parameter.

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import on [Netlify](https://netlify.com)
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables

<!-- README_END -->