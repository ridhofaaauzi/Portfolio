// Runs after `vite build` and `vite build --ssr`: writes one fully rendered HTML
// page per route and language (dist/index.html, dist/id/index.html,
// dist/work/<id>/index.html, …) with its own <head>, plus sitemap.xml and
// robots.txt. Crawlers and link previews then see the real content without
// running JavaScript; the browser hydrates it as usual.
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const dist = path.join(root, 'dist')
const serverDir = path.join(root, 'dist-server')

const { render, renderHead, site, routes, pathFor, notFound } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href)

const template = await readFile(path.join(dist, 'index.html'), 'utf8')

// The hero name is set in Bricolage; preload it so the LCP text doesn't wait on CSS.
const assets = await readdir(path.join(dist, 'assets'))
const heroFont = assets.find((file) => /^bricolage-grotesque-latin-standard-normal-.+\.woff2$/.test(file))
const preload = heroFont
  ? `\n    <link rel="preload" href="/assets/${heroFont}" as="font" type="font/woff2" crossorigin />`
  : ''

function replaceOnce(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`prerender: ${pattern} not found in dist/index.html`)
  return html.replace(pattern, () => replacement)
}

for (const route of routes) {
  for (const { lang } of site.languages) {
    const pagePath = pathFor(route, lang)
    let html = template
    html = replaceOnce(html, /<html lang="[^"]*">/, `<html lang="${lang}">`)
    html = replaceOnce(html, /<!-- seo:start[\s\S]*?<!-- seo:end -->/, renderHead(lang, route) + preload)
    html = replaceOnce(html, /<div id="root"><\/div>/, `<div id="root">${render(lang, route)}</div>`)

    const out = path.join(dist, pagePath, 'index.html')
    await mkdir(path.dirname(out), { recursive: true })
    await writeFile(out, html)
    console.log(`prerendered ${pagePath} → ${path.relative(root, out)}`)
  }
}

// Served by Vercel for any unknown URL; English, switching to Indonesian under /id/
{
  let html = template
  html = replaceOnce(html, /<html lang="[^"]*">/, '<html lang="en">')
  html = replaceOnce(html, /<!-- seo:start[\s\S]*?<!-- seo:end -->/, renderHead('en', notFound) + preload)
  html = replaceOnce(html, /<div id="root"><\/div>/, `<div id="root">${render('en', notFound)}</div>`)
  await writeFile(path.join(dist, '404.html'), html)
  console.log('prerendered 404 → dist/404.html')
}

const url = (p) => new URL(p, site.url).href
const today = new Date().toISOString().slice(0, 10)
const alternates = (route) =>
  site.languages
    .map(({ lang }) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${url(pathFor(route, lang))}" />`)
    .concat(
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${url(pathFor(route, site.languages[0].lang))}" />`,
    )
    .join('\n')

const entries = routes.flatMap((route) =>
  site.languages.map(
    ({ lang }) => `  <url>
    <loc>${url(pathFor(route, lang))}</loc>
    <lastmod>${today}</lastmod>
${alternates(route)}
  </url>`,
  ),
)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`
await writeFile(path.join(dist, 'sitemap.xml'), sitemap)
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${url('/sitemap.xml')}\n`)
console.log('wrote sitemap.xml and robots.txt')

await rm(serverDir, { recursive: true, force: true })
