import { useEffect, useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { profile } from '../../data/profile'
import { useLanguage } from '../../i18n/language'
import { copyText } from '../../utils/copyText'
import { Button } from '../Button/Button'

// mailto: does nothing on machines with no default mail app (common on Windows and
// with webmail users), so the click also copies the address and says so.
export function EmailButton({ variant = 'secondary', ...rest }) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2500)
    return () => clearTimeout(timer)
  }, [copied])

  // The mailto: navigation still goes ahead either way
  const copy = async () => setCopied(await copyText(profile.email))

  return (
    <>
      <Button
        href={`mailto:${profile.email}`}
        variant={variant}
        icon={copied ? Check : ArrowUpRight}
        onClick={copy}
        {...rest}
      >
        {copied ? t('emailCopied') : t('emailMe')}
      </Button>
      <span className="visually-hidden" role="status">
        {copied ? t('copiedStatus') : ''}
      </span>
    </>
  )
}
