const { getInfoFromIp } = require("../helpers/ip");
const { UserTransactionsAnalytics } = require("../models/analytics");

const saveAnalytics = async (req, res) => {
  const clientIP =
    req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
  const { paidTo } = req.body;
  if (paidTo == undefined) {
    return res
      .status(400)
      .send({ error: "paidTo wallet addresss field missing in request body." });
  }
  if (clientIP == null) {
    return res
      .status(500)
      .send({ success: false, message: "failed to save txn analytics." });
  }
  const geographicalData = await getInfoFromIp(clientIP);
  var country = "unknown";
  var city = "unknown";
  if (geographicalData != null) {
    country = geographicalData.country;
    city = geographicalData.city;
  }
  const date = new Date();
  const currentHour = date.getHours();

  const incrementUpdate = `{"$inc":{"geographicalData.${country}.totalTxns":1,"geographicalData.${country}.${city}":1,"hourlyData.${currentHour}":1}}`;
  const parsedUpdate = JSON.parse(incrementUpdate);
  try {
    await UserTransactionsAnalytics.findOneAndUpdate(
      { walletAddress: paidTo },
      parsedUpdate,
      {
        upsert: true,
      }
    );
    return res
      .status(201)
      .send({ success: true, message: "successfully saved txn data." });
  } catch (e) {
    console.log(
      "failed to save analytics for txn. Wallet Address :" +
        paidTo +
        "with exception : " +
        e
    );
  }
  return res
    .status(500)
    .send({ success: false, message: "failed to save txn analytics data." });
};

module.exports = { saveAnalytics };
