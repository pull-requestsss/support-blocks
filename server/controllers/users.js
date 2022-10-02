const { User } = require("../models/userModel");

const initUpdateUser = async (req, res) => {
  const walletAddress = res.locals.walletAddress;
  var { slug, intro, username, industry, featuredUrl } = req.body;

  if (
    slug == undefined &&
    intro == undefined &&
    username == undefined &&
    industry == undefined &&
    featuredUrl == undefined
  ) {
    return res.status(400).send({
      err: "request body misses on all fields (slug/username/industry/featuredUrl/intro)",
    });
  }

  var toSetUpdates = {};
  if (isNotEmpty(slug)) {
    toSetUpdates.slug = slug;
  }
  if (isNotEmpty(intro)) {
    toSetUpdates.intro = intro;
  }
  if (isNotEmpty(username)) {
    toSetUpdates.username = username;
  }
  if (isNotEmpty(industry)) {
    toSetUpdates.industry = industry;
  }
  if (isNotEmpty(featuredUrl)) {
    toSetUpdates.featuredUrl = featuredUrl;
  }

  try {
    var user = await User.findOneAndUpdate(
      { walletAddress: walletAddress },
      toSetUpdates,
      { upsert: true, new: true }
    );
    var response = {
      user: {
        walletAddress: user.walletAddress,
        slug: user.slug,
        username: user.username,
        intro: user.intro,
        featuredUrl: user.featuredUrl,
        industry: user.industry,
      },
    };
    response.success = true;
    return res.status(201).send(response);
  } catch (e) {
    console.log(e);
    if (e.code == "11000") {
      if (e.keyPattern != undefined && e.keyPattern.slug != undefined) {
        return res.status(409).send({
          error: "slug already registered by another user",
          success: false,
        });
      }
    }
  }
  return res.sendStatus(500);
};

const getUserDetails = async (req, res) => {
  const queriedSlug = req.query.slug;
  const queriedWallet = req.query.wallet;

  if (queriedSlug == undefined && queriedWallet == undefined) {
    return res
      .status(400)
      .send({ message: "wallet/slug query params missing" });
  }

  if (queriedWallet != undefined) {
    const foundUser = await User.findOne({
      walletAddress: queriedWallet.toLowerCase(),
    }).select(["-_id", "-__v", "-createdAt", "-updatedAt"]);
    if (foundUser) {
      return res.status(200).send({ user: foundUser });
    }
  }

  if (queriedSlug != undefined) {
    const foundUser = await User.findOne({ slug: queriedSlug }).select([
      "-_id",
      "-__v",
      "-createdAt",
      "-updatedAt",
    ]);
    if (foundUser) {
      return res.status(200).send({ user: foundUser });
    }
  }

  return res.status(404).send({ message: "no user found" });
};

const isNotEmpty = async (value) => {
  return value !== undefined || value !== null;
};

module.exports = { initUpdateUser, getUserDetails };
