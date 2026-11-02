import styles from './Button.module.css'

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconDirection = 'up-right',
  className = '',
  children,
  ...rest
}) {
  const classes = [styles.button, styles[variant], styles[size], className].join(' ')
  // iconDirection: 'up-right' (external), 'down', 'left' or 'right' — sets the hover nudge
  const nudge = { down: styles.iconDown, left: styles.iconLeft, right: styles.iconRight }[iconDirection] ?? ''
  const iconClass = `${styles.icon} ${nudge}`
  const content = (
    <>
      <span className={styles.fill} aria-hidden="true" />
      <span className={styles.label}>{children}</span>
      {Icon && <Icon className={iconClass} size={18} strokeWidth={1.75} aria-hidden="true" />}
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}
