# jackhomer.com

Static site for **Jack Homer · A Sky of One Person** — an engraved
celestial-atlas personal homepage. Hand-authored HTML/CSS/SVG; no build
step, no framework, no bundler.

## Structure

```
.
├── index.html             Plate IV — Coelum (home, overview star chart)
├── projects/index.html    Plate V — Opera Minora
├── career/index.html      Plate VI — Corona Laboris
├── business/index.html    Plate VII — Mercatura
├── opinions/index.html    Plate VIII — Lyra Opinionum (text plate)
├── records/index.html     Plate IX — Discus Anni (text plate)
├── contact/index.html     Plate X — Epistula (contact form)
├── assets/
│   ├── atlas.css          Shared engraved-atlas styles for all plates
│   └── atlas.js           Shared chart engine (single CONSTELLATIONS source)
├── favicon.svg / .ico
├── robots.txt
├── emoji/                 SVG glyphs used in project cards
└── screenshots/           Project preview images
```

## Local preview

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

That's it. There is no install, no build, no dev server.

## Deploy

Pushed to `main` → GitHub Actions stages files into `_site/` and uploads to
GitHub Pages. See `.github/workflows/deploy.yml`. The only build-time
mutation is a `sed` pass that replaces `__UMAMI_WEBSITE_ID__` in every HTML
file with the Umami Cloud website ID from the
`PUBLIC_UMAMI_WEBSITE_ID` Actions secret.

## Aesthetic

Antique hand-engraved celestial atlas. Parchment + ink palette
(`#fbf7eb` / `#0a0a0a`), `Cormorant Garamond` + `IBM Plex Mono` fonts,
Bayer-letter convention (α = brightest star in each constellation), Greek-key
meander border, corner fleurons, plate-title ornaments. No allegorical
figures — hairline label clusters only.

## Contact

`jack@homerfamily.com`
