import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import LotsCardActions from './LotsCardActions';
import LotsCardContent from './LotsCardContent';
import { userDataAddressSelector } from '../../../redux/store/userData/userDataSelector'
import { useEffect } from 'react';


const LotsCard = (item) => {
    // console.log(item.item.area)
    const account = useSelector(userDataAddressSelector);
    useEffect(()=> {
        // console.log(account);
        // console.log(item)
    }, [account])
    const sign = async e => {

        
        // const sender = accounts[0].toString();

        // console.log(props.info)
        
        // if (!props.boolStatus) {
        //     var RentContract = new web3.eth.Contract(jsonAbi, contractAddress)
        //     var signContract = await RentContract.methods.signContract(
        //         props.id,
        //         props.isAuction ? (parseInt(props.price) + parseInt(props.info.auctionTick)).toString() : 0,
        //         false
        //     ).send(
        //         {
        //             from: sender,
        //             value: props.isAuction ? props.price * 0.05 : props.price,
        //             gas: 4000000
        //         },
        //         (err, res) => err ? console.log(`error ${err}`) : console.log(`Success ${res}`)
        //     );
            
        // }
    }
    return (
        <Grid item xs={12} sm={6} md={4}>
            <LotsCardContent
                imagePath={item.item.imagePath}
                id={item.item.id}
                area={item.item.area}
                isAuction={item.item.isAuction}
                hasEnded={item.item.hasEnded}
                auctionEndTime={item.item.auctionEndTime}
                tenant={item.item.tenant}
                auctionTick={item.item.auctionTick}
            />
            <LotsCardActions
                address={'provide address'}
                hasEnded={item.item.hasEnded}
                isAuction={item.item.isAuction}
                rentStatus={'provide rentStatus'}
                monthlyPrice={item.item.monthlyPrice}
                tenant={item.item.tenant}
                sign={sign}
                claim={'provide a claim method'}
            />
        </Grid>
    )
}

export default LotsCard;