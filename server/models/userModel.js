const mongoose = require("mongoose");
const { solidityKeccak256, isAddress } = require("ethers/lib/utils");


// schema for creators 
const UserSchema = mongoose.Schema(
  {
    walletAddress: {
      type: String,
      index: true,
      required: [true, "Wallet Address is required to make a user account."],
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
      default: () => {
        return solidityKeccak256(["address"], [this.walletAddress]);
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
