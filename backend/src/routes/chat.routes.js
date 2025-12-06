const express = require("express");
const chatController = require("../controllers/chatController");

const router = express.Router();

router.post("/chat", chatController.sendMessage);

router.get("/health", chatController.healthCheck);

module.exports = router;