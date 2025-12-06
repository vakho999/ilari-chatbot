const axios = require("axios");

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";

async function sendChatToAI(message, conversationHistory = []) {
  const response = await axios.post(`${AI_SERVICE_URL}/chat`, {
    message,
    conversationHistory,
  });

  return response.data; 
}

async function checkAIHealth() {
  const response = await axios.get(`${AI_SERVICE_URL}/health`, { timeout: 5000 });
  return response.data;
}

module.exports = {
  sendChatToAI,
  checkAIHealth,
};
