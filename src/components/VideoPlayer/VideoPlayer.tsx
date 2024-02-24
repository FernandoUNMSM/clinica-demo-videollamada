import { useRef } from 'react';
import { MicrophoneOffIcon, UserCameraOn } from './styles';
import { BiSolidMicrophoneOff } from 'react-icons/bi';
import { User } from '../../models/typeUser';

export const VideoPlayer = ({ user }: { user: User }) => {
	const ref = useRef<HTMLDivElement>(null);

	return (
		<>
			<UserCameraOn microphoneoff={false} isspeaking={user.isSpeaking}>
				{user.isMicrophoneOn ? (
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
				<div ref={ref} id={`videoplayer_${user.uid}`} className="videoPlayer"></div>
			</UserCameraOn>
		</>
	);
};
