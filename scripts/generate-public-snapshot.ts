import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { parsePublicSnapshot } from '../src/lib/publicSnapshot';
import { projects } from '../src/data/projects';
import { skills } from '../src/data/skills';
import { groupProjects, isCompanyProject } from '../src/lib/portfolio';
const argument=(key:string,fallback:string)=>{const index=process.argv.indexOf(key);return index<0?fallback:process.argv[index+1]!;};
const manifest = JSON.parse(await readFile(argument('--manifest',fileURLToPath(new URL('../src/data/publication.json', import.meta.url))), 'utf8'));
if (manifest.enabled !== true) throw new Error('Review publication.json and enable only approved public sections before generating a snapshot.');
if (!Number.isFinite(manifest.maxAgeHours) || manifest.maxAgeHours < 1 || manifest.maxAgeHours > 168 || !Array.isArray(manifest.projectSlugs)) throw new Error('Invalid publication manifest');
const sourceArg = process.argv.indexOf('--source');
const input = sourceArg >= 0 ? JSON.parse(await readFile(process.argv[sourceArg+1]!, 'utf8')) : {
    projects, skills: Object.fromEntries([...new Set(skills.map(skill=>skill.category))].map((category,index)=>[category,{order_flag:index,skills:skills.filter(skill=>skill.category===category)}])),
    about: {en:{story:'',background:''},th:{story:'',background:''}}, experiences: [],
};
const now = new Date(process.env.SOURCE_DATE_EPOCH ? Number(process.env.SOURCE_DATE_EPOCH)*1000 : Date.now());
const settings = Object.fromEntries(['showAbout','showSkills','showProjects','showExperience','showResume','showContact'].map(key=>[key,manifest.settings?.[key]===true]));
const output = {version:1,publishedAt:now.toISOString(),expiresAt:new Date(now.getTime()+manifest.maxAgeHours*3600000).toISOString(),settings,
 projects: settings.showProjects ? groupProjects(input.projects).filter(project=>!isCompanyProject(project)&&manifest.projectSlugs.includes(project.slug)) : [],
 skills: settings.showSkills ? input.skills : {}, experiences: settings.showExperience ? input.experiences : [],
 about: settings.showAbout ? input.about : {en:{story:'',background:''},th:{story:'',background:''}},
};
const clean=parsePublicSnapshot(output,now.getTime());
if (!clean) throw new Error('Invalid publication source. No artifact was written.');
await writeFile(argument('--output',fileURLToPath(new URL('../src/data/public-snapshot.json', import.meta.url))), JSON.stringify(clean,null,2)+'\n');
console.log('Generated approved public snapshot. Rebuild and deploy to publish it.');
