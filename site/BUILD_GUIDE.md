# KVG Enterprises — Page Builder's Guide

**For the 9 page-builder agents working in parallel.** This is your contract. Do not invent CSS — every visual belongs to a class in `/css/`. Copy the markup below verbatim and fill the content. If a component is missing here, read `/css/components.css` before writing new markup.

Design tokens: `/css/tokens.css` · Base layer: `/css/base.css` · Components: `/css/components.css` · Behaviour: `/js/main.js` · Skeleton: `/_template.html`.

---

## 0. How to build a page

1. Copy `_template.html`.
2. Replace the SEO tokens in `<head>` (see §SEO below): `{{PAGE_TITLE}}`, `{{PAGE_DESCRIPTION}}`, `{{PAGE_PATH}}`, `{{OG_TYPE}}`, `{{OG_IMAGE}}`, and inject page schema at `{{PAGE_JSONLD}}`.
3. Replace `{{CONTENT}}` inside `<main id="main">` with your page body (sections below).
4. Set the active nav item (see §Active-nav convention).
5. The pre-footer CTA band, footer, quick-contact and WhatsApp float are ALREADY in the template — do not re-add them.
6. Every page gets **exactly one `<h1>`**, and it lives in your content (usually inside the page-title band or hero). The template ships zero `<h1>` on purpose.

### Company facts — use these EXACT values (never improvise)

| Field | Value |
|---|---|
| Legal name | **KVG Enterprises Pvt. Ltd.** (never the legacy misspelling) |
| Business | Manufacturer & supplier of moulds, variables, spare parts and allied equipment for the container glass industry (also serves tableware glass) |
| Address | B-43, Sector 2, Noida – 201301, Uttar Pradesh, India |
| Phone (link) | `tel:+911204120001` |
| Phone (display) | `+91 120 4120 001` |
| Email | `contact@kvgindia.com` |
| WhatsApp | `https://wa.me/911204120001` — add `<!-- TODO: confirm WhatsApp number with KVG -->` at every use |
| Tagline | Knowledge • Value • Growth (K=orange, V=green, G=blue — via tokens/classes only) |
| Stats | 100+ yrs combined expertise · 40+ yrs individual leadership · 11 product lines · 4 industries |
| Industries | Food · Beverage · Spirits · Pharmaceutical |
| Vision | "Provide cost effective & highest quality Products in the shortest possible Lead time" |

### Honesty rules (spec §5.9 — non-negotiable)

- **No fake certifications, no fake testimonials, no invented client names. Ever.**
- Spec-table values you write must be plausible for IS-machine glass equipment: gob configs **SG/DG/TG/QG**, centre distances **3″–6¼″**, **QC/Non-QC**, materials **CI / SG Iron / Aluminium / Minox**.
- **Every spec table gets this footnote:** `Specifications shown are representative — confirm against KVG engineering drawings.`

---

## 1. Product taxonomy (memorise — used in nav, footer, breadcrumbs, URLs)

| Category (URL) | Products (slug) |
|---|---|
| Moulds & Mould Equipment `/products/moulds/` | Glass Moulds `glass-moulds` · Blanks `blanks` · Mould Holders `mould-holders` |
| Blank-Side Equipment `/products/blank-side/` | Baffles `baffles` · Funnels `funnels` · Plungers `plungers` · Thimbles `thimbles` |
| Neck Rings & Closure Systems `/products/neck-rings/` | Guala & Nip Cap Neck Rings `guala-neck-rings` · Neck Ring Holders `neck-ring-holders` · Lock Rings `lock-rings` |
| Blow-Side Equipment `/products/blow-side/` | Blow Heads `blow-heads` |

Product detail URL pattern: `/products/{category}/{product}/`.

---

## 2. Assets created (in `/assets/`)

