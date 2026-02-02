# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS 4. Includes a projects showcase driven by JSON data and a blog system using TSX components.

## Commands

- `npm run dev` — Start local dev server (port 3000)
- `npm run build` — Production build
- `npm run lint` — ESLint
- `npm run format` — Check formatting with Prettier
- `npm run format:fix` — Auto-fix formatting

## Architecture

**Routing (Next.js App Router):**
- `app/page.tsx` — Home page, assembles Navbar, Introduction, About, and Projects sections
- `app/blog/page.tsx` — Blog listing
- `app/blog/[name]/page.tsx` — Dynamic blog post pages, resolved via blog registry

**Blog System:**
- Blog posts are TSX components in `blogs/` with metadata (title, publishedAt, readTime, component)
- `blogs/index.tsx` is the registry — add new blogs there as keyed exports
- Blog URLs use the registry key as the route param (e.g., `NCTSAApp` → `/blog/NCTSAApp`)

**Data Files (public/):**
- `projects.json` — Project entries with title, description, languages, links, dates
- `langlinks.json` — Maps technology names to documentation URLs (used in ProjectCard)

**Components (`components/`):**
- `Introduction.tsx` uses a Web Worker (`animation.worker.ts`) for canvas background animation
- `Projects.tsx` fetches `projects.json` at runtime and renders a responsive masonry grid
- `About.tsx` and `ImageCarousel.tsx` use Framer Motion for animations
- Some components use CSS Modules (`.module.css`) alongside Tailwind

## Code Style

- Prettier: 2-space indent, single quotes, JSX single quotes, ES5 trailing commas, semicolons
- Tailwind CSS plugin for Prettier handles class sorting
- `@/*` path alias maps to project root (configured in tsconfig.json)
- Standalone output mode for Docker deployment

## Deployment

- GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and pushes Docker image on push to `main`, then deploys via SSH
- Dockerfile: multi-stage build on Node 22-alpine, runs as non-root user `nextjs:1001`
