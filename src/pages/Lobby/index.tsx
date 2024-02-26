import { useNavigate } from 'react-router-dom';
import { JoinButton, LobbyPage } from './styles';
import { FormEvent, useContext, useState } from 'react';
import AgoraContext from '../../context/agoraContext';
import SpinLoader from '../../components/spinLoader';

export const Lobby = () => {
	const navigate = useNavigate();
	const { enterRoom } = useContext(AgoraContext);
	const [username, setUsername] = useState<string>('');
	const [charging, setCharging] = useState<boolean>(false);

	const callEnterRoom = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then(async function () {
				setCharging(true);
				const connected = await enterRoom(username.trimEnd());
				if (connected) {
					navigate('/videoRoom');
				}
			})
			.catch(function (err) {
				console.log(err);
			})
			.finally(() => {
				setCharging(false);
			});
	};

	return (
		<LobbyPage>
			<div className="content">
				<div className="title">
					<h1>Video Call - Demo Clínica Internacional</h1>
					<p>Enter your name to join the meeting</p>
				</div>
				<form onSubmit={callEnterRoom}>
					<input type="text" value={username} onChange={(e) => setUsername(e.target.value.trimStart())} maxLength={40} required disabled={charging}/>
					<JoinButton charging={charging}>
						<p>Join Room</p>
						{charging && <SpinLoader />}
					</JoinButton>
				</form>
			</div>
		</LobbyPage>
	);
};
