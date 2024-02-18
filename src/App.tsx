import { useState } from 'react';
import './App.css';
import { VideoRoom } from './components/VideoRoom';
import PageModal from './components/PreferencesModal/PreferencesModal';

function App() {
	const [joined, setJoined] = useState(false);

  return (
		<div className="App h-full">
			<PageModal closeModal={() => {}} isOpen={true} />
			{!joined && <button onClick={() => setJoined(true)}>Join Room</button>}
			{joined && (
        <div className="bg-gradient-to-b from-[#0496c1] to-[#0065ab] h-full">
					<VideoRoom />
        </div>
			)}
		</div>
	);
}

export default App;
