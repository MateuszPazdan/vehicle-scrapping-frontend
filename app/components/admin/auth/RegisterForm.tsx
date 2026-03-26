import { useRegisterMutation } from '@/app/_redux/features/authApiSlice';
import {
	validateEmail,
	validatePassword,
	validateRepeatPassword,
} from '@/app/_utils/isInputCorrect';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import TextInput from '../../TextInput';
import Button from '../../Button';
import { toast } from 'react-toastify';

export default function RegisterForm({
	setIsLogin,
}: {
	setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<FieldValues>();
	const [register, { isLoading }] = useRegisterMutation();

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		register({ email: data.email, password: data.password })
			.unwrap()
			.then(() => {
				setIsLogin(true);
				toast.success('Zarejestrowano pomyślnie');
			})
			.catch(() => {
				toast.error('Wystąpił błąd podczas rejestracji');
			});
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='relative flex justify-center items-center md:py-10 '
			>
				<div className='sm:w-[400px] md:w-[500px] w-full px-5 sm:px-10 pb-6 pt-5 bg-white sm:shadow-myShadow shadow-shadowBlack rounded-xl gap-8 flex flex-col items-center'>
					<div className='relative'>
						<p className='pb-5 text-3xl mt-4'>Rejestracja</p>
					</div>

					<TextInput
						register={formRegister}
						error={errors?.email?.message}
						label={'E-mail'}
						field={'email'}
						type={'email'}
						validateFunction={() => validateEmail(getValues().email)}
						name='email'
						autoComplete='email'
					/>

					<TextInput
						register={formRegister}
						error={errors?.password?.message}
						label={'Hasło'}
						field={'password'}
						type={'password'}
						name='password'
						autoComplete='current-password'
						validateFunction={() => validatePassword(getValues().password)}
					/>

					<TextInput
						register={formRegister}
						error={errors?.passwordConfirm?.message}
						label={'Powtórz hasło'}
						field={'passwordConfirm'}
						type={'password'}
						name='passwordConfirm'
						autoComplete='current-password'
						validateFunction={() =>
							validateRepeatPassword(
								getValues().password,
								getValues().passwordConfirm,
							)
						}
					/>

					<div className='mt-6'>
						<Button type={'submit'} isLoading={isLoading}>
							<span>Zarejestruj się</span>
						</Button>
					</div>
				</div>
			</form>
		</>
	);
}
