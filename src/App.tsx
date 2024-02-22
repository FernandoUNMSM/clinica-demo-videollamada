import './App.css';
import { VideoRoom } from './pages/VideoRoom/VideoRoom';
import DevicesContext from './context/userContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Lobby } from './pages/Lobby';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/themes';
import { useContext } from 'react';

function App() {
	const { theme: themeColor } = useContext(DevicesContext);
	return (
		<ThemeProvider theme={theme[themeColor]}>
			<Routes>
				<Route path="/" element={<Navigate to="/lobby" />} />
				<Route path="/lobby" element={<Lobby />} />
				<Route path="/videoRoom" element={<VideoRoom />} />
			</Routes>
		</ThemeProvider>
	);
}

export default App;
