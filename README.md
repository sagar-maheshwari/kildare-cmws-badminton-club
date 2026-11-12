# Kildare CMWS Badminton Club website

A responsive React + TypeScript website starter using the supplied Kildare CMWS logo, committee list, constitution scans and club rules scans.

## Run locally

Requirements: Node.js 24+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

The production website is generated in `dist/`.

## Deploy to GitHub Pages

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and deploys
the site when changes are pushed to `main` or `master`. The Vite base path is
configured for this repository's project site:
https://sagar-maheshwari.github.io/kildare-cmws-badminton-club/

In the repository on GitHub, open **Settings → Pages** and set **Build and
deployment → Source** to **GitHub Actions**. Then push the project to `main` or
`master`, or start the workflow manually from the **Actions** tab. The first
deployment may take a few minutes to become available.

## Included sections

- Home / club introduction
- Recent Facebook Page posts embedded on the home page (Page Plugin)
- Venue details and playing schedule
- Committee
- External coaching, governing body and competition resources
- Club constitution and club rules with PDF view/download
- Contact and Facebook link
- Club history and a photo gallery

## Content still to confirm

- Current playing nights, times and venue
- Current fixtures and events
- Club email address and membership enquiry process
- Whether the 2023-2024 rules remain current
- Whether the supplied constitution is the latest approved version
- Gallery captions and any additional club photographs

## Documents

The PDFs in `public/documents/` are generated from the supplied page photographs. They preserve the source pages as scans; they are not independently amended or certified copies. The website also displays a short navigation summary, with the PDFs remaining the authoritative wording.

## Branding

The supplied club logo is in `public/assets/club-logo.jpg`. The colour palette is based on the logo's navy, burgundy and white.

## Editing content

The committee list, document summaries, Facebook link and page content are in `src/App.tsx`. Update the relevant values there, then run `npm run build`.

Gallery images are stored in `public/assets/gallery/`. Add or remove images by editing the `galleryImages` list in `src/App.tsx`; each entry has an image path, descriptive alt text and an optional caption.
