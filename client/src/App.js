import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import React from 'react';
import Sidebar from './Components/Admin/Sidebar';
import ScrollToTop from './Components/Dashboard/ScrollToTop';
import { useUserContext } from './contexts/userContext';
import { DashboardProvider } from './contexts/dashboardContext';
import { useToastMessage } from './contexts/toastMessageContext';
import ToastMessage from './Components/Toast/ToastMessage';
function App() {
	const { user, activeSidebar, setActiveSidebar } = useUserContext();
	const { toastMessage, setToastMessage } = useToastMessage();
	const navigate = useNavigate();
	React.useEffect(() => {
		if (user && user?.role === 'Admin') {
			setToastMessage({
				show: true,
				title: 'success',
				message: 'Welcome to admin dashboard',
			});
			navigate('dashboard');
		} else {
			navigate('/');
			setToastMessage({
				show: true,
				title: 'success',
				message: 'Welcome to my website',
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);
	return (
		<DashboardProvider>
			{user && user?.role === 'Admin' ? <Sidebar /> : <Navbar />}
			<Outlet context={{ activeSidebar, setActiveSidebar }}></Outlet>
			<ScrollToTop></ScrollToTop>
			{toastMessage?.show && (
				<ToastMessage
					mounted={toastMessage.show}
					title={toastMessage.title}
					message={toastMessage.message}
				></ToastMessage>
			)}
		</DashboardProvider>
	);
}

export default App;
