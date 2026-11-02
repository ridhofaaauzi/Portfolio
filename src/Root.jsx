import { LazyMotion, MotionConfig } from 'motion/react'
import motionFeatures from './utils/motionFeatures.js'
import App from './App.jsx'
import { LanguageProvider } from './i18n/LanguageProvider'

// Shared by the browser entry (main.jsx) and the prerender entry (entry-server.jsx).
export function Root({ lang }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={motionFeatures} strict>
        <LanguageProvider initialLang={lang}>
          <App />
        </LanguageProvider>
      </LazyMotion>
    </MotionConfig>
  )
}
