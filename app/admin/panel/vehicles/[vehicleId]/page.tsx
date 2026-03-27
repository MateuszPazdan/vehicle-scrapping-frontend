import RequireRole from '@/app/_utils/RequireRole';
import VehicleDetails from '@/app/components/admin/vehicleDetails/VehicleDetails';

interface Params {
	vehicleId: string;
}

export default function page({ params }: { params: Params }) {
	return (
		<div className='px-8 py-10'>
			<RequireRole roles={['EMPLOYEE']}>
				<VehicleDetails vehicleId={Number(params.vehicleId)} />
			</RequireRole>
		</div>
	);
}
