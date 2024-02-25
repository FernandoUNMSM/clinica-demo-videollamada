import styled from 'styled-components';
import { bps } from '../../styles/breakpoints';

export const GridCameraOnContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
	gap: 20px;
	padding: 30px 40px;
	padding-bottom: 0px;
	height: 100%;
	${bps.tablet} {
		padding: 10px;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
	}
	${bps.mobile} {
		padding: 10px;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}
`;
