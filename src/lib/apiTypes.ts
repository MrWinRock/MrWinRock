import type { paths } from '@/generated/openapi';

export type ProjectsResponse = paths['/api/projects']['get']['responses'][200]['content']['application/json'];
export type ApiProject = ProjectsResponse['data'][number];
export type SkillsResponse = paths['/api/skills']['get']['responses'][200]['content']['application/json'];
export type ApiSkillCategory = SkillsResponse['data'][string];
export type ApiSkill = ApiSkillCategory['skills'][number];
export type SettingsResponse = paths['/api/settings']['get']['responses'][200]['content']['application/json'];
export type SettingsDoc = SettingsResponse['data'];
export type AboutResponse = paths['/api/about']['get']['responses'][200]['content']['application/json'];
export type AboutDoc = AboutResponse['data'];
export type ExperiencesResponse = paths['/api/experiences']['get']['responses'][200]['content']['application/json'];
export type ApiExperience = ExperiencesResponse['data'][number];
export type ContactInput = paths['/api/contact']['post']['requestBody']['content']['application/json'];
export type ContactResponse = paths['/api/contact']['post']['responses'][200]['content']['application/json'];
export type HealthResponse = paths['/health']['get']['responses'][200]['content']['application/json'];
export type FishResponse = paths['/fish']['get']['responses'][200]['content']['application/json'];
