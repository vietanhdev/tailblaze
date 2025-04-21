const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// Configuration for the next export
module.exports = withBundleAnalyzer({
  swcMinify: false,
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  eslint: {
    dirs: ['pages', 'components', 'lib', 'layouts', 'scripts'],
  },
  images: {
    loader: 'custom',
    imageSizes: [96, 128, 256, 384],
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048],
  },
  transpilePackages: ['next-image-export-optimizer', '@wllama/wllama'],
  env: {
    nextImageExportOptimizer_imageFolderPath: 'public',
    nextImageExportOptimizer_exportFolderPath: 'out',
    nextImageExportOptimizer_quality: '75',
    nextImageExportOptimizer_storePicturesInWEBP: 'true',
    nextImageExportOptimizer_exportFolderName: 'optimized-images',

    // If you do not want to use blurry placeholder images, then you can set
    // nextImageExportOptimizer_generateAndUseBlurImages to false and pass
    // `placeholder="empty"` to all <ExportedImage> components.
    nextImageExportOptimizer_generateAndUseBlurImages: 'true',
  },
  webpack: (config) => {
    // Handle @wllama TypeScript files - this needs to be at the top to properly catch the TypeScript files
    config.module.rules.unshift({
      test: /\.tsx?$/,
      include: /node_modules\/@wllama/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel'],
            plugins: [
              [
                '@babel/plugin-transform-typescript',
                {
                  allowDeclareFields: true,
                  allowNamespaces: true,
                },
              ],
            ],
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    // Support for WebAssembly and worker files
    config.resolve.extensions.push('.web.js', '.js', '.mjs', '.wasm', '.ts', '.tsx')
    config.experiments = { ...config.experiments, asyncWebAssembly: true }

    // Handle TypeScript files
    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel'],
            plugins: [
              [
                '@babel/plugin-transform-typescript',
                {
                  allowDeclareFields: true,
                  allowNamespaces: true,
                },
              ],
            ],
          },
        },
      ],
      exclude: /node_modules\/(?!(@wllama))/,
    })

    // Handle worker imports for wllama
    config.module.rules.push({
      test: /\.worker\.(js|ts)$/,
      use: { loader: 'worker-loader' },
    })

    return config
  },
  trailingSlash: false,
  compiler: {
    removeConsole: true,
  },
  output: 'export',
})
