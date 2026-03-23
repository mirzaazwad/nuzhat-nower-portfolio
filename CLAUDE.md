# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Workflow Orchestration

### 1. Theme

- Frida Kahlo Paintings: The image displays a depiction of the famous painting The Kiss (German: Der Kuss) by the Austrian Symbolist painter Gustav Klimt.
- Use iconic British Museum relics in either animated or realistic versions
- Give a good amount of focus in Greek Mythology, especially revolving around Aphrodite
- Give a Harry Potter and Indiana Jones based theme
- This is supposed to be a portfolio website
- A blog section similar to this: https://www.moho.blog/poetries
- Check the assets for information about the portfolio: /assets
- Make a mobile-first UI
- Use good animations and transitions using framer-motion
- Make sure to actually use the Kiss by Gustav Klimt painting in your work
- Make sure to properly set the profile image in the Hero page, which is the image of the person making the portfolio
- Use aesthetic animations, that show transition
- Use actual representations of Aphrodite the Greek Goddess and Frida Kahlo works
- Focus on making a website that is interactive and properly conveys my skills
- Use a greenish theme, that mixes properly with the gold accent currently
- Also use Persephone in the Green theme
- Use a paper plane based contact page that properly sends an email

### 2. Plan Mode Default

- Enter plan mode for **any non-trivial task** (3+ steps or architectural decisions).
- If something goes sideways, **stop and re-plan immediately** — don't keep pushing.
- Use plan mode for verification steps, not just building.
- Write detailed specs upfront to reduce ambiguity.

### 3. Subagent Strategy

- Use subagents liberally to keep the main context window clean.
- Offload research, exploration, and parallel analysis to subagents.
- For complex problems, throw more compute at it via subagents.
- One task per subagent for focused execution.

### 4. Self-Improvement Loop

- After **any correction** from the user: update `tasks/lessons.md` with the pattern.
- Write rules for yourself that prevent the same mistake.
- Ruthlessly iterate on these lessons until mistake rate drops.
- Review lessons at session start for relevant context.

### 5. Verification Before Done

- Never mark a task complete without proving it works.
- Diff behavior between main and your changes when relevant.
- Ask yourself: _"Would a staff engineer approve this?"_
- Run tests, check logs, demonstrate correctness.

### 6. Demand Elegance (Balanced)

- For non-trivial changes: pause and ask _"Is there a more elegant way?"_
- If a fix feels hacky: _"Knowing everything I know now, implement the elegant solution."_
- Skip this for simple, obvious fixes — don't over-engineer.
- Challenge your own work before presenting it.

### 7. Autonomous Bug Fixing

- When given a bug report: **just fix it**. Don't ask for hand-holding.
- Point at logs, errors, and failing tests — then resolve them.
- Zero context switching required from the user.
- Go fix failing CI tests without being told how.

### 8. Frontend Development

- Don't use unnecessary libraries from npm.
- Ask before installing any npm package.
- Follow proper react and next design practices, like data flows downwards, and context API
- Use zustand for state management
- Use tanstack/react-query for API requests, if needed
- Use shadcn UI as the UI library
- Follow the _DON'T REPEAT YOURSELF_ and _KEEP IT SIMPLE STUPID_ principles
- Maintain proper seperation of concerns
- Create a seperate features directory in src, that contains the relevant components, hooks, stores, etc. for each page
- Avoid creating large components and ofload loagic to hooks

## 9. Task Management

1. **Plan First** — Write a plan to `tasks/todo.md` with checkable items.
2. **Verify Plan** — Check in before starting implementation.
3. **Track Progress** — Mark items complete as you go.
4. **Explain Changes** — Provide a high-level summary at each step.
5. **Document Results** — Add a review section to `tasks/todo.md` when done.
6. **Capture Lessons** — Update `tasks/lessons.md` after any corrections.

---

## 10. Build & Development Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 11. Architecture Overview

**Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + React Compiler

**Key Configuration:**

- React Compiler enabled via `reactCompiler: true` in `next.config.ts`
- Tailwind CSS v4 uses `@tailwindcss/postcss` plugin (new PostCSS-based setup)
- Path alias: `@/*` maps to `./src/*`

**Source Structure:**

- `src/app/` — App Router pages and layouts
- `src/app/layout.tsx` — Root layout with Geist font configuration
- `src/app/page.tsx` — Home page component
- `src/app/globals.css` — Global styles with Tailwind imports

> **Note:** This Next.js version may have breaking changes. Consult `node_modules/next/dist/docs/` for current API documentation when implementing features. Heed all deprecation notices.

---

## 12. Core Principles

- **Simplicity First** — Make every change as simple as possible. Minimize code impact.
- **No Laziness** — Find root causes. No temporary fixes. Hold yourself to senior developer standards.
- **Minimal Impact** — Changes should only touch what's necessary. Avoid introducing regressions.

---
