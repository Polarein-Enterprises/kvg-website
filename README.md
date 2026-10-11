# KVG Enterprises Pvt. Ltd — Website

Redesigned website for **KVG Enterprises Pvt. Ltd** (kvgindia.com) — manufacturer & supplier of moulds, variables, spare parts and allied equipment for the container glass industry, Greater Noida (NCR), India.

**Status: client-review prototype.** Static HTML/CSS/JS, 18 pages, no build dependencies. There is no About or Industries page — About was merged into the landing page, Industries was dropped.

## Structure

```
site/                 ← the website source (root-relative URLs, deploy at a domain root)
  css/tokens.css      ← design tokens (all colors/type/spacing exit through here)
  css/base.css        ← reset, typography, layout primitives
  css/components.css  ← all UI components
  js/main.js          ← vanilla JS behaviours (nav, forms, counters, quick-enquiry)
  assets/             ← in-house SVG line art + logo
  assets/products/    ← KVG's own product photography (per product slug)
  assets/exhibition/  ← KVG's own exhibition photos and clips
  assets/photo/       ← web-sized JPEG derivatives cut from the two folders above
  BUILD_GUIDE.md      ← canonical component markup for adding pages
.github/workflows/    ← GitHub Pages deployment (rewrites root-relative paths for project-site hosting)
```

## Imagery — first-party only

**Every image on this site is either KVG's own photography or vector art authored for this
project. No third-party or stock photography is used, and none may be added.**

| Source | What it is |
|---|---|
| `assets/products/**`, `assets/exhibition/**` | KVG's own photographs and clips, supplied by the client |
| `assets/photo/*.jpg` | Web-sized crops cut from those originals — see `Imagery` below |
| `assets/*.svg` | Line art drawn for this project against the brand tokens |
| `assets/logo-mark.png`, `assets/logo*.svg` | KVG's own logo |

The earlier `assets/img/*.jpg` set of free-license stock photographs was **removed**. Three of
those files still carried the photographer's XMP credit and rights fields (one read
*"TUM HAKLARI SAKLIDIR"* — all rights reserved; another *"Use with the permission of the
artist"*). Those strings are ordinary leftovers from a photographer's own workflow and are not
themselves proof of infringement — but the repo held no per-file licence record, so the terms
could not be verified from the files alone. They were replaced rather than argued about.

**If you add an image, it must be KVG's own.** Re-cut derivatives with the script that produced
the current ones rather than serving a 4000 px original directly.

## Review notes

- Product **spec values are representative** — confirm against KVG engineering drawings before launch.
- Team page uses role placeholders; WhatsApp number, company LinkedIn and form backend are TODO (marked in source).
- The map on `/contact/` pins **Site 1 (J-87)** only — add a second pin once the **Site 2 (K-25)** coordinates are confirmed.
- Product `og:image` values are `.webp`, which LinkedIn will not render on a social card. The nine non-product pages use the JPEGs in `assets/photo/`.
- `/contact/?product=<slug>` links exist on 11 pages, but the contact form has no product checkboxes any more, so the pre-select does nothing.
- Production launch checklist, 301 redirect map for legacy `.php` URLs, and SEO plan are maintained separately.

## Company facts

Two works units, both in the same estate:

| | |
|---|---|
| Site 1 | J-87, UPSIDC Surajpur Industrial Area Site-5, Kasna Rd, Block L, Surajpur Site V, Greater Noida – 201312, UP |
| Site 2 | K-25, UPSIDC Surajpur Industrial Area Site-5, Kasna Rd, Block L, Surajpur Site V, Greater Noida – 201312, UP |
| Phone | +91 99102 49102 · +91 98100 06584 |
| Email | pankaj@kvgindia.com |

## Local preview

Any static server rooted at `site/` works, for example:

```
npx --yes serve site -l 4321
```
