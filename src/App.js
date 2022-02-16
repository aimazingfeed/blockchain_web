import './App.css';
import AppBarComponent from './components/AppBar/AppBarComponent';
import AppRoutes from './router/AppRoutes';

function App() {
  return (
    <div className="App">
      <AppRoutes>
        <AppBarComponent/>
      </AppRoutes>
    </div>
  );
}

export default App;
