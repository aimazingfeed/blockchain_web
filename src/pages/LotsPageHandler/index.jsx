/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { detectProvider, GetWeb3, getContract, getContractsCount} from '../../configs';
import LotsCard from '../../components/common/LotsCard'

const LotsPageHandler = ()  => {
  const provider = detectProvider();
  const web3 = GetWeb3(provider);
  const [cards, setCards] = useState([]);
  const [count, setCount] = useState();
  const [isLoaded, setIsLoaded] = useState(false)
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
      setCards(cardsRender);
    }
    return getAllCards();
  }, [web3, count])
  useEffect(()=> {
    setIsLoaded(cards.length.toString() === count)
  }, [cards, count])
  return(
    // <RSC contentProps={{style: {paddingTop: '2rem', height: '100vh'}}}>
      <div 
        style={{ 
          overflow: 'hidden',
          display:'flex',
          flexWrap: 'wrap',
          boxSizing: 'border-box',
          justifyContent: 'center',
          }}>

          { !isLoaded && 
          <div style={{ position: 'fixed', top: '50%', left: '50%', zIndex: '1000'}}> 
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
    // </RSC>
      
  )
}

export default LotsPageHandler;