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
      required: true,
      unique: true,
      default: function () {
        return solidityKeccak256(["address"], [this.walletAddress]).slice(2, 8);
      },
    },
    token: {
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
