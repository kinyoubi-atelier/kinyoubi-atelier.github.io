# Core Web Vitals — capture procedure

This folder holds the PageSpeed Insights screenshot that renders on
`/security#performance` and is linked from the homepage. We publish
measurements, not targets — so this file needs to exist before those
pages show real numbers.

## One-time capture (takes 3 minutes)

1. Open https://pagespeed.web.dev/ in Chrome.
2. Paste the production URL: `https://kinyoubi-atelier.github.io/`
   (update this to your custom domain once it ships).
3. Click **Analyze**. Wait for both Mobile and Desktop tabs to finish.
4. Stay on the **Mobile** tab (PSI defaults to mobile and Google ranks
   from it).
5. Take a screenshot of the full scorecard, top to bottom — the four
   coloured gauges (Performance, Accessibility, Best Practices, SEO)
   plus the Core Web Vitals strip. Do not crop out the URL bar or the
   "Analyzed at" timestamp — that timestamp is the date we publish.
6. Save as **`psi-mobile.png`** in this folder
   (`/public/perf/psi-mobile.png`).
7. Update the `Last measured` line in `app/security/SecurityContent.tsx`:
   find the `<div id="psi-date">—</div>` and replace `—` with the date
   PSI reports (e.g. `12 April 2026`).
8. Commit and push:
   ```bash
   git add public/perf/psi-mobile.png app/security/SecurityContent.tsx
   git commit -m "Publish measured Core Web Vitals (PSI mobile)"
   git push
   ```

## Re-capture cadence

Recapture the screenshot:

- Every time you ship a material performance change.
- Every time the production URL changes (custom domain move,
  path-prefix change).
- Quarterly, even if nothing changed, so the `Last measured` date
  doesn't go stale enough to look dishonest.

## Desktop screenshot (optional)

If you want to publish the desktop run too, save it as `psi-desktop.png`
in this folder and add a second `<img>` block alongside the mobile one in
`SecurityContent.tsx`. Otherwise, mobile is enough — it's the stricter
number and the one Google uses for ranking.

## Absolutely do not

- Crop out the "Analyzed at" timestamp.
- Edit or annotate the screenshot.
- Paste in a screenshot from a different site or a different run.
- Use Lighthouse CLI output as a substitute — PSI runs against a real
  Google-hosted environment and is the version buyers can reproduce.
