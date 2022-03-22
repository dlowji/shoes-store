import React from 'react';

const Cart = () => {
	return (
		<div className="container min-h-[100vh]">
			<div className="bg-secondary w-full min-h-[100px] rounded-lg">
				<div className="flex flex-col gap-2">
					<section className="flex flex-col justify-between gap-3 md:flex-row">
						<img
							// src={`${product.imgUrl ? product.imgUrl : ''}`}
							alt="product"
							className="md:w-[40%] lg:max-h-[450px] md:max-h-[400px] shrink-0 rounded-lg object-cover"
						/>
						<div className="flex flex-col md:w-[60%] py-8 px-4 bg-secondary rounded-xl">
							<h3 className="font-medium text-[16px] lg:text-[20px] leading-5 mb-2 text-truncate">
								{/* {product.name ? product.name : ''} */}
							</h3>
							<div className="flex items-center mt-4">
								<div className="flex gap-x-2 mr-2 text-[13px]">
									{/* {product.star &&
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
										})} */}
								</div>
								<span className="pl-2 text-sm border-l-2 border-primary">
									{/* Brand: <strong>{product.brand ? product.brand : ''}</strong> */}
								</span>
							</div>
							<div className="flex items-baseline gap-3 mt-4">
								<span className="text-base font-bold">Detail: </span>
								{/* <p className="text-base font-normal leading-5">{product.desc ? product.desc : ''}</p> */}
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
											{/* {product.size &&
											product.size.map((s, index) => {
												return (
													<option key={index} value={s}>
														{s}
													</option>
												);
											})} */}
										</select>
									</div>
								</form>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default Cart;
