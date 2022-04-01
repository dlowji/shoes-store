import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

const FormProvider = ({ children }) => {
	const [showSignIn, setShowSignIn] = useState(false);
	const [showSignUp, setShowSignUp] = useState(false);

	const handleSignIn = () => {
		setShowSignIn(() => setShowSignIn(true));
	};
	const handleSignUp = () => {
		setShowSignUp(() => setShowSignUp(true));
	};

	return (
		<FormContext.Provider
			value={{ showSignIn, setShowSignIn, showSignUp, setShowSignUp, handleSignIn, handleSignUp }}
		>
			{children}
		</FormContext.Provider>
	);
};

const useFormContext = () => {
	const context = useContext(FormContext);
	if (typeof context === 'undefined') {
		throw new Error('useFormContext must be used within a FormProvider');
	}
	return context;
};

export { useFormContext, FormProvider };
