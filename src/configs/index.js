import { useState, useEffect } from 'react';
import Web3 from 'web3';
import jsonAbi from '../contract/rentContract.json';
import { contractAddress } from '../contract/contractAddress';

export const GetWeb3 = (provider) => {
    const [web3, setWeb3] = useState(undefined);
    useEffect(() => {
        const detected = new Web3(provider);
        setWeb3(detected);
    }, [provider]);
    if (web3) {
        return web3
    }
}

export const detectProvider = () => {
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

export const getContract = async (web3) => {
    if (window.ethereum && web3) {
        var RentContract = new web3.eth.Contract(jsonAbi, contractAddress);
        var contract = await RentContract;
        return contract;
    } else if (!web3) {
        console.log('No web3 available')
    } else if (!window.ethereum) {
        console.log('!window.ethereum')
    }
}

export const getContractsCount = async (web3) => {
    if (window.ethereum && web3) {
        try {
            var RentContract = new web3.eth.Contract(jsonAbi, contractAddress);
            var rentsCount = await RentContract.methods.getContractsLength().call();
        } catch (err) {
            alert('Please, choose the Kovan test network')
            console.error(err)
        }
        return rentsCount;
    }
}