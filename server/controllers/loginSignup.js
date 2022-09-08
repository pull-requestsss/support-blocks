const { validateSignature } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
require("dotenv").config();

const loginSignupController = async (req, res, _next) => {
  const { message, createdAt, owner, signature } = req.body;
  if (
    message == undefined ||
    createdAt == undefined ||
    owner == undefined ||
    signature == undefined
  ) {
    res
      .status(400)
      .send({ error: "message/createdAt/owner fields missng" });
      return;
  }

  const isValid = await validateSignature(signature, {
    message: message,
    createdAt: createdAt,
    owner: owner,
  });

  if (!isValid) {
    res.status(401).send({ error: "could not validate signature" });
    return;
  }

  const foundUser = await User.findOne({ walletAddress: owner });
  const isNewUser = foundUser == undefined ? true : false;

  const accessToken = jwt.sign(
    {
      wallet: owner,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: Number(process.env.JWT_EXPIRATION_TIME),
    }
  );

   res
    .status(200)
    .send({ accessToken: accessToken, isNewUser: isNewUser, success: true });
  return;
};

module.exports = { loginSignupController };
