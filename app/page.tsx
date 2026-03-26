import { Metadata } from 'next';
import AuthContainer from './components/admin/auth/AuthContainer';

export const metadata: Metadata = {
	title: 'USwP | Logowanie',
};

export default function page() {
	return <AuthContainer />;
}
