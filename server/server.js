const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const { User } = require("./models/userModel");
const connectDb = require("./db/connection");
const { validateSignature } = require("./helpers/auth");
const { verifyRoutes } = require("./routes/verifyRoutes");

const app = express();

const PORT = process.env.APP_PORT || 8080;
const APP_ENV = process.env.APP_ENV || "production";

app.use(express.json());

APP_ENV == "dev" ? app.use(morgan("dev")) : app.use(morgan("combined"));

app.use("/verify", verifyRoutes);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is up and listening.
             PORT : ${PORT} 
             APP_ENV : ${APP_ENV} ̀
            `);
  });
});
