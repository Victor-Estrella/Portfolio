import 'devicon/devicon.min.css'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import ClickSpark from '@reactbits/ClickSpark/ClickSpark'

function App() {
  return (
    <ClickSpark sparkColor="#38bdf8" sparkCount={8} sparkRadius={20} duration={450}>
      <div className="relative min-h-screen bg-background">
        <Navbar />

        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>

        <Footer />
      </div>
    </ClickSpark>
  )
}

export default App
