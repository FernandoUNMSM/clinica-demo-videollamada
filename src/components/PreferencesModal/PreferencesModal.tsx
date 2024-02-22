import React, { useEffect, useRef, useState } from 'react';
import { Container, ModalContainer, ModalTitle, ModalContent, PreferenceSection, PreferencesOptionsContainer, PreferencesOption } from './styles';

import ReactDOM from 'react-dom';
import AgoraRTC from 'agora-rtc-sdk-ng';

import { IoMdClose } from 'react-icons/io';
import { LiaFileAudio } from 'react-icons/lia';

interface Props {
	closeModal:  React.MouseEventHandler<SVGAElement>;
	isOpen: boolean
}

import { MdOutlinePalette } from 'react-icons/md';
import { BsCameraVideo } from 'react-icons/bs';
import DevicesTab from './DevicesTab';
import { ThemeTab } from './ThemesTab';


export default function PageModal({ closeModal, isOpen }: Props) {
	const ref = useRef<HTMLDivElement>(null);

	const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
	const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([]);
	const [section, setSection] = useState<string>('Appearance');

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : 'auto';
	}, [isOpen]);

	const getDevices = async () => {
		const camerasDevices = await AgoraRTC.getCameras();
		const microphonesDevices = await AgoraRTC.getMicrophones();
		setCameras(camerasDevices);
		setMicrophones(microphonesDevices);
	};

	useEffect(() => {
		getDevices();
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	return ReactDOM.createPortal(
		<Container>
			<ModalContainer width={'810px'} height={'500px'} animate={true} ref={ref} overflow={'auto'}>
				<ModalTitle>
					<h2>Preferences</h2>
					<IoMdClose onClick={closeModal} />
				</ModalTitle>
				<ModalContent>
					<PreferencesOptionsContainer>
						<div className="options">
							<PreferencesOption onClick={() => setSection('Appearance')} isActive={section === 'Appearance'}>
								<MdOutlinePalette />
								<p>Appearance</p>
							</PreferencesOption>
							<PreferencesOption onClick={() => setSection('Audio')} isActive={section === 'Audio'}>
								<LiaFileAudio />
								<p>Audio</p>
							</PreferencesOption>
							<PreferencesOption onClick={() => setSection('Video')} isActive={section === 'Video'}>
								<BsCameraVideo />
								<p>Video</p>
							</PreferencesOption>
						</div>
					</PreferencesOptionsContainer>
					<PreferenceSection>
						{section === 'Appearance' && <ThemeTab/>}
						{section === 'Audio' && <DevicesTab devices={microphones} typeDevice="microphone"/>}
						{section === 'Video' && <DevicesTab devices={cameras} typeDevice="camera"/>}
					</PreferenceSection>
				</ModalContent>
			</ModalContainer>
		</Container>,
		document.getElementById('modal-root') as HTMLElement
	);
}
