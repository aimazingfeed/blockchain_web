import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Login from './../../components/Login';
import Home from './../../components/Home';
import { useDispatch } from 'react-redux';
import { setUserAdress, setUserBalance, setUserIsConnected } from '../../redux/store/userData/userDataSlice';

const HomePageHandler = ()  => {
    const dispatch = useDispatch();
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
  useEffect(() => {
    dispatch(setUserAdress(currentAccount));
    dispatch(setUserBalance(balance));
    dispatch(setUserIsConnected(isConnected));
  }
  , [isConnected, currentAccount, balance]);
const onLogout = () => {
    setIsConnected(false);
};
    return(
    <div style={{ marginTop: '4rem'}}>
        {!isConnected && <Login onLogin={onLogin} onLogout={onLogout} />}
        {isConnected && (
          <Home currentAccount={currentAccount} balance={balance} />
        )}
    </div>
    )
}

export default HomePageHandler;