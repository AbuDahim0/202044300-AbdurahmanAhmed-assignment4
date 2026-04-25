# Demo Video Script — Word-for-Word

**Project:** SWE 363 Assignment 4 — Personal Web Application
**Presenter:** Abdurahman Ahmed (202044300)
**Target Length:** 5–7 minutes
**Read at:** ~140 words per minute, calm pace.

> Read aloud exactly as written. Pause briefly after each section header.
> Click your way through the website while reading the matching section.

---

## 0:00 – 1:00 · Introduction

> Hello everyone. My name is Abdurahman Ahmed, Student ID 202044300, and this is my final submission for SWE 363 — Assignment 4.
>
> I'm a Software Engineering student and a project-based full-stack developer. I build websites, applications, dashboards, educational platforms, database-driven systems, US market tools, and agentic AI solutions for academic, freelance, and client-based projects.
>
> What you're about to see is not just coursework. It's a personal portfolio web application that brings together all of my project experience into one polished, responsive, and professional website — built with vanilla HTML, CSS, and JavaScript only, and ready for GitHub Pages deployment.

---

## 1:00 – 1:45 · Home, About, and Project Positioning

> This is the home page. The hero section introduces my role as a Software Engineering student and project-based full-stack developer, with three call-to-action buttons and a set of highlight cards covering full-stack development, educational platforms, dashboards, database systems, US market tools, agentic AI, and data science.
>
> I'll toggle the theme to show the dark mode — *(click theme toggle)* — and you can see the design system uses CSS variables for both themes.
>
> Scrolling into the About section, I describe my work in my own words, followed by six skill groups: full-stack development, client and freelance work, AI and agentic AI, data science and FinTech, database systems, and UI/UX design. This sets the tone for everything else.

---

## 1:45 – 2:45 · Project & Client Experience

> The next section is *Project & Client Experience*. This is where I present the kind of practical work I've actually done.
>
> First, *Educational Platform Development* — I've built complete platform-style solutions for educational company needs.
>
> Second, *Freelance Full-Stack Web Development* — responsive websites delivered to different clients.
>
> Third, *Client Dashboard and Website Interfaces* — dashboard-style layouts with cards, filters, and clear visual hierarchy.
>
> Fourth, *US Market Investment Tools* — and I want to be very clear about this: these are software and data exploration tools focused on filtering and dashboards. They are not financial advice or investment recommendations.
>
> Fifth, *Agentic AI Solutions* — AI-assisted workflows designed to support automation and decision-making for client needs.
>
> Sixth, *Database-Driven Systems*, and seventh, *SWE 363 Portfolio Development*, which connects all my coursework progression.
>
> All client work is described using general terms because I respect client confidentiality.

---

## 2:45 – 3:45 · Projects Demo

> Now let's look at the Projects section — this is where things get interactive.
>
> Every project card you see is rendered dynamically from a JavaScript array. There's no hardcoded HTML for them.
>
> I'll search — *(type "AI" in the search box)* — and you can see only AI-related projects remain. Now I'll filter — *(open the category dropdown, pick "Data Science / FinTech")* — and the list updates again. Now sort — *(switch to A–Z)* — and the order changes alphabetically.
>
> Let me clear the search. Each card has a favorite button — *(click a star)* — and that favorite is saved to localStorage. If I refresh the page, it stays favorited. *(click again to unfavorite)*.
>
> The featured projects include EduPlatform Pro, ClientHub, InvestVision for US market exploration, AgentFlow for agentic AI, DataCore for database systems, InsightFlow for data science, TaskBridge for full-stack, this very Portfolio itself, and the WebCraft progression of all my SWE 363 assignments.

---

## 3:45 – 4:30 · GitHub API Demo

> The next section integrates the live GitHub REST API. Let me click *Load GitHub Repositories*.
>
> *(click the button)*
>
> You can see a loading skeleton appears immediately, then the real repositories render with name, description, language, stars, forks, and last updated date. The status text up here uses an ARIA-live region so screen readers also receive the update.
>
> If the API ever fails — for example, if I'm offline or if I hit GitHub's rate limit — the section shows an explicit error block with a Retry button instead of breaking. I tested this by toggling offline mode in DevTools.

---

## 4:30 – 5:20 · Agentic AI / Portfolio Assistant Demo

> Next is my innovation feature: the *Portfolio Assistant*.
>
> I want to be transparent — this is an *agentic AI–inspired rule-based assistant*. It does not call an external AI API. Instead, it returns structured recommendations from a curated knowledge base.
>
> Let me pick a topic — *(select "Agentic AI")* — and click *Generate Recommendation*.
>
> *(click)*
>
> You can see a structured card with six fields: Recommended Project Focus, Skills to Improve, Suggested Technologies, Portfolio Improvement Tip, Presentation Advice, and Next Learning Step. The last selected topic is also saved to localStorage, so when you reload the page, your recommendation comes back.

---

## 5:20 – 6:00 · Contact Form Demo

> The Contact section has a fully validated form. Let me first try submitting it empty.
>
> *(click Send Message)*
>
> Inline error messages appear under every required field. Now let me fill it in correctly.
>
> *(fill name, email, subject, and at least 20 characters of message)*
>
> I'll submit again — and there's the success message. The form is also auto-saving drafts to localStorage as I type, so if I close the tab and come back, my draft is restored. There's also a *Clear Draft* button if I want to start fresh, and a live character counter at the bottom.

---

## 6:00 – 6:40 · Technical Deep Dive

> A quick note on the technical side: everything you just saw is built with semantic HTML, a CSS design system using custom properties for light and dark themes, and a single vanilla JavaScript file organized into eleven clearly numbered sections.
>
> I prioritized accessibility — semantic landmarks, ARIA-live regions, keyboard focus styles, and reduced-motion support — and resilience: the app keeps working even if `localStorage` is disabled or the GitHub API fails.
>
> The hardest part was building a polished design system without any framework. The most rewarding part was making the project resilient — every async path has a real loading, error, and retry experience, not just a happy path.

---

## 6:40 – 7:00 · AI Usage, Future Work, and Conclusion

> I used AI tools — primarily ChatGPT and Claude — responsibly throughout this project. I used them for planning, drafting documentation, debugging ideas, and presentation support. I reviewed and modified every suggestion. I did not submit unmodified AI output. Everything is documented in `ai-usage-report.md`.
>
> For future work, I plan to add a real backend, integrate live US market data, and build per-project case studies.
>
> Thank you for watching. The repository link is on screen. I'm Abdurahman Ahmed, and this was my SWE 363 Assignment 4 personal web application.

---

**End of Script.**

> Total approximate read time at calm pace: **~6 minutes 30 seconds**.
> Adjust slightly faster or slower as needed to land between 5 and 7 minutes.
