import AgoraRTC, { IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng';
import { createContext, useEffect, useState } from 'react';
import { User } from '../models/typeUser';
import { useNavigate } from 'react-router-dom';
import AgoraRTM, { RtmChannel, RtmClient } from 'agora-rtm-react';

const AgoraContext = createContext<any>({});

const { VITE_AGORA_APP_ID, VITE_AGORA_CHANNEL } = import.meta.env;

const client = AgoraRTC.createClient({
	mode: 'rtc',
	codec: 'vp8',
});

let localTracks: any = {
	localVideoTrack: null,
	localAudioTrack: null,
	remoteVideoTracks: {},
	remoteAudioTracks: {},
};

let rtmClient: RtmClient;
let channel: RtmChannel;

const UID = Math.floor(Math.random() * 2032);

export function AgoraContextProvider({ children }: any) {
	const [users, setUsers] = useState<User[]>([]);
	const [micMuted, setMicMuted] = useState(true);
	const [cameraOff, setCameraOff] = useState(true);
	const [camera, setCamera] = useState({});
	const [microphone, setMicrophone] = useState(true);

	const navigate = useNavigate();

	const initRtm = async () => {
		rtmClient = AgoraRTM.createInstance(VITE_AGORA_APP_ID);

		await rtmClient.login({ uid: String(UID) });

		channel = rtmClient.createChannel(VITE_AGORA_CHANNEL);
		await channel.join();

		await getChannelMembers();

		channel.on('MemberJoined', handleMemberJoined);
		channel.on('MemberLeft', handleMemberLeft);

		window.addEventListener('beforeunload', leaveRtmChannel);
	};

	const enterRoom = async () => {
		initRtc();

		// let displayName = '';
		initRtm();
		return true;
	};

	const leaveRtmChannel = async () => {
		await channel.leave();
		await rtmClient.logout();
	};

	const handleMemberJoined = async (MemberId: string) => {
		console.log('handleMemberJoined');

		setUsers((prev) =>
			prev.concat({
				uid: MemberId,
				isSpeaking: false,
				isMicrophoneOn: false,
			})
		);
	};

	useEffect(() => {
		console.log({ users });
	}, [users]);

	const handleMemberLeft = async (MemberId: string) => {
		console.log('handleUserLeft');
		setUsers((previousUsers) => {
			console.log({ previousUsers });
			return previousUsers.filter((u) => u.uid != MemberId);
		});
	};

	const initVolumeIndicator = async () => {
		AgoraRTC.setParameter('AUDIO_VOLUME_INDICATION_INTERVAL', 2000);
		client.enableAudioVolumeIndicator();

		client.on('volume-indicator', (volumes) => {
			volumes.forEach((volume) => {
				try {
					const item = document.getElementById(`indicador_${volume.uid}`);
					if (volume.level >= 20) {
						item?.classList.add('on');
						// changeUsers(volume, true, 'isSpeaking');
					} else {
						item?.classList.remove('on');
						// changeUsers(volume, false, 'isSpeaking');
					}
				} catch (error) {
					console.error(error);
				}
			});
		});
	};

	const getChannelMembers = async () => {
		console.log('getChannelMembers');
		const members = await channel.getMembers();

		members.forEach((member: string) => {
			setUsers((prev) =>
				prev.concat({
					uid: member,
					isSpeaking: false,
					isMicrophoneOn: false,
				})
			);
		});
	};

	const handleUserPublished = async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
		console.log('handleUserPublished');

		await client.subscribe(user, mediaType);

		if (mediaType === 'video') {
			const videoPlayerElement: HTMLElement = document.getElementById(`videoplayer_${user.uid}`) || new HTMLElement();
			user.videoTrack?.play(videoPlayerElement);
		}

		if (mediaType === 'audio') {
			changeUsers(user.uid, true);
			user.audioTrack?.play();
		}
	};

	const handleUserUnPublished = async (user: IAgoraRTCRemoteUser, mediaType: string) => {
		console.log('handleUserUnPublished');
		if (mediaType === 'audio') {
			changeUsers(user.uid, false);
		}
	};

	const changeUsers = async (compareTo: string | number, value: boolean) => {
		setUsers((previousUsers) =>
			previousUsers.map((u: User) => {
				if (u.uid == compareTo) {
					u.isMicrophoneOn = value;
				}
				return u;
			})
		);
	};

	const handleUserLeft = async (user: IAgoraRTCRemoteUser) => {
		console.log('handleUserLeft');
		setUsers((previousUsers) => previousUsers.filter((u) => u.uid != user.uid));
	};

	const initRtc = async () => {
		client.on('user-published', handleUserPublished);
		client.on('user-unpublished', handleUserUnPublished);
		client.on('user-left', handleUserLeft);

		await client.join(VITE_AGORA_APP_ID, VITE_AGORA_CHANNEL, null, UID);

		localTracks.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
		localTracks.localAudioTrack.setMuted(micMuted);

		localTracks.localVideoTrack = await AgoraRTC.createCameraVideoTrack({
			cameraId: 'dea45e4e8b3cb9ff205404bb12efed5f84dfd481103585483fdd9f53bb37417b',
			encoderConfig: { width: { max: 1280, min: 720 }, height: { max: 1280, min: 720 } },
		});
		localTracks.localVideoTrack.setMuted(cameraOff);

		await client.publish([localTracks.localAudioTrack, localTracks.localVideoTrack]);

		initVolumeIndicator();
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
			const videoPlayerElement = document.getElementById(`videoplayer_${UID}`);
			localTracks.localVideoTrack.play(videoPlayerElement);
		}

		client.publish([localTracks.localVideoTrack]);
	};

	const leaveRoom = async () => {
		if (localTracks.localVideoTrack || localTracks.localAudioTrack) {
			localTracks.localAudioTrack.stop();
			localTracks.localAudioTrack.close();
			localTracks.localVideoTrack.stop();
			localTracks.localVideoTrack.close();
		}

		client.unpublish([localTracks.localAudioTrack, localTracks.localVideoTrack]);
		client.leave();

		leaveRtmChannel();
		navigate('/lobby');
	};

	const toggleMic = async () => {
		changeUsers(UID, micMuted);
		setMicMuted(!micMuted);

		localTracks.localAudioTrack.setMuted(!micMuted);
		client.publish(localTracks.localAudioTrack);
	};

	return (
		<AgoraContext.Provider
			value={{
				users,
				setUsers,
				client,
				initRtc,
				localTracks,
				cameraOff,
				setCameraOff,
				micMuted,
				camera,
				setCamera,
				microphone,
				setMicrophone,
				leaveRoom,
				changeCamera,
				enterRoom,
				UID,
				toggleMic,
			}}
		>
			{children}
		</AgoraContext.Provider>
	);
}

export default AgoraContext;
