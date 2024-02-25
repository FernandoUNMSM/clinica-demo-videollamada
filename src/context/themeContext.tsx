import { useState, createContext, Dispatch, SetStateAction } from 'react';
import { Theme } from '../models/typeUser';
import { themes } from '../styles/themes';

interface ThemeControl {
	themeSelected: Theme;
	setThemeSelected: Dispatch<SetStateAction<Theme>>;
}

const ThemeControlContext = createContext<ThemeControl>({
	themeSelected: themes.blue,
	setThemeSelected: () => {}
});

export function ThemeControlContextProvider({ children }: {children: React.ReactNode}) {
	const [themeSelected, setThemeSelected] = useState<Theme>(themes.dark);

	return (
		<ThemeControlContext.Provider value={{ themeSelected, setThemeSelected }}>
			{children}
		</ThemeControlContext.Provider>
	);
}

export default ThemeControlContext;