| File | Use |
|---|---|
| `logo.svg` / `logo-white.svg` | Header (dark logo) / footer (white logo) |
| `favicon.svg` | Tab icon (bar mark) |
| `world-map-dots.svg` | Watermark in CTA band & footer (already wired in template) |
| `hero-placeholder.svg` | Homepage/hero background (1920×900) — replace with real photography |
| `glass-moulds.svg` `blanks.svg` `mould-holders.svg` `baffles.svg` `funnels.svg` `plungers.svg` `thimbles.svg` `guala-neck-rings.svg` `neck-ring-holders.svg` `lock-rings.svg` `blow-heads.svg` | 11 product images (800×800) — product cards + detail pages |
| `cat-moulds.svg` `cat-blank-side.svg` `cat-neck-rings.svg` `cat-blow-side.svg` | 4 category images (1200×675) — category cards & page-title bands |
| `ind-food.svg` `ind-beverage.svg` `ind-spirits.svg` `ind-pharma.svg` | 4 industry tiles (800×600) |

**Every `<img>` needs a unique, descriptive `alt`** (Appendix A). Decorative images (watermarks, scrims) use `alt=""`.

### 2a. Real photography (live) — `/assets/img/*.jpg`

All content imagery (hero, industries, categories, products, facility, about story) now uses **real free-license stock photographs** downloaded to `/assets/img/` (sources: Pexels, `images.pexels.com`). The original line-art SVGs in `/assets/` are **kept as fallback assets** — do not delete. Wiring rules:

- Hero background → `/assets/img/hero-home.jpg` (under the existing `.hero__scrim`; `alt=""`, `width="1920" height="1080"`).
- Industry tiles (4:3) → `/assets/img/ind-{food,beverage,spirits,pharma}.jpg` (keep tile scrim + label overlay).
- Category cards (16:9) → `/assets/img/cat-{moulds,blank-side,neck-rings,blow-side}.jpg`.
- Product cards + detail hero (1:1) → `/assets/img/{product}.jpg`. **Same product uses the same photo everywhere site-wide.**
- Detail-page variant galleries **reuse the parent product photo**; each variant/main image in a detail page is preceded by the HTML comment `<!-- representative stock photograph — replace with KVG product photography -->`.
- Facility strip + about story → `/assets/img/facility-{shopfloor,cnc,patternshop,inspection}.jpg` and `/assets/img/about-story.jpg` (block images carry `width`/`height` for CLS).

`<meta og:image>` / `twitter:image` and JSON-LD `"image"` values still point to the `.svg` assets (unchanged — do not break existing JSON-LD). Alt text keeps the honest "representative" caveat since these are stock stand-ins, not KVG's own product photography.

---

## 3. Component snippets (copy-paste)

### 3.1 Eyebrow + heading + tricolor bar (the section-head pattern)

```html
<div class="section-head">
  <p class="eyebrow">Product Range</p>
  <h2>Explore Our Product Lines</h2>
  <span class="tricolor-bar"></span>
</div>
```
- Center it: add `section-head--center` to the wrapper (bar auto-centers).
- Sub-section single-color bar: `<span class="tricolor-bar tricolor-bar--single"></span>`.
- Eyebrow chip variant: `<p class="eyebrow eyebrow--chip">…</p>`.
- **The eyebrow is a `<p>`, NEVER a heading element.**

### 3.2 Hero (homepage only)

```html
<section class="hero">
  <div class="hero__media"><img src="/assets/img/hero-home.jpg" alt="" width="1920" height="1080"></div>
  <div class="hero__scrim"></div>
  <div class="container"><div class="hero__inner">
    <p class="eyebrow">Container Glass Industry &middot; Noida, India</p>
    <h1 class="text-display">Precision Moulds &amp; IS Machine Variables that Keep Your Lines Running</h1>
    <p class="hero__sub">Moulds, variables and spare parts engineered for container and tableware glass production.</p>
    <div class="hero__actions">
      <a class="btn btn--primary btn--lg" href="/products/">Explore Products</a>
      <a class="btn btn--outline-white btn--lg" href="/contact/">Request a Quote</a>
    </div>
  </div></div>
</section>
```

### 3.3 Tagline band (homepage, directly under hero)

