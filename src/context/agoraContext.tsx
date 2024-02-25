import AgoraRTC, { IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng';
import { createContext, useState } from 'react';
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
	localAudioTrack: null
};

let rtmClient: RtmClient;
let channel: RtmChannel;

const UID = Math.floor(Math.random() * 2032);

export function AgoraContextProvider({ children }: { children: React.ReactNode }) {
	const [users, setUsers] = useState<User[]>([]);
	const [micMuted, setMicMuted] = useState(true);
	const [cameraOff, setCameraOff] = useState(true);
	const [camera, setCamera] = useState<MediaDeviceInfo | null>(null);
	const [microphone, setMicrophone] = useState({});

	const navigate = useNavigate();

	const initRtm = async (name: string) => {
		rtmClient = AgoraRTM.createInstance(VITE_AGORA_APP_ID);

		await rtmClient.login({ uid: String(UID) });

		rtmClient.addOrUpdateLocalUserAttributes({ name: name });

		channel = rtmClient.createChannel(VITE_AGORA_CHANNEL);
		await channel.join();

		await getChannelMembers();

		channel.on('MemberJoined', handleMemberJoined);
		channel.on('MemberLeft', handleMemberLeft);

		window.addEventListener('beforeunload', leaveRoom);
	};

	const enterRoom = async (name: string) => {
		await initRtm(name);
		await initRtc();

		return true;
	};

	const leaveRtmChannel = async () => {
		await channel.leave();
		await rtmClient.logout();
	};

	const handleMemberJoined = async (MemberId: string) => {
		console.log('handleMemberJoined');
		const { name } = await rtmClient.getUserAttributesByKeys(MemberId, ['name']);

		setUsers((prev) =>
			prev.concat({
				uid: MemberId,
				name,
				isSpeaking: false,
				isMicrophoneOn: false,
			})
		);
	};

	const handleMemberLeft = async (MemberId: string) => {
		console.log('handleUserLeft');
		setUsers((previousUsers) => {
			return previousUsers.filter((u) => u.uid != MemberId);
		});
	};

	const initVolumeIndicator = async () => {
		client.enableAudioVolumeIndicator();

		client.on('volume-indicator', (volumes) => {
			volumes.forEach((volume) => {
				try {
					const item = document.getElementById(`indicador_${volume.uid}`);
					if (volume.level >= 20) {
						item?.classList.add('on');
					} else {
						item?.classList.remove('on');
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

		members.forEach(async (member: string) => {
			const { name } = await rtmClient.getUserAttributesByKeys(member, ['name']);
			setUsers((prev) =>
				prev.concat({
					uid: member,
					name,
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
			setTimeout(() => {
				const videoPlayerElement: HTMLElement = document.getElementById(`videoplayer_${user.uid}`) || new HTMLElement();
				console.log({ user, videoPlayerElement });
				user.videoTrack?.play(videoPlayerElement);
			}, 1500);
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

		await client.publish(localTracks.localAudioTrack);

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

	const changeMicrophone = async (deviceId: string) => {
		localTracks.localAudioTrack.stop();
		localTracks.localAudioTrack.close();

		client.unpublish([localTracks.localAudioTrack]);

		localTracks.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack({
			microphoneId: deviceId,
		});

		if (!micMuted) {
			localTracks.localAudioTrack.setMuted(false);
		}

		client.publish([localTracks.localAudioTrack]);
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

		setUsers([]);
		setMicMuted(true);
		setCameraOff(true);
		setCamera(null);
		setMicrophone({});
		await leaveRtmChannel();

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
				client,
				localTracks,
				rtmClient,
				cameraOff,
				setCameraOff,
				micMuted,
				camera,
				setCamera,
				microphone,
				setMicrophone,
				leaveRoom,
				changeCamera,
				changeMicrophone,
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
