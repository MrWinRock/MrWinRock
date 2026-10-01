import type { paths } from '@/generated/openapi';

type RequiredPublicPath =
  | '/' | '/health' | '/fish' | '/api/health' | '/api/health/ready'
  | '/api/about' | '/api/skills' | '/api/projects' | '/api/experiences'
  | '/api/contact' | '/api/resume' | '/api/settings';
type MissingPath = Exclude<RequiredPublicPath, keyof paths>;
export const contractIsComplete: MissingPath extends never ? true : false = true;
