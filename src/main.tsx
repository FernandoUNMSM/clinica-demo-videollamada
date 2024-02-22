import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { DevicesContextProvider } from './context/userContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	// <React.StrictMode>
	<DevicesContextProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</DevicesContextProvider>
	// </React.StrictMode>
);
