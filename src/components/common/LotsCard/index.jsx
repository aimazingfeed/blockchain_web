import { Grid } from '@material-ui/core';
import LotsCardActions from './components/LotsCardActions';
import LotsCardContent from './components/LotsCardContent';
import { getContract, detectProvider } from '../../../configs';
import Web3 from 'web3'
import { useSelector } from 'react-redux';
import { 
  userDataAddressSelector,
  userDataIsConnectedSelector
} from '../../../redux/store/userData/userDataSelector';


const LotsCard = (item) => {
  const address = useSelector(userDataAddressSelector)
  const isConnected = useSelector(userDataIsConnectedSelector)
  const sign = async () => {
    const provider = detectProvider();
    if (provider && isConnected) {
      try {
        const web3 = new Web3(provider)
        if (!item.item.isOccupied && address) {
          const rentContract = await getContract(web3)
          console.log(item.item)
          try {
            await rentContract.methods.signContract(
              web3.utils.toBN(item.index),
              item.item.isAuction ? web3.utils.toBN((parseInt(item.item.monthlyPrice, 10) +
              parseInt(item.item.auctionTick, 10))) : 0,
              false
            ).send(
              {
                  from: address,
                  value: !item.item.isAuction ? web3.utils.toBN(parseInt(item.item.monthlyPrice, 10) * 0.05) : item.item.monthlyPrice,
                  gas: 4000000
              },
              (err, res) => err ? console.log(`error ${err}`) : console.log(`Success ${res}`)
            );
          } catch (error) {
            console.log(error)
            alert('Вы не подтвердили транзакцию')
          }
          
        }
      } catch (err) {
        console.error(err)
      }
      
    } else {
      alert('Вы не подключили MetaMask')
    }
  }
  const claim = async () => {
    const provider = detectProvider();
    if (provider && isConnected) {
      try {
        const web3 = new Web3(provider)
        if (provider && isConnected) {
          const rentContract = await getContract(web3)
          console.log(rentContract)
          try {
            await rentContract.methods.calimAuction(
              web3.utils.toBN(item.index)
          ).send(
              {
                  from: address,
                  value: web3.utils.toBN(item.item.monthlyPrice),
                  gas: 4000000
              },
              (err, res) => err ? console.log(`error ${err}`) : console.log(`Success ${res}`)
          );
          } catch (error) {
            console.log(error)
          }
        }
      } catch (err) { 
        console.error(err)
      }

    }
  }
  return (
      <Grid item xs={12} sm={6} md={4}>
          <LotsCardContent
              imagePath={item.item.imagePath}
              id={item.index}
              area={item.item.area}
              isAuction={item.item.isAuction}
              hasEnded={item.item.hasEnded}
              auctionEndTime={item.item.auctionEndTime}
              tenant={item.item.tenant}
              auctionTick={item.item.auctionTick}
          />
          <LotsCardActions
              address={address}
              hasEnded={item.item.hasEnded}
              isAuction={item.item.isAuction}
              rentStatus={item.item.isOccupied ? ("Лот занят") : ("Арендовать за " + (item.item.monthlyPrice / 10 ** 18).toString()) + " ETH"}
              monthlyPrice={item.item.monthlyPrice}
              tenant={item.item.tenant}
              sign={sign}
              claim={claim}
          />
      </Grid>
  )
}

export default LotsCard;