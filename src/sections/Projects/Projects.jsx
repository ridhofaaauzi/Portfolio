import { useEffect, useRef, useState } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { ArrowRight, ArrowUpRight, Lock } from 'lucide-react'
import { projects } from '../../data/projects'
import { profile } from '../../data/profile'
import { Button } from '../../components/Button/Button'
import { useLanguage } from '../../i18n/language'
import { pathFor } from '../../routes'
import styles from './Projects.module.css'

const github = profile.socials.find((social) => social.label === 'GitHub')

function hostname(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

/*
 * Work is an index: one row per project on the left, one sticky preview stage on
 * the right that follows whichever row is scrolled to the middle of the screen
 * (or keyboard-focused). Below 1024px the stage is dropped and every row
 * carries its own screenshot.
 */
export function Projects() {
  const { lang, t, l } = useLanguage()
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const listRef = useRef(null)
  const current = projects[active]

  // The row crossing a thin band at the middle of the viewport is the active one.
  // The last active row stays selected while the band is between rows.
  useEffect(() => {
    const rows = Array.from(listRef.current?.children ?? [])
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(rows.indexOf(entry.target))
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    rows.forEach((row) => observer.observe(row))
    return () => observer.disconnect()
  }, [])
  const currentLink = current.links.demo ?? current.links.repo

  return (
    <section id="work" className={`${styles.projects} page-grid`} data-scene-zone="paper" aria-labelledby="work-title">
      <div className={styles.header}>
        <div className={styles.label}>
          <span className={styles.labelIndex}>02</span>
          <span className={styles.labelDivider}>/</span>
          <span className={styles.labelText}>{t('navWork')}</span>
        </div>
        <h2 id="work-title" className={styles.title}>
          {t('workTitle')}
        </h2>
      </div>
      <p className={styles.lead}>{t('workLead')}</p>

      <div className={styles.index}>
        <ol ref={listRef} className={styles.list}>
          {projects.map((project, index) => {
            const { id, title, summary, year, role, stack, image, links } = project
            const caseStudy = pathFor({ type: 'project', id }, lang)

            return (
              <li
                key={id}
                className={styles.row}
                data-active={index === active}
                onFocus={() => setActive(index)}
              >
                <div className={styles.rowMedia}>
                  <img src={image} alt={l(project.imageAlt)} width="1600" height="1000" loading="lazy" decoding="async" />
                </div>

                <p className={styles.meta}>
                  <span>{l(year)}</span>
                  <span className={styles.metaSep} aria-hidden="true">
                    /
                  </span>
                  <span>{l(role)}</span>
                </p>

                <h3 className={styles.rowTitle}>
                  <a href={caseStudy} className={styles.rowLink}>
                    {title}
                  </a>
                </h3>

                <p className={styles.summary}>{l(summary)}</p>

                {stack.length > 0 && (
                  <div className={styles.stackWrap}>
                    <span className="visually-hidden">{t('builtWith')}</span>
                    <ul className={styles.stack}>
                      {stack.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className={styles.actions}>
                  <Button href={caseStudy} size="sm" icon={ArrowRight} iconDirection="right" className={styles.action}>
                    {t('readCaseStudy')}
                    <span className="visually-hidden">: {title}</span>
                  </Button>
                  {links.demo && (
                    <Button
                      href={links.demo}
                      variant="secondary"
                      size="sm"
                      icon={ArrowUpRight}
                      className={styles.action}
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
                      className={styles.action}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t('sourceCode')}
                      <span className="visually-hidden"> {t('newTab')}</span>
                    </Button>
                  )}
                </div>
              </li>
            )
          })}
        </ol>

        {/* Decorative: the same screenshots as the rows, so assistive tech skips it */}
        <m.div
          className={styles.stage}
          aria-hidden="true"
          initial={reduceMotion ? false : { clipPath: 'inset(14% 4% 14% 4%)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.window}>
            <div className={styles.chrome}>
              {currentLink ? (
                <span className={styles.address}>{hostname(currentLink)}</span>
              ) : (
                <span className={styles.address}>
                  <Lock size={12} strokeWidth={2} />
                  {t('internalSystem')}
                </span>
              )}
              {currentLink && <ArrowUpRight size={14} strokeWidth={1.75} />}
            </div>

            <div className={styles.media}>
              {projects.map((project, index) => (
                <img
                  key={project.id}
                  src={project.image}
                  alt=""
                  width="1600"
                  height="1000"
                  loading="lazy"
                  decoding="async"
                  data-active={index === active}
                />
              ))}

              <div className={styles.blueprint}>
                <div className={styles.blueprintGrid} />
                {current.highlights?.[0] && (
                  <p className={styles.callout}>
                    <span className={styles.calloutPrefix}>{l(current.role)}</span>
                    <span>{l(current.highlights[0])}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </m.div>
      </div>

      {github && (
        <a href={github.href} className={styles.more}>
          {t('moreOnGitHub')}
          <ArrowUpRight size={20} strokeWidth={1.75} aria-hidden="true" />
        </a>
      )}
    </section>
  )
}
