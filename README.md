# kushsaraiya.com

Personal website built with [Astro](https://astro.build).

## Local development

```bash
npm ci
npm run dev
```

Open http://localhost:4321

## Project structure

```bash
src/
styles/global.css         ← entire design system, edit here for anything visual
layouts/BaseLayout.astro  ← shared header, nav, footer
pages/
index.astro               ← home
about.astro               ← about
writing.astro             ← writing list
contact.astro             ← contact
blog/[slug].astro         ← individual article
content/
config.js                 ← content schema
blog/                     ← one .md file per article
```

## Adding a new article

Create a `.md` file in `src/content/blog/`:

```md
---
title: Your Article Title
pubDatetime: '2026-04-01'
description: One line summary.
---

Your content here.
```

## Deploying

Push to GitHub. Cloudflare Pages or GitHub Pages builds automatically.

## License

Code: [MIT](LICENSE) · Content: [CC BY 4.0](LICENSE)
