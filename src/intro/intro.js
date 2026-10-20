import { useSyncExternalStore } from 'react'
import { animate } from 'motion/react'

// Line-reveal intro: a blueprint line grows with loading progress, widens
// into a blueprint panel, then the panel splits open from the centre.
// The overlay markup lives in index.html so it covers the first paint.

const SEEN_KEY = 'intro-seen'
const MIN_LOADING_MS = 700
const MAX_LOADING_MS = 2500
const easeInOut = [0.65, 0, 0.35, 1]
const easeOut = [0.22, 1, 0.36, 1]

let done = false
const listeners = new Set()

function finish() {
  if (done) return
  done = true
  listeners.forEach((listener) => listener())
}

export function useIntroDone() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    () => done,
  )
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function whenReady(images) {
  const decodes = images.filter(Boolean).map((src) => {
    const img = new Image()
    img.src = src
    return img.decode().catch(() => {})
  })
  return Promise.race([
    Promise.all([document.fonts?.ready, ...decodes, wait(MIN_LOADING_MS)]),
    wait(MAX_LOADING_MS),
  ])
}

/** Runs the intro once per session. `images` are decoded before the reveal. */
export async function runIntro(images = []) {
  const overlay = document.getElementById('intro')
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const seen = sessionStorage.getItem(SEEN_KEY) === '1'
  const failsafeFired = overlay && getComputedStyle(overlay).visibility === 'hidden'

  if (!overlay || reduceMotion || seen || failsafeFired) {
    overlay?.remove()
    finish()
    return
  }

  overlay.style.animation = 'none' // the script is running; cancel the CSS failsafe
  sessionStorage.setItem(SEEN_KEY, '1')

  const line = overlay.querySelector('.intro-line')
  const halves = overlay.querySelectorAll('.intro-half')
  const [left, right] = halves

  try {
    // 1. Line grows towards 85% while assets load, then completes
    const grow = animate(line, { transform: ['scaleY(0)', 'scaleY(0.85)'] }, { duration: 1.1, ease: easeOut })
    await whenReady(images)
    grow.stop()
    await animate(line, { transform: 'scaleY(1)' }, { duration: 0.3, ease: easeOut })

    // 2. The line widens into a full blueprint panel
    await Promise.all([
      animate(halves, { transform: ['scaleX(0)', 'scaleX(1)'] }, { duration: 0.6, ease: easeInOut }),
      animate(line, { opacity: 0 }, { duration: 0.2, delay: 0.1 }),
    ])

    // 3. Panel splits open from the centre; the hero starts as it opens
    overlay.style.background = 'transparent'
    finish()
    await Promise.all([
      animate(left, { transform: ['scaleX(1)', 'translateX(-100%)'] }, { duration: 0.8, ease: easeInOut }),
      animate(right, { transform: ['scaleX(1)', 'translateX(100%)'] }, { duration: 0.8, ease: easeInOut }),
    ])
  } finally {
    overlay.remove()
    finish()
  }
}
