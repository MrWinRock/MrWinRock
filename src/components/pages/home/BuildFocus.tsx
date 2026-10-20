import { useTranslation } from 'react-i18next';

const areas = ['web', 'api', 'ai'] as const;

export function BuildFocus() {
    const { t } = useTranslation();
    return <section className="build-focus" aria-labelledby="build-focus-title">
        <div className="build-focus-header">
            <span className="build-focus-dot" aria-hidden="true" />
            <h2 id="build-focus-title">{t('home.buildFocus.title')}</h2>
        </div>
        <ul className="build-focus-list">{areas.map((area, index) => <li key={area} className="build-focus-area">
            <span className="build-focus-index" aria-hidden="true">0{index + 1}</span>
            <div className="build-focus-copy">
                <h3>{t(`home.buildFocus.${area}.title`)}</h3>
                <p>{t(`home.buildFocus.${area}.description`)}</p>
            </div>
        </li>)}</ul>
    </section>;
}
