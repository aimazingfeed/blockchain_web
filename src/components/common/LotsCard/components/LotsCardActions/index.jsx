import React from 'react'
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const useStyles = makeStyles(() => ({
    success: {
        '&.Mui-disabled': {
        color: 'red',
        opacity: 0.5,
    },
    '&.Mui-disabled:hover': {
        color: '#e8e6e3'
    },
    color: 'green'
    },
    error: {

    }
    
}));
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const LotsCardActions = ({ address, hasEnded, isAuction, rentStatus, monthlyPrice, tenant, sign, claim, isConnected, isOccupied}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
                            <Button size="medium" className={classes.success} onClick={claim} >
                                Подтвердить аренду
                            </Button> 
                        ) : (
                            <Button size="medium" className={classes.success} disabled>
                                Аукцион завершён
                            </Button>
                        )
                    )
                    
                ) 
                
            }
            {
                !isAuction && (
                    (isOccupied ? (
                        tenant === address ? (
                            <div>
                                <Button size="medium" className={classes.success} onClick={handleOpen}>
                                    Лот приобретён
                                </Button>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                    >
                                    <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Text in a modal
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                    </Typography>
                                    </Box>
                                </Modal>
                            </div>
                            
                        ) : (
                            <Button size="medium" color="error" className={classes.success} disabled>
                                {rentStatus}
                            </Button>
                        )
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