import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './components/pages/home/Home';
import About from './components/pages/about/About';
import Skills from './components/pages/skills/Skills';
import Projects from './components/pages/projects/Projects';
import Experience from './components/pages/experience/Experience';
import Contact from './components/pages/contact/Contact';

import ScrollToTop from './utils/ScrollToTop';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Navbar />
      <main className='min-h-screen max-w-[1200px] mx-auto mt-12 px-4 py-8'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
