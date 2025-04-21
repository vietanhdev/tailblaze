---
title: Tailblaze Setup and Efficient Workflows
date: 2024-04-20
categories: ['Notes']
tags:
  - Tailblaze
  - Next.js
  - Workflow
  - Performance
  - Setup
draft: false
summary: A practical guide to setting up Tailblaze and optimizing your content creation workflow. Learn recommended practices for organization, image optimization, and deployment.
---

# Tailblaze Setup and Efficient Workflows

Tailblaze offers a powerful foundation for creating high-performance blogs and personal websites. This note covers essential setup steps and workflow optimizations to help you get the most out of the platform.

## Initial Setup

### Cloning and Installation

```bash
# Clone the repository
git clone https://github.com/vietanhdev/tailblaze.git my-blog

# Navigate to the project directory
cd my-blog

# Install dependencies with pnpm
pnpm install

# Start the development server
pnpm dev
```

### Customizing Site Metadata

The first file you should edit is `data/siteMetadata.ts`:

```typescript
const siteMetadata = {
  title: 'Your Site Title',
  author: 'Your Name',
  headerTitle: 'Your Site Title',
  description: 'Your site description...',
  language: 'en-us',
  theme: 'system', // system, dark, or light
  siteUrl: 'https://yoursite.com',
  siteRepo: 'https://github.com/yourusername/your-repo',
  siteLogo: '/static/images/logo.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'you@example.com',
  github: 'https://github.com/yourusername',
  twitter: 'https://twitter.com/yourusername',
  facebook: 'https://facebook.com/yourusername',
  youtube: 'https://youtube.com/yourusername',
  linkedin: 'https://www.linkedin.com/in/yourusername',
  locale: 'en-US',
  // ... other settings
}
```

### Configuring Navigation

Edit header navigation in `data/headerNavLinks.ts`:

```typescript
const headerNavLinks = [
  { href: '/', title: 'Home' },
  { href: '/blog', title: 'Blog' },
  { href: '/notes', title: 'Notes' },
  { href: '/projects', title: 'Projects' },
  { href: '/about', title: 'About' },
]

export default headerNavLinks
```

## Content Workflow

### Content Organization

Tailblaze uses a simple file-based content structure:

- `/data/blog/` - Full blog posts (longer form content)
- `/data/notes/` - Shorter notes and quick references
- `/public/static/images/` - Images used in your content

### Creating New Content

#### Blog Post Template

```markdown
---
title: Your Post Title
date: YYYY-MM-DD HH:MM:SS Z
categories: ['Category1', 'Category2']
tags:
  - Tag1
  - Tag2
  - Tag3
image: /static/images/your-feature-image.jpg
math: false
draft: false
summary: A brief summary of your post that appears in previews and metadata.
---

# Your Post Title

Introduction paragraph here...

## First Section

Content for the first section...

## Second Section

More content here...
```

#### Note Template

```markdown
---
title: Quick Note Title
date: YYYY-MM-DD
categories: ['Notes']
tags:
  - Tag1
  - Tag2
draft: false
summary: Brief description of what this note contains.
---

# Quick Note Title

Content here...
```

### Image Workflow

For optimal performance, follow these image practices:

1. **Image Size**: Keep source images reasonably sized (1200-2000px wide)
2. **Image Format**: Prefer WebP for best compression/quality ratio
3. **Storage Location**: Save images in `/public/static/images/`
4. **Optimization**: Tailblaze automatically optimizes images

Example image workflow:

1. Find or create your image
2. Resize to appropriate dimensions (e.g., 1200px width)
3. Save as WebP if possible
4. Place in `/public/static/images/`
5. Reference in markdown: `![Alt text](/static/images/your-image.webp)`

### Free Image Resources

Here are some excellent sources for free images:

