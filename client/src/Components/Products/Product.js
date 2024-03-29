import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

const Product = ({ product, handleAddToCart }) => {
	const { _id, name, price, imgUrl, brand, size, star, quantity } = product;
	const navigate = useNavigate();
	const handleClick = () => {
		console.log(_id);
		navigate(`${_id}`);
	};

	return (
		<div className="flex flex-col shadow-xl rounded-xl">
			<img
				src={imgUrl}
				className="w-[100%] h-[200px] lg:h-[250px] shrink-0 object-cover rounded-t-xl"
				alt=""
			/>
			<div className="flex flex-col flex-1 p-2 bg-secondary rounded-b-xl">
				<h3 className="font-medium text-[16px] lg:text-[20px] leading-5 mb-2 text-truncate">
					{name}
				</h3>
				<div className="flex flex-col gap-1 mt-auto">
					<span className="flex gap-2 text-md">
						Size: <strong className="uppercase">{size[0]}</strong>
						Quantity: <strong className="uppercase">{quantity}</strong>
					</span>

					<span className="ml-auto text-lg lg:text-xl">
						<strong>{price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</strong>
					</span>
					<div className="flex items-center text-md">
						<span className="flex gap-2">
							Brand: <strong>{brand}</strong>
						</span>
						<div className="flex gap-x-2 ml-auto text-[13px]">
							{star &&
								Array(5)
									.fill(0)
									.map((_, i) => i + 1)
									.map((item, index) => {
										return (
											<i
												key={index}
												className={`fa fa-star ${item <= star ? 'text-primary' : ''}`}
											></i>
										);
									})}
						</div>
					</div>
				</div>
				<div className="flex mt-2">
					<Button
						text={'add to cart'}
						className={'lg:ml-auto flex items-center text-primary'}
						onClick={handleAddToCart}
						data-id={_id}
					>
						<i className="fas fa-shopping-cart text-[14px] mr-2"></i>
					</Button>
					<button
						onClick={handleClick}
						className={
							'rounded-xl text-primary font-semibold capitalize border border-primary bg-secondary lg:px-4 lg:py-2 px-3 py-1 inline-block hover:text-secondary hover:bg-primary transition-colors lg:ml-2 ml-auto'
						}
					>
						Detail
					</button>
				</div>
			</div>
		</div>
	);
};

export default Product;
