import VehicleFilters from '@/app/components/admin/vehicles/VehicleFIlters';
import VehicleList from '@/app/components/admin/vehicles/VehicleList';

export default function page() {
	return (
		<div className='px-2'>
			<p className='text-3xl font-bold py-10 text-center'>
				Lista pojazdów
			</p>
			<VehicleFilters />
			<VehicleList />
		</div>
	);
}
