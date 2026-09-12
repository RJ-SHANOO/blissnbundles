# CLAUDE.md — B&B (Bliss & Bundles) E-Commerce Website

> This file is the single source of truth for building the **B&B (Bliss & Bundles)** customized-gifts e-commerce website. Read this fully before writing any code. Follow it strictly. Ask for clarification only if something is truly ambiguous — otherwise make the most premium, professional decision consistent with the brand direction below.

---

## 1. Brand Overview

- **Brand name:** B&B (Bliss & Bundles)
- **Logo:** Wordmark/emblem "B&B" with "Bliss and Bundles" written underneath it. Logo file will be provided separately (`/src/assets/logo/`). Treat it as **dark-toned** — therefore the overall website UI must be built on a **light, bright background system** so the dark logo has strong contrast in the navbar and footer. Do not force the site into a dark theme.
- **Business:** Sells personalized/customized gifts. Initial product catalog:
  - Customized Mugs
  - Customized Tumblers
  - Customized Wallets
  - Customized Bottles
- **Market:** Pakistan (delivery across Pakistan is a trust point — mention COD, nationwide delivery, secure ordering).
- **Brand personality / emotional pillars:**
  - Creativity
  - Personalization ("made for YOU")
  - Premium quality
  - Emotional gifting (gifts that carry meaning/memories)
  - Modern aesthetic
  - Trust & reliability

**Tone of voice:** Warm, premium, emotionally resonant, but confident and modern — not childish, not generic "template" copy. Avoid clichés like "Welcome to our store." Use language like "Turn your memories into gifts," "Made uniquely for you," "Your story, beautifully personalized."

---

## 2. Design Direction (from reference analysis)

The client shared a reference homepage design. Key structural takeaways to **adapt, not copy**:

- Clean hero with strong product photography + bold headline + CTA button(s)
- Clear horizontal category navigation using cards/icons
- Featured/best-selling product grid with hover interactions
- A dedicated section that visually explains a multi-step process (in the reference this was for a different product type — for B&B this becomes the **"Customize Your Product" personalization journey**: choose product → add text/photo/design → choose color → preview → order)
- Testimonials/reviews section for social proof
- Trust/benefit strip (icons + short labels)
- Simple, organized footer with link columns + newsletter/contact + socials

**How we differentiate for B&B (do NOT replicate reference 1:1):**

- Warmer, more emotionally-driven hero copy centered on gifting and personalization (not generic retail copy)
- Category cards use actual product imagery with a soft, tactile, "gift-like" visual style (rounded corners, soft shadows, warm accent color) instead of flat generic icons
- The customization section is built around a **live-feeling visual mockup** (mug/tumbler render with a text/photo overlay + a small "Add your text," "Upload your photo," color swatches UI) to visually sell the personalization value prop — this is the emotional centerpiece of the homepage
- Reviews section includes reference to actual gifting occasions (anniversaries, birthdays, corporate gifting) to reinforce "emotional gifting"
- Trust section explicitly calls out **Pakistan-wide delivery, secure checkout, premium print quality, and easy customization** — tailored to local audience trust concerns (COD availability, quality assurance)

---

## 3. Tech Stack & Architecture

