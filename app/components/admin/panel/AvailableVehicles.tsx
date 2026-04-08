'use client';

import { useRetrieveAvailableVehiclesQuery } from '@/app/_redux/features/vehicleApiSlice';
import Spinner from '../../Spinner';

export default function AvailableVehicles() {
	const { data: vehicles, isLoading } = useRetrieveAvailableVehiclesQuery();

	if (isLoading) {
		return <Spinner size='medium' color='main' />;
	}

	return (
		<div className='px-8'>
			<p className='text-3xl font-bold py-8'>Dostepne pojazdy</p>
			{vehicles?.length ? (
				<>
					<table className='min-w-full rounded-md overflow-hidden'>
						<thead className='bg-main text-white'>
							<tr className='text-left'>
								<th className='px-4 py-2'>Marka pojazdu</th>
								<th className='px-4 py-2'>Model pojazdu</th>
								<th className='px-4 py-2'>Rok produkcji</th>
							</tr>
						</thead>
						<tbody>
							{vehicles?.map((vehicle) => (
								<tr
									key={vehicle.id}
									className='border-t border-gray-200 text-base'
								>
									<td className='px-4 py-2'>{vehicle?.brand}</td>
									<td className='px-4 py-2'>{vehicle?.model}</td>
									<td className='px-4 py-2'>{vehicle?.year_of_production}</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			) : (
				<p className='text-center text-gray-500'>
					Brak dostępnych pojazdów.
				</p>
			)}
		</div>
	);
}
