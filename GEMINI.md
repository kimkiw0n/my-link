# GEMINI.md - MyLink Project Guide

This file defines the project structure, tech stack, development principles, and key workflows for **MyLink**. Gemini CLI must prioritize these instructions during development.

## 1. Project Overview
- **Purpose**: A simple and professional multi-link profile service for developers and creators.
- **Core Values**: Clean design based on `shadcn/ui`, minimal customization, and intuitive usability.
- **Key Features**:
  - Unified Google Login via Firebase.
  - **Inline Editing** for profile and link information.
  - **Undo** functionality for link deletion via toast notifications.
  - Automatic icon generation using Google Favicon API.
  - Click tracking and dashboard display for each link.

## 2. Tech Stack
- **Framework**: Next.js 16 (App Router)
- **UI/Styling**: Tailwind CSS 4, shadcn/ui, Lucide React (or Tabler Icons)
- **State/Backend**: Firebase v11+ (Authentication, Firestore)
- **Language**: TypeScript
- **Formatting/Linting**: ESLint, Prettier (with Tailwind CSS plugin)

## 3. Key Commands
- `npm run dev`: Start development server (using Turbopack)
- `npm run build`: Create production build
- `npm run lint`: Run ESLint analysis
- `npm run typecheck`: Run TypeScript type checking
- `npm run format`: Format code using Prettier

## 4. Architecture & Directory Structure
- `@app/`: Next.js App Router (pages and routing)
- `@components/`: UI components (`@ui/` for shadcn/ui components)
- `@lib/`: Utilities and shared logic (e.g., Firebase config)
- `@hooks/`: Custom React Hooks
- `@docs/`: Project documentation (PRD, User Scenarios, etc.)

## 5. Development Conventions
- **UI Consistency**: All UI should be built with `shadcn/ui`, following `@globals.css` and Tailwind configurations.
- **Inline Editing**: Implement a UX where clicking text immediately transforms it into an input form (Profile, Link Title, URL).
- **Mobile-first**: All screens must follow a minimalist layout optimized for mobile environments.
- **Data Management**:
  - Store user profile data in the `users` collection.
  - Store link data in the `links` subcollection under each user document.
  - Use `displayName` as the unique identifier (Slug) and public URL path.
- **Validation**: Always verify build stability with `npm run typecheck` and `npm run build` after changes.

## 6. Key Screens & Features
- **Admin Dashboard**:
  - Inline profile editing (displayName, username, Bio).
  - "Add New Link" button and link list (Favicon, Title, URL, Clicks, Delete button).
  - Deletion with "Undo" toast notification (stays for 5 seconds).
- **Public View (`/@displayName`)**:
  - Minimalist page for visitors.
  - Emphasis on `displayName` with large bold fonts.
  - Link clicks trigger external URL redirection and click tracking.
- **Favicon API**: Use `https://www.google.com/s2/favicons?domain=<url>&sz=64` to automatically extract link icons.

## 7. Agentic Documentation Rules
- **Strict Requirement**: Gemini MUST always create, maintain, and present `implementation_plan.md`, `task.md`, and `walkthrough.md` artifacts during development tasks.
- **No Skipping**: Never skip creating or updating these tracking documents. The user must always be able to see the plan, task progress, and final walkthrough.
- **Localization**: As dictated by user rules, these documents (plan, task, walkthrough) must always be written in Korean (한국어).
