'use client';

import { useRouter } from 'next/navigation';
import { useAppSelector } from '../_redux/hooks';
import Spinner from '../components/Spinner';
import { useEffect } from 'react';

interface RequireAuthProps {
	children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
	const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			router.replace('/');
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
