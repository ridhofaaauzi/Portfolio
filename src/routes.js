import { createContext, useContext } from 'react'
import { projects } from './data/projects'
import { languageInfo, site } from './data/site'

// Two kinds of page: the home page, and one case study per project.
//   /                 /work/sihris/
//   /id/              /id/work/sihris/
// Any other path is the 404 page (prerendered once, as dist/404.html).
export const home = { type: 'home' }
export const notFound = { type: 'notFound' }

export const routes = [home, ...projects.map((project) => ({ type: 'project', id: project.id }))]

/** The URL of `route` in `lang`; null for the 404 page, which has no URL of its own. */
export function pathFor(route, lang) {
  const prefix = languageInfo(lang).prefix
  if (route.type === 'notFound') return null
  return route.type === 'project' ? `${prefix}/work/${route.id}/` : `${prefix}/`
}

export function parsePath(pathname) {
  const match = /^\/id(\/|$)/.test(pathname)
  const lang = match ? 'id' : site.languages[0].lang
  const rest = (match ? pathname.slice(3) : pathname).replace(/\/index\.html$/, '/') || '/'
  if (rest === '/') return { lang, route: home }
  const work = /^\/work\/([^/]+)\/?$/.exec(rest)
  const route = work && projects.some((project) => project.id === work[1]) ? { type: 'project', id: work[1] } : notFound
  return { lang, route }
}

export const RouteContext = createContext(home)

export const useRoute = () => useContext(RouteContext)

/** Link to a section of the home page, e.g. homeHref('work', 'id') → '/id/#work'. */
export function useHomeHref() {
  const route = useRoute()
  return (hash, lang) => (route.type === 'home' ? `#${hash}` : `${pathFor(home, lang)}#${hash}`)
}
