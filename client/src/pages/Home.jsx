import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Projects from '../components/Projects'
import Ratings from '../components/Ratings'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Ratings />
      <Contact />
      <Footer />
    </main>
  )
}
