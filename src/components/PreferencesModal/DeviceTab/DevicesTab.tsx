import { useContext, useEffect, useState } from 'react';
import { Device, DevicesList } from './styles';
import AgoraContext from '../../../context/agoraContext';

interface Props {
	devices: MediaDeviceInfo[];
	typeDevice: string;
}

const DevicesTab = ({ devices, typeDevice }: Props) => {
	const { camera, microphone, setCamera, setMicrophone, changeCamera } = useContext(AgoraContext);
	const [actualDevice, setActualDevice] = useState<MediaDeviceInfo>(typeDevice === 'camera' ? camera : microphone);

	useEffect(() => {
		if (typeDevice === 'camera') {
			changeCamera(actualDevice.deviceId);
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
