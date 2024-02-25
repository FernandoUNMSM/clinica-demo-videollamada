import { User } from '../../models/typeUser';
import { VideoPlayer } from '../VideoPlayer/VideoPlayer';
import { GridCameraOnContainer } from './styles';

export const GridCamerasOn = ({ users }: { users: User[] }) => {

	return (
		<GridCameraOnContainer>
			{users.map((user) => (<>
				<VideoPlayer user={user} key={user.uid} />
			</>))}
		</GridCameraOnContainer>
	);
};
