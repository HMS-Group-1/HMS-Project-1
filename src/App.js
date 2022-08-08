
import './App.css';
import Router from './router';
import { ContextWrapper } from './helpers/context';

function App() {
	return (
		<ContextWrapper>
			<div className="App h-full relative">
				<Router />
			</div>
		</ContextWrapper>
	);
}

export default App;
