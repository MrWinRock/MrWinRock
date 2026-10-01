import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { approvedPublicSnapshot } from '../src/lib/publicSnapshot.ts';
import { isCompanyProject } from '../src/lib/portfolio.ts';
const argument=(key,fallback)=>{const index=process.argv.indexOf(key);return index<0?fallback:process.argv[index+1]};
const root=resolve(argument('--dist','dist')), base=await readFile(resolve(root,'index.html'),'utf8');
const en=JSON.parse(await readFile('src/locales/en.json','utf8')), th=JSON.parse(await readFile('src/locales/th.json','utf8'));
const manifest=JSON.parse(await readFile(argument('--manifest','src/data/publication.json'),'utf8'));
const snapshot=approvedPublicSnapshot(JSON.parse(await readFile(argument('--snapshot','src/data/public-snapshot.json'),'utf8')),manifest);
const valid=!!snapshot;
if(snapshot)snapshot.projects=snapshot.projects.filter(project=>!isCompanyProject(project));
const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const origin='https://mrwinrock.com', pages=[];
async function page(path,title,description,body,language='en') {
 const canonical=origin+path; let html=base.replace('<html lang="en">','<html lang="'+language+'">').replace(/<title>.*?<\/title>/,'<title>'+escape(title)+' | MrWinRock</title>');
 for(const [attribute,name,content] of [['name','description',description],['property','og:title',title+' | MrWinRock'],['property','og:description',description]]) html=html.replace(new RegExp('<meta '+attribute+'="'+name+'"[^>]*>'),'<meta '+attribute+'="'+name+'" content="'+escape(content)+'" />');
 const englishPath=path.replace(/^\/th(?=\/|$)/,'')||'/', thaiPath='/th'+(englishPath==='/'?'/':englishPath);
 html=html.replace(/<link rel="canonical"[^>]*>/,'<link rel="canonical" href="'+escape(canonical)+'" />').replace('</head>','<meta property="og:url" content="'+escape(canonical)+'" /><link rel="alternate" hreflang="en" href="'+origin+englishPath+'" /><link rel="alternate" hreflang="th" href="'+origin+thaiPath+'" /></head>');
 html=html.replace(/<meta name="twitter:title"[^>]*>/,'<meta name="twitter:title" content="'+escape(title+' | MrWinRock')+'" />').replace(/<meta name="twitter:description"[^>]*>/,'<meta name="twitter:description" content="'+escape(description)+'" />');
 html=html.replace('<div id="root"></div>','<div id="root"><main class="page-shell" style="max-width:1100px;margin:auto;padding:3rem 1rem"><a href="'+(language==='th'?'/th/':'/')+'">MrWinRock</a><nav aria-label="Language"><a href="'+englishPath+'" lang="en">English</a> · <a href="'+thaiPath+'" lang="th">ไทย</a></nav>'+body+'</main></div>');
 const dir=resolve(root,'.'+path); if(!dir.startsWith(root))throw new Error('Invalid output path'); await mkdir(dir,{recursive:true}); await writeFile(resolve(dir,'index.html'),html); pages.push(canonical);
}
for(const [language,copy,path] of [['en',en,'/'],['th',th,'/th/']]) {
 let body='<p class="eyebrow">'+escape(copy.home.subtitle)+'</p><h1 class="page-title">'+escape(copy.home.name+' '+copy.home.surname)+'</h1><p class="page-description">'+escape(copy.home.description)+'</p>';
 if(valid&&snapshot.settings.showProjects)body+='<h2>'+escape(copy.projects.selected)+'</h2><ul>'+snapshot.projects.map(project=>'<li><a href="'+escape((language==='th'?'/th':'')+'/projects/'+project.slug+'/')+'">'+escape(language==='th'?project.translations?.th?.title??project.title:project.title)+'</a></li>').join('')+'</ul>';
 await page(path,copy.home.subtitle,copy.home.description,body,language);
}
if(valid&&snapshot.settings.showProjects)for(const project of snapshot.projects) {
 if(!project.slug||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug))continue;
 for(const language of ['en','th']) {
  const copy=language==='th'?th:en, localized=language==='th'?{...project,...project.translations?.th}:project, study={...project.caseStudy,...localized.caseStudy};
  let body='<h1 class="page-title">'+escape(localized.title)+'</h1><p class="page-description">'+escape(localized.description)+'</p>';
  for(const key of ['problem','role'])if(study[key])body+='<section><h2>'+escape(copy.projects[key])+'</h2><p>'+escape(study[key])+'</p></section>';
  for(const key of ['decisions','outcomes'])if(study[key]?.length)body+='<section><h2>'+escape(copy.projects[key])+'</h2><ul>'+study[key].map(text=>'<li>'+escape(text)+'</li>').join('')+'</ul></section>';
  if(localized.tech.length)body+='<ul>'+localized.tech.map(text=>'<li>'+escape(text)+'</li>').join('')+'</ul>';
  const safe=value=>{try{const url=new URL(value);return url.protocol==='https:'&&!url.username&&!url.password?url.href:null}catch{return null}};
  for(const item of study.repositories??[])if(safe(item.url))body+='<p><a href="'+escape(safe(item.url))+'" rel="noopener noreferrer">'+escape(item.label)+'</a></p>';
  for(const item of study.screenshots??[])if(safe(item.url))body+='<figure><img src="'+escape(safe(item.url))+'" alt="'+escape(item.alt)+'" loading="lazy" /><figcaption>'+escape(item.alt)+'</figcaption></figure>';
  await page((language==='th'?'/th':'')+'/projects/'+project.slug+'/',localized.title,localized.description,body,language);
 }
}
await writeFile(resolve(root,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+pages.map(url=>'<url><loc>'+escape(url)+'</loc></url>').join('')+'</urlset>');
await writeFile(resolve(root,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: '+origin+'/sitemap.xml\n');
console.log('Prerendered '+pages.length+' public pages'+(valid?' from approved publication.':'; snapshot publishing remains disabled.'));
