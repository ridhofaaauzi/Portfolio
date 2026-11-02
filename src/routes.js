import { createContext, useContext } from 'react'
import { projects } from './data/projects'
import { languageInfo, site } from './data/site'

// Two kinds of page: the home page, and one case study per project.
//   /                 /work/sihris/
//   /id/              /id/work/sihris/
export const home = { type: 'home' }

export const routes = [home, ...projects.map((project) => ({ type: 'project', id: project.id }))]

export function pathFor(route, lang) {
  const prefix = languageInfo(lang).prefix
  return route.type === 'project' ? `${prefix}/work/${route.id}/` : `${prefix}/`
}

/** Unknown paths fall back to the home page. */
export function parsePath(pathname) {
  const match = /^\/id(\/|$)/.test(pathname)
  const lang = match ? 'id' : site.languages[0].lang
  const rest = match ? pathname.slice(3) : pathname
  const work = /^\/work\/([^/]+)\/?$/.exec(rest)
  const route = work && projects.some((project) => project.id === work[1]) ? { type: 'project', id: work[1] } : home
  return { lang, route }
}

export const RouteContext = createContext(home)

export const useRoute = () => useContext(RouteContext)

/** Link to a section of the home page, e.g. homeHref('work', 'id') → '/id/#work'. */
export function useHomeHref() {
  const route = useRoute()
  return (hash, lang) => (route.type === 'home' ? `#${hash}` : `${pathFor(home, lang)}#${hash}`)
}
