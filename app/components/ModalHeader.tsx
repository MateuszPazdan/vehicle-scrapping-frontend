import { BsX } from 'react-icons/bs';

interface Props {
	onCloseModal: () => void;
	title?: string;
}

export default function ModalHeader({ onCloseModal, title }: Props) {
	return (
		<div className='flex flex-row justify-between'>
			<p className='flex justify-center items-center text-xl'>{title}</p>
			<button className='text-4xl self-end' onClick={onCloseModal}>
				<BsX />
			</button>
		</div>
	);
}
