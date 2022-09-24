const { Transactions } = require("../models/transactionsSchema");

const getTransactions = async (req, res) => {
  const walletAddress = req.locals.walletAddress;
  var result = Transactions.find({ walletAddress: walletAddress })
    .sort({ createdAt: -1 })
    .skip(parseInt(req.query.skip) || 0)
    .limit(parseInt(req.query.limit) || 10);

    return res.status(200).send({txns : result});
};


module.exports = {getTransactions};