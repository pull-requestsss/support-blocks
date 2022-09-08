const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const { User } = require("./models/userModel");
const connectDb = require("./db/connection");
const { validateSignature } = require("./helpers/auth");
const { verifyRoutes } = require("./routes/verifyRoutes");
const { authMiddleware } = require("./middlewares/authMiddlware");


const app = express();

const PORT = process.env.APP_PORT || 8080;
const APP_ENV = process.env.APP_ENV || "production";

APP_ENV == "dev" ? app.use(morgan("dev")) : app.use(morgan("combined"));

app.use(express.json());
app.use(authMiddleware);



app.use("/api/verify", verifyRoutes);

app.use("/verify", verifyRoutes);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is up and listening.
             PORT : ${PORT} 
             APP_ENV : ${APP_ENV} ̀
            `);
  });
});
