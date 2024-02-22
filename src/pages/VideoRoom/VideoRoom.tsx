import { useContext, useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { FaGear } from 'react-icons/fa6';

import { ImPhoneHangUp } from 'react-icons/im';
import { BiSolidMicrophone, BiSolidMicrophoneOff, BiSolidCamera, BiSolidCameraOff } from 'react-icons/bi';
import { CircleButton, ControlButtonsContainer, LeaveButton, VideoRoomContainer } from './styles';

import PageModal from '../../components/PreferencesModal/PreferencesModal';
import DevicesContext from '../../context/userContext';
import { User } from '../../models/typeUser';
import { GridCamerasOn } from '../../components/GridCamerasOn';
import { GridCamerasOff } from '../../components/GridCameraOff';

const client = AgoraRTC.createClient({
	mode: 'rtc',
	codec: 'h264',
});

const audioTracks: any = {
	localAudioTrack: null,
	remoteAudioTracks: {},
};

const videoTracks: any = {
	localVideoTrack: null,
	remoteVideoTracks: {},
};

const { VITE_AGORA_APP_ID, VITE_AGORA_CHANNEL, VITE_AGORA_TOKEN } = import.meta.env;

export const VideoRoom = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [micMuted, setMicMuted] = useState(true);
	const [cameraOff, setCameraOff] = useState(true);
	const { camera, microphone } = useContext(DevicesContext);

	const initRtc = async () => {
		client.on('user-joined', handleUserJoined);
		client.on('user-published', handleUserPublished);
		client.on('user-unpublished', handleUserUnPublished);
		client.on('user-left', handleUserLeft);

		const uid = await client.join(VITE_AGORA_APP_ID, VITE_AGORA_CHANNEL, VITE_AGORA_TOKEN, null);
		audioTracks.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
		audioTracks.localAudioTrack.setMuted(micMuted);

		videoTracks.localVideoTrack = await AgoraRTC.createCameraVideoTrack({
			cameraId: 'dea45e4e8b3cb9ff205404bb12efed5f84dfd481103585483fdd9f53bb37417b',
			encoderConfig: { width: { max: 1280, min: 720 }, height: { max: 1280, min: 720 } },
		});
		// videoTracks.localVideoTrack.open();
		videoTracks.localVideoTrack.setMuted(cameraOff);

		setUsers((previousUsers: User[]) => [
			...previousUsers,
			{
				uid,
				isHost: true,
				isMicrophoneOff: true,
				isCameraOff: false,
				isSpeaking: false,
				videoTrack: videoTracks.localVideoTrack,
				audioTrack: audioTracks.localAudioTrack,
			},
		]);
		client.publish([audioTracks.localAudioTrack, videoTracks.localVideoTrack]);

		initVolumeIndicator();
	};

	const changeCamera = async (deviceId: string) => {
		videoTracks.localVideoTrack.stop();
		client.unpublish([videoTracks.localVideoTrack]);

		videoTracks.localVideoTrack = await AgoraRTC.createCameraVideoTrack({
			cameraId: deviceId,
			encoderConfig: { width: { max: 1280, min: 720 }, height: { max: 1280, min: 720 } },
		});
		if (!cameraOff) {
			videoTracks.localVideoTrack.play('local');
		}
		client.publish([videoTracks.localVideoTrack]);

		setUsers((previousUsers) =>
			previousUsers.map((u) => {
				if (u.isHost) {
					u.videoTrack = videoTracks.localVideoTrack;
				}
				return u;
			})
		);
	};

	useEffect(() => {
		if (camera) {
			changeCamera(camera.deviceId);
		}
	}, [camera]);

	const handleUserJoined = async (user: User) => {
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

	const handleUserLeft = (user) => {
		setUsers((previousUsers) => previousUsers.filter((u) => u.uid !== user.uid));
	};

	const leaveRoom = async () => {
		audioTracks.localAudioTrack.stop();
		audioTracks.localAudioTrack.close();
		videoTracks.localVideoTrack.stop();
		videoTracks.localVideoTrack.close();
		client.unpublish();
		client.leave();
	};

	const initVolumeIndicator = async () => {
		//1
		AgoraRTC.setParameter('AUDIO_VOLUME_INDICATION_INTERVAL', 2000);
		client.enableAudioVolumeIndicator();
		//2
		client.on('volume-indicator', (volumes) => {
			volumes.forEach((volume) => {
				// console.log(`UID ${volume.uid} Level ${volume.level}`);
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

	useEffect(() => {
		initRtc();
		return () => {
			leaveRoom();
		};
	}, []);

	useEffect(() => {
		setUsers((previousUsers) =>
			previousUsers.map((u) => {
				if (u.isHost) {
					u.isMicrophoneOff = micMuted;
				}
				return u;
			})
		);
	}, [micMuted]);

	const toggleMic = async () => {
		if (micMuted) {
			setMicMuted(false);
		} else {
			setMicMuted(true);
		}
		audioTracks.localAudioTrack.setMuted(!micMuted);
		client.publish(audioTracks.localAudioTrack);
	};

	const debounced = async () => {
		if (cameraOff) {
			setCameraOff(false);
			videoTracks.localVideoTrack.play('local');
		} else {
			setCameraOff(true);
			videoTracks.localVideoTrack.stop();
		}
		videoTracks.localVideoTrack.setMuted(!cameraOff);
		client.publish(videoTracks.localVideoTrack);
	};

	const [modal, setModal] = useState(false);

	return (
		<>
			{modal && <PageModal closeModal={() => setModal(false)} isOpen={modal} />}
				<VideoRoomContainer>
					{/* <GridCamerasOff users={users.filter((user: User) => user.isCameraOff)} /> */}
					<GridCamerasOn users={users} />
					<div className="flex w-full justify-center">
						<ControlButtonsContainer>
							<CircleButton onClick={toggleMic} deviceOff={micMuted}>
								{micMuted ? <BiSolidMicrophoneOff /> : <BiSolidMicrophone />}
							</CircleButton>
							<CircleButton onClick={debounced} deviceOff={cameraOff}>
								{cameraOff ? <BiSolidCameraOff /> : <BiSolidCamera />}
							</CircleButton>
							<LeaveButton onClick={debounced}>
								<ImPhoneHangUp />
							</LeaveButton>
							<CircleButton onClick={() => setModal(true)}>
								<FaGear />
							</CircleButton>
						</ControlButtonsContainer>
					</div>
				</VideoRoomContainer>
		</>
	);
};
