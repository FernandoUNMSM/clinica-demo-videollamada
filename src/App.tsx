import './App.css';
import { VideoRoom } from './pages/VideoRoom/VideoRoom';
import DevicesContext from './context/userContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Lobby } from './pages/Lobby';
import { ThemeProvider } from 'styled-components';
import { useContext } from 'react';
import { AgoraContextProvider } from './context/agoraContext';

function App() {
	const { themeSelected } = useContext(DevicesContext);
	return (
		<ThemeProvider theme={themeSelected}>
			<AgoraContextProvider>
				<Routes>
					<Route path="/" element={<Navigate to="/lobby" />} />
					<Route path="/lobby" element={<Lobby />} />
					<Route path="/videoRoom" element={<VideoRoom />} />
				</Routes>
			</AgoraContextProvider>
		</ThemeProvider>
	);
}

export default App;
