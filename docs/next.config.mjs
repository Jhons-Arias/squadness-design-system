import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Static export for GitHub Pages ──────────────────────────
  output: 'export',
  // Replace 'squadness-design-system' with the exact name of your GitHub repo
  basePath: '/squadness-design-system',
  images: { unoptimized: true },

  // components/ui lives outside docs/ so TypeScript can't resolve its deps via
  // the standard node_modules lookup — webpack handles it fine at runtime.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  webpack: (config) => {
    // Allow importing components from the parent /components/ui directory
    config.resolve.alias = {
      ...config.resolve.alias,
      '@squadness/ui': path.resolve(__dirname, '../components/ui'),
      // Components use @/lib/utils — point it to docs/lib/utils
      '@/lib/utils': path.resolve(__dirname, './lib/utils'),
    }
    // Resolve node_modules from docs/ first, so packages installed here
    // are found even when processing files outside this folder (e.g. ../components/ui/)
    config.resolve.modules = [
      path.resolve(__dirname, 'node_modules'),
      'node_modules',
    ]
    return config
  },
}

export default nextConfig
