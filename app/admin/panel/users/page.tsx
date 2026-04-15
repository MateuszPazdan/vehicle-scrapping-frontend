import RequireRole from '@/app/_utils/RequireRole';
import UsersList from '@/app/components/admin/users/UsersList';

export default function page() {
	return (
		<div className='px-2'>
			<RequireRole roles={['ADMIN']}>
				<div className='flex flex-row justify-between items-center px-6'>
					<p className='text-3xl font-bold py-10 text-center'>
						Lista użytkowników
					</p>
				</div>
				<UsersList />
			</RequireRole>
		</div>
	);
}
