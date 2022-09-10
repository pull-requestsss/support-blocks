import Web3Modal from "web3modal";
import { providers } from "ethers";
import WalletConnect from "@walletconnect/web3-provider";


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

export const connectWallet = async () => {
    const web3Provider = await web3Modal.connect();

    const provider = new providers.Web3Provider(web3Provider);
    const accounts = await provider.send('eth_requestAccounts', []);
    console.log(accounts[0]);
}

export const logout = () => {
    web3Modal.clearCachedProvider();
}


