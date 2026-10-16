import { useTranslation } from 'react-i18next';
import source from '../../../lib/safeExternalUrl.ts?raw';

const lines = source.trimEnd().split(/\r?\n/);
const tokens = /("[^"]*"|\b(?:export|const|if|try|catch|return|new|typeof|null)\b|\b(?:unknown|string|URL)\b)/g;

function highlight(line: string) {
    return line.split(tokens).map((part, index) => {
        const kind = part.startsWith('"') ? 'string'
            : /^(unknown|string|URL)$/.test(part) ? 'type'
                : /^(export|const|if|try|catch|return|new|typeof|null)$/.test(part) ? 'keyword' : undefined;
        return <span key={index} className={kind ? `syntax-${kind}` : undefined}>{part}</span>;
    });
}

export function SourcePeek() {
    const { t } = useTranslation();
    return <figure className="source-window">
        <figcaption className="source-toolbar">
            <span className="source-file"><span aria-hidden="true">TS</span>safeExternalUrl.ts</span>
            <span className="source-language">TypeScript</span>
        </figcaption>
        <div className="source-breadcrumb">src <span>/</span> lib <span>/</span> safeExternalUrl.ts</div>
        <pre className="source-code" tabIndex={0} aria-label={t('home.sourceLabel')}><code>{lines.map((line, index) => <span className="source-line" key={index}><span className="source-line-number" aria-hidden="true">{index + 1}</span><span>{highlight(line)}</span>{'\n'}</span>)}</code></pre>
        <div className="source-status"><span><span aria-hidden="true">◇</span> {t('home.realSource')}</span><a href="https://github.com/MrWinRock/MrWinRock" target="_blank" rel="noopener noreferrer">{t('home.browseSource')} <span aria-hidden="true">↗</span></a></div>
    </figure>;
}
