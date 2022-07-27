<<<<<<< HEAD
import './App.css';
import Footer from './components/Footer';
import Router from './router';
import { ContextWrapper } from './helpers/context'

function App() {
  return (
    <ContextWrapper>
        <div className="App h-full">
          <Router />
          <br />
          <br />
          <Footer />
        </div>
    </ContextWrapper>
  );
}

export default App;
=======
import './App.css';
import Footer from './components/Footer';
import Router from './router';

function App() {
  return (
    <div className="App">
      <Router/>
      <br/>
      <br/>
      <Footer/>
    </div>
  );
}

export default App;
>>>>>>> bf61aabcddd8a645ab36c3c2b2c4c9124f2b0de5
