import React from 'react';
import ModalBase from '../Portal/ModalBase';
import SignInForm from '../Form/SignInForm';
import SignUpForm from '../Form/SignUpForm';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const Modal = ({ user, setUser }) => {
	const [showSignIn, setShowSignIn] = React.useState(false);
	const [showSignUp, setShowSignUp] = React.useState(false);
	let navigate = useNavigate();
	const handleSignIn = () => {
		setShowSignIn(() => setShowSignIn(true));
	};
	const handleSignUp = () => {
		setShowSignUp(() => setShowSignUp(true));
	};
	const handleSignOut = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				console.log('signed out');
				navigate('');
				localStorage.removeItem('user');
				setUser(null);
				console.log('Successfully signed out!');
			})
			.catch(() => {
				console.log('Failed to sign out!');
			});
	};
	React.useEffect(() => {
		if (user) {
			setShowSignIn(false);
			setShowSignUp(false);
		}
	}, [user]);
	return (
		<>
			<div className="text-[#fff] login cursor-pointer w-[30px] h-[30px] rounded-full flex items-center justify-center">
				{user ? (
					<img src={user.photoURL} alt="avatar" className="rounded-full" />
				) : (
					<i className=" fa fa-user"></i>
				)}
				<div className="flex flex-col rounded-lg cursor-pointer user">
					{!user ? (
						<>
							<div
								className="p-5 min-w-[100px] border-b-2 border-solid border-[#EDA3B5] hover:opacity-80 cursor-pointer transition-colors"
								onClick={handleSignIn}
							>
								Sign in
							</div>
							<div
								className="p-5 min-w-[100px] hover:opacity-80 cursor-pointer transition-colors"
								onClick={handleSignUp}
							>
								Sign up
							</div>
						</>
					) : (
						<div
							className="p-4 min-w-[100px] hover:opacity-80 cursor-pointer transition-colors"
							onClick={handleSignOut}
						>
							Sign out
						</div>
					)}
				</div>
			</div>
			<ModalBase visible={showSignIn} onClose={() => setShowSignIn(false)}>
				<SignInForm
					mounted={showSignIn}
					setUser={setUser}
					setMounted={setShowSignIn}
					setSignUp={setShowSignUp}
				></SignInForm>
			</ModalBase>
			<ModalBase visible={showSignUp} onClose={() => setShowSignUp(false)}>
				<SignUpForm
					setUser={setUser}
					mounted={showSignUp}
					setMounted={setShowSignUp}
					setSignIn={setShowSignIn}
				></SignUpForm>
			</ModalBase>
		</>
	);
};

export default Modal;
