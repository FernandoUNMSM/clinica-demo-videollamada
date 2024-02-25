// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { ThemeControlContextProvider } from './context/themeContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	// <React.StrictMode>
		<ThemeControlContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ThemeControlContextProvider>
	// </React.StrictMode>
);
