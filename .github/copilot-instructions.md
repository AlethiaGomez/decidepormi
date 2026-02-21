# Decide por mí - Project Instructions

## Project Overview
**Decide por mí** is a modern, minimalist decision-making web application built with React, Vite, and Tailwind CSS.

## Tech Stack
- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with PostCSS
- **Animation**: Canvas Confetti library
- **PWA**: Service Worker for offline support
- **Package Manager**: npm

## Project Setup Completed
- ✅ Vite + React scaffolding
- ✅ Tailwind CSS configured
- ✅ Canvas Confetti integrated
- ✅ PWA files (manifest.json, service worker)
- ✅ Mobile-responsive design
- ✅ Development environment ready

## Key Files
- `src/App.jsx` - Main application component with decision logic
- `src/index.css` - Tailwind CSS directives and custom components
- `public/manifest.json` - PWA configuration
- `public/sw.js` - Service Worker for offline functionality
- `index.html` - HTML entry point with PWA meta tags

## Running the Project

### Development
```bash
npm run dev
```
Starts dev server at http://localhost:5173/

### Production Build
```bash
npm run build
```
Optimized build in `dist/` folder

### Preview Build
```bash
npm run preview
```
Preview production build locally

## Features Implemented
1. **Option Management** - Add, view, and delete decision options
2. **Random Selection** - Click "Decidir por mí" button for random selection
3. **Confetti Animation** - Celebrates selected option with animated confetti
4. **Mobile Responsive** - Works seamlessly on all device sizes
5. **PWA Ready** - Installable and works offline with Service Worker
6. **Smooth Animations** - Gradient backgrounds, button animations, and transitions

## Customization Guide

### Change Colors
Edit `tailwind.config.js` theme colors or modify Tailwind classes in `src/App.jsx`

### Modify Animations
- Button animations: Update `btn-decision` class in `src/index.css`
- Confetti colors: Edit `colors` array in `triggerConfetti()` function in `src/App.jsx`

### Adjust PWA Settings
Update `public/manifest.json` with your app details and icons

## Dependencies
- `react`: UI library
- `react-dom`: React DOM rendering
- `canvas-confetti`: Confetti animation
- `tailwindcss`: CSS framework
- `vite`: Build tool

## Notes for Development
- Hot Module Replacement (HMR) is enabled for instant updates
- Service Worker caches files for offline access
- Tailwind CSS generates utilities based on content in template files
- Build includes separate CSS and JS chunks for optimization

## Future Enhancement Ideas
- Add themes (dark mode toggle)
- Save decision history
- Share decisions via URL
- Add sound effects
- Multiple decision rounds
