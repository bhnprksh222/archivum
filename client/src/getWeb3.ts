import { useState } from 'react';
import Web3 from "web3";

const getWeb3 = async () => {
    // Modern dapp browsers...
    const [connectedAccount, setConnectedAccount] = useState('null')
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            setConnectedAccount(accounts[0]);
            return web3;
        } catch (error) {
            console.log(error);
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        return web3;
    }
    // Fallback to localhost; use dev console port by default...
    else {
        const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        return web3;
    }
};

export default getWeb3;