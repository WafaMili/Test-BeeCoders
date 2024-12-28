const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Endpoint API qui va être proxyfié
    createProxyMiddleware({
      target: 'http://localhost:5000', // Le serveur backend
      changeOrigin: true,
      secure: false,
    })
  );
};
