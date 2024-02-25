import { BiSolidCamera, BiSolidCameraOff, BiSolidMicrophone, BiSolidMicrophoneOff } from 'react-icons/bi';
import { CircleButton, ControlButtonsContainer, LeaveButton } from './styles';
import { ImPhoneHangUp } from 'react-icons/im';
import { FaGear } from 'react-icons/fa6';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import AgoraContext from '../../context/agoraContext';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { CameraVideoTrackInitConfig } from 'agora-rtc-react';

interface Props {
	setModal: Dispatch<SetStateAction<boolean>>;
}

export const ControlButtons = ({ setModal }: Props) => {
	const { localTracks, client, micMuted, cameraOff, setCameraOff, leaveRoom, UID, toggleMic, camera } = useContext(AgoraContext);
	const [disabled, setDisabled] = useState(false)

	const toggleCamera = async () => {
		setDisabled(true)
		if (cameraOff) {
			setCameraOff(false);

			const config: CameraVideoTrackInitConfig  = {
				encoderConfig: { width: { max: 1280, min: 720 }, height: { max: 1280, min: 720 } },
			};

			if (camera) {
				config.cameraId = camera.deviceId;
			}

			localTracks.localVideoTrack = await AgoraRTC.createCameraVideoTrack(config);

			const videoPlayerElement = document.getElementById(`videoplayer_${UID}`);

			localTracks.localVideoTrack.play(videoPlayerElement);
			client.publish(localTracks.localVideoTrack);
		} else {
			setCameraOff(true);

			localTracks.localVideoTrack.stop();
			localTracks.localVideoTrack.close();
			client.unpublish([localTracks.localVideoTrack]);
		}

		// localTracks.localVideoTrack.setMuted(!cameraOff);
		setDisabled(false)
	};

	return (
		<>
			<div className="controlButtonsContainer">
				<ControlButtonsContainer>
					<CircleButton onClick={toggleMic} deviceOff={micMuted}>
						{micMuted ? <BiSolidMicrophoneOff /> : <BiSolidMicrophone />}
					</CircleButton>
					<CircleButton onClick={toggleCamera} deviceOff={cameraOff} disabled={disabled}>
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
