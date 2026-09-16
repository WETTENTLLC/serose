# SEROSE Website — Launch Build

This is the upgraded mobile-first SEROSE website built with React + Vite.

## Included
- Actual SEROSE rose wordmark in the header/footer
- Reno nightlife visual treatment
- Responsive luxury black/gold design
- 1 / 2 / 3 / 4-club “Build Your Night” selector
- Vibe, occasion, group size, budget, transportation and VIP-table planning
- Reno experiences and “How It Works” sections
- Professional positioning: hospitality / concierge / social experiences
- Explicit no-sexual-services / not-an-escort-service language
- Google Forms-ready inquiry form with optional Formspree fallback

## Turn the inquiry form on with Google Forms
1. Create a Google Form with questions matching the planning fields on the site.
2. Open the form's preview, inspect the HTML, and record each question's `name` value in the format `entry.123456789`.
3. In `src/config.js`, set `googleFormAction` to the form's response URL, for example `https://docs.google.com/forms/d/e/FORM_ID/formResponse`.
4. Paste the matching `entry.<id>` value beside each field in `googleFormEntries`.
5. Submit a test request and verify that every answer reaches the intended Google Sheet.

The site prioritizes Google Forms when `googleFormAction` is configured. Google Forms does not provide a reliable browser response for this cross-origin submission, so the site reports success after sending; always verify the test row in the linked sheet before launch. Do not collect ID images, payment card data, or other sensitive information in this form.

## Optional Formspree fallback
If Google Forms is not configured, you can set `formEndpoint` to a Formspree endpoint such as `https://formspree.io/f/abcdwxyz`.

## Run locally
```bash
npm install
npm run dev
```

## Deploy with Cloudflare Pages
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

### Direct deployment with Wrangler
1. Install dependencies with `npm install`.
2. Run `npx wrangler login` and complete the Cloudflare browser login.
3. Run `npm run deploy`.
4. When prompted, choose an existing Pages project or enter a new project name such as `serose`.
5. Cloudflare will return the public `pages.dev` URL.

Connect the GitHub repo to Cloudflare Pages. Future GitHub pushes can deploy automatically.

## Before public launch
- Contact email is set to `seroselifestyle@gmail.com`. Add the Google Voice number and Instagram in `src/config.js` when ready.
- Configure and test the Google Form action and entry mappings in `src/config.js`; confirm where submissions are stored, who can access them, and how long they are retained.
- Replace the launch policy summaries in the site with final attorney-approved Terms, Privacy, Cancellation/Refund, Guest Conduct, Host Conduct, and Transportation Disclosure documents before accepting paid bookings.
- Have Nevada counsel review the actual business model, contracts, insurance, tax treatment, advertising, privacy practices, and worker/host classification before launch.
- Confirm whether any SEROSE activity triggers Nevada or local licensing, registration, permitting, tax, alcohol-service, employment, or consumer-protection requirements. Website wording cannot substitute for a required license or contract.
- Do not present SEROSE as a transportation carrier. Transportation must be coordinated through properly licensed third-party providers with written provider terms and insurance verification.
- Do not promise venue admission, VIP access, reservations, pricing, alcohol service, or availability until confirmed in writing by the applicable venue or provider.
- Confirm the 21+ process with each venue. Require valid government-issued ID where applicable, and do not collect or store ID images in the inquiry form.
- Test the form, consent checkboxes, mobile layout, keyboard navigation, color contrast, contact email, and the deployed HTTPS domain before publishing QR codes or ads.
