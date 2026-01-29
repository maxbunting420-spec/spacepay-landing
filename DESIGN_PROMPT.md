# SpacePay Landing Page — Design Master Prompt

Build the complete SpacePay landing page at `src/app/page.tsx` and supporting components. The design must be a pixel-perfect replica of holyheld.com's visual style, but using SpacePay's copy below. Study holyheld.com carefully.

## DESIGN SYSTEM (match Holyheld exactly)

### Theme: LIGHT mode (not dark)
- Page background: `#ffffff` (pure white)
- Text color: `#1a1a1a` (near-black)
- Muted text: `#6b7280` (gray-500)
- Card backgrounds: `#ffffff` with `2px solid #e5e7eb` borders
- Card border-radius: `42px`
- Button border-radius: `24px`
- Footer: dark background `#1a1a1a` with white text

### Typography
- Font: Inter (already configured)
- Hero headline: `clamp(48px, 7vw, 96px)`, font-weight 700, tight letter-spacing (-0.02em)
- Section titles: `clamp(32px, 4vw, 56px)`, font-weight 700
- Card titles: `clamp(24px, 3vw, 40px)`, font-weight 600
- Body text: 18-20px, font-weight 400, line-height 1.6, color muted
- Small text/disclaimers: 14px, muted

### Spacing (generous, premium feel)
- Section vertical padding: `160px` desktop, `64px` mobile
- Container max-width: `1360px`, centered with `auto` margins
- Card internal padding: `48px` desktop, `24px` mobile
- Gap between stacked cards: `16px`
- Horizontal page padding: `24px` mobile, `48px` tablet, `80px` desktop

### Animations & Effects
- Cards should be sticky on scroll (like Holyheld's stacking cards) — each card sticks to top as you scroll, next card slides over it
- Smooth transitions: `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- Button hover: subtle scale `transform: scale(0.97)` on active
- Fade-in on scroll for sections (use Intersection Observer)
- Word-by-word opacity reveal animation on "Gas fees kill conversions. We killed gas fees."

### Buttons
- Primary: solid black background, white text, height `48px`, padding `0 24px`, border-radius `24px`
- Secondary: white background, dark border `2px solid #e5e7eb`, same dimensions
- CTA gradient: `linear-gradient(90deg, #4fd1c5, #63b3ed)` with white text

### Visual Elements
- Clean illustrations or subtle geometric shapes inside cards (CSS-only or SVG)
- No heavy 3D renders — keep it clean like Holyheld
- Subtle shadows on cards: `0 1px 3px rgba(0,0,0,0.04)`
- No noise textures, no particle effects

---

## PAGE STRUCTURE (top to bottom)

### 1. NAVBAR (fixed, sticky top)
- Left: SpacePay logo text (bold, 20px)
- Right: "Book a Call" button (primary style)
- Background: white with subtle `backdrop-filter: blur(12px)` and `rgba(255,255,255,0.8)`
- Height: `64px`
- Border-bottom: `1px solid #f0f0f0`

### 2. HERO SECTION
- Centered text layout
- Headline: **"Effortless Crypto Commerce"**
- Subheadline: **"Crypto payments, minus the complexity. One click for customers. Fiat settlement for merchants."**
- CTA button: **"Get Started"** (gradient style)
- Below: A visual mockup area showing checkout flow UI (4 phone-screen placeholders in a row, styled as rounded cards with light borders)
- Generous padding: 160px top, 80px bottom

### 3. FEATURE CARDS (stacking sticky scroll — this is the core of the page)

Each card is full-width within the container, has `42px` border-radius, `2px` border, and generous internal padding. Cards stick to the top of the viewport as you scroll, creating a stacking effect like Holyheld.

Layout for each card: Title on left (or top on mobile), description below, optional visual element on the right side.

**Card 1:**
- Title: **"Integrations take months. Ours takes days."**
- Body: **"Drop in our SDK, hit the sandbox, go live. That's it."**

**Card 2:**
- Title: **"Your wallet, your money."**
- Body: **"Connect your existing wallet or create one with us. Your keys are split across multiple secure locations. No single point of failure."**

**Card 3:**
- Title: **"They pay crypto. You get fiat. Same day."**
- Body: **"No conversions to manage, no withdrawals to request, no volatility to worry about."**

**Card 4:**
- Title: **"Gas fees kill conversions. We killed gas fees."**
- Body: **"Your customers use their external wallet and approve transactions without paying any gas."**
- Special: Word-by-word opacity reveal animation on the title

**Card 5:**
- Title: **"Every wallet. Only the tokens that matter."**
- Body: **"Customers pay from any wallet with the crypto they already hold. You integrate once."**

**Card 6:**
- Title: **"Crypto security is hard. Your money shouldn't be."**
- Body: **"Once a payment settles, it's yours. No chargebacks, no disputes, no money walking back out the door."**

**Card 7:**
- Title: **"Crypto is a compliance headache. Fiat isn't."**
- Body: **"We're settlement infrastructure. Crypto never touches your books. You receive fiat, same as any other payment method."**

**Card 8:**
- Title: **"Support means tickets. Not here."**
- Body: **"You talk to engineers who actually built the thing."**

**Card 9:**
- Title: **"One way to pay is limiting. We give you all of them."**
- Body: **"One click if you're logged in. Connect a wallet, scan a QR, or send direct if you're not. Your choice, same speed."**

**Card 10:**
- Title: **"Checkouts are complicated. Ours is two taps."**
- Body: **"The entire checkout lives inside the payment button. No redirects, no forms, no pages between your customer and their purchase."**

**Card 11:**
- Title: **"Questions shouldn't drag on."**
- Body: **"Book a call, speak with the team, and get clear answers without sales layers."**
- CTA button: **"Book a Call"** (primary style)

### 4. FOOTER
- Dark background (`#1a1a1a`)
- Logo + tagline: **"Your payments. Your way."**
- Links column: FAQ, Security, Legal
- Social column: Twitter/X link
- Support: "Live chat" or "support@spacepay.com"
- Bottom disclaimer text in small muted text
- Border-radius on top corners: `42px` (like Holyheld's footer card feel)

---

## TECHNICAL REQUIREMENTS

- Next.js App Router with TypeScript
- Tailwind CSS v4 for all styling (use the @theme inline block in globals.css for design tokens)
- All components as separate files in `src/components/`
- Responsive: mobile-first, breakpoints at 768px and 1280px
- Sticky scroll card effect: use CSS `position: sticky` with calculated `top` values, or a lightweight scroll handler
- Intersection Observer for fade-in animations (no heavy animation libraries)
- No external dependencies beyond what's already installed
- Static page — no API calls, no client-side data fetching
- Accessible: semantic HTML, proper heading hierarchy, ARIA labels on interactive elements

## FILE STRUCTURE
```
src/
  app/
    page.tsx          — Main page composing all sections
    layout.tsx        — Root layout (Inter font, metadata)
    globals.css       — Tailwind imports + design tokens
  components/
    Navbar.tsx        — Fixed nav bar
    Hero.tsx          — Hero section
    FeatureCards.tsx   — Sticky scroll card stack (all 11 cards)
    Footer.tsx        — Dark footer
```

## KEY INSTRUCTION
The overall feel should be clean, premium, white-space-heavy, and modern — exactly like holyheld.com. Not dark theme. Not busy. Not corporate. Rounded, friendly, smooth. Every section should breathe. The sticky stacking cards are the signature interaction — get this right.
