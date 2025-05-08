import OwnerFilters from '@/app/components/admin/owners/OwnerFilters';
import OwnerList from '@/app/components/admin/owners/OwnerList';

export default function page() {
	return (
		<div className='px-2'>
			<p className='text-3xl font-bold py-10 text-center'>Lista właścicieli</p>
			<OwnerFilters />
			<OwnerList />
		</div>
	);
}
