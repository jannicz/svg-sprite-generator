const attributesJson = require('../assets/attributes.json');
const express = require('express');
const next = require('next');
const nextI18next = require('./i18n.js');
const nextI18NextMiddleware = require('next-i18next/middleware').default;

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

/**
 * Starts dedicated express server
 */
app.prepare().then(async () => {
  const server = express();
  console.log('Express Server starting...');

  await nextI18next.initPromise;
  server.use(nextI18NextMiddleware(nextI18next));

  // Redirect by express
  server.get('/test', (req, res) => {
    return app.render(req, res, '/faqs', req.query);
  });

  /**
   * Classic API approach
   */
  server.get('/api/expressSvg', (req, res) => {
    console.log('API /svg, method =>', req.method, 'query =>', req.query);
    return res.status(200).json(attributesJson);
  });

  server.all('*', (req, res) => {
    // console.log('Server GET', req.url);
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${port}`);
  });
});
