const express = require("express");
const { getTransactions } = require("../controllers/transactions");

const transactionRoutes = express.Router();

transactionRoutes.get("/", getTransactions);

module.exports = { transactionRoutes };
