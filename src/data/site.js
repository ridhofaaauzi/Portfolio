// Where the site is deployed. Used for canonical URLs, Open Graph, the sitemap and robots.txt.
export const site = {
  url: 'https://portfolio-svmx.vercel.app',
  // English is the default (x-default) at the root; Indonesian pages live under /id
  languages: [
    { lang: 'en', prefix: '', locale: 'en_US' },
    { lang: 'id', prefix: '/id', locale: 'id_ID' },
  ],
  // 1200×630, in /public. Regenerate with `npm run og` after editing scripts/og-image.html
  ogImage: { path: '/og-image.png', width: 1200, height: 630 },
}

export const languageInfo = (lang) => site.languages.find((l) => l.lang === lang) ?? site.languages[0]

export const absoluteUrl = (path) => new URL(path, site.url).href
