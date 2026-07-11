#!/usr/bin/env node
/**
 * build-standalone.mjs — bake digidelic HTML pages into single-file builds.
 *
 * Every relative reference is inlined so the output opens anywhere — email
 * it, drop it on a desktop, open from Downloads — with no repo checkout
 * next to it:
 *   · local <link rel=stylesheet> becomes an inline <style> (with the CSS's
 *     own url() asset references resolved against the CSS file's directory)
 *   · local <script src> becomes an inline <script>
 *   · fonts / images / video in src="", href="", url() become data URIs
 * Absolute http(s) URLs (CDNs, Google Fonts) are left as-is.
 *
 * Usage:
 *   node tools/build-standalone.mjs                 # build the default set into dist/
 *   node tools/build-standalone.mjs preview/brand-motifs.html [more.html ...]
 *
 * Options:
 *   --out <dir>          output directory (default: dist)
 *   --max-image-kb <n>   raster images above this size are downscaled to
 *                        ≤2000px and re-encoded to JPEG q0.85 via headless
 *                        Chromium when playwright-core is installed
 *                        (default: 900). Images with transparency are never
 *                        converted. Without playwright the original bytes
 *                        are inlined verbatim.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync, globSync } from 'node:fs';
import { dirname, resolve, join, basename, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const MIME = {
  png:'image/png', jpg:'image/jpeg', jpeg:'image/jpeg', gif:'image/gif',
  webp:'image/webp', svg:'image/svg+xml', avif:'image/avif',
  ttf:'font/ttf', otf:'font/otf', woff:'font/woff', woff2:'font/woff2',
  mp4:'video/mp4', webm:'video/webm',
};
const ASSET_EXT = 'png|jpe?g|gif|webp|svg|avif|ttf|otf|woff2?|mp4';

const args = process.argv.slice(2);
function takeFlag(name, dflt){
  const i = args.indexOf(name);
  if (i === -1) return dflt;
  const v = args[i+1]; args.splice(i,2); return v;
}
const OUT = resolve(ROOT, takeFlag('--out','dist'));
const MAX_IMAGE_KB = parseInt(takeFlag('--max-image-kb','900'),10);

const targets = args.length ? args.map(a=>resolve(ROOT,a)) : [
  ...globSync('preview/*.html',{cwd:ROOT}),
  ...globSync('ui_kits/*/*.html',{cwd:ROOT}),
  ...globSync('tools/*/index.html',{cwd:ROOT}),
].map(p=>resolve(ROOT,p));

/* ── optional Chromium-based JPEG re-encoder for oversized rasters ── */
let encoder = null;
async function initEncoder(){
  try {
    const { chromium } = await import('playwright-core');
    const exe = process.env.CHROMIUM_PATH
      || globSync('/opt/pw-browsers/chromium-*/chrome-linux/chrome')[0];
    const browser = await chromium.launch(exe?{executablePath:exe}:{});
    const page = await browser.newPage();
    encoder = {
      browser,
      /* load the original page in-repo and record which local assets it
         actually fetches — used to prune unused rules from shared CSS */
      async observe(file){
        const p = await browser.newPage();
        const used = new Set();
        p.on('request',r=>{
          const u = r.url();
          if (u.startsWith('file://'))
            used.add(decodeURIComponent(u.slice(7).split('?')[0]));
        });
        try { await p.goto('file://'+file,{timeout:15000}); await p.waitForTimeout(4000); }
        catch { /* offline CDN failures etc — the local requests still fired */ }
        await p.close();
        return used;
      },
      async convert(bytes, mime){
        return page.evaluate(async ({b64,mime})=>{
          const img = new Image();
          img.src = `data:${mime};base64,${b64}`;
          await img.decode();
          const scale = Math.min(1, 2000/Math.max(img.naturalWidth,img.naturalHeight));
          const c = document.createElement('canvas');
          c.width = Math.round(img.naturalWidth*scale);
          c.height = Math.round(img.naturalHeight*scale);
          const ctx = c.getContext('2d', {willReadFrequently:true});
          ctx.drawImage(img,0,0,c.width,c.height);
          const d = ctx.getImageData(0,0,c.width,c.height).data;
          for(let i=3;i<d.length;i+=4) if(d[i]<250) return null;   // keep alpha assets intact
          const url = c.toDataURL('image/jpeg',0.85);
          return url.slice(url.indexOf(',')+1);
        },{b64:Buffer.from(bytes).toString('base64'),mime});
      },
    };
  } catch { /* playwright-core not installed — verbatim inlining only */ }
}

