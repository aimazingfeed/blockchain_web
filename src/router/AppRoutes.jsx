import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePageHandler from '../pages/HomePageHandler';
import AppBarComponent from '../components/AppBar/';
import LotsPageHandler from '../pages/Lots';

const AppRoutes = () => {
    return(
    <Router>
        <AppBarComponent/>
        <Routes>
            <Route exact path="/" element={<HomePageHandler/>}/>
            <Route exact path="/map"/>
            <Route exact path="/lots" element={<LotsPageHandler/>}/>
            <Route exact path="/terms"/>
            <Route exact path="/contacts"/>
            <Route exact path="/login"/>
            <Route exact path="/admin"/>
        </Routes>
    </Router>
    );
}

export default AppRoutes;
