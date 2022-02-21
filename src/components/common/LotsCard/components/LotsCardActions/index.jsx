import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    root: {
      '&.Mui-disabled': {
        color: '#e8e6e3',
        opacity: 0.5,
    },
    '&.Mui-disabled:hover': {
      color: '#e8e6e3'
    }
    }
  }));

const LotsCardActions = ({ address, hasEnded, isAuction, rentStatus, monthlyPrice, tenant, sign, claim, isConnected, isOccupied}) => {
    const classes = useStyles();
    return(
        <CardActions style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            color: 'white'
        }}>
            {
                isAuction && (
                    !hasEnded ? (
                        <Button size="medium" color="primary" onClick={sign}>    
                            {`Предложить ${parseInt(monthlyPrice)/1e18} ETH`}
                        </Button> 
                    ) : (
                        tenant === address ? (
                            <Button size="medium" color="primary" onClick={claim} >
                                Подтвердить аренду
                            </Button> 
                        ) : (
                            <Button size="medium" className={classes.root} disabled>
                                Аукцион завершён
                            </Button>
                        )
                    )
                    
                ) 
                
            }
            {
                !isAuction && (
                    (isOccupied ? (
                        <Button size="medium" className={classes.root} disabled>
                            {rentStatus}
                        </Button>
                    ) : (
                        <Button size="medium" color="primary" onClick={sign}>
                            {rentStatus}
                        </Button>
                    ))
                    
                )
            } 
        </CardActions>
    )
}

export default LotsCardActions;