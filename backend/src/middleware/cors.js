const cors = require("cors");

const corsMiddleware = cors({
  origin: process.env.WIDGET_ORIGIN || "*",
  credentials: false,
});

module.exports = corsMiddleware;
