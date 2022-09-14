import constants from "../constants.json";
import axios from "axios";

export const users = async (payload, JWT) => {
    return new Promise(async (resolve, reject) => {
        try {
            const url = constants.baseURL + "/users";
            console.log("payload", payload);
            const res = await axios.post(url, payload, { headers: { Authorization: JWT } });
            resolve(res.data);
        } catch (err) {
            reject(err);
        }
    })
}

