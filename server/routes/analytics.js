const express = require("express");
const { saveAnalytics , getAnalytics } = require("../controllers/analytics");

const analyticsRoutes = express.Router();

analyticsRoutes.post("/", saveAnalytics);
analyticsRoutes.get("/", getAnalytics);

module.exports = { analyticsRoutes };
