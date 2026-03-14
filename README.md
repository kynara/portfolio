# kynara.dev — Personal Portfolio

A React + TypeScript portfolio site. Features an interactive landing page,
a home hub, a résumé page, and a blog placeholder.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 18 (Create React App) |
| Language | TypeScript 4 |
| Routing | React Router v7 |
| Animation | CSS keyframes + p5.js (FleeingText) |
| Buttons | `@rcaferati/react-awesome-button` |
| Font | *Unique* (custom, all weights) |

---

## Project structure

```
src/
├── tokens.ts                  # JS mirror of tokens.css — use for JS-only colour props
├── tokens.css                 # CSS custom properties — single source of truth for colour
├── index.css                  # Global reset, font-face declarations
├── App.tsx                    # Route definitions
└── components/
    ├── Landing/               # / — interactive face animation, entry point
    ├── Home/                  # /home — name card + nav buttons
    ├── Blog/                  # /blog — coming-soon placeholder
    ├── Resume/                # /resume — full résumé layout
    │   ├── Resume.data.ts     #   static content (skills, jobs, education…)
    │   └── Resume.tsx / .css  #   layout + styles
    ├── AwesomeBtn/            # Thin wrapper around react-awesome-button
    └── FleeingText/           # p5.js particle text (available for use)
        ├── FleeingText.tsx    #   React component / sketch
        └── Vehicle.ts         #   Autonomous agent (arrive + flee steering)
```

---

## Design tokens

All colours live in **`src/tokens.css`** as CSS custom properties and are
mirrored in **`src/tokens.ts`** for use in JS props (e.g. `AwesomeBtn`).
**Edit both files together** when changing a colour.

Core palette: `#ffe45c` · `#5478ff` · `#2006c6` · `#f02d3a` · `#dd0426`

---

## Updating the résumé

Edit **`src/components/Resume/Resume.data.ts`** — no layout code to touch.
The file exports typed arrays (`experience`, `education`, `skills`, `involvement`).

---

## Getting started

```bash
npm install
npm start        # dev server at http://localhost:3000
npm run build    # production build → build/
npm test         # run tests
```

---

## Deployment

The `build/` folder is a static export — deploy to any static host
(Netlify, Vercel, GitHub Pages, etc.).

For client-side routing to work, configure the host to serve `index.html`
for all routes (e.g. a `_redirects` file on Netlify: `/* /index.html 200`).
