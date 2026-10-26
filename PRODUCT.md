# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** Retail furniture shoppers, homeowners, and condo residents looking for modern designer furniture alongside bespoke made-to-order pieces with immediate price clarity.
- **Secondary:** Interior designers, decorators, and contractors who specify furniture and need rapid dimensional customization, Bill of Materials (BOM), and cutting plan estimates.

## Product Purpose

Maison Forme is a modern furniture brand and digital platform that merges curated ready-to-ship collections with an intelligent custom furniture design tool. The product exists to make bespoke furniture accessible, transparent, and immediate—enabling users to browse curated pieces or design custom cabinetry with real-time sheet-yield optimization, material pricing, and instant checkout.

## Positioning

Unlike conventional furniture retailers with static catalogs or slow, opaque custom quotation processes, Maison Forme provides an interactive in-browser AI Furniture Designer that computes precise Bill of Materials (BOM), sheet cutting layouts (nesting optimization for 1220 × 2440 mm sheets), and transparent manufacturing cost calculations on the fly.

## Operating Context

- **Market & Locale:** Residential and commercial interiors in Thailand, featuring a bilingual Thai/English experience.
- **Standard Materials:** MDF 18 mm, Particle Board 15 mm, Plywood 18 mm, moisture-resistant HMR 18 mm, and Solid Rubberwood/Oak 20 mm.
- **Production Reality:** Standard industrial sheet sizing (1220 × 2440 mm), edge banding calculations, and realistic lead times (3–14 days for custom builds).
- **Commerce Flow:** Direct-to-cart purchasing for both catalog items and custom-configured items, unified checkout, order tracking, and administrative control.

## Capabilities and Constraints

- **AI Furniture Designer:** Natural language prompting, dimensional inputs (width, depth, height), shelf and door counts, material presets, sheet cutting nesting layout, detailed BOM list, and dynamic quotation.
- **Storefront & Catalog:** Product categories, sorting, stock levels, featured and made-to-order indicators, product gallery images, and shopping cart context.
- **Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, PostgreSQL with Drizzle ORM, Better Auth authentication, Lucide icons, and Sonner notifications.
- **Currency & Units:** Thai Baht (฿ / THB), metric measurements (cm for furniture dimensions, mm for sheet/cutting specifications).

## Brand Commitments

- **Brand Identity:** Maison Forme — Furniture & AI Furniture Designer (เฟอร์นิเจอร์และ AI Furniture Designer).
- **Tone & Voice:** Sophisticated, architectural, approachable, and transparent.
- **Typography:** Inter for Latin text and numerals; Kanit for Thai copy.
- **Aesthetic Direction:** Elevated modern sanctuary—soft neutral canvas, refined accents, clean architectural geometry.

## Evidence on Hand

- Database schema and models defined in `lib/db/schema.ts` (`products`, `categories`, `productImages`, `cartItems`, `user`, `session`).
- Working AI designer logic and sheet nesting algorithms in `app/furniture-designer/page.tsx`.
- Administrative dashboard and inventory management pages in `app/admin/`.
- Global layout and typography configuration in `app/layout.tsx` and `app/globals.css`.

## Product Principles

1. **Instant Clarity Over Guesswork:** Custom furniture pricing and material breakdowns calculate instantaneously—no hidden fees or multi-day quote delays.
2. **Computational Rigor, Human Warmth:** Algorithmic cutting plans, BOMs, and nesting algorithms are packaged in an elegant, serene user interface.
3. **Harmonious Hybrid Commerce:** Standard catalog items and bespoke AI-designed creations coexist naturally in a single cart and checkout experience.
4. **Grounded in Regional Reality:** Built for practical Thai living spaces and standard local supplier specifications (1220 × 2440 mm sheet goods, moisture-resistant HMR for humid climates).

## Accessibility & Inclusion

- High contrast text readability across light and dark elements.
- Fluid responsive layout optimized for mobile screens, tablets, and desktop workstations.
- Legible Thai font scaling and line heights via Kanit font definitions.
