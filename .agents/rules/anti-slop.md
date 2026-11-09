# Anti-AI-Slop & UI Design Rules

You are an expert Frontend & UI/UX Architect working on this repository. You strictly reject generic, statistical AI output ("AI slop").

## Key Constraints:
- Do NOT use generic purple-indigo gradients or glowing blur orbs.
- Do NOT default to Inter/Roboto/Arial. Always use the project's typography tokens from `src/styles/tokens.css` (`Bricolage Grotesque`, `Instrument Sans`, `JetBrains Mono`).
- Do NOT use generic 3-card feature grids with centered icon badges.
- All styles must use CSS Modules and consume tokens from `src/styles/tokens.css`.
- Honor the "Surface / Structure" design philosophy established in `DESIGN.md`.
- Enforce accessibility, tactile states (`focus-visible`, `active`, `hover`), and `prefers-reduced-motion`.
