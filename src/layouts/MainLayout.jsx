import { Navbar } from '../components/Navbar/Navbar'
import { Footer } from '../components/Footer/Footer'
import { useScene } from '../hooks/useScene'
import { useLanguage } from '../i18n/language'

export function MainLayout({ children }) {
  useScene()
  const { t } = useLanguage()

  return (
    <>
      <a href="#main" className="skip-link">
        {t('skipToContent')}
      </a>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  )
}
