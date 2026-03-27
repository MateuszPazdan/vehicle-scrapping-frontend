import RequireRole from '@/app/_utils/RequireRole';
import AddTransactionElement from '@/app/components/admin/transactions/AddTransactionElement';
import TransactionList from '@/app/components/admin/transactions/TransactionList';

export default function page() {
	return (
		<div className='px-2'>
			<RequireRole roles={['EMPLOYEE']}>
				<div className='flex flex-row justify-between items-center px-6'>
					<p className='text-3xl font-bold py-10 text-center'>
						Lista transakcji
					</p>
					<AddTransactionElement />
				</div>
				<TransactionList />
			</RequireRole>
		</div>
	);
}
