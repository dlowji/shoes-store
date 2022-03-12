import React, { useState } from 'react';
import Button from '../Button/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../Form/Input/Input';
import TextArea from '../Form/TextArea/TextArea';
import './Product.css';

const EditProduct = () => {
	const [selectedImage, setSelectedImage] = useState(null);
	const [product, setProduct] = useState({});
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
	} = useForm({
		defaultValues: { nameProduct: '', brandProduct: '', priceProduct: '', descriptionProduct: '' },
		resolver: yupResolver(scheme),
	});

	const onSubmitHandler = (values) => {
		console.log(values);
	};

	return (
		<div className="w-full max-w-[600px] mx-auto bg-secondary px-3 py-5 rounded-xl flex flex-col justify-center">
			<h2 className="mb-3 text-2xl font-bold text-center uppercase text-third">Edit Product</h2>
			<form autoComplete="off" onSubmit={handleSubmit(onSubmitHandler)}>
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
						onChange={(event) => {
							console.log(event.target.files[0]);
							setSelectedImage(event.target.files[0]);
						}}
					/>
					{selectedImage && (
						<img alt="not found" width={'150px'} src={URL.createObjectURL(selectedImage)} />
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
