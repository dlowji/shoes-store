import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const register = ({ emailSignUp, passwordSignUp }) => {
	const auth = getAuth();
	createUserWithEmailAndPassword(auth, emailSignUp, passwordSignUp)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			console.log(user);
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage);
		});
};

export default register;
