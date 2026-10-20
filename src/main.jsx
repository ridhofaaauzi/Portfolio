import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion, MotionConfig } from 'motion/react'
import motionFeatures from './utils/motionFeatures.js'
import '@fontsource-variable/bricolage-grotesque/standard.css'
import '@fontsource-variable/instrument-sans/index.css'
import '@fontsource-variable/jetbrains-mono/index.css'
import './styles/tokens.css'
import './styles/global.css'
import App from './App.jsx'
import { LanguageProvider } from './i18n/LanguageProvider'
import { runIntro } from './intro/intro'
import { profile } from './data/profile'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <LazyMotion features={motionFeatures} strict>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </LazyMotion>
    </MotionConfig>
  </StrictMode>,
)

// Decode the hero portrait before the reveal so it doesn't pop in afterwards
runIntro([profile.portrait])
