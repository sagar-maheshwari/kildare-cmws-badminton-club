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

## Deploy privately to Cloudflare Pages

The GitHub repository can stay private while Cloudflare Pages publishes the
built website publicly. Cloudflare connects to GitHub and automatically builds
the production branch on each push; no GitHub Actions secrets are needed.

1. In Cloudflare, open **Workers & Pages → Create application → Pages →
   Connect to Git**. Authorize Cloudflare's GitHub app for this repository,
   including private repository access, then select this repo.
2. Configure the build:
   - Production branch: `main`
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable: `NODE_VERSION` = `24`
3. Create the Pages project. Cloudflare will build it and provide a temporary
   `*.pages.dev` address.
4. In the Pages project, open **Custom domains → Set up a domain** and enter
   `cmwsbckildare.com`. Follow the prompts to attach it. Since the domain is
   managed in Cloudflare, Cloudflare can configure the DNS record and HTTPS.
   If you previously added GitHub Pages DNS records for this domain, remove
   those first so Cloudflare Pages can configure its own record.
5. To publish updates, push commits to `main`; Cloudflare Pages will build and
   deploy them automatically.

The production build output is `dist/`. Vite is configured to serve assets from
the domain root, which is required for the custom domain.

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
