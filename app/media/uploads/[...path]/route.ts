import fs from 'node:fs/promises'
import path from 'node:path'

// Serves vehicle photos uploaded from the admin space after the last build.
// /vehicles/uploads/* falls back here (see next.config.mjs) when the file is not a build-time public asset.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const uploadsDir = path.join(process.cwd(), 'public', 'vehicles', 'uploads')
const types: Record<string, string> = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif' }

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const segments = (await params).path
  const file = path.resolve(uploadsDir, ...segments)
  const type = types[path.extname(file).toLowerCase()]
  if (!type || !file.startsWith(uploadsDir + path.sep)) return new Response('Not found', { status: 404 })
  try {
    const data = await fs.readFile(file)
    return new Response(data, { headers: { 'Content-Type': type, 'Cache-Control': 'public, max-age=31536000, immutable', 'X-Content-Type-Options': 'nosniff' } })
  } catch {
    return new Response('Not found', { status: 404 })
  }
}
