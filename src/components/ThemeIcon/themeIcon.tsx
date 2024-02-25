import { useContext } from 'react';
import { ThemeIconContainer } from './styles';
import DevicesContext from '../../context/themeContext';
import { Theme } from '../../models/typeUser';

interface Props {
	theme: Theme;
}

export const ThemeIcon = ({ theme }: Props) => {
	const { setThemeSelected } = useContext(DevicesContext);
	return (
		<>
			<ThemeIconContainer localTheme={theme} onClick={() => setThemeSelected(theme)}>
				<svg width="274" height="175" viewBox="0 0 274 175" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect width="274" height="175" />
					<path d="M20 19C20 17.3431 21.3431 16 23 16H251C252.657 16 254 17.3431 254 19V138C254 139.657 252.657 141 251 141H23C21.3431 141 20 139.657 20 138V19Z" />
					<g clip-path="url(#clip0_402_151)">
						<path d="M132 159C132 164.523 127.523 169 122 169C116.477 169 112 164.523 112 159C112 153.477 116.477 149 122 149C127.523 149 132 153.477 132 159Z" />
						<path d="M103 159C103 164.523 98.5228 169 93 169C87.4772 169 83 164.523 83 159C83 153.477 87.4772 149 93 149C98.5228 149 103 153.477 103 159Z" />
						<circle cx="151" cy="159" r="10" />
						<path d="M190 159C190 164.523 185.523 169 180 169C174.477 169 170 164.523 170 159C170 153.477 174.477 149 180 149C185.523 149 190 153.477 190 159Z" />
					</g>
					<defs>
						<clipPath id="clip0_402_151">
							<rect width="107" height="20" fill="white" transform="translate(83 149)" />
						</clipPath>
					</defs>
				</svg>
			</ThemeIconContainer>
		</>
	);
};
