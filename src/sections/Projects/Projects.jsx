import { ArrowUpRight } from 'lucide-react'
import { projects } from '../../data/projects'
import { profile } from '../../data/profile'
import { ProjectCard } from '../../components/ProjectCard/ProjectCard'
import { useLanguage } from '../../i18n/language'
import styles from './Projects.module.css'

const github = profile.socials.find((social) => social.label === 'GitHub')

// Every project stays visible: the first as a full-width feature, the rest in pairs.
export function Projects() {
  const { t } = useLanguage()

  return (
    <section id="work" className={`${styles.projects} page-grid`} data-scene-zone="paper" aria-labelledby="work-title">
      <h2 id="work-title" className={styles.title}>
        {t('workTitle')}
      </h2>
      <p className={styles.lead}>
        {t('workLead')}
      </p>

      <ul className={styles.list}>
        {projects.map((project, index) => (
          <li key={project.id} className={index === 0 ? styles.featured : styles.item}>
            <ProjectCard project={project} variant={index === 0 ? 'feature' : 'compact'} />
          </li>
        ))}
      </ul>

      {github && (
        <a href={github.href} className={styles.more}>
          {t('moreOnGitHub')}
          <ArrowUpRight size={20} strokeWidth={1.75} aria-hidden="true" />
        </a>
      )}
    </section>
  )
}
