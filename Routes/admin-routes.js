const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middlewares");

const router = express.Router();
const authMiddleware=require('../middlewares/auth-middleware')

router.get("/welcome", authMiddleware, adminMiddleware, (req, res) => {
  res.json({
    message: "Welcome to the admin page",
  });
});

module.exports = router;