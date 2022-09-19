const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  const POSTignoredRoutes = ["/api/verify", "/api/analytics"];
  const GETignoredRoutes = ["/api/users"]
  if (req.method == "GET" && GETignoredRoutes.includes(req.path)) {
    next();
    return;
  }
  if(req.method == "POST"  && POSTignoredRoutes.includes(req.path)){
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
    return res.status(401).send({ error: "could not validate accesstoken" });
  }
};

module.exports = { authMiddleware };
