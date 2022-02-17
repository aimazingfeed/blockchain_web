import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';

// Material-Ui
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Typography, ListItem, AppBar } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import { LocalPhone, Forum, FilterNone } from '@material-ui/icons';

// Routing & Components
import LoginButton from '../Login';
import { useDispatch } from 'react-redux';
import { setUserIsConnected, setUserAddress, setUserBalance } from '../../redux/store/userData/userDataSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#161b22'
  },
  appHeader: {
    display: 'flex',
    backgroundColor: '#3f51b5',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '4rem'

  },
  navBar: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  }
}));

const AppBarComponent = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isConnected, setIsConnected] = useState(false);
    const [address, setAddress] = useState(null);
    const [balance, setBalance] = useState(0);
    const onLogin = async (provider) => {
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
          console.log("Please connect to MetaMask!");
      } else if (accounts[0] !== address) {
        setAddress(accounts[0]);
          const accBalanceEth = web3.utils.fromWei(
          await web3.eth.getBalance(accounts[0]),
          "ether"
      );
  
      setBalance(Number(accBalanceEth).toFixed(6));
      setIsConnected(true);
      }
  };
    useEffect(() => {
      dispatch(setUserAddress(address));
      dispatch(setUserBalance(balance));
      dispatch(setUserIsConnected(isConnected));
    }
    , [isConnected, address, balance]); // eslint-disable-line react-hooks/exhaustive-deps
  const onLogout = () => {
      setIsConnected(false);
  };
    return(
        <AppBar className={classes.root} position="relative">
            <Toolbar>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    {/* <img src={Logo} alt="Logo" className="logo"/> */}LOGO
                </Link>
                <div className={classes.navBar}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <ListItem button key="Home page">
                            <ListItemIcon > <HomeIcon style={{color: "#9e9689"}}/> </ListItemIcon>
                                <Typography style={{color: "#e8e6e3"}}>  Домой  </Typography>
                        </ListItem>
                    </Link>
                    <Link to="/lots" style={{ textDecoration: 'none' }}>
                        <ListItem button key="Lots">
                            <ListItemIcon> <FilterNone style={{color: "#9e9689"}}/> </ListItemIcon>
                            <Typography style={{color: "#e8e6e3"}}>  Лоты </Typography>
                        </ListItem>
                    </Link>
                    <Link to="/terms" style={{ textDecoration: 'none' }}>
                    <ListItem button key="Terms">
                        <ListItemIcon> <Forum style={{color: "#9e9689"}}/> </ListItemIcon>
                            <Typography style={{color: "#e8e6e3"}}> Условия </Typography>
                    </ListItem>
                    </Link>
                    <Link to="/contacts" style={{ textDecoration: 'none' }}>
                        <ListItem button key="Contact us">
                            <ListItemIcon> <LocalPhone style={{color: "#9e9689"}}/> </ListItemIcon>
                                <Typography style={{color: "#e8e6e3"}}>  Контакты </Typography>
                        </ListItem>
                    </Link>
                </div>
                {!isConnected && <LoginButton onLogin={onLogin} onLogout={onLogout} />}
                {isConnected && (
                  <div style={{ width: '6.3625rem', overflow: 'hidden' }}> {address} </div>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default AppBarComponent;
