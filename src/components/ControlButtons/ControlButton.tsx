import { BiSolidCamera, BiSolidCameraOff, BiSolidMicrophone, BiSolidMicrophoneOff } from 'react-icons/bi';
import { CircleButton, ControlButtonsContainer, LeaveButton } from './styles';
import { ImPhoneHangUp } from 'react-icons/im';
import { FaGear } from 'react-icons/fa6';
import { Dispatch, SetStateAction, useContext } from 'react';
import AgoraContext from '../../context/agoraContext';

interface Props {
	setModal: Dispatch<SetStateAction<boolean>>
}

export const ControlButtons = ({ setModal }: Props) => {
	const {
		localTracks,
		client,
		micMuted,
		setMicMuted,
		cameraOff,
		setCameraOff,
		leaveRoom,
	} = useContext(AgoraContext);


	const toggleMic = async () => {
		if (micMuted) {
			setMicMuted(false);
		} else {
			setMicMuted(true);
		}
		localTracks.localAudioTrack.setMuted(!micMuted);
		client.publish(localTracks.localAudioTrack);
	};

	const toggleCamera = async () => {
		if (cameraOff) {
			setCameraOff(false);
			localTracks.localVideoTrack.play('local');
		} else {
			setCameraOff(true);
			localTracks.localVideoTrack.stop();
		}

		localTracks.localVideoTrack.setMuted(!cameraOff);
		client.publish(localTracks.localVideoTrack);
	};

	return (
		<>
			<div className="controlButtonsContainer">
				<ControlButtonsContainer>
					<CircleButton onClick={toggleMic} deviceOff={micMuted}>
						{micMuted ? <BiSolidMicrophoneOff /> : <BiSolidMicrophone />}
					</CircleButton>
					<CircleButton onClick={toggleCamera} deviceOff={cameraOff}>
						{cameraOff ? <BiSolidCameraOff /> : <BiSolidCamera />}
					</CircleButton>
					<LeaveButton onClick={leaveRoom}>
						<ImPhoneHangUp />
					</LeaveButton>
					<CircleButton onClick={() => setModal(true)}>
						<FaGear />
					</CircleButton>
				</ControlButtonsContainer>
			</div>
		</>
	);
};
