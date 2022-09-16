const { ethers } = require("ethers");
require("dotenv").config();

const { Transactions } = require("../models/transactionsSchema");

const provider = new ethers.providers.JsonRpcProvider(process.env.JSON_RPC_URL);
const contractAddress = process.env.CONTRACT_ADDRESS;

const contractAbi = [
  {
    inputs: [
      {
        internalType: "enum ICrypTea.CrypTeaErrorCodes",
        name: "code",
        type: "uint8",
      },
    ],
    name: "CrypTeaError",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountReceived",
        type: "uint256",
      },
    ],
    name: "Donation",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "protocolFees",
        type: "uint256",
      },
    ],
    name: "ProtocolFeeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "treasury",
        type: "address",
      },
    ],
    name: "TreasurySet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "root",
        type: "bytes32",
      },
    ],
    name: "Whitelist",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]",
      },
    ],
    name: "donate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_protocolFees",
        type: "uint256",
      },
    ],
    name: "setProtocolFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_treasury",
        type: "address",
      },
    ],
    name: "setTreasury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "root",
        type: "bytes32",
      },
    ],
    name: "whitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const contract = new ethers.Contract(contractAddress, contractAbi, provider);

const listenForTransactions = async () => {
  contract.on(
    "Donation",
    async (from, to, token, totalAmount, amountReceived) => {
      try {
        await Transactions.insertMany({
          sender: from,
          receiver: to,
          token: token,
          totalAmount: totalAmount,
          amountReceived: amountReceived,
        });
      } catch (e) {
        console.log(
          "failed to save transaction from event with exception :" + e
        );
      }
    }
  );
};

module.exports = { listenForTransactions };
