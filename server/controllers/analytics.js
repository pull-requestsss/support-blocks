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

const getAnalytics = async (req, res) => {
  const walletAddress = res.locals.walletAddress;

  const data = await UserTransactionsAnalytics.findOne({
    walletAddress: walletAddress,
  });
  if (data == null) {
    const data = { countryData: { "unknown": 0 }, hourlyData: { 1: 0 } }
    return res.status(200).send({ data: data });
  }

  var countryData = {};
  for (const property in Object.fromEntries(data.geographicalData)) {
    countryData[property] = Object.fromEntries(
      Object.fromEntries(data.geographicalData)[property]
    ).totalTxns;
  }

  var hourlyData = {};
  for (const property in Object.fromEntries(data.hourlyData)) {
    hourlyData[property] = Object.fromEntries(data.hourlyData)[property];
  }
  return res.status(200).send({
    data: {
      countryData: countryData,
      hourlyData: hourlyData,
    },
  });
};

module.exports = { saveAnalytics, getAnalytics };
