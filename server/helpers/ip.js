const { default: axios } = require("axios");

const getInfoFromIp = async (ip) => {
  const response = axios
    .get(`https://ipinfo.io/${ip}/json?token=${process.env.IP_INFO_API_KEY}`)
    .then((res) => {
      if (res.status / 10 == 20) {
        if(res.data.bogon==true){
          return null;
        }
        return res.data;
      } else {
        return null;
      }
    })
    .catch((e) => {
      console.log("failed to fetch ip info with exception" + e);
      return null;
    });
  return response;
};

module.exports = { getInfoFromIp };