```html
<div class="tagline-band"><div class="container tagline-band__inner">
  <span class="tagline-item tagline-item--k">Knowledge</span>
  <span class="tagline-item tagline-item--v">Value</span>
  <span class="tagline-item tagline-item--g">Growth</span>
</div></div>
```

### 3.4 Page-title band + breadcrumb (EVERY interior page)

```html
<nav class="breadcrumbs container" aria-label="Breadcrumb" style="padding-top:var(--space-5)">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/products/">Products</a></li>
    <li><a href="/products/neck-rings/">Neck Rings &amp; Closure Systems</a></li>
    <li aria-current="page">Guala &amp; Nip Cap Neck Rings</li>
  </ol>
</nav>
<section class="page-title-band"><div class="container page-title-band__inner">
  <p class="eyebrow">Product Range</p>
  <h1>Guala &amp; Nip Cap Neck Rings</h1>
</div></section>
```
Photo variant: `<section class="page-title-band page-title-band--photo">` with an `<img>` first inside `page-title-band__inner`'s parent. Pair every breadcrumb with `BreadcrumbList` JSON-LD (§SEO).

### 3.5 Product card

```html
<article class="product-card reveal">
  <a class="product-card__media" href="/products/moulds/glass-moulds/"><img src="/assets/img/glass-moulds.jpg" alt="Glass moulds for IS machines — representative image"></a>
  <div class="product-card__body">
    <span class="tag-chip">Moulds</span>
    <h3 class="product-card__title"><a href="/products/moulds/glass-moulds/">Glass Moulds</a></h3>
    <p class="product-card__desc">Blank and blow moulds for IS machines, in CI, SG Iron and Aluminium.</p>
    <div class="product-card__footer">
      <a class="link-arrow" href="/products/moulds/glass-moulds/">View Details</a>
      <a class="btn btn--ghost" href="/contact/?product=glass-moulds">Enquire</a>
    </div>
  </div>
</article>
```
Grid wrapper: `<div class="grid-cards"> … </div>` (auto 4/3/2/1-up). The `?product=<slug>` pre-checks that product on the contact form (see §4).

### 3.6 Category card (products hub)

```html
<article class="category-card">
  <a class="category-card__media" href="/products/neck-rings/"><img src="/assets/img/cat-neck-rings.jpg" alt="Neck rings and closure systems — representative image"></a>
  <div class="category-card__body">
    <h3 class="category-card__title">Neck Rings &amp; Closure Systems</h3>
    <span class="category-card__count">3 product lines</span>
    <p class="text-muted">Guala neck rings, holders and lock rings for a reliable closure finish.</p>
    <div class="category-card__footer"><a class="link-arrow" href="/products/neck-rings/">View category</a></div>
  </div>
</article>
```
Grid: put 4 category cards in `<div class="grid-cards">` (or `grid` with `col-3`/`col-6`).

### 3.7 Specification table (product & category pages)

```html
<div class="spec-table-wrap">
  <table class="spec-table">
    <caption>Glass moulds — representative configurations</caption>
    <thead>
      <tr><th scope="col">Configuration</th><th scope="col">Centre distance</th><th scope="col">Gob</th><th scope="col">QC</th><th scope="col">Material</th><th scope="col">Enquire</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Blank mould</th><td class="num">4 1/4"</td><td>DG</td><td><span class="spec-check">&#10003;</span></td><td>CI</td><td><a class="spec-request" href="/contact/?product=glass-moulds">Request &rarr;</a></td></tr>
      <tr><th scope="row">Blow mould</th><td class="num">5 1/2"</td><td>TG</td><td><span class="spec-none">&mdash;</span></td><td>SG Iron</td><td><a class="spec-request" href="/contact/?product=glass-moulds">Request &rarr;</a></td></tr>
    </tbody>
  </table>
</div>
<p class="spec-footnote">Specifications shown are representative &mdash; confirm against KVG engineering drawings.</p>
```
- Numerics/part numbers → `class="num"` (renders IBM Plex Mono, tabular).
- Availability yes → `<span class="spec-check">&#10003;</span>`; no → `<span class="spec-none">&mdash;</span>`.
- First column is `<th scope="row">` (sticky on mobile). **The footnote is mandatory.**

