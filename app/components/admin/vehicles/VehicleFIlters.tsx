'use client';

import {
	useRetrieveFiltersInfoQuery,
	VehicleFilters as VehicleFiltersParams,
} from '@/app/_redux/features/vehicleApiSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Spinner from '../../Spinner';

export default function VehicleFilters() {
	const { register, handleSubmit, reset, getValues, watch } =
		useForm<VehicleFiltersParams>();
	const router = useRouter();
	const searchParams = useSearchParams();
	const {
		data: filters,
		refetch: refetchFilters,
		isFetching: isFiltersFetching,
		isLoading,
	} = useRetrieveFiltersInfoQuery({
		brand: getValues('brand') || '',
	});
	const availableBrands = filters?.brands || [];
	const availableModels = filters?.models || [];

	const selectedBrand = watch('brand');

	useEffect(() => {
		refetchFilters();
	}, [selectedBrand, refetchFilters]);

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

	if (isLoading) {
		return (
			<div className='py-10'>
				<Spinner size='medium' />
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
			<div className='grid grid-cols-3 gap-4 px-6'>
				<div className='flex flex-col'>
					<label className='text-sm text-gray-600 mb-1'>Marka</label>
					<select
						{...register('brand')}
						className='border border-gray/30 rounded-lg px-3 py-2 w-full'
						disabled={isFiltersFetching}
						defaultValue={searchParams.get('brand') || ''}
					>
						<option value=''>Wybierz markę</option>
						{availableBrands.map((brand) => (
							<option key={brand} value={brand}>
								{brand}
							</option>
						))}
					</select>
				</div>
				<div className='flex flex-col'>
					<label className='text-sm text-gray-600 mb-1'>Model</label>
					<select
						{...register('model')}
						className='border border-gray/30 rounded-lg px-3 py-2 w-full'
						disabled={isFiltersFetching}
						defaultValue={searchParams.get('model') || ''}
					>
						<option value=''>Wybierz model</option>
						{availableModels.map((model) => (
							<option key={model} value={model}>
								{model}
							</option>
						))}
					</select>
				</div>
				<div className='flex flex-col'>
					<label className='text-sm text-gray-600 mb-1'>Rok produkcji</label>
					<input
						type='number'
						placeholder='Rok produkcji'
						{...register('year_of_production')}
						className='border border-gray/30 rounded-lg px-3 py-2 w-full '
						defaultValue={searchParams.get('year_of_production') || ''}
						min={1900}
						max={new Date().getFullYear()}
					/>
				</div>
				<div className='flex flex-col'>
					<label className='text-sm text-gray-600 mb-1'>Nr rejestracyjny</label>
					<input
						type='text'
						placeholder='Nr rejestracyjny'
						{...register('registration_number')}
						className='border border-gray/30 rounded-lg px-3 py-2 w-full '
						defaultValue={searchParams.get('registration_number') || ''}
					/>
				</div>
				<div className='flex flex-col'>
					<label className='text-sm text-gray-600 mb-1'>VIN</label>
					<input
						type='text'
						placeholder='VIN'
						{...register('vin')}
						className='border border-gray/30 rounded-lg px-3 py-2 w-full '
						defaultValue={searchParams.get('vin') || ''}
					/>
				</div>
				<div className='flex flex-col'>
					<label className='text-sm text-gray-600 mb-1'>Status pojazdu</label>
					<select
						{...register('vehicle_status')}
						className='border border-gray/30 rounded-lg px-3 py-2 w-full'
						disabled={isFiltersFetching}
						defaultValue={searchParams.get('vehicle_status') || ''}
					>
						<option value=''>Wybierz status</option>
						<option value='RECEIVED_FOR_DISMANTLING'>
							Przyjęty do demontażu
						</option>
						<option value='DISMANTLED'>Zdemontowany</option>
					</select>
				</div>
				<div className='flex flex-col'>
					<label className='text-sm text-gray-600 mb-1'>
						Pesel właściciela
					</label>
					<input
						type='text'
						placeholder='Pesel właściciela'
						{...register('owner_pesel')}
						className='border border-gray/30 rounded-lg px-3 py-2 w-full '
						defaultValue={searchParams.get('owner_pesel') || ''}
						maxLength={11}
						inputMode='numeric'
						pattern='[0-9]*'
					/>
				</div>
			</div>
			<div className='flex gap-4 px-6 self-end mt-4'>
				<button
					type='submit'
					className='bg-main text-white px-4 py-2 rounded hover:bg-mainHover duration-300 transition'
				>
					Filtruj
				</button>
				<button
					type='button'
					className='bg-gray-200 px-4 py-2 rounded hover:bg-gray/10 duration-300 transition'
					onClick={() => handleClear()}
				>
					Wyczyść
				</button>
			</div>
		</form>
	);
}
