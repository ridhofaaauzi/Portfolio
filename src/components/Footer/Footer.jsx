import { ArrowUp } from 'lucide-react'
import { profile } from '../../data/profile'
import { useLanguage } from '../../i18n/language'
import styles from './Footer.module.css'

const year = new Date().getFullYear()

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className={styles.footer} data-scene-zone="blueprint">
      <p>
        © {year} {profile.name}
      </p>
      <p className={styles.built}>{t('builtWithFooter')}</p>
      <a href="#top" className={styles.top}>
        {t('backToTop')}
        <ArrowUp size={16} strokeWidth={1.75} aria-hidden="true" />
      </a>
    </footer>
  )
}
