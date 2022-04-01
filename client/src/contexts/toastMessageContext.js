import { createContext, useContext, useEffect, useState } from 'react';

const ToastMessageContext = createContext();

const ToastMessageProvider = ({ children }) => {
	const [toastMessage, setToastMessage] = useState({
		show: false,
		title: '',
		message: '',
	});

	useEffect(() => {
		if (toastMessage.show) {
			setTimeout(() => {
				setToastMessage({
					show: false,
					title: '',
					message: '',
				});
			}, 3000);
		}
		return () => {};
	}, [toastMessage.show]);

	return (
		<ToastMessageContext.Provider value={{ toastMessage, setToastMessage }}>
			{children}
		</ToastMessageContext.Provider>
	);
};

const useToastMessage = () => {
	const context = useContext(ToastMessageContext);
	if (typeof context === 'undefined') {
		throw new Error('useToastMessage must be used within a ToastMessageProvider');
	}
	return context;
};

export { ToastMessageProvider, useToastMessage };
