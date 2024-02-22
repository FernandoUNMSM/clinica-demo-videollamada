import styled, { keyframes, css } from 'styled-components';
const animationOpenContainer = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
export const Container = styled.div`
	height: 100vh;
	width: 100vw;
	background-color: rgba(0, 0, 0, 0.6);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 300;
	display: flex;
	justify-content: center;
	align-items: center;
	animation: ${animationOpenContainer} 0.3s ease;
	overflow: auto;
`;

interface ModalContainerProps {
	width: string;
	height: string;
	animate: boolean;
	overflow: string;
}

const animationOpen = keyframes`
  0% {
    transform: translateY(-50px);
  }

  100% {
    transform: none;
  }
`;

export const ModalContainer = styled.div<ModalContainerProps>`
	width: ${(props: any) => props.width};
	height: ${(props: any) => props.height};
	max-height: 90%;
	background-color: #fff;
	border-radius: 5px;
	display: grid;
	grid-template-rows: auto 1fr;

	overflow: hidden;
	${(props: any) =>
		props.animate
			? css`
					animation: ${animationOpen} 0.5s ease;
			  `
			: css`
					animation: none;
			  `};
`;
export const ModalTitle = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 1.75rem;
	border-bottom: 1px solid #ccc;

	h2 {
		font-size: 1.5rem;
		font-weight: 600;
		line-height: 1.2;
		margin: 0;
		word-break: break-all;
		color: ${(props) => props.theme.preferenceModal.optionActive.color};
	}
	h3,
	h4 {
		margin: 0;
		word-break: break-all;
	}

	svg {
		font-size: 20px;
		cursor: pointer;
		color: #ccc;
		transition: 0.3s;
	}
	.buttonsContainer {
		display: flex;
		button {
			border-radius: 5px;
		}
		button:nth-last-child(1) {
			margin-left: 20px;
		}
	}
`;
export const ModalContent = styled.div`
	display: grid;
	grid-template-columns: 200px 1fr;
	overflow: hidden;
	.options {
		display: flex;
		flex-direction: column;
	}
`;

export const PreferencesOptionsContainer = styled.div`
	border-right: 1px solid #ccc;
`;

export const PreferencesOption = styled.div<{ isActive: boolean }>`
	display: flex;
	height: 50px;
	align-items: center;
	font-size: 15px;
	font-weight: semi-bold;
	padding: 0 10px;
	cursor: pointer;
	user-select: none;
	color: ${(props) => (props.isActive ? props.theme.preferenceModal.optionActive.color : 'rgb(94, 98, 120)')};
	background-color: ${(props) => (props.isActive ? props.theme.preferenceModal.optionActive.background : 'transparent')};
	transition: 0.3s;
	&:hover {
		background-color: ${(props) => props.theme.preferenceModal.optionActive.background};
	}
	svg {
		font-size: 22px;
		margin-left: 10px;
	}
	p {
		margin-left: 10px;
	}
`;

export const PreferenceSection = styled.div`
	padding: 20px;
	overflow: auto;
	scrollbar-width: thin;
	
::-webkit-scrollbar {
  width: 0px;
  position: absolute;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(155, 155, 155, 0.5);
  border-radius: 20px;
  border: transparent;
}
	/* scrollbar-color: transparent transparent; */
	/* -webkit-scrollbar-width: thin;
	-webkit-scrollbar-color: transparent transparent;
	&::-webkit-scrollbar {
		width: 0;
		height: 0;
		display: none;
	} */
`;

export const DevicesList = styled.div``;

export const Device = styled.div<{ isActive: boolean }>`
	min-height: 40px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 5px 10px;
	cursor: pointer;
	user-select: none;
	color: ${(props) => (props.isActive ? props.theme.preferenceModal.optionActive.color : 'rgb(94, 98, 120)')};
	background-color: ${(props) => (props.isActive ? props.theme.preferenceModal.optionActive.background : 'transparent')};

	&:hover {
		background-color: ${(props) => props.theme.preferenceModal.optionActive.background};
	}

	p {
		align-self: center;
		/* max-width: 70%; */
	}
`;

export const ThemeIconGroup = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 20px;
	flex-wrap: wrap
`