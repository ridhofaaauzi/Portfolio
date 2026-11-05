import { ArrowLeft, ArrowRight } from 'lucide-react'
import { projects } from '../../data/projects'
import { Button } from '../../components/Button/Button'
import { useLanguage } from '../../i18n/language'
import { home, pathFor } from '../../routes'
import styles from './NotFound.module.css'

// Served (as dist/404.html) for any URL that doesn't exist; points back to the work.
export function NotFound() {
  const { lang, t } = useLanguage()

  return (
    <section id="top" className={`${styles.page} page-grid`} data-scene-zone="paper" aria-labelledby="not-found-title">
      <div className={styles.message}>
        <p className={styles.code} aria-hidden="true">
          404
        </p>
        <h1 id="not-found-title" className={styles.title}>
          {t('notFoundTitle')}
        </h1>
        <p className={styles.body}>{t('notFoundBody')}</p>
        <div className={styles.actions}>
          <Button href={pathFor(home, lang)} icon={ArrowLeft} iconDirection="left">
            {t('backHome')}
          </Button>
        </div>
      </div>

      <nav className={styles.work} aria-labelledby="not-found-work">
        <h2 id="not-found-work" className={styles.subtitle}>
          {t('notFoundWork')}
        </h2>
        <ul className={styles.projects}>
          {projects.map((project) => (
            <li key={project.id}>
              <a href={pathFor({ type: 'project', id: project.id }, lang)} className={styles.project}>
                {project.title}
                <ArrowRight size={24} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}
