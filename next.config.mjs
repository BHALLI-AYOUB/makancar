/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
  },
  // Photos saved from /admin after the last build are served by app/media/uploads.
  async rewrites() {
    return { fallback: [{ source: '/vehicles/uploads/:path*', destination: '/media/uploads/:path*' }] }
  },
  // These routes read files from disk at request time; ship them with the server bundle.
  outputFileTracingIncludes: {
    '/admin/[[...path]]': ['./editor/**/*', './shared/**/*', './content/catalogue.json', './docs/EDITOR.md'],
    '/**/*': ['./content/catalogue.json'],
  },
}

export default nextConfig
