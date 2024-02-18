import { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { VideoPlayer } from './Call';

const APP_ID = '34943731e1184f81aa093de66ca147c2';
const TOKEN =
	'007eJxTYFjy261g2fnsHrnUdznBzzY/EGPYFOEkcGn7yrBLT38uqmxQYDA2sTQxNjc2TDU0tDBJszBMTDSwNE5JNTNLTjQ0MU82ilG9mNoQyMhwef4XJkYGCATxWRhSUnPzGRgA2+AhjA==';
const CHANNEL = 'demo';

const client = AgoraRTC.createClient({
	mode: 'rtc',
	codec: 'h264',
});
console.log(client.getLocalVideoStats());

import { FaGear } from 'react-icons/fa6';

let audioTracks: any = {
	localAudioTrack: null,
	remoteAudioTracks: {},
};

let videoTracks: any = {
	localVideoTrack: null,
	remoteVideoTracks: {},
};
import { ImPhoneHangUp } from 'react-icons/im';
import { BiSolidMicrophone, BiSolidMicrophoneOff, BiSolidCamera, BiSolidCameraOff } from 'react-icons/bi';
import { CircleButton, LeaveButton, UserCameraOff, UserCircle, UsersWithCameraOffContainer } from './styles';
import PageModal from './PreferencesModal/PreferencesModal';
export const VideoRoom = () => {
	const [users, setUsers] = useState<any[]>([]);
	const [micMuted, setMicMuted] = useState(true);
	const [cameraOff, setCameraOff] = useState(true);

	const initRtc = async () => {
		client.on('user-joined', handleUserJoined);
		client.on('user-published', handleUserPublished);
		client.on('user-unpublished', handleUserUnPublished);
		client.on('user-left', handleUserLeft);

		const uid = await client.join(APP_ID, CHANNEL, TOKEN, null);
		audioTracks.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
		audioTracks.localAudioTrack.setMuted(micMuted);

		videoTracks.localVideoTrack = await AgoraRTC.createCameraVideoTrack({
			encoderConfig: { width: { max: 1280, min: 720 }, height: { max: 1280, min: 720 } },
		});
		videoTracks.localVideoTrack.setMuted(cameraOff);

		setUsers((previousUsers) => [
			...previousUsers,
			{
				uid,
				isHost: true,
				isMicrophoneOff: true,
				// isCameraOff: true,
				isSpeaking: false,
				videoTrack: videoTracks.localVideoTrack,
				audioTrack: audioTracks.localAudioTrack,
			},
		]);
		client.publish([audioTracks.localAudioTrack, videoTracks.localVideoTrack]);
		console.log(client.getLocalVideoStats());
		initVolumeIndicator();
	};

	const handleUserJoined = async (user: any) => {
		setUsers((previousUsers: any) => [
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
			previousUsers.map((u) => {
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

	const debounced = async (e) => {
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
			{/* {modal && <PageModal closeModal={() => setModal(false)} isOpen={modal} />} */}
			<div className="grid grid-rows-[150px,1fr,150px] gap-4 h-full">
				<UsersWithCameraOffContainer>
					{users
						.filter((user) => user.isCameraOff)
						.map((user, index) => (
							<UserCameraOff key={index}>
								<UserCircle>
									<svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" viewBox="0 0 258.688 258.688">
										<g>
											<path
												style={{ fill: '#2c2c34' }}
												d="M129.353,258.688c-31.034,0-60.438-10.884-83.823-30.843l58.726-20.431l-0.4-4.618   c-0.036-0.442-0.095-0.871-0.149-1.313c-0.042-0.292-0.101-0.597-0.101-0.889v-15.293c7.87,4.732,16.57,7.429,25.741,7.429   c9.177,0,17.871-2.697,25.741-7.429v15.293c0,0.465-0.078,0.913-0.131,1.366l-0.638,5.919l58.428,20.311   C189.427,247.929,160.172,258.688,129.353,258.688z"
											/>
											<path
												style={{ fill: '#2c2c34' }}
												d="M91.684,157.161c-8.312-12.871-13.425-29.942-13.425-48.708c0-39.894,22.919-72.348,51.094-72.348   s51.094,32.454,51.094,72.348c0,18.76-5.108,35.813-13.408,48.684c-3.127,4.851-6.707,9.088-10.657,12.596   c-7.846,6.969-17.095,11.063-27.024,11.063s-19.178-4.099-27.024-11.063C98.379,166.231,94.811,162.001,91.684,157.161z"
											/>
											<path
												style={{ fill: '#2c2c34' }}
												d="M222.567,218.978l-55.534-19.321V175.85c15.347-15.389,25.341-39.829,25.341-67.396   c0-46.476-28.271-84.282-63.028-84.282s-63.028,37.806-63.028,84.282c0,27.573,10,52.031,25.359,67.414v23.301l-55.91,19.452   C12.671,194.448,0.003,162.89,0.003,129.344C0.003,58.022,58.031,0,129.347,0s129.338,58.022,129.338,129.344   C258.691,163.075,245.898,194.747,222.567,218.978z"
											/>
										</g>
									</svg>
									<p>Oscar Cabellos</p>
								</UserCircle>
							</UserCameraOff>
						))}
				</UsersWithCameraOffContainer>
				<div className="gridResponive">
					{users.map((user, index) => (
						<VideoPlayer user={user} key={index} />
					))}
				</div>
				<div className="flex w-full justify-center">
					<div className="flex w-[300px] justify-evenly items-center">
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
					</div>
				</div>
			</div>
		</>
	);
};
