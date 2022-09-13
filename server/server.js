const express = require("express");
const morgan = require("morgan");
const cors = require("cors")
require("dotenv").config();

const connectDb = require("./db/connection");
const { verifyRoutes } = require("./routes/verifyRoutes");
const { userRoutes } = require("./routes/usersRoutes");
const { authMiddleware } = require("./middlewares/authMiddlware");

const app = express();

const PORT = process.env.APP_PORT || 8080;
const APP_ENV = process.env.APP_ENV || "production";
// const corsOptions = {
//   origin : "*",
//   optionsSuccessStatus : 200
// }

APP_ENV == "dev" ? app.use(morgan("dev")) : app.use(morgan("combined"));

app.use(cors())
app.use(express.json());
app.use(authMiddleware);

app.use("/api/verify", verifyRoutes);
app.use("/api/users", userRoutes);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is up and listening.
             PORT : ${PORT} 
             APP_ENV : ${APP_ENV} ̀
            `);
  });
});
