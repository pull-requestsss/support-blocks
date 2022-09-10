const { validateSignature } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
require("dotenv").config();

const loginSignupController = async (req, res) => {
  const { message, createdAt, owner, signature } = req.body;
  if (
    message == undefined ||
    createdAt == undefined ||
    owner == undefined ||
    signature == undefined
  ) {
    return res
      .status(400)
      .send({ error: "message/createdAt/owner/signature fields missing" });
  }

  const isValid = await validateSignature(signature, {
    message: message,
    createdAt: createdAt,
    owner: owner,
  });

  if (!isValid) {
    return res.status(401).send({ error: "could not validate signature" });
  }

  const foundUser = await User.findOne({ walletAddress: owner });
  const isSlugPresent =
    foundUser.slug != undefined || foundUser.slug != null ? true : false;
  const isNewUser = foundUser == undefined || foundUser == null ? true : false;

  const accessToken = jwt.sign(
    {
      wallet: owner,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: Number(process.env.JWT_EXPIRATION_TIME),
    }
  );

  return res.status(200).send({
    accessToken: accessToken,
    isNewUser: isNewUser,
    isSlugPresent: isSlugPresent,
    success: true,
  });
};

module.exports = { loginSignupController };
