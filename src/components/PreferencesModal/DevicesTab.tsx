import { useContext, useEffect, useState } from 'react';
import { Device, DevicesList } from './styles';
import DevicesContext from '../../context/userContext';

interface Props {
	devices: MediaDeviceInfo[];
	typeDevice: string;
}

const DevicesTab = ({ devices, typeDevice }: Props) => {
	const { camera, microphone, setCamera, setMicrophone } = useContext(DevicesContext);
	const [actualDevice, setActualDevice] = useState<MediaDeviceInfo>(typeDevice === 'camera' ? camera : microphone);

	useEffect(() => {
		if (typeDevice === 'camera') {
			setCamera(actualDevice);
		} else {
			setMicrophone(actualDevice);
		}
	}, [actualDevice]); //eslint-disable-line

	return (
		<>
			<DevicesList>
				{devices.map((device: MediaDeviceInfo) => (
					<Device onClick={() => setActualDevice(device)} isActive={device.deviceId === actualDevice?.deviceId}>
						<p>{device.label}</p>
					</Device>
				))}
			</DevicesList>
		</>
	);
};

export default DevicesTab;
