# ☕ URJA Coffee — Landing Page

Website landing page untuk **URJA Coffee**, brand kopi artisan dengan desain dark/minimalis dan animasi interaktif terinspirasi dari Awwwards.

## 🔗 Live Preview

[github.com/ZhyperReyz/urjacoffee](https://github.com/ZhyperReyz/urjacoffee)

## 🛠 Tech Stack

- **React 19** + TypeScript
- **Vite** — build tool
- **GSAP** + ScrollTrigger — animations
- **Lenis** — smooth scroll
- **Vanilla CSS** — no framework, custom properties

## ✨ Fitur & Animasi

| Section | Animasi | Ref Awwwards |
|---------|---------|-------------|
| **Hero** | Word-by-word text reveal + parallax bg | Text Animations/1 |
| **About** | Clip-path image reveal + stat counters | Hero Animations/11 |
| **InteractiveSplit** | Mouse-controlled image width split | Hover Effects/1 |
| **PeelReveal** | Horizontal bars peel away on scroll | Hero Animations/4 |
| **Menu** | 8 kategori tab dengan animasi switch | Custom |
| **SpecialtyDrinks** | Text chars scatter on hover | Hover Effects/2 |
| **HorizontalScroll** | Horizontal gallery dengan scale + parallax | Hero Animations/2 |
| **Gallery** | Clip-path image reveals | Scroll Animation/22 |
| **Testimonials** | Auto-rotating quotes | Custom |
| **Events** | Workshop cards dengan date display | Custom |
| **Reservation** | Booking form | Custom |
| **Newsletter** | Loyalty signup + perks grid | Custom |
| **Navigation** | Animated expanding side panel | Navigation Menus/2 |
| **Preloader** | Counter animation + curtain reveal | Hero Animations/20 |

## 📦 Struktur Menu (Real Data)

```
KOPI         — Putih, Legit, Kalpatharu, Mentigi, Monaghan, Sativa, Persik, Birru, Enerji
KOPI KALENG  — Putih, Arrum, Puspa, Badam, Mendikai (small/large)
PENYEGAR     — Aurora, Selimun, Minty Fizz, Citrus Boost
POWDER       — Coklat, Matcha, Coklat Pistachia, Strawberry Matcha
TEH          — Lychee, Mixed Berry, Strawberry Peach, Apple Mint
KLASIK       — Black/White/Manual Brew
SPESIAL      — Dirty, Mont Blanc, Bomb
MAKANAN      — Mie Karet, Nasi Goreng, Nasi Ayam (4 varian), Nasi Daging (2 varian)
CEMILAN      — French Fries, Cireng, Tahu Cabe Garam, Corn Ribs, dll
```

## 🚀 Cara Jalankan

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

## 📁 Struktur Project

```
cafe-landing/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── src/
│   ├── main.tsx
│   ├── App.tsx / App.css
│   ├── styles/
│   │   └── index.css          — Global tokens, reset, utilities
│   ├── hooks/
│   │   ├── useLenis.ts        — Smooth scroll (Lenis + GSAP sync)
│   │   └── useScrollReveal.ts — Reusable scroll animation hooks
│   └── components/
│       ├── Navigation.tsx/css  — Animated side panel menu
│       ├── Hero.tsx/css        — Landing hero
│       ├── About.tsx/css       — Brand story + stats
│       ├── InteractiveSplit.tsx/css — Mouse-controlled split
│       ├── PeelReveal.tsx/css  — Horizontal bars peel
│       ├── Menu.tsx/css        — 8-kategori menu
│       ├── SpecialtyDrinks.tsx/css — Text scatter hover
│       ├── HorizontalScroll.tsx/css — Horizontal gallery
│       ├── Gallery.tsx/css     — Clip-path image grid
│       ├── Featured.tsx/css    — Seasonal specials
│       ├── Testimonials.tsx/css — Rotating quotes
│       ├── Events.tsx/css      — Workshop cards
│       ├── Reservation.tsx/css — Booking form
│       ├── Newsletter.tsx/css  — Loyalty signup
│       ├── Contact.tsx/css     — Info + contact form
│       ├── Preloader.tsx/css   — Loading animation
│       └── Footer.tsx/css      — Footer links
```

## 📐 Brand Guidelines

- **Font Display:** Playfair Display
- **Font Body:** Inter
- **Accent Color:** `#c8956c` (warm brown)
- **Background:** `#0a0a0a` (near black)
- **Hashtag:** `#ngopidiurja`

## 📝 Catatan

- Harga menu **belum termasuk PPN**
- Menu item dengan badge 🔥 = **Pedas**
- Harga dalam format `Rp XX.000`
- Harga Kopi Kaleng: `Rp XX.000 / XX.000` (small/large)

## 📄 License

© 2026 URJA Coffee. All rights reserved.
