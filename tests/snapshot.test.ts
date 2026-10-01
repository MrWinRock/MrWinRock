import { expect, it } from 'vitest';
import { parsePublicSnapshot, approvedPublicSnapshot } from '../src/lib/publicSnapshot';
import { HIDDEN_SETTINGS } from '../src/contexts/settingsConstants';
it('rejects expired, future, and incompatible publication artifacts', () => {
 const now=Date.now(); const base={version:1,publishedAt:new Date(now-1000).toISOString(),expiresAt:new Date(now+1000).toISOString(),settings:HIDDEN_SETTINGS,projects:[],skills:{},about:{en:{story:'Story',background:'Graduate'},th:{story:'เรื่องราว',background:'จบการศึกษา'}},experiences:[]};
 expect(parsePublicSnapshot(base,now)).not.toBeNull();
 expect(parsePublicSnapshot({...base,expiresAt:new Date(now-1).toISOString()},now)).toBeNull();
 expect(parsePublicSnapshot({...base,publishedAt:new Date(now+1000).toISOString()},now)).toBeNull();
 expect(parsePublicSnapshot({...base,version:2},now)).toBeNull();
 expect(parsePublicSnapshot({...base,settings:{showProjects:true}},now)).toBeNull();
});
it('revokes runtime fallback when publication is disabled or sections are removed', () => {
 const now=Date.now(); const value={version:1,publishedAt:new Date(now-1000).toISOString(),expiresAt:new Date(now+1000).toISOString(),settings:{...HIDDEN_SETTINGS,showProjects:true},projects:[],skills:{},about:{en:{story:'',background:''},th:{story:'',background:''}},experiences:[]};
 expect(approvedPublicSnapshot(value,{enabled:false,settings:{showProjects:true},projectSlugs:[]},now)).toBeNull();
 expect(approvedPublicSnapshot(value,{enabled:true,settings:{showProjects:false},projectSlugs:[]},now)?.settings.showProjects).toBe(false);
});
it('exports only approved fields recursively, including translated evidence', () => {
 const now=Date.now(); const value={version:1,publishedAt:new Date(now-1000).toISOString(),expiresAt:new Date(now+1000).toISOString(),settings:HIDDEN_SETTINGS,projects:[{title:'Case',description:'Text',order:0,tech:[],secret:'private',caseStudy:{problem:'Problem',role:'Role',secret:'private',repositories:[{url:'https://github.com/example/project',label:'Code',secret:'private'}]},translations:{th:{title:'กรณีศึกษา',secret:'private',caseStudy:{role:'งาน',secret:'private'}}}}],skills:{},about:{en:{story:'',background:'',secret:'private'},th:{story:'',background:''}},experiences:[]};
 const parsed=parsePublicSnapshot(value,now);
 expect(parsed).not.toBeNull(); expect(JSON.stringify(parsed)).not.toContain('private');
});
it('rejects objects hidden inside public scalar fields', () => {
 const now=Date.now();const base={version:1,publishedAt:new Date(now-1000).toISOString(),expiresAt:new Date(now+1000).toISOString(),settings:HIDDEN_SETTINGS,projects:[],skills:{},about:{en:{story:'',background:''},th:{story:'',background:''}},experiences:[]};
 expect(parsePublicSnapshot({...base,projects:[{title:'Case',description:'Text',order:0,tech:[],url:{secret:'private'}}]},now)).toBeNull();
 expect(parsePublicSnapshot({...base,experiences:[{title:'Role',company:'Co',description:'Work',location:'Bangkok',startDate:'2026-01',type:'Full-time',order:0,tech:[],achievements:[],endDate:{secret:'private'}}]},now)).toBeNull();
 expect(parsePublicSnapshot({...base,skills:{Web:{order_flag:0,skills:[{name:'React',order:0,category:{secret:'private'}}]}}},now)).toBeNull();
});
it('preserves personal work type and excludes company links from approved fallback', () => {
 const now=Date.now(); const personal={title:'Personal',slug:'personal',description:'Public',order:0,tech:[],workType:'personal'};
 const company={title:'Company Portal',slug:'company-portal',description:'Company',order:1,tech:[],workType:'company',url:'https://company.example.com'};
 const value={version:1,publishedAt:new Date(now-1000).toISOString(),expiresAt:new Date(now+1000).toISOString(),settings:{...HIDDEN_SETTINGS,showProjects:true},projects:[personal,company],skills:{},about:{en:{story:'',background:''},th:{story:'',background:''}},experiences:[]};
 expect(parsePublicSnapshot(value,now)?.projects[0]).toMatchObject({workType:'personal'});
 expect(approvedPublicSnapshot(value,{enabled:true,settings:{showProjects:true},projectSlugs:['personal','company-portal']},now)?.projects.map(item=>item.title)).toEqual(['Personal']);
 expect(parsePublicSnapshot({...value,projects:[{...personal,workType:'invalid'}]},now)).toBeNull();
});
