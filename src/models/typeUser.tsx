import { UID } from "agora-rtc-react";

export type User = {
	uid: UID;
	isHost: boolean;
	isMicrophoneOff: boolean;
	isCameraOff: boolean;
	isSpeaking: boolean;
	videoTrack: any;
	audioTrack: any;
};
