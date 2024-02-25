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
	const [disabled, setDisabled] = useState(false);

	const toggleDevice = async (device: MediaDeviceInfo) => {
		setDisabled(true);
		setActualDevice(device);
		if (typeDevice === 'camera') {
			await changeCamera(device.deviceId);
			setCamera(device);
		} else {
			await changeMicrophone(device.deviceId);
			setMicrophone(device);
		}
		setDisabled(false);
	};

	return (
		<>
			<DevicesList>
				{devices.map((device: MediaDeviceInfo) => (
					<Device onClick={() => !disabled && toggleDevice(device)} isActive={device.deviceId === actualDevice?.deviceId}  disabled={disabled}>
						<p>{device.label}</p>
					</Device>
				))}
			</DevicesList>
		</>
	);
};

export default DevicesTab;
