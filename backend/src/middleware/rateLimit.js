const rateLimit = require("express-rate-limit");

const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || "60000", 10); 
const max = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "30", 10);     

const limiter = rateLimit({
  windowMs,
  max,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
