import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Helper to serve HTML with nav-node.js injected
function sendHtmlWithNav(filePath, res) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('nav-node.js')) {
      const scriptTag = '<script src="/nav-node.js" defer></script>';
      if (content.includes('</body>')) {
        content = content.replace('</body>', `${scriptTag}\n</body>`);
      } else {
        content += `\n${scriptTag}`;
      }
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(content);
  } catch (err) {
    console.error('Error serving HTML:', err);
    res.status(500).send('Internal Server Error');
  }
}

// Rewrite rules matching vercel.json
app.get(['/', '/tools', '/tools/'], (req, res) => {
  sendHtmlWithNav(path.join(__dirname, 'tools', 'index.html'), res);
});

app.get(['/components', '/components/'], (req, res) => {
  sendHtmlWithNav(path.join(__dirname, 'components', 'index.html'), res);
});

// Intercept any direct HTML file requests
app.use((req, res, next) => {
  if (req.method === 'GET') {
    const rawPath = req.path;
    if (rawPath.endsWith('.html')) {
      const fullPath = path.join(__dirname, rawPath);
      if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
        return sendHtmlWithNav(fullPath, res);
      }
    }
    // Check if directory with index.html
    const dirIndexPath = path.join(__dirname, rawPath, 'index.html');
    if (fs.existsSync(dirIndexPath) && fs.statSync(dirIndexPath).isFile()) {
      return sendHtmlWithNav(dirIndexPath, res);
    }
  }
  next();
});

// Serve static assets from project root
app.use(express.static(__dirname));

// Fallback for not-found HTML routes
app.use((req, res) => {
  sendHtmlWithNav(path.join(__dirname, 'tools', 'index.html'), res);
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
