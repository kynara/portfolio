# AGENTS

## Stack & setup
- React 18 + TypeScript, built with Create React App (`react-scripts` 5).
- Install: `npm install` (or `yarn install` — both lockfiles are committed; keep them in sync if you add a dependency).
- `npm start` — dev server on :3000. `npm run build` — production build to `build/`. `npm test` — CRA/Jest tests.
- `npm run lint` / `npm run lint:fix` — ESLint over `src/**/*.{ts,tsx}` using CRA's `react-app` rule set (config: `.eslintrc.json`).
- Lint-on-save is wired up for both editors: `.vscode/settings.json` (needs the `dbaeumer.vscode-eslint` extension, recommended in `.vscode/extensions.json`) and `.idea/jsLinters/eslint.xml` (WebStorm/IntelliJ). No extra setup needed — just save a file.

## Routing
`src/App.tsx` wires `BrowserRouter` with five routes: `/` (Landing), `/home` (Home), `/blog` (Blog), `/resume` (Resume), `/contact` (Contact). Use `useNavigate` for transitions, not `<a>`/`<Link>`. Deploy target must rewrite all routes to `index.html` (e.g. Netlify `_redirects`: `/* /index.html 200`), since this is a client-side-routed SPA.

## Pages

**Landing (`/`)** — `src/components/Landing/`. The interactive entry point: a centered face portrait with three draggable icons (blog/résumé/contact) on a plate to the right. Drag an icon into the mouth to navigate — the mouth opens on drag-over, closes and the face shrinks on a successful drop, while a route-colored circle (`ROUTE_COLORS` in `Landing.tsx`) expands to cover the screen before the route change fires. Dropping outside the mouth (with a 20px tolerance) snaps the icon back. Keep this page's personality-first, cartoon tone — it's not a generic nav bar. Face images live in `public/images/*.png`; filenames must stay stable since they're referenced directly by `imgSrc` in `Landing.tsx`. Run `python process_images.py` to process new face images from `images/`.

**Home (`/home`)** — `src/components/Home/Home.tsx`. A simple secondary hub: name + two nav buttons (blog, résumé) via `AwesomeBtn`. Not currently linked from Landing — reachable only by direct URL.

**Blog (`/blog`)** — `src/components/Blog/Blog.tsx`. Placeholder ("coming soon"), shares generic `.page` styles from `Blog.css`. Back button returns to `/home`.

**Résumé (`/resume`)** — `src/components/Resume/Resume.tsx` / `Resume.css`. A horizontally-scrolling timeline of work/education/award entries.
- Content lives entirely in `Resume.data.ts` (`timelineData` array). Edit that file to update résumé text — don't touch layout/styles for content changes. The last entry is an intentional empty placeholder for trailing scroll space; `isPlaceholderItem` filters it out of selection.
- Selecting an entry (click, keyboard, or scroll/drag settling) swaps in a full-page background "scene" for that company (Iowa State, Casey's, Dave, Bayada, Workiva, Critical Tinkers), matched by regex against `item.subtitle`/`item.title` (see `isIowaStateItem` etc.). Add a new employer by adding both a scene block in `Resume.tsx` and its images/CSS in `Resume.css`.
- Timeline scroll/drag physics are hand-rolled in a `useEffect` (wheel deltas drive `scrollLeft` directly, pointer drag does the same, both settle on the nearest item once the gesture ends). `scroll-snap-type` is intentionally *not* used — it fights the continuous programmatic `scrollLeft` writes. See the comments in `Resume.tsx`/`Resume.css` before changing this.

**Contact (`/contact`)** — `src/components/Contact/Contact.tsx`. Form posts via `@formspree/react` (form ID `xjyvbqvy`, owned by the site owner's Formspree account). Shows a success state in place of the form on submit.

## Shared pieces
- **AwesomeBtn** (`src/components/AwesomeBtn/AwesomeBtn.tsx`) wraps `@rcaferati/react-awesome-button`. Pass token hex values to `color`/`dark` (and `textColor` if placing it on a light background). `size="small"` for secondary/back actions, omit for full-size.
- **Design tokens**: colors are defined twice and must be kept in sync — `src/tokens.css` (CSS custom properties, kebab-case) and `src/tokens.ts` (JS mirror, camelCase, used where a CSS var can't be passed directly, e.g. `AwesomeBtn` inline styles).
- **Fonts**: `Fraunces` (variable, `index.css`) is the primary typeface for body/longer text. `Bayon` (loaded per-component via Google Fonts `@import`) is for short, high-impact text (headings, button labels) — it's heavy/blocky and doesn't work well at body sizes.
- **Styling**: no CSS-in-JS. Each component imports its own `.css` file. `App.css` is intentionally empty.
- **Assets**: images/fonts live in `public/` (served directly) and are duplicated into `build/` on build. Reference them with absolute paths (`/images/...`, `/fonts/...`, `/icons/...`).

## Known unused code
- **`src/components/FleeingText/`** (`FleeingText.tsx` + `Vehicle.ts`, a p5.js particle/steering sketch) and the `p5`/`react-p5` packages are not imported by any route or page — currently orphaned. Kept intentionally (likely intended for a future Blog treatment) rather than deleted; if you're looking for why `p5` is a dependency with nothing rendering it, this is why.
- `public/index.html` and `public/manifest.json` still have unedited CRA boilerplate (title "React App", manifest name "Create React App Sample").

## Conventions
- Animation timing: `cubic-bezier(0.22, 1, 0.36, 1)` throughout, for consistency — reuse it rather than picking a new easing curve.
- When adding a page: register the route in `App.tsx`, create a matching component folder (`.tsx` + `.css`), reuse tokens for color, and prefer `useNavigate` for transitions.
- Testing: default CRA setup (`App.test.tsx`, `setupTests.ts`) is present but minimal — add React Testing Library tests alongside components if you're expanding behavior.
