# Abdurahman Ahmed — Personal Web Application (SWE 363 Assignment 4)

A complete, polished personal portfolio web application built as the final submission for **SWE 363 — Web Engineering & Development**. The project showcases a full range of front-end skills, real API integration, an agentic AI–inspired portfolio assistant, professional documentation, and a presentation package ready for recording.

---

## 1. Student Information

| Field | Value |
|------|------|
| **Name** | Abdurahman Ahmed |
| **Student ID** | 202044300 |
| **Course** | SWE 363 — Web Engineering & Development |
| **Assignment** | Assignment 4 — Personal Web Application |
| **GitHub Username** | AbuDahim0 |
| **Email** | abdurahman.a.aref@gmail.com |
| **LinkedIn** | https://www.linkedin.com/in/abdurahman-ahmed-909976370/ |

---

## 2. Project Description

This personal web application presents me as a **Software Engineering student and project-based full-stack developer** who has worked on a wide range of practical projects, including:

- Academic coursework projects from SWE 363
- Freelance and client-based web projects
- Educational company platform projects
- Dashboard interfaces for client-based use
- Full-stack project work
- Database-driven systems
- Agentic AI solutions for automation and workflow improvement
- Data science dashboard projects
- US market investment tools and stock filtering / scanning interfaces (presented as software and data exploration tools, **not** as financial advice)

The website is a single-page, responsive application that combines a polished design system, dynamic project rendering, real GitHub REST API integration, an agentic AI–inspired Portfolio Assistant, contact form validation with draft auto-save, and full documentation and presentation materials.

> **Note on client work:** Private client names and confidential details are not revealed. Project work is described using general terms such as *private client projects*, *educational company platforms*, and *client dashboard interfaces*.

---

## 3. Live Demo & Repository

- **Repository:** https://github.com/AbuDahim0/202044300-AbdurahmanAhmed-assignment4
- **Live Demo:** [PASTE GITHUB PAGES LIVE LINK HERE]

Previous SWE 363 assignment repositories included as part of the portfolio progression:

- Assignment 1: https://github.com/AbuDahim0/202044300-AbdurahmanAhmed-assignment1
- Assignment 2: https://github.com/AbuDahim0/202044300-AbdurahmanAhmed-assignment2
- Assignment 3: https://github.com/AbuDahim0/202044300-AbdurahmanAhmed-assignment3

---

## 4. Feature Overview

- **Hero section** with strong professional positioning, call-to-action buttons, and highlight cards.
- **About Me** with grouped technical and professional skill categories.
- **Project & Client Experience** showing freelance, educational, dashboard, US market, agentic AI, database, and academic experience.
- **Projects** rendered dynamically from JavaScript data with:
  - Search by keyword
  - Category filter
  - Sort by newest / oldest / A–Z / Z–A
  - Favorite project saved in `localStorage`
  - Empty-state handling
- **GitHub REST API integration** with loading, success, error, retry, and empty-description handling.
- **Portfolio Assistant** — an agentic AI–inspired rule-based recommendation engine for career growth.
- **Contact form** with full validation, inline errors, character counter, draft auto-save, and graceful storage failure handling.
- **Theme system** with dark/light mode persisted in `localStorage`.
- **Documentation preview** and **Presentation Overview** sections.
- **Accessibility:** semantic HTML, ARIA live regions, keyboard navigation, visible focus states, reduced-motion support.
- **Performance:** zero external libraries, efficient DOM updates, mobile-first responsive layout.

---

## 5. Technologies Used

- **HTML5** — semantic structure
- **CSS3** — design tokens, custom properties, responsive grid/flex layouts, dark/light theming
- **Vanilla JavaScript (ES6+)** — DOM manipulation, fetch API, async/await, localStorage
- **GitHub REST API** — public repositories endpoint
- **GitHub Pages** — static deployment

No frameworks. No build tools. No npm dependencies. Open `index.html` and it works.

---

## 6. Folder Structure

```
202044300-AbdurahmanAhmed-assignment4/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
├── presentation/
│   ├── slides-content.md
│   ├── demo-video-script.md
│   └── recording-checklist.md
└── .gitignore
```

---

## 7. How to Run Locally

**Option A — Open directly:**
1. Clone or download the repository.
2. Double-click `index.html`, or right-click → *Open with* → your browser.

**Option B — Run a tiny local server (recommended for the GitHub API call):**
```bash
# Python 3
python3 -m http.server 8080
# then open http://localhost:8080
```
or
```bash
# Node.js (if installed)
npx serve .
```

No installation, no build, no dependencies.

---

## 8. How to Deploy on GitHub Pages

1. Push the project to your GitHub repository.
2. Go to **Settings → Pages**.
3. Under *Source*, select branch **`main`** and folder **`/ (root)`**.
4. Click **Save**.
5. After ~1 minute, GitHub Pages will publish the site at:
   `https://AbuDahim0.github.io/202044300-AbdurahmanAhmed-assignment4/`
6. Paste this link into the *Live Demo* field above and into the Live Demo section of the website footer.

---

## 9. AI Usage — Short Summary

AI tools (primarily ChatGPT / Claude) were used responsibly to:

- Plan the portfolio structure and section breakdown
- Suggest UI/UX improvements and design language
- Suggest code organization patterns
- Help draft documentation and presentation materials
- Review wording for client experience without exposing private details

Every suggestion was reviewed, modified, and tested. No unmodified AI output was submitted.

A full breakdown is in [`docs/ai-usage-report.md`](docs/ai-usage-report.md).

---

## 10. Testing Checklist

- [x] All sections render with no console errors
- [x] Navigation links scroll smoothly and update active state
- [x] Theme toggle switches and persists across reload
- [x] Project search, filter, and sort all work
- [x] Favorite project persists after refresh
- [x] GitHub API loads, handles errors, and supports retry
- [x] Portfolio Assistant generates recommendations and persists last result
- [x] Contact form rejects invalid input with inline errors
- [x] Contact form draft auto-saves and restores
- [x] Layout is responsive on mobile, tablet, and desktop
- [x] Tested in Chrome, Safari, and Firefox

---

## 11. Assignment Requirement Checklist

- [x] Repository created with correct naming convention
- [x] Clear folder structure with README
- [x] Complete, deployed-ready web application
- [x] Responsive across devices
- [x] Production-quality code with consistent formatting
- [x] Innovation: Portfolio Assistant + dynamic project system
- [x] AI integration with full report (`docs/ai-usage-report.md`)
- [x] Technical documentation (`docs/technical-documentation.md`)
- [x] Presentation materials (slides content + script + checklist)
- [x] Academic integrity respected — all AI usage transparently documented

---

## 12. Presentation Materials

The `presentation/` folder contains everything needed to record the 5–7 minute demo video:

- **`slides-content.md`** — slide-by-slide content for visual aids
- **`demo-video-script.md`** — word-for-word script timed by section
- **`recording-checklist.md`** — pre-recording, demo order, and final export checklist

A real video file (`demo-video.mp4`) should be recorded and added to this folder before final submission.

---

## 13. Academic Integrity

- All code was written and reviewed by me.
- AI tools were used as a thinking and drafting assistant only.
- No content was copied from classmates.
- No private client names, confidential data, or financial advice claims appear anywhere in the project.
- AI usage is transparently documented in `docs/ai-usage-report.md`.

---

**Built with HTML, CSS, JavaScript, and responsible AI assistance.**