- [Unsplash](https://unsplash.com) - High-quality photos
- [Pexels](https://pexels.com) - Free stock photos
- [Pixabay](https://pixabay.com) - Images, vectors, and videos
- [Undraw](https://undraw.co) - Open-source illustrations

## Development Workflow

### Common Commands

```bash
# Start development server
pnpm dev

# Generate optimized images
pnpm run build-images

# Build for production
pnpm build

# Start production build locally
pnpm start
```

### Image Optimization

Before building for production, always run:

```bash
pnpm run build-images
```

This command processes all images to create optimized versions and responsive sizes.

### Type Checking

Run TypeScript checks with:

```bash
pnpm type-check
```

### Linting

Check code quality with:

```bash
pnpm lint
```

## Customization Workflow

### Theme Customization

Tailblaze uses Tailwind CSS for styling. The main customization file is `tailwind.config.js`:

```javascript
// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        gray: colors.neutral,
        // Add your custom colors here
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        // Add custom fonts here
      },
      // Add other customizations (spacing, typography, etc.)
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    // Add other plugins here
  ],
}
```

### Component Customization

The most common components to customize:

1. **Layouts**: `/layouts/` directory
2. **Header/Footer**: `/components/Header.tsx` and `/components/Footer.tsx`
3. **Blog/Note previews**: `/components/BlogPreview.tsx`

### Adding New Page Types

To add a new page type:

1. Create a new file in `/pages/` (e.g., `/pages/tutorials.tsx`)
2. Create a layout in `/layouts/` if needed
3. Update navigation in `data/headerNavLinks.ts`

## Deployment Workflow

### Building for Production

```bash
# Optimize images
pnpm run build-images

# Build static site
pnpm build
```

This generates a static site in the `out` directory.

### Deploying to Vercel (Recommended)

1. Push your repository to GitHub/GitLab
2. Connect Vercel to your repository
3. Configure build settings:
   - Build Command: `pnpm run build-images && pnpm build`
   - Output Directory: `out`

### Deploying to Cloudflare Pages

1. Push your repository to GitHub/GitLab
2. Connect Cloudflare Pages to your repository
3. Configure build settings:
   - Build Command: `pnpm run build-images && pnpm build`
   - Build Output Directory: `out`
   - Environment Variables:
     - `NODE_VERSION`: `18` (or higher)
     - `NPM_FLAGS`: `--version`
     - `PNPM_VERSION`: `8.6.0` (or your version)

### Deploying to Netlify

Create a `netlify.toml` file:

```toml
[build]
  command = "pnpm run build-images && pnpm build"
  publish = "out"

[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--version"
```

## Performance Optimization

### Analyzing Performance

Use these tools to measure your site's performance:

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) (in Chrome DevTools)
- [WebPageTest](https://webpagetest.org/)

### Common Optimizations

1. **Optimize Images**: Always use the built-in image optimization
2. **Limit Third-Party Scripts**: Each external script impacts performance
3. **Use Static Generation**: Tailblaze is optimized for static generation
4. **Lazy Load Content**: Consider lazy loading below-the-fold content
5. **CSS Optimization**: Tailwind automatically purges unused CSS

## Content Maintenance

### Updating Content

To update existing content:

1. Edit the Markdown file in `data/blog/` or `data/notes/`
2. Preview changes with `pnpm dev`
3. Rebuild and deploy when ready

### Managing Drafts

Set `draft: true` in the frontmatter to exclude content from production builds:

```markdown
---
title: Work in Progress
date: 2024-04-20
draft: true
---
```

## Troubleshooting Common Issues

### Build Errors

If you encounter build errors:

1. Check console for specific error messages
2. Verify all dependencies are installed (`pnpm install`)
3. Check for syntax errors in Markdown/MDX files
4. Ensure image paths are correct

### Image Issues

If images aren't displaying correctly:

1. Verify the path is correct (`/static/images/your-image.jpg`)
2. Run `pnpm run build-images` to regenerate optimized images
3. Check that the image file exists in the correct location
4. Ensure image dimensions are reasonable (not too large)

## Conclusion

Tailblaze provides a powerful, flexible platform for creating high-performance static websites. By establishing efficient workflows for content creation, customization, and deployment, you can focus on what matters most—creating valuable content for your audience.

Remember to regularly update your dependencies and keep your site secure. Happy blogging! 