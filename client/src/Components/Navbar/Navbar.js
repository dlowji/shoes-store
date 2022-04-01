import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../asset/logoWhite.png';
import Modal from './Modal';
import navbar from '../../config/navbarData';
import './NavBar.css';
import { FormProvider } from '../../contexts/formContext';
import { useUserContext } from '../../contexts/userContext';

const Navbar = () => {
	const { cart } = useUserContext();
	const [toggle, setToggle] = React.useState(false);
	const [activeIndex, setActiveIndex] = React.useState(0);
	const location = useLocation();
	const menuToggle = React.useRef(null);
	// Close modal when click outside
	React.useEffect(() => {
		function handleClickOutside(e) {
			if (e.target.matches('.fas.fa-bars')) {
				setToggle(true);
			} else if (e.target.matches('.close-btn') || !menuToggle.current.contains(e.target)) {
				setToggle(false);
			}
		}
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	// indicator
	React.useEffect(() => {
		const curPath = window.location.pathname.split('/')[1];
		const itemIndex = navbar.findIndex((item) => item.section === curPath);
		setActiveIndex(curPath.length === 0 ? 0 : itemIndex);
		return () => {};
	}, [location]);

	return (
		<header className="fixed top-0 left-0 right-0 z-50 w-full px-5 bg-primary">
			<div className="max-w-[1200px] mx-auto px-4 flex justify-between items-center min-h-[64px]">
				<Link to="/" className="hidden md:block">
					<img src={logo} alt="logo" className="object-cover" />
				</Link>

				<div className="relative hidden md:block">
					<nav className="items-center gap-x-[50px] flex">
						{navbar.map((item, index) => {
							return (
								<div className="relative" key={`nav-${index}`}>
									<Link
										to={item.link}
										className={`text-secondary block font-bold navigator ${
											activeIndex === index && 'active'
										}`}
									>
										{item.text.toUpperCase()}
									</Link>
								</div>
							);
						})}
					</nav>
				</div>

				<i
					className="block cursor-pointer md:hidden fas fa-bars text-secondary hover:opacity-80"
					onClick={() => setToggle(true)}
				></i>

				<div
					className={`fixed top-0 left-0 bottom-0 md:hidden bg-secondary shadow-xl min-w-[100px] py-5 px-4 z-10 transition-all ${
						toggle ? 'translate-x-0' : '-translate-x-full'
					}`}
					ref={menuToggle}
				>
					<div className="w-[25px] h-[25px] ml-auto flex justify-center items-center mb-6 close-btn bg-primary rounded-full hover:text-secondary cursor-pointer">
						<i className="fa fa-times text-[15px] pointer-events-none"></i>
					</div>

					{navbar.map((item, index) => {
						return (
							<div className="mb-3" key={`nav-${index}`}>
								<Link
									to={item.link}
									onClick={() => {
										setToggle(false);
									}}
									className={`block p-4 font-bold text-third hover:opacity-80 hover:text-primary ${
										activeIndex === index && 'border-b-4 border-primary'
									}`}
								>
									{item.text.toUpperCase()}
								</Link>
							</div>
						);
					})}
				</div>

				<div className="flex items-center gap-x-[32px]">
					<FormProvider>
						<Modal></Modal>
					</FormProvider>
					<Link
						to="/cart"
						className="text-[#fff] cursor-pointer w-[30px] h-[30px] flex items-center justify-center relative"
					>
						<span className="absolute flex items-center justify-center w-5 h-5 font-bold rounded-full -top-2 -right-2 bg-secondary text-third">
							{cart?.length > 0 ? cart.length : 0}
						</span>
						<i className="text-xl fas fa-shopping-cart"></i>
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
