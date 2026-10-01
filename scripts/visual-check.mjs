import { chromium } from '@playwright/test';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
const argument=(key,fallback)=>{const index=process.argv.indexOf(key);return index<0?fallback:process.argv[index+1]};
const baseURL=argument('--url','http://127.0.0.1:4173');
const require = createRequire(import.meta.url);
const browser=await chromium.launch({channel:process.platform==='win32'?'msedge':undefined,headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
await page.route('https://analytics.**/*',r=>r.abort());
await page.route('https://www.googletagmanager.com/**',r=>r.abort());
await page.route('**/api/**',r=>r.fulfill({status:503,json:{ok:false}}));
await page.route('**/api/settings',r=>r.fulfill({json:{ok:true,data:{showAbout:true,showSkills:true,showProjects:true,showExperience:true,showResume:true,showContact:true}}}));
const out=resolve(argument('--output','test-results/visual'));
await mkdir(out,{recursive:true});
for(const [path,name,width] of [['/','built-home-desktop',1440],['/','built-home-mobile',390],['/projects','built-projects-mobile',390],['/projects/infoxp','built-project-detail',1440],['/contact','built-contact-mobile',390]]) {
 await page.setViewportSize({width,height:1000}); await page.goto(baseURL+path); await page.waitForTimeout(1000);
 await page.screenshot({path:out+'/'+name+'.png',fullPage:true});
 await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
 console.log(JSON.stringify({path,width,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),axe:await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({html:n.html,summary:n.failureSummary}))}));})}));
}
for(const width of [320,390,768,1024,1440])for(const locale of ['', '/th'])for(const path of ['/','/projects','/contact','/skills','/experience']) {
 await page.setViewportSize({width,height:900});await page.goto(baseURL+locale+path);await page.locator('h1').waitFor();await page.evaluate(()=>document.fonts.ready);
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 console.log(JSON.stringify({path:locale+path,width,overflow}));if(overflow)throw new Error('Horizontal overflow at '+locale+path+' width '+width);
}
await browser.close();
