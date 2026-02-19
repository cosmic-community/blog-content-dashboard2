// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type?: string;
  created_at?: string;
  modified_at?: string;
  status?: string;
  thumbnail?: string;
  bucket?: string;
}

// Author object type
export interface Author extends CosmicObject {
  metadata: {
    name: string;
    bio?: string;
    avatar?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Category object type
export interface Category extends CosmicObject {
  metadata: {
    name: string;
    description?: string;
  };
}

// Post object type
export interface Post extends CosmicObject {
  metadata: {
    title: string;
    content?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    category?: Category;
  };
}

// API response type
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Single object response
export interface CosmicSingleResponse<T> {
  object: T;
}

// Helper type guard
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}