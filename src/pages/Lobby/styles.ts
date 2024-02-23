import styled, { keyframes } from 'styled-components';
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
	p {
		font-size: 2em;
    animation: ${animationLeft} 1.5s ease;
	}
  .title {
    margin-bottom: 20px;
  }
  input{
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
  }
	button {
		color: black;
		background-color: #fff;
		width: 50%;
		height: 40px;
		border-radius: 7px;
		margin-top: 10px;
    max-width: 300px;
    transition: .3s;
    animation: ${animationBottom} 2s ease;
	}
	.title h1, .title p{
		font-family: 'Lato', sans-serif !important;
	}



`;
