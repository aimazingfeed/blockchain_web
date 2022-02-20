import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Countdown from "react-countdown";




const LotsCardContent = ({imagePath, id, area, isAuction, hasEnded, auctionEndTime, tenant, auctionTick}) => {
    console.log(Date.now())
    return(
        <CardContent>
                <img src={imagePath} alt="rentImg" style={{display: "block", marginLeft: "auto", marginRight: "auto", marginBottom: "10px", width:"300px", height: "200px"}}/>
                <Typography gutterBottom variant="h5" component="h2" style={{color: "#fff"}}> 
                    Лот #{id + 1}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{color: "#a3a2a0"}}>
                    Площадь: {area} м^2
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{color: "#a3a2a0"}}>
                    Статус: 
                    {
                    isAuction ? 
                        (
                            hasEnded ? (" Аукцион завершен") : (` Идет аукцион, шаг цены ${auctionTick/1e18} ETH`)
                        ) 
                        : 
                        null
                    }
                </Typography>
                {isAuction && !hasEnded ?
                <Typography variant="body2" color="textSecondary" component="p" style={{color: "#a3a2a0"}}>
                    <Countdown date={parseInt(auctionEndTime, 10)}> {null} </Countdown>
                </Typography>
                : ""}
                {isAuction && !hasEnded ?
                <Typography variant="body2" color="textSecondary" component="p" style={{color: "#a3a2a0"}}>
                    Текущий победитель: {tenant} 
                </Typography>
                : ""}
                
                
            </CardContent>
    )
}

export default LotsCardContent;