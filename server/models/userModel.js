const mongoose = require("mongoose");
const { solidityKeccak256, isAddress } = require("ethers/lib/utils");

// schema for creators
const UserSchema = mongoose.Schema(
  {
    walletAddress: {
      type: String,
      index: true,
      required: [true, "Wallet Address is required to make an user account."],
      unique: true,
      validate: {
        validator: function () {
          return isAddress(this.walletAddress.toLowerCase());
        },
        message: "Wallet address is not a valid ETH address.",
      },
    },
    slug: {
      type: String,
      index: true,
      unique: true,
      sparse: true,
    },
    username: {
      type: String,
      required: false,
    },
    intro: {
      type: String,
      required: false,
    },
    industry: {
      type: String,
      required: false,
    },
    featuredUrl: {
      type: String,
      required: false,
    },
  },
  {
    collection: "Users",
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = { User };
