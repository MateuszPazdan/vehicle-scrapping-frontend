import RequireRole from '@/app/_utils/RequireRole';
import AvailableVehicles from '@/app/components/admin/panel/AvailableVehicles';
import HelloHeader from '@/app/components/admin/panel/HelloHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'vsapp',
};

export default function page() {
	return (
		<div>
			<RequireRole roles={['USER']}>
				<HelloHeader />
				<AvailableVehicles />
			</RequireRole>
		</div>
	);
}
