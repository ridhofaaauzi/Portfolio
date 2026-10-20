import { m } from 'motion/react'
import styles from './SplitText.module.css'

const ease = [0.22, 1, 0.36, 1]

// Full `transform` strings (not `y`) let Motion run these on the compositor.
const charVariants = {
  hidden: { transform: 'translateY(108%)' },
  visible: ({ delay }) => ({ transform: 'translateY(0%)', transition: { delay, duration: 0.9, ease } }),
}

/**
 * Display text whose letters rise out of a mask, line by line.
 * trigger: 'mount' (on first render), 'inView' (when scrolled into view) or 'none'.
 * play: with trigger 'mount', hold the letters hidden until this is true.
 */
export function SplitText({
  as = 'h2',
  lines,
  label,
  trigger = 'mount',
  play = true,
  delay = 0,
  stagger = 0.035,
  maxSpread = 0.5,
  className = '',
  lineClassName = '',
  ...rest
}) {
  const Tag = m[as]
  const triggerProps =
    trigger === 'mount'
      ? { initial: 'hidden', animate: play ? 'visible' : 'hidden' }
      : trigger === 'inView'
        ? { initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.6 } }
        : { initial: false }

  // Long names shouldn't take longer to appear: cap the total stagger.
  const charCount = lines.join('').length
  const step = Math.min(stagger, maxSpread / charCount)
  let index = 0

  return (
    <Tag className={className} {...triggerProps} {...rest}>
      <span className="visually-hidden">{label ?? lines.join(' ')}</span>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className={`${styles.line} ${lineClassName}`} aria-hidden="true">
          {[...line].map((char) => {
            const i = index++
            return (
              <m.span
                key={i}
                className={styles.char}
                variants={charVariants}
                custom={{ delay: delay + i * step }}
              >
                {char === ' ' ? '\u00A0' : char}
              </m.span>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}
