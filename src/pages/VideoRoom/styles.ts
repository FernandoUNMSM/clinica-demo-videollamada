import styled, { css } from 'styled-components';

export const VideoRoomContainer = styled.div`
	display: grid;
	grid-template-rows: 1fr 100px;
	gap: 4px;
	height: 100vh;
	overflow: hidden;
	background-size: cover;

	${({ theme }) => {
		if (theme.videoRoom.background === 'sakuraImage') {
			return css`
				background-image: url(https://media1.tenor.com/m/L0k1211SDnoAAAAd/cherry-blossoms-japan.gif);
			`;
		} else if (theme.videoRoom.background === 'rainImage') {
			return css`
				background-image: url(https://i.pinimg.com/originals/92/48/7f/92487fb49bc613ab7c8caabe461d79cc.gif);
			`;
		} else {
			return css`
				background: ${(props) => props.theme.videoRoom.background};
			`;
		}
	}}

	.controlButtonsContainer {
		display: flex;
		justify-content: center;
		width: 100%;
	}
`;
