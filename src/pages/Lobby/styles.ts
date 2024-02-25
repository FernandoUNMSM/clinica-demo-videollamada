import styled, { css, keyframes } from 'styled-components';
import { bps } from '../../styles/breakpoints';
const animationTop = keyframes`
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }

  100% {
    transform: none;
    opacity: 1;
  }
`;

const animationLeft = keyframes`
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }

  100% {
    transform: none;
    opacity: 1;
  }
`;

const animationBottom = keyframes`
  0% {
    transform: translateY(100px);
    opacity: 0;
  }

  100% {
    transform: none;
    opacity: 1;
  }
`;

const inputAnimation = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const LobbyPage = styled.div`
	width: 100%;
	height: 100vh;
	background-color: #2c2c34;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #ccc;
	.content {
		font-family: 'Lato', sans-serif;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		text-align: center;
		width: 70%;
	}
	h1 {
		font-size: 3em;
		animation: ${animationTop} 1.5s ease;
	}
	.title {
		margin-bottom: 20px;
		p {
			font-size: 2em;
			animation: ${animationLeft} 1.5s ease;
		}
	}
	form {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		input {
			height: 60px;
			width: 80%;
			background-color: #222226;
			outline: none;
			padding: 0 10px;
			font-size: 1.5em;
			text-align: center;
			margin-bottom: 20px;
			animation: ${inputAnimation} 2s ease;
			border: none;
			color: white;
			&:disabled {
				cursor: not-allowed;
				user-select: none;
			}
		}
	}
	.title h1,
	.title p {
		font-family: 'Lato', sans-serif !important;
	}

	${bps.mobile} {
		.content {
			width: 90%;
			.title {
				h1 {
					font-size: 2em;
				}
				p {
					font-size: 1.5em;
				}
			}
		}
		form input{
			width: 90%;
		}
	}
`;

export const JoinButton = styled.button<{ charging: boolean }>`
	color: black;
	background-color: #222226;
	animation: ${animationBottom} 2s ease;
	width: 50%;
	height: 50px;
	border-radius: 7px;
	margin-top: 10px;
	max-width: 300px;
	transition: 0.3s;
	border: none;
	cursor: pointer;
	user-select: none;
	display: flex;
	justify-content: center;
	align-items: center;

	p {
		color: #fff;
		font-size: 1.1em;
	}
	&:hover {
		background-color: #17171a;
	}

	${(props) => {
		if (props.charging) {
			return css`
				background-color: #17171a;
				opacity: 0.6;
				cursor: not-allowed;
				pointer-events: none;
			`;
		}
	}}
`;
