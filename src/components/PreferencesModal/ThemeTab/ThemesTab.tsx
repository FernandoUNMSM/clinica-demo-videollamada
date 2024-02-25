import DevicesContext from '../../../context/themeContext';
import { themes } from '../../../styles/themes';
import { ThemeIcon } from '../../ThemeIcon/themeIcon';
import { ThemeContainer, ThemeIconGroup, ThemeIconGroupContent, ThemeIconGroupTitle } from './styles';
import { useContext } from 'react';
export const ThemeTab = () => {
	const { setThemeSelected } = useContext(DevicesContext);
	return (
		<>
			<ThemeContainer>
				<ThemeIconGroup>
					<ThemeIconGroupTitle>
						<p>Light/Dark Theme</p>
					</ThemeIconGroupTitle>
					<ThemeIconGroupContent>
						<ThemeIcon theme={themes.light} />
						<ThemeIcon theme={themes.dark} />
					</ThemeIconGroupContent>
				</ThemeIconGroup>
				<ThemeIconGroup>
					<ThemeIconGroupTitle>
						<p>Colors Theme</p>
					</ThemeIconGroupTitle>
					<ThemeIconGroupContent>
						<ThemeIcon theme={themes.pink} />
						<ThemeIcon theme={themes.blue} />
						<ThemeIcon theme={themes.green} />
						<ThemeIcon theme={themes.yellow} />
					</ThemeIconGroupContent>
				</ThemeIconGroup>
				<ThemeIconGroup>
					<ThemeIconGroupTitle>
						<p>Special Backgrounds</p>
					</ThemeIconGroupTitle>
					<ThemeIconGroupContent>
						<img src="https://media1.tenor.com/m/L0k1211SDnoAAAAd/cherry-blossoms-japan.gif" width={274} onClick={()=> setThemeSelected(themes.sakura)} />
						<img src="https://i.pinimg.com/originals/92/48/7f/92487fb49bc613ab7c8caabe461d79cc.gif" width={274}  onClick={()=> setThemeSelected(themes.rain)} />
					</ThemeIconGroupContent>
				</ThemeIconGroup>
			</ThemeContainer>
		</>
	);
};
