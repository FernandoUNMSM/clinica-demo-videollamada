import { useNavigate } from 'react-router-dom';
import { LobbyPage } from './styles';
import { useContext } from 'react';
import AgoraContext from '../../context/agoraContext';

export const Lobby = () => {
	const navigate = useNavigate();
	const { initRtc, enterRoom } = useContext(AgoraContext);

	const enterRoom2 = async () =>{
		const connected = await enterRoom()
		if(connected){
			navigate('/videoRoom')
		}
	}

	return (
		<LobbyPage>
			<div className="content">
				<div className="title">
					<h1>Video Call</h1>
					<p>Enter your name to join the meeting</p>
				</div>
				<input />
				<button onClick={enterRoom2}>Join Room</button>
			</div>
		</LobbyPage>
	);
};
