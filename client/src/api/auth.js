import constants from "../constants.json";
import axios from "axios";

export const verify = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const url = constants.baseURL + "/verify";
            console.log("payload", payload);
            const res = await axios.post(url, payload);

            resolve(res.data);
        } catch (err) {
            reject(err);
        }
    })
}

