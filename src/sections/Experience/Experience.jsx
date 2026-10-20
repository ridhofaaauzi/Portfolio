import { m, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { education, experience } from '../../data/experience'
import { profile } from '../../data/profile'
import { useLanguage } from '../../i18n/language'
import styles from './Experience.module.css'

export function Experience() {
  const { t } = useLanguage()

  return (
    <section
      id="experience"
      className={`${styles.experience} page-grid`}
      data-scene-zone="ink"
      aria-labelledby="experience-title"
    >
      <h2 id="experience-title" className={styles.title}>
        {t('experienceTitle')}
      </h2>
      {profile.resume && (
        <a href={profile.resume} className={styles.resume}>
          {t('downloadResume')}
          <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
        </a>
      )}

      <Timeline items={experience} headingLevel="h3" />

      <h3 className={styles.subtitle}>{t('educationTitle')}</h3>
      <Timeline items={education} headingLevel="h4" compact />
    </section>
  )
}

function Timeline({ items, headingLevel: Heading, compact = false }) {
  const reduceMotion = useReducedMotion()
  const { l } = useLanguage()

  return (
    <ol className={`${styles.list} ${compact ? styles.compact : ''}`}>
      {items.map((item, index) => (
        <li key={item.id} className={styles.row}>
          <m.span
            className={styles.rule}
            aria-hidden="true"
            initial={reduceMotion ? false : { transform: 'scaleX(0)' }}
            whileInView={{ transform: 'scaleX(1)' }}
            viewport={{ once: true, amount: 1 }}
            transition={{ delay: index * 0.08, duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          />
          <p className={styles.period}>{l(item.period)}</p>
          <div className={styles.who}>
            <Heading className={styles.company}>{item.company}</Heading>
            <p className={styles.role}>{l(item.role)}</p>
          </div>
          <p className={styles.type}>{l(item.type)}</p>
          <p className={styles.summary}>{l(item.summary)}</p>
        </li>
      ))}
    </ol>
  )
}
