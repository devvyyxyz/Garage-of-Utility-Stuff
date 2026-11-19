#!/usr/bin/env node
/**
 * Minimal zero-dependency static server for the generated site in _site/.
 *
 * Usage:
 *   node scripts/serve.mjs              # serve _site on PORT (default 8000)
 *   node scripts/serve.mjs --watch      # rebuild on changes, then serve
 *
 * Env:
 *   PORT      port to listen on (default 8000)
 *   ROOT_DIR  directory to serve (default _site)
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { watch } from 'node:fs';
import { join, normalize, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SITE_DIR = join(ROOT, process.env.ROOT_DIR || '_site');
const PORT = Number(process.env.PORT || 8000);
const HOST = process.env.HOST || '0.0.0.0';

const execFileAsync = promisify(execFile);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json',
  '.webmanifest': 'application/manifest+json',
};

const ext = (file) => MIME[extname(file).toLowerCase()] || 'application/octet-stream';

async function tryFile(filePath) {
  try {
    const info = await stat(filePath);
    if (info.isFile()) return filePath;
    if (info.isDirectory()) {
      const index = join(filePath, 'index.html');
      await stat(index);
      return index;
    }
  } catch {
    return null;
  }
  return null;
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    let pathname = decodeURIComponent(url.pathname);

    // Prevent path traversal.
    const safePath = normalize(pathname).replace(/^(\.\.[/\\])+/, '');
    pathname = safePath === '/' ? '/index.html' : safePath;

    let file = await tryFile(join(SITE_DIR, pathname));
    // Fallback to .html for extensionless paths (e.g. /CONTRIBUTING -> CONTRIBUTING.html)
    if (!file && !extname(pathname)) {
      file = await tryFile(join(SITE_DIR, `${pathname}.html`));
    }

    if (!file) {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const body = await readFile(file);
    res.writeHead(200, {
      'content-type': ext(file),
      'cache-control': 'no-cache',
    });
    res.end(body);
  } catch (err) {
    res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
    res.end(`Server error: ${err.message}`);
  }
});

async function build() {
  const { stdout, stderr } = await execFileAsync(process.execPath, [join(ROOT, 'scripts', 'build-index.mjs')], {
    cwd: ROOT,
  });
  if (stdout) process.stdout.write(stdout);
  if (stderr) process.stderr.write(stderr);
}

async function main() {
  const watchMode = process.argv.includes('--watch') || process.argv.includes('-w');

  await build();

  server.listen(PORT, HOST, () => {
    console.log(`  ➜  Local:   http://localhost:${PORT}/`);
    console.log(`  ➜  Serving: ${SITE_DIR}`);
    if (watchMode) console.log(`  ➜  Watch:   on (rebuilds on changes to docs/ and scripts/)`);
  });

  if (watchMode) {
    const watched = [join(ROOT, 'docs'), join(ROOT, 'scripts')];
    for (const dir of watched) {
      watch(dir, { recursive: true }, async (event, filename) => {
        // Ignore the output dir and caches.
        if (filename && (filename.includes('_site') || filename.includes('.cache'))) return;
        console.log(`\n[change] ${filename} — rebuilding...`);
        try {
          await build();
          console.log('[rebuilt]');
        } catch (err) {
          console.error('[build failed]', err.message);
        }
      });
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
