import { renderToString } from 'react-dom/server'
import { Root } from './Root'

// Built with `vite build --ssr` and used only by scripts/prerender.js.
export { renderHead } from './seo/head'
export { site } from './data/site'
export { routes, pathFor } from './routes'

export function render(lang, route) {
  return renderToString(<Root lang={lang} route={route} />)
}
