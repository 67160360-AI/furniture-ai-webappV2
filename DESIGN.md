---
name: Maison Forme
description: Soft tactile atelier combining claymorphic pastel depth with sculptural modern furniture craft
colors:
  primary: "#f6a3ca"
  primary-foreground: "#383139"
  secondary: "#c0efdc"
  secondary-foreground: "#383139"
  accent: "#ded0f9"
  accent-foreground: "#383139"
  yellow: "#f9e7a8"
  blue: "#c5e5fb"
  cream-surface: "#fffdf7"
  base-bg: "#f1f2fa"
  text-main: "#383139"
  text-muted: "#746d78"
  border: "rgba(116, 100, 140, 0.16)"
  destructive: "#c2410c"
typography:
  display:
    fontFamily: "var(--font-inter), var(--font-kanit), ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "var(--font-inter), var(--font-kanit), ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title:
    fontFamily: "var(--font-inter), var(--font-kanit), ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "var(--font-inter), var(--font-kanit), ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "var(--font-inter), var(--font-kanit), ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: "10px"
  md: "16px"
  lg: "20px"
  card: "32px"
  container: "54px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.full}"
    padding: "10px 20px"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    rounded: "{rounded.full}"
    padding: "10px 20px"
  button-outline:
    backgroundColor: "{colors.cream-surface}"
    textColor: "{colors.text-main}"
    rounded: "{rounded.full}"
    padding: "10px 20px"
  card:
    backgroundColor: "{colors.cream-surface}"
    textColor: "{colors.text-main}"
    rounded: "{rounded.card}"
    padding: "24px"
  input:
    backgroundColor: "{colors.cream-surface}"
    textColor: "{colors.text-main}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
---

# Design System: Maison Forme

## Overview

**Creative North Star: "The Tactile Atelier"**

Maison Forme pairs the warmth of artisanal furniture craft with algorithmic design precision. Rather than following cold Scandinavian minimalism or harsh geometric dashboards, the interface evokes a physical workshop rendered in soft ceramic tones, warm cream foundations, and French macaron pastels. Surfaces feel physically sculpted—like hand-poured porcelain tiles with rounded pill contours and dual-directional soft light.

The aesthetic philosophy centers on tactile reassurance: every card, pill button, and floating container behaves like a tangible architectural element. Soft bevels, delicate inset reflections, and cushioned active states make technical tools—such as 3D cutting sheet nesting, BOM calculations, and dimensional specification—feel approachable, serene, and delightfully physical.

**Key Characteristics:**
- **Tactile Claymorphism:** Ambient drop shadows softened by pure white opposite-angle glow highlights and subtle inner rim bevels.
- **Sculpted Pill Silhouettes:** Full-radius pill buttons, generous 32px card radii, and 54px structural outer containers that soften the viewport.
- **Confectionary Pastel Accents:** Curated macaron accents (Blush Rose, Pistachio Mint, Soft Lavender) deployed purposefully against warm cream surfaces.
- **Architectural Typography:** Inter for crisp geometric numerals and Latin titles, balanced with Kanit for warm, legible Thai typography.

## Colors

The Maison Forme palette draws inspiration from French patisserie delicacies and glazed ceramic stoneware, set against a calming, desaturated periwinkle-gray canvas.

### Primary
- **Blush Rose** (`#F6A3CA`): The primary interactive accent. Used for primary calls-to-action, key promotional highlights, brand monogram accents, and active focus rings.

### Secondary
- **Pistachio Mint** (`#C0EFDC`): Secondary action color, stock status badges (In Stock / Ready to Ship), eco/material cues, and positive confirmations.

### Tertiary
- **Soft Lavender** (`#DED0F9`): Tertiary accent used for AI Designer badges, made-to-order indicators, decorative gradient blends, and pill chips.
- **Butter Yellow** (`#F9E7A8`): Warm informational highlight, star reviews, and secondary badge accents.
- **Powder Blue** (`#C5E5FB`): Dimension indicators, architectural notes, and auxiliary tags.

### Neutral
- **Ceramic Cream** (`#FFFDF7`): The foundational surface color for all cards, floating menus, dialog modals, and interactive inputs.
- **Periwinkle Base** (`#F1F2FA`): The overall application viewport canvas; provides soft contrast that allows cream cards to visually float.
- **Deep Cocoa Plum** (`#383139`): Primary high-contrast body and heading text. Deep and grounding without the harshness of pitch black.
- **Muted Mauve Slate** (`#746D78`): Secondary text, dimension labels, captions, and deactivated icons.
- **Soft Lilac Border** (`rgba(116, 100, 140, 0.16)`): Subtle framing stroke for cards and inputs to define boundaries on low-contrast displays.

