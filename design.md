---
version: alpha
name: amabongosolutions.co.za
description: Design system for Amabongo Solutions Glass Recycling, a South African industrial recycling site with a high-contrast hero, strong CTA hierarchy, and utility-first content structure.
colors:
  primary: "#ffc107"
  secondary: "#0d47a1"
  tertiary: "#2e7d32"
  background: "#ffffff"
  surface: "#ffffff"
  on-surface: "#212529"
  neutral: "#e5e7eb"
  muted: "#6b7280"
  overlay: "#000000"
  border: "#e5e7eb"
  success: "#2e7d32"
  error: "#d32f2f"
typography:
  headline-display:
    fontFamily: "Oswald"
    fontFallbacks:
      - "Oswald"
      - sans-serif
    fontSize: 61px
    fontWeight: 600
    lineHeight: 69.92px
    letterSpacing: 2px
  headline-lg:
    fontFamily: "Oswald"
    fontFallbacks:
      - "Oswald"
      - sans-serif
    fontSize: 46px
    fontWeight: 600
    lineHeight: 53.76px
    letterSpacing: 1px
  headline-md:
    fontFamily: "Oswald"
    fontFallbacks:
      - "Oswald"
      - sans-serif
    fontSize: 35px
    fontWeight: 600
    lineHeight: 42px
    letterSpacing: 0px
  headline-sm:
    fontFamily: "Oswald"
    fontFallbacks:
      - "Oswald"
      - sans-serif
    fontSize: 26px
    fontWeight: 600
    lineHeight: 31px
    letterSpacing: 0.5px
  body-lg:
    fontFamily: "Roboto"
    fontFallbacks:
      - "Roboto"
      - sans-serif
    fontSize: 20px
    fontWeight: 400
    lineHeight: 30px
    letterSpacing: 0px
  body-md:
    fontFamily: "Roboto"
    fontFallbacks:
      - "Roboto"
      - sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0px
  body-sm:
    fontFamily: "Roboto"
    fontFallbacks:
      - "Roboto"
      - sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0px
  label-lg:
    fontFamily: "Roboto"
    fontFallbacks:
      - "Roboto"
      - sans-serif
    fontSize: 16px
    fontWeight: 700
    lineHeight: 24px
    letterSpacing: 0px
  label-md:
    fontFamily: "Roboto"
    fontFallbacks:
      - "Roboto"
      - sans-serif
    fontSize: 14px
    fontWeight: 700
    lineHeight: 20px
    letterSpacing: 0px
  label-sm:
    fontFamily: "Roboto"
    fontFallbacks:
      - "Roboto"
      - sans-serif
    fontSize: 12px
    fontWeight: 700
    lineHeight: 16px
    letterSpacing: 0px
rounded:
  none: 0px
  sm: 4px
  md: 5px
  lg: 8px
  xl: 16px
  full: 9999px
spacing:
  xs: 8px
  sm: 16px
  md: 32px
  lg: 96px
  xl: 126px
components:
  button:
    primary:
      backgroundColor: "{colors.primary}"
      color: "{colors.on-surface}"
      borderColor: transparent
      borderRadius: "{rounded.md}"
      borderWidth: 2px
      borderStyle: solid
      padding: 12.8px 32px
      fontSize: 16px
      fontWeight: 700
      minWidth: 208px
      minHeight: 55px
      textDecoration: none
      boxShadow: none
      fontFamily: "Roboto"
      fontFallbacks:
        - "Roboto"
        - sans-serif
    secondary:
      backgroundColor: transparent
      color: "#ffffff"
      borderColor: "#ffffff"
      borderRadius: "{rounded.md}"
      borderWidth: 2px
      borderStyle: solid
      padding: 12.8px 32px
      fontSize: 16px
      fontWeight: 700
      minWidth: 208px
      minHeight: 55px
      textDecoration: none
      boxShadow: none
      fontFamily: "Roboto"
      fontFallbacks:
        - "Roboto"
        - sans-serif
  card:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.neutral}"
    borderRadius: "{rounded.lg}"
    borderWidth: 1px
    borderStyle: solid
    padding: "{spacing.sm}"
    boxShadow: "none"
    textColor: "{colors.on-surface}"
---
# Overview

no floating pills or badges at top, blinking dots, emojis, ai slop design

Amabongo Solutions is a practical, industrial B2B recycling brand. The homepage emphasizes immediate value, operational credibility, and environmental responsibility. Visual hierarchy is driven by a large condensed hero headline, a dark photographic overlay, a bright yellow primary CTA, and a secondary outlined CTA.

Use this system for pages that need to convert commercial buyers, depots, and logistics customers quickly. The tone should be direct, confident, and service-oriented rather than promotional.

# Colors

The palette is simple and high-contrast.

- **Primary** `#ffc107`: the signature action color used for the main CTA and emphasis.
- **Secondary** `#0d47a1`: reserved for links and supporting trust signals where blue is appropriate.
- **Tertiary** `#2e7d32`: used sparingly for brand/utility accents and sustainability cues.
- **Background / Surface** `#ffffff`: the default page and card base.
- **On-surface** `#212529`: primary text color.
- **Neutral** `#e5e7eb`: borders, dividers, and low-emphasis structural chrome.
- **Overlay** `#000000`: used with opacity for hero image darkening.
- **Success** `#2e7d32` and **Error** `#d32f2f`: status-only usage.

Guidance:
- Keep the interface mostly white with strong photographic sections.
- Use the yellow primary color only for the most important conversion action.
- Do not introduce additional saturated brand colors unless they are functionally necessary.

