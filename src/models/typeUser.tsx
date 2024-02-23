import { UID } from 'agora-rtc-react';

export type User = {
	uid: UID;
	isHost: boolean;
	isMicrophoneOff: boolean;
	isCameraOff: boolean;
	isSpeaking: boolean;
	videoTrack: any;
	audioTrack: any;
};

export type Theme = {
	videoRoom: { background: string };
	circleButton: { off: string; offHover: string; on: string; onHover: string };
	videoPlayer:  { background: string };
	preferenceModal: {optionActive: {color: string,background: string }}
};

export type Themes = {
	light: Theme;
	dark: Theme;
	pink: Theme;
	blue: Theme;
	green: Theme;
	yellow: Theme;
	sakura: Theme;
	rain: Theme;
};
