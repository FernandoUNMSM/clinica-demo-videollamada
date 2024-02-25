import styled from 'styled-components';
import { bps } from '../../../styles/breakpoints';

export const ThemeContainer = styled.div`
	display: flex;
	flex-direction: column;
`

export const ThemeIconGroup = styled.div`
	margin-bottom: 20px;
`;

export const ThemeIconGroupTitle = styled.div`
	margin-bottom: 10px;
	font-size: 1.1em;
	font-weight: 500;

`;
export const ThemeIconGroupContent = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 15px 0;
	flex-wrap: wrap;
	img{
		transition: .3s;
		border-radius: 10px;
		cursor: pointer;
		&:hover{
			opacity: .8;
		}
	}
	${bps.tablet} {
		justify-content: center;
	}
`;
