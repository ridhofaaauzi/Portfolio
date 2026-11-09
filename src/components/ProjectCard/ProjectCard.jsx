import { m, useReducedMotion } from 'motion/react'
import { ArrowRight, ArrowUpRight, Lock } from 'lucide-react'
import { Button } from '../Button/Button'
import { useLanguage } from '../../i18n/language'
import { pathFor } from '../../routes'
import styles from './ProjectCard.module.css'

function hostname(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

// variant: 'feature' (full width) or 'compact' (asymmetric column)
export function ProjectCard({ project, index = 0, variant = 'feature' }) {
  const reduceMotion = useReducedMotion()
  const { lang, t, l } = useLanguage()
  const { id, title, summary, year, role, stack, image, imageAlt, links, highlights } = project
  const primaryLink = links.demo ?? links.repo
  const caseStudy = pathFor({ type: 'project', id }, lang)
  const formattedIndex = String(index + 1).padStart(2, '0')

  return (
    <article className={styles.card} data-variant={variant}>
      <m.div
        className={styles.plate}
        initial={reduceMotion ? false : { clipPath: 'inset(18% 6% 18% 6%)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.window}>
          <div className={styles.chrome} aria-hidden="true">
            <div className={styles.chromeLeft}>
              <span className={styles.chromeIndex}>{formattedIndex}</span>
              <span className={styles.chromeSep}>/</span>
              {primaryLink ? (
                <span className={styles.address}>{hostname(primaryLink)}</span>
              ) : (
                <span className={styles.address}>
                  <Lock size={12} strokeWidth={2} />
                  {t('internalSystem')}
                </span>
              )}
            </div>
            <div className={styles.chromeRight}>
              <span className={styles.chromeTag}>
                <span className={styles.pulseDot} />
                STRUCTURE
              </span>
              {primaryLink && <ArrowUpRight className={styles.chromeIcon} size={14} strokeWidth={1.75} />}
            </div>
          </div>

          <div className={styles.media}>
            <img src={image} alt={l(imageAlt)} width="1600" height="1000" loading="lazy" decoding="async" />
            <div className={styles.blueprintOverlay} aria-hidden="true">
              <div className={styles.blueprintGrid} />
              <div className={styles.blueprintHeader}>
                <span className={styles.blueprintTag}>
                  <code>SYS.ARCH // {l(role)}</code>
                </span>
                <span className={styles.blueprintCoord}>
                  <code>[{formattedIndex}]</code>
                </span>
              </div>
              {highlights && highlights[0] && (
                <div className={styles.blueprintCallout}>
                  <span className={styles.blueprintCalloutPrefix}>CORE //</span>
                  <span className={styles.blueprintCalloutText}>{l(highlights[0])}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </m.div>

      <div className={styles.body}>
        <div className={styles.heading}>
          <div className={styles.kicker}>
            <span className={styles.kickerRole}>{l(role)}</span>
            <span className={styles.kickerSep}>•</span>
            <span className={styles.kickerYear}>{l(year)}</span>
          </div>
          <h3 className={styles.title}>
            <a href={caseStudy} className={styles.titleLink}>
              {title}
            </a>
          </h3>
          <p className={styles.summary}>{l(summary)}</p>
        </div>

        <div className={styles.aside}>
          {stack.length > 0 && (
            <div className={styles.stackSection}>
              <span className={styles.stackLabel}>{t('builtWith')}</span>
              <ul className={styles.stack}>
                {stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.links}>
            <Button href={caseStudy} size="sm" icon={ArrowRight} iconDirection="right" className={styles.link}>
              {t('readCaseStudy')}
              <span className="visually-hidden">: {title}</span>
            </Button>
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
        </div>
      </div>
    </article>
  )
}
