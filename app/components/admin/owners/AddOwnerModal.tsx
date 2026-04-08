import {
	OwnerBody,
	useCreateOwnerMutation,
	useLazyGetAddressQuery,
	useRetrieveOwnersQuery,
} from '@/app/_redux/features/ownerApiSlice';
import ModalHeader from '../../ModalHeader';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import Button from '../../Button';
import { useEffect, useState } from 'react';

interface AddOwnerModalProps {
	onCloseModal: () => void;
}

export default function AddOwnerModal({ onCloseModal }: AddOwnerModalProps) {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<OwnerBody>();
	const searchParams = useSearchParams();
	const [getAddress, { data: address }] = useLazyGetAddressQuery();
	const [createOwner, { isLoading }] = useCreateOwnerMutation();
	const { refetch: refetchOwners } = useRetrieveOwnersQuery({
		name: searchParams.get('name') || '',
		surname: searchParams.get('model') || '',
		pesel: searchParams.get('pesel') || '',
		address: searchParams.get('address') || '',
		id_number: searchParams.get('id_number') || '',
	});
	const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
	const [addressInput, setAddressInput] = useState('');

	const onSubmit = async (data: OwnerBody) => {
		createOwner(data)
			.unwrap()
			.then(() => {
				toast.success('Właściciel został dodany!');
				refetchOwners();
				onCloseModal();
			})
			.catch((error) => {
				toast.error(
					error.data.message || 'Wystąpił błąd podczas dodawania właściciela!',
				);
				console.error('Error creating owner:', error);
			});
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (addressInput.length > 3) {
				getAddress(addressInput);
			}
		}, 500);

		return () => clearTimeout(timeout);
	}, [addressInput, getAddress]);

	return (
		<div className='p-6 space-y-10'>
			<ModalHeader onCloseModal={onCloseModal} title='Dodaj właściciela' />
			<form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-4'>
				<div className='flex flex-col'>
					<label className='text-sm text-gray mb-1'>Imię</label>
					<input
						type='text'
						placeholder='Imię'
						{...register('name', { required: 'Podaj imię' })}
						className='border border-gray/30 rounded-lg px-3 py-2'
					/>
					<p className='text-red-500 text-xs pt-1'>{errors.name?.message}</p>
				</div>
				<div className='flex flex-col'>
					<label className='text-sm text-gray mb-1'>Nazwisko</label>
					<input
						type='text'
						placeholder='Nazwisko'
						{...register('surname', { required: 'Podaj naziwsko' })}
						className='border border-gray/30 rounded-lg px-3 py-2'
					/>
					<p className='text-red-500 text-xs pt-1'>{errors.surname?.message}</p>
				</div>
				<div className='flex flex-col'>
					<label className='text-sm text-gray mb-1'>PESEL</label>
					<input
						type='text'
						placeholder='PESEL'
						{...register('pesel', {
							required: 'Podaj PESEL',
							pattern: {
								value: /^\d{11}$/,
								message: 'PESEL musi składać się z 11 cyfr',
							},
						})}
						className='border border-gray/30 rounded-lg px-3 py-2'
						maxLength={11}
					/>
					<p className='text-red-500 text-xs pt-1'>{errors.pesel?.message}</p>
				</div>

				<div className='flex flex-col'>
					<label className='text-sm text-gray mb-1'>Numer dowodu</label>
					<input
						type='text'
						placeholder='Numer dowodu'
						{...register('id_number', {
							required: 'Podaj numer dowodu',
							pattern: {
								value: /^[A-Z]{3}[0-9]{6}$/,
								message:
									'Numer dowodu musi składać się z 3 dużych liter i 6 cyfr',
							},
						})}
						className='border border-gray/30 rounded-lg px-3 py-2'
						maxLength={9}
					/>
					<p className='text-red-500 text-xs pt-1'>
						{errors.id_number?.message}
					</p>
				</div>

				<div className='flex flex-col relative'>
					<label className='text-sm text-gray mb-1'>Adres</label>
					<input
						type='text'
						placeholder='Adres'
						{...register('address', {
							required: 'Podaj adres',
						})}
						onChange={(e) => {
							setAddressInput(e.target.value);
						}}
						className='border border-gray/30 rounded-lg px-3 py-2'
						onFocus={() => setIsDropdownVisible(true)}
						onBlur={() => setTimeout(() => setIsDropdownVisible(false), 100)}
					/>
					{address && (
						<ul
							className={`absolute ${
								!isDropdownVisible ? 'hidden' : 'block'
							} top-full mt-1 bg-white border border-gray/30 rounded rounded-r-none w-full z-10 max-h-28 overflow-y-auto`}
						>
							<li
								key={address.formatted_address}
								className='px-3 py-2 hover:bg-gray/10 cursor-pointer'
								onClick={() => {
									setValue('address', address.formatted_address);
								}}
							>
								{address.formatted_address}
							</li>
						</ul>
					)}
					<p className='text-red-500 text-xs pt-1'>{errors.address?.message}</p>
				</div>

				<div className='flex justify-end gap-4 pt-8'>
					<Button type='submit' disabled={isLoading}>
						{isLoading ? 'Dodawanie...' : 'Dodaj właściciela'}
					</Button>

					<button
						type='button'
						onClick={onCloseModal}
						className='px-4 py-2 rounded hover:bg-gray/10 duration-300 transition'
					>
						Anuluj
					</button>
				</div>
			</form>
		</div>
	);
}
