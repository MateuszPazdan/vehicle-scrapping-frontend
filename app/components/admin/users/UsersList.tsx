'use client';

import { toast } from 'react-toastify';
import Spinner from '../../Spinner';
import {
	useRetrieveAllUsersQuery,
	useRetrieveUserQuery,
	useUpdateRolesMutation,
} from '@/app/_redux/features/authApiSlice';

export default function UsersList() {
	const { data: currUser, isLoading: isUserLoading } = useRetrieveUserQuery();
	const { data: users, isLoading } = useRetrieveAllUsersQuery();
	const [updateRoles] = useUpdateRolesMutation();

	const handleRoleToggle = (userId: string, role: string) => {
		const user = users?.find((u) => u.id === userId);
		if (!user || currUser?.id === user.id) return;
		const roles = Array.isArray(user.roles) ? user.roles : [user.roles];

		updateRoles({
			userId,
			roles: roles.includes(role)
				? roles.filter((r) => r !== role)
				: [...roles, role],
		})
			.unwrap()
			.then(() => {
				toast.success('Role użytkownika zostały zaktualizowane');
			})
			.catch((err) => {
				console.log(err);
				toast.error(
					err.data.message ||
						'Wystąpił błąd podczas aktualizacji ról użytkownika',
				);
			});
	};

	return (
		<div className='mx-auto p-6'>
			{isLoading ? (
				<div className='py-10'>
					<Spinner size='medium' />
				</div>
			) : users?.length ? (
				<>
					<table className='min-w-full rounded-md overflow-hidden'>
						<thead className='bg-main text-white'>
							<tr className='text-left'>
								<th className='px-4 py-2'>E-mail</th>
								<th className='px-4 py-2'>Użytkownik</th>
								<th className='px-4 py-2'>Pracownik</th>
								<th className='px-4 py-2'>Administrator</th>
							</tr>
						</thead>
						<tbody>
							{users
								.slice()
								.sort((a, b) => a.email.localeCompare(b.email))
								.map((user) => (
									<tr
										key={user.id}
										className={`border-t border-gray-200 text-base`}
									>
										<td className='px-4 py-2'>{user.email}</td>
										<td
											onClick={() => {
												handleRoleToggle(user.id, 'USER');
											}}
											className={`px-4 py-2 ${
												currUser?.id === user.id
													? ' '
													: 'hover:text-main cursor-pointer duration-300 transition-colors'
											} `}
										>
											{user.roles.includes('USER') ? 'Tak' : 'Nie'}
										</td>
										<td
											onClick={() => {
												handleRoleToggle(user.id, 'EMPLOYEE');
											}}
											className={`px-4 py-2 ${
												currUser?.id === user.id
													? ' '
													: 'hover:text-main cursor-pointer duration-300 transition-colors'
											} `}
										>
											{user.roles.includes('EMPLOYEE') ? 'Tak' : 'Nie'}
										</td>
										<td
											onClick={() => {
												handleRoleToggle(user.id, 'ADMIN');
											}}
											className={`px-4 py-2 ${
												currUser?.id === user.id
													? ' '
													: 'hover:text-main cursor-pointer duration-300 transition-colors'
											} `}
										>
											{user.roles.includes('ADMIN') ? 'Tak' : 'Nie'}
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</>
			) : (
				<p className='text-center text-gray-500'>
					Brak właścieli do wyświetlenia.
				</p>
			)}
		</div>
	);
}
