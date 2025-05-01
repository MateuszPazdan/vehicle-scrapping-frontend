'use client';

import { VehicleFilters as VehicleFiltersParams } from '@/app/_redux/features/vehicleApiSlice';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function VehicleFilters() {
	const { register, handleSubmit, reset } = useForm<VehicleFiltersParams>();
	const router = useRouter();

	const onSubmit = (data: VehicleFiltersParams) => {
		const query = new URLSearchParams();

		Object.entries(data).forEach(([key, value]) => {
			if (value && value.trim() !== '') {
				query.set(key, value);
			}
		});

		router.push(`?${query.toString()}`);
	};

	const handleClear = () => {
		reset();
		router.push('?');
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
			<div className='grid grid-cols-3 gap-4 px-6'>
				<input
					type='text'
					placeholder='Marka'
					{...register('brand')}
					className='border border-gray/30 rounded-lg px-3 py-2 w-full '
				/>
				<input
					type='text'
					placeholder='Model'
					{...register('model')}
					className='border border-gray/30 rounded-lg px-3 py-2 w-full '
				/>
				<input
					type='number'
					placeholder='Rok produkcji'
					{...register('year_of_production')}
					className='border border-gray/30 rounded-lg px-3 py-2 w-full '
				/>
				<input
					type='text'
					placeholder='Nr rejestracyjny'
					{...register('registration_number')}
					className='border border-gray/30 rounded-lg px-3 py-2 w-full '
				/>
				<input
					type='text'
					placeholder='VIN'
					{...register('vin')}
					className='border border-gray/30 rounded-lg px-3 py-2 w-full '
				/>
			</div>
			<div className='flex gap-4 px-6 self-end'>
				<button
					type='submit'
					className='bg-main text-white px-4 py-2 rounded hover:bg-opacity-90 transition'
				>
					Filtruj
				</button>
				<button
					type='button'
					className='bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition'
					onClick={() => handleClear()}
				>
					Wyczyść
				</button>
			</div>
		</form>
	);
}
