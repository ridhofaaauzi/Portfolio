import { useEffect, useRef, useState } from 'react'
import { animate, m, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { Layers } from 'lucide-react'
import { useCanHover } from '../../hooks/useCanHover'
import { useLanguage } from '../../i18n/language'
import { useIntroDone } from '../../intro/intro'
import { HeroContent } from './HeroContent'
import styles from './Hero.module.css'

const LENS_RADIUS = 150
const ENTRANCE_MS = 1500
const lensSpring = { stiffness: 380, damping: 36, mass: 0.6 }

// Lets the fixed navbar switch to its light-on-blueprint colors.
function setNavOnBlueprint(on) {
  const root = document.documentElement
  if (on) root.dataset.inspecting = ''
  else delete root.dataset.inspecting
}

export function Hero() {
  const sectionRef = useRef(null)
  const toggleRef = useRef(null)
  const lensOpen = useRef(false)
  const inspectingRef = useRef(false)
  const reduceMotion = useReducedMotion()
  const canHover = useCanHover()
  const { t } = useLanguage()
  const introDone = useIntroDone()
  const [ready, setReady] = useState(reduceMotion)
  const [inspecting, setInspecting] = useState(false)

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, lensSpring)
  const y = useSpring(pointerY, lensSpring)
  const radius = useMotionValue(0)
  const clipPath = useMotionTemplate`circle(${radius}px at ${x}px ${y}px)`

  const lensEnabled = canHover && !reduceMotion && ready && !inspecting

  useEffect(() => () => setNavOnBlueprint(false), [])

  useEffect(() => {
    if (ready || !introDone) return
    const timer = setTimeout(() => setReady(true), ENTRANCE_MS)
    return () => clearTimeout(timer)
  }, [ready, introDone])

  const moveLens = (event) => {
    if (!lensEnabled) return
    if (!lensOpen.current) return showLens(event)
    const rect = sectionRef.current.getBoundingClientRect()
    pointerX.set(event.clientX - rect.left)
    pointerY.set(event.clientY - rect.top)
  }

  const showLens = (event) => {
    if (!lensEnabled) return
    const rect = sectionRef.current.getBoundingClientRect()
    x.jump(event.clientX - rect.left)
    y.jump(event.clientY - rect.top)
    pointerX.jump(event.clientX - rect.left)
    pointerY.jump(event.clientY - rect.top)
    lensOpen.current = true
    animate(radius, LENS_RADIUS, { duration: 0.45, ease: [0.22, 1, 0.36, 1] })
  }

  const hideLens = () => {
    if (!lensEnabled) return
    lensOpen.current = false
    animate(radius, 0, { duration: 0.35, ease: [0.65, 0, 0.35, 1] })
  }

  // The toggle is the keyboard/touch way in: the blueprint wipes out from the button.
  const toggleInspect = () => {
    const section = sectionRef.current.getBoundingClientRect()
    const button = toggleRef.current.getBoundingClientRect()
    const cx = button.left + button.width / 2 - section.left
    const cy = button.top + button.height / 2 - section.top
    const fullRadius = Math.hypot(Math.max(cx, section.width - cx), Math.max(cy, section.height - cy))
    const next = !inspecting

    setReady(true)

    x.jump(cx)
    y.jump(cy)
    pointerX.jump(cx)
    pointerY.jump(cy)
    setInspecting(next)
    inspectingRef.current = next
    lensOpen.current = false

    if (!next) setNavOnBlueprint(false)

    if (reduceMotion) {
      radius.jump(next ? fullRadius : 0)
      setNavOnBlueprint(next)
    } else {
      animate(radius, next ? fullRadius : 0, { duration: next ? 0.9 : 0.6, ease: [0.65, 0, 0.35, 1] }).then(
        () => inspectingRef.current && setNavOnBlueprint(true),
      )
    }
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      className={styles.hero}
      data-scene-zone="paper"
      data-inspecting={inspecting || undefined}
      aria-label={t('heroLabel')}
      onPointerMove={moveLens}
      onPointerEnter={showLens}
      onPointerLeave={hideLens}
    >
      <HeroContent variant="surface" animate={!reduceMotion} play={introDone} />

      {/* Mounted after the entrance so first paint only lays out one copy of the hero */}
      <m.div className={styles.blueprint} style={{ clipPath }} aria-hidden="true" inert>
        {ready && (
          <>
            <div className={styles.grid}>
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} />
              ))}
            </div>
            <HeroContent variant="blueprint" />
          </>
        )}
      </m.div>

      <m.div
        className={styles.inspect}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <button
          ref={toggleRef}
          className={styles.inspectButton}
          aria-pressed={inspecting}
          onClick={toggleInspect}
        >
          <Layers size={16} strokeWidth={1.75} aria-hidden="true" />
          {inspecting ? t('hideStructure') : t('showStructure')}
        </button>
        {canHover && !reduceMotion && !inspecting && (
          <span className={styles.inspectHint}>{t('inspectHint')}</span>
        )}
      </m.div>
    </section>
  )
}
