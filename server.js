import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, 'dist');

// In AI Studio / Cloud Run, Nginx runs on port 8080 and reverse-proxies to http://localhost:3000.
// The Node app MUST bind to port 3000 (never 8080, which conflicts with Nginx).
const PORT = parseInt(process.env.APP_PORT || '3000', 10);
const HOST = '0.0.0.0';

// Ensure dist exists before listening
const indexPath = path.join(DIST_DIR, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.log('[server.js] dist/index.html not found, building production bundle...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('[server.js] Build completed successfully.');
  } catch (err) {
    console.error('[server.js] Build failed:', err);
  }
}

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.mjs': 'text/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.pdf': 'application/pdf',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.eot': 'application/vnd.ms-fontobject',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.txt': 'text/plain; charset=UTF-8',
  '.xml': 'application/xml; charset=UTF-8',
};

function sendFile(res, filePath, contentType) {
  try {
    const stat = fs.statSync(filePath);
    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stat.size,
      'Cache-Control': filePath.includes('assets') 
        ? 'public, max-age=31536000, immutable' 
        : 'public, max-age=3600',
    });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
}

const server = http.createServer((req, res) => {
  // Health check endpoints
  if (req.url === '/_health' || req.url === '/healthz' || req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
    return;
  }

  // Parse URL pathname safely
  let reqPath = '/';
  try {
    const parsed = new URL(req.url || '/', `http://${req.headers.host || 'localhost:3000'}`);
    reqPath = decodeURIComponent(parsed.pathname);
  } catch {
    reqPath = req.url ? req.url.split('?')[0] : '/';
  }

  // Prevent path traversal
  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(DIST_DIR, safePath);

  // If root requested, serve index.html
  if (safePath === '/' || safePath === '') {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  // Check if requested file exists
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    sendFile(res, filePath, contentType);
    return;
  }

  // SPA fallback: serve index.html for client-side routing
  if (fs.existsSync(indexPath)) {
    sendFile(res, indexPath, 'text/html; charset=UTF-8');
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(PORT, HOST, () => {
  console.log(`[server.js] Production server running at http://${HOST}:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    process.exit(0);
  });
});
