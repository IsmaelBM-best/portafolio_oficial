# Ismael Blandon Moreno — Full-Stack + AI portfolio

Vue 3, Vite 6 and Sass. English by default, with a persistent Spanish language switch. No language modal blocks the first visit.

## Development

`npm ci`, then `npm run dev`. Production: `npm run build`; inspect with `npm run preview`.
No lint or test scripts are configured in the original repository.

## Structure

`src/components` keeps the existing section boundaries. `src/locales` contains English and Spanish copy. `src/styles/app.scss` is the shared responsive design system. Original section styles and the unused language modal remain available for reference. `src/assets` contains imported images, including the supplied Pawly icon.

Project order: Ib.Commerce, CareFlow, Ismael Trivia, Pawly. Ib.Commerce is a bilingual cyberpunk shopping dashboard with automatic promotional pricing, local seller tools and simulated checkout. Its card uses a current optimized screenshot in 960/1600-pixel variants, plus the existing Netlify demo and GitHub repository links. Pawly’s description is based on https://app-pawly.netlify.app/ (reviewed October 5, 2026); the Android app itself was not installed or independently tested. Claude-assisted authorship is provided by the portfolio owner.

The contact form validates required name, email and project details, then opens WhatsApp with an encoded draft. The visitor reviews and sends it there. Email and telephone links are also available. No backend submission or automatic message sending is claimed.

## Deployment

Existing production URL: https://ismael-portafolio-oficial.netlify.app/ . Standard Vite output is `dist`, built with `npm run build`. No existing Netlify configuration was removed. The README previously claimed continuous deployment, but the current Netlify repository connection, production branch and deploy permissions require verification in Netlify. A local build or commit does not deploy the site.

Ib.Commerce card verified in English and Spanish, with correct demo/code destinations and no horizontal overflow at 390 pixels. The local verification build used Vite preserveSymlinks and separately compiled the unchanged Sass entry because this managed Windows session denies fs.realpathSync.native; the repository's normal build configuration remains unchanged.