### Named Rules
**The No-Pitch-Black Rule.** Pure black (`#000000`) is strictly prohibited. All dark typography and high-emphasis elements use Deep Cocoa Plum (`#383139`) to preserve the warm, ceramic atmosphere.

**The Pastel Harmony Rule.** Vibrant saturated neons are banned. Pastels must maintain soft tint saturation (chroma ≤ 0.15 in OKLCH) so multiple pastels can coexist comfortably without visual fatigue.

## Typography

**Display Font:** Inter & Kanit (`var(--font-inter)`, `var(--font-kanit)`)
**Body Font:** Inter & Kanit (`var(--font-inter)`, `var(--font-kanit)`)
**Label/Mono Font:** Inter with tabular figures for measurements and prices

**Character:** A balanced dialogue between crisp international geometry and gentle Thai curves. English names and technical numbers feel precise and modern, while Thai phrasing reads welcoming and humane.

### Hierarchy
- **Display** (Bold 700, `2.5rem` / `clamp(2rem, 5vw, 3.25rem)`, line-height 1.15): Hero section claims, designer headline values, and high-impact landing titles.
- **Headline** (Semi-Bold 600, `1.75rem` / `1.5rem`, line-height 1.25): Category titles, modal headers, and main sheet configuration headings.
- **Title** (Medium/Semi-Bold 600, `1.25rem` / `1.125rem`, line-height 1.35): Product card names, specification section dividers, and cart item labels.
- **Body** (Regular 400, `1rem` / `0.9375rem`, line-height 1.6): Narrative copy, product descriptions, material specifications, and instructional notes (max line length 65–70ch).
- **Label** (Medium 500, `0.875rem` / `0.75rem`, line-height 1.4, tracking +0.02em): Form field labels, price tags, BOM dimensions, and badge micro-copy.

### Named Rules
**The Dual-Language Baseline Rule.** Thai typography (`Kanit`) requires 1.4–1.6× line-height relative to Latin equivalents to prevent ascender and descender clipping. Never compress line-height below 1.25 on headings containing Thai characters.

## Layout

Maison Forme employs a floating pill grid system that feels breathable and unhurried:
- **Max Container Width:** `1280px` (`max-w-7xl`) for storefront pages; centered with generous horizontal page gutters (`px-4` on mobile, `px-8` on tablet/desktop).
- **Sticky Capsule Header:** The navigation bar is an elevated floating pill suspended 16px below the top viewport edge (`sticky top-4`).
- **Spacing Rhythm:** Standard 8px increment modular scale (8px, 16px, 24px, 32px, 48px, 64px). Form layouts and parameter grids utilize 16px gutters to maintain dense yet scannable relationships.
- **Responsive Stacking:** Desktop two-column split (interactive preview / specification controls on the designer) collapses gracefully into a bottom-sheet tabbed mobile layout under `1024px` (`lg`).

## Elevation & Depth

Depth in Maison Forme is tactile and sculpted rather than diffuse or flat. It relies on dual-source illumination (soft dark shadow offset to the lower right, counterbalanced by a bright white reflection from the upper left) combined with delicate inset bevel highlights.

### Shadow Vocabulary
- **Sculpted Clay (`--shadow-clay`):** `12px 12px 28px rgba(91, 82, 112, 0.1), -8px -8px 24px rgba(255, 255, 255, 0.9), inset 2px 2px 5px rgba(255, 255, 255, 0.85), inset -2px -2px 6px rgba(110, 95, 130, 0.06)`. Applied to resting product cards, interactive tool panels, and modal dialogs.
- **Sculpted Clay Small (`--shadow-clay-sm`):** `6px 6px 14px rgba(91, 82, 112, 0.1), -4px -4px 12px rgba(255, 255, 255, 0.85), inset 1px 1px 3px rgba(255, 255, 255, 0.85), inset -1px -1px 4px rgba(110, 95, 130, 0.06)`. Applied to primary buttons, pill badges, and dropdown triggers.
- **Clay Inset (`--shadow-clay-inset`):** `inset 4px 4px 10px rgba(91, 82, 112, 0.1), inset -4px -4px 10px rgba(255, 255, 255, 0.9)`. Applied to active button presses, pressed toggles, and form inputs.
- **Frosted Glass (`.glass`):** `background: rgba(255, 253, 247, 0.78); backdrop-filter: blur(18px) saturate(1.2)`. Applied to the capsule navbar and floating control overlays.

### Named Rules
**The Physical Press Rule.** Interactive elements that boast raised clay depth must depress physically upon interaction (`.clay-press:active: transform: translateY(1px) scale(0.98); box-shadow: var(--shadow-clay-inset)`). Depth must feel reactive to touch.

