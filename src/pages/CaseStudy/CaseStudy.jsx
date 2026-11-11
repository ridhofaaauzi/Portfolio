import { m, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from 'lucide-react'
import { profile } from '../../data/profile'
import { projects } from '../../data/projects'
import { Button } from '../../components/Button/Button'
import { EmailButton } from '../../components/EmailButton/EmailButton'
import { SplitText } from '../../components/SplitText/SplitText'
import { useLanguage } from '../../i18n/language'
import { useIntroDone } from '../../intro/intro'
import { pathFor, useHomeHref } from '../../routes'
import styles from './CaseStudy.module.css'

const ease = [0.22, 1, 0.36, 1]

// One page per project at /work/<id>/. Content lives in src/data/projects.js;
// the Results and Screens blocks stay hidden until metrics/gallery are filled in.
export function CaseStudy({ id }) {
  const { lang, t, l } = useLanguage()
  const homeHref = useHomeHref()
  const reduceMotion = useReducedMotion()
  const introDone = useIntroDone()

  const index = projects.findIndex((project) => project.id === id)
  const project = projects[index]
  const next = projects[(index + 1) % projects.length]
  const { title, summary, year, role, stack, image, imageAlt, links, context, highlights, metrics, gallery } =
    project
  const site = links.demo ?? links.repo

  const fadeUp = (delay) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, transform: 'translateY(16px)' },
          animate: introDone ? { opacity: 1, transform: 'translateY(0px)' } : undefined,
          transition: { delay, duration: 0.7, ease },
        }

  return (
    <article className={styles.page}>
      <header id="top" className={`${styles.header} page-grid`} data-scene-zone="paper">
        <m.a href={homeHref('work', lang)} className={styles.back} {...fadeUp(0)}>
          <ArrowLeft size={18} strokeWidth={1.75} aria-hidden="true" />
          {t('allWork')}
        </m.a>

        <m.p className={styles.eyebrow} {...fadeUp(0.05)}>
          {t('caseStudy')} · {l(year)}
        </m.p>

        <SplitText
          as="h1"
          lines={[title]}
          trigger={reduceMotion ? 'none' : 'mount'}
          play={introDone}
          delay={0.1}
          className={styles.title}
        />

        <m.p className={styles.lead} {...fadeUp(0.3)}>
          {l(summary)}
        </m.p>

        <m.dl className={styles.meta} {...fadeUp(0.4)}>
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
              <dd>{stack.join(', ')}</dd>
            </div>
          )}
          <div>
            <dt>Link</dt>
            <dd>
              {site ? (
                <a href={site} className={styles.siteLink} target="_blank" rel="noreferrer">
                  {new URL(site).hostname.replace(/^www\./, '')}
                  <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
                  <span className="visually-hidden"> {t('newTab')}</span>
                </a>
              ) : (
                <span className={styles.internal}>
                  <Lock size={12} strokeWidth={2} aria-hidden="true" />
                  {t('internalSystem')}
                </span>
              )}
            </dd>
          </div>
        </m.dl>

        <m.figure className={styles.cover} {...fadeUp(0.5)}>
          <img src={image} alt={l(imageAlt)} width="1600" height="1000" fetchPriority="high" decoding="async" />
        </m.figure>
      </header>

      <div className={`${styles.body} page-grid`} data-scene-zone="paper">
        <section className={styles.block} aria-labelledby="context-title">
          <h2 id="context-title" className={styles.blockTitle}>
            {t('contextTitle')}
          </h2>
          <p className={styles.text}>{l(context)}</p>
        </section>

        <section className={styles.block} aria-labelledby="built-title">
          <h2 id="built-title" className={styles.blockTitle}>
            {t('contributionTitle')}
          </h2>
          <ol className={styles.highlights}>
            {highlights.map((item, i) => (
              <li key={i}>
                <span className={styles.index} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {l(item)}
              </li>
            ))}
          </ol>
        </section>

        {metrics.length > 0 && (
          <section className={styles.block} aria-labelledby="results-title">
            <h2 id="results-title" className={styles.blockTitle}>
              {t('resultsTitle')}
            </h2>
            <dl className={styles.metrics}>
              {metrics.map((metric, i) => (
                <div key={i}>
                  <dt>{l(metric.label)}</dt>
                  <dd>{metric.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {gallery.length > 0 && (
          <section className={styles.block} aria-labelledby="gallery-title">
            <h2 id="gallery-title" className={styles.blockTitle}>
              {t('galleryTitle')}
            </h2>
            <ul className={styles.gallery}>
              {gallery.map((shot, i) => (
                <li key={i}>
                  <img
                    src={shot.src}
                    alt={l(shot.alt)}
                    width={shot.width ?? 1600}
                    height={shot.height ?? 1000}
                    loading="lazy"
                    decoding="async"
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        {site && (
          <div className={styles.actions}>
            <Button href={site} icon={ArrowUpRight} target="_blank" rel="noreferrer">
              {t('visitSite')}
              <span className="visually-hidden"> {t('newTab')}</span>
            </Button>
          </div>
        )}

        <section className={styles.block} aria-labelledby="work-together-title">
          <h2 id="work-together-title" className={styles.blockTitle}>
            {t('workTogetherTitle')}
          </h2>
          <div className={styles.contact}>
            <p className={styles.text}>{l(profile.availability)}</p>
            <div className={styles.contactLinks}>
              <EmailButton />
              {profile.resume && (
                <a href={l(profile.resume)} className={styles.resume} target="_blank" rel="noreferrer">
                  {t('resume')}
                  <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                  <span className="visually-hidden"> {t('newTab')}</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {next.id !== id && (
          <a href={pathFor({ type: 'project', id: next.id }, lang)} className={styles.next}>
            <span className={styles.nextLabel}>{t('nextProject')}</span>
            <span className={styles.nextTitle}>
              {next.title}
              <ArrowRight size={32} strokeWidth={1.5} aria-hidden="true" />
            </span>
          </a>
        )}
      </div>
    </article>
  )
}
