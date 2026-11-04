# Artix Global website

Motion-rich rebuild of artixglobal.com with Nuxt 4. It is a static site in `docs/` on GitHub Pages (custom domain from `public/CNAME`).

## Stack
- Nuxt 4 (`app/` directory, file routes in `app/pages/`), SSR prerender with `nitro.preset: 'static'`.
- Tailwind CSS v4 through `@tailwindcss/vite`. Tokens are in `app/assets/css/main.css` under `@theme`.
- GSAP 3.15 (ScrollTrigger, SplitText) and Lenis, set up in `app/plugins/motion.client.ts`. Directives: `v-magnetic`, `v-tilt`, `v-spot`.
- Three.js for the hero Saturn (`HeroSaturn.vue`: Saturn color map `public/img/saturn-{1k,2k}.webp` and ring map `saturn-ring.webp` (Solar System Scope, CC BY 4.0; credit required), ring shadow on the planet, planet shadow on the ring, solid textured ring from the first frame (no particles, no ring reveal) that spins fast (`RING_SPIN`: azimuthal clumps in the ring shader move faster near the planet) with tumbling rocky debris (`InstancedMesh` of jittered icosahedrons in the B and A rings, fewer on mobile), two dashed neon HUD orbit lines. The textures are the only non-neon hues; keep them partly desaturated), the Platform card field (`PlatformField.vue`: neon point wave) and the fixed page background (`ScrollScene.vue`). Raw WebGL shader for the CTA (`GoldField.vue`).
- Logo: animated `public/logo.svg` (from artixcapital) through `BrandLogo`. `BrandLogo mark` is the inline X used by the preloader.
- `@nuxt/fonts`: Instrument Serif (display), Bodoni Moda 900 (`--font-brand`, only the hero "ARTIX GLOBAL" wordmark above the headline: black weight, uppercase, wide tracking, solid `fg` color at 60% opacity in CSS; on intro SplitText chars fly in one by one along z from far behind, first letter first), Geist (body), Geist Mono (labels).
- Icons: `@phosphor-icons/vue` only.

## Conventions
- Shared copy, links, accounts, FAQ and documents live in `app/utils/site.ts`. Page-only copy lives in `app/utils/pages/*.ts` (import explicitly, nested utils are not auto-imported). Text comes from the live artixglobal.com site.
- Subpages use the live slugs at the top level (`/forex-trading/`, blog posts at `/<post-slug>/` through `pages/[post].vue`). Every route is listed in `PAGES` in `nuxt.config.ts` for prerender; add new page slugs there (post slugs come from `POSTS` in `app/utils/pages/blog.ts`). `server/routes/sitemap.xml.ts` builds `sitemap.xml` from `PAGES` (posts get `lastmod` from `modified`). Internal links are relative with a trailing slash (`p()` in `site.ts`).
- SEO: every page calls `usePageSeo({ slug, title, desc })` (`app/composables/usePageSeo.ts`). It sets title, description, Open Graph, Twitter tags, the canonical `https://artixglobal.com/<slug>/` and a `BreadcrumbList`. Keep titles at 60 characters or less and descriptions at 160 or less. The default share image is `OG_IMG` in `site.ts`. Add JSON-LD only through `ldJson()`. `app.vue` adds the global Organization and WebSite graph (`ORG` in `site.ts`). `app/error.vue` is the noindex error page.
- Every subpage starts with `PageHero` (the only `<h1>` on the page).
- Every GSAP animation goes through `useMotion(root, fn)` (`gsap.matchMedia`, reverts on unmount). Scope selectors with `gsap.utils.selector(el)`. Keep the always-true `all` condition in `useMotion`: without it, touch phones match no condition and no animation runs.
- Reduced motion: the `reduce` branch returns early so content stays visible with no movement.
- Animate only `transform` and `opacity`. Do not put a CSS `transition` on `transform` for elements that GSAP moves; use the `scale` property for CSS hover scale.
- WebGL canvases pause when off screen (`useInView`) or when the tab is hidden, cap DPR, and use fewer points on mobile.
- Layout: section headers are always centered, with vertical accent rules. Content can use left and right (Steps zigzag around the center rail, Platform image beside the download card, FAQ rows). Use `SideLabel` (90° rotated text) for section labels.
- Each section sets `data-scene="0-4"` (0 dust, 1 wave, 2 torus, 3 helix, 4 sphere). `ScrollScene` morphs its particles to that shape when the section is active. `data-spin` adds spin from the section progress.
- Theme is the logo red and green, as neon variants. Green is the primary accent: the Tailwind tokens keep the name `gold` (`--color-gold`, `gold-2`, `gold-deep`, `on-gold`) but hold green values. Red is the secondary accent (`--color-red`, `--color-red-2`): heading `<em>` highlights, side-label numbers and tape marks. For tints, use `color-mix(in oklab, var(--color-gold) N%, transparent)`, never hard-coded rgb.
- 3D and WebGL effects (background, Saturn orbit lines, Platform field, CTA shader) use only `NEON` (`#3dff7a`) and `NEON_RED` (`#ff2e4d`) from `site.ts`, plus neutral dust tones. Never add other hues and never wrap objects in a flat colored glow. Import the colors explicitly (`import { NEON, NEON_RED } from '~/utils/site'`).
- Platform downloads (`HomePlatform`, data `NTRADER` in `site.ts`): nTrader only (no MetaTrader 5), no glass UI. The card shows `PlatformField` behind a solid ink shade. Brand icons are in `app/components/icons/`.
- Scroll direction changes: `HomeMarkets` pins and scrolls sideways on all screen sizes (sideways swipe and sideways trackpad scroll move the page), `HomeTapes` moves two crossed bands sideways, `HomeAccounts` stacks sticky cards.
- Prices in `useFeed` are simulated. Always label them "Indicative".
- Brand: ink `#0a0b0d`, green accent `#4fd16a` (text on accent `#0a0b0d`), up `#47b549` and down `#ec4048` from the logo. Cards `rounded-[1.25rem]`, buttons pill.
- Never add a GitHub Actions deploy workflow.

## Commands
- `make run`: dev server
- `make build`: `nuxt generate`, output copied to `docs/` with `.nojekyll`
- `make deploy`: build, commit on `main`, push
