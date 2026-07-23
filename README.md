# lgcallejask.github.io

A minimalist, typography-focused personal website and blog built with **Jekyll** and hosted on **GitHub Pages**. 

Designed after the aesthetic of **Steph Ango (stephango.com)**, using the **Flexoki** ink & paper color scheme.

---

## Features

- **Minimalist Aesthetic**: Single-column typography-focused layout (max-width `680px`).
- **Flexoki Palette**: Warm paper background (`#FFFCF0`) in light mode and deep inky dark mode (`#101010`).
- **Dark Mode**: Automatic detection of `prefers-color-scheme` with `localStorage` toggle persistence and zero FOUC (flash of unstyled content).
- **Native GitHub Pages**: Zero custom build dependencies or plugins—just push to `main` and GitHub Pages automatically builds the site.
- **Fast & Accessible**: Pure CSS, lightweight HTML, semantic tags, and high-contrast typography.

---

## Directory Structure

```text
.
├── _config.yml          # Site configuration & metadata
├── index.md             # Homepage content
├── about.md             # About page
├── projects.md          # Featured projects page
├── _posts/              # Markdown blog posts (YYYY-MM-DD-title.md)
├── _layouts/            # Master HTML templates (default, home, post, page)
├── _includes/           # Reusable components (head, header, footer)
└── assets/
    └── css/
        └── style.css    # Flexoki design system & responsive CSS
```

---

## Running Locally

### Using Docker (Windows CMD)
```cmd
cd /d D:\git\lgcallejask.github.io
docker run --rm -it -v "%cd%:/srv/jekyll" -p 4000:4000 jekyll/jekyll jekyll serve --host 0.0.0.0 --force_polling
```
Open **`http://localhost:4000`** in your browser.

### Using Docker (PowerShell)
```powershell
docker run --rm -it -v "${PWD}:/srv/jekyll" -p 4000:4000 jekyll/jekyll jekyll serve --host 0.0.0.0 --force_polling
```

### Using Native Jekyll (If Ruby is installed)
```bash
jekyll serve
```

---

## Writing New Posts

To publish a new post, create a file inside `_posts/` with the filename format `YYYY-MM-DD-title.md`:

```markdown
---
layout: post
title: "Title of Your Post"
date: 2026-07-22 10:00:00 -0300
tags: [writing, notes]
---

Write your Markdown content here...
```

---

## Deployment

Simply commit and push your changes to the `main` branch:

```bash
git add .
git commit -m "Publish new post"
git push origin main
```

GitHub Pages will automatically build and publish your site at **https://lgcallejask.github.io**.
