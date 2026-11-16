# Anshum Dev — Portfolio

A single-viewport personal site for **Anshum Dev**, AI Engineer & Software Engineer.

The whole site is one screen. The home view never scrolls at any viewport size;
every section opens as a full-viewport overlay instead. The design is set like a
two-colour newspaper front page — newsprint stock, black ink, one vermilion
second ink, and rules doing the work that cards and shadows do elsewhere.

**Live:** https://theanshumdev.site

---

## Running it

```bash
npm install
npm run dev        # dev server
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build
npm run typecheck  # types only
```

Node 20+.

---

## Architecture

```
src/
  content/portfolio.ts     ← ALL copy lives here. Nothing is hard-coded in a component.
  App.tsx                  ← the fixed-viewport grid + overlay host
  components/
    Masthead.tsx           ← nameplate, section index, edition toggle
    Footer.tsx             ← colophon
    panels/                ← the six home columns + the mobile index
    overlays/
      Overlay.tsx          ← the one overlay primitive every section uses
      *Overlay.tsx         ← About / Work / Experience / Skills / Contact
    visual/
      IdentitySculpture.tsx  ← canvas wireframe solid (no 3D library)
      ProjectGlyph.tsx       ← per-project SVG schematics
    ui/Primitives.tsx      ← press furniture: Panel, Slug, Action, Byline, Term…
  hooks/
    useEdition.ts          ← day / night edition, persisted
    usePrefersReducedMotion.ts
    useCopyToClipboard.ts
  styles/index.css         ← design tokens, press furniture, custom variants
scripts/make-og.mjs        ← regenerates public/og.svg and public/og.png
```

### Editing content

Everything — bio, projects, roles, skills, links — is in
[`src/content/portfolio.ts`](src/content/portfolio.ts). Components read from it
and never hold copy of their own. Adding a project is one entry in the
`projects` array; set `featured: true` to promote it to the home page (the home
panel shows the featured ones, the overlay shows all).

### The one-screen rule

`body` is `overflow: hidden` and `#root` is `100dvh`. The home grid uses
weighted rows declared as `minmax(0, Nfr)` — a bare `fr` floors at its content's
min-content height, which lets a dense column steal space from the hero.

Because the composition is height-locked, **height is as much a breakpoint as
width**. Two custom variants in `styles/index.css` trim optional furniture as
the viewport shortens:

| Variant       | Applies at        | What it drops                                          |
| ------------- | ----------------- | ------------------------------------------------------ |
| `short:`      | height ≤ 780px    | hero dateline, role summaries, secondary skill terms    |
| `very-short:` | height ≤ 680px    | the remaining padding slack                             |

Nothing dropped is unique to the home view — all of it is in an overlay.

Below `md` the columns would shrink past legibility, so the home view keeps the
masthead, the lead, the identity plate and a five-entry index; every section is
reached through its overlay.

### Display-utility collisions

Tailwind resolves same-group utilities by source order, so `hidden` alongside a
base `inline-flex` on one element is not reliable. Where a display toggle meets
an element that already carries a display utility, the breakpoint goes on a
**wrapper**. Several comments in the source mark these.

### Theming

Tokens are declared in `@theme` and consumed by utilities as `var(--color-*)`.
The night edition overrides those same variables under `[data-theme='night']`,
so one attribute on `<html>` re-inks every utility — no second class set. The
canvas sculpture reads the tokens from computed style and watches `data-theme`
so it re-inks too.

### Motion

Entrance stagger, overlay transitions and the canvas loop all collapse under
`prefers-reduced-motion: reduce` — the canvas renders one still frame and stops
its `requestAnimationFrame` loop entirely rather than merely animating faster.
The loop also pauses while the tab is hidden.

### Accessibility

- Overlays are `aria-modal` dialogs with a labelled heading.
- Focus moves in on open, is trapped while open, and returns to the opener.
- `Escape` and a backdrop click both close.
- The rest of the app is `aria-hidden` while an overlay is open.
- The skill index is a `tablist` with arrow-key navigation.
- Copy-to-clipboard announces via `aria-live` without moving focus.

---

## Assets

`public/og.png` and `public/og.svg` are generated, not hand-drawn — the
icosahedron in the card is the same projection the live canvas renders:

```bash
npm i -D @resvg/resvg-js   # or sharp; the script tries both
node scripts/make-og.mjs .
```

The script is dependency-free apart from the rasteriser, which is only needed
for the PNG. It is not part of `npm run build`.

---

## Résumé

No résumé PDF ships with this repository, so `resume.available` in
`src/content/portfolio.ts` is `false` and the résumé controls fall back to
"Request résumé" (a `mailto:`) rather than linking to a 404.

To turn the download on: drop the file at `public/resume.pdf` and set

```ts
export const resume = { available: true, url: '/resume.pdf', filename: 'Anshum-Dev-Resume.pdf' };
```

Nothing else needs to change — the masthead, hero and contact overlay all read
that flag.

---

## Content provenance

Everything in `src/content/portfolio.ts` is taken from the previous portfolio's
source (`github.com/Anshum25/anshum-portfolio-2026`), Anshum's public GitHub
profile, or details he supplied directly. No projects, metrics, employers or
achievements are invented. Project repository links were checked to resolve.

---

## Stack

React 19 · TypeScript · Vite 7 · Tailwind CSS 4 · Framer Motion · Lucide.

No 3D library: the identity plate is ~4 KB of hand-written canvas projection
rather than ~600 KB of renderer for one static object. No component library —
the page has eleven primitives and they are all in `ui/Primitives.tsx`.

Set in [Archivo](https://fonts.google.com/specimen/Archivo) (variable `wdth`
axis, condensed to 62.5% for the headlines), [Instrument
Serif](https://fonts.google.com/specimen/Instrument+Serif) italic for the second
voice, and [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
for slugs and bylines.
