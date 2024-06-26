const corsAnywhere = require('cors-anywhere');

const host = 'localhost';
const port = 8081;

corsAnywhere.createServer({
  originWhitelist: [], // Herhangi bir origin'i kabul eder
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, () => {
  console.log(`Running CORS Anywhere on ${host}:${port}`);
});
