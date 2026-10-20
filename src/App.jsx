import { MainLayout } from './layouts/MainLayout'
import { Hero } from './sections/Hero/Hero'
import { About } from './sections/About/About'
import { Projects } from './sections/Projects/Projects'
import { Experience } from './sections/Experience/Experience'
import { Skills } from './sections/Skills/Skills'
import { Contact } from './sections/Contact/Contact'

// Order: introduce → show the work early for recruiters → background → contact.
export default function App() {
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
