import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import React from 'react';
import Sidebar from './Components/Admin/Sidebar';
import ScrollToTop from './Components/Dashboard/ScrollToTop';
function App() {
	const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));
	const [activeSidebar, setActiveSidebar] = React.useState(true);
	const navigate = useNavigate();
	React.useEffect(() => {
		if (user && user?.role === 'Admin') {
			navigate('dashboard');
		} else {
			navigate('/');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);
	return (
		<>
			{user && user?.role === 'Admin' ? (
				<Sidebar
					user={user}
					setUser={setUser}
					activeSidebar={activeSidebar}
					setActiveSidebar={setActiveSidebar}
				/>
			) : (
				<Navbar user={user} setUser={setUser} />
			)}
			<ScrollToTop></ScrollToTop>
			<Outlet context={{ activeSidebar, setActiveSidebar }}></Outlet>
		</>
	);
}

export default App;
