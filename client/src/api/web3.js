import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { providers } from "ethers";
import WalletConnect from "@walletconnect/web3-provider";
import { setAccount, setProvider, setSigner } from "../redux/web3Slice";
import { solidityKeccak256, keccak256, arrayify } from "ethers/lib/utils";
import crypTea from "../contracts/crypTea.json";
import ERC20 from "../contracts/ERC20.json";
import constants from "../constants.json";
import { MerkleTree } from "merkletreejs";

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

export const connectWallet = async (_provider, _signer, _account, dispatch) => {
    if (_provider == undefined) {
        const { provider, accounts, signer } = await init();
        setNetwork(provider);
        dispatch(setSigner({ signer: signer }));
        dispatch(setProvider({ provider: provider }));
        dispatch(setAccount({ account: accounts[0] }));
        return { _provider: provider, _account: accounts[0], _signer: signer };
    }
    return { _provider: _provider, _account: _account, _signer: _signer };

}

const setNetwork = (provider) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { chainId } = await provider.getNetwork()
            if (chainId == 5)
                resolve();
            await switchNetwork(provider);
            resolve();
        } catch (error) {
            reject(error);
        }
    })
}

const switchNetwork = async (provider) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(provider);
            await provider.send(
                'wallet_switchEthereumChain',
                [{ chainId: '0x5' }]
            );
            resolve("Chain switched");
        } catch (e) {
            console.log(e);
            if (e.code === 4902) {
                try {
                    await provider.send('wallet_addEthereumChain',
                        [{
                            chainId: '0x5',
                            chainName: 'Görli Testnet',
                            rpcUrls: ['https://goerli.infura.io/v3/'],
                        }],
                    );
                    resolve("Chain switched");
                } catch (addError) {
                    console.error(addError);
                    reject("Chain could not be switched");
                }
            }
            console.error(e);
            reject("Chain could not be switched");
        }
    })
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
    const weth = new ethers.Contract(constants.WETH, ERC20.abi, signer);
    const usdt = new ethers.Contract(constants.USDT, ERC20.abi, signer);
    return { contract, weth, usdt };
}

export const performTxn = async (contract, token, tokenAmount, to) => {
    return new Promise(async (resolve, reject) => {
        try {
            const tree = new MerkleTree([constants.ETH, constants.WETH, constants.USDT], keccak256, { hashLeaves: true, sortPairs: true });

            // get merkleproof of the given token
            const proof = tree.getHexProof(solidityKeccak256(['address'], [token]));
            const amtInWei = ethers.utils.parseUnits(String(tokenAmount), 18);
            const txn = await contract.donate(
                token, amtInWei, to, proof, { value: token == constants.ETH ? amtInWei : 0 }
            );
            resolve(txn);
        } catch (error) {
            reject(error);
        }
    })
}

export const getApproval = async (token, amount) => {
    console.log(token.address, amount);
    return new Promise(async (resolve, reject) => {
        try {
            const amtInWei = ethers.utils.parseUnits(String(amount), 18);
            const txn = await token.approve(constants.crypTeaProxyAddress, amtInWei);
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


