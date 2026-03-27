import RequireRole from '@/app/_utils/RequireRole';
import AddWasteElement from '@/app/components/admin/waste/AddWasteElement';
import WasteList from '@/app/components/admin/waste/WasteList';

export default function page() {
	return (
		<div className='px-2'>
			<RequireRole roles={['EMPLOYEE']}>
				<div className='flex flex-row justify-between items-center px-6'>
					<p className='text-3xl font-bold py-10 text-center'>Lista odpadów</p>
					<AddWasteElement />
				</div>
				<WasteList />
			</RequireRole>
		</div>
	);
}
