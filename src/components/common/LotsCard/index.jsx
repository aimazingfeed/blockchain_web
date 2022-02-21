import Card from '@material-ui/core/Card';
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
  console.log(item.index+1, item.item)
  const address = useSelector(userDataAddressSelector)
  const isConnected = useSelector(userDataIsConnectedSelector)
  const now = Date.now()
  const calculated = parseInt(item.item.auctionEndTime)-now
  const date = calculated < now ? now : calculated
  const price = () => {
    const provider = detectProvider();
    if (provider)
      try {
        const web3 = new Web3(provider)
        return web3.utils.fromWei(item.item.monthlyPrice, 'ether')
      } catch (err) {
        console.error(err)
      }
  }
  const sign = async () => {
    const provider = detectProvider();
    if (provider && isConnected) {
      try {
        const web3 = new Web3(provider)
        if (!item.item.isOccupied && address) {
          const rentContract = await getContract(web3)
          try {
            await rentContract.methods.signContract(
              web3.utils.toBN(item.index),
              item.item.isAuction ? web3.utils.toBN((parseInt(item.item.monthlyPrice, 10) +
              parseInt(item.item.auctionTick, 10))) : 0,
              false
            ).send(
              {
                  from: address,
                  value: item.item.isAuction ? web3.utils.toBN(parseInt(item.item.monthlyPrice, 10) * 0.05) : item.item.monthlyPrice,
                  gas: 4000000
              },
              (err, res) => err ? console.log(`error ${err}`) : console.log(`Success ${res}`)
            );
          } catch (error) {
            console.error(error)
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
    console.log(item.item)
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
      <Card style={{
        backgroundColor: "#181a1b",
        width: '17rem',
        height: '24.75rem',
        margin: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
        }}>
        <LotsCardContent
                imagePath={item.item.imagePath}
                id={item.index}
                area={item.item.area}
                isAuction={item.item.isAuction}
                hasEnded={calculated < now}
                date={date}
                tenant={item.item.tenant}
                auctionTick={item.item.auctionTick}
                rentStatus={item.item.isOccupied ? (" Лот занят") :
                  (" Доступно к приобритению")}
                isOccupied={item.item.isOccupied}
            />
            <LotsCardActions
                address={address}
                hasEnded={calculated < now}
                isAuction={item.item.isAuction}
                rentStatus={item.item.isOccupied ? ("Лот занят") :
                ("Арендовать за " + price().toString() + " ETH")}
                isOccupied={item.item.isOccupied}
                monthlyPrice={item.item.monthlyPrice}
                tenant={item.item.tenant}
                sign={sign}
                claim={claim}
            />
        </Card>
    
      
  )
}

export default LotsCard;