### 3.8 Stats counter band (triad coloring)

```html
<section class="section stats-band"><div class="container">
  <div class="stats-grid">
    <div class="stat"><div class="stat__value stat__value--k" data-count="100" data-count-suffix="+">0</div><div class="stat__label">Years combined expertise</div></div>
    <div class="stat"><div class="stat__value stat__value--v" data-count="40" data-count-suffix="+">0</div><div class="stat__label">Years leadership experience</div></div>
    <div class="stat"><div class="stat__value stat__value--g" data-count="11">0</div><div class="stat__label">Product lines under one roof</div></div>
    <div class="stat"><div class="stat__value stat__value--k" data-count="4">0</div><div class="stat__label">Industries served</div></div>
  </div>
</div></section>
```
`data-count` drives the count-up (respects reduced-motion). Optional: `data-count-suffix`, `data-count-prefix`, `data-count-decimals`. Rotate `--k`/`--v`/`--g` for the triad.

### 3.9 Pillar cards (Knowledge / Value / Growth)

Use the dedicated `.pillar-grid` wrapper (3 equal columns, `align-items:stretch`, cards `height:100%`) so all three cards are **identical size** regardless of copy length. Do NOT use the generic `.grid`/`.col-4` here — that lets the cards render unequal heights.

```html
<div class="pillar-grid">
  <div class="pillar-card pillar-card--k"><h3>Knowledge</h3><p>100+ years of combined expertise and named engineering leadership.</p></div>
  <div class="pillar-card pillar-card--v"><h3>Value</h3><p>Highest quality at a cost advantage — 11 product lines under one roof.</p></div>
  <div class="pillar-card pillar-card--g"><h3>Growth</h3><p>Capacity and NCR logistics engineered for the shortest lead times.</p></div>
</div>
```

### 3.10 Capabilities strip (dark band + world map)

```html
<section class="section section--dark"><div class="container">
  <div class="section-head"><p class="eyebrow">Manufacturing capabilities</p><h2>Precision Under One Roof</h2><span class="tricolor-bar"></span></div>
  <div class="capability-list">
    <div class="capability-item"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="…"/></svg><div><h4>Jyoti CNC turning centres</h4><p>Precision turned components.</p></div></div>
    <!-- BFW vertical milling · in-house patternmaking · computerized scheduling · CI/SG Iron/Aluminium/Minox · Noida/NCR logistics -->
  </div>
</div></section>
```
Use `section--darker` for a `primary-900` band instead of `primary-800`.

### 3.11 Industry tile

```html
<a class="industry-tile" href="/industries/#food">
  <img src="/assets/img/ind-food.jpg" alt="Food glass containers — representative image">
  <div class="industry-tile__scrim"></div>
  <div class="industry-tile__label"><h3>Food</h3></div>
</a>
```
Put 4 tiles in `<div class="grid-cards">`.

### 3.12 CTA variations

Pre-footer CTA band is **already in the template**. For an *in-page* CTA (e.g. product-detail "Request a Quote for {Product}"), reuse the band markup:

```html
<section class="cta-band"><div class="cta-band__map" aria-hidden="true"><img src="/assets/world-map-dots.svg" alt="" width="200" height="100"></div>
  <div class="container cta-band__inner">
    <div class="cta-band__copy"><h2>Request a Quote for Guala Neck Rings</h2><p class="cta-band__sub">Send your drawing — we respond within 48 hours.</p></div>
    <div class="cta-band__actions">
      <a class="btn btn--primary btn--lg" href="/contact/?product=guala-neck-rings">Request a Quote</a>
      <!-- TODO: confirm WhatsApp number with KVG -->
      <a class="btn btn--outline-white btn--lg" href="https://wa.me/911204120001?text=Enquiry%20about%20Guala%20Neck%20Rings" target="_blank" rel="noopener">WhatsApp Us</a>
    </div>
  </div>
</section>
```

