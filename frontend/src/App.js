import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import SearchPage from './SearchPage.js';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './iTunesStyles.css';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route exact={true} path="/" component={SearchPage} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
