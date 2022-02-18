import React, { useEffect, useMemo, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import detectProvider from '../../configs';
import jsonAbi from '../../contract/rentContract.json';
import { contractAddress } from '../../contract/contractAddress';
import Web3 from 'web3';

const LotsPageHandler = ()  => {
  const provider = detectProvider();
  const [web3, setWeb3] = useState(undefined);
  const [cards, setCards] = useState();
  const [count, setCount] = useState();
  const [isConnected, setIsConnected] = useState(false);
  //setting up web3
  useMemo(() => {
    const detected = new Web3(provider);
    setWeb3(detected);
  }, [provider]);
  useEffect( () => {
    let cardsRender = [];

    const getContract = async (id) => {
      if (window.ethereum && web3) {
        var RentContract = new web3.eth.Contract(jsonAbi, contractAddress);
        var contract = await RentContract.methods.rentContracts(id).call();
        return contract;
      } else if (!web3) {
        console.log('No web3 available')
      } else if (!window.ethereum) {
        console.log(!window.ethereum)
      }
    }
    const getContractsCount = async () => {
      if (window.ethereum && web3) {
        var RentContract = new web3.eth.Contract(jsonAbi, contractAddress);
        var rentsCount = await RentContract.methods.getContractsLength().call();
        return rentsCount;
      } else {
        console.log('No available')
      }
    }
    const contractsCount = getContractsCount();
    // console.log(contractsCount);
    contractsCount.then((result) => setCount(result));
    const getAllCards = async () => {
      for (let i = 0; i < count; i++) {
        try {
          const contract = await getContract(i).then(resolve => { return resolve });
          cardsRender.push(contract);
          console.log(i, 'got')
        } catch (error) {
          console.error()
        }
      }
      setIsConnected(cards);
      setCards(cardsRender);
    }
    return getAllCards();
  }, [web3, count])

  return(
    <div style={{ color: 'white', display:'flex', flexDirection: 'column' }}>
      { !isConnected && 
      <div style={{ position: 'fixed', top: '50%', left: '50%'}}> 
        <CircularProgress color="secondary" />
      </div>
      }
    { cards &&
      cards.map((item, index) => (
        <h1 key={index} style={{  display: 'flex',justifyContent: 'center' }} >
          Card №{index}
        </h1>
      ))
    }

    </div>
    
  )
}

export default LotsPageHandler;