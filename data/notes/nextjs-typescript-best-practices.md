---
title: Next.js and TypeScript Best Practices
date: 2024-05-01
categories: ['Notes']
tags:
  - Next.js
  - TypeScript
  - Web Development
  - Best Practices
  - Performance
draft: false
summary: A collection of best practices for Next.js and TypeScript development. Learn how to structure your project, optimize performance, and leverage TypeScript for better code quality.
---

# Next.js and TypeScript Best Practices

This note outlines best practices for building high-quality applications with Next.js and TypeScript. Following these guidelines will help you create maintainable, performant, and type-safe applications.

## Project Structure

A well-organized project structure makes your codebase more maintainable:

```
my-nextjs-app/
├── components/        # Reusable UI components
│   ├── common/        # Shared components used across features
│   ├── layouts/       # Layout components (headers, footers, etc.)
│   └── [feature]/     # Feature-specific components
├── pages/             # Route components (with Next.js routing)
│   ├── api/           # API routes
│   └── [feature]/     # Feature-specific pages
├── public/            # Static assets
├── styles/            # Global styles, themes, variables
├── lib/               # Shared utility functions
├── hooks/             # Custom React hooks
├── context/           # React context definitions
├── services/          # External service integrations
├── types/             # TypeScript type definitions
├── constants/         # Application constants
└── config/            # Configuration files
```

## TypeScript Configuration

### Strict Type Checking

Enable strict mode in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

### Path Aliases

Configure path aliases for cleaner imports:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["components/*"],
      "@lib/*": ["lib/*"],
      "@hooks/*": ["hooks/*"],
      "@types/*": ["types/*"],
      "@styles/*": ["styles/*"],
      "@services/*": ["services/*"],
      "@context/*": ["context/*"],
      "@constants/*": ["constants/*"],
      "@config/*": ["config/*"]
    }
  }
}
```

## Type Definitions

### Shared Types

Put shared types in a dedicated `types` directory:

```typescript
// types/index.ts - Export all types from here
export * from './user';
export * from './post';
export * from './common';

// types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

// types/post.ts
export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  publishedAt?: Date;
  tags: string[];
}
```

### Component Props

Use explicit types for component props:

```typescript
// Good practice
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isFullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({ 
  variant, 
  size = 'md', 
  isFullWidth = false, 
  disabled = false, 
  onClick, 
  children 
}: ButtonProps) {
  // Component implementation
}

// Avoid this
export function Button(props: any) {
  // Unsafe implementation
}
```

### API Response Types

Define types for API responses:

```typescript
// types/api.ts
export interface ApiResponse<T> {
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
  error?: {
    code: string;
    message: string;
  };
}

// Using the type
import { ApiResponse, User } from '@types';

async function fetchUsers(): Promise<ApiResponse<User[]>> {
  const response = await fetch('/api/users');
  return response.json();
}
```

## Next.js API Routes

### Type-Safe API Handlers

```typescript
// pages/api/users/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@types';

type ErrorResponse = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | ErrorResponse>
) {
  const { id } = req.query;
  
  try {
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    
    const user = await fetchUserById(id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}
```

### Request Validation

Use Zod for runtime validation:

```typescript
// pages/api/posts/create.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { Post } from '@types';

const PostSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10),
  tags: z.array(z.string()),
});

type CreatePostRequest = z.infer<typeof PostSchema>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const result = PostSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ errors: result.error.format() });
    }
    
    const postData = result.data;
    
    // Create post with validated data
    const newPost = await createPost(postData);
    
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
}
```

## State Management

### Type-Safe Context

```typescript
// context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Implementation details...
  
  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
```

### React Query with TypeScript

```typescript
// hooks/usePosts.ts
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Post } from '@types';

const QUERY_KEY = 'posts';

export function usePosts() {
  return useQuery<Post[]>(QUERY_KEY, async () => {
    const response = await fetch('/api/posts');
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    return response.json();
  });
}

interface CreatePostVariables {
  title: string;
  content: string;
  tags: string[];
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  
  return useMutation<Post, Error, CreatePostVariables>(
    async (newPost) => {
      const response = await fetch('/api/posts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create post');
      }
      
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY);
      },
    }
  );
}
```

## Performance Optimization

### Component Optimization

```typescript
// components/MemoizedComponent.tsx
import { memo } from 'react';

