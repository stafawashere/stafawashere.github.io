# mahfujmustafa.dev

Personal portfolio for Mahfuj Mustafa — a static, dependency-free site
(HTML / CSS / vanilla JS) featuring an interactive in-browser terminal.

## Live

- https://mahfujmustafa.dev (custom domain)
- https://stafawashere.github.io (GitHub Pages)

## Develop

No build step. Open `index.html` directly, or serve locally:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Structure

- `index.html` — page markup
- `css/` — styles, split by concern
- `js/` — app logic, data, and the terminal framework + commands
- `icons/` — SVG assets

## Deploy

Hosted on GitHub Pages from the default branch root. `CNAME` pins the
custom domain; `.nojekyll` disables Jekyll processing so all files are
served as-is.
