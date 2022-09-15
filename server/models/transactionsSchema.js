const { isAddress } = require("ethers/lib/utils");
const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema(
  {
    sender: {
      type: String,
      index: true,
      required: [
        true,
        "wallet address of sender is required to save transction.",
      ],
      validate: {
        validator: function () {
          return isAddress(this.sender.toLowerCase());
        },
        message: "wallet address should be unique ETH address.",
      },
    },
    receiver: {
      type: String,
      index: true,
      required: [
        true,
        "wallet address of receiver is necessary to save transaction.",
      ],
      validate: {
        validator: function () {
          return isAddress(this.receiver.toLowerCase());
        },
        message: "wallet address should be unique ETH address.",
      },
    },
    token: {
      type: String,
      index: true,
      required: true,
    },
    totalAmount: {
      type: mongoose.Types.Decimal128,
      required: [
        true,
        "total amount of transactions is required to save transaction.",
      ],
    },
    amountReceived: {
      type: mongoose.Types.Decimal128,
      required: [true, "amount received is required for saving transaction."],
    },
  },
  {
    collection: "Transactions",
    timestamps: true,
  }
);

const Transactions = mongoose.model("Transctions", TransactionSchema);
module.exports = { Transactions };
