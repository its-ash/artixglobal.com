# Artix Global website

Motion-rich rebuild of artixglobal.com with Nuxt 4. It is a static site in `docs/` on GitHub Pages (custom domain from `public/CNAME`).

## Stack
- Nuxt 4 (`app/` directory, file routes in `app/pages/`), SSR prerender with `nitro.preset: 'static'`.
- Tailwind CSS v4 through `@tailwindcss/vite`. Tokens are in `app/assets/css/main.css` under `@theme`.
- GSAP 3.15 (ScrollTrigger, SplitText) and Lenis, set up in `app/plugins/motion.client.ts`. Directives: `v-magnetic`, `v-tilt`, `v-spot`.
- Three.js for the hero Saturn (`HeroSaturn.vue`: shader-banded planet, ring with dust particles, two dashed neon HUD orbit lines), the Platform card field (`PlatformField.vue`: neon point wave) and the fixed page background (`ScrollScene.vue`). Raw WebGL shader for the CTA (`GoldField.vue`).
- Logo: animated `public/logo.svg` (from artixcapital) through `BrandLogo`. `BrandLogo mark` is the inline X used by the preloader.
- `@nuxt/fonts`: Instrument Serif (display), Geist (body), Geist Mono (labels).
- Icons: `@phosphor-icons/vue` only.

## Conventions
- All copy, links, accounts, FAQ, posts and documents live in `app/utils/site.ts`. Text comes from the live artixglobal.com site.
- Subpages are not built yet. Nav links point to the live site (`ORIGIN`). When you add a page, add the route to `nitro.prerender.routes` and change its link to a relative path.
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
