import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import process from 'node:process';
import openapiTS, { astToString } from 'openapi-typescript';

const args = process.argv.slice(2).filter(arg => arg !== '--');
const check = args.includes('--check');
const inputs = args.filter(arg => arg !== '--check');
if (inputs.length > 1 || inputs.some(arg => arg.startsWith('-'))) {
  throw new Error('Usage: generate-openapi-types.mjs [--check] [input-path]');
}
const root = fileURLToPath(new URL('../', import.meta.url));
const inputPath = inputs[0]
  ? resolve(inputs[0])
  : resolve(root, '../mrwinrock-app/docs/openapi.json');
const outputPath = resolve(root, 'src/generated/openapi.ts');
const header = [
  '/* eslint-disable */',
  '/** Generated from mrwinrock-app/docs/openapi.json. Do not edit. */',
  '',
].join('\n');
const output = header + astToString(await openapiTS(pathToFileURL(inputPath)));
if (check) {
  const current = await readFile(outputPath, 'utf8').catch(error => {
    if (error.code === 'ENOENT') return null;
    throw error;
  });
  if (current !== output) {
    console.error('Generated OpenAPI contract is missing or stale. Run bun run contract:generate.');
    process.exitCode = 1;
  }
} else {
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, output);
}
