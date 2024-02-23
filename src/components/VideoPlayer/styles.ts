import styled from 'styled-components';

export const UserCameraOn = styled.div<{ cameraoff: boolean; microphoneoff: boolean; isspeaking: boolean }>`
	position: relative;
  display: flex;
	border-color: ${(props) => (props.microphoneoff ? '#FE4747' : props.isspeaking ? 'blue' : '#4CAF50')};
	height: 100%;
	background-color: ${(props) => props.theme.videoPlayer.background};
	aspect-ratio: 16/9;
	border-radius: 10px;
	overflow: hidden;
	justify-self: center;
	max-width: 100%;
	backdrop-filter: blur(10px);
	.videoPlayer{
		width: 100%;
	}
`;

export const MicrophoneOffIcon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	z-index: 10;
	background-color: #fff;
	padding: 10px;
	border-radius: 100px;
	width: 40px;
	height: 40px;
	right: 20px;
	top: 20px;
`;
