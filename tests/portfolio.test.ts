import { expect, it } from 'vitest';
import { projects } from '../src/data/projects';
import { groupProjects, localizeProject } from '../src/lib/portfolio';

it('features three substantive projects and keeps company work link-only', () => {
  expect(projects.filter(project => project.featured).map(project => project.title)).toEqual(['InfoXP', 'Stringy', 'ChadChat']);
  const company = projects.find(project => project.title === 'Carbon Footprint');
  expect(company?.url).toBe('https://carbon.devdeethailand.com');
  expect(company?.caseStudy).toBeUndefined();
});
it('retains companion repositories when a case study already has authored evidence', () => {
  const base = projects.find(project => project.title === 'InfoXP')!;
  const backend = projects.find(project => project.title === 'InfoXP Backend')!;
  const study = { problem: 'Verified problem', role: '', decisions: [], outcomes: [], screenshots: [], repositories: [{ label: 'Custom evidence', url: 'https://github.com/example/custom' }] };
  const result = groupProjects([{ ...base, caseStudy: study }, backend]);
  expect(result).toHaveLength(1);
  expect(result[0].caseStudy?.repositories?.map(item=>item.url)).toContain(backend.repo);
  expect(result[0].caseStudy?.repositories?.map(item=>item.url)).toContain('https://github.com/example/custom');
  expect(result[0].caseStudy?.problem).toBe('Verified problem');
});
it('renders Thai-only studies and retains base evidence with partial translations', () => {
 const base = projects.find(project => project.title === 'InfoXP')!;
 const translated = {role:'งานของฉัน'};
 expect(localizeProject({...base,caseStudy:undefined,translations:{th:{caseStudy:translated}}},'th').caseStudy?.role).toBe('งานของฉัน');
 const study = {problem:'Problem',role:'Role',decisions:['Verified decision'],outcomes:[],screenshots:[],repositories:[]};
 expect(localizeProject({...base,caseStudy:study,translations:{th:{caseStudy:translated}}},'th').caseStudy?.decisions).toEqual(['Verified decision']);
});
