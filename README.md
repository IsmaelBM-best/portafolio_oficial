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

## Interactive experience and credentials

The portfolio adds an original parallax hero, a sticky experience journey grounded in the supplied CV, a controlled 3D project gallery with project detail dialogs, a CV graphic cover and four certificate previews with open/download actions. English and Spanish copy, mobile layouts, keyboard navigation and reduced-motion support are preserved. The CV and Academlo PDFs retain their original bytes. The separate public high-school diploma has its ID-number pixels removed, at the owner's request; the unredacted source was not copied into the repository.

New files: ExperienceJourney.vue, ProjectGallery.vue, CredentialsLibrary.vue, HeroScene.vue, PortfolioAtmosphere.vue, usePortfolioMotion.js, immersive.css and src/assets/documents. The two original experience/project components remain for reference. No runtime animation dependencies were added.

References studied (independently implemented in the portfolio palette): https://codepen.io/isladjan/pen/abdyPBw, https://codepen.io/edmundojr/pen/eNPJVW and https://codepen.io/gayane-gasparyan/pen/jOmaBQK.

Verified October 7, 2026 in the user-run Vite server at 127.0.0.1:5173: project selection, project/certificate dialogs, Escape and focus return, tools tabs, both languages and 320/390/768-pixel layouts without horizontal overflow. The downloaded Full Stack certificate matches its original hash. The managed-session verification build uses preserveSymlinks and compiled Sass because native Windows realpath is unavailable here; normal repository configuration remains unchanged.
