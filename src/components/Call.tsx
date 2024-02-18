import { useRef } from 'react';
import { MicrophoneOffIcon, UserCameraOn } from './styles';
import { BiSolidMicrophoneOff } from 'react-icons/bi';

interface User {
	isHost: boolean;
	isCameraOff: boolean;
	isMicrophoneOff: boolean;
  isSpeaking: boolean;
	uid: number;
}

export const VideoPlayer = ({ user }: { user: User }) => {
	const ref = useRef<HTMLDivElement>(null);

	return (
		<>
			<UserCameraOn cameraoff={user.isCameraOff} microphoneoff={user.isMicrophoneOff} isspeaking={user.isSpeaking}>
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
