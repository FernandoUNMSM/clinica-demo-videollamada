import { UserIcon } from '../../assets/userIcon';
import { User } from '../../models/typeUser';
import { UserCameraOff, UserCircle, UsersWithCameraOffContainer } from './styles';

export const GridCamerasOff = ({ users }: { users: User[] }) => {
	return (
		<UsersWithCameraOffContainer>
			{users.map((user, index) => (
				<UserCameraOff key={index}>
					<UserCircle>
						<UserIcon />
						<p>Oscar Cabellos</p>
					</UserCircle>
				</UserCameraOff>
			))}
		</UsersWithCameraOffContainer>
	);
};
