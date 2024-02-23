import { useState, createContext, Dispatch, SetStateAction } from 'react';
import { Theme } from '../models/typeUser';
import { themes } from '../styles/themes';

interface Devices {
	themeSelected: Theme;
	setThemeSelected: Dispatch<SetStateAction<Theme>>;
}

const DevicesContext = createContext<Devices>({});

export function DevicesContextProvider({ children }: any) {
	const [themeSelected, setThemeSelected] = useState<Theme>(themes.sakura);


	return (
		<DevicesContext.Provider value={{ themeSelected, setThemeSelected }}>
			{children}
		</DevicesContext.Provider>
	);
}

export default DevicesContext;
