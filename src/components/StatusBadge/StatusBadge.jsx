import { profile } from '../../data/profile'
import { useLanguage } from '../../i18n/language'
import styles from './StatusBadge.module.css'

// "Open to …" pill with a live dot; text lives in profile.openTo (null hides it).
export function StatusBadge({ className = '', ...rest }) {
  const { l } = useLanguage()
  if (!profile.openTo) return null

  return (
    <p className={`${styles.badge} ${className}`} {...rest}>
      <span className={styles.dot} aria-hidden="true" />
      {l(profile.openTo)}
    </p>
  )
}