### 3.13 RFQ / enquiry form (contact page)

```html
<form class="rfq-form" data-enquiry-form data-validate data-demo-success>
  <div class="form-grid">
    <div class="form-field"><label class="form-label" for="f-name">Name <span class="req">*</span></label><input class="form-input" id="f-name" name="name" type="text" required><p class="form-error">Please enter your name.</p></div>
    <div class="form-field"><label class="form-label" for="f-company">Company <span class="req">*</span></label><input class="form-input" id="f-company" name="company" type="text" required><p class="form-error">Please enter your company.</p></div>
    <div class="form-field"><label class="form-label" for="f-email">Email <span class="req">*</span></label><input class="form-input" id="f-email" name="email" type="email" required><p class="form-error">Please enter a valid email.</p></div>
    <div class="form-field"><label class="form-label" for="f-phone">Phone</label><input class="form-input" id="f-phone" name="phone" type="tel"><p class="form-hint">Include country code, e.g. +91.</p></div>
    <div class="form-field"><label class="form-label" for="f-country">Country</label><input class="form-input" id="f-country" name="country" type="text"></div>
  </div>

  <fieldset class="form-field form-field--full" style="border:0;padding:0">
    <legend class="form-label">Product interest</legend>
    <div class="product-checkbox-grid">
      <label class="checkbox-item"><input type="checkbox" name="product" value="glass-moulds" data-product="glass-moulds"> Glass Moulds</label>
      <label class="checkbox-item"><input type="checkbox" name="product" value="blanks" data-product="blanks"> Blanks</label>
      <label class="checkbox-item"><input type="checkbox" name="product" value="mould-holders" data-product="mould-holders"> Mould Holders</label>
      <label class="checkbox-item"><input type="checkbox" name="product" value="baffles" data-product="baffles"> Baffles</label>
      <label class="checkbox-item"><input type="checkbox" name="product" value="funnels" data-product="funnels"> Funnels</label>
      <label class="checkbox-item"><input type="checkbox" name="product" value="plungers" data-product="plungers"> Plungers</label>
      <label class="checkbox-item"><input type="checkbox" name="product" value="thimbles" data-product="thimbles"> Thimbles</label>
      <label class="checkbox-item"><input type="checkbox" name="product" value="guala-neck-rings" data-product="guala-neck-rings"> Guala &amp; Nip Cap Neck Rings</label>
      <label class="checkbox-item"><input type="checkbox" name="product" value="neck-ring-holders" data-product="neck-ring-holders"> Neck Ring Holders</label>
      <label class="checkbox-item"><input type="checkbox" name="product" value="lock-rings" data-product="lock-rings"> Lock Rings</label>
      <label class="checkbox-item"><input type="checkbox" name="product" value="blow-heads" data-product="blow-heads"> Blow Heads</label>
    </div>
  </fieldset>

  <div class="form-field form-field--full"><label class="form-label" for="f-msg">Message <span class="req">*</span></label><textarea class="form-textarea" id="f-msg" name="message" required></textarea><p class="form-error">Please tell us what you need.</p></div>

  <label class="file-upload" for="f-file">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l5 5h-3v6h-4V8H7l5-5zM5 18h14v2H5z"/></svg>
    <span>Drop a drawing / RFQ here or <strong>browse</strong></span>
    <span class="file-upload__hint">PDF, DWG, DXF, STEP, images — up to 20 MB</span>
    <span class="file-upload__name"></span>
    <input id="f-file" type="file" name="attachment" accept=".pdf,.dwg,.dxf,.step,.stp,.png,.jpg,.jpeg">
  </label>

  <label class="consent-check"><input type="checkbox" name="consent" required> I agree to be contacted by KVG about my enquiry.</label>

  <button class="btn btn--primary" type="submit">Request Quote</button>
  <div class="form-success">Thank you — our engineers will respond within one business day.</div>
</form>
```
- `data-enquiry-form` enables `?product=` pre-selection + scroll-to-form.
- `data-validate` enables inline validation; `data-demo-success` shows the success state (prototype only — swap for a real backend at launch).
- **Labels are always visible above fields** — never placeholder-only.

