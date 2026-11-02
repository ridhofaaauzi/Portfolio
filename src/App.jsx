import { MainLayout } from './layouts/MainLayout'
import { Hero } from './sections/Hero/Hero'
import { About } from './sections/About/About'
import { Projects } from './sections/Projects/Projects'
import { Experience } from './sections/Experience/Experience'
import { Skills } from './sections/Skills/Skills'
import { Contact } from './sections/Contact/Contact'
import { CaseStudy } from './pages/CaseStudy/CaseStudy'
import { NotFound } from './pages/NotFound/NotFound'
import { useRoute } from './routes'

export default function App() {
  const route = useRoute()

  if (route.type === 'notFound') {
    return (
      <MainLayout>
        <NotFound />
      </MainLayout>
    )
  }

  if (route.type === 'project') {
    return (
      <MainLayout>
        <CaseStudy id={route.id} />
        <Contact />
      </MainLayout>
    )
  }

  // Order: introduce → show the work early for recruiters → background → contact.
  return (
    <MainLayout>
      <Hero />
      <Projects />
      <About />
      <Experience />
      <Skills />
      <Contact />
    </MainLayout>
  )
}
