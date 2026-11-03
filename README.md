# Kildare CMWS Badminton Club website

A responsive React + TypeScript website starter using the supplied Kildare CMWS logo, committee list, constitution scans and club rules scans.

## Run locally

Requirements: Node.js 18+ (Node 20 or 22 recommended) and npm.

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
- Venue details and playing schedule
- Committee
- External coaching, governing body and competition resources
- Club constitution and club rules with PDF view/download
- Contact and Facebook link
- Club history and future photo placeholders

## Content still to confirm

- Current playing nights, times and venue
- Current fixtures and events
- Club email address and membership enquiry process
- Whether the 2023-2024 rules remain current
- Whether the supplied constitution is the latest approved version
- Club photographs (placeholders are intentionally used for now)

## Documents

The PDFs in `public/documents/` are generated from the supplied page photographs. They preserve the source pages as scans; they are not independently amended or certified copies. The website also displays a short navigation summary, with the PDFs remaining the authoritative wording.

## Branding

The supplied club logo is in `public/assets/club-logo.jpg`. The colour palette is based on the logo's navy, burgundy and white.

## Editing content

The committee list, document summaries, Facebook link and page content are in `src/App.tsx`. Update the relevant values there, then run `npm run build`.


## Latest content updates

- Removed the club-photo placeholder section.
- Added Monday playing details at Kildare Town Community School (8pm-10pm, four courts).
- Added Tuesday/Thursday playing details at CMWS Hall (8pm-11pm, one court), subject to league fixtures.
- Added a venue photograph using the Google Sites image URL supplied by the club.
- Added a browser favicon based on the supplied club logo.
- Replaced the training placeholder with coaching, governing body and competition resource links.
- Added club history using the supplied legacy About Us and History pages.
- Removed the year from the Club Rules page heading and filename.
- Reworked the document summary layout to prevent text overlap.

- The CMWS Hall photograph is stored locally at `public/assets/cmws-hall.jpg`; the website no longer depends on the Google Sites image URL.
- Footer includes a small website developer credit for Sagar Maheshwari.

- The supplied Kildare map screenshot is stored locally at `public/assets/cmws-hall-location-map.png` and is displayed beside the locally stored CMWS Hall photograph.
- Badminton resource cards now link directly to the BWF coaching playlists, Badminton Ireland, Badminton Europe, BWF, Sport80 and Tournament Software. The Mayo Badminton resources page is not linked or referenced on the website.
