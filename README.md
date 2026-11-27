# Lunar Lavender

My personal site, rebuilt from the Lunar Lavender design as a static Astro project. The homepage
covers research, security work, projects, experience and contact. The perception study gets its own
page at `/research/psychedelic-model`, and `/system` documents the colours, type and circuit
vocabulary the site is drawn with.

## Running it

Node 22 or newer.

```bash
npm install
npm run dev
```

The dev server runs on http://localhost:4321.

## Scripts

| Script                 | What it does                                          |
| ---------------------- | ----------------------------------------------------- |
| `npm run dev`          | Dev server with hot reload                            |
| `npm run build`        | Type-checks with `astro check`, then builds to `dist` |
| `npm run preview`      | Serves the built site                                 |
| `npm run lint`         | ESLint over TypeScript and Astro files                |
| `npm run format:check` | Prettier check (3-space indent, double quotes)        |
| `npm test`             | Vitest unit tests for the data and chart helpers      |
| `npm run verify`       | Everything CI runs, in order                          |

## Layout

```
src/
   assets/        images and textures, optimised at build time by astro:assets
   components/
      layout/     page shell and header
      ui/         small shared pieces (monogram, section labels)
      home/       one component per homepage section
      research/   sections of the research page
   data/          all copy and numbers, typed in data/types.ts
   lib/           pure helpers (chart scaling), covered by tests
   pages/         routes
   styles/        tokens.css holds every colour and font; global.css the shared classes
tests/            Vitest suites
```

Content lives in `src/data`, not in markup. Adding a project means adding an entry to
`src/data/projects.ts`; the index, counts and links follow from it. Colours come only from the
custom properties in `src/styles/tokens.css`.

## Deploying

CI lints, checks formatting, runs the tests and builds on every push and pull request. To publish
to GitHub Pages, enable Pages with the "GitHub Actions" source and set the repository variable
`DEPLOY_PAGES` to `true`. Pushes to `main` then deploy `dist`.
