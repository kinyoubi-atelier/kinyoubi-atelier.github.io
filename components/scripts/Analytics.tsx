'use client'

/**
 * Analytics & Third-party Scripts
 *
 * Umami Analytics — privacy-respecting, GDPR/DPDP compliant
 * Crisp Chat — free-tier live chat widget
 *
 * Replace the placeholder IDs with your actual credentials:
 * - UMAMI_WEBSITE_ID: Get from your Umami dashboard after setup
 * - UMAMI_SCRIPT_URL: Your Umami instance URL (self-hosted or cloud)
 * - CRISP_WEBSITE_ID: Get from Crisp dashboard → Settings → Website ID
 */

import Script from 'next/script'

// ─── Configuration ───
// Set these via environment variables in .env.local:
// NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-id-here
// NEXT_PUBLIC_UMAMI_URL=https://your-umami-instance.vercel.app
// NEXT_PUBLIC_CRISP_WEBSITE_ID=your-crisp-id-here

const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
const UMAMI_URL = process.env.NEXT_PUBLIC_UMAMI_URL || 'https://cloud.umami.is'
const CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID

export function UmamiAnalytics() {
  if (!UMAMI_WEBSITE_ID) return null

  return (
    <Script
      src={`${UMAMI_URL}/script.js`}
      data-website-id={UMAMI_WEBSITE_ID}
      strategy="afterInteractive"
      async
      defer
    />
  )
}

export function CrispChat() {
  if (!CRISP_WEBSITE_ID) return null

  return (
    <Script
      id="crisp-widget"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.$crisp = [];
          window.CRISP_WEBSITE_ID = "${CRISP_WEBSITE_ID}";
          (function() {
            var d = document;
            var s = d.createElement("script");
            s.src = "https://client.crisp.chat/l.js";
            s.async = 1;
            d.getElementsByTagName("head")[0].appendChild(s);
          })();
        `,
      }}
    />
  )
}
