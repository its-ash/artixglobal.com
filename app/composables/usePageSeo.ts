import { OG_IMG, ORIGIN, type OgImg } from '~/utils/site'

export interface Crumb { name: string, slug: string }
export interface PageSeo { slug?: string, title: string, desc: string, crumb?: string, parent?: Crumb, img?: OgImg, type?: 'website' | 'article' }

export const ldJson = (o: object) => ({ type: 'application/ld+json' as const, innerHTML: JSON.stringify(o).replace(/</g, '\\u003c') })

export const absUrl = (s: string) => `${ORIGIN}${s ? `/${s}/` : '/'}`

export const usePageSeo = ({ slug = '', title, desc, crumb, parent, img = OG_IMG, type = 'website' }: PageSeo) => {
  const url = absUrl(slug)
  const src = `${ORIGIN}${img.src}`
  const trail = [{ name: 'Home', slug: '' }, ...(parent ? [parent] : []), ...(slug ? [{ name: crumb ?? title.split(' | ')[0] ?? title, slug }] : [])]
  useSeoMeta({
    title,
    description: desc,
    ogTitle: title,
    ogDescription: desc,
    ogUrl: url,
    ogType: type,
    ogImage: src,
    ogImageWidth: img.w,
    ogImageHeight: img.h,
    ogImageAlt: img.alt,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: desc,
    twitterImage: src,
    twitterImageAlt: img.alt
  })
  useHead({
    link: [{ rel: 'canonical', href: url }],
    script: slug
      ? [ldJson({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: trail.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: absUrl(c.slug) }))
        })]
      : []
  })
  return url
}
