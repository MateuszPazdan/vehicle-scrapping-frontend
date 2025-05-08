'use client';

import Button from '../../Button';
import Modal from '../../Modal';
import AddOwnerModal from './AddOwnerModal';

export default function AddOwnerElement() {
	return (
		<Modal>
			<Modal.Open opens='addOwner'>
				<Button
					type='button'
					onClick={() => {
						console.log('Dodaj');
					}}
				>
					Dodaj właściela
				</Button>
			</Modal.Open>
			<Modal.Window name='addOwner'>
				<AddOwnerModal onCloseModal={() => undefined} />
			</Modal.Window>
		</Modal>
	);
}
