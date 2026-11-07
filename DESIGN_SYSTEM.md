# Design system: Stacks + Fs + Objects

The portfolio runs on a small, closed system. Every value lives in
[`src/styles/tokens.css`](src/styles/tokens.css); components use tokens only.
Add `?guides` to any page URL to see the grid and baseline drawn over the page.

One-page summary: [`design-system/cheatsheet.png`](design-system/cheatsheet.png)

## 1. Grid

| Part | Value | Rule |
|---|---|---|
| Margin | 48px (`--edge-margin`) | 24px on phones |
| Columns | 4 (`--col-count`) | 1: identity and labels. 2 + 3: content. 4: negative space |
| Gutter | 24px (`--col-gap`) | Always empty. Inner layouts split columns 2 + 3 on the same gutter |
| Row | 24px | Every line of text is one row |

## 2. Space: three values, line heights included

| Token | Value | Use |
|---|---|---|
| `--space-s` | 8px | Inside a stack: icon to text |
| `--space-m` | 24px | One line: line height, paragraph gap, gutter |
| `--space-l` | 48px | Two lines: margin, section gap |

Every vertical value is a multiple of 24, so text across all four columns sits
on one baseline grid.

## 3. Baseline

- The baseline is measured in the browser, not guessed: `PageShell` sets
  `--bl` (16px text in a 24px line) and `--bl-display` (28px letters).
- The 28px S/R/Iː letters shift by `--bl - --bl-display` to share the 16px baseline.
- Content images snap to a whole number of rows (`object-fit: cover`), so text
  after an image stays on the grid.
- Borders are inset shadows or outlines: they take no height.
- Links are exactly one row tall.

## 4. Type

| Role | Size | Weight |
|---|---|---|
| Display (S/R/Iː) | 28px (`--type-display`) | 700 |
| Heading | 16px (`--type-base`) | 700 |
| Body | 16px | 400 |
| Caption | 13px (`--type-caption`) | 300 |

One line height (24px) for every style. Sentence case. No italics. No letter-spacing.

## 5. Color

| Token | Light | Dark | Use |
|---|---|---|---|
| `--text-primary` | `#1D1D1F` | `#E6E7EA` | Names, headings, selected items |
| `--text-secondary` | `#6E6E73` | `#B0B3B9` | Prose, captions, meta |
| `--link-blue` | `#2563EB` | `#60A5FA` | Primary links (eye-globe icon + underline) |

Color otherwise comes from the work itself: objects and project images.

## 6. Objects

Third primitive, next to stacks and Fs.

- One rendering style, transparent background, sized by token only:
  `--object-size-sm` 48px (two rows), `-md` 96px, `-lg` 160px.
- An object starts on a baseline and ends on a baseline, two rows lower.
  Objects in the same row share one baseline.
- Files: `src/assets/obj-<slug>.webp`.

## 7. Patterns

- **Stack:** a vertical list in one column, aligned left or right (the F).
- **Selected:** bold + underline (Work / Gallery, project toggle, section list).
- **Primary link:** blue eye-globe icon + underline, one row tall.
- **Separator:** ▴. No arrows, no gray rules between content.
- **Theme toggle:** a framed pixel painting at object size (sunset / moon),
  matched in brightness.
- **Header:** S/R/Iː in column 1, the page's toggle in columns 2 + 3. Not sticky.
  On project pages S/R/Iː is the way home.

## 8. Data that stays current

`scripts/github-heatmap.mjs` refreshes the GitHub contribution count and heatmap
before every build, so every deploy.
