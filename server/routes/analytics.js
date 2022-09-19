const express = require("express");
const { saveAnalytics } = require("../controllers/analytics");

const analyticsRoutes = express.Router();

analyticsRoutes.post("/", saveAnalytics);

module.exports = { analyticsRoutes };
