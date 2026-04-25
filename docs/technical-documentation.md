# Technical Documentation — Personal Web Application

**Project:** SWE 363 Assignment 4 — Personal Web Application
**Author:** Abdurahman Ahmed (202044300)
**Stack:** HTML5, CSS3, Vanilla JavaScript (ES6+)
**Deployment Target:** GitHub Pages (static hosting)

---

## 1. Architecture Overview

The project is a **static, single-page web application** with no build step and no runtime dependencies. The entire application boots from `index.html`, which loads one stylesheet and one script:

```
index.html          ← semantic HTML structure for all sections
  └─ css/styles.css ← design tokens + component styles + responsive rules
  └─ js/script.js   ← all interactivity, data, and DOM behavior
```

This deliberate simplicity makes the project:

- **Easy to deploy** — open `index.html` directly or host on GitHub Pages.
- **Easy to grade** — a reviewer can read all logic in three files.
- **Easy to explain** — every function fits inside a single `DOMContentLoaded` entry point.
- **Performant** — no framework overhead, no bundler, no third-party HTTP requests at load time.

The website presents:

- Client-based project work
- Educational platform projects
- Dashboard interfaces
- Database-driven systems
- Agentic AI solutions
- US market investment tools (as software / data exploration tools)
- SWE 363 coursework projects

All client and project work is described using general phrasing to respect confidentiality.

---

## 2. File Responsibilities

| File | Responsibility |
|------|----------------|
| `index.html` | Semantic structure — header, sections (Hero, About, Experience, Projects, GitHub, Assistant, Contact, Docs, Presentation), footer. |
| `css/styles.css` | Design system (tokens, light/dark themes), components (buttons, cards, forms), responsive breakpoints, reduced-motion support. |
| `js/script.js` | All interactivity: theme, navigation, project rendering, search/filter/sort, favorites, GitHub API, Portfolio Assistant, contact form. |
| `assets/images/` | Reserved for any future images. Currently icons are rendered with text/emoji to keep the bundle tiny. |
| `docs/technical-documentation.md` | This file. |
| `docs/ai-usage-report.md` | Detailed AI usage log per assignment requirement. |
| `presentation/slides-content.md` | Slide-by-slide content for the demo video. |
| `presentation/demo-video-script.md` | Word-for-word video script. |
| `presentation/recording-checklist.md` | Pre-flight, during, and post-flight checklist for recording. |
| `.gitignore` | Excludes OS, editor, and dependency artifacts. |

---

## 3. HTML Structure

`index.html` uses semantic tags throughout:

- `<header>` for the site header with brand, nav, and theme toggle.
- `<main>` wrapping all content sections.
- `<section id="...">` per logical section, each with its own `<header class="section-head">`.
- `<article>` for repeating cards (skill, experience, project, GitHub repo, doc, presentation).
- `<aside>` for the hero visual and contact info.
- `<footer>` for copyright, links, and meta.

Headings follow a strict hierarchy:

- One `<h1>` (hero title only).
- `<h2>` per top-level section.
- `<h3>` for cards and sub-blocks.

Inputs are all paired with `<label>` elements; visually-hidden labels are used where the placeholder is sufficient visually.

---

## 4. CSS Design System

The stylesheet is organized as 18 numbered sections. The most important ones:

### 4.1 CSS Variables (`:root`)

All colors, spacing, radii, shadows, and motion timings are defined as CSS custom properties. This makes the dark theme a 1-line override: `[data-theme="dark"] { --bg: …; --text: …; }`.

### 4.2 Color System (60-30-10)

- **60% — neutral background:** `--bg`, `--bg-alt`
- **30% — surfaces:** `--surface`, `--surface-2`, `--border`
- **10% — accents:** `--teal` (primary), `--blue`, `--violet`

### 4.3 Components

- Buttons (`.btn`, `.btn-primary`, `.btn-outline`, `.btn-ghost`)
- Cards (`.skill-card`, `.exp-card`, `.project-card`, `.repo-card`, `.doc-card`, `.pres-card`)
- Forms (`.field`, `.error-msg`, `.counter`, `.is-invalid`)
- Status states (`.is-success`, `.is-error`)

### 4.4 Responsiveness

Three primary breakpoints:

- **≤ 980 px** — collapse two-column layouts to one.
- **≤ 720 px** — convert nav into a mobile drawer; reduce paddings.
- **≤ 420 px** — hide brand name, let CTA buttons grow.

