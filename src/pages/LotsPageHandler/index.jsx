/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { detectProvider, GetWeb3, getContract, getContractsCount} from '../../configs';
import LotsCard from '../../components/common/LotsCard'

const LotsPageHandler = ()  => {
  const provider = detectProvider();
  const web3 = GetWeb3(provider);
  const [cards, setCards] = useState();
  const [count, setCount] = useState();
  const [isConnected, setIsConnected] = useState(false)
  useEffect( () => {
    let cardsRender = [];
    const contractsCount = getContractsCount(web3);
    contractsCount.then((result) => setCount(result));
    const getAllCards = async () => {
      for (let i = 0; i < count; i++) {
        try {
          const data = await getContract(web3)
          const contract = await data.methods.rentContracts(i).call().then(result => Promise.resolve(result))
          cardsRender.push(contract);
          console.log(i, 'got');
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
        <LotsCard key={index} index={index} item={item}/>
      )
      )
    }

    </div>
    
  )
}

export default LotsPageHandler;