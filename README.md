# mahfujmustafa.dev

This is the source for my personal site, [mahfujmustafa.dev](https://mahfujmustafa.dev). It's plain HTML, CSS and JavaScript with no framework, no bundler and no build step. The fonts are self-hosted too, so the page doesn't load anything from another server.

## The terminal

The page has a shell window you can type into, and it knows more than 35 commands. `help` lists the everyday ones like `about`, `projects`, `experience`, `cat` and `open`. `help --all` shows the hidden ones, and a few more stay locked until you type the Konami code. It has tab completion, history on the up and down arrows, Ctrl+L to clear, and it suggests the closest command when you mistype one. You can drag the window around and resize it. Cmd+K (Ctrl+K on Windows) opens a separate command palette that jumps to any section.

Every command is its own file in `js/terminal/commands/` and registers itself with `defineCommand()`, which takes a name, aliases, a group (`core`, `system` for hidden, or `root`) and a `run(ctx)` function. The page doesn't load those files one at a time. It loads `_bundle.js`, which is all of them joined in order, so after changing a command the bundle has to be regenerated.

The commands and the page sections read from the same data files in `js/data/` (profile, projects, experience, education, skills). Changing a project there changes both the card on the page and what `cat` prints for it.

## The circuit board

Behind everything is an SVG circuit board drawn by `js/circuit.js`. It's sized to the whole document instead of the window, so it scrolls with the page and doesn't have to be redrawn to chase the scroll position. On load a pulse runs into the core chip, and my name in the hero only shows up once that chip lights. After that it idles with pulses and packets moving along the traces. Hovering the chip lights its branches and starts a scanner around it, and each section heading has a node on the rail that lights up when you reach that section. The small animated strip next to my contact line at the top is a separate canvas in `js/meta-circuit.js`. Both tone down when your system asks for reduced motion.

All of the animation timing lives in `CURIE_ANIM_SCHEMA` at the top of `circuit.js`, each value with a default, a min and a max. Running `settings` in the terminal adds a gear button to the nav that opens a panel for tuning them, and whatever you change is saved in your browser.

## Deploying

Every push to `main` runs `.github/workflows/deploy.yml`. It replaces the `__BUILD_ID__` placeholder in `index.html` with the commit SHA, then uploads the repo to GitHub Pages. The `CNAME` file points that at mahfujmustafa.dev.

The build ID is there for the settings panel. A small script at the top of `index.html` compares it with the ID your browser saved last time, and if they're different it clears your saved board settings so you get the new defaults. Locally the placeholder never gets replaced, so the check skips itself and your settings stay.

## Running it locally

There's nothing to install. From the repo folder:

```
python3 -m http.server
```

Then open http://localhost:8000.

## Layout

```
index.html              the whole page
css/                    styles, one file per part of the page
js/data/                the content (projects, experience, education, skills)
js/circuit.js           the background board
js/terminal/            the shell, its output helpers and the commands
js/main.js              builds the sections and wires everything up
privacy-policy/         the privacy policy page
terms-of-service/       the terms page
```
