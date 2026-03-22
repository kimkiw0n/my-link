# GEMINI.md - Project Context

## Project Overview
This project is a Next.js 16/15+ application called **my-profile**, built with the latest React 19 features and Tailwind CSS 4. It is currently structured with the main application residing in the `my-profile/` directory.

## Technical Stack
- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Linting:** [ESLint](https://eslint.org/)

## Directory Structure
- `/my-profile`: The core Next.js application.
  - `/app`: Contains the App Router routes and layouts.
    - `layout.tsx`: Root layout with Geist font integration.
    - `page.tsx`: The main landing page.
    - `globals.css`: Global styles including Tailwind imports.
  - `/public`: Static assets (SVG logos, icons).
  - `package.json`: Project dependencies and scripts.
  - `tsconfig.json`: TypeScript configuration with path aliases.

## Building and Running
All commands should be executed within the `my-profile/` directory.

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server with Turbopack. |
| `npm run build` | Builds the application for production. |
| `npm run start` | Starts the production server. |
| `npm run lint` | Runs ESLint to check for code quality issues. |

## Development Conventions
- **Path Aliases:** Use `@/` to reference the root of the `my-profile` directory (e.g., `@/app/components/Example`).
- **Styling:** Use Tailwind CSS 4 utility classes.
- **Components:** Prefer Server Components by default; use `"use client"` for interactivity.
- **Type Safety:** Maintain strict TypeScript compliance.
- **Formatting:** ESLint is configured for linting; ensure code passes `npm run lint` before committing.

## Key Files
- `my-profile/app/layout.tsx`: Manages global metadata and root structure.
- `my-profile/app/page.tsx`: The entry point for the homepage.
- `my-profile/package.json`: Defines the technical stack and script entry points.
- `my-profile/next.config.ts`: Next.js specific configuration.
