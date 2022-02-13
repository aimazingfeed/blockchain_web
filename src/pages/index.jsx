import React, { useState } from 'react'

const Main = ()  => {
    const [isConnected, setIsConnected] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(null);
    const [balance, setBalance] = useState(0);

    const onLogin = async (provider) => {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
        console.log("Please connect to MetaMask!");
    } else if (accounts[0] !== currentAccount) {
        setCurrentAccount(accounts[0]);
        const accBalanceEth = web3.utils.fromWei(
        await web3.eth.getBalance(accounts[0]),
        "ether"
    );

    setBalance(Number(accBalanceEth).toFixed(6));
    setIsConnected(true);
    }
};

const onLogout = () => {
    setIsConnected(false);
};

}