# Nova, deployment guide

## Build

Use Node.js 22 or newer, as required by `package.json`.

```bash
npm ci
npm run build
```

Production files are generated in `dist/`.

## Site URL

Update the public URL in `site.config.mjs`:

```js
export const SITE_URL = 'https://example.com';
```

The URL is used by canonical links, sitemap generation and Open Graph metadata.

## WebScale preview

The current Nova demo is published independently from the main WebScale site at:

```text
https://webscale.pl/preview/nova/
```

Build the preview with its isolated URL and path prefix:

```bash
npm run build:preview
```

The generated `dist/` directory is uploaded only to `preview/nova/`. It does not replace the main WebScale build.

## Static hosting

Nova is designed for static hosting. Upload the contents of `dist/` or connect the repository to a provider that supports Astro builds.

```text
Build command: npm run build
Publish directory: dist
Node version: 22
```

## Contact form

The default form points to `/send-form.php`. Configure that endpoint for the hosting environment or replace it with the form provider used by the final website.

Do not commit SMTP credentials, API keys or other secrets. Keep them in environment variables on the hosting provider.

## Quote request form (Vercel)

The homepage quote button opens the localized quote page. Its `/api/quote` endpoint is a Vercel serverless function and sends HTML email through the Resend SDK. It uses `onboarding@resend.dev` as the sender and delivers requests to `traduxpress.contacto@gmail.com`. The static Astro build remains in `dist/`; Vercel must deploy the repository's root `api/quote.ts` function alongside that output.

For local testing, copy `.env.example` to `.env` and enter your Resend API key after `RESEND_API_KEY=`. The regular `npm run dev` command starts Astro only; it does not run the root `/api/quote.ts` Vercel function. Run `npx vercel dev` instead to test both the site and the API locally (the Vercel CLI may ask you to sign in and link the project).

For production, add the same variable in Vercel's project environment settings and redeploy:

```text
RESEND_API_KEY=your_resend_api_key
```

Keep the key private and do not commit `.env` or its value. Until a key is configured, the form returns an error and never displays a successful-submission message. The endpoint validates fields and request origin and applies a honeypot and best-effort per-instance rate limiting. Resend's onboarding sender is intended for testing; configure a sender on a verified domain before relying on production delivery.

## Final checks

After deployment, verify both language versions, mobile navigation, the contact form, canonical URL, sitemap.xml, robots.txt, favicon, Open Graph image and legal pages.
