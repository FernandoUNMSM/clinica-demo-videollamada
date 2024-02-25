import styled, { keyframes } from 'styled-components';

const soundwave = keyframes`
  0% {
    height: 10px;
  }
  50% {
    height: 21px;
  }
  100% {
    height: 17px;
  }
`;

export const UserCameraOn = styled.div<{ microphoneoff: boolean; isspeaking: boolean }>`
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
	.videoPlayer {
		width: 100%;
	}
	.userName {
		position: absolute;
		bottom: 10px;
		left: 10px;
		p {
			color: #fff;
			font-size: 20px;
			font-weight: 500;
			margin: 0;
		}
	}

	.audio-detection {
		display: flex;
		align-items: center;
		width: 40px;
		height: 40px;
		position: absolute;
		z-index: 10;
		background-color: #fff;
		padding: 8px;
		border-radius: 100px;
		right: 20px;
		top: 20px;
		.bar {
			width: 8px;
			border-radius: 3px;
			height: 10px;
			margin: 0 2px;
			background-color: ${(props) => props.theme.preferenceModal.optionActive.color};
		}
		&.on {
			.bar {
				animation: ${soundwave} 1.2s alternate infinite ease-in-out;
			}
			.bar:nth-child(even) {
				animation: ${soundwave} 1s alternate infinite ease-in-out;
			}
		}
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
