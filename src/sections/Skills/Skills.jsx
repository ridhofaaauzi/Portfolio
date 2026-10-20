import { skills } from '../../data/skills'
import { useLanguage } from '../../i18n/language'
import styles from './Skills.module.css'

export function Skills() {
  const { t, l } = useLanguage()

  return (
    <section id="skills" className={`${styles.skills} page-grid`} data-scene-zone="ink" aria-labelledby="skills-title">
      <h2 id="skills-title" className={styles.title}>
        {t('skillsTitle')}
      </h2>

      <div className={styles.groups}>
        {skills.map((group) => (
          <div key={l(group.group)} className={styles.group}>
            <h3 className={styles.groupTitle}>{l(group.group)}</h3>
            <ul className={styles.items}>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
