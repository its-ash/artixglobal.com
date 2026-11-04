import { ORIGIN } from '../../app/utils/site'
import { POSTS } from '../../app/utils/pages/blog'

const esc = (s: string) => s.replace(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`)

export default defineEventHandler(e => {
  const pages = useRuntimeConfig(e).pages as string[]
  const mod = new Map(POSTS.map(p => [p.slug, p.modified]))
  const last = POSTS.map(p => p.modified).sort().at(-1)
  if (last) mod.set('blog', last)
  const urls = ['', ...pages].map(s => {
    const lm = mod.get(s)
    return `  <url><loc>${esc(`${ORIGIN}${s ? `/${s}/` : '/'}`)}</loc>${lm ? `<lastmod>${esc(lm)}</lastmod>` : ''}</url>`
  })
  setHeader(e, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
})
