
import './App.css';
import Footer from './components/Footer';
import Router from './router';
import { ContextWrapper } from './helpers/context';

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