/* ── shared asset cache (absolute path → data URI) ── */
const assetCache = new Map();
const stats = { inlined:0, converted:0, missing:0 };
async function loadAsset(absPath){
  if (assetCache.has(absPath)) return assetCache.get(absPath);
  if (!existsSync(absPath)){
    stats.missing++;
    console.warn(`  ! missing ${relative(ROOT,absPath)}`);
    assetCache.set(absPath, null);
    return null;
  }
  const ext = absPath.split('.').pop().toLowerCase();
  let mime = MIME[ext] || 'application/octet-stream';
  const bytes = readFileSync(absPath);
  let b64 = bytes.toString('base64');
  if (encoder && (mime==='image/png'||mime==='image/jpeg')
      && bytes.length > MAX_IMAGE_KB*1024){
    const out = await encoder.convert(bytes, mime);
    if (out){ b64 = out; mime = 'image/jpeg'; stats.converted++; }
  }
  const uri = `data:${mime};base64,${b64}`;
  assetCache.set(absPath, uri);
  stats.inlined++;
  return uri;
}

const isRemote = s=>/^(https?:|data:|\/\/|#)/.test(s);
const URL_RE = new RegExp(`url\\((['"]?)(?!https?:|data:|\\/\\/|#)([^'")]+?\\.(?:${ASSET_EXT}))\\1\\)`,'g');
const ATTR_RE = new RegExp(`(src|href|poster)=("|')(?!https?:|data:|#|\\/\\/)([^"']+?\\.(?:${ASSET_EXT}))\\2`,'g');

async function inlineCssText(css, cssDir, usedSet){
  const refs = [...css.matchAll(URL_RE)].map(m=>m[2]);
  const map = new Map();
  for (const r of new Set(refs)){
    const abs = resolve(cssDir,r);
    if (usedSet && !usedSet.has(abs)){ stats.pruned++; continue; }   // rule never fetched by this page
    map.set(r, await loadAsset(abs));
  }
  return css.replace(URL_RE,(m,q,ref)=>{
    const uri = map.get(ref);
    return uri ? `url(${q}${uri}${q})` : m;
  });
}

function flatName(file){
  const rel = relative(ROOT,file).replace(/\\/g,'/');
  if (basename(rel)==='index.html') return rel.split('/').slice(0,-1).join('-')+'.html';
  return rel.replace(/\.html$/,'').split('/').join('-')+'.html';
}

async function build(file){
  let html = readFileSync(file,'utf8');
  const dir = dirname(file);
  Object.assign(stats,{inlined:0,converted:0,missing:0,pruned:0});

  /* which local assets does this page actually fetch? (prunes shared-CSS rules) */
  const usedSet = encoder ? await encoder.observe(file) : null;

  /* 1 · the page's own <style> blocks + style="" attributes: url() refs
         relative to the html (before any linked CSS is injected, so pruned
         leftovers in shared styles are never re-resolved from the wrong dir) */
  html = await inlineCssText(html, dir);

  /* 2 · src/href/poster asset attributes */
  const attrRefs = [...html.matchAll(ATTR_RE)].map(m=>m[3]);
  const map = new Map();
  for (const r of new Set(attrRefs)) map.set(r, await loadAsset(resolve(dir,r)));
  html = html.replace(ATTR_RE,(m,attr,q,ref)=>{
    const uri = map.get(ref);
    return uri ? `${attr}=${q}${uri}${q}` : m;
  });

  /* 3 · local stylesheets → inline <style> (urls resolved against the css dir;
         url() rules the page never fetched are left untouched) */
  const links = [...html.matchAll(/<link\b[^>]*href=("|')([^"']+\.css)\1[^>]*\/?>/g)]
    .filter(m=>!isRemote(m[2]));
  for (const m of links){
    const cssPath = resolve(dir, m[2]);
    if (!existsSync(cssPath)){ stats.missing++; console.warn(`  ! missing ${m[2]}`); continue; }
    const css = await inlineCssText(readFileSync(cssPath,'utf8'), dirname(cssPath), usedSet);
    html = html.replace(m[0], `<style>\n${css}\n</style>`);
  }

  /* 4 · local scripts → inline <script> */
  html = html.replace(/<script\b[^>]*\bsrc=("|')([^"']+\.js)\1[^>]*>\s*<\/script>/g,(m,q,src)=>{
    if (isRemote(src)) return m;
    const p = resolve(dir,src);
    if (!existsSync(p)){ stats.missing++; console.warn(`  ! missing ${src}`); return m; }
    return `<script>\n${readFileSync(p,'utf8').replace(/<\/script/gi,'<\\/script')}\n</script>`;
  });

  mkdirSync(OUT,{recursive:true});
  const out = join(OUT, flatName(file));
  writeFileSync(out, html);
  const kb = (statSync(out).size/1024)|0;
  console.log(`✔ ${relative(ROOT,out)}  ${kb}KB  (${stats.inlined} new assets, ${stats.converted} → jpeg, ${stats.pruned} unused pruned${stats.missing?`, ${stats.missing} missing`:''})`);
}

await initEncoder();
for (const t of targets) await build(t);
if (encoder) await encoder.browser.close();
