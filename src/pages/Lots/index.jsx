import React, { useEffect, useState } from 'react';
import DetectProvider from '../../configs';
import jsonAbi from '../../contract/rentContract.json';
import { contractAddress } from '../../contract/contractAddress';
import Web3 from 'web3';
import { Navigate } from 'react-router-dom';
import detectProvider from '../../configs';
import { useSelector } from 'react-redux';
import { userDataIsConnectedSelector } from '../../redux/store/userData/userDataSelector'

const LotsPageHandler = ()  => {
  const detected = new Web3(DetectProvider());
  const [web3, setWeb3] = useState(detected);
  useEffect(() => {
    setWeb3(detected);
  }, [detected]);
  // const isConnected = useSelector(userDataIsConnectedSelector);
  // const [userIsConnected, setUserIsConnected] = useState(isConnected);
  // useEffect(() => {
  //   setUserIsConnected(isConnected)
  // }, [isConnected]);
  // console.log(userIsConnected);
  const [cards, setCards] = useState();
  const getContract = async (id) => {
    if (window.ethereum) {
      var RentContract = new web3.eth.Contract(jsonAbi, contractAddress);
      var contract = await RentContract.methods.rentContracts(id).call();
      return contract;
    }
    
  }
  return(
    (detected && getContract(1) &&
      <>
        {getContract(1).imagePath}
      </>
      )
   
  )
}

export default LotsPageHandler;