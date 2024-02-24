import { useContext, useState } from 'react';
import { Device, DevicesList } from './styles';
import AgoraContext from '../../../context/agoraContext';

interface Props {
	devices: MediaDeviceInfo[];
	typeDevice: string;
}

const DevicesTab = ({ devices, typeDevice }: Props) => {
	const { camera, microphone, setCamera, setMicrophone, changeCamera, changeMicrophone } = useContext(AgoraContext);
	const [actualDevice, setActualDevice] = useState<MediaDeviceInfo>(typeDevice === 'camera' ? camera : microphone);

	const toggleDevice = (device: MediaDeviceInfo) =>{
		setActualDevice(device)
		if (typeDevice === 'camera') {
			changeCamera(device.deviceId);
			setCamera(device);
		} else {
			changeMicrophone(device.deviceId)
			setMicrophone(device);
		}
	}

	return (
		<>
			<DevicesList>
				{devices.map((device: MediaDeviceInfo) => (
					<Device onClick={() => toggleDevice(device)} isActive={device.deviceId === actualDevice?.deviceId}>
						<p>{device.label}</p>
					</Device>
				))}
			</DevicesList>
		</>
	);
};

export default DevicesTab;
