import styled from 'styled-components';
import { Theme } from '../../models/typeUser';
import { bps } from '../../styles/breakpoints';

export const ThemeIconContainer = styled.div<{ localTheme: Theme }>`
	cursor: pointer;
	border-radius: 10px;
	overflow: hidden;
	transition: .3s;

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
	&:hover{
		opacity: .8;
	}
	${bps.tablet} {
		svg{width: 100%}
	}

`;
