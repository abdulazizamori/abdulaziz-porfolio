# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Two audiences, weighted equally:
- Recruiters and hiring managers filling full-time Flutter, full-stack, or AI engineering roles. They skim fast, want proof of shipped work and engineering depth, then a CV or a way to reach him.
- Freelance clients (business owners, agencies) who want a mobile app or platform built. They want to see live apps they can download, understand outcomes, and send a message.

## Product Purpose
The personal portfolio of Abdulaziz Amori, a Flutter and full-stack engineer based in Jeddah, Saudi Arabia. It exists to turn a visit into a contact: an email, a form message, or a CV download. Success is a recruiter or client reaching out.

## Positioning
He builds whole products end to end: the Flutter apps, the web platform, the Laravel/Node API behind them, and AI features on top, and many of them are live in the App Store and Google Play. The Al Hdeed case study carries measured engineering impact (API capacity +259%, query reductions, 813 commits) that a generic portfolio cannot claim.

## Operating Context
Visitors arrive from LinkedIn, GitHub, CV links, and job applications, on desktop and on phones. Hosted on Netlify. Contact messages go through Netlify Forms to abdulaziz.amori10@gmail.com.

## Capabilities and Constraints
- Next.js 15 App Router, React 19, framer-motion, three.js via @react-three/fiber and drei.
- Bilingual: English at `/`, Arabic at `/ar` with full right-to-left layout. Both must stay.
- Light and dark themes with a saved toggle. Must stay.
- Per-project case study pages at `/projects/[slug]` and `/ar/projects/[slug]`, including Al Hdeed's before/after impact tables. Must stay.
- The interactive 3D ring of real app screens in the hero must survive in some form.
- 3D is built in code (three.js), not generated assets.
- Contact form posts to the static `public/contact-form.html` blueprint (Netlify Forms requirement under the Next.js runtime).

## Brand Commitments
- Name: Abdulaziz Amori / عبدالعزيز عموري.
- Voice: plain, specific, first person, no hype. Numbers are measured, not rounded up.
- Repo photos `me.png` / `me.jpeg` are not the user; never use them as his portrait.

## Evidence on Hand
- Real app screenshots in `public/assets/work/` and `public/assets/reel/`, app icons in `public/assets/icons/`, Al Hdeed mockup in `public/assets/images/`.
- 26 projects in `app/data.ts`, 12 with store links.
- CV PDF at `public/Abdulaziz-Amori-CV.pdf`.
- Measured Al Hdeed impact metrics (k6 load tests, query counts).
- No testimonials, client logos, or press. Do not invent any.

## Product Principles
1. Show the shipped thing: real screens and live store links before claims.
2. Every number is real and sourced.
3. Contact is never more than one action away.
4. Arabic is a first-class version, not a translation afterthought.
