# Amabongo Solutions — Official Design System & UI/UX Specification

**Domain:** `amabongosolutions.co.za`  
**Brand:** Amabongo Solutions Glass Recycling  
**Operational Facility:** 72 C B Downes Rd, Mkondeni, Pietermaritzburg, KwaZulu-Natal, South Africa  
**Document Version:** 2.0 (Production Master)  
**Classification:** Internal UI/UX Standard & Development Reference Manual  

---

## 1. Executive Summary & Brand Identity

### 1.1 Brand Positioning
Amabongo Solutions is an authoritative, industrial South African B2B glass recycling, buying, and furnace-ready cullet supply enterprise headquartered in Mkondeni, Pietermaritzburg. 

The digital identity balances **heavy operational capability** (truckloads, certified weighbridge scales, 34-tonne bulk logistics) with **environmental sustainability** and **instant commercial conversion** for collectors, taverns, depots, and industrial manufacturers.

### 1.2 Core Design Principles
1. **Practical & Authoritative (No Gimmicks):** Avoid decorative illustrations, playful mascots, floating pills/badges, or generic AI templates. Every design element must feel operational, authentic, and grounded in South African industrial commerce.
2. **High-Contrast Clarity:** Ensure instant legibility in harsh outdoor sunlight (for collectors and drivers in the field) as well as executive clarity on commercial desktop screens.
3. **Frictionless Conversion:** Critical paths—pricing per tonne, drop-off depot address, collection minimums, and direct WhatsApp contact—must always be accessible in 1 click.
4. **Mobile-First Utility:** Over 70% of traffic originates from mobile devices (waste collectors, logistics coordinators, local suppliers). Mobile experiences must feature thumb-accessible touch targets ($\ge 44\text{px}$), safe-area insets, and zero horizontal overflow.

---

## 2. Color Palette & Semantic Design Tokens

The Amabongo Solutions color architecture is derived from South African industrial recycling operations: eco-sustainability green, heavy industrial safety yellow for high-conversion CTAs, and commercial trust blue.

### 2.1 Core Palette

