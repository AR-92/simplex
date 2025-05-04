const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const userRoutes = require('./routes/userRoutes');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const pathname = parsedUrl.pathname;

  // Serve static files (if needed)
  if (pathname.startsWith('/public/')) {
    const filePath = path.join(__dirname, pathname);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      } else {
        let contentType = 'text/plain';
        if (filePath.endsWith('.css')) contentType = 'text/css';
        if (filePath.endsWith('.js')) contentType = 'application/javascript';
        if (filePath.endsWith('.html')) contentType = 'text/html';
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
    return;
  }

  // Basic routing
  let routeFound = false;
  for (let route of userRoutes) {
    if (route.method === method && route.path.test(pathname)) {
      routeFound = true;
      const params = route.path.exec(pathname).groups || {};
      const query = parsedUrl.query;

      req.body = '';
      req.on('data', chunk => { req.body += chunk; });
      req.on('end', () => {
        if (method === 'POST') {
          req.body = new URLSearchParams(req.body);
        }
        route.handler(req, res, { params, query });
      });
      break;
    }
  }
  if (!routeFound) {
    // For the root URL, serve the index page
    if (pathname === '/') {
      fs.readFile(path.join(__dirname, 'views', 'index.html'), (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Server error');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
