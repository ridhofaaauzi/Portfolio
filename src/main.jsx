import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/bricolage-grotesque/standard.css'
import '@fontsource-variable/instrument-sans/index.css'
import '@fontsource-variable/jetbrains-mono/index.css'
import './styles/tokens.css'
import './styles/global.css'
import { Root } from './Root'
import { languageFromPath } from './i18n/language'
import { runIntro } from './intro/intro'
import { profile } from './data/profile'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <Root lang={languageFromPath(window.location.pathname)} />
  </StrictMode>
)

// Production pages are prerendered (scripts/prerender.js); dev renders from scratch.
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)

// Decode the hero portrait before the reveal so it doesn't pop in afterwards
runIntro([profile.portrait])
