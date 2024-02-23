import styled from 'styled-components';

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
	}
`;