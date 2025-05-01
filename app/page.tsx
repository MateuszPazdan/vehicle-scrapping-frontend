import { Metadata } from 'next';
import LoginForm from './components/admin/auth/LoginForm';

export const metadata: Metadata = {
	title: 'USwP | Logowanie',
};

export default function page() {
	return <LoginForm />;
}
