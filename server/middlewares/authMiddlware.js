const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  const ignoredRoutes = ["/api/verify"];

  if (ignoredRoutes.includes(req.path)) {
    next();
    return;
  }

  const accessToken = req.headers["authorization"];
  if (!accessToken) {
    return res
      .status(400)
      .send({ error: "please include accesstoken in Authorization header" });
  }
  try {
    const decodedJwt = jwt.verify(accessToken, process.env.JWT_SECRET);
    res.locals.walletAddress = decodedJwt.wallet;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send({ error: "could not validate accesstoken" });
  }
};

module.exports = { authMiddleware };
