import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { navigation } from '../../data/navigation'
import { profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { languages, useLanguage } from '../../i18n/language'
import { Button } from '../Button/Button'
import styles from './Navbar.module.css'

const ids = navigation.map((item) => item.id)
const desktopQuery = '(min-width: 768px)'

export function Navbar() {
  const activeId = useActiveSection(ids)
  const reduceMotion = useReducedMotion()
  const { lang, setLang, t } = useLanguage()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const listRef = useRef(null)
  const indicatorRef = useRef(null)
  const menuButtonRef = useRef(null)
  const firstSheetLinkRef = useRef(null)
  const restoreFocus = useRef(false)

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 8))

  // One indicator that slides under the active link (CSS transition on transform).
  useLayoutEffect(() => {
    const list = listRef.current
    const indicator = indicatorRef.current
    if (!list || !indicator) return

    const place = () => {
      const link = activeId && list.querySelector(`a[href="#${activeId}"]`)
      if (!link) {
        indicator.style.opacity = '0'
        return
      }
      // Appear in place when coming from hidden; slide only between links.
      const wasHidden = indicator.style.opacity !== '1'
      indicator.style.transition = wasHidden ? 'opacity var(--dur-base) var(--ease-out)' : ''
      indicator.style.transform = `translateX(${link.offsetLeft + link.offsetWidth / 2 - 3}px)`
      indicator.style.opacity = '1'
    }

    place()
    const observer = new ResizeObserver(place)
    observer.observe(list)
    return () => observer.disconnect()
  }, [activeId])

  // Mobile menu: lock scroll, make the page behind it inert, manage focus.
  useEffect(() => {
    if (!menuOpen) return
    const background = [document.getElementById('main'), document.querySelector('#root > footer')]
    const onKey = (event) => {
      if (event.key !== 'Escape') return
      restoreFocus.current = true
      setMenuOpen(false)
    }
    const menuButton = menuButtonRef.current
    const desktop = window.matchMedia(desktopQuery)
    const onResize = () => desktop.matches && setMenuOpen(false)

    document.body.style.overflow = 'hidden'
    background.forEach((el) => el?.setAttribute('inert', ''))
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    firstSheetLinkRef.current?.focus()

    return () => {
      document.body.style.overflow = ''
      background.forEach((el) => el?.removeAttribute('inert'))
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
      if (restoreFocus.current) menuButton?.focus()
      restoreFocus.current = false
    }
  }, [menuOpen])

  const toggleMenu = () => {
    restoreFocus.current = menuOpen
    setMenuOpen((open) => !open)
  }

  return (
    <header className={styles.header} data-scrolled={scrolled || undefined} data-menu-open={menuOpen || undefined}>
      <nav className={styles.nav} aria-label="Primary">
        <a href="#top" className={styles.mark}>
          <span aria-hidden="true">{profile.initials}</span>
          <span className="visually-hidden">
            {profile.name}, {t('backToTopLabel')}
          </span>
        </a>

        <ul ref={listRef} className={styles.links}>
          {navigation.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={styles.link}
                aria-current={activeId === item.id ? 'location' : undefined}
              >
                {t(item.labelKey)}
              </a>
            </li>
          ))}
          <li ref={indicatorRef} className={styles.indicator} aria-hidden="true" />
        </ul>

        <div className={styles.actions}>
          <LanguageSwitch lang={lang} setLang={setLang} label={t('language')} className={styles.langDesktop} />
          <Button href="#contact" size="sm" className={styles.cta}>
            {t('letsTalk')}
          </Button>
          <button
            ref={menuButtonRef}
            className={styles.menuButton}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={toggleMenu}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            <span className="visually-hidden">{menuOpen ? t('closeMenu') : t('openMenu')}</span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="mobile-menu"
            className={styles.sheet}
            initial={reduceMotion ? false : { clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={reduceMotion ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
          >
            <ul>
              {navigation.map((item, index) => (
                <m.li
                  key={item.id}
                  initial={reduceMotion ? false : { transform: 'translateY(40px)', opacity: 0 }}
                  animate={{ transform: 'translateY(0px)', opacity: 1 }}
                  transition={{ delay: 0.15 + index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    ref={index === 0 ? firstSheetLinkRef : undefined}
                    href={`#${item.id}`}
                    className={styles.sheetLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t(item.labelKey)}
                  </a>
                </m.li>
              ))}
            </ul>
            <div className={styles.sheetFooter}>
              <a href={`mailto:${profile.email}`} className={styles.sheetEmail}>
                {profile.email}
              </a>
              <LanguageSwitch lang={lang} setLang={setLang} label={t('language')} />
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function LanguageSwitch({ lang, setLang, label, className = '' }) {
  return (
    <div className={`${styles.lang} ${className}`} role="group" aria-label={label}>
      {languages.map((option) => (
        <button
          key={option.code}
          className={styles.langButton}
          lang={option.code}
          aria-pressed={lang === option.code}
          aria-label={option.name}
          onClick={() => setLang(option.code)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
