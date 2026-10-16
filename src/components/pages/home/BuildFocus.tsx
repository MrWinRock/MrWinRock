import { useTranslation } from 'react-i18next';

const areas = ['web', 'api', 'ai'] as const;

export function BuildFocus() {
    const { t } = useTranslation();
    return <section className="build-focus" aria-labelledby="build-focus-title">
        <h2 id="build-focus-title">{t('home.buildFocus.title')}</h2>
        <ul className="build-focus-list">{areas.map(area => <li key={area} className="build-focus-area">
            <h3>{t(`home.buildFocus.${area}.title`)}</h3>
            <p>{t(`home.buildFocus.${area}.description`)}</p>
        </li>)}</ul>
    </section>;
}
