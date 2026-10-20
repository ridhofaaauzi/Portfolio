import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { about } from '../../data/about'
import { useLanguage } from '../../i18n/language'
import styles from './About.module.css'

export function About() {
  const statementRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { lang, t, l } = useLanguage()
  const { scrollYProgress } = useScroll({
    target: statementRef,
    offset: ['start 0.85', 'end 0.5'],
  })
  const statement = l(about.statement)
  const words = statement.split(' ')

  return (
    <section id="about" className={`${styles.about} page-grid`} data-scene-zone="paper" aria-labelledby="about-title">
      <h2 id="about-title" className="visually-hidden">
        {t('aboutTitle')}
      </h2>

      <p ref={statementRef} className={styles.statement}>
        {reduceMotion
          ? statement
          : words.map((word, i) => (
              <Word key={`${lang}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                {word}
              </Word>
            ))}
      </p>

      <p className={styles.interests}>{l(about.interests)}</p>

      <ul className={styles.approach}>
        {about.approach.map((item) => (
          <li key={item.title.en}>
            <h3 className={styles.approachTitle}>{l(item.title)}</h3>
            <p className={styles.approachBody}>{l(item.body)}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

// Each word brightens as the statement scrolls through the viewport.
function Word({ progress, range, children }) {
  const opacity = useTransform(progress, range, [0.5, 1])
  return (
    <>
      <m.span style={{ opacity }}>{children}</m.span>{' '}
    </>
  )
}
