import { useState, useMemo } from 'react';
import Web3 from 'web3';

export const GetWeb3 = (provider) => {
    const [web3, setWeb3] = useState(undefined);
    useMemo(() => {
        const detected = new Web3(provider);
        setWeb3(detected);
    }, [provider]);
    if (web3) {
        return web3
    }
}

export const DetectProvider = () => {
    let provider;
    if (window.ethereum) {
        provider = window.ethereum;
    } else if (window.web3) {
        provider = window.web3.currentProvider;
    } else {
        window.alert("No Ethereum browser detected! Check out MetaMask");
    }
    return provider;
};

