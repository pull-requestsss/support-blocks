const express = require("express");
const { initUpdateUser } = require("../controllers/users");

const userRoutes = express.Router();

userRoutes.post("/", initUpdateUser);

module.exports = { userRoutes };
