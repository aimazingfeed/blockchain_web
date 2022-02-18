import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

const LotsCardContent = ({imagePath, id, area, isAuction, hasEnded, auctionEndTime, tenant, auctionTick}) => {
    // console.log(imagePath, id, area, isAuction, hasEnded, auctionEndTime, tenant, auctionTick);
    const now = Date.now();

    const dt = new Date((parseInt(auctionEndTime) - now))

    let hr = dt.getHours()
    let min = dt.getMinutes()
    let sec = dt.getSeconds()

    if (min < 10) min = "0"+min.toString()
    if (sec < 10) sec = "0"+sec.toString()
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
                    Конец аукциона: {hr}:{min}:{sec} 
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