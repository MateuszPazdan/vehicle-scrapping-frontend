import RequireRole from '@/app/_utils/RequireRole';
import AddStorageElement from '@/app/components/admin/storage/AddStorageElement';
import StorageList from '@/app/components/admin/storage/StorageList';

export default function page() {
	return (
		<div className='px-2'>
			<RequireRole roles={['EMPLOYEE']}>
				<div className='flex flex-row justify-between items-center px-6'>
					<p className='text-3xl font-bold py-10 text-center'>
						Lista magazynów
					</p>
					<AddStorageElement />
				</div>
				<StorageList />
			</RequireRole>
		</div>
	);
}
