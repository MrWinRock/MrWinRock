import type { Project } from '../data/projects';
import type { ApiExperience } from './apiTypes';
import { safeExternalUrl } from './safeExternalUrl';

export const projectSlug = (project: Project) => project.slug ?? project._id ?? project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const isCompanyProject = (project: Project) => project.workType === 'company';
export const isFeaturedProject = (project: Project) => !isCompanyProject(project) && (project.featured ?? ['InfoXP', 'Stringy', 'ChadChat'].includes(project.title));
export function localizeProject(project: Project, language: string): Project {
    const translated = language.startsWith('th') ? project.translations?.th : undefined;
    return translated ? { ...project, ...translated, slug: projectSlug(project), caseStudy: project.caseStudy || translated.caseStudy ? { problem: '', role: '', decisions: [], outcomes: [], repositories: [], screenshots: [], ...project.caseStudy, ...translated.caseStudy } : undefined } : project;
}
export function localizeExperience(experience: ApiExperience, language: string): ApiExperience {
    return language.startsWith('th') ? { ...experience, ...experience.translations?.th } : experience;
}
function projectGroups(records: Project[]): { project: Project; members: Project[] }[] {
    const hidden = new Set<string>();
    const grouped = records.map(project => {
        if (isCompanyProject(project)) return { project, members: [project] };
        const relatedNames = project.title === 'InfoXP' ? ['InfoXP Mobile', 'InfoXP Backend'] : project.title === 'ChadChat' ? ['ChadChat Backend'] : project.title === 'Stringy' ? ['Stringy Backend'] : [];
        const related = records.filter(item => !isCompanyProject(item) && relatedNames.includes(item.title));
        related.forEach(item => hidden.add(item.title));
        if (!related.length) return { project, members: [project] };
        const repositories = [project, ...related].flatMap(item => safeExternalUrl(item.repo) ? [{ label: item.title, url: item.repo! }] : []);
        const merged = [...(project.caseStudy?.repositories ?? []), ...repositories].filter((item,index,list)=>list.findIndex(other=>other.url===item.url)===index);
        return { project: { ...project, tech: [...new Set([ ...project.tech, ...related.flatMap(item => item.tech) ])], caseStudy: { problem: '', role: '', decisions: [], outcomes: [], screenshots: [], ...project.caseStudy, repositories: merged } }, members: [project, ...related] };
    });
    return grouped.filter(({ project }) => isCompanyProject(project) || !hidden.has(project.title)).sort((a, b) => a.project.order - b.project.order);
}
export function groupProjects(records: Project[]): Project[] {
    return projectGroups(records).map(group => group.project);
}
export function canonicalMatchedProjects(ranked: Project[], records: Project[]): Project[] {
    // Matching responses can be newer than the browsing resource; retain their
    // public records while adding the full portfolio's parents and companions.
    const candidates = new Map<string, Project>();
    for (const project of [...ranked, ...records]) {
        const slug = projectSlug(project);
        if (!isCompanyProject(project) && !candidates.has(slug)) candidates.set(slug, project);
    }
    const owners = new Map<string, Project>();
    for (const group of projectGroups([...candidates.values()])) {
        for (const member of group.members) owners.set(projectSlug(member), group.project);
    }
    const seen = new Set<string>();
    return ranked.flatMap(match => {
        if (isCompanyProject(match)) return [];
        const canonical = owners.get(projectSlug(match));
        if (!canonical || seen.has(projectSlug(canonical))) return [];
        seen.add(projectSlug(canonical));
        return [canonical];
    });
}
