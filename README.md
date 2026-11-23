# Raghu Notes Portal V3.1

## What changed
- Mobile hamburger menu and five page sections
- Request notes and report link problems using copy-to-clipboard WhatsApp-ready messages (no backend)
- Contribution form link and guidelines
- About section with developer credit and real LinkedIn URL
- Accessible, first-visit-only popup plus always-visible Help button
- 31 existing semester Drive folder IDs preserved unchanged

## Deployment
1. Create a NEW branch (`portal-v3-1`) from `main` in GitHub.
2. Upload the five root files: `index.html`, `ng.css`, `ng.js`, `data.js`, `popup.js`.
3. Preview with `python -m http.server 8000` or VS Code Live Server; test selectors, mobile menu, pop-up, and links.
4. Open a pull request targeting `main`. Merge only after verifying the preview.

## Notes
- Request and report controls only COPY text; they do not deliver messages automatically. Students then open WhatsApp community and paste it.
- The WhatsApp link is a community invitation, not a private chat with the developer.
- Drive folder existence was checked, but public student account access must still be tested separately.
- A genuine secure admin panel or automatic Drive file index needs a backend or Google API automation.
- Updating the catalog date in `data.js` should happen only after manually re-checking folder links.
