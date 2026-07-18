# KVG Enterprises Pvt. Ltd — Website

Redesigned website for **KVG Enterprises Pvt. Ltd** (kvgindia.com) — manufacturer & supplier of moulds, variables, spare parts and allied equipment for the container glass industry, Noida (NCR), India.

**Status: client-review prototype.** Static HTML/CSS/JS, 25 pages, no build dependencies.

## Structure

```
site/                 ← the website source (root-relative URLs, deploy at a domain root)
  css/tokens.css      ← design tokens (all colors/type/spacing exit through here)
  css/base.css        ← reset, typography, layout primitives
  css/components.css  ← all UI components
  js/main.js          ← vanilla JS behaviours (nav, forms, counters, quick-enquiry)
  assets/             ← logo/SVG assets · assets/img/ = stock placeholder photography
  BUILD_GUIDE.md      ← canonical component markup for adding pages
.github/workflows/    ← GitHub Pages deployment (rewrites root-relative paths for project-site hosting)
```

## Review notes

- Product **spec values are representative** — confirm against KVG engineering drawings before launch.
- Photography is **free-license stock placeholder** (Pexels) — replace with a KVG facility shoot before launch.
- Team page uses role placeholders; WhatsApp number, company LinkedIn and form backend are TODO (marked in source).
- Production launch checklist, 301 redirect map for legacy `.php` URLs, and SEO plan are maintained separately.

## Local preview

```
python -m http.server 4321 --directory site
```
