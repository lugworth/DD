import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const SCRIPT_TAG = '<script src="/nav-node.js" defer></script>';
const EXCLUDED_DIRS = new Set(['node_modules', '.git', 'dist']);

function findHtmlFiles(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (EXCLUDED_DIRS.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(findHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }

  return files;
}

console.log('Building digidelic design system for production / Vercel...');

const htmlFiles = findHtmlFiles(rootDir);
let injectedCount = 0;

for (const filePath of htmlFiles) {
  const relativePath = path.relative(rootDir, filePath);
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('nav-node.js')) {
    if (content.includes('</body>')) {
      content = content.replace('</body>', `  ${SCRIPT_TAG}\n</body>`);
    } else {
      content += `\n${SCRIPT_TAG}\n`;
    }
    fs.writeFileSync(filePath, content, 'utf8');
    injectedCount++;
  }
}

console.log(`Scan complete: ${htmlFiles.length} HTML files verified. Injected nav-node into ${injectedCount} files.`);
console.log('Build complete - static assets ready for deployment.');
