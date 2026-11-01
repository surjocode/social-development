<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Overview

**Helping Hands** — a charity / social-development site (tree plantation, food distribution, winter clothes donation, community events). Built with:

- **Next.js 16 (App Router, Turbopack)** + **React 19.3** and **React Compiler** (`babel-plugin-react-compiler` is enabled — do not add manual `useMemo`/`useCallback`/`React.memo` unless profiling shows a genuine need; the compiler is now enabled by default)
- **TypeScript** (strict; `@/*` maps to `src/*`)
- **Tailwind CSS v4** — configuration lives entirely in `src/app/globals.css` (CSS-first `@theme` tokens, `tw-animate-css`). There is no `tailwind.config.js`; do not create one.
- **shadcn/ui** (`components.json` style: `base-nova`, base color `neutral`, icon library `lucide`) — primitive library is **Base UI** (`@base-ui/react`), shadcn CLI v4
- **better-auth** — client-only so far (`src/lib/auth-client.ts`, points at `NEXT_PUBLIC_AUTH_URL`); no server-side auth/db setup exists yet
- **Theming** via `@teispace/next-themes` (class attribute, `ThemeProvider` in `src/components/providers/`)
- **Toasts** via sonner (`<Toaster>` mounted in root layout)

## Commands

```bash
npm run dev      # next dev (Turbopack)
npm run build    # next build
npm run start    # next start
npm run lint     # eslint
```

Package manager: **npm** (a `package-lock.json` is committed). Node/TS checks: use `npx tsc --noEmit` for type-checks outside of `npm run build`.

## Structure

```
src/
  app/            # App Router pages, layout, favicon, globals.css
  components/
    ui/           # Shadcn-generated primitives ("use client"). Do not hand-edit casually.
    shared/       # App-specific shared components (Navbar, Footer, CurrentYear)
    providers/    # ThemeProvider, etc.
  lib/
    auth-client.ts  # better-auth client (needs NEXT_PUBLIC_AUTH_URL)
    utils.ts        # cn() helper
```

Routes, metadata, fonts (`Geist` as `--font-sans`, `Josefin Sans` as `--font-josefin`), the `Navbar`/`Footer`/`Toaster` are wired in `src/app/layout.tsx` under a `ThemeProvider` (default theme: light, `enableSystem` on).

## Conventions

- **Imports**: use the `@/` alias; order roughly as above (external → internal libs → ui → local).
- **Server by default**: pages are Server Components; add `"use client"` only where needed (theme, interactivity, auth state, toasts). Existing UI primitives already start with `"use client"`.
- **Styling**: Tailwind utility classes + shadcn CSS variables from `globals.css`; `cn()` from `@/lib/utils` to merge classes.
- **Icons** come from `lucide-react`.
- **Adding shadcn components**: `npx shadcn@latest add <component>` (schema in `components.json`); place app-level components in `src/components/shared/`.
- **Toasts**: use sonner's `toast` from `sonner` (the mounted `Toaster` comes from `src/components/ui/sonner.tsx`).

## Environment

- `NEXT_PUBLIC_AUTH_URL` — base URL for the better-auth client. Not yet required to run the dev server (auth calls will hit an undefined base URL — wire it up in `.env.local` when working on auth features).

## Things to Know

- The site is essentially an empty shell right now: `src/app/page.tsx` renders an empty `<div>`; there is only a lonely unauthenticated home route. Expect to create route folders and wire UI into `src/app`.
- `README.md` is still the create-next-app boilerplate — do not treat it as authoritative.
- No tests are configured yet; verify changes with `npm run build` + `npm run lint`.
- If `.next/` produces a stale `AGENTS.md`, rely on the codebase itself, not cached artifacts.
