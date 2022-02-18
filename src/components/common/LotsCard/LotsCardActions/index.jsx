import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';



const LotsCardActions = ({ address, hasEnded, isAuction, rentStatus, monthlyPrice, tenant, sign, claim}) => {
    return(
        <CardActions>
                <Button size="medium" color="primary" onClick={hasEnded ? ("") : (e => sign(e))}>
                    {isAuction ? 
                        (hasEnded ? "аукцион завершен" : `Предложить ${parseInt(monthlyPrice)/1e18} ETH`)  
                        : 
                        (rentStatus)
                    }
                </Button> 
                {
                    hasEnded ? (
                        tenant === address ? (
                            <Button size="medium" color="primary" onClick={e => claim(e)}>
                                Подтвердить аренду
                            </Button> 
                        ) : null
                    ) : null
                }
                
            </CardActions>
    )
}

export default LotsCardActions;