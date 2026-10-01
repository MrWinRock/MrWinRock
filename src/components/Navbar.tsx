import { Link, NavLink, useLocation } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.webp';
import LanguageSwitcher from './LanguageSwitcher';
import { useSettings } from '../contexts/useSettings';
import { HIDDEN_SETTINGS } from '../contexts/settingsConstants';

export default function Navbar() {
    const [menuPath, setMenuPath] = useState<string | null>(null);
    const toggle = useRef<HTMLButtonElement>(null);
    const { pathname } = useLocation();
    const isMenuOpen = menuPath === pathname;
    const setIsMenuOpen = (open: boolean) => setMenuPath(open ? pathname : null);
    const { t } = useTranslation();
    const { settings, isInitialLoading } = useSettings();
    const visible = isInitialLoading ? HIDDEN_SETTINGS : settings;
    const destinations = [
        ['/', 'home', true], ['/about', 'about', visible.showAbout], ['/projects', 'projects', visible.showProjects],
        ['/experience', 'experience', visible.showExperience], ['/skills', 'skills', visible.showSkills],
        ['/contact', 'contact', visible.showContact], ['/resume', 'resume', visible.showResume],
    ] as const;
    const links = (mobile: boolean) => destinations.filter(([, , show]) => show).map(([to, key]) =>
        <NavLink key={to} to={to} end={to === '/'} className={`nav-link ${key === 'resume' ? 'nav-resume' : ''}`} onClick={() => mobile && setIsMenuOpen(false)}>{t(`nav.${key}`)}</NavLink>);
    return <nav className="navbar fixed top-0 left-0 w-full z-50 bg-[#1b1b1b]/95 backdrop-blur" aria-label={t('nav.primary')}
        onKeyDown={event => { if (event.key === 'Escape' && isMenuOpen) { setIsMenuOpen(false); toggle.current?.focus(); } }}>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-3">
            <Link to="/" className="flex items-center font-black text-xl shrink-0"><img src={logo} alt="" width="32" height="32" /><span className="navbar-title">MrWinRock</span></Link>
            <div className="hidden lg:flex items-center gap-1 xl:gap-3">{links(false)}<LanguageSwitcher /></div>
            <div className="lg:hidden flex items-center gap-2"><LanguageSwitcher /><button ref={toggle} type="button" className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={t(isMenuOpen ? 'nav.closeMenu' : 'nav.openMenu')} aria-expanded={isMenuOpen} aria-controls="mobile-navigation"><span aria-hidden="true">{isMenuOpen ? '×' : '☰'}</span></button></div>
        </div>
        {isMenuOpen && <div id="mobile-navigation" className="lg:hidden mobile-navigation"><div className="flex flex-col gap-1 px-4 pb-4">{links(true)}</div></div>}
    </nav>;
}
