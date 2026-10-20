import { m, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../../i18n/language'
import styles from './ProjectCard.module.css'

export function ProjectCard({ project, size = 'feature' }) {
  const reduceMotion = useReducedMotion()
  const { t, l } = useLanguage()
  const { title, summary, year, role, stack, image, imageAlt, links } = project
  const primaryLink = links.demo ?? links.repo

  return (
    <article className={styles.card} data-size={size}>
      <m.div
        className={styles.media}
        initial={reduceMotion ? false : { clipPath: 'inset(18% 6% 18% 6%)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={image} alt={l(imageAlt)} width="1600" height="1000" loading="lazy" decoding="async" />
      </m.div>

      <div className={styles.body}>
        <div className={styles.heading}>
          <h3 className={styles.title}>
            {primaryLink ? (
              <a href={primaryLink} className={styles.titleLink} target="_blank" rel="noreferrer">
                {title}
              </a>
            ) : (
              title
            )}
          </h3>
          <p className={styles.summary}>{l(summary)}</p>
        </div>

        <dl className={styles.meta}>
          <div>
            <dt>{t('year')}</dt>
            <dd>{l(year)}</dd>
          </div>
          <div>
            <dt>{t('role')}</dt>
            <dd>{l(role)}</dd>
          </div>
          {stack.length > 0 && (
            <div>
              <dt>{t('builtWith')}</dt>
              <dd>
                <ul className={styles.stack}>
                  {stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>

        {primaryLink && (
          <div className={styles.links}>
            {links.demo && (
              <a href={links.demo} className={styles.link} target="_blank" rel="noreferrer">
                {t('visitSite')} <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                <span className="visually-hidden"> {t('newTab')}</span>
              </a>
            )}
            {links.repo && (
              <a href={links.repo} className={styles.link} target="_blank" rel="noreferrer">
                {t('sourceCode')} <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                <span className="visually-hidden"> {t('newTab')}</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
