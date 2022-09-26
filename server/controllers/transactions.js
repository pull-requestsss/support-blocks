const { Transactions } = require("../models/transactionsSchema");

const getTransactions = async (req, res) => {
	const walletAddress = res.locals.walletAddress;
	var result = await Transactions.find({ walletAddress: walletAddress })
		.select(
			["-_id", "-__v", "-updatedAt",]
		)
		.sort({ createdAt: -1 })
		.skip(parseInt(req.query.skip) || 0)
		.limit(parseInt(req.query.limit) || 10);

	if (result == null || result == undefined) {
		return res.status(404).send({ message: "No transactions found for given walletAddress." });
	}

	return res.status(200).send({ txns: result });
};


module.exports = {getTransactions};