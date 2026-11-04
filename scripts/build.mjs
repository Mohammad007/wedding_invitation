import { build } from 'esbuild';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
export async function buildSite(production = true) {
  await mkdir('dist', { recursive: true });
  await build({ entryPoints: ['src/main.jsx'], bundle: true, outdir: 'dist/assets', minify: production, sourcemap: !production, define: { 'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development') }, loader: { '.jsx': 'jsx', '.png': 'dataurl' } });
  const html = (await readFile('index.html', 'utf8')).replace('<script type="module" src="/src/main.jsx"></script>', '<link rel="stylesheet" href="/assets/main.css"><script type="module" src="/assets/main.js"></script>');
  await writeFile('dist/index.html', html);
  const js = await readFile('dist/assets/main.js', 'utf8');
  const css = await readFile('dist/assets/main.css', 'utf8');
  const standalone = (await readFile('index.html', 'utf8')).replace('<script type="module" src="/src/main.jsx"></script>', () => `<style>${css}</style><script>${js.replaceAll('</script', '<\\/script')}</script>`);
  await writeFile('dist/invitation.html', standalone);
}
if (process.argv[1]?.endsWith('build.mjs')) { await buildSite(); console.log('Production build complete: dist/'); }