| Token Name | Hex Code | RGB | HSL | Semantic Role | WCAG Contrast (on White) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `--color-primary` | `#2E7D32` | `46, 125, 50` | `123°, 46%, 34%` | Brand primary, sustainability cues, icons, trust markers | **5.4:1 (AA Pass)** |
| `--color-accent` | `#FFC107` | `255, 193, 7` | `45°, 100%, 51%` | High-priority conversion CTA, attention accents, alert highlights | **1.2:1 (Use with #212529 text)** |
| `--color-secondary` | `#0D47A1` | `13, 71, 161` | `216°, 85%, 34%` | Supporting corporate links, weighbridge badges, logistics focus | **8.6:1 (AAA Pass)** |
| `--color-background-main` | `#FFFFFF` | `255, 255, 255` | `0°, 0%, 100%` | Primary canvas & content card surface | Baseline |
| `--color-background-alt` | `#F4F6F9` | `244, 246, 249` | `216°, 27%, 97%` | Alternating section backgrounds, table headers, data cards | Subtle contrast |
| `--color-text-primary` | `#212529` | `33, 37, 41` | `210°, 11%, 15%` | Primary heading and high-density body typography | **16.1:1 (AAA Pass)** |
| `--color-text-secondary`| `#6C757D` | `108, 117, 125`| `208°, 7%, 46%` | Secondary body, metadata, captions, subtitles | **4.6:1 (AA Pass)** |
| `--color-text-on-dark` | `#FFFFFF` | `255, 255, 255` | `0°, 0%, 100%` | Text on hero images, primary buttons, and dark footer | **16.1:1 (AAA Pass)** |
| `--color-border-subtle` | `#DEE2E6` | `222, 226, 230` | `210°, 14%, 89%` | Card outlines, dividers, form field borders | Structural border |
| `--color-footer-bg` | `#212529` | `33, 37, 41` | `210°, 11%, 15%` | Industrial dark footer container | Deep anchor |

### 2.2 Functional Status Tokens

| Role | Color | Hex Code | Use Case |
| :--- | :--- | :--- | :--- |
| **Accepted Material / Success** | Green | `#2E7D32` | Accepted bottle glass checkmarks, verified scale payout badges |
| **Rejected Material / Error** | Crimson | `#D32F2F` | Strictly rejected window/windscreen glass notices, form validation errors |
| **Notice / Bulk Incentive** | Amber | `#F57C00` | Minimum tonnage warnings (34t threshold), negotiation prompts |
| **WhatsApp Brand** | Green | `#25D366` | Direct WhatsApp dispatch triggers and floaters |

### 2.3 Virtual Assistant (Chatbot) Dark Theme Tokens

To differentiate the conversational AI interface from marketing pages and preserve contrast inside a floating viewport:

```css
:root {
  --chat-bg-0: #050505;                       /* Deep black canvas */
  --chat-bg-1: #0A0A0A;                       /* Composer and input tray */
  --chat-glass: rgba(15, 23, 42, 0.65);       /* Frosted header and quickbar */
  --chat-stroke: rgba(255, 255, 255, 0.10);   /* Glass border */
  --chat-text-primary: #F8FAFC;               /* Message body text */
  --chat-text-muted: #94A3B8;                 /* Timestamps and secondary prompts */
  --chat-bot-bubble: rgba(30, 41, 59, 0.70);  /* Bot bubble background with 8px blur */
  --chat-user-bubble: linear-gradient(135deg, #10B981, #059669); /* User bubble green gradient */
  --chat-accent: #38BDF8;                     /* Active hyperlinks inside messages */
  --chat-green-glow: #10B981;                 /* Active pulse dot & status indicators */
}
```

---

## 3. Typography Hierarchy & Scale

The typography pairs **Oswald** (a condensed, punchy display sans-serif reflecting heavy industrial branding and logistics signage) with **Roboto** (a versatile, highly legible geometric sans-serif for numbers, tables, and long-form specifications). The digital chatbot utilizes **Inter** and **Space Grotesk** for modern conversational flow.

### 3.1 Font Families
- **Display & Section Titles:** `'Oswald', sans-serif`
- **Body, Navigation, Forms & UI:** `'Roboto', sans-serif`
- **Chatbot & Interactive Assistant:** `'Inter', 'Space Grotesk', system-ui, sans-serif`

### 3.2 Typography Scale Matrix

| Style Token | Font Family | Size (px / rem) | Responsive Clamp | Weight | Line Height | Letter Spacing | Transform |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `display-hero` | Oswald | `61px / 3.8rem` | `clamp(2.4rem, 5vw, 3.8rem)` | 600 | 1.15 | `+1.5px` | UPPERCASE |
| `heading-section (H1/H2)`| Oswald | `45px / 2.8rem` | `clamp(1.85rem, 4vw, 2.8rem)` | 600 | 1.20 | `+1.0px` | UPPERCASE |
| `heading-subsection (H3)`| Oswald | `32px / 2.0rem` | `clamp(1.4rem, 3vw, 2.0rem)` | 600 | 1.25 | `+0.5px` | Normal / Caps |
| `heading-card (H4)` | Oswald | `24px / 1.5rem` | `1.5rem` | 600 | 1.30 | `0px` | Normal |
| `heading-sub (H5/H6)`| Oswald | `18px / 1.125rem`| `1.125rem` | 600 | 1.35 | `0px` | Normal |
| `body-lead` | Roboto | `20px / 1.25rem` | `clamp(1.05rem, 2vw, 1.25rem)`| 400 | 1.60 | `0px` | Normal |
| `body-regular` | Roboto | `16px / 1.0rem` | `1.0rem` (Mobile safe) | 400 | 1.65 | `0px` | Normal |
| `body-small` | Roboto | `14px / 0.875rem`| `0.875rem` | 400 | 1.50 | `0px` | Normal |
| `label-btn` | Roboto | `16px / 1.0rem` | `1.0rem` | 700 | 1.00 | `+0.5px` | UPPERCASE |
| `caption-meta` | Roboto | `12px / 0.75rem` | `0.75rem` | 500 | 1.40 | `+0.25px`| Normal |

---

## 4. Spacing, Elevation, and Structural Grids

### 4.1 8-Point Spatial Grid System
Layout and spacing rely strictly on an 8-point base grid:

```css
:root {
  --space-2xs: 4px;   /* Fine inline gaps and icon shifts */
  --space-xs:  8px;   /* Micro margins, badge padding, chip gaps */
  --space-sm:  16px;  /* Standard padding, compact gutters, card padding (mobile) */
  --space-md:  24px;  /* Card padding (desktop), grid gaps */
  --space-lg:  32px;  /* Section sub-headers, component margins */
  --space-xl:  48px;  /* Section breaks, modal margins */
  --space-2xl: 64px;  /* Standard desktop section padding top/bottom */
  --space-3xl: 96px;  /* Major landing page transition bands */
}
```

### 4.2 Containers & Layout Widths
- **Full-Width Canvas:** `100%`
- **Max Content Container:** `1200px` (with `padding: 0 1.5rem`)
- **Reading / Blog Prose Container:** `780px` centered for optimal line length (60–75 characters per line).
- **Header Heights:** `64px` on desktop ($\ge 992\text{px}$), `56px` on mobile ($< 992\text{px}$).

### 4.3 Corner Radii Tokens
Amabongo Solutions maintains a **clean, disciplined industrial profile** without bubbly rounding:
- `radius-none`: `0px` (Industrial edge containers, table edges)
- `radius-sm`: `4px` (Subtle form input badges, tooltips)
- `radius-md`: `5px` (**Official standard** for primary CTA buttons, form fields)
- `radius-lg`: `8px` (Content cards, pricing boxes, images)
- `radius-xl`: `16px`–`20px` (Chatbot popup container, floating modals)
- `radius-full`: `9999px` (Chatbot toggler button, circular icons, quick-reply pill chips)

### 4.4 Elevation & Shadow Philosophy
- **Flat Industrial Foundation:** Marketing cards, material sections, and pricing tables use crisp `1px solid var(--color-border-subtle)` with zero or subtle shadows (`0 4px 6px -1px rgba(0,0,0,0.05)`).
- **Floating Modals & Chatbot:** Soft, high-contrast dark drop-shadows ensure separation from page content: `box-shadow: 0 20px 50px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.08);`.

---

## 5. Component Library & Design Specifications

### 5.1 Top Navigation & Header
- **Layout:** Sticky top header with `backdrop-filter: blur(8px)`.
- **Left:** High-resolution brand logo with responsive sizing (height 44px on desktop, 36px on mobile).
- **Center:** Clear navigation links in `Roboto 16px 500`. Hover state reveals an understated green indicator (`#2E7D32`).
- **Right:** High-visibility yellow CTA button: `REQUEST A QUOTE` or `CALL US`.
- **Mobile Behavior:** Collapses into an accessible hamburger button on screens $< 992\text{px}$. Drawer slides in from top/left with full screen height and clear link spacing.

### 5.2 Hero Section & Dual CTA Group
- **Visual Foundation:** Dark high-contrast industrial photography overlay (cullet stockpiles, trucks, sorting depot) with `#000000` darkened to 65–75% opacity.
- **Headline Display:** Single `<h1>` in `Oswald`, centered, uppercase, with tight leading.
- **Lead Copy:** 2–3 sentences in `Roboto 20px`, stating exact value proposition: *We buy recyclable bottle glass and supply furnace-ready industrial cullet across KZN and beyond.*
- **CTA Button Group:** Side-by-side on desktop, full-width stacked on mobile:
  - **Primary CTA (`.btn-accent`):** Solid `#FFC107` background, `#212529` bold uppercase text, 5px radius, minimum width `208px`, height `55px`.
  - **Secondary CTA (`.btn-secondary`):** Transparent background, solid 2px `#FFFFFF` border, `#FFFFFF` text, same height and radius.

```html
<div class="hero-cta-group">
  <a href="contact.html" class="btn btn-accent">REQUEST A QUOTE</a>
  <a href="pricing.html" class="btn btn-secondary">VIEW BUYING PRICES</a>
</div>
```

### 5.3 Material Acceptance Matrix
A critical operational component that eliminates wasted customer inquiries:
- **Accepted Column:** Clear `#2E7D32` green checkmarks. Explicitly lists: *Beer & alcohol bottles, wine & spirit bottles, soft drink bottles, food jars, unbroken or crushed cullet, unwashed mixed-colour glass*.
- **Strictly Rejected Column:** Prominent `#D32F2F` red cross badges. Explicitly lists: *Window pane & architectural glass, car windscreens, mirrors, light bulbs, Pyrex, ceramics, tiles, plastics, metal cans*.

### 5.4 Pricing & Scale Payout Cards
- Standard depot purchase rates:
  - **Crushed Bottle Glass Cullet:** `R0.60 / kg` (`R600 per metric tonne`).
  - **Whole / Uncrushed Bottles:** `R0.50 / kg` (`R500 per metric tonne`).
  - **Commercial Bulk Bonus (40–50+ tonnes):** Negotiable up to `R0.65 / kg` (`R650 per tonne`).
- **Trust Elements:** Scale weight verification disclaimer, certified weighbridge readout, instant cash or EFT payout terms.

### 5.5 Collection Logistics & 34-Tonne Threshold System
The logistics qualifier prevents unviable long-distance dispatches:
- **Depot Drop-Off (Mkondeni, PMB):** No minimum quantity. Any bakkie, crate, or trailer welcome.
- **Local PMB & Midlands (< 1–2 hours drive):** ~20 metric tonnes standard truck dispatch load.
- **Long-Distance / Outside KZN (Gauteng, Eastern Cape, etc.):** **STRICT MINIMUM OF 34 METRIC TONNES** (34 x 1-tonne bulk bags). Clear explanation that diesel and toll costs make loads under 34t non-viable.
- **Prerequisites Callout:** Woven 1-tonne polypropylene bags sourced by seller; 3–4 loaders on-site; WhatsApp photos sent before dispatch.

### 5.6 Interactive Quote & Feasibility Calculator
- Clean, high-contrast input controls allowing users to select material type (crushed cullet vs whole bottles), input estimated weight (tonnes), and choose location (Depot drop-off vs local vs long-distance).
- Instantly updates estimated payout in ZAR (`R`) and confirms eligibility.

### 5.7 Virtual Assistant Chatbot (Floating Widget & Mobile Sheet)
The chatbot acts as a 24/7 client qualifying assistant:

#### Host Window Specs (`css/chatbot.css`):
- **Desktop Launcher FAB:** Fixed bottom-right at `bottom: 24px; right: 28px; width: 60px; height: 60px;`, deep forest green `#2E7D32` with pulse glow and robot icon.
- **Desktop Popup Flyout:** Width `420px`, max-width `calc(100vw - 32px)`, height `700px`, max-height `calc(100vh - 130px)`, rounded `20px`, glassmorphic dark container `#0B0F14`.
- **Mobile Responsive Modal ($\le 768\text{px}$):**
  - Converts into a full-screen mobile sheet: `top: 0; left: 0; right: 0; bottom: 0; width: 100dvw; height: 100dvh; border-radius: 0;`.
  - Smooth native slide-up transition: `transform: translateY(100%)` to `transform: translateY(0)`.
  - Mobile background body scroll locked (`overflow: hidden`) while open.
  - Safe-area insets applied to header and composer: `calc(14px + env(safe-area-inset-top, 0px))` and `calc(14px + env(safe-area-inset-bottom, 0px))`.
  - Close button touch target $\ge 40\text{px} \times 40\text{px}$, positioned at top-right without obscuring header title or subtitle.

#### Chatbot Iframe Internal Specs (`chatbot/chatbot.css`):
- **Header:** Logo icon, uppercase company title `AMABONGO SOLUTIONS`, active pulsing green live dot, and subtitle `Your Smart Glass Recycling Partner`. Right padding is reserved (`padding-right: 56px`) so the parent close button never overlaps text.
- **Conversation Stream:** Touch-smooth scrolling (`-webkit-overflow-scrolling: touch; overscroll-behavior: contain;`).
- **Quick-Reply Action Chips:**
  - **On Desktop:** Wrapped chips with max-height containment.
  - **On Mobile:** Horizontally swipeable, single-row pill bar (`flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none;`). Keeps height to a compact ~46px, ensuring the conversation history remains fully visible.
- **Composer & Input:**
  - Input field strictly set to `font-size: 16px` to prevent unwanted iOS Safari viewport auto-zoom.
  - Send button styled as a thumb-sized tactile touch target ($44\text{px}$–$48\text{px}$).
- **Interactive Embeds:** Google Maps embed for Mkondeni depot, photo galleries for cullet types, and instant WhatsApp launch buttons.

### 5.8 Footer & Operational Transparency
- **Background:** Industrial slate `#212529`.
- **Columns:**
  1. Company identity, registration, and BEE status.
  2. Quick navigation links.
  3. Operating hours (Mon–Fri 08:00–17:00, Sat 08:00–15:30) and Mkondeni physical address.
  4. Direct contact details: Mr. A. Mthembu (`064 878 4287`), Mr. T. Shezi (`076 250 7239`), F. Mthembu (`064 814 5432`).
- **Bottom Bar:** Copyright, Privacy Policy, Terms of Service, and Client-Side Chatbot Privacy Disclaimer.

---

## 6. Responsive Breakpoint Strategy

Amabongo Solutions follows a **mobile-first, content-driven responsive grid**:

```
+-------------------+----------------------+--------------------+--------------------+
| Breakpoint Name   | Viewport Width Range | Primary Device     | Key Layout Shift   |
+-------------------+----------------------+--------------------+--------------------+
| Mobile Compact    | < 360px              | Small Androids     | 1 col, 34px logos  |
| Mobile Standard   | 360px – 576px        | Modern Smartphones | Full-screen chat   |
| Tablet / Phablet  | 577px – 768px        | Tablets / Foldables| 2-col cards        |
| Laptop / Small PC | 769px – 991px        | Compact Laptops    | Hamburger nav      |
| Desktop Standard  | 992px – 1199px       | Laptops / Desktops | Full horizontal nav|
| Large Desktop     | >= 1200px            | Widescreen Monitors| 1200px container   |
+-------------------+----------------------+--------------------+--------------------+
```

### 6.1 Mobile Touch & Ergonomics Rules
- **Interactive Targets:** Every button, hamburger icon, quick chip, and form control must measure at least **$44\text{px} \times 44\text{px}$** (WCAG Target Size).
- **Thumb Zone Design:** Primary conversion triggers (Call, WhatsApp, Chatbot launcher) are anchored in the bottom 30% of the screen.
- **Safe Area Insets:** All fixed and full-screen elements must apply `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` to accommodate camera cutouts, Dynamic Islands, and iOS home indicator bars.

---

## 7. Accessibility (a11y) & Performance Guidelines

### 7.1 WCAG 2.1 Level AA Compliance
- **Color Contrast:** All body text maintains $\ge 4.5:1$ contrast against its background; large headlines maintain $\ge 3:1$.
- **Focus Indicators:** Interactive elements display an unmistakable focus ring on keyboard navigation:
  ```css
  *:focus-visible {
    outline: 3px solid #FFC107;
    outline-offset: 3px;
  }
  ```
- **Semantic Structure:** Every page contains exactly one `<h1>`. Section headings descend hierarchically (`<h2>` $\to$ `<h3>` $\to$ `<h4>`).
- **Assistive Technology Labels:** All icon buttons (`.chatbot-toggler`, `.close-btn`, `.nav-toggle`, `#send`) include explicit `aria-label` attributes.

### 7.2 Performance & Asset Budgets
- **Web Fonts:** Oswald and Roboto preconnected to Google Fonts with `font-display: swap`.
- **Image Optimization:** All photographic assets compressed to modern WebP format with explicit `width` and `height` attributes to eliminate Cumulative Layout Shift (CLS).
- **Client-Side Assistant:** Zero external tracker overhead; lightweight local JavaScript rules engine with resilient fallback.

---

## 8. Editorial Tone & Brand Voice

Content and copy must strictly align with `sourceoftruth.txt`:
- **Direct, Pragmatic, Industrial:** Speak the language of hauliers, municipal waste pickers, buy-back depots, and beverage producers. Use clear commercial metrics (metric tonnes, kilograms, weighbridge payouts, bulk bags).
- **Radically Honest Logistics:** Never promise collection for sub-34t loads outside KZN. Clearly explain the economics of diesel and tolls.
- **Warm & Respectful:** Amabongo Solutions works with both informal waste pickers and major corporate partners. Treat every contributor with dignity and prompt commercial respect.

---

## 9. Design System Do's and Don'ts

### Do
- **DO** use `#FFC107` exclusively for the most critical conversion actions.
- **DO** use `#2E7D32` for sustainability cues, brand markers, and verification badges.
- **DO** keep cards flat with crisp 1px borders and generous 16–24px padding.
- **DO** enforce horizontal touch-scrolling quick chips in the chatbot on mobile.
- **DO** provide immediate WhatsApp and phone access for Mr. A. Mthembu and Mr. T. Shezi.

### Don't
- **DON'T** introduce generic emojis or childish illustrations into marketing copy.
- **DON'T** use floating pills, blinking badges, or modern "AI slop" widgets.
- **DON'T** use multi-level gradient backgrounds or decorative drop-shadows on industrial cards.
- **DON'T** make buttons smaller than 44px on mobile devices.
- **DON'T** allow body text to inherit the display font `Oswald`.
- **DON'T** hide collection minimums (20t local, 34t national) behind contact walls.