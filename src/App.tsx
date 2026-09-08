import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './components/pages/home/Home';
import About from './components/pages/about/About';
import Skills from './components/pages/skills/Skills';
import Projects from './components/pages/projects/Projects';
import Resume from './components/pages/resume/Resume';
import Experience from './components/pages/experience/Experience';
import Contact from './components/pages/contact/Contact';

import ScrollToTop from './components/ScrollToTop';

import { Navigate, Route, Routes } from 'react-router-dom';
import { useSettings } from './contexts/useSettings';
import { SectionGuard } from './components/SectionGuard';
import { useTranslation } from 'react-i18next';

function App() {
  console.log(`%cWelcome to My Portfolio!`, 'color: #8B2BE2; font-size: 20px; font-weight: bold;');
  const { isInitialLoading } = useSettings();
  const { t } = useTranslation();

  return (
    <div className="App">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-linear-to-r focus:from-[#8000FF] focus:to-[#00FFFF] focus:px-4 focus:py-2 focus:font-semibold focus:text-white focus:shadow-lg"
      >
        {t('accessibility.skipToContent')}
      </a>
      {isInitialLoading && (
        <div className="sr-only" role="status" aria-live="polite">
          {t('accessibility.navigationUpdating')}
        </div>
      )}
      <ScrollToTop />
      <Navbar />
      <main id="main-content" tabIndex={-1} className='min-h-screen max-w-[1200px] mx-auto mt-12 px-4 py-8'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<SectionGuard setting="showAbout"><About /></SectionGuard>} />
          <Route path="/skills" element={<SectionGuard setting="showSkills"><Skills /></SectionGuard>} />
          <Route path="/projects" element={<SectionGuard setting="showProjects"><Projects /></SectionGuard>} />
          <Route path="/experience" element={<SectionGuard setting="showExperience"><Experience /></SectionGuard>} />
          <Route path="/contact" element={<SectionGuard setting="showContact"><Contact /></SectionGuard>} />
          <Route path="/resume" element={<SectionGuard setting="showResume"><Resume /></SectionGuard>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
