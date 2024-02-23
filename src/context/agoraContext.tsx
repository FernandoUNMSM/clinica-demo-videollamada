import AgoraRTC from 'agora-rtc-sdk-ng';
import { createContext, useState } from 'react';
import { User } from '../models/typeUser';
import { useNavigate } from 'react-router-dom';
// import { ILocalAudioTrack, ILocalVideoTrack } from 'agora-rtc-react';

const AgoraContext = createContext<any>({});

const { VITE_AGORA_APP_ID, VITE_AGORA_CHANNEL, VITE_AGORA_TOKEN } = import.meta.env;

const client = AgoraRTC.createClient({
	mode: 'rtc',
	codec: 'vp8',
});

// interface Tracks {
// 	localVideoTrack: ILocalVideoTrack | null,
// 	localAudioTrack: ILocalAudioTrack | null
// }

const localTracks: any = {
	localVideoTrack: null,
	localAudioTrack: null,
};

export function AgoraContextProvider({ children }: any) {
	const [users, setUsers] = useState<User[]>([]);
	const [micMuted, setMicMuted] = useState(true);
	const [cameraOff, setCameraOff] = useState(true);
	const [camera, setCamera] = useState({});
	const [microphone, setMicrophone] = useState(true);

	const navigate = useNavigate();

	const initVolumeIndicator = async () => {
		AgoraRTC.setParameter('AUDIO_VOLUME_INDICATION_INTERVAL', 2000);
		client.enableAudioVolumeIndicator();

		client.on('volume-indicator', (volumes) => {
			volumes.forEach((volume) => {
				try {
					const item = document.getElementById(`indicador_${volume.uid}`);
					if (volume.level >= 20) {
						item?.classList.add('on');
						changeUsers(volume, true, 'isSpeaking');
					} else {
						item?.classList.remove('on');
						changeUsers(volume, false, 'isSpeaking');
					}
				} catch (error) {
					console.error(error);
				}
			});
		});
	};

	const handleUserJoined = async (user: User) => {
		console.log({userJoined: user})
		setUsers((previousUsers: User[]) => [
			...previousUsers,
			{
				uid: user.uid,
				isHost: false,
				isCameraOff: true,
				isSpeaking: false,
				isMicrophoneOff: true,
				videoTrack: user.videoTrack,
				audioTrack: user.audioTrack,
			},
		]);
	};

	const handleUserPublished = async (user, mediaType) => {
		await client.subscribe(user, mediaType);
		console.log({ user });
		if (mediaType === 'video') {
			const element = document.getElementById(`video_${user.uid}`);
			user.videoTrack.play(element);
			changeUsers(user, user['_video_muted_'], 'isCameraOff');
		}

		if (mediaType === 'audio') {
			changeUsers(user, user['_audio_muted_'], 'isMicrophoneOff');
			user.audioTrack.play();
		}
	};

	const handleUserUnPublished = async (user, mediaType) => {
		if (mediaType === 'video') {
			changeUsers(user, true, 'isCameraOff');
		}
		if (mediaType === 'audio') {
			changeUsers(user, user['_audio_muted_'], 'isMicrophoneOff');
		}
	};

	const changeUsers = (item: any, value: string | number | boolean, keyword: string) => {
		setUsers((previousUsers) =>
			previousUsers.map((u: User) => {
				if (u.uid === item.uid) {
					u[keyword] = value;
				}
				return u;
			})
		);
	};

	const handleUserLeft = async (user) => {
		console.log('handleUserLeft');
		console.log({ aa: users.filter((u) => u.uid != user.uid) });
		setUsers((previousUsers) => previousUsers.filter((u) => u.uid != user.uid));
	};

	const initRtc = async () => {
		client.on('user-joined', handleUserJoined);
		client.on('user-published', handleUserPublished);
		client.on('user-unpublished', handleUserUnPublished);
		client.on('user-left', handleUserLeft);

		const uid = await client.join(VITE_AGORA_APP_ID, VITE_AGORA_CHANNEL, VITE_AGORA_TOKEN, null);

		localTracks.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
		localTracks.localAudioTrack.setMuted(micMuted);

		localTracks.localVideoTrack = await AgoraRTC.createCameraVideoTrack({
			cameraId: 'dea45e4e8b3cb9ff205404bb12efed5f84dfd481103585483fdd9f53bb37417b',
			encoderConfig: { width: { max: 1280, min: 720 }, height: { max: 1280, min: 720 } },
		});
		localTracks.localVideoTrack.setMuted(cameraOff);

		setUsers((previousUsers: User[]) => [
			...previousUsers,
			{
				uid,
				isHost: true,
				isMicrophoneOff: true,
				isCameraOff: false,
				isSpeaking: false,
				videoTrack: localTracks.localVideoTrack,
				audioTrack: localTracks.localAudioTrack,
			},
		]);
		client.publish([localTracks.localAudioTrack, localTracks.localVideoTrack]);

		initVolumeIndicator();
		return true;
	};

	const changeCamera = async (deviceId: string) => {
		localTracks.localVideoTrack.stop();
		localTracks.localVideoTrack.close();
		client.unpublish([localTracks.localVideoTrack]);

		localTracks.localVideoTrack = await AgoraRTC.createCameraVideoTrack({
			cameraId: deviceId,
			encoderConfig: { width: { max: 1280, min: 720 }, height: { max: 1280, min: 720 } },
		});
		if (!cameraOff) {
			localTracks.localVideoTrack.play('local');
		}
		client.publish([localTracks.localVideoTrack]);

		setUsers((previousUsers) =>
			previousUsers.map((u) => {
				if (u.isHost) {
					u.videoTrack = localTracks.localVideoTrack;
				}
				return u;
			})
		);
	};

	const leaveRoom = async () => {
		if (localTracks.localVideoTrack || localTracks.localAudioTrack) {
			localTracks.localAudioTrack.stop();
			localTracks.localAudioTrack.close();
			localTracks.localVideoTrack.stop();
			localTracks.localVideoTrack.close();
		}
		setUsers((previousUsers) => previousUsers.filter((u) => !u.isHost));
		client.unpublish([localTracks.localAudioTrack, localTracks.localVideoTrack]);
		client.leave();
		navigate('/lobby');
	};

	return (
		<AgoraContext.Provider
			value={{
				users,
				setUsers,
				client,
				initRtc,
				localTracks,
				// setLocalTracks,
				cameraOff,
				setCameraOff,
				micMuted,
				setMicMuted,
				camera,
				setCamera,
				microphone,
				setMicrophone,
				leaveRoom,
				changeCamera,
			}}
		>
			{children}
		</AgoraContext.Provider>
	);
}

export default AgoraContext;
