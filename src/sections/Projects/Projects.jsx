import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react'
import { projects } from '../../data/projects'
import { profile } from '../../data/profile'
import { ProjectCard } from '../../components/ProjectCard/ProjectCard'
import { useLanguage } from '../../i18n/language'
import styles from './Projects.module.css'

const github = profile.socials.find((social) => social.label === 'GitHub')

// How long each project stays before the slider advances on its own.
const AUTOPLAY_MS = 6000

export function Projects() {
  const { t } = useLanguage()
  const reduceMotion = useReducedMotion()
  const trackRef = useRef(null)
  const carouselRef = useRef(null)
  const [active, setActive] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pageHidden, setPageHidden] = useState(false)
  const total = projects.length
  const autoplay = !reduceMotion && total > 1
  const playing = autoplay && !userPaused && !hovered && !focused && visible && !pageHidden

  // The slide whose left edge is closest to the track's start is the active one.
  const syncActive = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const maxScroll = track.scrollWidth - track.clientWidth
    if (track.scrollLeft >= maxScroll - 2) {
      setActive(total - 1)
      return
    }
    const start = track.scrollLeft + parseFloat(getComputedStyle(track).paddingLeft)
    let nearest = 0
    let nearestDistance = Infinity
    Array.from(track.children).forEach((slide, index) => {
      const distance = Math.abs(slide.offsetLeft - start)
      if (distance < nearestDistance) {
        nearest = index
        nearestDistance = distance
      }
    })
    setActive(nearest)
  }, [total])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(syncActive)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [syncActive])

  // Only run while the slider is on screen and the tab is visible
  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.4,
    })
    observer.observe(carousel)
    const onVisibility = () => setPageHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  const goTo = (index) => {
    const track = trackRef.current
    const slide = track?.children[index]
    if (!slide) return
    track.scrollTo({
      left: slide.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft),
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <section id="work" className={`${styles.projects} page-grid`} data-scene-zone="paper" aria-labelledby="work-title">
      <h2 id="work-title" className={styles.title}>
        {t('workTitle')}
      </h2>
      <p className={styles.lead}>
        {t('workLead')}
      </p>

      <div
        ref={carouselRef}
        className={styles.carousel}
        role="region"
        aria-roledescription="carousel"
        aria-label={t('projectsCarousel')}
        data-autoplay={autoplay || undefined}
        data-playing={playing || undefined}
        style={{ '--autoplay-duration': `${AUTOPLAY_MS}ms` }}
        onPointerEnter={(event) => event.pointerType === 'mouse' && setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
        }}
      >
        <ul ref={trackRef} className={styles.track}>
          {projects.map((project, index) => (
            <li
              key={project.id}
              className={styles.slide}
              aria-roledescription="slide"
              aria-label={`${index + 1} ${t('slideOf')} ${total}`}
              data-active={index === active || undefined}
            >
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>

        <div className={styles.controls}>
          <p className={styles.counter} aria-live={playing ? 'off' : 'polite'}>
            <span className={styles.current}>{String(active + 1).padStart(2, '0')}</span>
            <span className={styles.total}> / {String(total).padStart(2, '0')}</span>
          </p>

          {/* The active bar fills over AUTOPLAY_MS; when it finishes, the next project slides in */}
          <div
            className={styles.progress}
            aria-hidden="true"
            onAnimationEnd={(event) => {
              if (autoplay && event.target.dataset.active !== undefined) goTo((active + 1) % total)
            }}
          >
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                tabIndex={-1}
                className={styles.tick}
                data-active={index === active || undefined}
                onClick={() => goTo(index)}
              />
            ))}
          </div>

          <div className={styles.arrows}>
            {autoplay && (
              <button
                type="button"
                className={`${styles.arrow} ${styles.toggle}`}
                onClick={() => setUserPaused((paused) => !paused)}
                aria-label={userPaused ? t('playSlides') : t('pauseSlides')}
              >
                {userPaused ? (
                  <Play size={18} strokeWidth={1.75} aria-hidden="true" />
                ) : (
                  <Pause size={18} strokeWidth={1.75} aria-hidden="true" />
                )}
              </button>
            )}
            <button
              type="button"
              className={styles.arrow}
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label={t('previousProject')}
            >
              <ArrowLeft size={20} strokeWidth={1.75} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => goTo(active + 1)}
              disabled={active === total - 1}
              aria-label={t('nextProject')}
            >
              <ArrowRight size={20} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        </div>
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
