import { projects } from '../data/projects';
import { api } from '../lib/api';
import { usePublicResource } from './usePublicResource';
import { getPublicSnapshot } from '../lib/publicSnapshot';
export function useProjects() {
    return usePublicResource({ key: 'projects', load: signal => api.projects({ signal }).then(response => response.data), snapshot: () => { const published = getPublicSnapshot(); return published?.settings.showProjects ? published.projects : undefined; }, fallback: projects, isEmpty: value => value.length === 0 });
}
