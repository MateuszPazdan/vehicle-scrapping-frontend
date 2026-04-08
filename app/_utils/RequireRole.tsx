'use client';

import { useAppSelector } from '@/app/_redux/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Roles } from '@/app/_utils/roles';
import Spinner from '../components/Spinner';

interface RequireRoleProps {
	children: React.ReactNode;
	roles: Roles[];
}

function RequireRole({ children, roles }: RequireRoleProps) {
	const {
		isLoading,
		roles: userRoles,
		isAuthenticated,
	} = useAppSelector((state) => state.auth);

	const router = useRouter();

	useEffect(() => {
		const hasAccess = roles.some((role) => userRoles.includes(role));

		if (!hasAccess && !isLoading && isAuthenticated) {
			toast.error('Brak dostępu');
			router.back();
		}
	}, [isLoading, userRoles, roles, router, isAuthenticated]);

	if (isLoading) {
		return (
			<div className='h-screen'>
				<Spinner size='large' />
			</div>
		);
	}

	return <>{children}</>;
}

export default RequireRole;
