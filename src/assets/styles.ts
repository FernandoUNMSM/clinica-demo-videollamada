import styled from 'styled-components';

export const ThemeIconContainer = styled.div<{ localTheme: any }>`
	cursor: pointer;
	rect {
		fill: ${(props) => props.localTheme.videoRoom.background};
	}
	rect + path {
		fill: ${(props) => props.localTheme.videoPlayer.background};
	}
	g path,
	g circle {
		fill: ${(props) => props.localTheme.circleButton.off};
	}
	g circle + path {
		fill: ${(props) => props.localTheme.circleButton.on};
	}
`;
