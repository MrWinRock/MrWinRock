import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
export function PageMetadata({ title, description }: { title?: string; description?: string }) {
    const { pathname } = useLocation(); const { t } = useTranslation();
    const key = pathname.split('/')[1] || 'home';
    const pageTitle = title ?? (key === 'home' ? t('home.subtitle') : t('nav.' + key, { defaultValue: t('notFound.title') }));
    const summary = description ?? t('home.description');
    useEffect(() => {
        const localePrefix = /^\/th(?:\/|$)/.test(window.location.pathname) ? '/th' : '';
        document.title = pageTitle + ' | MrWinRock';
        const update = (name: string, content: string, property = false) => {
            let element = document.head.querySelector<HTMLMetaElement>(`meta[${property ? 'property' : 'name'}="${name}"]`);
            if (!element) { element = document.createElement('meta'); element.setAttribute(property ? 'property' : 'name', name); document.head.appendChild(element); }
            element.content = content;
        };
        update('description', summary); update('og:title', document.title, true); update('og:description', summary, true);
        update('og:url', 'https://mrwinrock.com' + localePrefix + pathname, true); update('twitter:title', document.title); update('twitter:description', summary);
        let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
        canonical.href = 'https://mrwinrock.com' + localePrefix + pathname;
    }, [pageTitle, summary, pathname]);
    return null;
}
