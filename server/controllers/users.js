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

const isNotEmpty = async (value) => {
  return value != null || value != undefined;
};

module.exports = { initUpdateUser };
