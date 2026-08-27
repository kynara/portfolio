# AGENTS

- Scope: React 18 + TypeScript Create React App portfolio with four routes and per-component CSS; brand colors live in tokens.
- Dev flow: `npm install`; `npm start` (CRA dev server on :3000); `npm run build` to `build/`; `npm test` runs CRA tests (no custom config yet).
- Routing: `src/App.tsx` wires BrowserRouter with `/`, `/home`, `/blog`, `/resume`. Use `<Routes>` / `<Route>` from react-router-dom v7 and `useNavigate` for buttons.
- Landing page: `src/components/Landing/` uses mousemove listeners to drive a custom cursor via `cursorRef` and phase state; keep DOM writes in the effect to avoid re-renders. Face images are served from `public/images/*.png`; keep filenames stable. Run `python process_images.py` to process new face images from `images/`.
- Home hub: `src/components/Home/Home.tsx` shows name + nav buttons; navigation buttons are `AwesomeBtn` with token colors.
- Blog placeholder: `src/components/Blog/Blog.tsx` shares the generic `.page` styles from `Blog.css`; back button goes to `/home`.
- Résumé: layout in `Resume.tsx` / `Resume.css`; content only in `Resume.data.ts` (exports `skills` object and a unified `timelineData` array for work, education, and awards). Update that file when text changes (e.g. from `resume_june2025.txt`); stagger animations rely on inline `--i` values.
- Buttons: `components/AwesomeBtn/AwesomeBtn.tsx` wraps `@rcaferati/react-awesome-button`; pass token hexes to `color`/`dark` (and `textColor` if on light bg). Styles set via CSS custom properties on the component.
- Design tokens: canonical colors in `src/tokens.css`; JS mirror in `src/tokens.ts` for inline styles. Change both together. CSS variables are kebab-case; TS exports are camelCase.
- Fonts: `Fraunces` is the primary typeface (declared in `index.css` from `public/fonts/fraunces/*`) for body and longer-form UI text. `Bayon` is the secondary display font for short, high-impact text (headings and short button labels): it is heavy/blocky and too dense for body sizes, while Fraunces stays cleaner and more readable for larger text blocks.
- Styling pattern: no CSS-in-JS; each component imports its own `.css`. `App.css` is intentionally empty. Use CSS keyframes already defined where possible (fadeSlideUp, resumeFadeUp, cursor/face anims).
- p5 utility: `components/FleeingText/` hosts a p5 sketch with `Vehicle` steering; loads font from `/fonts/unique/Unique-Regular.ttf`. Use instance mode; remember to call `instance.remove()` on unmount (already handled).
- Assets: images/fonts duplicated in `public/` (served) and `build/` (output). Reference via absolute `/images/...` or `/fonts/...` paths to work in CRA.
- Deployment: static build in `build/`; ensure host rewrites all routes to `index.html` for SPA navigation (e.g., Netlify `_redirects` `/* /index.html 200`).
- Conventions: keep animation timings cubic-bezier(0.22, 1, 0.36, 1) for consistency; nav/back buttons use `size="small"` when secondary.
- Testing: default CRA setup (`App.test.tsx`, `setupTests.ts`) present but minimal; add React Testing Library tests alongside components if expanding behavior.
- When adding new pages: register route in `App.tsx`, create matching component folder with `.tsx` + `.css`, and reuse tokens for colors; prefer `useNavigate` for transitions.
