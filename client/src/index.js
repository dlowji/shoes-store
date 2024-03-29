import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Contact from './Components/Contact/Contact';
import Products from './Components/Products/Products';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import ProductCard from './Components/ProductCard/ProductCard';
import Dashboard from './Components/Dashboard/Dashboard';
import Cart from './Components/Cart/Cart';
import { UserProvider } from './contexts/userContext';
import { ToastMessageProvider } from './contexts/toastMessageContext';

ReactDOM.render(
	<UserProvider>
		<ToastMessageProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />}>
						<Route index element={<Home />} />
						<Route path="products" element={<Products />}>
							<Route path=":productId" element={<ProductCard />} />
						</Route>
						<Route path="contact" element={<Contact />} />
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="cart" element={<Cart />} />
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ToastMessageProvider>
	</UserProvider>,
	document.getElementById('root')
);
