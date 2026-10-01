import { spawn, spawnSync } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const build = spawnSync('bun', ['run', 'build'], {
    stdio: 'inherit',
    env: { ...process.env, VITE_BASE_URL: 'http://127.0.0.1:4173' },
    shell: process.platform === 'win32',
});
if (build.status !== 0) process.exit(build.status ?? 1);

// Own the direct Node server process so Windows teardown does not depend on
// Playwright terminating a shell's process tree. Never stop an existing server.
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], { stdio: 'inherit' });
let serverError;
server.on('error', error => { serverError = error; });
try {
    let ready = false;
    for (let attempt = 0; attempt < 100; attempt++) {
        await delay(100);
        if (serverError || server.exitCode !== null) throw serverError ?? new Error('Preview server exited before becoming ready.');
        try { ready = (await fetch('http://127.0.0.1:4173', { signal: AbortSignal.timeout(500) })).ok; } catch { /* Starting. */ }
        if (ready) break;
    }
    if (!ready) throw new Error('Preview server did not become ready.');
    const tests = spawn(process.execPath, ['node_modules/@playwright/test/cli.js', 'test', ...process.argv.slice(2)], {
        stdio: 'inherit', env: { ...process.env, PLAYWRIGHT_EXTERNAL_SERVER: '1' },
    });
    process.exitCode = await new Promise((resolve, reject) => { tests.once('error', reject); tests.once('exit', code => resolve(code ?? 1)); });
} finally {
    if (server.exitCode === null) server.kill();
}