# Typography

Typography uses a condensed display face for headings and Roboto for all supporting text.

## Headline styles
- **headline-display**: `Oswald`, 61px, 600, 2px tracking. Use for the hero statement.
- **headline-lg**: `Oswald`, 46px, 600. Use for major section titles.
- **headline-md**: `Oswald`, 35px, 600. Use for subsection headings.
- **headline-sm**: `Oswald`, 26px, 600. Use for cards and feature blocks.

## Body styles
- **body-lg**: `Roboto`, 20px, 400. Use for hero copy and lead paragraphs.
- **body-md**: `Roboto`, 16px, 400. Use for standard body copy and nav content.
- **body-sm**: `Roboto`, 14px, 400. Use for secondary notes and metadata.

## Labels
- **label-lg**: `Roboto`, 16px, 700. Use for CTA buttons and emphasis labels.
- **label-md**: `Roboto`, 14px, 700.
- **label-sm**: `Roboto`, 12px, 700.

Guidance:
- Headings should be uppercase or visually tight where appropriate, matching the industrial character of the brand.
- Keep body copy readable and conversational; avoid overly dense paragraphs.
- Maintain clear size contrast between headline and supporting text.

# Layout

The homepage layout follows a centered hero with strong top navigation.

- Top navigation is horizontal, simple, and left-to-right readable.
- The logo sits in the header with nav links centered/right and a highlighted RFQ button at the far right.
- The hero occupies full width, with a darkened background image and centered content block.
- Hero content is vertically centered and constrained to a moderate column width for readability.
- Primary and secondary buttons sit side by side beneath the hero copy.
- Below the hero, use large section headings and card-based content blocks with generous white space.

Spacing tokens:
- **xs** `8px`: internal icon/text gaps and dense chip spacing.
- **sm** `16px`: card padding and small inter-group spacing.
- **md** `32px`: standard section and component separation.
- **lg** `96px`: large section breathing room.
- **xl** `126px`: major vertical resets between page bands.

Guidance:
- Prefer centered hero alignment for landing pages.
- Keep content width constrained enough to support long-form service descriptions.
- Use generous vertical spacing; the brand should feel spacious and operational, not crowded.

# Elevation & Depth

Depth is minimal and functional.

- Cards use no visible shadow in the current system.
- The hero relies on image contrast and overlay, not elevation.
- Buttons are flat; state changes should come from color and border rather than shadow.
- If shadows are introduced later, keep them subtle and use them only for floating utility elements.

Suggested depth hierarchy:
1. Page background
2. Flat white surfaces/cards
3. Overlaid hero image
4. Floating utility actions only if needed

# Shapes

Shape language is restrained and slightly rounded.

- **none**: 0px, for structural edge cases.
- **sm**: 4px, for subtle controls.
- **md**: 5px, the primary button radius and current brand control shape.
- **lg**: 8px, for cards and larger containers.
- **xl**: 16px, for featured panels if needed.
- **full**: pill or circular badges/chips.

Guidance:
- Use `md` for buttons to match the current visual language.
- Use `lg` for cards to keep surfaces soft but professional.
- Avoid exaggerated rounding on industrial or logistics-focused pages.

# Components

## Primary button
Use for the single highest-priority action, such as `Schedule Pickup` or `Request Quote`.

- Background: yellow
- Text: dark
- Min size: 208px by 55px
- Radius: 5px
- Weight: bold
- No shadow

Rules:
- Place one primary CTA per prominent view whenever possible.
- Use action verbs.
- Do not place the primary button in low-contrast contexts without sufficient surrounding spacing.

## Secondary button
Use for the alternate action beside the primary CTA.

- Transparent background
- White text and white border
- Same size and weight as primary button
- Intended for hero use on dark imagery

Rules:
- Use only on dark or high-contrast backgrounds.
- Keep button pairs aligned and evenly spaced.

## Card
Use for service summaries, accepted materials, process steps, and industry segments.

- White background
- 1px light gray border
- 8px radius
- 16px padding
- No shadow

Rules:
- Keep cards informational and scannable.
- Pair cards with short headings and concise body text.
- Prefer 3–4 cards per row on large screens, collapsing responsively.

## Navigation
- Use plain text links in Roboto.
- Keep active state understated but visible.
- Reserve the highlighted button treatment for the RFQ/contact action.

## Badges / chips
Use pill-shaped labels for trust markers and service callouts.
- Keep them small, light, and functional.
- Pair icon + short text where possible.
- Use full radius and compact spacing.

# Do's and Don'ts

## Do
- Do lead with a single clear conversion goal per page.
- Do use Oswald for headings and Roboto for all supporting text.
- Do keep the hero headline large, centered, and high-contrast.
- Do use the yellow primary button for the most important action.
- Do maintain a mostly white layout with controlled accent usage.
- Do keep content scannable with short sections, cards, and explicit labels.
- Do use plain, direct language that reflects logistics and recycling operations.
- Do keep icon chips and trust badges compact and secondary to the main CTA.

## Don't
- Don't use more than one bright accent color in the same interactive cluster.
- Don't use decorative shadows, gradients, or glassmorphism.
- Don't let body text inherit Oswald or other display styles.
- Don't make buttons smaller than the defined minimums.
- Don't bury the RFQ or pickup action below informational content.
- Don't over-round cards or controls; the brand should remain practical.
- Don't use dense multi-column text blocks in the hero area.
- Don't add playful illustration styles that conflict with the industrial photography and service-led tone.