import { useCallback, useEffect, useState } from 'react'
import { absoluteUrl } from '../data/site'
import { pathFor, useRoute } from '../routes'
import { pageMeta } from '../seo/head'
import { LanguageContext } from './language'

const STORAGE_KEY = 'lang'

function preferredLanguage() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'en' || saved === 'id') return saved
  return navigator.language?.toLowerCase().startsWith('id') ? 'id' : 'en'
}

// initialLang comes from the URL (/… or /id/…) so the prerendered HTML and the
// first client render agree; each language has its own indexable page.
export function LanguageProvider({ initialLang = 'en', children }) {
  const [lang, setLangState] = useState(initialLang)
  const route = useRoute()

  // On the default English URL, honour a saved or browser preference after hydration.
  useEffect(() => {
    if (initialLang !== 'en') return
    const preferred = preferredLanguage()
    // Must run after hydration (localStorage isn't known to the prerendered HTML)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (preferred !== initialLang) setLangState(preferred)
  }, [initialLang])

  const setLang = useCallback((next) => {
    localStorage.setItem(STORAGE_KEY, next)
    setLangState(next)
  }, [])

  useEffect(() => {
    const path = pathFor(route, lang)
    const { title, description } = pageMeta(lang, route)
    if (window.location.pathname !== path) {
      window.history.replaceState(null, '', path + window.location.hash)
    }
    document.documentElement.lang = lang
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', absoluteUrl(path))
  }, [lang, route])

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
}
