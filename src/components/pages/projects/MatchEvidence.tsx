import { ArrowIcon } from '../../ArrowIcon';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { ApiProject, ProjectEvidence, ProjectMatchResponse } from '../../../lib/apiTypes';
import { canonicalMatchedProjects, localizeProject, projectSlug } from '../../../lib/portfolio';

function excerpt(project: ApiProject, reference: ProjectEvidence): string | undefined {
    if (!('index' in reference)) return reference.field === 'description' ? project.description : project.caseStudy?.[reference.field];
    if (reference.field === 'tech') return project.tech[reference.index];
    return project.caseStudy?.[reference.field]?.[reference.index];
}

export function MatchEvidence({ project, matches, projects }: { project: ApiProject; matches: ProjectMatchResponse['data']['matches']; projects: ApiProject[] }) {
    const { t, i18n } = useTranslation();
    const localized = localizeProject(project, i18n.language);
    const evidence = matches.flatMap(match => {
        const owner = canonicalMatchedProjects([match.project], projects)[0];
        if (!owner || projectSlug(owner) !== projectSlug(project)) return [];
        const source = localizeProject(match.project, i18n.language);
        return (match.evidence ?? []).flatMap(reference => {
            const text = excerpt(source, reference)?.trim();
            if (!text) return [];
            const field = reference.field;
            const canonicalValues = field === 'tech' ? localized.tech : field === 'decisions' || field === 'outcomes' ? localized.caseStudy?.[field] : undefined;
            // Only link quotes that actually occur in the canonical case study.
            // A companion's contribution must never be attributed to its parent.
            const exists = canonicalValues ? canonicalValues.some(value => value.trim() === text) : excerpt(localized, reference)?.trim() === text;
            return exists ? [{ field, text, anchor: field === 'tech' ? 'technologies' : field }] : [];
        });
    }).filter((item, index, all) => all.findIndex(other => other.field === item.field && other.text === item.text) === index).slice(0, 3);
    if (!evidence.length) return null;
    return <div className="match-evidence">
        <p className="match-evidence-title">{t('projects.match.why')}</p>
        <ul>{evidence.map(item => <li key={`${item.field}:${item.text}`}>
            <span className="match-evidence-label">{t(`projects.match.evidence.${item.field}`)}</span>
            <Link to={`/projects/${encodeURIComponent(projectSlug(project))}#${item.anchor}`}>
                <span>{item.text.length > 320 ? `${item.text.slice(0, 320).trimEnd()}…` : item.text}</span><ArrowIcon />
            </Link>
        </li>)}</ul>
    </div>;
}
