const record = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);
const strings = (value: unknown) => Array.isArray(value) && value.every(item => typeof item === 'string');
const texts = (value: Record<string, unknown>, keys: string[]) => keys.every(key => value[key] === undefined || typeof value[key] === 'string');
function study(value: unknown): boolean {
    if (!record(value) || !texts(value, ['problem', 'role'])) return false;
    for (const key of ['decisions', 'outcomes']) if (value[key] !== undefined && !strings(value[key])) return false;
    for (const [key, label] of [['repositories', 'label'], ['screenshots', 'alt']]) {
        const items = value[key];
        if (items !== undefined && (!Array.isArray(items) || !items.every(item => record(item) && typeof item.url === 'string' && typeof item[label] === 'string'))) return false;
    }
    return true;
}
export function validPortfolioExtras(value: Record<string, unknown>): boolean {
    if (value.workType !== undefined && value.workType !== 'personal' && value.workType !== 'company') return false;
    if (!texts(value, ['slug']) || (value.slug !== undefined && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(value.slug)))) return false;
    if (value.featured !== undefined && typeof value.featured !== 'boolean') return false;
    if (value.caseStudy !== undefined && !study(value.caseStudy)) return false;
    if (value.translations === undefined) return true;
    if (!record(value.translations)) return false;
    const th = value.translations.th;
    return th === undefined || (record(th) && texts(th, ['title','description','company','location']) && (th.achievements === undefined || strings(th.achievements)) && (th.caseStudy === undefined || study(th.caseStudy)));
}
