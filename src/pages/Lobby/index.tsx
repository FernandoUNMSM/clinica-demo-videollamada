import { useNavigate } from 'react-router-dom';
import { LobbyPage } from './styles';

export const Lobby = () => {
	const navigate = useNavigate();

	return (
		<LobbyPage>
			<div className="content">
				<div className="title">
					<h1>Video Call</h1>
					<p>Enter your name to join the meeting</p>
				</div>
				<input />
				{/* <PageModal closeModal={() => {}} isOpen={true} changeCamera={() => {}} /> */}
				<button onClick={() => navigate('/videoRoom')}>Join Room</button>
			</div>
		</LobbyPage>
	);
};
