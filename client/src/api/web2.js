import axios from "axios";
import constants from "../constants.json";
import jwt_decode from "jwt-decode";

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

export const verify = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const url = constants.baseURL + "/verify";
            const res = await axios.post(url, payload);

            resolve(res.data);
        } catch (err) {
            reject(err);
        }
    })
}

export const users = async (payload, JWT) => {
    return new Promise(async (resolve, reject) => {
        try {
            const url = constants.baseURL + "/users";
            const res = await axios.post(url, payload, { headers: { Authorization: JWT } });
            resolve(res.data);
        } catch (err) {
            reject(err);
        }
    })
}

export const verifyJWT = (token, account) => {
    var decoded = jwt_decode(token);
    const time = Math.floor(Date.now() / 1000) + 1800;
    var isValid = decoded.wallet == account;
    isValid = isValid || (decoded.exp <= time);
    return isValid;
}

export const sendAnalytics = async (account) => {
    return new Promise(async (resolve, reject) => {
        try {
            const url = constants.baseURL + "/analytics";
            const payload = {
                paidTo: account
            }
            const res = await axios.post(url, payload);
            resolve(res.data);
        } catch (error) {
            console.log(error);
            resolve(error);
        }
    })
}

