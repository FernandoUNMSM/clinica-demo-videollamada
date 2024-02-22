import { ThemeIcon } from '../../assets/themeIcon';
import { ThemeIconGroup } from './styles';

export const ThemeTab = () => {
	return (
		<>
    <ThemeIconGroup>
			<ThemeIcon colorTheme="pink" />
			<ThemeIcon colorTheme="blue" />
			<ThemeIcon colorTheme="green" />
			<ThemeIcon colorTheme="yellow" />

    </ThemeIconGroup>
		</>
	);
};
