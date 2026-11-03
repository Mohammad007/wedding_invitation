import { createServer } from 'node:http';
import { readFile, watch } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { buildSite } from './build.mjs';
const production = process.argv.includes('--production');
await buildSite(production);
const root = resolve('dist');
const types = { '.html':'text/html; charset=utf-8', '.js':'application/javascript', '.css':'text/css', '.map':'application/json' };
const server = createServer(async (req, res) => {
  try {
    const path = resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    if (path !== root && !path.startsWith(root + sep)) { res.writeHead(403); res.end(); return; }
    const target = path === root ? resolve(root,'index.html') : path;
    const data = await readFile(target);
    res.writeHead(200, { 'Content-Type': types[extname(target)] || 'application/octet-stream', 'Cache-Control':'no-store' }); res.end(data);
  } catch { res.writeHead(404); res.end('Not found'); }
});
server.listen(5173, '127.0.0.1', () => console.log('Local: http://127.0.0.1:5173'));
if (!production) {
  let pending;
  (async () => { for await (const event of watch('src', { recursive:true })) { clearTimeout(pending); pending = setTimeout(() => buildSite(false).then(() => console.log('Updated. Refresh the browser.')).catch(console.error), 150); } })().catch(console.error);
}