### 3.14 Downloads card

```html
<div class="download-card">
  <img class="download-card__thumb" src="/assets/img/cat-moulds.jpg" alt="">
  <div class="download-card__body">
    <h3 style="font-size:var(--text-h4-size)">KVG Product Brochure</h3>
    <p class="text-muted">Overview of all 11 product lines and capabilities.</p>
    <span class="download-card__meta">PDF &middot; 2.4 MB</span>
    <a class="btn btn--blue btn--sm" href="/downloads/kvg-brochure.pdf" download>Download</a>
  </div>
</div>
```

### 3.15 Team card (icons visible by default)

```html
<article class="team-card">
  <img class="team-card__photo" src="/assets/team-placeholder.jpg" alt="Portrait of [Name], [Role] at KVG Enterprises">
  <div class="team-card__body">
    <span class="team-card__name">[Name]</span>
    <span class="team-card__role">[Role]</span>
    <div class="team-card__links">
      <a href="#" aria-label="[Name] on LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="…"/></svg></a>
      <a href="mailto:contact@kvgindia.com" aria-label="Email [Name]"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="…"/></svg></a>
    </div>
  </div>
</article>
```
Use only **real** names/roles/photos. No placeholder people at launch.

### 3.16 Timeline (About story)

```html
<div class="timeline">
  <div class="timeline-item"><span class="timeline-year timeline-year--k">1998</span><h3>Founded</h3><p class="text-muted">…</p></div>
  <div class="timeline-item"><span class="timeline-year timeline-year--v">2010</span><h3>CNC expansion</h3><p class="text-muted">…</p></div>
  <div class="timeline-item"><span class="timeline-year timeline-year--g">2024</span><h3>11 product lines</h3><p class="text-muted">…</p></div>
</div>
```
Use real, verifiable years only. Rotate the triad classes on `timeline-year`.

### 3.17 FAQ accordion

```html
<div class="faq">
  <div class="faq-item">
    <button class="faq-item__q" type="button">Which IS machines do your moulds fit?<span class="faq-item__icon"></span></button>
    <div class="faq-item__a"><div class="faq-item__a-inner">Engineered for standard IS-machine centre distances from 3&Prime; to 6&frac14;&Prime;.</div></div>
  </div>
</div>
```
JS wires open/close + ARIA automatically. Add `FAQPage` JSON-LD **only** where the Q&A is real (§SEO). Never placeholder Q&A.

### 3.18 Buttons (reference)

| Class | Look | Use |
|---|---|---|
| `btn btn--primary` | Orange fill (accent-600), white text | Primary CTA everywhere |
| `btn btn--secondary` | Green outline → green fill on hover | Secondary action |
| `btn btn--outline-blue` | Blue outline | Secondary on light surfaces |
| `btn btn--outline-white` | White outline | On dark bands / hero / CTA band |
| `btn btn--blue` | Blue fill | Download / neutral emphasis |
| `btn btn--ghost` | Orange text, transparent | Product-card "Enquire" |
| `a.link-arrow` | Blue text with → | "View Details", "View category" |

Modifiers: `btn--sm`, `btn--lg`, `btn--block`.

---

## 4. Behaviour hooks (already handled by `/js/main.js`)

| Attribute / class | Effect |
|---|---|
| `data-count` (+ `-suffix`/`-prefix`/`-decimals`) | Count-up on scroll, reduced-motion safe |
| `class="reveal"` | Subtle fade-up on scroll (one class; add to cards/sections you want revealed) |
| `data-year` | Filled with the current year (footer copyright — already in template) |
| `data-validate` on `<form>` | Inline validation with `.form-error` messages |
| `data-demo-success` on `<form>` | Shows `.form-success` on valid submit (prototype only) |
| `data-enquiry-form` on `<form>` | `?product=<slug>` pre-checks matching `[data-product]` boxes + scrolls to form |
| Mega-menu / dropdown | Opens on hover + focus-within (desktop, CSS); a separate `.nav-caret` button toggles it for keyboard/touch; focus trap + Escape close — driven by `.nav-item.has-panel` (already in template) |

