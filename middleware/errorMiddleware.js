const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging
    res.status(500).json({
      error: "An internal server error occurred. Please try again later.",
    });
  };
  
  module.exports = { errorHandler };
  