# DEPLOYMENT.md
## Angular Coding Assistant - Deployment Guide

**Project:** Designing a Prompt-Based AI Assistant - Angular Coding Assistant
**Student:** MANIKKAVEL S | Register Number: 811224243033
**Degree:** B.Tech, Artificial Intelligence & Data Science

---

## Live Public URL

**https://angular-coding-assistant-manikkavel.netlify.app**

- Provider: Netlify (free tier)
- HTTPS: Automatic TLS via Netlify
- CDN: Netlify Edge CDN (global)
- SPA Fallback: Configured via _redirects

---

## Project Details

| Field | Value |
|-------|-------|
| Framework | Angular 22 (Standalone Components) |
| Angular Version | 22.2.x |
| Node.js Version | v24.18.0 |
| TypeScript | ~6.0.2 |
| Build Tool | @angular/build (Vite + esbuild) |
| Build Command | npm run build |
| Output Directory | dist/angular-coding-assistant/browser/ |
| Routing | Angular Router (lazy-loaded standalone) |
| AI Provider | Local Mock Engine (100% client-side) |

---

## Deployment Method

**Provider:** Netlify
**Method:** Netlify CLI (netlify-cli v27.x)
**Site name:** angular-coding-assistant-manikkavel
**Team:** manikkavel_clg_web

### Deploy Command

    netlify deploy --dir="dist/angular-coding-assistant/browser" --prod --site-name="angular-coding-assistant-manikkavel" --no-build

### SPA Fallback Configuration

File: dist/angular-coding-assistant/browser/_redirects

    /* /index.html 200

This ensures every Angular route returns index.html with HTTP 200 on direct access or refresh.

---

## Build Steps

    # 1. Install dependencies
    npm install

    # 2. Run production build
    npm run build

    # 3. Add SPA fallback before each deploy
    echo "/* /index.html 200" > dist/angular-coding-assistant/browser/_redirects

    # 4. Deploy to Netlify
    netlify deploy --dir="dist/angular-coding-assistant/browser" --prod --no-build

---

## Routes Verified Live (all HTTP 200)

- / (redirects to /dashboard)
- /dashboard
- /chat
- /prompt-library
- /prompt-engineering
- /role-based     (Task 4: Role-Based Prompts)
- /boolean-logic  (Task 5: Chain-of-Thought)
- /prompt-optimization (Task 6)
- /prompt-templates    (Task 7)
- /about

---

## Environment Variables

None. Fully client-side. No API keys required.

---

## Tests Performed (Post-Deploy)

| Test | Result |
|------|--------|
| Homepage loads | PASS - HTTP 200 |
| All 9 routes return 200 | PASS - SPA fallback working |
| No localhost in bundle | PASS - Clean |
| Student info in bundle | PASS - Present |
| base href = "/" | PASS |
| main.js and styles.css served | PASS |
| No secrets deployed | PASS - Security scan clean |
| Build: 0 errors | PASS |

---

## How to Redeploy

    npm run build
    echo "/* /index.html 200" > dist/angular-coding-assistant/browser/_redirects
    netlify deploy --dir="dist/angular-coding-assistant/browser" --prod --no-build

---

## Known Limitations

- Cross-network: Route refresh tested via HTTP from local machine. Visual browser testing NOT VERIFIED from a second physical device/network.
- Mock AI only: All AI responses are pre-programmed. No live LLM calls.
- Google Fonts: Requires internet (fonts.googleapis.com).
- Free tier: 100 GB/month bandwidth, 300 build minutes/month.

---

## Files Changed for Deployment

| File | Change |
|------|--------|
| dist/angular-coding-assistant/browser/_redirects | Created - SPA fallback rule |
| DEPLOYMENT.md | Created - this file |
| README.md | Updated - Live Demo section added |

---

Deployment performed: 2026-10-01 | Netlify CLI v27.10.2 | Angular CLI 22.2.0
