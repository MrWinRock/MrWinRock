import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.jpg';
import LanguageSwitcher from './LanguageSwitcher';
import { useSettings } from '../contexts/useSettings';
import { HIDDEN_SETTINGS } from '../contexts/settingsConstants';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t } = useTranslation();
    const { settings, isInitialLoading } = useSettings();
    const visibleSettings = isInitialLoading ? HIDDEN_SETTINGS : settings;

    const toggleMenu = () => {
        setIsMenuOpen((isOpen) => !isOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar xl:px-4 fixed top-0 left-0 w-full z-50 bg-[#1b1b1b] bg-opacity-95 shadow-md backdrop-blur">
            <div className='flex max-w-[1200px] mx-auto items-center justify-between p-4'>
                <div className="flex flex-row items-center justify-center gap-1 xl:gap-4">
                    <Link to="/" className="flex flex-row text-[1.5rem] xl:text-[2rem] font-black items-center">
                        <img src={logo} alt="Logo" />
                        <span className='navbar-title'>MrWinRock</span>
                    </Link>
                </div>
                {/* Desktop Menu */}
                <div className="hidden lg:flex lg:gap-4 xl:gap-6 items-center">
                    <NavLink to="/" end className="p-button">{t('nav.home')}</NavLink>
                    {visibleSettings.showAbout && <NavLink to="/about" className="p-button">{t('nav.about')}</NavLink>}
                    {visibleSettings.showSkills && <NavLink to="/skills" className="p-button">{t('nav.skills')}</NavLink>}
                    {visibleSettings.showProjects && <NavLink to="/projects" className="p-button">{t('nav.projects')}</NavLink>}
                    {visibleSettings.showExperience && <NavLink to="/experience" className="p-button">{t('nav.experience')}</NavLink>}
                    {visibleSettings.showContact && <NavLink to="/contact" className="p-button">{t('nav.contact')}</NavLink>}
                    {visibleSettings.showResume && <NavLink to="/resume" className="p-button">{t('nav.resume')}</NavLink>}
                    <LanguageSwitcher />
                </div>
                {/* Mobile Menu Button */}
                <div className="lg:hidden flex items-center gap-2">
                    <LanguageSwitcher />
                    <button
                        className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 cursor-pointer"
                        onClick={toggleMenu}
                        type="button"
                        aria-label={t(isMenuOpen ? 'nav.closeMenu' : 'nav.openMenu')}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-navigation"
                    >
                        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div id="mobile-navigation" className="lg:hidden transition-all duration-300 ease-in-out max-h-screen opacity-100">
                    <div className="flex flex-col gap-4 p-4 width-full">
                        <NavLink to="/" end className="p-button text-center" onClick={closeMenu}>{t('nav.home')}</NavLink>
                        {visibleSettings.showAbout && <NavLink to="/about" className="p-button text-center" onClick={closeMenu}>{t('nav.about')}</NavLink>}
                        {visibleSettings.showSkills && <NavLink to="/skills" className="p-button text-center" onClick={closeMenu}>{t('nav.skills')}</NavLink>}
                        {visibleSettings.showProjects && <NavLink to="/projects" className="p-button text-center" onClick={closeMenu}>{t('nav.projects')}</NavLink>}
                        {visibleSettings.showExperience && <NavLink to="/experience" className="p-button text-center" onClick={closeMenu}>{t('nav.experience')}</NavLink>}
                        {visibleSettings.showContact && <NavLink to="/contact" className="p-button text-center" onClick={closeMenu}>{t('nav.contact')}</NavLink>}
                        {visibleSettings.showResume && <NavLink to="/resume" className="p-button text-center" onClick={closeMenu}>{t('nav.resume')}</NavLink>}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
