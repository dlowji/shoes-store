import React from 'react';
import Button from '../Button/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './form.css';
import Input from './Input/Input';
import { facebookProvider, googleProvider } from '../Services/authMethod';
import socialMediaAuth from '../Services/auth';

const SignInForm = ({ mounted, setUser, setMounted, setSignUp }) => {
	const [showPassword, setShowPassword] = React.useState(false);
	const scheme = yup
		.object({
			userSignin: yup.string().required('Username is required'),
			passwordSignIn: yup.string().required('Password is required'),
		})
		.required();
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: { userSignin: '', passwordSignIn: '' },
		resolver: yupResolver(scheme),
	});
	React.useEffect(() => {
		const handleClick = (e) => {
			if (e.target.matches('.fixed.inset-0')) {
				setMounted(false);
			}
		};
		document.addEventListener('click', handleClick);
		return () => {
			document.removeEventListener('click', handleClick);
		};
	});
	const handleSignUp = () => {
		setMounted(false);
		setSignUp(true);
	};
	const onSubmitHandler = (values) => {
		fetch('http://localhost:5555/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		})
			.then((response) => {
				return response.text();
			})
			.then((data) => {
				console.log(data);
			});
	};

	const handleSignIn = async (provider) => {
		const res = await socialMediaAuth(provider);
		console.log(res);
		if (res) {
			localStorage.setItem('user', JSON.stringify(res));
			setUser(res);
		}
	};
	return (
		<div className="px-3 py-5 mx-2 bg-secondary rounded-xl">
			<h2 className="mb-3 text-2xl font-bold text-center uppercase text-third">Login</h2>
			<div className="flex flex-col gap-3 mx-10 my-5 md:justify-center md:items-center md:mx-10 md:flex-row">
				<Button
					text={'Sign in with Google'}
					className={'flex-1 normal-case text-primary'}
					onClick={() => handleSignIn(googleProvider)}
				></Button>
				<Button
					className={'bg-primary text-secondary normal-case hover:opacity-80'}
					onClick={() => handleSignIn(facebookProvider)}
				>
					<i className="fab fa-facebook-f text-secondary"></i>
				</Button>
			</div>
			<div className="my-5">
				<span className="text-center block text-[20px] uppercase font-bold classOr">or</span>
			</div>
			<form autoComplete="off" onSubmit={handleSubmit(onSubmitHandler)}>
				<div className="flex flex-col gap-2">
					<label htmlFor="userSignin">Username</label>
					<Input
						type="text"
						name="userSignin"
						id="userSignin"
						placeholder="Enter your username"
						control={control}
					></Input>
					<p className="text-[#E74C3C] text-base font-bold h-5 relative -top-2">
						{errors.userSignin ? errors.userSignin?.message : ''}
					</p>
				</div>
				<div className="relative flex flex-col gap-2 my-2">
					<label htmlFor="passwordSignIn">Password</label>
					<Input
						type={`${showPassword ? 'text' : 'password'}`}
						name="passwordSignIn"
						id="passwordSignIn"
						placeholder="Enter your password"
						control={control}
					></Input>
					<i
						className={`fa fa-eye absolute top-[calc(50%-10px)] right-6 -translate-y-1/2sssssss cursor-pointer hover:text-primary transition-colors ${
							showPassword ? 'text-primary' : ''
						}`}
						onClick={() => setShowPassword(!showPassword)}
					></i>
					<p className="text-[#E74C3C] text-base font-bold h-5 relative -top-2">
						{errors.passwordSignIn ? errors.passwordSignIn?.message : ''}
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
			<div className="flex items-center justify-center my-5 whitespace-nowrap">
				<span className="block">Don't have an account?</span>
				<button component="a" href="#" className="block ml-2 text-primary" onClick={handleSignUp}>
					Sign up
				</button>
			</div>
		</div>
	);
};

export default SignInForm;
