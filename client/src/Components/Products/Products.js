import React from 'react';
import Product from './Product';
import './Products.css';
import { useParams } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import fetchProducts from './getProducts';
import Loading from '../Loading/Loading';
import ToastMessage from '../Toast/ToastMessage';
import { useUserContext } from '../../contexts/userContext';

const Products = () => {
	const [products, setProducts] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const { user } = useUserContext();
	const { cart, setCart } = useUserContext();
	const [toastMessage, setToastMessage] = React.useState({
		show: false,
		title: '',
		message: '',
	});
	const params = useParams().productId;
	React.useEffect(() => {
		let mounted = true;
		setLoading(true);
		fetchProducts()
			.then((response) => {
				if (mounted) {
					console.log(response);
					setProducts(response.data);
					setLoading(false);
				}
			})
			.catch((error) => {
				console.log(error);
			});
		return () => {
			mounted = false;
		};
	}, []);
	React.useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user && cart && cart.length > 0) {
			localStorage.setItem('user', JSON.stringify({ ...user, cart }));
		}
	}, [cart]);
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
	const handleAddToCart = (e) => {
		const idProduct = e.target.getAttribute('data-id');
		const product = products.find((item) => item._id === idProduct);
		let addSuccess = false;
		if (user) {
			if (idProduct && product) {
				const sameSize = cart.find(
					(item) => item._id === product._id && item.sizeBuy === product.size[0]
				);
				const totalQuantity = cart
					.filter((item) => {
						return item._id === product._id;
					})
					.reduce((total, item) => {
						return total + item.quantityBuy;
					}, 0);
				if (cart && cart.length > 0 && sameSize) {
					const newCart = cart.map((item) => {
						if (
							item._id === product._id &&
							totalQuantity + 1 <= product.quantity &&
							item.sizeBuy === product.size[0]
						) {
							item.quantityBuy += 1;
						}
						return item;
					});
					setCart(newCart);
					addSuccess = true;
				} else {
					// khac size
					const notSameSize = cart.find(
						(item) => item._id === product._id && item.sizeBuy !== product.size[0]
					);
					if (cart && cart.length > 0 && notSameSize) {
						if (totalQuantity + 1 <= product.quantity) {
							setCart([
								...cart,
								{ ...product, sizeBuy: product.size[0], quantityBuy: totalQuantity + 1 },
							]);
							addSuccess = true;
						}
					}
					// chua co cart
					else {
						setCart([...cart, { ...product, sizeBuy: product.size[0], quantityBuy: 1 }]);
						addSuccess = true;
					}
				}
				if (addSuccess) {
					setToastMessage({
						show: true,
						title: 'success',
						message: 'Product add to cart successfully',
					});
				}
			} else {
				setToastMessage({
					show: true,
					title: 'error',
					message: 'Product not found',
				});
			}
		} else {
			setToastMessage({
				show: true,
				title: 'error',
				message: 'Please login to add product to cart',
			});
		}
	};
	return (
		<div className="container">
			{params ? (
				<ProductCard toastMessage={toastMessage} setToastMessage={setToastMessage}></ProductCard>
			) : !loading ? (
				<section className="grid grid-cols-1 gap-2 md:gap-3 lg:gap-5 md:grid-cols-3">
					{products.map((product, index) => {
						return (
							<Product
								key={index}
								product={product}
								handleAddToCart={handleAddToCart}
								cart={cart}
							></Product>
						);
					})}
				</section>
			) : (
				<Loading />
			)}
			{toastMessage?.show && (
				<ToastMessage
					mounted={toastMessage.show}
					title={toastMessage.title}
					message={toastMessage.message}
				></ToastMessage>
			)}
		</div>
	);
};

export default Products;