interface ComplexComponentProps {
  data: Record<string, any>;
  onProcessData: (processed: any) => void;
}

function ComplexComponent({ data, onProcessData }: ComplexComponentProps) {
  // Component implementation
  return <div>/* Complex UI */</div>;
}

// Only re-render when props actually change
export const MemoizedComplexComponent = memo(ComplexComponent);
```

### Custom Hooks with Memoization

```typescript
// hooks/useFilteredItems.ts
import { useMemo } from 'react';

export function useFilteredItems<T>(
  items: T[],
  filterFn: (item: T) => boolean
) {
  // Memoize the filtered result to avoid recalculation on every render
  return useMemo(() => items.filter(filterFn), [items, filterFn]);
}
```

### Next.js Image Optimization

```tsx
// components/ProfileImage.tsx
import Image from 'next/image';

interface ProfileImageProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: { width: 40, height: 40 },
  md: { width: 80, height: 80 },
  lg: { width: 120, height: 120 },
};

export function ProfileImage({ src, alt, size = 'md' }: ProfileImageProps) {
  const { width, height } = sizes[size];
  
  return (
    <div className="rounded-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover"
        priority={size === 'lg'} // Prioritize loading for large images
      />
    </div>
  );
}
```

## Data Fetching

### Type-Safe getServerSideProps

```typescript
// pages/users/[id].tsx
import { GetServerSideProps } from 'next';
import { User } from '@types';

interface UserPageProps {
  user: User;
}

export default function UserPage({ user }: UserPageProps) {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<UserPageProps> = async (context) => {
  const { id } = context.params as { id: string };
  
  try {
    const response = await fetch(`${process.env.API_URL}/users/${id}`);
    
    if (!response.ok) {
      return {
        notFound: true,
      };
    }
    
    const user: User = await response.json();
    
    return {
      props: { user },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
```

### Type-Safe getStaticProps and getStaticPaths

```typescript
// pages/blog/[slug].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import { Post } from '@types';

interface BlogPostPageProps {
  post: Post;
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchAllPosts();
  
  const paths = posts.map((post) => ({
    params: { slug: post.id },
  }));
  
  return {
    paths,
    fallback: 'blocking', // Show fallback page until data loads
  };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps, { slug: string }> = async (context) => {
  const { slug } = context.params as { slug: string };
  
  try {
    const post = await fetchPostBySlug(slug);
    
    if (!post) {
      return {
        notFound: true,
      };
    }
    
    return {
      props: { post },
      revalidate: 60 * 60, // Revalidate every hour
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
```

## Error Handling

### Custom Error Component

```typescript
// components/ErrorFallback.tsx
interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div role="alert" className="p-4 border border-red-500 rounded-md bg-red-50">
      <h2 className="text-lg font-semibold text-red-800">Something went wrong</h2>
      <p className="text-red-700">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
      >
        Try again
      </button>
    </div>
  );
}
```

### Error Boundary Usage

```tsx
// pages/_app.tsx
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '@components/ErrorFallback';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
```

## Accessibility

### Typed Aria Attributes

```tsx
// components/Tabs.tsx
import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTabId?: string;
}

export function Tabs({ tabs, defaultTabId }: TabsProps) {
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0].id);
  
  return (
    <div>
      <div role="tablist" aria-orientation="horizontal">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTabId === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTabId === tab.id ? 0 : -1}
            onClick={() => setActiveTabId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTabId !== tab.id}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
```

## Testing

### TypeScript + Jest

```typescript
// components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button variant="primary">Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button variant="primary" onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('applies the correct class for the variant', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByText('Primary')).toHaveClass('bg-blue-600');
    
    rerender(<Button variant="danger">Danger</Button>);
    expect(screen.getByText('Danger')).toHaveClass('bg-red-600');
  });
  
  it('is disabled when the disabled prop is true', () => {
    render(<Button variant="primary" disabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });
});
```

## Conclusion

Following these TypeScript and Next.js best practices will help you build robust, maintainable, and type-safe applications. The combination of strong typing, well-organized code structure, and performance optimizations provides a solid foundation for modern web development.

Remember that TypeScript is a tool to help you write better code, but it's not a replacement for good architecture and testing practices. Use these patterns as guidelines, but adapt them to the specific needs of your project. 