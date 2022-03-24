import React from 'react';
import Button from '../Button/Button';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import getProduct from '../Products/getProduct';
const ProductCard = ({ cart, setCart }) => {
	const [product, setProduct] = React.useState({});
	const [loading, setLoading] = React.useState(false);
	const idFind = useParams().productId;
	React.useEffect(() => {
		let mounted = true;
		setLoading(true);
		getProduct(idFind)
			.then((response) => {
				if (response.data && mounted) {
					setProduct(response.data);
					setLoading(false);
				}
			})
			.catch((error) => {
				console.log(error);
			});
		return () => {
			mounted = false;
		};
	}, [idFind]);
	React.useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user && cart && cart.length > 0) {
			localStorage.setItem('user', JSON.stringify({ ...user, cart }));
		}
	}, [cart]);
	const handleAddToCart = (e) => {
		e.preventDefault();
		const sizeBuy = e.target.querySelector('select').value;
		const quantityBuy = parseInt(e.target.querySelector('input[type="number"]').value);
		if (sizeBuy && quantityBuy && quantityBuy > 0) {
			const sameSize = cart.find((item) => item._id === product._id && item.sizeBuy === sizeBuy);
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
						totalQuantity + quantityBuy <= product.quantity &&
						item.sizeBuy === sizeBuy
					) {
						item.quantityBuy += quantityBuy;
					}
					return item;
				});
				setCart(newCart);
			} else {
				// khac size
				const notSameSize = cart.find(
					(item) => item._id === product._id && item.sizeBuy !== sizeBuy
				);
				if (cart && cart.length > 0 && notSameSize) {
					if (totalQuantity + quantityBuy <= product.quantity) {
						setCart([...cart, { ...product, sizeBuy, quantityBuy }]);
					}
				}
				// chua co cart
				else {
					setCart([...cart, { ...product, sizeBuy, quantityBuy }]);
				}
			}
		}
	};
	return (
		<div className="container min-h-[100vh]">
			{!loading ? (
				<section className="flex flex-col justify-between gap-3 md:flex-row">
					<img
						src={`${product.imgUrl ? product.imgUrl : ''}`}
						alt="product"
						className="md:w-[40%] lg:max-h-[450px] md:max-h-[400px] shrink-0 rounded-lg object-cover"
					/>
					<div className="flex flex-col md:w-[60%] py-8 px-4 bg-secondary rounded-xl">
						<h3 className="font-medium text-[16px] lg:text-[20px] leading-5 mb-2 text-truncate">
							{product.name ? product.name : ''}
						</h3>
						<div className="flex items-center mt-4">
							<div className="flex gap-x-2 mr-2 text-[13px]">
								{product.star &&
									Array(5)
										.fill(0)
										.map((_, i) => i + 1)
										.map((item, index) => {
											return (
												<i
													key={index}
													className={`fa fa-star ${item <= product.star ? 'text-primary' : ''}`}
												></i>
											);
										})}
							</div>
							<span className="pl-2 text-sm border-l-2 border-primary">
								Brand: <strong>{product.brand ? product.brand : ''}</strong>
							</span>
						</div>
						<div className="flex items-baseline gap-3 mt-4">
							<span className="text-base font-bold">Detail: </span>
							<p className="text-base font-normal leading-5">{product.desc ? product.desc : ''}</p>
						</div>
						<div className="mt-4">
							<form className="flex flex-col gap-y-5" onSubmit={handleAddToCart}>
								<div className="flex items-center gap-4">
									<label htmlFor="size" className="font-bold">
										Size
									</label>
									<select
										name="size"
										id="size"
										className="border rounded-lg outline-none border-primary"
									>
										{product.size &&
											product.size.map((s, index) => {
												return (
													<option key={index} value={s}>
														{s}
													</option>
												);
											})}
									</select>
								</div>
								<div className="flex items-center gap-4">
									<label htmlFor="Quantity" className="font-bold">
										Quantity
									</label>
									<input
										name="Quantity"
										id="Quantity"
										type="number"
										min="0"
										max={product.quantity ? product.quantity : 0}
										defaultValue="0"
										className="w-10 text-center border rounded-lg outline-none border-primary"
									></input>
								</div>
								<div className="flex items-center gap-4 ml-auto mr-auto md:mr-0">
									<Button
										text={'add to cart'}
										type="submit"
										className={'flex items-center text-primary btn-cart'}
									>
										<i className="fas fa-shopping-cart text-[14px] mr-2 text-[currentColor] btn-buy"></i>
									</Button>
									<Button type="button" text={'Buy now'} className={'text-primary'}></Button>
								</div>
							</form>
						</div>
					</div>
				</section>
			) : (
				<Loading />
			)}
		</div>
	);
};

export default ProductCard;
