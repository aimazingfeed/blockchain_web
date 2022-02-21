import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePageHandler from '../pages/HomePageHandler';
import AppBarComponent from '../components/main/AppBar/';
import Lots from '../components/main/Lots';

const AppRoutes = () => {
    return(
    <Router>
        <AppBarComponent/>
        <Routes>
            <Route exact path="/" element={<HomePageHandler/>}/>
            <Route exact path="/map"/>
            ({window.ethereum ? (<Route exact path="/lots" element={<Lots/>}/>)
            : null }) 
            <Route exact path="/terms"/>
            <Route exact path="/contacts"/>
            <Route exact path="/login"/>
            <Route exact path="/admin"/>
            <Route path="*" element={<HomePageHandler/>}/>
        </Routes>
    </Router>
    );
}

export default AppRoutes;
