import { useContext, useEffect, useState } from 'react';
import { VideoRoomContainer } from './styles';

import PreferencesModal from '../../components/PreferencesModal/PreferencesModal';
import { GridCamerasOn } from '../../components/GridCamerasOn';
import AgoraContext from '../../context/agoraContext';
import { ControlButtons } from '../../components/ControlButtons/ControlButton';
import { User } from '../../models/typeUser';

export const VideoRoom = () => {
	const { users, setUsers, micMuted, camera, leaveRoom, changeCamera } = useContext(AgoraContext);

	useEffect(() => {
		if (camera) {
			changeCamera(camera.deviceId);
		}
	}, [camera]);

	useEffect(() => {
		return () => {
			leaveRoom()
		}
	}, []);

	useEffect(() => {
		setUsers((previousUsers : User[]) =>
			previousUsers.map((u) => {
				if (u.isHost) {
					u.isMicrophoneOff = micMuted;
				}
				return u;
			})
		);
	}, [micMuted]);


	const [modal, setModal] = useState<boolean>(false);

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
