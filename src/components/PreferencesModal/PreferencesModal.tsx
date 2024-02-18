import { useEffect, useRef, useState } from 'react';

import { IoMdClose } from 'react-icons/io';
import { Container, ModalContainer, ModalTitle, ModalContent, PreferenceSection, PreferencesOptionsContainer, PreferencesOption } from './styles';
import ReactDOM from 'react-dom';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { LiaFileAudio } from 'react-icons/lia';
import { IoMdVideocam } from 'react-icons/io';
interface Props {
	closeModal: any;
	isOpen: any;
}
import { MdOutlinePalette } from 'react-icons/md';
import { BsCameraVideo } from 'react-icons/bs';
import { FaPalette } from 'react-icons/fa6';
export default function PageModal({ closeModal, isOpen }: Props) {
	const ref: React.RefObject<any> = useRef(null);

	const [cameras, setCameras] = useState<any[]>([]);
	const [microphones, setMicrophones] = useState<any[]>([]);
	const [section, setSection] = useState<string>('Appearance');

	// const handleClickOutside = (event: any) => {
	//   if (ref.current && !ref.current.contains(event.target) && event.target.tagName !== 'BUTTON') {
	//     closeModal();
	//   }
	// };

	// useEffect(() => {
	//   window.addEventListener("mousedown", handleClickOutside);

	//   return () => {
	//     document.removeEventListener("mousedown", handleClickOutside);
	//   };
	// }, [ref]);

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
			<ModalContainer width={'800px'} height={'500px'} animate={true} ref={ref} overflow={'auto'}>
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
						{section === 'Appearance' && <p>Appearance</p>}
						{section === 'Audio' && <p>Audio</p>}
						{section === 'Video' && <p>Video</p>}
					</PreferenceSection>
				</ModalContent>
			</ModalContainer>
		</Container>,
		document.getElementById('modal-root') as HTMLElement
	);
}
