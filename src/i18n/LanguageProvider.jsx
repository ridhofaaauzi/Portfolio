import { useEffect, useState } from 'react'
import { LanguageContext } from './language'
import { ui } from './ui'

const STORAGE_KEY = 'lang'

function initialLanguage() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'en' || saved === 'id') return saved
  return navigator.language?.toLowerCase().startsWith('id') ? 'id' : 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLanguage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
    document.title = ui[lang].metaTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', ui[lang].metaDescription)
  }, [lang])

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
}
