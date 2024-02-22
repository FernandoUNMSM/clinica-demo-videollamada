import styled from 'styled-components';

export const UserCameraOn = styled.div<{ cameraoff: boolean; microphoneoff: boolean; isspeaking: boolean, par: number }>`
	position: relative;
  display: flex;
	/* display: ${(props) => (props.cameraoff ? 'none' : 'flex')}; */
	/* border-width: 8px; */
	border-color: ${(props) => (props.microphoneoff ? '#FE4747' : props.isspeaking ? 'blue' : '#4CAF50')};
	height: 100%;
	background-color: ${(props) => props.theme.videoPlayer.background};
  /* background: ${(props) => props.theme['600']}; */
	aspect-ratio: 16/9;
	border-radius: 10px;
	justify-self: center;
	max-width: 100%;
	backdrop-filter: blur(20px);
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
