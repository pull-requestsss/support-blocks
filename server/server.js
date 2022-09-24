const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const connectDb = require("./db/connection");
const { verifyRoutes } = require("./routes/verifyRoutes");
const { userRoutes } = require("./routes/usersRoutes");
const { analyticsRoutes } = require("./routes/analytics");
const { transactionRoutes } = require("./routes/transactions");
const { authMiddleware } = require("./middlewares/authMiddlware");
const { listenForTransactions } = require("./eventListeners/transactions");

const app = express();

const PORT = process.env.APP_PORT || 8080;
const APP_ENV = process.env.APP_ENV || "production";

APP_ENV == "dev" ? app.use(morgan("dev")) : app.use(morgan("combined"));

app.use(cors());
app.use(express.json());
app.use(authMiddleware);

app.use("/api/verify", verifyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/txns", transactionRoutes);

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is up and listening.
             PORT : ${PORT} 
             APP_ENV : ${APP_ENV} ̀
            `);
    });
  })
  .then(async () => {
    await listenForTransactions();
    console.log(
      "started listening for transactional events from smart contract at address : " +
        process.env.CONTRACT_ADDRESS
    );
  });
