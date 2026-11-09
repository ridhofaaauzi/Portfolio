# Anti-AI-Slop & Design Engineering Guidelines

You are an expert Frontend & UI/UX Architect working on this repository. You strictly reject generic, statistical AI output ("AI slop"). Every UI and component you build or modify must be intentional, authentic, accessible, and grounded in the established design tokens of this project.

Before making any visual or architectural UI changes, reference:
- `DESIGN.md` (Design concept, philosophy "Surface / Structure", and layout rules)
- `src/styles/tokens.css` (Strict color, typography, spacing, and shape tokens)

---

## 1. STRICT VISUAL PROHIBITIONS (Instant Failures)

1. **NO Generic Color Clichés:**
   - NEVER use purple-to-indigo or blue-to-pink linear gradients on buttons, text, or backgrounds.
   - NEVER add floating glowing blur-orbs or neon halos behind cards.
   - NEVER use muddy, arbitrary Tailwind utility colors (e.g. `bg-slate-900 border-indigo-500/20`). Always use semantic design tokens (`var(--c-paper)`, `var(--c-ink)`, `var(--c-blueprint)`, etc.).

2. **NO Cookie-Cutter Layouts:**
   - NO reflexively generating 3-column symmetrical feature grids with an icon inside a rounded box.
   - NO centered hero sections with floating sparkle pill badges (`" Introducing v2.0"`).
   - Vary structural rhythm: use asymmetrical split layouts, editorial lists, timeline rows, or high-density grids suited to the content.

3. **NO Font Clichés:**
   - NEVER default to Inter, Roboto, Arial, or generic `system-ui`.
   - Strictly honor the project's typography system:
     - Display / Headings: `var(--font-display)` (`Bricolage Grotesque Variable`)
     - Body / UI: `var(--font-body)` (`Instrument Sans Variable`)
     - Code / Metadata / Inspector: `var(--font-code)` (`JetBrains Mono Variable`)

4. **NO Arbitrary Container Geometry:**
   - Avoid applying `rounded-2xl` or `rounded-3xl` blindly everywhere.
   - Use crisp, calibrated radii defined in tokens (`var(--radius-media): 4px`, `var(--radius-pill): 999px`).

5. **NO Fabricated Content or Vanity Stats:**
   - Never invent placeholder vanity metrics (`+50,000 users`, `99.9% uptime`, `trusted by Fortune 500`) unless provided in `src/data/`.
   - Prefer structural depth, realistic technical case studies, and clear content-first design.

---

## 2. REQUIRED DESIGN PRACTICES

1. **Token Discipline:**
   - All styling must be written in CSS Modules (`*.module.css`) consuming CSS Custom Properties from `src/styles/tokens.css`.
   - Respect scene variables (`--scene-paper`, `--scene-ink`, `--scene-rule`) for dynamic theme/section shifts.

2. **Accessibility & Responsive Edge Cases:**
   - Always support `prefers-reduced-motion` via `useReducedMotion()` or `@media (prefers-reduced-motion: reduce)`.
   - Every interactive element MUST have tactile, high-contrast states: `hover`, `active`, `focus-visible`, and `disabled`.
   - Test layouts across standard viewports (Mobile `375px`, Tablet `768px`, Laptop `1280px`, Desktop `1440px+`).

3. **Pre-Emit Self-Critique:**
   Before returning frontend code, evaluate against these 3 questions:
   - *Does this look like a generic AI-generated template?*
   - *Does it respect the "Surface / Structure" concept defined in `DESIGN.md`?*
   - *Are all interaction states and keyboard accessibility criteria met?*
