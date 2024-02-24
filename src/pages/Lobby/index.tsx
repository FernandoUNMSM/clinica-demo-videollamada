import { useNavigate } from 'react-router-dom';
import { LobbyPage } from './styles';
import { useContext, useState } from 'react';
import AgoraContext from '../../context/agoraContext';

export const Lobby = () => {
	const navigate = useNavigate();
	const { enterRoom } = useContext(AgoraContext);
	const [username, setUsername] = useState<string>('');

	const callEnterRoom = async () => {
		await navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then(async function () {
				const connected = await enterRoom(username);
				if (connected) {
					console.log('asdasdas')
					navigate('/videoRoom');
				}
			})
			.catch(function (err) {
				console.log(err)
			});
	};

	return (
		<LobbyPage>
			<div className="content">
				<div className="title">
					<h1>Video Call</h1>
					<p>Enter your name to join the meeting</p>
				</div>
				<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
				<button onClick={callEnterRoom}>Join Room</button>
			</div>
		</LobbyPage>
	);
};
