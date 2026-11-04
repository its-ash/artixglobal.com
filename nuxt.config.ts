import tailwindcss from '@tailwindcss/vite'
import { SITE_DESC, SITE_NAME, SITE_TITLE } from './app/utils/site'
import { POSTS } from './app/utils/pages/blog'

const PAGES = [
  'accounts', 'ntrader-windows', 'ntrader-mobile',
  'precious-metals', 'forex-trading', 'commodities-trading', 'stocks-trading', 'indices-trading', 'crypto-trading',
  'economic-calender', 'blog', 'introducing-broker', 'white-label-solution',
  'about-us', 'careers', 'legal-docs', 'support', 'contact',
  ...POSTS.map(p => p.slug)
]

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  modules: ['@nuxt/fonts'],
  css: ['lenis/dist/lenis.css', '~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: { include: ['@phosphor-icons/vue', 'three', 'gsap', 'gsap/ScrollTrigger', 'gsap/SplitText', 'lenis'] }
  },
  fonts: {
    families: [
      { name: 'Instrument Serif', provider: 'google', weights: [400], styles: ['normal', 'italic'] },
      { name: 'Bodoni Moda', provider: 'google', weights: [900] },
      { name: 'Geist', provider: 'google', weights: [400, 500, 600] },
      { name: 'Geist Mono', provider: 'google', weights: [400, 500] }
    ]
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      title: SITE_TITLE,
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: SITE_DESC },
        { name: 'theme-color', content: '#0a0b0d' },
        { name: 'color-scheme', content: 'dark' },
        { name: 'robots', content: 'index, follow, max-image-preview:large' },
        { property: 'og:site_name', content: SITE_NAME },
        { property: 'og:locale', content: 'en_US' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ]
    }
  },
  ssr: true,
  runtimeConfig: { pages: PAGES },
  nitro: {
    preset: 'static',
    prerender: { routes: ['/', ...PAGES.map(s => `/${s}/`), '/sitemap.xml'], crawlLinks: false, failOnError: true },
    hooks: {
      'prerender:generate'(r) {
        if (['/404.html', '/200.html'].includes(r.route) && typeof r.contents === 'string')
          r.contents = r.contents.replace(/<meta name="robots" content="[^"]*">/, '<meta name="robots" content="noindex, follow">')
      }
    }
  }
})
