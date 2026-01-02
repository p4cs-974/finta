# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Finta** is a personal finance application built as a Bun monorepo with React frontend and Convex serverless backend.

## Commands

```bash
# Root commands (from /)
bun dev              # Start Vite dev server for apps/web
bun build            # Production build (runs TypeScript + Vite)

# App commands (from apps/web)
bun lint             # Run ESLint
bunx convex dev       # Start Convex dev server (schema sync, function watching)
bunx convex deploy    # Deploy Convex functions to production
bunx shadcn@latest add <component>  # Add shadcn/ui component
```

## Architecture

```
apps/web/
├── src/
│   ├── main.tsx           # App bootstrap (Clerk, Convex, Router providers)
│   ├── App.tsx            # Route definitions (React Router v7)
│   ├── pages/             # Route components (landing/, app/)
│   ├── components/        # UI components (shadcn/ui in components/ui/)
│   └── lib/               # Utilities
└── convex/                # Backend (queries, mutations, schema)
    ├── schema.ts          # Database schema
    └── *.ts               # Convex functions
```

**Data flow**: User → Clerk (auth) → React Router → Convex Client → Convex Functions → Database

## Key Technologies

- **Runtime**: Bun (with Node v20 compatibility via .nvmrc)
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS 4, shadcn/ui
- **Backend**: Convex (serverless functions + real-time database)
- **Auth**: Clerk with JWT integration
- **Path aliases**: `@/*` maps to `./src/*`

## Configuration Files

- `vite.config.ts`: Vite + PWA configuration
- `eslint.config.js`: ESLint v9 flat config
- `tsconfig.json`: Strict TypeScript with ES2022 target
- `components.json`: shadcn/ui configuration (new-york style)

## See Also

- **AGENTS.md**: Comprehensive development guide with data flow diagrams, Convex patterns, debugging tips, and monorepo extension instructions
