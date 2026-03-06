// backend/src/server.js
const app = require('./app');
const config = require('./config/config');

const port = config.port;

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
