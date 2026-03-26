import { Metadata } from 'next';
import AuthContainer from './components/admin/auth/AuthContainer';

export const metadata: Metadata = {
	title: 'vsapp | Logowanie',
};

export default function page() {
	return <AuthContainer />;
}
