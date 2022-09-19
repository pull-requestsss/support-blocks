const { isAddress } = require("ethers/lib/utils");
const mongoose = require("mongoose");

const UserTransactionsAnalyticsSchema = mongoose.Schema(
  {
    walletAddress: {
      type: String,
      required: true,
      unique: true,
      index: true,
      validate: {
        validator: function () {
          return isAddress(this.walletAddress.toLowerCase());
        },
        message: "wallet address is not valid ETH address.",
      },
    },
    geographicalData: {
      type: Map,
      of: Map,
    },
    hourlyData: {
      type: Map,
      of: Number,
    },
  },
  {
    collection: "UsrTxnsAnlytcs",
    timestamps: true,
  }
);

const UserTransactionsAnalytics = mongoose.model(
  "UserTransactionsAnalytics",
  UserTransactionsAnalyticsSchema
);

module.exports = { UserTransactionsAnalytics };
