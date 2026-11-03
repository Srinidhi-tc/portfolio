# Design system notes

This portfolio's visual tokens are aligned to publicly documented values in
Apple's Human Interface Guidelines (HIG). The notes below cite the exact
HIG sections that informed each decision. Anything not directly published
by Apple is labeled as a portfolio-specific choice.

## Sources

- Apple HIG — Typography:
  https://developer.apple.com/design/human-interface-guidelines/typography
- Apple HIG — Layout:
  https://developer.apple.com/design/human-interface-guidelines/layout
- Apple HIG — Buttons:
  https://developer.apple.com/design/human-interface-guidelines/buttons
- Apple HIG — Materials & color:
  https://developer.apple.com/design/human-interface-guidelines/color
- Apple Developer — System fonts overview:
  https://developer.apple.com/fonts/

## Typography

- Font stack starts with the Apple system stack
  (`-apple-system, BlinkMacSystemFont`) so SF Pro Text / SF Pro Display
  is used on Apple platforms, with Inter / Segoe UI / Roboto as
  cross-platform fallbacks. (HIG → Typography.)
- Type scale variables follow the iOS Dynamic Type defaults: Caption 2
  (11 pt), Caption 1 (12 pt), Footnote (13 pt), Subheadline (15 pt),
  Callout (16 pt), Body (17 pt), Headline (17 pt semibold), Title 3
  (20 pt), Title 2 (22 pt), Title 1 (28 pt), Large Title (34 pt). Sizes
  are translated 1 pt → 1 px at 1× density.
- `font-feature-settings` enables `kern`, `liga`, `calt` for SF Pro's
  built-in kerning and contextual alternates.

## Spacing — 8-point grid

HIG → Layout describes Apple's reliance on an 8-point grid and lists
standard screen-edge margins of 16 pt and 20 pt for iOS. Token values
map 1 pt → 1 px:

| Token         | Value | HIG mapping            |
|---------------|-------|------------------------|
| `--space-xs`  | 4 px  | 4 pt half-step         |
| `--space-sm`  | 8 px  | 8 pt grid unit         |
| `--space-md`  | 16 px | iOS edge margin        |
| `--space-lg`  | 20 px | iOS regular margin     |
| `--space-xl`  | 24 px | 8-pt grid              |
| `--space-2xl` | 32 px | 8-pt grid              |
| `--space-3xl` | 40 px | 8-pt grid              |
| `--space-4xl` | 48 px | 8-pt grid              |
| `--space-5xl` | 64 px | 8-pt grid              |

## Hit targets

HIG → Layout / Buttons states a minimum tappable area of **44 × 44 pt**.
The `--hit-target: 44px` token is enforced via `min-height` on `.btn`,
and button vertical padding is sized so default body-size labels still
yield a 44 pt height.

## Corner radii

Apple uses continuous-corner shapes for many UI elements. CSS
`border-radius` approximates the look. Token values use sizes that are
documented in HIG / SF Symbols guidance:

| Token          | Value | Use                         |
|----------------|-------|-----------------------------|
| `--radius-xs`  | 8 px  | small inline elements        |
| `--radius-sm`  | 10 px | small controls               |
| `--radius`     | 12 px | buttons / cards default      |
| `--radius-lg`  | 16 px | larger surfaces              |
| `--radius-xl`  | 20 px | modals / sheets              |
| `--radius-full`| 9999  | capsule (HIG capsule shape)  |

## Hairlines

HIG → Materials describes 1 pt separators. The `--hairline: 1px` token
is used for borders and dividers across the site.

## Items NOT from Apple HIG

These are portfolio-specific choices and documented here so they aren't
mistaken for HIG values:

- The brand palette (`--bg`, `--accent`, etc.) is a custom warm earth
  scheme.
- Box shadows (`--shadow*`) and the cubic-bezier easing
  (`--ease: cubic-bezier(0.25, 0.46, 0.45, 0.94)`) are portfolio
  choices, not Apple defaults.
- Font fallbacks beyond the Apple system stack (Inter, Segoe UI,
  Roboto) are added for Windows/Android coverage.

## Verifying against HIG

If a future change needs a new HIG-aligned value, follow this rule:
quote it (with a link to the HIG page) in this file, or label it as
portfolio-specific. Don't invent a value attributed to Apple.
