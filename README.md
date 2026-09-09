# DcemilinYuk — Cemilan & Minuman Favorit

Website katalog cemilan dan minuman dari pedagang kecil lokal Indonesia. Dibuat dengan React, TypeScript, dan Vite.

## Live Preview

[github.com/ZhyperReyz/dcemilinyuk-web](https://github.com/ZhyperReyz/dcemilinyuk-web)

## Tech Stack

- **React 19** + TypeScript
- **Vite 8** — build tool
- **GSAP** + ScrollTrigger — animasi scroll
- **Lenis** — smooth scroll
- **Vanilla CSS** — custom properties, dark theme

## Fitur & Animasi

| Section | Animasi |
|---------|---------|
| **Preloader** | Counter animasi 000-100 + curtain reveal |
| **Navbar** | Horizontal fixed, active underline, scroll blur effect |
| **Hero** | Word-by-word text reveal + parallax background |
| **Categories** | Scroll reveal cards |
| **Products** | Filter tab kategori + WA order button |
| **PeelReveal** | Horizontal bars peel away on scroll |
| **Featured** | Best seller cards dengan hover lift |
| **SpecialtyDrinks** | Text scatter on hover |
| **Gallery** | Clip-path image reveals |
| **HorizontalScroll** | Horizontal gallery dengan GSAP pin + scroll |
| **About** | Clip-path reveal + stat counter animation |
| **HowToOrder** | Step cards dengan staggered reveal |
| **Testimonials** | Auto-rotating quotes |
| **CTA** | Scale-in WhatsApp banner |

## Data Produk

```
CEMILAN    — Risol Mayo, Siomay, Lumpiah, Piscok, Sosis Bakar, Tahu Gejrot
MINUMAN    — Es Teh Tarik, Kopi Susu, Es Kepiting
MAKANAN    — Lemper Ayam, Nasi Uduk, Chicken Katsu, Bakso Mercon
KUE        — Bolen Pisang, Donat Kentang
FROZEN     — Sweet Potato Fries
```

## Cara Jalankan

```bash
# Install dependencies
npm install

# Jalankan dev server
npm run dev

# Build untuk production
npm run build

# Preview build
npm run preview
```

## Struktur Project

```
pjbl/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── main.tsx
    ├── App.tsx / App.css
    ├── styles/
    │   └── index.css          — Global tokens, reset, utilities
    ├── hooks/
    │   ├── useLenis.ts        — Smooth scroll (Lenis + GSAP sync)
    │   └── useScrollReveal.ts — Reusable scroll animation hooks
    ├── data/
    │   └── products.ts        — Produk & kategori data
    └── components/
        ├── Navigation.tsx/css  — Navbar horizontal
        ├── Hero.tsx            — Landing hero
        ├── Categories.tsx      — Kategori cards
        ├── Products.tsx        — Produk grid + filter
        ├── PeelReveal.tsx      — Peel animation
        ├── Featured.tsx        — Best seller cards
        ├── SpecialtyDrinks.tsx — Signature items hover
        ├── Gallery.tsx         — Clip-path image grid
        ├── HorizontalScroll.tsx— Horizontal gallery
        ├── About.tsx           — Brand story + stats
        ├── HowToOrder.tsx      — Cara pesan steps
        ├── Testimonials.tsx    — Rotating quotes
        ├── CTA.tsx             — WhatsApp CTA
        ├── Footer.tsx          — Footer links
        └── Preloader.tsx       — Loading animation
```

## Brand Guidelines

- **Font Display:** Playfair Display
- **Font Body:** Inter
- **Accent Color:** #c8956c (warm brown)
- **Background:** #0a0a0a (near black)
- **WhatsApp:** #25D366

## Catatan

- Harga dalam format Rp XX.000
- Badge: Best Seller, Baru, Pedas
- Pesan via WhatsApp langsung dari halaman produk

## License

(c) 2026 DcemilinYuk. All rights reserved.
