import React from 'react';
import ModalBase from '../Portal/ModalBase';
import SignInForm from '../Form/SignInForm';
import SignUpForm from '../Form/SignUpForm';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import ToastMessage from '../Toast/ToastMessage';

const Modal = ({ user, setUser }) => {
	const [showSignIn, setShowSignIn] = React.useState(false);
	const [showSignUp, setShowSignUp] = React.useState(false);
	const [toastMessage, setToastMessage] = React.useState({
		show: false,
		title: '',
		message: '',
	});

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
				setToastMessage({
					show: true,
					title: 'success',
					message: 'Signed out successfully',
				});
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
		return () => {};
	}, [user]);
	React.useEffect(() => {
		if (toastMessage.show) {
			setTimeout(() => {
				setToastMessage({
					show: false,
					title: '',
					message: '',
				});
			}, 3000);
		}
	}, [toastMessage.show]);
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
					setToastMessage={setToastMessage}
				></SignInForm>
			</ModalBase>
			<ModalBase visible={showSignUp} onClose={() => setShowSignUp(false)}>
				<SignUpForm
					setUser={setUser}
					mounted={showSignUp}
					setMounted={setShowSignUp}
					setSignIn={setShowSignIn}
					setToastMessage={setToastMessage}
				></SignUpForm>
			</ModalBase>
			{toastMessage?.show && (
				<ToastMessage
					mounted={toastMessage.show}
					title={toastMessage.title}
					message={toastMessage.message}
				></ToastMessage>
			)}
		</>
	);
};

export default Modal;
