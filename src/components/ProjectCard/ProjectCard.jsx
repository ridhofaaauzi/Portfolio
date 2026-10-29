import { m, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Lock } from 'lucide-react'
import { Button } from '../Button/Button'
import { useLanguage } from '../../i18n/language'
import styles from './ProjectCard.module.css'

function hostname(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export function ProjectCard({ project }) {
  const reduceMotion = useReducedMotion()
  const { t, l } = useLanguage()
  const { title, summary, year, role, stack, image, imageAlt, links } = project
  const primaryLink = links.demo ?? links.repo

  return (
    <article className={styles.card}>
      <m.div
        className={styles.plate}
        initial={reduceMotion ? false : { clipPath: 'inset(18% 6% 18% 6%)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.window}>
          <div className={styles.chrome} aria-hidden="true">
            {primaryLink ? (
              <span className={styles.address}>{hostname(primaryLink)}</span>
            ) : (
              <span className={styles.address}>
                <Lock size={12} strokeWidth={2} />
                {t('internalSystem')}
              </span>
            )}
            {primaryLink && <ArrowUpRight className={styles.chromeIcon} size={14} strokeWidth={1.75} />}
          </div>
          <div className={styles.media}>
            <img src={image} alt={l(imageAlt)} width="1600" height="1000" loading="lazy" decoding="async" />
          </div>
        </div>
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

        <div className={styles.aside}>
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
                <Button
                  href={links.demo}
                  variant="secondary"
                  size="sm"
                  icon={ArrowUpRight}
                  className={styles.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('visitSite')}
                  <span className="visually-hidden"> {t('newTab')}</span>
                </Button>
              )}
              {links.repo && (
                <Button
                  href={links.repo}
                  variant="secondary"
                  size="sm"
                  icon={ArrowUpRight}
                  className={styles.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('sourceCode')}
                  <span className="visually-hidden"> {t('newTab')}</span>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
