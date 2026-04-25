# AI Usage Report — SWE 363 Assignment 4

**Student:** Abdurahman Ahmed
**Student ID:** 202044300
**Course:** SWE 363 — Web Engineering & Development
**Assignment:** Assignment 4 — Personal Web Application

---

## 1. Tools Used

| Tool | Primary Use |
|------|-------------|
| **ChatGPT / Claude** | Planning, structure, debugging ideas, documentation drafting, presentation support |
| **GitHub Copilot** *(optional, where applicable)* | Inline code completion for repetitive patterns |
| **Cursor** *(optional, where applicable)* | AI-assisted code editing during refactor passes |

The primary AI assistant used in this assignment was **ChatGPT / Claude** for natural-language thinking partner work. Code completion tools were used only as helpers, not as a source of unmodified code.

---

## 2. Use Cases

I used AI tools across the following parts of the assignment:

- **Understanding assignment requirements** — clarifying rubric expectations and mapping each requirement to a section of the project.
- **Planning the portfolio structure** — brainstorming the section breakdown (Hero → About → Experience → Projects → GitHub → Assistant → Contact → Docs → Presentation → Footer).
- **UI/UX improvement suggestions** — color palette ideas, spacing rhythm, hierarchy, hover/feedback states.
- **Code organization suggestions** — discussing patterns for separating data from rendering, safe `localStorage` helpers, and small utility functions.
- **Debugging ideas** — talking through edge cases like `localStorage` failure, missing GitHub descriptions, and empty filter results.
- **Documentation support** — outlining the structure of the README, technical-documentation, and AI-usage report.
- **Presentation script preparation** — drafting the timing structure, then editing each section by hand.
- **Improving wording for client/project experience sections** — specifically how to describe project-based and freelance work professionally without exposing private client details.
- **Structuring the agentic AI feature** — designing a rule-based recommendation engine that is honest about being rule-based, not LLM-powered.

---

## 3. Benefits

Using AI as an assistant produced clear benefits during this assignment:

- **Faster planning** — I went from a blank page to a clear section plan in minutes.
- **Better organization** — AI helped me identify when a chunk of code or content was getting too large and should be split.
- **More polished wording** — drafting professional copy for sections like "Project & Client Experience" was much faster.
- **More complete documentation** — AI suggestions reminded me to cover edge cases (testing checklist, accessibility, future improvements).
- **Improved feature planning** — the Portfolio Assistant feature came from iterating with AI on what would feel innovative but still be implementable in vanilla JS.
- **Better presentation preparation** — having a structured, timed script removed most of the recording anxiety.

---

## 4. Challenges

AI assistance was not perfect. Real challenges I had to manage:

- **Verifying every suggestion manually** — AI sometimes suggested patterns that were technically fine but inconsistent with the rest of the project. I rejected or rewrote those.
- **Avoiding overcomplicated code** — early suggestions included frameworks, build tools, and unnecessary abstractions. I deliberately stayed in plain HTML/CSS/JS.
- **Avoiding exposure of private client information** — I had to repeatedly steer the assistant to use general phrasing like "private client projects" rather than inventing names.
- **Avoiding fake employment claims** — AI tends to phrase experience as if it were full-time work. I rewrote everything to honestly describe project-based, freelance, and client-based work.
- **Avoiding financial advice language** — for the US market tools section, I had to keep redirecting wording away from "recommendations" or "advice" toward "data exploration" and "decision-support interfaces."
- **Personalizing content** — generic AI text about portfolios needed substantial editing to actually sound like me.
- **Ensuring academic integrity** — I had to make sure I understood every line, especially in the JavaScript.

---

## 5. Learning Outcomes

Going through this assignment with AI as an assistant taught me:

- **Better JavaScript organization** — single `DOMContentLoaded` entry point, clearly numbered sections, small focused helpers.
- **Safer API handling** — always rendering loading, success, error, empty, and retry states explicitly.
- **More professional form validation** — combining inline error messages, ARIA-live feedback, and graceful storage failure handling.
- **More disciplined responsive design** — using CSS variables and a small set of breakpoints rather than ad-hoc media queries.
- **A real documentation workflow** — README → technical docs → AI report → presentation materials, written in that order.
- **A better presentation process** — timed sections, what to click, what to avoid, and a recording checklist.
- **Responsible AI communication** — being explicit about when something is rule-based vs. AI-powered (the Portfolio Assistant is clearly labeled as rule-based).

---

## 6. Responsible Use & Modifications

Concrete things I did to keep my use of AI responsible:

- **I reviewed every suggestion** before adding it to the project.
- **I modified content** to fit my voice and the actual scope of the assignment.
- **I tested the code** in the browser, including error paths (offline mode, invalid form input, empty filters).
- **I made sure I understood every implementation** — I can explain every function in `script.js` from memory.
- **I did not blindly submit unmodified AI output.** Every text section, code block, and design choice was passed through my own review.
- **I avoided revealing private client details** — no client names, no internal screenshots, no confidential descriptions.
- **I avoided financial advice claims** — the US market tools are presented as software and data exploration tools.
- **I kept AI usage transparent** in this report and in the README.

---

## 7. AI Usage Log (representative examples)

| AI Use Case | Prompt / Task | AI Suggestion (summary) | My Modification | What I Learned |
|-------------|---------------|-------------------------|-----------------|----------------|
| Project structure | "How should I split sections for a SWE portfolio?" | Suggested 8 sections incl. blog | Removed blog (out of scope), added Project & Client Experience and Documentation Preview | A portfolio should match what the rubric grades, not generic templates |
| CSS design tokens | "Suggest a clean color system" | Returned 12 colors with multiple gradients | Reduced to 3 accents (teal/blue/violet) + neutrals; built a 60-30-10 system | Restraint reads as professional; too many colors look amateur |
| Project rendering | "How to render dynamic project cards in plain JS?" | Suggested template literal + `innerHTML` | Added `escapeHTML` helper and split rendering by responsibility | Always escape user-derived strings even in static apps — habit matters |
| GitHub API call | "How to handle GitHub API errors?" | Showed try/catch | Added skeleton loader, retry button, and explicit empty state | Loading and error states are not optional polish — they are the feature |
| Portfolio Assistant | "How can a rule-based assistant feel useful?" | Suggested random tips | Replaced with structured 6-field recommendation per topic + persistence | Structure beats variety — users want to compare same fields across topics |
| Form validation | "How to validate contact form?" | Suggested HTML5 only | Added JS validation with inline errors + ARIA + draft auto-save | Native validation alone is insufficient for a polished demo |
| Wording | "Describe my client work professionally" | Suggested invented company names | Rewrote using "private clients", "educational companies", "client-based projects" | Honesty > impressive-sounding fakes; the rubric rewards integrity |
| US market tools | "How to describe a stock screener" | Drafted with the word "advice" | Rewrote as "data exploration" and "decision-support interface" | Disclaimer language matters legally and professionally |
| Presentation script | "Write a 5–7 min portfolio demo script" | Generic template | Rewrote in my own voice with timed segments and exact lines to say | A real script needs personality; templates feel robotic when read aloud |
| Documentation | "Outline a technical-documentation file" | Suggested 12 high-level sections | Added concrete file responsibilities, data flow, edge cases | Documentation is more valuable when specific to *this* code, not generic |

---

## 8. Summary

AI tools were used as a planning, drafting, and reviewing partner — not as a code-writing replacement. Every suggestion was reviewed, edited, tested, and integrated only when it improved the project. The result is a portfolio web application where I can confidently explain every line of HTML, CSS, and JavaScript myself.
