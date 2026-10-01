// @vitest-environment node
import { mkdtempSync, readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, join, sep, basename } from 'node:path';
import { spawnSync } from 'node:child_process';
import { expect, it } from 'vitest';
import { HIDDEN_SETTINGS } from '../src/contexts/settingsConstants';

it('generates approved bilingual HTML with safe nested fields and enforces revocation', () => {
 const directory=mkdtempSync(join(tmpdir(),'portfolio-publishing-'));
 if(!resolve(directory).startsWith(resolve(tmpdir())+sep)||!basename(directory).startsWith('portfolio-publishing-'))throw new Error('Unexpected test cleanup path');
 const manifest=join(directory,'manifest.json'), source=join(directory,'source.json'), snapshot=join(directory,'snapshot.json');
 const write=(path:string,value:unknown)=>writeFileSync(path,JSON.stringify(value));
 const run=(script:string,args:string[])=>spawnSync(process.platform==='win32'?'bun.exe':'bun',[script,...args],{cwd:resolve('.'),encoding:'utf8'});
 try {
  const policy={enabled:true,maxAgeHours:72,settings:{...HIDDEN_SETTINGS,showProjects:true},projectSlugs:['infoxp','company-portal']};
  write(manifest,policy);
  write(source,{projects:[{title:'InfoXP',workType:'personal',slug:'infoxp',description:'Verified overview',order:0,tech:['React'],caseStudy:{problem:'Verified problem',role:'Developer',decisions:['Decision'],secret:'private',repositories:[]},translations:{th:{title:'กรณีศึกษา',caseStudy:{role:'นักพัฒนา',secret:'private'}}}},{title:'InfoXP Backend',description:'Backend',order:1,tech:['Bun'],repo:'https://github.com/example/api'},{title:'Company Portal',workType:'company',slug:'company-portal',description:'Private company detail',order:2,tech:[],url:'https://company.example.com',caseStudy:{problem:'Private company detail',role:'',screenshots:[{url:'https://example.com/private.png',alt:'Private'}]}}],skills:{},experiences:[],about:{en:{story:'',background:''},th:{story:'',background:''}}});
  const generated=run('scripts/generate-public-snapshot.ts',['--manifest',manifest,'--source',source,'--output',snapshot]);
  expect(generated.status,generated.stderr).toBe(0);
  const published=JSON.parse(readFileSync(snapshot,'utf8'));
  expect(published.projects.map((item:{slug:string})=>item.slug)).toEqual(['infoxp']);
  expect(published.projects[0].caseStudy.repositories[0].url).toBe('https://github.com/example/api');
  expect(JSON.stringify(published)).not.toContain('private');
  for(const enabled of [true,false]) {
   write(manifest,{...policy,enabled});
   const output=join(directory,enabled?'approved':'revoked'); mkdirSync(output);
   writeFileSync(join(output,'index.html'),readFileSync('index.html'));
   const rendered=run('scripts/prerender.mjs',['--dist',output,'--manifest',manifest,'--snapshot',snapshot]);
   expect(rendered.status,rendered.stderr).toBe(0);
   const home=readFileSync(join(output,'index.html'),'utf8'), sitemap=readFileSync(join(output,'sitemap.xml'),'utf8');
   if(enabled) {
    const thai=readFileSync(join(output,'th/projects/infoxp/index.html'),'utf8');
    expect(thai).toContain('กรณีศึกษา');expect(thai).toContain('นักพัฒนา');expect(thai).toContain('Verified problem');expect(thai).toContain('https://github.com/example/api');
    expect(thai).toContain('hreflang="en"');expect(thai).toContain('https://mrwinrock.com/th/projects/infoxp/');
    expect(home).toContain('/projects/infoxp/');
   } else {expect(home).not.toContain('/projects/infoxp/');expect(sitemap).not.toContain('/projects/infoxp/');}
   expect(home+sitemap).not.toContain('company-portal');
  }
 } finally {
  rmSync(directory,{recursive:true,force:true});
 }
});
