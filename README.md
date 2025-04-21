# Tailblaze - Tailwind NextJS Blog Starter Theme

A modern, feature-rich blog theme built with Next.js and Tailwind CSS.

![Tailblaze](https://placeholder-image-for-tailblaze.com/banner.jpg)

## Features

- **⚡️ Fast Performance**: Leveraging Next.js static site generation for blazing fast page loads
- **🎨 Beautiful Design**: Sleek, modern interface crafted with Tailwind CSS
- **📱 Fully Responsive**: Looks great on all devices, from mobile to desktop
- **✍️ MDX Support**: Write content with Markdown and embed React components
- **📊 SEO Optimized**: Built-in SEO components and metadata configuration
- **📂 Content Organization**: Organized file structure for blog posts and notes
- **🔍 Search**: Built-in search functionality for content discovery
- **📱 PWA Support**: Progressive Web App support for installation on devices
- **📈 Analytics Ready**: Easy integration with popular analytics platforms
- **💬 Comments**: Support for multiple comment providers (Disqus, Utterances)
- **📧 Newsletter**: Newsletter subscription form with popular provider integrations
- **🔄 RSS Feed**: Automatic RSS feed generation for your content

## Quick Start

```bash
# Clone the repository
git clone https://github.com/vietanhdev/tailblaze.git my-blog

# Navigate to the directory
cd my-blog

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Visit `http://localhost:3000` to see your blog in action.

## Documentation

For detailed documentation, visit our [documentation site](https://github.com/yourusername/tailblaze/wiki).

## Deployment

### Build for Production

```bash
pnpm run build-images
pnpm build
```

The static site will be generated in the `out` directory.

### Deploy to Vercel

The easiest way to deploy your Tailblaze blog is to use the [Vercel Platform](https://vercel.com).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Ftailblaze)

### Deploy to Cloudflare Pages

You can also deploy your Tailblaze blog to Cloudflare Pages:

1. Push your repository to GitHub or GitLab
2. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. In Account Home, select **Pages** > **Create a project** > **Connect to Git**
4. Select your repository
5. Configure your build settings:
   - **Build command:** `pnpm run build-images && pnpm build`
   - **Build output directory:** `out`
   - **Node.js version:** `18` (or higher)
   - **Build system version:** `2`
6. Under **Environment variables**, add:
   - `NODE_VERSION`: `18` (or your preferred Node.js version)
   - `NPM_FLAGS`: `--version`
   - `PNPM_VERSION`: `8.6.0` (or your preferred pnpm version)
7. Click **Save and Deploy**

Your site will be deployed to a `*.pages.dev` domain. You can set up a custom domain in the Cloudflare Pages settings.

> **Note:** Tailblaze is already configured for static exports with `output: 'export'` in `next.config.js`, making it compatible with Cloudflare Pages' static site hosting.

## Customization

- **Site Metadata**: Edit `data/siteMetadata.ts` to configure your site's metadata
- **Navigation**: Modify `data/headerNavLinks.ts` to customize navigation links
- **Theme**: Adjust `tailwind.config.js` for color schemes and styling
- **Components**: Customize components in the `components` directory
- **Pages**: Modify or add pages in the `pages` directory

## Content Management

- **Blog Posts**: Add Markdown or MDX files to `data/blog`
- **Notes**: Add shorter content to `data/notes`
- **Images**: Store images in the `public/static/images` directory

## Free Image Resources

Looking for free images for your blog? Here are some excellent resources:

- [Unsplash](https://unsplash.com) - High-quality free stock photos
- [Pexels](https://pexels.com) - Free stock photos and videos
- [Pixabay](https://pixabay.com) - Free images and royalty-free stock
- [StockSnap.io](https://stocksnap.io) - Beautiful free stock photos
- [Undraw](https://undraw.co) - Open-source illustrations

## Examples

Check out these example sites built with Tailblaze:

- [Demo Site](https://tailblaze-demo.vercel.app)
- [Example Blog](https://example-blog.com)

## Blog Post Templates

Tailblaze comes with several blog post templates to help you get started:

- Basic blog post
- Tutorial with code snippets
- Photo gallery
- Video post
- Link collection
- Quote/commentary

## Performance Optimization

Tailblaze is optimized for performance out of the box:

- Code splitting for faster page loads
- Image optimization with next-image-export-optimizer
- Font optimization
- Minimal dependencies
- CSS purging with Tailwind CSS

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

- Source code: [MIT License](LICENSE)
- Content: Copyrighted by respective authors, all rights reserved. Check individual license for more details.

## Credits

- Original theme created by [timlrx](https://github.com/timlrx/tailwind-nextjs-starter-blog)
- Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)

---

Built with ❤️ by [Viet-Anh Nguyen](https://github.com/vietanhdev)
