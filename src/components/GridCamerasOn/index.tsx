import { User } from '../../models/typeUser';
import { VideoPlayer } from '../VideoPlayer/VideoPlayer';

export const GridCamerasOn = ({ users }: { users: User[] }) => {
	console.log({users: users.filter(user => !user.isCameraOff || user.isHost)})
	return (
		<div className="gridResponive">
			{users.map((user, index) => (<>
				<VideoPlayer user={user} key={index} par={users.filter(user => !user.isCameraOff || user.isHost).length} />
				{/* <VideoPlayer user={user} key={index} par={users.filter(user => !user.isCameraOff || user.isHost).length} />
				<VideoPlayer user={user} key={index} par={users.filter(user => !user.isCameraOff || user.isHost).length} />
				<VideoPlayer user={user} key={index} par={users.filter(user => !user.isCameraOff || user.isHost).length} /> */}
			</>))}
		</div>
	);
};
