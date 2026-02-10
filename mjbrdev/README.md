# MJBR — Portfolio

This repository is a personal portfolio built with React and Vite showcasing interactive UI snippets, animated text, a horizontal services scroller, logo loop, and a creative hero component. It's designed to be visually bold, performant, and easy to customize.

**Highlights**
- **Interactive hero:** `RotatingText` for eye-catching, animated headline rotations.
- **Animated copy:** `DynamicText` uses GSAP + ScrollTrigger for smooth, readable reveals.
- **Horizontal scroller:** `HorizontalScroll` presents services with full-page panels and animated backgrounds.
- **Visual effects:** `Beams`, `LetterGlitch`, and `LogoLoop` components add motion and depth.

**Quick Links**
- **App entry:** [src/App.jsx](src/App.jsx)
- **Hero / rotating words:** [src/RotatingText.jsx](src/RotatingText.jsx)
- **Dynamic text animation:** [src/DynamicText.jsx](src/DynamicText.jsx)
- **Horizontal services:** [src/HorizontalScroll.jsx](src/HorizontalScroll.jsx)
- **Footer:** [src/Footer.jsx](src/Footer.jsx)

**Tech Stack**
- **Framework:** React (Vite)
- **Animations:** GSAP (ScrollTrigger)
- **Styling:** Tailwind CSS (utility-first classes)
- **Build:** Vite for fast HMR and production bundles

**Run locally**
- **Install deps:** `npm install`
- **Start dev server:** `npm run dev`
- **Build production:** `npm run build`
- **Preview build:** `npm run preview`

**How to customize**
- **Texts & copy:** edit the strings in `src/RotatingText.jsx`, `src/DynamicText.jsx`, and `src/WhoAmI.jsx`.
- **Hero timing / animation:** tweak props passed to `RotatingText` in `src/App.jsx`.
- **Add logos/photos:** place assets in `src/assets/logos` and `src/assets/photos` and update `LogoLoop` or image `src` references.
- **Colors & theme:** adjust Tailwind classes in components or update your Tailwind config to change the design system.

**Assets**
- Fonts and images live in `public/` and `src/assets/`.

**Notes & tips**
- The project leverages `document.fonts.ready` before animating text to avoid layout jumps.
- Many components use GSAP's `ScrollTrigger` — check component files for animation details and customization hooks.

**License & Contact**
- **License:** feel free to use or fork (no license file included — add one if you need explicit terms).
- **Contact / socials:** update the links in `src/StaggeredMenu.jsx` to point to your public profiles.

Enjoy — want me to add a live deploy script or GitHub Pages / Vercel config next?

Special thanks to link:"https://reactbits.dev/"
