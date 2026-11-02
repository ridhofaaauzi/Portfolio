import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { skills } from '../data/skills'
import { absoluteUrl, languageInfo, site } from '../data/site'
import { localize } from '../i18n/language'
import { ui } from '../i18n/ui'
import { home, pathFor } from '../routes'

const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// JSON-LD lives in a <script>, so "</script>" inside a string must not close it.
const jsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c')

// Title and description for a page; case studies use the project's own summary.
export function pageMeta(lang, route) {
  if (route.type === 'notFound') {
    return { title: `${ui[lang].notFoundTitle} · ${profile.name}`, description: ui[lang].notFoundBody }
  }
  if (route.type !== 'project') return { title: ui[lang].metaTitle, description: ui[lang].metaDescription }
  const project = projects.find((p) => p.id === route.id)
  return {
    project,
    title: `${project.title} — ${ui[lang].caseStudy} · ${profile.name}`,
    description: localize(project.summary, lang),
  }
}

function structuredData(lang, route) {
  const url = absoluteUrl(pathFor(route, lang))
  const personId = `${site.url}/#person`
  const { project, title, description } = pageMeta(lang, route)

  const pageNodes = project
    ? [
        {
          '@type': 'WebPage',
          '@id': `${url}#webpage`,
          url,
          name: title,
          description,
          inLanguage: lang,
          isPartOf: { '@id': `${site.url}/#website` },
          about: { '@id': `${url}#project` },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: profile.name, item: absoluteUrl(pathFor(home, lang)) },
              { '@type': 'ListItem', position: 2, name: project.title, item: url },
            ],
          },
        },
        {
          '@type': 'CreativeWork',
          '@id': `${url}#project`,
          name: project.title,
          description,
          image: absoluteUrl(project.image),
          creator: { '@id': personId },
          ...(project.stack.length > 0 && { keywords: project.stack.join(', ') }),
          ...(project.links.demo && { sameAs: project.links.demo }),
        },
      ]
    : [
        {
          '@type': 'ProfilePage',
          '@id': `${url}#webpage`,
          url,
          name: title,
          description,
          inLanguage: lang,
          isPartOf: { '@id': `${site.url}/#website` },
          mainEntity: { '@id': personId },
        },
      ]

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: absoluteUrl('/'),
        name: profile.name,
        inLanguage: site.languages.map((l) => l.lang),
        publisher: { '@id': personId },
      },
      ...pageNodes,
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

/** Everything SEO-related that goes in <head> for `route` in `lang`. */
export function renderHead(lang, route) {
  const { project, title, description } = pageMeta(lang, route)

  // The 404 page is served for any unknown URL, so it has no canonical address and stays out of the index
  if (route.type === 'notFound') {
    return [
      `<title>${escapeAttr(title)}</title>`,
      `<meta name="description" content="${escapeAttr(description)}" />`,
      `<meta name="robots" content="noindex" />`,
    ].join('\n    ')
  }

  const url = absoluteUrl(pathFor(route, lang))
  const image = absoluteUrl(site.ogImage.path)
  const alternates = site.languages.filter((l) => l.lang !== lang)

  const tags = [
    `<title>${escapeAttr(title)}</title>`,
    `<meta name="description" content="${escapeAttr(description)}" />`,
    `<meta name="author" content="${escapeAttr(profile.name)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<link rel="canonical" href="${url}" />`,
    ...site.languages.map(
      (l) => `<link rel="alternate" hreflang="${l.lang}" href="${absoluteUrl(pathFor(route, l.lang))}" />`,
    ),
    `<link rel="alternate" hreflang="x-default" href="${absoluteUrl(pathFor(route, site.languages[0].lang))}" />`,

    `<meta property="og:type" content="${project ? 'article' : 'profile'}" />`,
    `<meta property="og:site_name" content="${escapeAttr(profile.name)}" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:locale" content="${languageInfo(lang).locale}" />`,
    ...alternates.map((l) => `<meta property="og:locale:alternate" content="${l.locale}" />`),
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="${site.ogImage.width}" />`,
    `<meta property="og:image:height" content="${site.ogImage.height}" />`,
    `<meta property="og:image:alt" content="${escapeAttr(`${profile.name}, ${profile.role}`)}" />`,
    ...(project
      ? []
      : [
          `<meta property="profile:first_name" content="Ridho" />`,
          `<meta property="profile:last_name" content="Fauzi Grafika" />`,
        ]),

    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,

    `<script type="application/ld+json">${jsonLd(structuredData(lang, route))}</script>`,
  ]

  return tags.join('\n    ')
}
