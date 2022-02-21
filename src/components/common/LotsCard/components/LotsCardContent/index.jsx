import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Countdown from "react-countdown";




const LotsCardContent = ({imagePath, id, area, isAuction, hasEnded, date, tenant, auctionTick, rentStatus, isOccupied}) => {
    const EndAuction = () => <></>
    return(
        <CardContent>
                <img src={imagePath} alt="rentImg" style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: "0.4rem",
                    width:"100%",
                    height: "10rem",
                    borderRadius: '4px'
                    }}
                    />
                <Typography gutterBottom variant="h5" style={{color: "#fff"}}> 
                    Лот #{id + 1}
                </Typography>
                <div  
                style={{
                    color: "#a3a2a0", 
                    display: 'flex', 
                    flexDirection: 'row'
                    }}>
                    <Typography variant="body2" style={{color: "#a3a2a0" }} >Площадь: {area} м</Typography>
                    <Typography style={{color: "#a3a2a0", fontSize: '0.5rem'}}> 2 </Typography>
                </div>
                {/* {!isOccupied && ( */}
                <Typography variant="body2" color="textSecondary" style={{color: "#a3a2a0"}}>
                    Статус: 
                    {
                    isAuction ? 
                        (
                            hasEnded ? (" Аукцион завершен") : (` Идет аукцион, шаг цены ${auctionTick/1e18} ETH`)
                        ) 
                        : 
                        (rentStatus)
                    }
                </Typography>
                {/* )} */}
                {isAuction && !hasEnded && (
                    <Typography variant="body2" color="textSecondary" style={{color: "#a3a2a0"}}>
                        <Countdown date={date} renderer={EndAuction}/>
                    </Typography>
                )}
                {isAuction && !hasEnded ?
                <Typography variant="body2" color="textSecondary" style={{color: "#a3a2a0"}}>
                    Текущий победитель: {tenant} 
                </Typography>
                : ""}
                
                
            </CardContent>
    )
}

export default LotsCardContent;