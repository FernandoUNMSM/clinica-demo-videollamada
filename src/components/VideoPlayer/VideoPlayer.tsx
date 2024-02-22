import { useRef } from 'react';
import { MicrophoneOffIcon, UserCameraOn } from './styles';
import { BiSolidMicrophoneOff } from 'react-icons/bi';
import { User } from '../../models/typeUser';

export const VideoPlayer = ({ user, par }: any) => {
	const ref = useRef<HTMLDivElement>(null);

	return (
		<>
			<UserCameraOn cameraoff={user.isCameraOff} microphoneoff={user.isMicrophoneOff} isspeaking={user.isSpeaking} par={par}>
				{!user.isMicrophoneOff ? (
					<div id={`indicador_${user.uid}`} className="audio-detection">
						<div className="bar"></div>
						<div className="bar"></div>
						<div className="bar"></div>
					</div>
				) : (
					<MicrophoneOffIcon>
						<BiSolidMicrophoneOff />
					</MicrophoneOffIcon>
				)}
				{user.isHost ? (
					<div ref={ref} id={`local`} className="w-full h-full]"></div>
				) : (
					<div ref={ref} id={`video_${user.uid}`} className="w-full h-full]"></div>
				)}
			</UserCameraOn>
		</>
	);
};
