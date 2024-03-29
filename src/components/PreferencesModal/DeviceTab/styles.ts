import styled from 'styled-components';
import { bps } from '../../../styles/breakpoints';

export const DevicesList = styled.div`
`;

export const Device = styled.div<{ isActive: boolean, disabled: boolean }>`
	min-height: 40px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 5px 10px;
	cursor: ${(props) => props.disabled ? 'wait' : 'pointer'};
	user-select: none;
	color: ${(props) => (props.isActive ? props.theme.preferenceModal.optionActive.color : 'rgb(94, 98, 120)')};
	background-color: ${(props) => (props.isActive ? props.theme.preferenceModal.optionActive.background : 'transparent')};

	&:hover {
		background-color: ${(props) => props.theme.preferenceModal.optionActive.background};
	}

	p {
		align-self: center;
	}
	${bps.mobile} {
		padding: 0 0 0 10px;
	}
`;