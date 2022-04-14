import React from 'react';
import { useDashboardContext } from '../../contexts/dashboardContext';
import { useToastMessage } from '../../contexts/toastMessageContext';
import { useUserContext } from '../../contexts/userContext';
import Button from '../Button/Button';
import Confirm from '../Toast/Confirm';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
	const { cart, setCart } = useUserContext();
	const { setToastMessage } = useToastMessage();
	const { confirm, setConfirm } = useDashboardContext();
	const navigate = useNavigate();
	React.useEffect(() => {
		setConfirm({
			show: false,
			idDelete: '',
			sizeDelete: '',
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cart]);

	const handleBuy = () => {
		if (cart && cart.length > 0) {
			setToastMessage({
				show: true,
				title: 'error',
				message: 'This function is not available',
			});
			navigate('*');
		}
	};
	const handleDelete = () => {
		const newCart = cart.filter((item) => {
			if (item._id === confirm.idDelete) {
				if (item.sizeBuy === confirm.sizeDelete) {
					return false;
				}
			}
			return true;
		});
		setCart(newCart);
		setToastMessage({
			show: true,
			title: 'success',
			message: 'Delete product success',
		});
	};
	const handleRemoveItem = (e) => {
		setConfirm({
			show: true,
			idDelete: e.target.getAttribute('data-id'),
			sizeDelete: e.target.getAttribute('data-sizebuy'),
		});
	};
	return (
		<div className="container min-h-[100vh] flex flex-col gap-3">
			{cart && cart.length > 0 ? (
				cart.map((product, index) => {
					return (
						<div className="relative w-full rounded-lg bg-secondary" key={index}>
							<div
								className="absolute px-3 py-2 rounded-lg cursor-pointer top-3 right-3 bg-primary"
								data-id={product._id}
								data-sizebuy={product.sizeBuy}
								onClick={handleRemoveItem}
							>
								<i className="pointer-events-none fa fa-times text-secondary"></i>
							</div>
							<div className="flex flex-col gap-2">
								<section className="flex flex-col justify-between p-5 md:flex-row">
									<img
										src={`${product.imgUrl ? product.imgUrl : ''}`}
										alt="product"
										className="md:w-[40%] lg:max-h-[350px] md:max-h-[300px] shrink-0 rounded-lg object-cover"
									/>
									<div className="flex flex-col md:w-[60%] p-4 bg-secondary rounded-xl">
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
																	className={`fa fa-star ${
																		item <= product.star ? 'text-primary' : ''
																	}`}
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
											<p className="text-base font-normal leading-5">
												{product.desc ? product.desc : ''}
											</p>
										</div>
										<div className="mt-4">
											<form className="flex flex-col gap-y-5">
												<div className="flex items-center gap-4">
													<label htmlFor="size" className="font-bold">
														Size
													</label>
													<div
														name="size"
														id="size"
														className="p-2 text-center border rounded-lg border-primary"
													>
														{product.sizeBuy ? product.sizeBuy : ''}
													</div>
												</div>
												<div className="flex items-center gap-4">
													<label htmlFor="quantity" className="font-bold">
														Quantity
													</label>
													<div
														name="quantity"
														id="quantity"
														className="px-2 py-1 text-center border rounded-lg select-none border-primary"
													>
														{product.quantityBuy ? product.quantityBuy : ''}
													</div>
												</div>
												<div className="flex items-center gap-4">
													<label htmlFor="price" className="font-bold">
														Price
													</label>
													<div
														name="price"
														id="price"
														className="px-2 py-1 text-center border rounded-lg select-none border-primary"
													>
														{product.price
															? product.price.toLocaleString('it-IT', {
																	style: 'currency',
																	currency: 'VND',
															  })
															: ''}
													</div>
												</div>
												<div className="flex items-center gap-4">
													<span className="ml-auto text-lg lg:text-2xl">
														<strong>
															{(product.price * product.quantityBuy).toLocaleString('it-IT', {
																style: 'currency',
																currency: 'VND',
															})}
														</strong>
													</span>
												</div>
											</form>
										</div>
									</div>
								</section>
							</div>
						</div>
					);
				})
			) : (
				<h2 className="text-2xl font-bold text-center">
					Please login and add product to see the cart
				</h2>
			)}
			{cart && cart.length > 0 ? (
				<Button
					text={'Buy now'}
					className="w-full py-[15px_!important] text-2xl bg-primary text-secondary hover:bg-secondary hover:text-primary"
					onClick={handleBuy}
				></Button>
			) : (
				''
			)}
			<Confirm
				visible={confirm.show}
				onClose={() => setConfirm({ show: false, idDelete: '', sizeDelete: '' })}
				handleDelete={handleDelete}
			></Confirm>
		</div>
	);
};

export default Cart;
