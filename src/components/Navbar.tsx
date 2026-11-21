import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
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
    const { t } = useTranslation();
    const { settings, isInitialLoading } = useSettings();
    const visible = isInitialLoading ? HIDDEN_SETTINGS : settings;
    const destinations = [
        ['/', 'home', true], ['/about', 'about', visible.showAbout], ['/projects', 'projects', visible.showProjects],
        ['/experience', 'experience', visible.showExperience], ['/skills', 'skills', visible.showSkills],
        ['/contact', 'contact', visible.showContact], ['/resume', 'resume', visible.showResume],
    ] as const;
    function closeMenu(restoreFocus = false) {
        setMenuPath(null);
        if (restoreFocus) toggle.current?.focus();
    }

    useEffect(() => {
        if (!isMenuOpen) return;
        const desktop = window.matchMedia?.('(min-width: 64rem)');
        const onViewportChange = (event: MediaQueryListEvent) => {
            if (event.matches) setMenuPath(null);
        };
        const onBackOrForward = () => setMenuPath(null);
        desktop?.addEventListener?.('change', onViewportChange);
        window.addEventListener('popstate', onBackOrForward);
        return () => {
            desktop?.removeEventListener?.('change', onViewportChange);
            window.removeEventListener('popstate', onBackOrForward);
        };
    }, [isMenuOpen]);

    const links = (mobile: boolean) => destinations.filter(([, , show]) => show).map(([to, key]) =>
        <NavLink key={to} to={to} end={to === '/'} className={`nav-link ${key === 'resume' ? 'nav-resume' : ''}`}
            onClick={mobile ? () => closeMenu() : undefined}>{t(`nav.${key}`)}</NavLink>);
    return <nav className="navbar fixed top-0 left-0 w-full z-50" aria-label={t('nav.primary')}
        onBlur={event => {
            if (isMenuOpen && event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) closeMenu();
        }}
        onKeyDown={event => {
            if (event.key === 'Escape' && isMenuOpen) {
                event.preventDefault();
                closeMenu(true);
            }
        }}>
        <div className="navbar-bar">
            <Link to="/" className="navbar-brand" onClick={() => closeMenu()}>
                <img src={logo} alt="" width="32" height="32" />
                <span className="navbar-title">mrwinrock<span aria-hidden="true">.</span></span>
            </Link>
            <span className="navbar-sep hidden lg:block" aria-hidden="true" />
            <div className="desktop-navigation hidden lg:flex">{links(false)}<LanguageSwitcher /></div>
            <div className="mobile-controls flex lg:hidden">
                <LanguageSwitcher />
                <button ref={toggle} type="button" className="menu-toggle" onClick={() => setMenuPath(isMenuOpen ? null : pathname)}
                    aria-label={t(isMenuOpen ? 'nav.closeMenu' : 'nav.openMenu')} aria-expanded={isMenuOpen} aria-controls="mobile-navigation">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                        <path className="menu-line-top" d="M4 8h16" />
                        <path className="menu-line-bottom" d="M4 16h16" />
                    </svg>
                </button>
            </div>
        </div>
        <div aria-hidden="true" className="lg:hidden mobile-menu-backdrop" data-open={isMenuOpen} onClick={() => closeMenu(true)} />
        <div id="mobile-navigation" className="mobile-navigation" data-open={isMenuOpen} inert={!isMenuOpen} aria-hidden={!isMenuOpen}>
            <div className="mobile-navigation-scroll">
                <div className="mobile-navigation-links">{links(true)}</div>
            </div>
        </div>
    </nav>;
}