### 4.5 Accessibility & Motion

- `:focus-visible` is styled site-wide.
- `prefers-reduced-motion: reduce` disables transitions, animations, and smooth scrolling.

---

## 5. JavaScript Functionality

`js/script.js` is a single file organized into 11 numbered sections inside one `DOMContentLoaded` listener. The structure mirrors the page structure.

### 5.1 Storage Helper (`storage`)

Wraps `localStorage` with try/catch and JSON serialization. Returns `null` (or a fallback) on any failure — the app never crashes if storage is disabled (private browsing mode, quota exceeded).

### 5.2 Theme Management

- Reads `aa_theme` from storage on load, falls back to system preference.
- Applies via `data-theme` attribute on `<html>`.
- Persists choice on every toggle click.

### 5.3 Navigation

- Mobile menu toggle with `aria-expanded` updates.
- `IntersectionObserver` updates the active link as the user scrolls.

### 5.4 Project Data

A single `PROJECTS` array of project objects with these fields:

```js
{ id, icon, title, category, status, year, tech[], description, highlights[], link, linkLabel }
```

This array is the **source of truth**. To add a project, push to this array — no HTML changes needed.

### 5.5 Project Rendering / Search / Filter / Sort

- `getFilteredProjects()` applies the current search query (matches across title, category, description, tech, highlights), category filter, and sort direction.
- `projectCardHTML()` builds a card with proper HTML escaping via `escapeHTML()`.
- `renderProjects()` re-runs filtering and re-renders the grid; favorite buttons are wired up after each render.

### 5.6 Favorite Persistence

A single project ID is stored under `aa_fav_project`. Clicking the same favorite button toggles it off. `renderProjects()` reflects the favorite state with a `.is-fav` class.

### 5.7 GitHub API Integration

- `loadRepos()` calls `https://api.github.com/users/AbuDahim0/repos?per_page=100&sort=updated`.
- Uses `async/await` with a try/catch.
- Renders skeleton placeholders during loading.
- On success: maps repos to `repoCardHTML()` (handles missing descriptions).
- On error: renders an explicit error block with a **Retry** button.
- Status text uses `aria-live="polite"` so screen readers receive updates.

### 5.8 Portfolio Assistant

A rule-based engine with a static `RECOMMENDATIONS` map keyed by topic. Each entry has six structured fields (`focus`, `skills`, `tech`, `tip`, `presentation`, `next`). Generating a recommendation:

1. Reads the selected topic.
2. Renders a structured card with all six fields.
3. Saves the topic key under `aa_last_recommendation`.

On page load, the last recommendation is restored automatically.

### 5.9 Contact Form Validation

Validation rules:

| Field | Rule |
|-------|------|
| Name | required, ≥ 2 characters |
| Email | required, must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| Subject | required, ≥ 4 characters |
| Message | required, ≥ 20 characters |

UX features:

- Inline error messages per field (`.error-msg`).
- `is-invalid` class adds a red border + glow.
- Live character counter on the message field.
- Form submission is prevented while invalid.
- On valid submit: shows "Message sent successfully (demo)." and resets form.
- ARIA-live region announces feedback to assistive tech.

### 5.10 Draft Auto-Save

- Every input change saves the form into `aa_contact_draft` (debounced 250 ms).
- On load, the draft is restored if present.
- "Clear Draft" wipes both the form and the storage entry, with feedback.

### 5.11 Footer Year

`new Date().getFullYear()` writes into `#footerYear` so the copyright stays current.

---

## 6. Error Handling Strategy

| Surface | Failure Mode | Handling |
|---------|--------------|----------|
| `localStorage` | quota / disabled / SecurityError | `storage.get/set/remove` swallow exceptions; UI uses fallbacks |
| GitHub API | network error / non-2xx / empty body | skeletons → explicit error block → Retry button |
| Form | invalid input | inline errors + ARIA-live feedback |
| Filters | no matching projects | `.empty-state` element with a clear message |
| Rendering | missing fields | `escapeHTML` accepts undefined; ternary fallbacks for description/link |

The application never throws an uncaught error in normal operation.

---

## 7. localStorage Keys

