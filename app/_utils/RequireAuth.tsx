'use client';

import { useRouter } from 'next/navigation';
import { useAppSelector } from '../_redux/hooks';
import Spinner from '../components/Spinner';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

interface RequireAuthProps {
	children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
	const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			toast.error(
				'Zaloguj się, aby skorzystać ze wszystkich funkcjonalności aplikacji.',
			);
			router.push('/');
		}
	}, [isLoading, isAuthenticated, router]);

	if (isLoading) {
		return (
			<div className='h-screen'>
				<Spinner size='large' />
			</div>
		);
	}


	return <>{children}</>;
}
