import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { providers } from "ethers";
import WalletConnect from "@walletconnect/web3-provider";
import { setAccount, setProvider, setSigner } from "../redux/web3Slice";
import { solidityKeccak256, arrayify } from "ethers/lib/utils";
import crypTea from "../contracts/crypTea.json";
import constants from "../constants.json";

const providerOptions = {
    walletconnect: {
        package: WalletConnect, // required
        options: {
            infuraId: '25ca5cbdea4f4b2eb3c5c454608fead3' // required
        }
    }
}

const web3Modal = new Web3Modal({
    providerOptions, // required
    cacheProvider: false
});

const init = async () => {
    const web3Provider = await web3Modal.connect();

    const provider = new providers.Web3Provider(web3Provider);
    const accounts = await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    return { provider, accounts, signer };
}

export const connectWallet = async (provider, signer, account, dispatch) => {
    if (provider == undefined) {
        const { provider, accounts, signer } = await init();
        dispatch(setSigner({ signer: signer }));
        dispatch(setProvider({ provider: provider }));
        dispatch(setAccount({ account: accounts[0] }));
        return { _provider: provider, _account: accounts[0], _signer: signer };
    }
    return { _provider: provider, _account: account, _signer: signer };

}


export const getSignature = async (signer, message) => {
    var messageDigest = solidityKeccak256(['string', 'uint256', 'address'], [message.message, message.createdAt, message.owner]);
    const signature = await signer.signMessage(arrayify(messageDigest));
    return signature;
}

export const logout = () => {
    web3Modal.clearCachedProvider();
}

export const getContract = async () => {
    const web3Provider = await web3Modal.connect();
    const provider = new providers.Web3Provider(web3Provider);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(constants.crypTeaProxyAddress, crypTea.abi, signer);
    return contract;
}


export const performTxn = async (contract, token, tokenAmount, to) => {
    return new Promise(async (resolve, reject) => {
        try {
            // get merkleproof of the given token
            const proof = [];
            const amtInWei = ethers.utils.parseUnits(tokenAmount, 18);
            const txn = await contract.donate(
                token, amtInWei, to, proof, { value: token == constants.ETH ? amtInWei : 0 }
            );
            resolve(txn);
        } catch (error) {
            reject(error);
        }
    })
}

export const _getSignature = async (_signer, _account) => {
    const timeNow = Math.round(Date.now() / 1000);
    const message = {
        message: "Welcome to buy me a CrypTea",
        createdAt: timeNow,
        owner: _account,
    };
    const sig = await getSignature(_signer, message);
    return { sig, message };
};
