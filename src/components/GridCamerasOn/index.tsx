import { User } from '../../models/typeUser';
import { VideoPlayer } from '../VideoPlayer/VideoPlayer';

export const GridCamerasOn = ({ users }: { users: User[] }) => {
	console.log({users})
	return (
		<div className="gridResponive">
			{users.map((user, index) => (<>
				<VideoPlayer user={user} key={index} />
			</>))}
		</div>
	);
};
