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

## Layered tech motion and compact orbit gallery

Native SVG phones, keyboards, mice and chips now move between rear and front planes as the hero and sticky experience scene scroll. A small requestAnimationFrame rig interpolates deterministic poses and rebinds after DOM changes. Reduced motion freezes the scene. The portrait uses the original PNG in two aligned layers: a masked body and an unclipped upper layer, so the head and shoulders protrude above the card.

The project gallery uses the reference's five-sided preserve-3d ring with 72-degree face spacing and perspective, with four real projects plus a clearly labeled next-idea face. Cards are compact (320 px desktop, 200/170 px mobile). Following the owner's feedback, the backward cycle reset and overshooting easing were replaced by a complete 360-degree loop with smoother timing. There is no pause/resume button. Hover and keyboard focus pause temporarily; exiting resumes automatically. Images are decoded before starting, and the UI samples the native animation clock rather than reading layout every animation frame. Descriptions/actions remain in a stable 2D panel.

CV/certificate borders use the Magic Card rotating-gradient mechanism with a separate visible glow, a 2.5-second cycle, the portfolio palette and unclipped outer surfaces. No animation libraries, CDN scripts or new runtime dependencies were downloaded or added.

Run native motion tests with npm test. Ten tests cover forward/reverse scroll, layer crossings, bounded mobile tracks, reduced motion, all orbit holds, monotonic easing, shortest manual turns and a seamless cycle boundary.
