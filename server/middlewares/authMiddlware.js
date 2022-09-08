const authMiddleware = async (req, res, next) => {
  const ignoredRoutes = ["/api/verify"];

  if (ignoredRoutes.includes(req.path)) {
    next();
    return;
  }

  const accessToken = req.headers["authorization"];
  if (!accessToken) {
    res
      .status(400)
      .send({ error: "please include accesstoken in Authorization header" });
    return;
  }
  try {
    const decodedJwt = await jwt.verify(accessToken, process.ENV.JWT_SECRET);
    req.local.walletAddress = decodedJwt.wallet;
    next();
  } catch (err) {
    res.status(401).send({ error: "could not validate accesstoken" });
    return;
  }
};

module.exports = { authMiddleware };
