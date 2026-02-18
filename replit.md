# Portfolio V3

## Overview
A personal portfolio website built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. Features 3D elements (Three.js, Spline), animations (Framer Motion, GSAP), and smooth scrolling (Lenis).

## Project Architecture
- **Framework**: Next.js 16 (App Router) with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with PostCSS
- **Animations**: Framer Motion, GSAP
- **3D**: Three.js via @react-three/fiber, Spline
- **Smooth Scroll**: Lenis

## Project Structure
```
src/
  app/           - Next.js App Router pages (layout, page, globals.css)
    sagittarius/ - Sub-page
    writing/     - Sub-page
    youtube/     - Sub-page
  components/    - React components (Hero, About, Projects, Contact, etc.)
    ui/          - UI sub-components (GlassDock, SplineScene, etc.)
  data/          - Data files (projects.json)
  lib/           - Utility functions
  types/         - TypeScript type definitions
public/          - Static assets (images, frames)
```

## Development
- Dev server: `npm run dev` (runs on 0.0.0.0:5000)
- Build: `npm run build`
- Production: `npm run start` (runs on 0.0.0.0:5000)

## Deployment
- Target: Autoscale
- Build: `npm run build`
- Run: `npm run start`
