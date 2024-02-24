import { User } from '../../models/typeUser';
import { VideoPlayer } from '../VideoPlayer/VideoPlayer';

export const GridCamerasOn = ({ users }: { users: User[] }) => {
	return (
		<div className="gridResponive">
			{users.map((user) => (<>
				<VideoPlayer user={user} key={user.uid} />
			</>))}
		</div>
	);
};
