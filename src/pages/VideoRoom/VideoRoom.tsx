import { useContext, useEffect, useState } from 'react';
import { VideoRoomContainer } from './styles';

import PreferencesModal from '../../components/PreferencesModal/PreferencesModal';
import { GridCamerasOn } from '../../components/GridCamerasOn';
import AgoraContext from '../../context/agoraContext';
import { ControlButtons } from '../../components/ControlButtons/ControlButton';
import { useNavigate } from 'react-router-dom';

export const VideoRoom = () => {
	const { users, rtmClient } = useContext(AgoraContext);

	const [modal, setModal] = useState<boolean>(false);

	const navigate = useNavigate();
	useEffect(() => {
		if(!rtmClient) {
			navigate('/lobby');
		}
	}, []);


	return (
		<>
			{modal && <PreferencesModal closeModal={() => setModal(false)} isOpen={modal} />}
				<VideoRoomContainer>
					<GridCamerasOn users={users} />
					<ControlButtons setModal={setModal}/>
				</VideoRoomContainer>
		</>
	);
};
