import { LazyMotion, MotionConfig } from 'motion/react'
import motionFeatures from './utils/motionFeatures.js'
import App from './App.jsx'
import { LanguageProvider } from './i18n/LanguageProvider'
import { RouteContext } from './routes'

// Shared by the browser entry (main.jsx) and the prerender entry (entry-server.jsx).
export function Root({ lang, route }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={motionFeatures} strict>
        <RouteContext.Provider value={route}>
          <LanguageProvider initialLang={lang}>
            <App />
          </LanguageProvider>
        </RouteContext.Provider>
      </LazyMotion>
    </MotionConfig>
  )
}
