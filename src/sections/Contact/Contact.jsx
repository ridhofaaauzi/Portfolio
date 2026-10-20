import { useEffect, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { profile } from '../../data/profile'
import { SplitText } from '../../components/SplitText/SplitText'
import { useLanguage } from '../../i18n/language'
import styles from './Contact.module.css'

export function Contact() {
  const reduceMotion = useReducedMotion()
  const [copied, setCopied] = useState(false)
  const { lang, t, l } = useLanguage()

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const iconMotion = reduceMotion
    ? {}
    : {
        initial: { transform: 'scale(0.6)', opacity: 0 },
        animate: { transform: 'scale(1)', opacity: 1 },
        exit: { transform: 'scale(0.6)', opacity: 0 },
      }

  return (
    <section id="contact" className={`${styles.contact} page-grid`} data-scene-zone="blueprint" aria-labelledby="contact-title">
      <div className={styles.grid} aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} />
        ))}
      </div>

      <SplitText
        id="contact-title"
        as="h2"
        key={lang}
        lines={t('contactTitle')}
        trigger={reduceMotion ? 'none' : 'inView'}
        stagger={0.025}
        className={styles.title}
      />

      <p className={styles.availability}>{l(profile.availability)}</p>

      <div className={styles.emailRow}>
        <a href={`mailto:${profile.email}`} className={styles.email}>
          {/* Allow a line break after the @ instead of mid-word */}
          {profile.email.split('@')[0]}@<wbr />
          {profile.email.split('@')[1]}
        </a>
        <button className={styles.copy} onClick={copyEmail}>
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <m.span key="check" className={styles.copyIcon} {...iconMotion}>
                <Check size={18} strokeWidth={2} aria-hidden="true" />
              </m.span>
            ) : (
              <m.span key="copy" className={styles.copyIcon} {...iconMotion}>
                <Copy size={18} strokeWidth={1.75} aria-hidden="true" />
              </m.span>
            )}
          </AnimatePresence>
          {copied ? t('copied') : t('copyEmail')}
        </button>
        <span className="visually-hidden" role="status">
          {copied ? t('copiedStatus') : ''}
        </span>
      </div>

      <ul className={styles.socials}>
        {profile.socials.map((social) => (
          <li key={social.label}>
            <a href={social.href} className={styles.social} target="_blank" rel="noreferrer">
              {social.label}
              <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
              <span className="visually-hidden"> {t('newTab')}</span>
            </a>
          </li>
        ))}
        <li className={styles.location}>{l(profile.location)}</li>
      </ul>
    </section>
  )
}
