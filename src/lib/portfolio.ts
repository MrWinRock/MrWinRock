import type { Project } from '../data/projects';
import type { ApiExperience } from './apiTypes';
import { safeExternalUrl } from './safeExternalUrl';

export const projectSlug = (project: Project) => project.slug ?? project._id ?? project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const isCompanyProject = (project: Project) => project.title === 'Carbon Footprint' || project.slug === 'carbon-footprint' || safeExternalUrl(project.url)?.replace(/\/$/, '') === 'https://carbon.devdeethailand.com';
export const isFeaturedProject = (project: Project) => !isCompanyProject(project) && (project.featured ?? ['InfoXP', 'Stringy', 'ChadChat'].includes(project.title));
export function localizeProject(project: Project, language: string): Project {
    const translated = language.startsWith('th') ? project.translations?.th : undefined;
    return translated ? { ...project, ...translated, slug: projectSlug(project), caseStudy: project.caseStudy || translated.caseStudy ? { problem: '', role: '', decisions: [], outcomes: [], repositories: [], screenshots: [], ...project.caseStudy, ...translated.caseStudy } : undefined } : project;
}
export function localizeExperience(experience: ApiExperience, language: string): ApiExperience {
    return language.startsWith('th') ? { ...experience, ...experience.translations?.th } : experience;
}
export function groupProjects(records: Project[]): Project[] {
    const hidden = new Set<string>();
    const grouped = records.map(project => {
        const relatedNames = project.title === 'InfoXP' ? ['InfoXP Mobile', 'InfoXP Backend'] : project.title === 'ChadChat' ? ['ChadChat Backend'] : project.title === 'Stringy' ? ['Stringy Backend'] : [];
        const related = records.filter(item => relatedNames.includes(item.title));
        related.forEach(item => hidden.add(item.title));
        if (!related.length) return project;
        const repositories = [project, ...related].flatMap(item => safeExternalUrl(item.repo) ? [{ label: item.title, url: item.repo! }] : []);
        const merged = [...(project.caseStudy?.repositories ?? []), ...repositories].filter((item,index,list)=>list.findIndex(other=>other.url===item.url)===index);
        return { ...project, tech: [...new Set([ ...project.tech, ...related.flatMap(item => item.tech) ])], caseStudy: { problem: '', role: '', decisions: [], outcomes: [], screenshots: [], ...project.caseStudy, repositories: merged } };
    });
    return grouped.filter(project => !hidden.has(project.title)).sort((a, b) => a.order - b.order);
}
