import { m } from 'motion/react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { profile } from '../../data/profile'
import { Button } from '../../components/Button/Button'
import { SplitText } from '../../components/SplitText/SplitText'
import { useLanguage } from '../../i18n/language'
import styles from './Hero.module.css'

const ease = [0.22, 1, 0.36, 1]

// Rendered twice: once as the visible surface, once as the blueprint layer
// revealed by the inspector lens. Both share the same layout so they line up.
export function HeroContent({ variant, animate, play = true }) {
  const { t, l } = useLanguage()
  const fadeUp = (delay) =>
    animate
      ? {
          initial: { opacity: 0, transform: 'translateY(16px)' },
          animate: play ? { opacity: 1, transform: 'translateY(0px)' } : { opacity: 0, transform: 'translateY(16px)' },
          transition: { delay, duration: 0.7, ease },
        }
      : {}

  const isBlueprint = variant === 'blueprint'

  return (
    <div className={styles.content} data-variant={variant}>
      <SplitText
        as="h1"
        lines={profile.displayName}
        label={profile.name}
        trigger={animate ? 'mount' : 'none'}
        play={play}
        delay={0.1}
        className={styles.name}
        lineClassName={styles.line}
        data-tag="h1"
        data-spec="font-size 17vw, line-height 0.86, wdth 75"
      />

      <m.figure
        className={styles.portrait}
        data-tag="img"
        data-spec="4 : 5"
        initial={animate ? { clipPath: 'inset(100% 0 0 0)' } : false}
        animate={{ clipPath: play || !animate ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)' }}
        transition={{ delay: 0.35, duration: 1.1, ease }}
      >
        {profile.portrait && !isBlueprint ? (
          <img src={profile.portrait} alt={`${t('portraitOf')} ${profile.name}`} width="640" height="800" decoding="async" />
        ) : (
          <PortraitPlaceholder blueprint={isBlueprint} label={t('portraitPlaceholder')} />
        )}
      </m.figure>

      <m.p className={styles.headline} data-tag="p.headline" {...fadeUp(0.45)}>
        {l(profile.headline)}
      </m.p>

      <m.div className={styles.aside} data-tag="div.about" {...fadeUp(0.6)}>
        <p className={styles.role}>
          {profile.role}, {t('basedIn')} {l(profile.location)}
        </p>
        <p className={styles.intro}>
          {l(profile.intro)}
        </p>
      </m.div>

      <m.div className={styles.ctas} data-tag="div.actions" {...fadeUp(0.75)}>
        <Button href="#work" icon={ArrowDown} iconDirection="down">
          {t('seeWork')}
        </Button>
        <Button href={`mailto:${profile.email}`} variant="secondary" icon={ArrowUpRight}>
          {t('emailMe')}
        </Button>
      </m.div>
    </div>
  )
}

function PortraitPlaceholder({ blueprint, label }) {
  if (blueprint) {
    return (
      <svg className={styles.portraitSvg} viewBox="0 0 400 500" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="0" x2="400" y2="500" />
        <line x1="400" y1="0" x2="0" y2="500" />
      </svg>
    )
  }

  return (
    <>
      <svg className={styles.portraitSvg} viewBox="0 0 400 500" aria-hidden="true">
        <circle cx="200" cy="190" r="78" />
        <path d="M60 500c0-96 62-170 140-170s140 74 140 170z" />
      </svg>
      <figcaption className={styles.portraitCaption}>{label}</figcaption>
    </>
  )
}
