const { sendChatToAI, checkAIHealth } = require("../services/aiProxyService");

const chatController = {
  async sendMessage(req, res, next) {
    try {
      const { message, conversationHistory } = req.body;

      if (!message || typeof message !== "string" || !message.trim()) {
        return res.status(400).json({
          success: false,
          error: "message is required and must be a non-empty string",
        });
      }

      const limitedHistory = Array.isArray(conversationHistory)
        ? conversationHistory.slice(-10)
        : [];

      const startTime = Date.now();

      const aiData = await sendChatToAI(message.trim(), limitedHistory);

      const responseTime = Date.now() - startTime;

      return res.json({
        success: true,
        data: {
          ...aiData,
          metadata: {
            ...(aiData?.metadata || {}),
            response_time_ms: responseTime,
          },
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async healthCheck(req, res, next) {
    try {
      const aiHealth = await checkAIHealth();

      return res.json({
        success: true,
        backend: "healthy",
        ai_service: aiHealth,
      });
    } catch (err) {
      return res.status(503).json({
        success: false,
        backend: "healthy",
        ai_service: "unavailable",
      });
    }
  },
};

module.exports = chatController;
