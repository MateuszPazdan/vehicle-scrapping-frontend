'use client';

import { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useAppSelector } from '@/app/_redux/hooks';
import { useRouter } from 'next/navigation';
import Spinner from '../../Spinner';

export default function AuthContainer() {
	const [isLogin, setIsLogin] = useState(true);
	const router = useRouter();
	const { isAuthenticated, isLoading: isAuthenticating } = useAppSelector(
		(state) => state.auth,
	);

	useEffect(() => {
		if (isAuthenticated) {
			router.push('/admin/panel');
		}
	}, [isAuthenticated, router]);

	if (isAuthenticating) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<Spinner size='medium' color='main' />;
			</div>
		);
	}

	return (
		<div>
			{isLogin ? <LoginForm /> : <RegisterForm setIsLogin={setIsLogin} />}
			<button
				className='text-lg text-center w-full hover:text-main transition-colors duration-300'
				onClick={() => setIsLogin(!isLogin)}
			>
				{isLogin
					? 'Nie masz konta? Zarejestruj się'
					: 'Masz już konto? Zaloguj się'}
			</button>
		</div>
	);
}
