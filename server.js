import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Rewrite rules matching vercel.json
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'tools', 'index.html'));
});

app.get('/tools', (req, res) => {
  res.sendFile(path.join(__dirname, 'tools', 'index.html'));
});

app.get('/components', (req, res) => {
  res.sendFile(path.join(__dirname, 'components', 'index.html'));
});

// Serve static assets from project root
app.use(express.static(__dirname));

// Fallback for not-found HTML routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'tools', 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
