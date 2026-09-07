# Short URL forwarder

A single static page that forwards to the portfolio. It exists because some
application forms (Adobe's, confirmed by testing) reject a URL whose hostname
contains a hyphen — `srinidhi-tc.github.io` fails their field validation even
though hyphens are perfectly legal in hostnames. Removing the dash makes the
same form accept the URL, so this is a gate on their end, not a broken link.

Deploy this folder to any free host that gives a hyphen-free subdomain:

  Netlify   https://app.netlify.com/drop   -> drag this folder in, then rename
            the site to `srinidhi` for https://srinidhi.netlify.app
  Cloudflare Pages / Vercel / surge.sh all work the same way.

The Open Graph tags are duplicated from the work page on purpose: many crawlers
build a preview from the URL that was pasted without following the redirect, so
without them a shared short link would preview as a blank page.

If the work page's OG image is regenerated (`npm run og` changes its content
hash), update the two image URLs here to match `scripts/og-manifest.json`.
