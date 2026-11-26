# Visionary Innovations landing page

This is a local, static first draft for Visionary Innovations. It presents the supplied geothermal concepts as early-stage proposals and keeps unverified claims out of public copy.

## Run locally

From this directory:

```bash
python3 -m http.server 4173 --directory dist
```

Open [http://localhost:4173](http://localhost:4173).

The site has no build step or runtime dependency. It uses semantic HTML, CSS, and a small amount of browser JavaScript for the mobile navigation and inquiry form.

## Form configuration

The inquiry form deliberately does not send data until a secure endpoint is configured. Before production, add a small server-side or managed form endpoint and set the runtime config before `app.js` loads:

```html
<script>
  window.VISIONARY_CONFIG = { formEndpoint: "https://approved.example.com/api/inquiries" };
</script>
<script src="/app.js" defer></script>
```

The endpoint should validate input, protect against spam, apply rate limits, keep secrets server-side, and route to the approved inquiry recipient. Never put an email credential or API key in the browser. The current local prototype shows a clear configuration message instead of pretending that an inquiry was delivered.

## Content and asset review

- [Content review](./content-review.md) lists public-safe wording, claims requiring founder confirmation, missing information, and final questions.
- [Asset inventory](./assets-inventory.md) records each visual reused from the source decks and its source slide.

## Screenshots

The first-draft screenshots are stored in `screenshots/` after local preview QA.

## QA results

- Static smoke checks: passed.
- JavaScript syntax check (`node --check dist/app.js`): passed.
- Browser console errors and warnings after reload: none observed.
- Inquiry form required-field validation: passed.
- Inquiry form unconfigured-endpoint success state: passed.
- Desktop screenshot: `screenshots/desktop.png` at 1440 × 1000.
- Mobile screenshot: `screenshots/mobile.png` at 390 × 844.
- Build, lint, and type-check scripts: not applicable because this draft is intentionally dependency-free static HTML/CSS/JS with no package manifest.

## Deployment

Deployment is intentionally not configured or performed. Before publishing, confirm the company name, approved contact details, privacy notice, form recipient, content approvals, image usage rights, and security controls. Then deploy the `dist/` directory to the approved static host.