## Shapes

- **Base Corner Radius:** `20px` (`1.25rem` / `--radius-lg`) for standard panels and dialog windows.
- **Card Radius:** `32px` (`--radius-card`) for product cards, feature showcases, and content containers.
- **Container Radius:** `54px` (`--radius-container`) for hero sections and sweeping architectural outer frames.
- **Pill Radius:** Full round (`rounded-full` / `9999px`) for all action buttons, input search pills, navigation tabs, and status badges.
- **Borders:** Thin translucent borders (`1px solid rgba(116, 100, 140, 0.16)`) paired with shadow highlights to give crisp definition on all screen calibres.

## Components

### Buttons
- **Shape:** Full pill (`rounded-full`, 9999px radius).
- **Primary:** Blush Rose (`#F6A3CA`) background, Deep Cocoa Plum text (`#383139`), subtle clay shadow (`clay-sm`), padding `10px 20px` (or `12px 28px` for large).
- **Hover / Active:** Hover shifts to 85% opacity with slight lift; active applies `.clay-press` with `translateY(1px) scale(0.98)` and inset shadow.
- **Secondary:** Pistachio Mint (`#C0EFDC`) background, Cocoa Plum text, soft pill border.
- **Outline / Ghost:** Ceramic Cream background with soft border stroke; hover shifts to lavender wash (`#DED0F9/40`).

### Chips & Badges
- **Style:** Compact pill (`rounded-full`, padding `4px 12px`, text `11px font-bold`).
- **Variants:**
  - *New Arrival:* Pistachio Mint background (`#C0EFDC`) with deep emerald text (`#064E3B`).
  - *Discount / Sale:* Blush Rose background (`#F6A3CA`) with crisp white text (`#FFFFFF`).
  - *Made to Order:* Soft Lavender background (`#DED0F9`) with deep violet text (`#4C1D95`).
  - *In Stock:* Ceramic Cream with subtle border and Cocoa Plum text.

### Cards / Containers
- **Corner Style:** Generous `32px` radius.
- **Background:** Warm Ceramic Cream (`#FFFDF7`).
- **Elevation:** Sculpted Clay (`--shadow-clay`) at rest; hovers translate `-4px` with deepened ambient glow.
- **Internal Padding:** `16px` on compact product cards, `24px` to `32px` on feature containers.

### Inputs / Fields
- **Style:** `rounded-2xl` (16px) or `rounded-full` for search pills, Ceramic Cream background, border `rgba(116, 100, 140, 0.22)`, height `44px` (`h-11`).
- **Focus:** Border transitions to Blush Rose (`#F6A3CA`) with ring glow `3px rgba(215, 122, 168, 0.35)`.
- **Inner Feel:** Subtle inset shadow gives form fields a gently sunken, receptive basin feel.

### Navigation
- **Capsule Navbar:** Floating pill container with frosted glass blur (`#FFFDF7/90`, `backdrop-blur-md`), centered `sticky top-4`, pill brand mark with pink-to-lavender gradient.
- **Links:** Pill hover background (`#E9E8F3`), active link styled with pastel gradient fill (`from-[#DED0F9] to-[#C0EFDC]`) for prominent tools like the AI Designer.

### Signature Component: AI Designer Workspace
- **Layout:** Dual-pane ergonomic workshop layout with interactive dimensional sliders, preset material cards (MDF, HMR, Plywood, Solid Oak), real-time interactive 2D cutting sheet layout canvas, and instant BOM price breakdown card.

## Do's and Don'ts

### Do:
- **Do** use Ceramic Cream (`#FFFDF7`) on Periwinkle Base (`#F1F2FA`) to establish soft, warm contrast.
- **Do** apply `rounded-full` to buttons, badges, and tabs for consistent organic pill form language.
- **Do** accompany raised clay shadows with matching `.clay-press` tactile depression on active click.
- **Do** preserve the dual-font setup (Inter for Latin numerals and technical stats; Kanit for natural Thai phrasing).
- **Do** showcase material real-world dimensions (1220 × 2440 mm sheet sizes) and clear lead times on made-to-order items.

### Don't:
- **Don't** use harsh pure black (`#000000`) for text or backgrounds; always use Deep Cocoa Plum (`#383139`).
- **Don't** use sharp 0px or square corners; every element must carry at least an 8px radius.
- **Don't** apply harsh, dark single-directional drop shadows (e.g. `0 10px 20px black`); clay elevation requires dual light and inset highlights.
- **Don't** introduce high-intensity neon colors or saturated primary reds/blues.
- **Don't** reduce line-height below 1.25 on Thai headings.
