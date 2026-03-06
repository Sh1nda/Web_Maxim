// backend/src/app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// базовые middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// health-check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'coffee-accessories-backend' });
});

// API routes
app.use('/api', routes);

// error handler
app.use(errorHandler);

module.exports = app;
