import styled from "styled-components";

export const ControlButtonsContainer = styled.div`
	display: flex;
	width: 400px;
	height: 100%;
	justify-content: space-evenly;
	align-items: center;
`;

export const CircleButton = styled.button<{ deviceOff?: boolean }>`
	height: 60px;
	width: 60px;
	display: flex;
	transition: 0.3s;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	border: none;
	border-radius: 100%;
	background-color: ${(props) => (props.deviceOff ? props.theme.circleButton.off : props.theme.circleButton.on)};
	&:hover {
		background-color: ${(props) => (props.deviceOff ? props.theme.circleButton.offHover : props.theme.circleButton.onHover)};
	}
	font-size: 20px;
	color: white;
`;

export const LeaveButton = styled(CircleButton)`
	background-color: ${(props) => props.theme.circleButton.off};
	&:hover {
		background-color: ${(props) => props.theme.circleButton.offHover};
	}
`;
