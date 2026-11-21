import type { TFunction } from 'i18next';
import infoXPCatalog from '../../../assets/infoxp-library.webp';
import type { Project } from '../../../data/projects';
import { isInfoXP } from '../../../lib/portfolio';
import { safeExternalUrl } from '../../../lib/safeExternalUrl';

interface ProjectScreenshot {
    url: string;
    alt: string;
    caption: string;
    width?: number;
    height?: number;
}

export function projectScreenshots(project: Project, t: TFunction): ProjectScreenshot[] {
    const published = (project.caseStudy?.screenshots ?? []).flatMap(item => {
        const url = safeExternalUrl(item.url);
        return url ? [{ url, alt: item.alt, caption: item.alt }] : [];
    });
    if (published.length || !isInfoXP(project)) return published;

    return [{
        url: infoXPCatalog,
        alt: t('projects.infoxp.screenshotAlt'),
        caption: t('projects.infoxp.screenshotCaption'),
        width: 1160,
        height: 652,
    }];
}
