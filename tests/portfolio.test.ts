import { expect, it } from 'vitest';
import { projects } from '../src/data/projects';
import { groupProjects, localizeProject, isCompanyProject, isFeaturedProject } from '../src/lib/portfolio';

it('features three substantive projects without bundled company fallback', () => {
  expect(projects.filter(project => project.featured).map(project => project.title)).toEqual(['InfoXP', 'Stringy', 'ChadChat']);
  expect(projects.find(project => project.title === 'Carbon Footprint')).toBeUndefined();
});
it('classifies company work by type and excludes it from featured work', () => {
  const company = { title: 'Other Product', description: '', tech: [], order: 0, featured: true, workType: 'company' as const };
  expect(isCompanyProject(company)).toBe(true);
  expect(isFeaturedProject(company)).toBe(false);
  expect(isCompanyProject({ ...company, workType: 'personal' as const, title: 'Carbon Footprint', slug: 'carbon-footprint', url: 'https://carbon.devdeethailand.com' })).toBe(false);
  expect(isCompanyProject({ title: 'Carbon Footprint', description: '', tech: [], order: 0 })).toBe(false);
});
it('does not merge company companions or hide company names in personal groups', () => {
  const personal = { title: 'InfoXP', description: '', tech: ['React'], order: 0 };
  const company = { title: 'InfoXP Backend', description: '', tech: ['PrivateTech'], order: 1, workType: 'company' as const, repo: 'https://example.com/private' };
  const result = groupProjects([personal, company]);
  expect(result).toHaveLength(2);
  expect(result[0].tech).toEqual(['React']);
  expect(result[0].caseStudy).toBeUndefined();
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
