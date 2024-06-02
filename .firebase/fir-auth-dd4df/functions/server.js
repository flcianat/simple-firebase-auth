const { onRequest } = require('firebase-functions/v2/https');
  const server = import('firebase-frameworks');
  exports.ssrfirauthdd4df = onRequest({"region":"us-east1"}, (req, res) => server.then(it => it.handle(req, res)));
  