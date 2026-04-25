/* =========================================================
   Personal Web Application — Abdurahman Ahmed
   SWE 363 Assignment 4
   Vanilla JS — single entry point
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -----------------------------------------------------
     1. CONSTANTS & STORAGE KEYS
  ------------------------------------------------------ */
  const STORAGE_KEYS = {
    theme: "aa_theme",
    favorite: "aa_fav_project",
    contactDraft: "aa_contact_draft",
    lastRec: "aa_last_recommendation",
  };

  const GITHUB_USER = "AbuDahim0";
  const GITHUB_API = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`;

  /* -----------------------------------------------------
     2. SAFE LOCALSTORAGE HELPER
  ------------------------------------------------------ */
  const storage = {
    get(key, fallback = null) {
      try {
        const raw = localStorage.getItem(key);
        return raw == null ? fallback : JSON.parse(raw);
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    },
    remove(key) {
      try { localStorage.removeItem(key); return true; }
      catch { return false; }
    },
  };

  /* -----------------------------------------------------
     3. UTILITIES
  ------------------------------------------------------ */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function debounce(fn, ms = 200) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  }

  function escapeHTML(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatDate(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    return Number.isNaN(d.getTime())
      ? ""
      : d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  }

  /* -----------------------------------------------------
     4. THEME MANAGEMENT
  ------------------------------------------------------ */
  const themeBtn = $("#themeToggle");
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (themeBtn) {
      themeBtn.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
    }
  }
  const savedTheme = storage.get(STORAGE_KEYS.theme)
    || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      storage.set(STORAGE_KEYS.theme, next);
    });
  }

  /* -----------------------------------------------------
     5. NAVIGATION (toggle + active link)
  ------------------------------------------------------ */
  const navToggle = $("#navToggle");
  const navList = $("#navList");

  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const open = navList.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    navList.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        navList.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Active link highlight using IntersectionObserver
  const sections = $$("main section[id]");
  const navLinks = $$('.nav-list a[href^="#"]');
  if ("IntersectionObserver" in window && sections.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
        }
      });
    }, { rootMargin: "-50% 0px -45% 0px", threshold: 0 });
    sections.forEach((s) => obs.observe(s));
  }

  /* -----------------------------------------------------
     6. PROJECT DATA (dynamic source of truth)
  ------------------------------------------------------ */
  const PROJECTS = [
    {
      id: "edu-platform-pro",
      icon: "🎓",
      title: "EduPlatform Pro — Educational Company Platform",
      category: "Educational Technology / Full-Stack",
      status: "Client-Based Project",
      year: 2025,
      tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Dashboard UI", "Platform Architecture"],
      description: "A complete platform-style solution developed for educational company needs. Focused on organizing educational content, creating clear navigation, building responsive pages, and presenting learning-related information professionally.",
      highlights: [
        "Built a complete platform structure for educational use",
        "Designed clean pages for users and administrators",
        "Organized content into clear sections",
        "Improved layouts based on feedback",
        "Focused on responsive design and usability",
        "Delivered a polished educational web experience",
      ],
      link: null,
      linkLabel: "Private client project",
    },
    {
      id: "client-hub",
      icon: "💼",
      title: "ClientHub — Client Website & Dashboard Interfaces",
      category: "Freelance / Full-Stack",
      status: "Client-Based Project Work",
      year: 2025,
      tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "UI/UX", "Dashboard Layouts"],
      description: "A collection of client-based website and dashboard projects focused on delivering clean, responsive, and professional interfaces. Involved understanding client requirements, designing usable layouts, and improving based on feedback.",
      highlights: [
        "Built responsive client websites",
        "Designed dashboard-style interfaces",
        "Communicated with clients to understand requirements",
        "Improved layouts based on feedback",
        "Focused on usability, clarity, and professional design",
        "Delivered organized files and clean structure",
      ],
      link: null,
      linkLabel: "Private client work",
    },
    {
      id: "invest-vision",
      icon: "📈",
      title: "InvestVision — US Market Investment Dashboard",
      category: "Data Science / FinTech",
      status: "Client-Based / Custom Project Work",
      year: 2025,
      tech: ["JavaScript", "Data Filtering", "Dashboard UI", "API Integration Concepts", "Data Visualization Concepts"],
      description: "A custom US market investment-focused dashboard for users who need clear filtering, organized information, comparison views, and readable summaries. Presented as an educational software and data exploration tool — not as financial advice.",
      highlights: [
        "Built custom stock filtering and scanning interfaces",
        "Designed dashboard-style views for market data",
        "Created organized layouts for comparing information",
        "Focused on clarity and usability for investment-related workflows",
        "Combined data filtering, UI/UX, and software engineering",
        "Future direction: integrate with real market data APIs",
      ],
      link: null,
      linkLabel: "Private project",
    },
    {
      id: "agent-flow",
      icon: "🤖",
      title: "AgentFlow — Agentic AI Workflow Solution",
      category: "Artificial Intelligence / Automation",
      status: "Client-Based AI Project Work",
      year: 2025,
      tech: ["Agentic AI Concepts", "JavaScript", "Prompt Engineering", "Workflow Automation", "UI/UX Design"],
      description: "An agentic AI solution designed to support automation, intelligent assistance, and workflow improvement. Demonstrates how AI can support users by guiding tasks, generating suggestions, and improving productivity through structured interactions.",
      highlights: [
        "Built AI-assisted workflow concepts",
        "Designed agent-style interactions for client needs",
        "Used AI to support automation and decision-making",
        "Focused on explainable and responsible AI usage",
        "Improved user experience through guided interactions",
        "Connected AI concepts with practical software solutions",
      ],
      link: null,
      linkLabel: "Private AI project",
    },
    {
      id: "data-core",
      icon: "🗄️",
      title: "DataCore — Database Management System",
      category: "Database Systems",
      status: "Project-Based Work",
      year: 2024,
      tech: ["Database Design", "SQL Concepts", "Data Modeling", "CRUD Logic", "Structured Data"],
      description: "A database-focused project designed to manage structured information through organized entities, relationships, and CRUD-style operations. Demonstrates how databases support real applications.",
      highlights: [
        "Designed structured database models",
        "Planned entities and relationships",
        "Applied CRUD operation concepts",
        "Organized data for application use",
        "Connected database logic with user-facing requirements",
        "Strengthened full-stack development foundation",
      ],
      link: null,
      linkLabel: "Repository link",
    },
    {
      id: "insight-flow",
      icon: "📊",
      title: "InsightFlow — Data Science Dashboard",
      category: "Data Science",
      status: "Project-Based Work",
      year: 2024,
      tech: ["JavaScript", "Data Filtering", "Dashboard Design", "Data Visualization Concepts", "UI/UX"],
      description: "A data science dashboard project focused on organizing, filtering, and presenting information in a useful way. Demonstrates how software can turn data into readable summaries through dashboard-style design.",
      highlights: [
        "Built data-focused dashboard sections",
        "Added filtering and summary logic",
        "Presented information using clean visual cards",
        "Focused on insight-driven UI design",
        "Connected data science concepts with front-end development",
      ],
      link: null,
      linkLabel: "Repository link",
    },
    {
      id: "task-bridge",
      icon: "🧩",
      title: "TaskBridge — Full-Stack Application Concept",
      category: "Full-Stack Development",
      status: "Project-Based / In Progress",
      year: 2025,
      tech: ["HTML", "CSS", "JavaScript", "REST API Concepts", "Database Concepts", "CRUD Logic"],
      description: "A full-stack application concept focused on managing tasks, projects, and workflow through a clean interface and structured data flow. Connects a front-end interface with backend logic and database-backed planning.",
      highlights: [
        "Task and project management concept",
        "CRUD-style workflow",
        "User-friendly dashboard layout",
        "Database-backed planning",
        "Front-end and backend architecture thinking",
        "Future goal: add authentication and persistent database storage",
      ],
      link: null,
      linkLabel: "Repository link",
    },
    {
      id: "portfolio-os",
      icon: "🌐",
      title: "PortfolioOS — Professional Software Engineering Portfolio",
      category: "Web Application",
      status: "Implemented",
      year: 2026,
      tech: ["HTML5", "CSS3", "JavaScript", "GitHub API", "localStorage", "Responsive Design", "Documentation"],
      description: "A professional personal portfolio web application that presents project experience, technical skills, client-based work, AI and data science projects, and software engineering growth. Includes dynamic projects, GitHub API integration, agentic AI–inspired assistant, contact validation, documentation, and presentation materials.",
      highlights: [
        "Responsive single-page web application",
        "Dynamic JavaScript project rendering",
        "GitHub REST API integration",
        "Dark/light theme with localStorage",
        "Contact form validation and draft saving",
        "Complete documentation and presentation support",
      ],
      link: "https://github.com/AbuDahim0/202044300-AbdurahmanAhmed-assignment4",
      linkLabel: "View Repository",
    },
    {
      id: "webcraft-progression",
      icon: "📚",
      title: "WebCraft Progression — SWE 363 Portfolio Series",
      category: "Academic Coursework",
      status: "Completed Coursework",
      year: 2025,
      tech: ["HTML5", "CSS3", "JavaScript", "REST API", "localStorage"],
      description: "A progression of portfolio projects developed through SWE 363 assignments. Each version improved the previous one by adding stronger structure, design, JavaScript interaction, API integration, localStorage, validation, and documentation.",
      highlights: [
        "Assignment 1: HTML and CSS foundation",
        "Assignment 2: JavaScript interaction and theme switching",
        "Assignment 3: API integration, search, filtering, sorting, and validation",
        "Assignment 4: final polished personal web application",
      ],
      link: "https://github.com/AbuDahim0/202044300-AbdurahmanAhmed-assignment3",
      linkLabel: "View Assignment 3",
    },
  ];

  /* -----------------------------------------------------
     7. PROJECT RENDERING / SEARCH / FILTER / SORT / FAVORITE
  ------------------------------------------------------ */
  const grid = $("#projectsGrid");
  const empty = $("#projectsEmpty");
  const searchInput = $("#projectSearch");
  const filterSelect = $("#projectFilter");
  const sortSelect = $("#projectSort");

  let favoriteId = storage.get(STORAGE_KEYS.favorite, null);

  function getFilteredProjects() {
    const q = (searchInput?.value || "").trim().toLowerCase();
    const cat = filterSelect?.value || "all";
    const sort = sortSelect?.value || "newest";

    let list = PROJECTS.filter((p) => {
      const matchesCat = cat === "all" || p.category === cat;
      if (!matchesCat) return false;
      if (!q) return true;
      const haystack = [
        p.title, p.category, p.description,
        ...(p.tech || []), ...(p.highlights || []),
      ].join(" ").toLowerCase();
      return haystack.includes(q);
    });

    list.sort((a, b) => {
      switch (sort) {
        case "oldest": return a.year - b.year;
        case "az":     return a.title.localeCompare(b.title);
        case "za":     return b.title.localeCompare(a.title);
        case "newest":
        default:       return b.year - a.year;
      }
    });

    return list;
  }

  function projectCardHTML(p) {
    const isFav = p.id === favoriteId;
    const techHTML = (p.tech || []).map((t) => `<span>${escapeHTML(t)}</span>`).join("");
    const highlightsHTML = (p.highlights || [])
      .slice(0, 4)
      .map((h) => `<li>${escapeHTML(h)}</li>`)
      .join("");

    const linkHTML = p.link
      ? `<a class="btn btn-outline" href="${escapeHTML(p.link)}" target="_blank" rel="noopener">${escapeHTML(p.linkLabel || "View")}</a>`
      : `<span class="badge">${escapeHTML(p.linkLabel || "Private project")}</span>`;

    return `
      <article class="project-card" data-id="${escapeHTML(p.id)}">
        <div class="project-head">
          <div class="project-icon" aria-hidden="true">${p.icon}</div>
          <h3 class="project-title">${escapeHTML(p.title)}</h3>
        </div>
        <div class="project-meta">
          <span class="badge">${escapeHTML(p.category)}</span>
          <span class="badge badge-status">${escapeHTML(p.status)}</span>
        </div>
        <p class="project-desc">${escapeHTML(p.description)}</p>
        <div class="project-tech">${techHTML}</div>
        <ul class="project-highlights">${highlightsHTML}</ul>
        <div class="project-actions">
          ${linkHTML}
          <button
            type="button"
            class="fav-btn ${isFav ? "is-fav" : ""}"
            data-fav="${escapeHTML(p.id)}"
            aria-pressed="${isFav}"
            aria-label="${isFav ? "Remove favorite" : "Mark as favorite"}"
            title="${isFav ? "Favorited" : "Mark favorite"}"
          >${isFav ? "★" : "☆"}</button>
        </div>
      </article>
    `;
  }

  function renderProjects() {
    if (!grid) return;
    const list = getFilteredProjects();
    if (!list.length) {
      grid.innerHTML = "";
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    grid.innerHTML = list.map(projectCardHTML).join("");

    // Wire up favorite buttons
    $$(".fav-btn", grid).forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-fav");
        favoriteId = (favoriteId === id) ? null : id;
        if (favoriteId) storage.set(STORAGE_KEYS.favorite, favoriteId);
        else storage.remove(STORAGE_KEYS.favorite);
        renderProjects();
      });
    });
  }

  searchInput?.addEventListener("input", debounce(renderProjects, 150));
  filterSelect?.addEventListener("change", renderProjects);
  sortSelect?.addEventListener("change", renderProjects);
  renderProjects();

  /* -----------------------------------------------------
     8. GITHUB API INTEGRATION
  ------------------------------------------------------ */
  const loadReposBtn = $("#loadReposBtn");
  const githubGrid = $("#githubGrid");
  const githubStatus = $("#githubStatus");

  function setGithubStatus(text, state = "") {
    if (!githubStatus) return;
    githubStatus.textContent = text;
    githubStatus.dataset.state = state;
  }

  function showSkeletons(count = 6) {
    if (!githubGrid) return;
    githubGrid.innerHTML = Array.from({ length: count })
      .map(() => `<div class="repo-skeleton" aria-hidden="true"></div>`)
      .join("");
  }

  function repoCardHTML(repo) {
    const desc = repo.description ? escapeHTML(repo.description) : "<em>No description provided.</em>";
    return `
      <article class="repo-card">
        <h3><a href="${escapeHTML(repo.html_url)}" target="_blank" rel="noopener">${escapeHTML(repo.name)}</a></h3>
        <p>${desc}</p>
        <div class="repo-stats">
          <span>🧠 ${escapeHTML(repo.language || "—")}</span>
          <span>⭐ ${repo.stargazers_count}</span>
          <span>🍴 ${repo.forks_count}</span>
          <span>🕒 ${escapeHTML(formatDate(repo.updated_at))}</span>
        </div>
      </article>
    `;
  }

  function renderRepoError(message) {
    if (!githubGrid) return;
    githubGrid.innerHTML = `
      <div class="empty-state" role="alert">
        <p><strong>Couldn't load repositories.</strong></p>
        <p>${escapeHTML(message)}</p>
        <button type="button" class="btn btn-primary" id="retryReposBtn" style="margin-top:1rem;">Retry</button>
      </div>
    `;
    $("#retryReposBtn")?.addEventListener("click", loadRepos);
  }

  async function loadRepos() {
    if (!githubGrid) return;
    setGithubStatus("Loading repositories…");
    showSkeletons();
    try {
      const res = await fetch(GITHUB_API);
      if (!res.ok) throw new Error(`GitHub responded with status ${res.status}`);
      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        githubGrid.innerHTML = `<p class="empty-state">No public repositories found.</p>`;
        setGithubStatus("No repositories available.", "success");
        return;
      }

      githubGrid.innerHTML = data.map(repoCardHTML).join("");
      setGithubStatus(`Loaded ${data.length} repositories.`, "success");
    } catch (err) {
      const msg = (err && err.message) ? err.message : "Network error";
      renderRepoError(msg);
      setGithubStatus("Failed to load. Please retry.", "error");
    }
  }

  loadReposBtn?.addEventListener("click", loadRepos);

  /* -----------------------------------------------------
     9. PORTFOLIO ASSISTANT (rule-based, agentic-AI inspired)
  ------------------------------------------------------ */
  const RECOMMENDATIONS = {
    "agentic-ai": {
      icon: "🤖",
      title: "Agentic AI",
      focus: "Build small agentic workflows that automate one repetitive task end-to-end (input → reasoning → action → result).",
      skills: "Prompt engineering, tool-use design, structured output schemas, responsible AI patterns.",
      tech: "JavaScript, JSON schemas, simple state machines, optional LLM API.",
      tip: "Document the agent's decision logic so reviewers can trust and explain it.",
      presentation: "Demo a single, narrow workflow that succeeds on screen — depth beats breadth.",
      next: "Add explainability — show why the agent chose each step.",
    },
    "data-science": {
      icon: "📊",
      title: "Data Science",
      focus: "Build dashboard features that filter, summarize, and visualize a small clean dataset.",
      skills: "Data filtering, aggregation logic, chart selection, dashboard layout.",
      tech: "JavaScript, lightweight chart approach, JSON datasets.",
      tip: "Pair every chart with a one-line takeaway in plain English.",
      presentation: "Show a live filter changing the dashboard — that's what people remember.",
      next: "Add a date range selector and an export-to-CSV button.",
    },
    "full-stack": {
      icon: "🧱",
      title: "Full-Stack Development",
      focus: "Connect a polished front-end interface with backend logic, APIs, and database-backed persistence.",
      skills: "REST design, CRUD logic, auth concepts, deployment pipelines.",
      tech: "HTML, CSS, JavaScript, Node-style backend, SQL or NoSQL store.",
      tip: "Keep the data model tiny but real — one entity done well beats five half-modeled ones.",
      presentation: "Walk through one end-to-end action: UI click → API → DB → UI update.",
      next: "Add input validation on both client and server.",
    },
    "database": {
      icon: "🗄️",
      title: "Database Systems",
      focus: "Improve a database project by clearly explaining entities, relationships, CRUD operations, and data flow.",
      skills: "ER modeling, normalization basics, indexing intuition, CRUD reasoning.",
      tech: "SQL, ER diagrams, schema migrations.",
      tip: "Draw your ER diagram first; coding becomes 10× faster.",
      presentation: "Show the schema diagram and one query that proves the relationship works.",
      next: "Add a one-to-many relationship and write a JOIN query for it.",
    },
    "ui-ux": {
      icon: "🎨",
      title: "UI/UX Design",
      focus: "Refine spacing, hierarchy, and feedback states across one full user flow.",
      skills: "Visual hierarchy, accessibility, motion restraint, empty states.",
      tech: "CSS variables, Flexbox/Grid, prefers-reduced-motion.",
      tip: "Design the empty, loading, and error states first — it forces real thinking.",
      presentation: "Show before/after of one screen — the contrast tells the story.",
      next: "Audit one page for color contrast and keyboard navigation.",
    },
    "education": {
      icon: "🎓",
      title: "Educational Platforms",
      focus: "Improve educational platforms with role-based sections, content organization, dashboards, and user-friendly navigation.",
      skills: "Information architecture, role-based UI, content modeling.",
      tech: "Modular components, structured content, responsive layouts.",
      tip: "Talk to one real learner and watch them use it — you'll find five problems instantly.",
      presentation: "Demo the learner view and the admin view back-to-back.",
      next: "Add a progress tracker that persists in localStorage.",
    },
    "fintech": {
      icon: "📈",
      title: "Financial Technology / US Market Tools",
      focus: "Improve US market tools with filtering, watchlists, API integration, comparison views, and dashboard summaries — as software, not financial advice.",
      skills: "Data filtering, list management, comparison UI, responsible disclosure language.",
      tech: "JavaScript, fetch API, state management, dashboard patterns.",
      tip: "Always include a clear 'not financial advice' disclaimer in the UI itself.",
      presentation: "Show the watchlist add/remove flow and explain it as data exploration.",
      next: "Integrate a real free market data API and cache responses.",
    },
    "api": {
      icon: "🔌",
      title: "API Integration",
      focus: "Add real third-party API integration with full loading, success, error, and retry states.",
      skills: "fetch + async/await, error categorization, rate limit handling, defensive parsing.",
      tech: "JavaScript fetch, AbortController, exponential backoff (concept).",
      tip: "Always render an error state by hand at least once — never trust 'it'll work in prod'.",
      presentation: "Demonstrate the error path on purpose by toggling offline mode.",
      next: "Cache responses for 60 seconds to feel instant on repeat use.",
    },
    "dashboards": {
      icon: "📋",
      title: "Client Dashboards",
      focus: "Design dashboards with strong information hierarchy, clear KPI tiles, and filterable tables.",
      skills: "Layout systems, visual hierarchy, table interaction, density tuning.",
      tech: "CSS Grid, responsive cards, filterable lists.",
      tip: "Three KPIs at the top is enough — more dilutes attention.",
      presentation: "Walk through how a client would answer one real question using your dashboard.",
      next: "Add a saved-filter feature using localStorage.",
    },
    "docs": {
      icon: "📝",
      title: "Documentation",
      focus: "Write a README and technical-documentation file that a stranger could follow without asking questions.",
      skills: "Technical writing, structure, examples, screenshots.",
      tech: "Markdown, diagrams, code samples.",
      tip: "Read your docs out loud — every awkward sentence becomes obvious.",
      presentation: "Show the docs folder briefly to prove completeness.",
      next: "Add a 5-minute quickstart section at the top.",
    },
    "career": {
      icon: "🚀",
      title: "Career Growth",
      focus: "Build one anchor project per domain (web, data, AI) — that becomes your portfolio.",
      skills: "Project storytelling, GitHub hygiene, public writing, interview-ready demos.",
      tech: "GitHub, deployment, README, demo videos.",
      tip: "A small finished project beats a big unfinished one — every single time.",
      presentation: "Be ready to do a 60-second demo of your best project from memory.",
      next: "Polish your top project's README and pin it on GitHub.",
    },
  };

  const topicSelect = $("#assistantTopic");
  const generateBtn = $("#generateRecBtn");
  const clearBtn = $("#clearRecBtn");
  const resultBox = $("#assistantResult");

  function renderRecommendation(key) {
    const r = RECOMMENDATIONS[key];
    if (!r || !resultBox) return;
    resultBox.innerHTML = `
      <div class="rec-card">
        <div class="rec-icon" aria-hidden="true">${r.icon}</div>
        <h3>Recommendations for ${escapeHTML(r.title)}</h3>
        <div class="rec-row"><strong>Recommended Project Focus</strong>${escapeHTML(r.focus)}</div>
        <div class="rec-row"><strong>Skills to Improve</strong>${escapeHTML(r.skills)}</div>
        <div class="rec-row"><strong>Suggested Technologies</strong>${escapeHTML(r.tech)}</div>
        <div class="rec-row"><strong>Portfolio Improvement Tip</strong>${escapeHTML(r.tip)}</div>
        <div class="rec-row"><strong>Presentation Advice</strong>${escapeHTML(r.presentation)}</div>
        <div class="rec-row"><strong>Next Learning Step</strong>${escapeHTML(r.next)}</div>
      </div>
    `;
  }

  function clearRecommendation() {
    if (!resultBox) return;
    resultBox.innerHTML = `<p class="assistant-empty">Choose a topic and click <strong>Generate Recommendation</strong> to begin.</p>`;
    storage.remove(STORAGE_KEYS.lastRec);
  }

  generateBtn?.addEventListener("click", () => {
    const key = topicSelect?.value;
    if (!key) return;
    renderRecommendation(key);
    storage.set(STORAGE_KEYS.lastRec, key);
  });

  clearBtn?.addEventListener("click", clearRecommendation);

  // Restore last recommendation on load
  const lastRec = storage.get(STORAGE_KEYS.lastRec);
  if (lastRec && RECOMMENDATIONS[lastRec]) {
    if (topicSelect) topicSelect.value = lastRec;
    renderRecommendation(lastRec);
  }

  /* -----------------------------------------------------
     10. CONTACT FORM (validation + draft auto-save)
  ------------------------------------------------------ */
  const form = $("#contactForm");
  const fName = $("#cName");
  const fEmail = $("#cEmail");
  const fSubject = $("#cSubject");
  const fMessage = $("#cMessage");
  const counter = $("#msgCounter");
  const formFeedback = $("#formFeedback");
  const clearDraftBtn = $("#clearDraftBtn");

  const errorEls = {
    name: $("#errName"),
    email: $("#errEmail"),
    subject: $("#errSubject"),
    message: $("#errMessage"),
  };

  function setError(field, message) {
    const el = errorEls[field];
    const input = { name: fName, email: fEmail, subject: fSubject, message: fMessage }[field];
    if (el) el.textContent = message || "";
    if (input) input.classList.toggle("is-invalid", Boolean(message));
  }

  function validate() {
    let ok = true;

    const name = fName?.value.trim() || "";
    if (name.length < 2) { setError("name", "Please enter at least 2 characters."); ok = false; }
    else setError("name", "");

    const email = fEmail?.value.trim() || "";
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) { setError("email", "Please enter a valid email address."); ok = false; }
    else setError("email", "");

    const subject = fSubject?.value.trim() || "";
    if (subject.length < 4) { setError("subject", "Subject must be at least 4 characters."); ok = false; }
    else setError("subject", "");

    const message = fMessage?.value.trim() || "";
    if (message.length < 20) { setError("message", "Message must be at least 20 characters."); ok = false; }
    else setError("message", "");

    return ok;
  }

  function updateCounter() {
    if (counter && fMessage) counter.textContent = `${fMessage.value.length} characters`;
  }

  function saveDraft() {
    if (!form) return;
    const draft = {
      name: fName?.value || "",
      email: fEmail?.value || "",
      subject: fSubject?.value || "",
      message: fMessage?.value || "",
    };
    storage.set(STORAGE_KEYS.contactDraft, draft);
  }

  function restoreDraft() {
    const draft = storage.get(STORAGE_KEYS.contactDraft);
    if (!draft) return;
    if (fName) fName.value = draft.name || "";
    if (fEmail) fEmail.value = draft.email || "";
    if (fSubject) fSubject.value = draft.subject || "";
    if (fMessage) fMessage.value = draft.message || "";
    updateCounter();
  }

  function clearDraft() {
    storage.remove(STORAGE_KEYS.contactDraft);
    if (form) form.reset();
    Object.keys(errorEls).forEach((k) => setError(k, ""));
    updateCounter();
    if (formFeedback) {
      formFeedback.textContent = "Draft cleared.";
      formFeedback.className = "form-feedback";
    }
  }

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) {
      if (formFeedback) {
        formFeedback.textContent = "Please fix the highlighted fields.";
        formFeedback.className = "form-feedback is-error";
      }
      return;
    }
    if (formFeedback) {
      formFeedback.textContent = "Message sent successfully (demo).";
      formFeedback.className = "form-feedback is-success";
    }
    form.reset();
    storage.remove(STORAGE_KEYS.contactDraft);
    updateCounter();
  });

  [fName, fEmail, fSubject, fMessage].forEach((el) => {
    el?.addEventListener("input", debounce(saveDraft, 250));
  });
  fMessage?.addEventListener("input", updateCounter);
  clearDraftBtn?.addEventListener("click", clearDraft);

  restoreDraft();
  updateCounter();

  /* -----------------------------------------------------
     11. FOOTER YEAR
  ------------------------------------------------------ */
  const yearEl = $("#footerYear");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

});
