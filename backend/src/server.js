const express = require("express");
const dotenv = require("dotenv");

const corsMiddleware = require("./middleware/cors");
const rateLimiter = require("./middleware/rateLimit");
const { errorHandler } = require("./middleware/errorHandle");
const chatRoutes = require("./routes/chat.routes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10kb" }));
app.use(corsMiddleware);

app.use("/api", rateLimiter);

app.use("/api", chatRoutes);

app.get("/api/health", (req, res) => {
  return res.json({
    success: true,
    message: "Backend is running",
    aiServiceUrl: process.env.AI_SERVICE_URL || "http://localhost:8000",
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
  console.log(`Using AI service at: ${process.env.AI_SERVICE_URL || "http://localhost:8000"}`);
});
