import snapshot from '../data/public-snapshot.json';
import publication from '../data/publication.json';
import type { AboutDoc, ApiExperience, ApiProject, SettingsDoc, SkillsResponse } from './apiTypes';
import { validPortfolioExtras } from './portfolioShape';
import { isCompanyProject } from './portfolio';

export interface PublicSnapshot { version: 1; publishedAt: string; expiresAt: string; settings: SettingsDoc; projects: ApiProject[]; experiences: ApiExperience[]; skills: SkillsResponse['data']; about: { en: AboutDoc; th: AboutDoc } }
const record = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);
const text = (value: Record<string, unknown>, fields: string[]) => fields.every(key => typeof value[key] === 'string');
const optionalText = (value: Record<string, unknown>, keys: string[]) => keys.every(key=>value[key]===undefined||typeof value[key]==='string');
const strings = (value: unknown) => Array.isArray(value) && value.every(item => typeof item === 'string');
export function parsePublicSnapshot(value: unknown, now = Date.now()): PublicSnapshot | null {
    if (!record(value) || value.version !== 1 || !text(value,['publishedAt','expiresAt'])) return null;
    const published = Date.parse(String(value.publishedAt)); const expires = Date.parse(String(value.expiresAt));
    if (!Number.isFinite(published) || !Number.isFinite(expires) || published > now || expires <= now || expires <= published || expires-published > 7*24*60*60*1000) return null;
    const settings = value.settings;
    if (!record(settings) || !['showAbout','showSkills','showProjects','showExperience','showResume','showContact'].every(key=>typeof settings[key] === 'boolean')) return null;
    if (!Array.isArray(value.projects) || !value.projects.every(project=>record(project)&&text(project,['title','description'])&&optionalText(project,['url','repo'])&&typeof project.order==='number'&&Number.isFinite(project.order)&&strings(project.tech)&&validPortfolioExtras(project))) return null;
    if (!Array.isArray(value.experiences) || !value.experiences.every(item=>record(item)&&text(item,['title','company','description','location','startDate','type'])&&optionalText(item,['endDate'])&&typeof item.order==='number'&&Number.isFinite(item.order)&&strings(item.tech)&&strings(item.achievements)&&validPortfolioExtras(item))) return null;
    if (!record(value.skills) || !Object.values(value.skills).every(group=>record(group)&&typeof group.order_flag==='number'&&Number.isFinite(group.order_flag)&&Array.isArray(group.skills)&&group.skills.every(skill=>record(skill)&&text(skill,['name'])&&optionalText(skill,['category','icon'])&&typeof skill.order==='number'&&Number.isFinite(skill.order)))) return null;
    const about = value.about;
    if (!record(about) || !['en','th'].every(lang=>record(about[lang])&&text(about[lang] as Record<string,unknown>,['story','background']))) return null;
    return cleanSnapshot(value as unknown as PublicSnapshot);
}
const pick = (value: object, keys: string[]) => Object.fromEntries(keys.filter(key=>key in value).map(key=>[key,(value as Record<string,unknown>)[key]]));
function cleanStudy(value: NonNullable<ApiProject['caseStudy']> | NonNullable<NonNullable<ApiProject['translations']>['th']>['caseStudy']) {
    if (!value) return undefined;
    return { ...pick(value,['problem','role','decisions','outcomes']),
        ...(value.repositories ? {repositories:value.repositories.map(item=>pick(item,['url','label']))} : {}),
        ...(value.screenshots ? {screenshots:value.screenshots.map(item=>pick(item,['url','alt']))} : {}),
    };
}
function cleanSnapshot(value: PublicSnapshot): PublicSnapshot {
    return {
        version:1,publishedAt:value.publishedAt,expiresAt:value.expiresAt,settings:pick(value.settings,['showAbout','showSkills','showProjects','showExperience','showResume','showContact']),
        projects:value.projects.map(project=>({...pick(project,['title','description','url','repo','tech','order','slug','featured','workType']),
            ...(project.caseStudy ? {caseStudy:cleanStudy(project.caseStudy)} : {}),
            ...(project.translations?.th ? {translations:{th:{...pick(project.translations.th,['title','description']),...(project.translations.th.caseStudy?{caseStudy:cleanStudy(project.translations.th.caseStudy)}:{})}}} : {}),
        })),
        experiences:value.experiences.map(item=>({...pick(item,['title','company','location','type','startDate','endDate','description','achievements','tech','order']),...(item.translations?.th?{translations:{th:pick(item.translations.th,['title','company','location','description','achievements'])}}:{})})),
        skills:Object.fromEntries(Object.entries(value.skills).map(([key,group])=>[key,{order_flag:group.order_flag,skills:group.skills.map(item=>pick(item,['name','category','icon','order']))}])),
        about:{en:pick(value.about.en,['story','background']),th:pick(value.about.th,['story','background'])},
    } as PublicSnapshot;
}
export function approvedPublicSnapshot(value: unknown, manifest: {enabled:boolean;settings:Partial<SettingsDoc>;projectSlugs:string[]}, now=Date.now()): PublicSnapshot | null {
    if (!manifest.enabled) return null;
    const parsed=parsePublicSnapshot(value,now); if (!parsed) return null;
    const settings=Object.fromEntries(Object.entries(parsed.settings).map(([key,allowed])=>[key,allowed && manifest.settings[key as keyof SettingsDoc]===true])) as SettingsDoc;
    return {...parsed,settings,projects:settings.showProjects?parsed.projects.filter(project=>!isCompanyProject(project)&&project.slug&&manifest.projectSlugs.includes(project.slug)):[],experiences:settings.showExperience?parsed.experiences:[],skills:settings.showSkills?parsed.skills:{},about:settings.showAbout?parsed.about:{en:{story:'',background:''},th:{story:'',background:''}}};
}
export const getPublicSnapshot = () => approvedPublicSnapshot(snapshot,publication);
