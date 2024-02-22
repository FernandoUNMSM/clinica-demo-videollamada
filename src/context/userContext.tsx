import { useState, createContext } from 'react'

interface Devices {
  camera?: any,
  microphone?: any,
  setCamera: any,
  setMicrophone: any,
  theme: string,
  setTheme: any,
}

const DevicesContext = createContext<Devices>({})

export function DevicesContextProvider({ children }: any) {
  const [camera, setCamera] = useState({})
  const [microphone, setMicrophone] = useState(true)
  const [theme, setTheme] = useState<string>('blue')

  return <DevicesContext.Provider value={{ camera, setCamera, microphone, setMicrophone, theme, setTheme }} >
    {children}
  </DevicesContext.Provider>
}

export default DevicesContext