**Nav item structure (has-panel):** the label is always a plain navigating `<a class="nav-link" href="…">` — the caret is a **separate** `<button class="nav-caret" aria-expanded>` sibling (never nested inside the link, never `preventDefault`ed). Clicking the label navigates; the caret only opens/closes the panel. Panels carry an `id` referenced by the caret's `aria-controls` (`mega-products`, `dropdown-about`).

**Header CTA:** the main-bar "Request a Quote" is a plain `<a class="btn btn--primary" href="/contact/">` inside `.header-actions`; a scoped rule keeps it compact and single-line (`white-space:nowrap`, `--header-cta-pad-*`, 15px). Do not wrap it or add extra classes.

**Per-product enquiry loop:** link every product "Enquire" / spec "Request" / detail CTA to `/contact/?product=<slug>`. The contact page's form (with `data-enquiry-form`) pre-checks that product and scrolls into view.

---

## 5. Active-nav convention

On the current section's top-level nav link, add `is-active`:

```html
<li class="nav-item"><a class="nav-link is-active" href="/industries/">Industries</a></li>
```
For Products/About (which have panels), put `is-active` on the `.nav-link` inside the `.nav-item.has-panel`. Map: Home→Home, any `/products/*`→Products, `/industries/`→Industries, `/capabilities/`→Capabilities, `/quality/`→Quality, `/about/*`→About, `/downloads/`→Downloads, `/contact/`→Contact.

> **Shared header & footer are byte-identical across all 26 files** (the only per-page difference is the single `is-active` marker). When you change either block, edit the canonical markup and re-propagate to every page + `_template.html` with an exact between-markers replacement script, then verify with a normalized-hash sweep (strip `is-active`, collapse whitespace → exactly one distinct hash per block).

### Footer structure (5 columns)

The footer is a deliberate 5-column grid (`.footer-grid`): **col-1** brand (`.footer-logo` white logo + `.footer-blurb` + `.footer-tagline`), **col-2** Products part 1 (Moulds + Blank-Side `.footer-catgroup`s), **col-3** Products part 2 (Neck Rings + Blow-Side `.footer-catgroup`s, no repeated title), **col-4** Company link list, **col-5** Contact `.footer-nap`. Footer titles stay non-heading elements (`.footer-col__title` / `.footer-catgroup > span`). Collapses 5→3→2→1 columns at 1024/720/480px. No spacer/phantom column.

### Quick-contact slide-out

`.quick-contact` is a fixed, right-anchored panel translated fully off-canvas when closed (`translateX(100%)`); only its `.quick-contact__tab` (a keyboard-focusable `<button>`, `writing-mode:vertical-rl`) stays visible, flush against the extreme right edge. `.is-open` slides it in; Escape and the close button dismiss it. It must never overlap the header CTA when closed.

---

## 6. SEO per page type (spec §8.1 / §8.4)

Fill these `<head>` tokens. Titles ≤60 chars, descriptions 140–160 chars, **one unique pair per page**.

| Page | Title pattern | Example |
|---|---|---|
| Home | Brand + category + geo | `KVG Enterprises — Glass Moulds & IS Machine Variables, India` |
| Products hub | — | `Products — Moulds, Variables & Spares for Container Glass \| KVG` |
| Category | `{Category} for IS Machines \| KVG Enterprises` | `Neck Rings & Closure Systems for IS Machines \| KVG Enterprises` |
| Product | `{Product} — {qualifier} \| KVG` | `Guala & Nip Cap Neck Rings — Container Glass Moulds \| KVG` |
| Utility (Contact/About/etc.) | Plain purpose + brand | `Contact KVG Enterprises — Noida, India` |

