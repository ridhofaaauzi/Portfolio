// Where the site is deployed. Used for canonical URLs, Open Graph, the sitemap and robots.txt.
export const site = {
  url: 'https://portfolio-svmx.vercel.app',
  // One prerendered page per language; English is the default (x-default)
  pages: [
    { lang: 'en', path: '/', locale: 'en_US' },
    { lang: 'id', path: '/id/', locale: 'id_ID' },
  ],
  // 1200×630, in /public. Regenerate with `npm run og` after editing scripts/og-image.html
  ogImage: { path: '/og-image.png', width: 1200, height: 630 },
}

export const pageFor = (lang) => site.pages.find((page) => page.lang === lang) ?? site.pages[0]

export const absoluteUrl = (path) => new URL(path, site.url).href
