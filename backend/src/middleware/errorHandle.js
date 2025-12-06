function errorHandler(err, req, res, next) {
  console.error("Error:", err);

  if (err.code === "ECONNREFUSED" || err.code === "ENOTFOUND") {
    return res.status(503).json({
      success: false,
      error: "AI service unavailable",
    });
  }

  if (err.response) {
    return res.status(err.response.status || 500).json({
      success: false,
      error: err.response.data || "AI service error",
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Unexpected server error";

  res.status(statusCode).json({
    success: false,
    error: message,
  });
}

module.exports = { errorHandler };
