// Runs after `vite build` and `vite build --ssr`: writes one fully rendered HTML
// page per language (dist/index.html, dist/id/index.html) with its own <head>,
// plus sitemap.xml and robots.txt. Crawlers and link previews then see the real
// content without running JavaScript; the browser hydrates it as usual.
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const dist = path.join(root, 'dist')
const serverDir = path.join(root, 'dist-server')

const { render, renderHead, site } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href)

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

for (const page of site.pages) {
  let html = template
  html = replaceOnce(html, /<html lang="[^"]*">/, `<html lang="${page.lang}">`)
  html = replaceOnce(html, /<!-- seo:start[\s\S]*?<!-- seo:end -->/, renderHead(page.lang) + preload)
  html = replaceOnce(html, /<div id="root"><\/div>/, `<div id="root">${render(page.lang)}</div>`)

  const out = path.join(dist, page.path, 'index.html')
  await mkdir(path.dirname(out), { recursive: true })
  await writeFile(out, html)
  console.log(`prerendered ${page.path} → ${path.relative(root, out)}`)
}

const url = (p) => new URL(p, site.url).href
const today = new Date().toISOString().slice(0, 10)
const alternates = site.pages
  .map((p) => `    <xhtml:link rel="alternate" hreflang="${p.lang}" href="${url(p.path)}" />`)
  .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${url(site.pages[0].path)}" />`)
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${site.pages
  .map(
    (p) => `  <url>
    <loc>${url(p.path)}</loc>
    <lastmod>${today}</lastmod>
${alternates}
  </url>`,
  )
  .join('\n')}
</urlset>
`
await writeFile(path.join(dist, 'sitemap.xml'), sitemap)
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${url('/sitemap.xml')}\n`)
console.log('wrote sitemap.xml and robots.txt')

await rm(serverDir, { recursive: true, force: true })
