import React from 'react';
import Button from '../Button/Button';
import { useParams } from 'react-router-dom';
import fetchProducts from '../Products/getProducts';
import Loading from '../Loading/Loading';
const ProductCard = () => {
	const [product, setProduct] = React.useState({});
	const [loading, setLoading] = React.useState(false);
	const idFind = useParams().productId;
	React.useLayoutEffect(() => {
		setLoading(true);
		fetchProducts().then((response) => {
			const productFind = response.data.find((product) => product._id === idFind);
			console.log(productFind);
			setProduct(productFind);
			setLoading(false);
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
								<i className="fa fa-star text-primary"></i>
								<i className="fa fa-star text-primary"></i>
								<i className="fa fa-star text-primary"></i>
								<i className="fa fa-star text-primary"></i>
								<i className="fa fa-star"></i>
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
								{/* <div className="flex items-center gap-4">
								<label htmlFor="quantity">Quantity</label>
								<input
									type="number"
									name="quantity"
									id="quantity"
									defaultValue={38}
									min="38"
									max="43"
									className="px-2 py-1 border rounded-lg outline-none border-primary"
								/>
							</div> */}
								<div className="flex items-center gap-4 ml-auto mr-auto md:mr-0">
									<Button text={'add to cart'} className={'flex items-center'}>
										<i className="fas fa-shopping-cart text-[14px] mr-2"></i>
									</Button>
									<Button text={'Buy now'} className={''}></Button>
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
