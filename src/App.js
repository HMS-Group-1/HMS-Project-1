import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
      <Home/>
      <Menu/>
      <Footer/>
      </Router> 
    </div>
  );
}

export default App;
