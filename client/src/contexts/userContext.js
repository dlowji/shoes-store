import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
	const [activeSidebar, setActiveSidebar] = useState(true);
	const [cart, setCart] = useState(
		localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).cart
			? JSON.parse(localStorage.getItem('user')).cart
			: []
	);
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user && cart && cart.length > 0) {
			localStorage.setItem('user', JSON.stringify({ ...user, cart }));
		}
	}, [cart]);
	return (
		<UserContext.Provider value={{ user, setUser, activeSidebar, setActiveSidebar, cart, setCart }}>
			{children}
		</UserContext.Provider>
	);
};

const useUserContext = () => {
	const context = useContext(UserContext);
	if (typeof context === 'undefined') {
		throw new Error('useUserContext must be used within a UserProvider');
	}
	return context;
};

export { UserProvider, useUserContext };
