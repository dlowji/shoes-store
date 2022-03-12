import React, { useState, useRef } from 'react';
import Button from '../Button/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../Form/Input/Input';
import TextArea from '../Form/TextArea/TextArea';
import './Product.css';
import fetchProducts from '../Products/getProducts';

const AddProduct = ({ setAddProduct, setProducts }) => {
	const [selectedImage, setSelectedImage] = useState(null);
	const form = useRef(null);

	const scheme = yup
		.object({
			nameProduct: yup.string().required('Name is required'),
			brandProduct: yup.string().required('Brand is required'),
			priceProduct: yup.number().typeError('Price must be a number').required('Price is required'),
			descriptionProduct: yup.string().required('Description is required'),
		})
		.required();
	const {
		handleSubmit,
		control,
		formState: { errors },
		register,
	} = useForm({
		defaultValues: {
			nameProduct: '',
			brandProduct: '',
			priceProduct: '',
			descriptionProduct: '',
			imageProduct: '',
		},
		resolver: yupResolver(scheme),
	});

	const onSubmitHandler = (values) => {
		let form = new FormData();
		form.append('nameProduct', values.nameProduct);
		form.append('brandProduct', values.brandProduct);
		form.append('priceProduct', values.priceProduct);
		form.append('descriptionProduct', values.descriptionProduct);
		form.append('imageProduct', selectedImage);
		fetch('http://localhost:5555/admin/product/create', {
			method: 'POST',
			body: form,
		})
			.then((res) => res.text())
			.then((res) => {
				if (JSON.parse(res).data) {
					setAddProduct(false);
					fetchProducts().then((response) => {
						setProducts(response.data);
					});
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="w-full max-w-[600px] mx-auto bg-secondary px-3 py-5 rounded-xl flex flex-col justify-center">
			<h2 className="mb-3 text-2xl font-bold text-center uppercase text-third">Add Product</h2>
			<form
				autoComplete="off"
				ref={form}
				onSubmit={handleSubmit(onSubmitHandler)}
				encType="multipart/form-data"
			>
				<div className="flex flex-col gap-2">
					<label htmlFor="nameProduct">Name</label>
					<Input
						type="text"
						name="nameProduct"
						id="nameProduct"
						placeholder="Enter your user name"
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
						placeholder="Enter your user name"
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
						placeholder="Enter your user name"
						control={control}
					></Input>
					<p className="text-[#E74C3C] text-sm font-bold h-5 relative -top-2">
						{errors.priceProduct ? errors.priceProduct?.message : ''}
					</p>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="descriptionProduct">Description</label>
					<TextArea
						name="descriptionProduct"
						id="descriptionProduct"
						placeholder="Enter your message"
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
						{...register('imageProduct')}
						onChange={(event) => {
							console.log(event.target.files[0]);
							setSelectedImage(event.target.files[0]);
						}}
					/>
					{selectedImage && (
						<img
							alt="not found"
							className="w-[150px] h-[150px] object-cover rounded-lg"
							src={URL.createObjectURL(selectedImage)}
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

export default AddProduct;
