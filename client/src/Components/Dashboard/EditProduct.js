import React, { useState } from 'react';
import Button from '../Button/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../Form/Input/Input';
import TextArea from '../Form/TextArea/TextArea';
import './Product.css';
import fetchProducts from '../Products/getProducts';
import { useDashboardContext } from '../../contexts/dashboardContext';
import { useToastMessage } from '../../contexts/toastMessageContext';

const EditProduct = () => {
	const { setEditProduct, setProducts, product } = useDashboardContext();
	const { setToastMessage } = useToastMessage();
	const [selectedImage, setSelectedImage] = useState(product.imgUrl);

	const scheme = yup
		.object({
			nameProduct: yup.string().required('Name is required'),
			brandProduct: yup.string().required('Brand is required'),
			priceProduct: yup.number().typeError('Price must be a number').required('Price is required'),
			starProduct: yup
				.number()
				.typeError('Star must be a number')
				.oneOf([0, 1, 2, 3, 4, 5], 'Star must be in range 0 to 5')
				.required('Star is required'),
			descriptionProduct: yup.string().required('Description is required'),
		})
		.required();
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			nameProduct: product.name,
			brandProduct: product.brand,
			priceProduct: product.price,
			starProduct: product.star,
			descriptionProduct: product.desc,
		},
		resolver: yupResolver(scheme),
	});

	const onSubmitHandler = (values) => {
		console.log(values);
		let form = new FormData();
		form.append('nameProduct', values.nameProduct);
		form.append('brandProduct', values.brandProduct);
		form.append('priceProduct', values.priceProduct);
		form.append('starProduct', values.starProduct);
		form.append('descriptionProduct', values.descriptionProduct);
		if (selectedImage !== product.imgUrl) {
			form.append('imageProduct', selectedImage);
		}
		console.log(form);
		fetch(`http://localhost:5555/admin/product/update/${product._id}`, {
			method: 'PUT',
			body: form,
		})
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					setEditProduct(false);
					setToastMessage({
						show: true,
						title: 'success',
						message: 'Product updated successfully',
					});
					fetchProducts().then((response) => {
						setProducts(response.data);
					});
				}
			})
			.catch(() => {
				setToastMessage({
					show: true,
					title: 'error',
					message: 'Product updated false',
				});
			});
	};
	return (
		<div className="w-full max-w-[600px] mx-auto bg-secondary p-2 max-h-[750px] h-full overflow-auto rounded-xl flex flex-col justify-center">
			<h2 className="mb-3 text-2xl font-bold text-center uppercase text-third">Edit Product</h2>
			<form autoComplete="off" onSubmit={handleSubmit(onSubmitHandler)}>
				<div className="flex flex-col gap-2">
					<label htmlFor="nameProduct">Name</label>
					<Input
						type="text"
						name="nameProduct"
						id="nameProduct"
						placeholder="Enter the name"
						control={control}
					></Input>
					<p className="text-[#E74C3C] text-sm font-bold h-5 relative -top-2">
						{errors.nameProduct ? errors.nameProduct?.message : ''}
					</p>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="brandProduct">Brand</label>
					<Input
						type="text"
						name="brandProduct"
						id="brandProduct"
						placeholder="Enter the brand"
						control={control}
					></Input>
					<p className="text-[#E74C3C] text-sm font-bold h-5 relative -top-2">
						{errors.brandProduct ? errors.brandProduct?.message : ''}
					</p>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="priceProduct">Price</label>
					<Input
						type="text"
						name="priceProduct"
						id="priceProduct"
						placeholder="Enter the price"
						control={control}
					></Input>
					<p className="text-[#E74C3C] text-sm font-bold h-5 relative -top-2">
						{errors.priceProduct ? errors.priceProduct?.message : ''}
					</p>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="priceProduct">Star</label>
					<Input
						type="number"
						name="starProduct"
						id="starProduct"
						placeholder="Enter the star"
						control={control}
					></Input>
					<p className="text-[#E74C3C] text-sm font-bold h-5 relative -top-2">
						{errors.starProduct ? errors.starProduct?.message : ''}
					</p>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="descriptionProduct">Description</label>
					<TextArea
						name="descriptionProduct"
						id="descriptionProduct"
						placeholder="Enter the description"
						defaultValue={product.desc}
						control={control}
					></TextArea>
					<p className="text-[#E74C3C] text-sm font-bold h-5 -top-2">
						{errors.descriptionProduct ? errors.descriptionProduct?.message : ''}
					</p>
				</div>
				<div className="flex items-stretch gap-4">
					<label htmlFor="imageProduct">Image</label>
					<input
						type="file"
						id="imageProduct"
						name="imageProduct"
						className="outline-none custom-file-input"
						onChange={(event) => {
							console.log(event.target.files[0]);
							setSelectedImage(event.target.files[0]);
						}}
					/>
					{selectedImage && (
						<img
							alt="not found"
							className="w-[200px] h-[80px] object-cover rounded-lg"
							src={
								typeof selectedImage === 'string'
									? selectedImage
									: URL.createObjectURL(selectedImage)
							}
						/>
					)}
				</div>
				<Button
					text={'Finish'}
					type="submit"
					className={
						'mt-3 bg-primary text-secondary font-bold normal-case hover:opacity-90 transition-all w-full'
					}
				></Button>
			</form>
		</div>
	);
};

export default EditProduct;
