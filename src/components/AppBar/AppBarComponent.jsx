import * as React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Material-Ui
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Typography, ListItem, AppBar } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import { LocalPhone, Forum, FilterNone } from '@material-ui/icons';

// Routing & Components
import HomePageHandler from '../../pages/HomePageHandler';

const useStyles = makeStyles((theme) => ({
  root: {
      display: 'flex',
  },
  appHeader: {
      display: 'flex',
      backgroundColor: '#282c34',
      minHeight: '100vh',
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
  return(
    // <Router>
        <AppBar className="appBar" classes={classes.appHeader}>
            <Toolbar className="toolBar">
                <Link to="/">
                    {/* <img src={Logo} alt="Logo" className="logo"/> */}LOGO
                </Link>
                <div className={classes.navBar}>
                    <Link to="/">
                        <ListItem button key="Home page" className={classes.zxc}>
                            <ListItemIcon > <HomeIcon style={{color: "#9e9689"}}/> </ListItemIcon>
                                <Typography style={{color: "#e8e6e3"}}> <a> Домой </a> </Typography>
                        </ListItem>
                    </Link>
                    <Link to="/lots">
                        <ListItem button key="Lots">
                            <ListItemIcon> <FilterNone style={{color: "#9e9689"}}/> </ListItemIcon>
                            <Typography style={{color: "#e8e6e3"}}> <a> Лоты </a></Typography>
                        </ListItem>
                    </Link>
                    <Link to="/terms">
                    <ListItem button key="Terms">
                        <ListItemIcon> <Forum style={{color: "#9e9689"}}/> </ListItemIcon>
                            <Typography style={{color: "#e8e6e3"}}> <a> Условия</a> </Typography>
                    </ListItem>
                    </Link>
                    <Link to="/contacts">
                        <ListItem button key="Contact us">
                            <ListItemIcon> <LocalPhone style={{color: "#9e9689"}}/> </ListItemIcon>
                                <Typography style={{color: "#e8e6e3"}}> <a> Контакты </a></Typography>
                        </ListItem>
                    </Link>
                </div>
                <a>abc</a>
                {/* <ConnectButton/>{message ? (<p><code>{message}</code></p>) : null} */}
            </Toolbar>
        </AppBar>
    //     <Routes>
    //         <Route exact path="/" element={<HomePageHandler/>}/>
    //         <Route exact path="/map"/>
    //         <Route exact path="/lots"/>
    //         <Route exact path="/terms"/>
    //         <Route exact path="/contacts"/>
    //         <Route exact path="/login"/>
    //         <Route exact path="/admin"/>
    //     </Routes>
    // </Router>
        
  );
}

export default AppBarComponent;
