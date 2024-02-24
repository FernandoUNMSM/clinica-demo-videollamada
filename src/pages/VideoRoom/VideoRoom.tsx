import { useContext, useEffect, useState } from 'react';
import { VideoRoomContainer } from './styles';

import PreferencesModal from '../../components/PreferencesModal/PreferencesModal';
import { GridCamerasOn } from '../../components/GridCamerasOn';
import AgoraContext from '../../context/agoraContext';
import { ControlButtons } from '../../components/ControlButtons/ControlButton';

export const VideoRoom = () => {
	const { users, leaveRoom } = useContext(AgoraContext);

	const [modal, setModal] = useState<boolean>(false);

	useEffect(() => {
		return () => {
			leaveRoom()
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
