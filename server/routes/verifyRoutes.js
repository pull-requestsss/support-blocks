const express = require("express");

const { loginSignupController } = require("../controllers/loginSignup");

const verifyRoutes = express.Router();

verifyRoutes.post("/", loginSignupController);

module.exports = { verifyRoutes };
