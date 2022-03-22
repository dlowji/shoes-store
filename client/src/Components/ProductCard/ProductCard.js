import React from 'react';
import Button from '../Button/Button';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import getProduct from '../Products/getProduct';
const ProductCard = () => {
	const [product, setProduct] = React.useState({});
	const [loading, setLoading] = React.useState(false);
	const idFind = useParams().productId;
	React.useEffect(() => {
		setLoading(true);
		getProduct(idFind).then((response) => {
			if (response.data) {
				setProduct(response.data);
				setLoading(false);
			}
		});
	}, [idFind]);
	return (
		<div className="container">
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
							<form className="flex flex-col gap-y-5">
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
										defaultValue="0"
										className="w-10 border rounded-lg outline-none border-primary"
									></input>
								</div>
								<div className="flex items-center gap-4 ml-auto mr-auto md:mr-0">
									<Button text={'add to cart'} className={'flex items-center text-primary'}>
										<i className="fas fa-shopping-cart text-[14px] mr-2 text-primary"></i>
									</Button>
									<Button text={'Buy now'} className={'text-primary'}></Button>
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
