import axios from "axios";
import constants from "../constants.json";

export const getUserData = async (slug) => {
    return new Promise(async (resolve, reject) => {
        try {
            const url = constants.baseURL + "/users?slug=" + slug;
            const res = (await axios.get(url)).data;
            resolve(res);
        } catch (error) {
            reject(error);
        }
    })
}

export const getRates = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum";
            const res = (await axios.get(url)).data;
            resolve({
                ETH: res[0].current_price,
                WETH: res[0].current_price,
                DAI: 1,
                USDT: 1
            });
        } catch (error) {
            reject(error);
        }
    })
}
