import Button from '../../Button';
import ModalHeader from '../../ModalHeader';

export default function VehicleDismantlingModal({
	onCloseModal,
}: {
	onCloseModal: () => void;
}) {
	return (
		<div className='flex flex-col p-2 gap-5'>
			<ModalHeader onCloseModal={onCloseModal} title='Zmiana statusu pojazdu' />
			{/* <p className=' text-center text-gray/80 mb-4'>
				Czy jesteś pewny, że chcesz zmienić status pojazdu na
				&apos;zdemontowany&apos;?
			</p>
			<div className='space-x-2 mx-auto'>
				<Button type='button'>Demontuj pojazd</Button>
				<Button onClick={onCloseModal} type='button'>
					Anuluj
				</Button>
			</div> */}
		</div>
	);
}
