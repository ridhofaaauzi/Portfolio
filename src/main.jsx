import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { inject } from '@vercel/analytics'
import '@fontsource-variable/bricolage-grotesque/standard.css'
import '@fontsource-variable/instrument-sans/index.css'
import '@fontsource-variable/jetbrains-mono/index.css'
import './styles/tokens.css'
import './styles/global.css'
import { Root } from './Root'
import { parsePath } from './routes'
import { runIntro } from './intro/intro'
import { profile } from './data/profile'

const container = document.getElementById('root')
const prerendered = container.hasChildNodes()
const { lang: pathLang, route } = parsePath(window.location.pathname)
// Hydrate in the language the HTML was rendered in (the 404 page is English for every URL)
const lang = prerendered ? document.documentElement.lang : pathLang
const app = (
  <StrictMode>
    <Root lang={lang} route={route} />
  </StrictMode>
)

// Production pages are prerendered (scripts/prerender.js); dev renders from scratch.
if (prerendered) hydrateRoot(container, app)
else createRoot(container).render(app)

// Page views for Vercel Analytics (enable it in the Vercel project; it's a no-op in dev)
inject()

// Decode the hero portrait before the reveal so it doesn't pop in afterwards
runIntro([profile.portrait])
