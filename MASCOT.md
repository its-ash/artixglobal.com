# Artix Global — Mascot Specification

Canonical brand mascot specification for **Artix Global** (`artixglobal.com`), part of the **Artix Group**. Use this file as the single source of truth when generating new poses, scenes, or marketing visuals.

## Character Identity
- **Species**: Stylized 3D polar bear (Arctic / Artix motif).
- **Art Style**: Commercial 3D collectible / Pixar-grade clean vinyl-matte render. Smooth matte snow-white fur, sharp friendly-confident expression, dark expressive eyes, rounded ears, black nose, sturdy athletic proportions.
- **Group Consistency**: Shares the exact base character model, face, and cyber-jacket silhouette with **Artix Capital** and **Artix Prop**. Only the accent palette, chest `X` emblem colors, and holographic props change per firm.

## Color Palette
| Role | Hex | Usage |
| :--- | :--- | :--- |
| Canvas / Background | `#0a0b0d` | Pure matte obsidian studio stage for cutouts |
| Outfit Base | `#0a0b0d` / `#101216` | Matte obsidian jacket, carbon-hex shirt, tailored pants, dark sneakers |
| Primary Accent | `#4fd16a` / `#3dff7a` | Glowing neon-emerald cyber-jacket piping, cuff/waist metallic trim, holographic UI props, rim light |
| Secondary Accent | `#ff2e4d` | Subtle crimson-red sleeve/collar accent stripes and chart down-candles |

## Outfit & Emblem
- **Jacket**: Open obsidian-black futuristic cyber-bomber jacket with glowing **Neon Emerald Green (`#4fd16a`)** geometric seam piping, subtle **Crimson Red (`#ff2e4d`)** cuff/collar accents, and brushed emerald-metallic trim.
- **Inner Shirt**: Fitted dark matte carbon-hex sci-fi tech-shirt with subtle emerald base accents.
- **Chest Logo**: Exact **Artix `X`** mark (`public/logo.svg`) centered on the shirt chest:
  - Bold white diagonal slash (`\`, top-left to bottom-right)
  - Faceted origami downward triangle (top-right) in Crimson Red (`#ec2026` / `#d71f29`)
  - Faceted origami upward triangle (bottom-left) in Emerald Green (`#47b549` / `#30a150`)
- **Lower Body**: Fitted matte obsidian-black pants and sleek dark sneakers.

## Existing Poses (`public/img/`)
| Pose | File | Dimensions | Usage |
| :--- | :--- | :--- | :--- |
| `stand` | `mascot.webp` | `420 × 720` | `HomeCta.vue` — Confident standalone CTA stance |
| `signup` | `mascot/signup.webp` | `301 × 464` | `HomeSteps.vue` — Step 01 (Fill in the form) |
| `verify` | `mascot/verify.webp` | `356 × 470` | `HomeSteps.vue` — Step 02 (Verify your identity) |
| `trade` | `mascot/trade.webp` | `388 × 456` | `HomeSteps.vue` — Step 03 (Fund and trade) |
| `oops` | `mascot/oops.webp` | `431 × 457` | `error.vue` — 404 / error state |

## Wiring
- **Component**: `app/components/BearMascot.vue` (`pose?: 'stand' | 'signup' | 'verify' | 'trade' | 'oops'`)

## Prompt Template (New Poses)
```text
Stylized 3D commercial render of the Artix Global polar bear mascot (matching ../mascots/final/artix-global-mascot.jpg):
smooth matte snow-white fur, confident friendly expression, obsidian-black cyber-trimmed bomber jacket with glowing Neon Emerald Green (#4fd16a) piping and subtle crimson-red (#ff2e4d) cuff/collar details, dark carbon-hex sci-fi inner shirt featuring the exact Artix "X" logo (white diagonal slash with crimson-red top-right faceted triangle and emerald-green bottom-left faceted triangle) centered on the chest, matte black pants, dark sneakers.
Pose: <DESCRIBE POSE AND EMERALD/RED HOLOGRAPHIC PROP>.
Background: solid flat pure black (#0a0b0d) with soft emerald rim lighting, no text captions, no borders, generous margin for transparent cutout.
```
