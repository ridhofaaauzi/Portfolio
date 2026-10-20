import { createContext, useContext } from 'react'
import { ui } from './ui'

export const languages = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'id', label: 'ID', name: 'Bahasa Indonesia' },
]

export const LanguageContext = createContext({ lang: 'en', setLang: () => {} })

// Content in src/data is stored as { en, id } pairs; plain values pass through.
export function localize(value, lang) {
  if (value && typeof value === 'object' && !Array.isArray(value) && 'en' in value) {
    return value[lang] ?? value.en
  }
  return value
}

export function useLanguage() {
  const { lang, setLang } = useContext(LanguageContext)
  return {
    lang,
    setLang,
    t: (key) => ui[lang][key] ?? ui.en[key],
    l: (value) => localize(value, lang),
  }
}
