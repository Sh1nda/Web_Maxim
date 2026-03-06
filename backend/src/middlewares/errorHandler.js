// backend/src/middlewares/errorHandler.js

/**
 * Централизованный обработчик ошибок Express.
 */
function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  const status = err.status || 500;
  const message =
    err.message || 'Внутренняя ошибка сервера. Попробуйте позже.';

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

module.exports = errorHandler;
