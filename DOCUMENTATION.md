# Tailblaze Documentation

Welcome to Tailblaze! This document provides information about the directory structure, image handling, and theme customization.

## Directory Structure

```
tailblaze/
├── components/       # React components
│   ├── ui/           # shadcn/ui components
│   ├── ...           # Other components
├── css/              # Global CSS styles
├── data/             # Content and configuration
│   ├── authors/      # Author information
│   ├── blog/         # Blog posts in Markdown/MDX
│   │   └── templates/# Blog post templates
│   ├── notes/        # Short notes in Markdown/MDX
│   ├── headerNavLinks.ts # Navigation configuration
│   ├── projectsData.ts   # Project information
│   └── siteMetadata.ts   # Site configuration
├── layouts/          # Page layouts
├── lib/              # Utilities and helpers
├── pages/            # Next.js pages
│   ├── api/          # API routes
│   ├── blog/         # Blog page and post pages
│   ├── notes/        # Notes page and note pages
│   ├── ...           # Other pages
├── public/           # Static assets
│   ├── static/       # Images and other static files
│   │   ├── images/   # Image directory
│   │       ├── blog/ # Blog post images
│   │       ├── projects/ # Project images
│   │       └── ...   # Other image categories
├── scripts/          # Build scripts
├── types/            # TypeScript type definitions
```

## Content Management

### Blog Posts

Add new blog posts as Markdown or MDX files in the `data/blog` directory:

```md
---
title: Your Post Title
date: YYYY-MM-DD 00:00:00 Z
categories: ['Category']
tags:
  - Tag1
  - Tag2
image: /static/images/your-image.jpg
math: false # Set to true if you use math equations
draft: false # Set to true to hide from production
summary: Brief description of your post
---

# Your content here
```

Use the templates in `data/blog/templates/` as starting points for common post types.

### Notes

Add short-form content as notes in the `data/notes` directory:

```md
---
title: Note Title
date: YYYY-MM-DD
tags:
  - Tag1
  - Tag2
draft: false
summary: Brief description
---

# Your note content
```

### Projects

Add projects by editing `data/projectsData.ts`:

```typescript
{
  title: 'Project Title',
  description: `Project description`,
  imgSrc: '/static/images/projects/project-image.jpg',
  href: 'https://project-url.com',
  github: 'https://github.com/username/project',
  tech: ['Tech1', 'Tech2', 'Tech3'],
}
```

## Image Handling

### Image Directory Structure

Organize your images in the `/public/static/images/` directory:

- `/static/images/blog/`: Images for blog posts
- `/static/images/projects/`: Images for projects
- `/static/images/authors/`: Author avatars

### Using Images in Content

Tailblaze uses `next-image-export-optimizer` for optimized images. In your MDX content, import and use the `ExportedImage` component:

```jsx
import ExportedImage from 'next-image-export-optimizer'

;<ExportedImage
  src="/static/images/your-image.jpg"
  alt="Description"
  width={800}
  height={500}
  className="rounded-lg"
/>
```

In regular Markdown, use standard image syntax:

```md
![Image description](/static/images/your-image.jpg)
```

### Image Optimization Tips

1. **Size**: Resize images to their display size before uploading
2. **Format**: Use JPEG for photos, PNG for transparency, WebP for better compression
3. **Compression**: Compress images using tools like TinyPNG or ImageOptim
4. **Dimensions**: Include width and height attributes to prevent layout shifts

## Theme Customization

### Site Metadata

Edit `data/siteMetadata.ts` to customize your site's metadata:

```typescript
const siteMetadata = {
  title: 'Your Site Title',
  author: 'Your Name',
  headerTitle: 'Your Header Title',
  description: 'Your site description',
  // ...other settings
}
```

### Navigation

Edit `data/headerNavLinks.ts` to customize the navigation menu:

```typescript
const headerNavLinks = [
  { href: '/custom-page', title: 'Custom Page' },
  // ...other links
]
```

### Colors and Typography

Customize the theme by editing `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Your custom color palette
          100: '#E6F7FF',
          500: '#1890FF',
          900: '#003A8C',
        },
        // ...other colors
      },
      typography: {
        // Custom typography settings
      },
    },
  },
}
```

### Custom Components

Create custom components in the `components` directory and use them in your MDX files:

```jsx
// components/CustomComponent.tsx
export default function CustomComponent({ children }) {
  return <div className="custom-style">{children}</div>
}
```

Then in your MDX file:

```mdx
import CustomComponent from '../components/CustomComponent'

<CustomComponent>Custom content here</CustomComponent>
```

## Advanced Customization

### Custom Layouts

Create custom layouts in the `layouts` directory:

```jsx
// layouts/CustomLayout.tsx
export default function CustomLayout({ children }) {
  return (
    <div className="custom-layout">
      <header>Custom Header</header>
      <main>{children}</main>
      <footer>Custom Footer</footer>
    </div>
  )
}
```

Then specify this layout in your MDX frontmatter:

```md
---
title: Using Custom Layout
layout: CustomLayout
---
```

### Extending Types

Extend existing types in the `types` directory to add custom fields:

```typescript
// types/index.ts
export interface CustomType extends BaseType {
  customField: string
  // ...other custom fields
}
```

## Credits

Tailblaze theme originally created by [Viet-Anh Nguyen](https://www.vietanh.dev).

## Support

If you need help with Tailblaze, please open an issue on [GitHub](https://github.com/yourusername/tailblaze).