| Key | Purpose | Shape |
|-----|---------|-------|
| `aa_theme` | Light/dark theme preference | `"light" \| "dark"` |
| `aa_fav_project` | Favorited project ID | `string` |
| `aa_contact_draft` | In-progress contact form values | `{ name, email, subject, message }` |
| `aa_last_recommendation` | Last Portfolio Assistant topic | `string` (key into RECOMMENDATIONS) |

All keys are namespaced with `aa_` to avoid collisions on shared domains (e.g., GitHub Pages).

---

## 8. Accessibility Considerations

- Semantic landmarks: `<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
- Strict heading hierarchy.
- All form inputs have associated `<label>` elements.
- ARIA-live regions on form feedback, GitHub status, and Portfolio Assistant result.
- All buttons reachable via keyboard with visible `:focus-visible` outlines.
- Color contrast respects WCAG AA in both themes.
- `prefers-reduced-motion` disables non-essential animations.
- Mobile menu button announces its state via `aria-expanded`.

---

## 9. Performance Considerations

- Zero external libraries — only one CSS file and one JS file.
- Single render pass per filter/sort change (no virtual DOM).
- `IntersectionObserver` instead of scroll listeners.
- `debounce()` on search input and draft auto-save.
- Skeleton loaders prevent layout shift while waiting on the GitHub API.
- No images required — icons use Unicode glyphs / emoji and CSS gradients.

---

## 10. User Guide (per section)

| Section | What the user can do |
|---------|----------------------|
| **Hero** | Read the positioning, click *View Projects* / *Open GitHub* / *Contact Me* |
| **About** | Read the personal summary and skill groups |
| **Experience** | Browse seven project & client experience areas |
| **Projects** | Search, filter by category, sort, and favorite a project (persistent) |
| **GitHub** | Click *Load GitHub Repositories* to fetch live repos; retry on failure |
| **Assistant** | Pick a topic, generate a recommendation; clear or refresh anytime |
| **Contact** | Fill in name/email/subject/message, get inline validation, draft auto-saves |
| **Documentation** | See what each repository document covers |
| **Presentation** | Preview what the demo video will cover |
| **Footer** | Email, LinkedIn, GitHub links + auto-current year |

---

## 11. Testing Notes

Manual testing performed:

- All sections render with no console errors.
- Theme toggle switches and persists across reload.
- Each project filter category produces correct results (including empty state).
- Search across multiple keywords (e.g. "AI", "dashboard", "database") returns expected matches.
- Sort options reorder cards correctly.
- Favorite toggles, persists, and unsets when re-clicked.
- GitHub fetch tested in three states: success, simulated offline (DevTools throttle → offline), and rate-limit-style 403 (manually mocked).
- Contact form rejects empty, short, and invalid email inputs with inline errors.
- Draft auto-save survives reload; *Clear Draft* wipes both form and storage.
- Layout verified at 1440px, 1024px, 768px, and 375px widths.
- Tested in Chrome, Safari, and Firefox.

---

## 12. Known Limitations

- The contact form does not send a real email — it is a demo per assignment scope.
- The Portfolio Assistant is rule-based, not LLM-powered; this is by design and clearly disclosed in the UI.
- The GitHub API has a 60 requests/hour unauthenticated rate limit; the section degrades gracefully when hit.
- Project links for client-based work are intentionally private and shown as badges instead of links.

---

## 13. Future Improvements

- Real backend (Node + Express) so the contact form actually sends email.
- Authentication and persistent backend storage for the Portfolio Assistant.
- Real US market data API integration for the InvestVision project, with caching.
- Optional case-study pages for each project with screenshots and walkthroughs.
- Light analytics (privacy-respecting) to learn which sections visitors engage with.
- Internationalization (Arabic translation alongside English).

---

## 14. How to Add Content

| To add a … | Edit | Notes |
|-----------|------|-------|
| New project | `js/script.js` → `PROJECTS` array | New ID, icon, category that already exists in the filter dropdown (or add an `<option>` in HTML) |
| New experience card | `index.html` → `#experience .experience-grid` | Match the existing `.exp-card` structure |
| New skill group | `index.html` → `#about .skill-groups` | Match the existing `.skill-card` structure |
| New Assistant topic | `js/script.js` → `RECOMMENDATIONS` map + an `<option>` in `#assistantTopic` | Provide all six fields |
| New theme color | `css/styles.css` → `:root` and `[data-theme="dark"]` | Then reference via `var(--…)` |

---

**End of Technical Documentation.**
