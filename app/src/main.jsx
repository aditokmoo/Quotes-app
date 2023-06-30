import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext.jsx';
import App from './App.jsx';
import { AddQuote } from './pages/AddQuote.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Router>
			<AppContextProvider>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/add" element={<AddQuote />} />
				</Routes>
			</AppContextProvider>
		</Router>
	</React.StrictMode>
);
