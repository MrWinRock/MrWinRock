import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './components/pages/home/Home';
import { lazy, Suspense } from 'react';
const About = lazy(() => import('./components/pages/about/About'));
const Skills = lazy(() => import('./components/pages/skills/Skills'));
const Projects = lazy(() => import('./components/pages/projects/Projects'));
const ProjectDetail = lazy(() => import('./components/pages/projects/ProjectDetail'));
const Resume = lazy(() => import('./components/pages/resume/Resume'));
const Experience = lazy(() => import('./components/pages/experience/Experience'));
const Contact = lazy(() => import('./components/pages/contact/Contact'));
const NotFound = lazy(() => import('./components/pages/NotFound'));
import { PageMetadata } from './components/PageMetadata';
import { PublicDataNotice } from './components/PublicDataNotice';

import ScrollToTop from './components/ScrollToTop';

import { Route, Routes } from 'react-router-dom';
import { useSettings } from './contexts/useSettings';
import { SectionGuard } from './components/SectionGuard';
import { useTranslation } from 'react-i18next';

function App() {
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
      <PageMetadata />
      <Navbar />
      <main id="main-content" tabIndex={-1} className='min-h-screen max-w-[1200px] mx-auto mt-12 px-4 py-8'>
        <Suspense fallback={<PublicDataNotice state={{ status: 'loading' }} />}><Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<SectionGuard setting="showAbout"><About /></SectionGuard>} />
          <Route path="/skills" element={<SectionGuard setting="showSkills"><Skills /></SectionGuard>} />
          <Route path="/projects" element={<SectionGuard setting="showProjects"><Projects /></SectionGuard>} />
          <Route path="/projects/:slug" element={<SectionGuard setting="showProjects"><ProjectDetail /></SectionGuard>} />
          <Route path="/experience" element={<SectionGuard setting="showExperience"><Experience /></SectionGuard>} />
          <Route path="/contact" element={<SectionGuard setting="showContact"><Contact /></SectionGuard>} />
          <Route path="/resume" element={<SectionGuard setting="showResume"><Resume /></SectionGuard>} />
          <Route path="*" element={<NotFound />} />
        </Routes></Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