- **React** (functional components + hooks only)
- **Vite** as build tool
- **Tailwind CSS** for all styling (no separate CSS files except `index.css` for Tailwind directives + minimal global resets/custom keyframes)
- **React Router** should be set up at root level (even though we're only building the homepage now) so future pages (Product listing, Product detail, Cart, Account, Customize Studio) can be added without restructuring
- Icons: `lucide-react`
- Optional light animation library: `framer-motion` (preferred for scroll reveals, hover transitions, micro-interactions) — use sparingly and purposefully, never gratuitously
- No inline hardcoded huge JSX files — strict component decomposition (see Section 5)
- All homepage content (products, categories, testimonials, benefits) must come from **structured mock data files** (e.g. `src/data/products.js`, `src/data/categories.js`, `src/data/testimonials.js`) shaped exactly as a future API response would look, so swapping in real API calls later requires zero component changes — only swapping the data source.

### Suggested data shape examples

```js
// src/data/products.js
export const products = [
  {
    id: "prod_001",
    name: "Personalized Photo Mug",
    category: "mugs",
    price: 1299,
    compareAtPrice: 1599,
    currency: "PKR",
    image: "/assets/products/mug-01.jpg",
    hoverImage: "/assets/products/mug-01-alt.jpg",
    rating: 4.8,
    reviewCount: 214,
    isBestSeller: true,
    isCustomizable: true,
    tags: ["photo", "text", "best-seller"],
  },
  // ...
];

// src/data/categories.js
export const categories = [
  {
    id: "cat_mugs",
    name: "Customized Mugs",
    slug: "mugs",
    image: "/assets/categories/mugs.jpg",
    description: "Photo mugs & quote mugs made just for them.",
    productCount: 24,
  },
  // ...
];

// src/data/testimonials.js
export const testimonials = [
  {
    id: "t_001",
    customerName: "Ayesha K.",
    location: "Lahore",
    rating: 5,
    occasion: "Anniversary Gift",
    text: "The photo tumbler I ordered for my husband's birthday looked even better than I imagined...",
    avatar: "/assets/avatars/ayesha.jpg",
  },
  // ...
];

// src/data/benefits.js
export const benefits = [
  {
    id: "b_001",
    icon: "Truck", // lucide icon name
    title: "Nationwide Delivery",
    description: "We deliver across Pakistan, including COD.",
  },
  // ...
];
```

---

## 4. Color, Typography & Visual System

> Exact final palette will be locked once the logo file is reviewed (logo is dark-toned, so site base stays light). Use the following as the working system:

### Colors

- **Background base:** `#FFFFFF` / warm off-white `#FBF9F6` for section alternation
- **Primary/Brand accent:** A warm, premium tone — deep terracotta/blush-rose or muted burgundy (e.g. `#B94A48` / `#9C3B4E` range) — pick one that will visually pair well with a dark logo; use it for CTAs, highlights, active states
- **Secondary accent:** Soft gold/amber (e.g. `#D4A24C`) for premium touches (badges, "Best Seller" tags, dividers)
- **Text:** Near-black `#1A1A1A` for headings, `#5C5C5C` for body/secondary text
- **Neutral surfaces:** Light warm grays (`#F5F1EC`, `#EFEAE3`) for cards/section backgrounds
- **Success/trust green (subtle, optional):** for delivery/secure badges only

### Typography

- **Headings:** A premium serif or refined display sans (e.g. "Playfair Display" or "Fraunces" for emotional/premium feel) — used sparingly for hero headline and section titles
- **Body/UI:** Clean modern sans-serif (e.g. "Inter" or "Poppins") for nav, buttons, body copy, product details
- Maintain a clear type scale (e.g. hero h1 ~48–64px desktop, section titles ~32–40px, body ~16px) with generous line-height for readability

### Visual Style

- Rounded corners (`rounded-xl`/`rounded-2xl`) on cards, buttons, images — soft, giftable feel
- Soft, warm shadows (`shadow-md`/custom soft shadow) — avoid harsh black shadows
- Generous white space between sections — **do not overcrowd**
- Section padding rhythm: consistent vertical spacing (e.g. `py-16 md:py-24`) between all homepage sections
- Subtle background textures/blobs allowed behind hero only, kept very light opacity

---

## 5. Component Architecture

Build inside `src/components/` and `src/components/home/` — one component per file, no monolithic page files. Suggested structure:

```
src/
  components/
    layout/
      Navbar.jsx
      MobileMenu.jsx
      Footer.jsx
    home/
      Hero.jsx
      CategoryGrid.jsx
      CategoryCard.jsx
      FeaturedProducts.jsx
      ProductCard.jsx
      CustomizationShowcase.jsx
      BenefitsStrip.jsx
      Testimonials.jsx
      TestimonialCard.jsx
      NewsletterCTA.jsx
    ui/
      Button.jsx
      SectionHeading.jsx
      Badge.jsx
      RatingStars.jsx
  data/
    products.js
    categories.js
    testimonials.js
    benefits.js
  pages/
    Home.jsx
  App.jsx
  main.jsx
```

`Home.jsx` should only **compose** the sections in order — it should contain no layout markup of its own beyond assembling components:

```jsx
function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <CustomizationShowcase />
      <BenefitsStrip />
      <Testimonials />
      <NewsletterCTA />
    </>
  );
}
```

`Navbar` and `Footer` live in `App.jsx` layout wrapper, not inside `Home.jsx`, since they'll persist across future pages.

---

## 6. Homepage Sections — Detailed Requirements

### 6.1 Navbar

- Logo (B&B wordmark) on the left
- Center or left-aligned nav links: Home, Shop, Mugs, Tumblers, Wallets, Bottles, Customize, About
- Right side icons: Search (expandable input), Wishlist (heart, with count badge), Cart (bag icon, with count badge), Account (user icon)
- Sticky on scroll with a subtle background/shadow transition (transparent-ish at top → solid white with shadow after scrolling, if hero is full-bleed)
- Mobile: hamburger menu opening a slide-in/drawer menu with same links + icons
- Fully responsive breakpoints: mobile (<768px), tablet (768–1024px), desktop (>1024px)

### 6.2 Hero Section

- Full-width, large hero with:
  - Emotionally-driven headline (e.g. "Gifts That Feel Personal." / "Turn Memories Into Gifts They'll Keep Forever")
  - Supporting subheadline mentioning customization (text, photos, designs, colors)
  - Two CTAs: primary **"Customize Your Gift"** (leads to /customize, filled button, brand accent color) and secondary **"Shop Now"** (outline/ghost button, leads to /shop)
  - Hero product imagery: a styled arrangement of the 4 product types (mug, tumbler, wallet, bottle) — can be a collage/composition, or a rotating/animated featured product visual
  - Subtle entrance animation (fade-up/stagger on load)
  - Optional trust micro-line under CTAs: "⭐ 4.8/5 from 2,000+ happy customers · Nationwide Delivery"

### 6.3 Category Grid ("Shop by Category")

- 4 cards: Mugs, Tumblers, Wallets, Bottles
- Each card: product image, category name, short tagline, item count, hover effect (image zoom + overlay CTA "Shop Mugs →")
- Responsive grid: 4 columns desktop → 2 columns tablet → 1–2 columns mobile (horizontal scroll acceptable on mobile)

### 6.4 Featured / Best-Selling Products

- Section heading + short subtext + "View All" link
- Product grid (4 per row desktop, 2 tablet, 1–2 mobile) using `ProductCard`
- Each `ProductCard`: product image (with hover swap to alt/lifestyle image), "Best Seller" or "New" badge when applicable, name, price (+ compare-at-price strikethrough if discounted), star rating, quick "Customize Now" / "Add to Cart" hover action, wishlist heart icon overlay
- Subtle hover lift + shadow transition on card

### 6.5 Customization Showcase ("Make It Yours") — Centerpiece Section

This is the most important differentiating section — sell the _experience_ of personalization.

- Section heading: e.g. "Make It Yours in 3 Simple Steps"
- Visual layout: a large product mockup (e.g. mug/tumbler) on one side showing a text overlay + photo overlay + color swatch selection, paired with a numbered step list on the other side:
  1. **Choose Your Product** — pick a mug, tumbler, wallet, or bottle
  2. **Personalize It** — add your text, upload your photo, pick colors/designs
  3. **We Craft & Deliver** — premium printing, quality-checked, delivered to your door
- Include small interactive-feeling UI elements (even if static/mocked for now): a text input mockup, color swatch dots, an "upload photo" icon — to visually communicate the real customization tool that will exist later
- CTA button at the end: "Start Customizing"
- Responsive: stacks vertically on mobile, side-by-side on desktop

### 6.6 Benefits / Trust Strip

- 4 short benefit blocks with icon + title + one-line description, e.g.:
  - Premium Print Quality
  - 100% Personalized, Made for You
  - Secure & Easy Ordering
  - Delivery Across Pakistan (+ COD)
- Horizontal row on desktop, 2x2 grid on tablet, stacked/scroll on mobile
- Light background differentiation from surrounding sections

### 6.7 Testimonials / Reviews

- Section heading e.g. "Loved By Our Customers"
- Carousel or grid of 3 testimonial cards (name, city, occasion, star rating, quote, avatar)
- Subtle autoplay carousel on desktop is a nice-to-have (not mandatory); ensure swipe works on mobile

### 6.8 Newsletter / Final CTA Band

- Bold closing CTA band (accent-colored or dark contrasting background) with a short line like "Got someone special in mind? Let's create their perfect gift." + a "Customize Your Gift" button, and optionally an email signup for offers/discounts

### 6.9 Footer

- Columns:
  - Brand column: logo + 1-line brand description + social icons (Instagram, Facebook, TikTok, WhatsApp)
  - Shop: links to Mugs, Tumblers, Wallets, Bottles, Best Sellers
  - Company: About Us, Contact, Track Order, FAQs
  - Support/Legal: Shipping Policy, Return Policy, Privacy Policy, Terms
  - Contact info block: phone, email, WhatsApp, business hours
- Bottom bar: © year B&B (Bliss & Bundles). All rights reserved. + payment method icons if available
- Responsive: columns stack on mobile, accordion-style collapse optional for mobile footer links

---

## 7. Animations & Micro-interactions (use tastefully, not excessively)

- Scroll-reveal fade/slide-up on section entry (once per section, not repeated on every scroll)
- Hover: image zoom on product/category cards (`scale-105 transition-transform duration-300`)
- Hover: buttons have subtle scale/shadow/color transition
- Sticky navbar background transition on scroll
- Hero entrance stagger animation
- Wishlist heart icon "pop" animation on click (state toggle, even if not persisted yet)
- Avoid: parallax overuse, auto-playing heavy video backgrounds, flashy/gimmicky effects that hurt performance or feel "AI template generic"

---

## 8. Responsiveness Requirements

- Mobile-first Tailwind approach (`sm:`, `md:`, `lg:`, `xl:` breakpoints)
- Test all sections at: 375px (mobile), 768px (tablet), 1280px+ (desktop)
- Touch-friendly tap targets (min 44px) for mobile nav/icons
- No horizontal overflow/scroll bugs at any breakpoint (except intentional horizontal product/category scrollers on mobile)
- Images use responsive `srcset`/appropriate `object-cover` sizing, never stretched/distorted

---

## 9. UX Improvements Recommended (apply these)

1. Add a small trust/rating line directly under the hero CTA buttons (social proof placed early increases conversion)
2. Make "Customize Your Gift" the visually dominant CTA everywhere (navbar optional, hero primary, product cards secondary, footer CTA band) — this is the core differentiator of the brand and should be the most repeated action across the page
3. Ensure wishlist/cart icons show live count badges (even with mock state) so the UI feels real and functional, not static
4. Use skeleton/placeholder states in data-driven components so they're ready for real async API loading later
5. Keep the customization showcase section visually rich but not cluttered — this is the emotional "aha" moment of the homepage, give it breathing room
6. Avoid stock-photo-generic imagery language in copy — write product/category descriptions like a real premium gifting brand would

---

## 10. What NOT To Do

- Do NOT copy the reference design's layout, spacing, or component styling 1:1 — this must look like an original B&B brand experience
- Do NOT put all homepage markup into a single `Home.jsx` file
- Do NOT hardcode product/category/testimonial content directly inside JSX — always pull from `src/data/*.js`
- Do NOT use a dark theme as default (logo is dark, site must be light for contrast)
- Do NOT overcrowd sections — respect vertical spacing rhythm from Section 4
- Do NOT use generic AI-template clichés ("Best products at best prices", stock hero text, default Tailwind UI kit look)

---

## 11. Deliverable For This Phase

**Scope: Homepage only.** Do not build Shop, Product Detail, Cart, Account, or Customize Studio pages yet — only scaffold routing so they can be added later without refactor.

Deliverables:

1. Vite + React + Tailwind project scaffolded
2. Full component architecture per Section 5
3. Fully responsive, animated homepage per Sections 6–8
4. Mock data files structured for future API replacement
5. Clean, readable, well-commented code

---

## 12. Pending Inputs From Client (to be added once provided)

- [ ] Final logo file (SVG/PNG) — for exact color extraction and navbar/footer sizing
- [ ] Reference design image — for final layout cross-check (currently working from written analysis above)
- [ ] Real product photography (placeholders to be used until then)
- [ ] Contact details (phone/email/WhatsApp/address) for footer
- [ ] Social media handles/links

## 13. Additional Design Directive

The homepage must feel premium, calm, and self-care-oriented — not loud or generic e-commerce. Follow these design rules strictly:

- Use generous white space; never let two sections feel visually cramped against each other.
- Every section must have a clear focal point (one hero image, one product highlight, one message) — avoid busy layouts with too many competing elements.
- Use soft rounded shapes (rounded-2xl/rounded-3xl) consistently across cards, buttons, and image containers to match the logo's soft circular mark.
- Add soft drop shadows (never harsh black shadows) — shadows should feel like soft light, not heavy weight.
- Maintain visual rhythm: alternate white and off-white (#FAF8F6) section backgrounds so sections are distinguishable without hard borders/dividers.
- Typography hierarchy must be obvious at a glance: hero headline > section titles > product names > body text > captions. Do not let any two text levels look visually similar in weight/size.
- All CTAs must stand out clearly against their background — never place a button where its color blends into the surrounding section.
- Layout should breathe — treat this as a premium self-care/lifestyle brand (think Glossier, Aesop-style calm minimalism) rather than a busy discount-store layout.
