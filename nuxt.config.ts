import tailwindcss from '@tailwindcss/vite'

const DESC = 'Trade forex, precious metals, commodities, stocks, indices and crypto on nTrader. Raw spreads from 0.0 pips, leverage up to 1:200, start from $50.'
const URL = 'https://artixglobal.com'

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
      { name: 'Geist', provider: 'google', weights: [400, 500, 600] },
      { name: 'Geist Mono', provider: 'google', weights: [400, 500] }
    ]
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Artix Global | Trade Global Markets on nTrader',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: DESC },
        { name: 'theme-color', content: '#0a0b0d' },
        { name: 'color-scheme', content: 'dark' },
        { name: 'robots', content: 'index, follow, max-image-preview:large' },
        { property: 'og:site_name', content: 'Artix Global' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: URL },
        { property: 'og:title', content: 'Artix Global | Trade Global Markets on nTrader' },
        { property: 'og:description', content: DESC },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'canonical', href: `${URL}/` },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ]
    }
  },
  ssr: true,
  nitro: {
    preset: 'static',
    prerender: { routes: ['/'], crawlLinks: false, failOnError: true }
  }
})
