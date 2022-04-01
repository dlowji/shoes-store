import React from 'react';
import Button from '../Button/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './form.css';
import Input from './Input/Input';
import { useUserContext } from '../../contexts/userContext';
import { useFormContext } from '../../contexts/formContext';

const SignUpForm = ({ setToastMessage }) => {
	const { setUser } = useUserContext();
	const { setShowSignUp, setShowSignIn } = useFormContext();
	const [showPassword, setShowPassword] = React.useState(false);
	const scheme = yup
		.object({
			userNameSignup: yup
				.string()
				.required('Your name is required')
				.min(8, 'Your username must be at least 8 characters')
				.max(32, 'Your username must be maximum 32 characters'),
			emailSignUp: yup
				.string()
				.email('Please enter valid email address')
				.required('Email is required'),
			passwordSignUp: yup
				.string()
				.required('Password is required')
				.min(8, 'Password must be at least 8 characters'),
			passwordSignUpConfirm: yup
				.string()
				.required('Password confirmation is required')
				.oneOf([yup.ref('passwordSignUp'), null], 'Passwords must match'),
		})
		.required();
	const {
		handleSubmit,
		control,
		setError,
		formState: { errors },
	} = useForm({
		defaultValues: {
			userNameSignup: 'anhlaprodn0123',
			emailSignUp: 'anhlaprodn0123@gmail.com',
			passwordSignUp: 'anhlaprodn0123',
			passwordSignUpConfirm: 'anhlaprodn0123',
		},
		resolver: yupResolver(scheme),
	});
	// Handle click outside of form
	React.useEffect(() => {
		const handleClick = (e) => {
			if (e.target.matches('.fixed.inset-0')) {
				setShowSignUp(false);
			}
		};
		document.addEventListener('click', handleClick);
		return () => {
			document.removeEventListener('click', handleClick);
		};
	});
	console.log(errors);
	const handleSignIn = () => {
		setShowSignUp(false);
		setShowSignIn(true);
	};
	// Handle submit
	const onSubmitHandler = (values) => {
		const { userNameSignup, emailSignUp, passwordSignUp } = values;
		fetch('http://localhost:5555/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: userNameSignup,
				password: passwordSignUp,
				email: emailSignUp,
			}),
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				if (data.code !== 0) {
					if (data.error === 'username') {
						setError('userNameSignup', {
							type: 'manual',
							message: data.message,
						});
					} else if (data.error === 'email') {
						setError('emailSignUp', {
							type: 'manual',
							message: data.message,
						});
					}
				} else {
					setUser(data.data);
					localStorage.setItem('user', JSON.stringify(data.data));
					setToastMessage({
						show: true,
						title: 'success',
						message: 'Sign up successfully',
					});
				}
			});
	};
	return (
		<div className="flex flex-col justify-center px-3 py-5 mx-2 bg-secondary rounded-xl">
			<h2 className="mb-3 text-2xl font-bold text-center uppercase text-third">Register</h2>
			<form autoComplete="off" onSubmit={handleSubmit(onSubmitHandler)}>
				<div className="flex flex-col gap-2">
					<label htmlFor="userNameSignup">User name</label>
					<Input
						type="text"
						name="userNameSignup"
						id="userNameSignup"
						placeholder="Enter your user name"
						control={control}
					></Input>
					<p className="text-[#E74C3C] text-base font-bold h-5 relative -top-2">
						{errors.userNameSignup ? errors.userNameSignup?.message : ''}
					</p>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="emailSignUp">Email address</label>
					<Input
						type="email"
						name="emailSignUp"
						id="emailSignUp"
						placeholder="Enter your email"
						control={control}
					></Input>
					<p className="text-[#E74C3C] text-base font-bold h-5 relative -top-2">
						{errors.emailSignUp ? errors.emailSignUp?.message : ''}
					</p>
				</div>
				<div className="relative flex flex-col gap-2 my-2">
					<label htmlFor="passwordSignUp">Password</label>
					<Input
						type={`${showPassword ? 'text' : 'password'}`}
						name="passwordSignUp"
						id="passwordSignUp"
						placeholder="Enter your password"
						autoComplete="off"
						control={control}
					></Input>
					<i
						className={`fa fa-eye absolute top-[calc(50%-10px)] right-6 -translate-y-1/2sssssss cursor-pointer hover:text-primary transition-colors ${
							showPassword ? 'text-primary' : ''
						}`}
						onClick={() => setShowPassword(!showPassword)}
					></i>
					<p className="text-[#E74C3C] text-base font-bold h-5 relative -top-2">
						{errors.passwordSignUp ? errors.passwordSignUp?.message : ''}
					</p>
				</div>
				<div className="relative flex flex-col gap-2 my-2">
					<label htmlFor="passwordSignUpConfirm">Confirm Password</label>
					<Input
						type={`${showPassword ? 'text' : 'password'}`}
						name="passwordSignUpConfirm"
						id="passwordSignUpConfirm"
						placeholder="Enter your password"
						autoComplete="off"
						control={control}
					></Input>
					<p className="text-[#E74C3C] text-base font-bold h-5 relative -top-2">
						{errors.passwordSignUpConfirm ? errors.passwordSignUpConfirm?.message : ''}
					</p>
				</div>
				<Button
					text={'Sign in'}
					type="submit"
					className={
						'py-4 bg-primary text-secondary font-bold normal-case hover:opacity-90 transition-all w-full'
					}
				></Button>
			</form>
			<div className="flex items-center justify-center mt-5 whitespace-nowrap">
				<span className="block">Already have an account?</span>
				<button component="a" href="#" className="block ml-2 text-primary" onClick={handleSignIn}>
					Sign in
				</button>
			</div>
		</div>
	);
};

export default SignUpForm;
