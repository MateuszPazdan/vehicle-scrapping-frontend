import HelloHeader from '@/app/components/admin/panel/HelloHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'vsapp | Panel administratora',
};

export default function page() {
	return (
		<div>
			<HelloHeader />
		</div>
	);
}
