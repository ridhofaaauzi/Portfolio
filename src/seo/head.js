import { profile } from '../data/profile'
import { skills } from '../data/skills'
import { absoluteUrl, pageFor, site } from '../data/site'
import { localize } from '../i18n/language'
import { ui } from '../i18n/ui'

const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// JSON-LD lives in a <script>, so "</script>" inside a string must not close it.
const jsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c')

function structuredData(lang) {
  const page = pageFor(lang)
  const url = absoluteUrl(page.path)
  const personId = `${site.url}/#person`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: absoluteUrl('/'),
        name: profile.name,
        inLanguage: site.pages.map((p) => p.lang),
        publisher: { '@id': personId },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${url}#webpage`,
        url,
        name: ui[lang].metaTitle,
        description: ui[lang].metaDescription,
        inLanguage: lang,
        isPartOf: { '@id': `${site.url}/#website` },
        mainEntity: { '@id': personId },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: profile.name,
        jobTitle: profile.role,
        description: localize(profile.headline, lang),
        url: absoluteUrl('/'),
        ...(profile.portrait && { image: absoluteUrl(profile.portrait) }),
        email: `mailto:${profile.email}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Depok',
          addressRegion: localize({ en: 'West Java', id: 'Jawa Barat' }, lang),
          addressCountry: 'ID',
        },
        worksFor: { '@type': 'Organization', name: 'PT Amanah Karya Indonesia' },
        knowsAbout: [...new Set(skills.flatMap((group) => group.items))],
        sameAs: profile.socials.map((social) => social.href),
      },
    ],
  }
}

/** Everything SEO-related that goes in <head> for the page in `lang`. */
export function renderHead(lang) {
  const page = pageFor(lang)
  const url = absoluteUrl(page.path)
  const title = ui[lang].metaTitle
  const description = ui[lang].metaDescription
  const image = absoluteUrl(site.ogImage.path)
  const alternates = site.pages.filter((p) => p.lang !== lang)

  const tags = [
    `<title>${escapeAttr(title)}</title>`,
    `<meta name="description" content="${escapeAttr(description)}" />`,
    `<meta name="author" content="${escapeAttr(profile.name)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<link rel="canonical" href="${url}" />`,
    ...site.pages.map((p) => `<link rel="alternate" hreflang="${p.lang}" href="${absoluteUrl(p.path)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${absoluteUrl(site.pages[0].path)}" />`,

    `<meta property="og:type" content="profile" />`,
    `<meta property="og:site_name" content="${escapeAttr(profile.name)}" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:locale" content="${page.locale}" />`,
    ...alternates.map((p) => `<meta property="og:locale:alternate" content="${p.locale}" />`),
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="${site.ogImage.width}" />`,
    `<meta property="og:image:height" content="${site.ogImage.height}" />`,
    `<meta property="og:image:alt" content="${escapeAttr(`${profile.name}, ${profile.role}`)}" />`,
    `<meta property="profile:first_name" content="Ridho" />`,
    `<meta property="profile:last_name" content="Fauzi Grafika" />`,

    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,

    `<script type="application/ld+json">${jsonLd(structuredData(lang))}</script>`,
  ]

  return tags.join('\n    ')
}
