const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next(); // Proceed to the next middleware/route handler
  };
  
  module.exports = { logger };
  