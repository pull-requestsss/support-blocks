const express = require("express");
const { initUpdateUser, getUserDetails } = require("../controllers/users");

const userRoutes = express.Router();

userRoutes.post("/", initUpdateUser);
userRoutes.get("/", getUserDetails);

module.exports = { userRoutes };