- `{{PAGE_PATH}}` = the page's path with trailing slash, e.g. `/products/neck-rings/`.
- `{{OG_TYPE}}` = `website` (most), `product` (detail pages), `article` (news).
- `{{OG_IMAGE}}` = a per-page real JPEG under `/assets/img/` at 1200×630 (e.g. `/assets/img/hero-home.jpg`, product pages use their own `/assets/img/{slug}.jpg`; product-detail JSON-LD `image` must match). Never the `/assets/*.svg` line-drawings — they render unreliably on social cards.

### Page schema (inject at `{{PAGE_JSONLD}}`)

`Organization` + `Manufacturer` are already site-wide in the template. Add per page:

- **Every interior page → `BreadcrumbList`** matching the visual breadcrumb:
```html
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
 {"@type":"ListItem","position":1,"name":"Home","item":"https://www.kvgindia.com/"},
 {"@type":"ListItem","position":2,"name":"Products","item":"https://www.kvgindia.com/products/"},
 {"@type":"ListItem","position":3,"name":"Neck Rings & Closure Systems","item":"https://www.kvgindia.com/products/neck-rings/"},
 {"@type":"ListItem","position":4,"name":"Guala & Nip Cap Neck Rings","item":"https://www.kvgindia.com/products/neck-rings/guala-neck-rings/"}
]}
</script>
```
- **Product detail pages → `Product`:**
```html
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Product","name":"Guala & Nip Cap Neck Rings","image":"https://www.kvgindia.com/assets/guala-neck-rings.svg","description":"…","brand":{"@type":"Brand","name":"KVG Enterprises Pvt. Ltd."},"material":"CI, SG Iron, Aluminium, Minox","manufacturer":{"@type":"Organization","name":"KVG Enterprises Pvt. Ltd."}}
</script>
```
- **FAQ sections → `FAQPage`** — only where Q&A is genuinely on the page.

---

## 7. DO / DON'T (distilled from Appendix A — the launch QA gate)

**DO**
- One `<h1>` per page, containing the page's primary term. Logical H2→H3 nesting.
- Unique title + meta description on every page. "KVG Enterprises Pvt. Ltd." spelled correctly everywhere.
- Descriptive filename + unique `alt` on every content image; `alt=""` on decorative ones.
- Make every CTA resolve to a real destination. Link per-product enquiry with `?product=<slug>`.
- Keep the pre-footer CTA band + footer on every page (they're in the template — don't delete them).
- Use tokens/classes for all color. Respect the blue/orange text rules (below).
- Give the spec-table footnote on every spec table. Keep spec values plausible.

**DON'T**
- ❌ No placeholder/demo/lorem content, no orphan pages, no dead `#` links (except documented in-progress anchors).
- ❌ No fake certifications, testimonials, client names, or unearned badges — ever.
- ❌ Never set body-size text in `primary-500 #3D86C6` or `accent-500 #E74903` on white (3.9:1 — fails AA). Body text/links use `ink-700` / `primary-600` / `secondary-500` / `accent-600` only. `primary-500` and `accent-500` are for large text (≥24px / ≥18.7px bold) and UI graphics only.
- ❌ Eyebrows are never headings; footer/nav labels are never headings.
- ❌ No text baked into images; headlines/CTAs are always live HTML.
- ❌ No second `<h1>`, no skipped/inverted heading levels.
- ❌ No hover-only interactions; everything must work by touch + keyboard.
- ❌ No hardcoded copyright year (use the template's `data-year`); no mojibake; single `tel:`/`mailto:` format.
- ❌ Don't duplicate desktop/mobile markup — one responsive DOM, CSS breakpoints only.

---

## 8. White-on-color quick card (for choosing button/text placement)

- **White text is safe on:** primary-600/700/800/900, secondary-500/700, accent-600/700.
- **NOT on** primary-500 or accent-500 at body sizes.
- **Charts/triad:** K=accent-500 orange, V=secondary-500 green, G=primary-500 blue (label them).
