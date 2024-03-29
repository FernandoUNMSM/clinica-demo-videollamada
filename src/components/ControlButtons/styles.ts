import styled, { css } from "styled-components";
import { bps } from "../../styles/breakpoints";

export const ControlButtonsContainer = styled.div`
	display: flex;
	width: 400px;
	height: 100%;
	justify-content: space-evenly;
	align-items: center;
	${bps.mobile} {
		width: 100%;
	}
`;

export const CircleButton = styled.button<{ deviceOff?: boolean, disabled?: boolean }>`
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

	${(props)=>{
		if(props.disabled){
			return css`
				pointer-events: none;
				/* opacity: .3; */
				/* cursor: not-allowed; */
			`
		}
	}}
`;

export const LeaveButton = styled(CircleButton)`
	background-color: ${(props) => props.theme.circleButton.off};
	&:hover {
		background-color: ${(props) => props.theme.circleButton.offHover};
	}
`;
