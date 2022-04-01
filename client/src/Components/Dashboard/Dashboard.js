import React from 'react';
import logo from '../../asset/logoWhite.png';
import Button from '../Button/Button';
import './Dashboard.css';
import fetchProducts from '../Products/getProducts';
import EditProduct from './EditProduct';
import AddProduct from './AddProduct';
import ModalBase from '../Portal/ModalBase';
import Loading from '../Loading/Loading';
import Confirm from '../Toast/Confirm';
import { useDashboardContext } from '../../contexts/dashboardContext';
import { useOutletContext } from 'react-router-dom';
import { useToastMessage } from '../../contexts/toastMessageContext';

const Dashboard = () => {
	const { activeSidebar, setActiveSidebar } = useOutletContext();
	const {
		products,
		setProducts,
		editProduct,
		setEditProduct,
		addProduct,
		setAddProduct,
		loading,
		setLoading,
		handleAddProduct,
		handleEditProduct,
		handleDeleteProduct,
		handleSearchInputChange,
		confirm,
		setConfirm,
		handleDelete,
	} = useDashboardContext();

	const { toastMessage } = useToastMessage();

	React.useEffect(() => {
		setLoading(true);
		let mouted = false;
		fetchProducts().then((response) => {
			if (!mouted) {
				setProducts(response.data);
				setLoading(false);
			}
		});
		return () => {
			mouted = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			className={`mb-[30px] mr-0 ml-0 px-2 md:px-5 transition-all duration-500 ease-in-out md:mx-auto max-w-[1400px]`}
		>
			<div className="w-full bg-primary h-[100px] rounded-xl mt-5 flex items-center justify-between p-4">
				<img src={logo} alt="logo" className="block object-cover" />
				<div className="flex-1 mx-5 overflow-hidden rounded-lg">
					<input
						type="search"
						name="searchInput"
						id="searchInput"
						placeholder="Search for products by name"
						className="w-full px-3 py-2 border-none outline-none text-primary"
						onChange={handleSearchInputChange}
					/>
				</div>
				<i
					className="cursor-pointer fa fa-bars text-secondary"
					onClick={() => setActiveSidebar(!activeSidebar)}
				></i>
			</div>
			<div
				className={`mt-5 ${
					!loading
						? 'grid gap-5 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4'
						: 'flex items-center justify-between'
				}`}
			>
				{!loading && products ? (
					<>
						{products.map((item, index) => {
							return (
								<div className="flex flex-col p-3 bg-secondary rounded-xl" key={`product-${index}`}>
									<h3 className="mb-3 text-base">{item.name}</h3>
									<img
										src={item.imgUrl}
										alt="imageProduct"
										className="object-cover w-full mt-auto h-[300px] rounded-xl"
									/>
									<div className="flex flex-col">
										<Button
											text="Edit product"
											className="mt-3 text-primary"
											data-id={item._id}
											onClick={handleEditProduct}
											disabled={toastMessage.show}
										></Button>
										<Button
											text="Delete product"
											className="mt-3 text-primary"
											data-id={item._id}
											onClick={handleDeleteProduct}
											disabled={toastMessage.show}
										></Button>
									</div>
								</div>
							);
						})}
						<div
							className="fixed w-[50px] h-[50px] flex items-center justify-center bottom-0 left-0 mb-5 ml-5 bg-primary rounded-xl text-secondary cursor-pointer"
							onClick={handleAddProduct}
						>
							<i className="pointer-events-none fa-solid fa-plus text-[30px]"></i>
						</div>
					</>
				) : (
					<Loading></Loading>
				)}
			</div>
			<ModalBase visible={addProduct} onClose={() => setAddProduct(false)}>
				<AddProduct />
			</ModalBase>
			<ModalBase visible={editProduct} onClose={() => setEditProduct(false)}>
				<EditProduct />
			</ModalBase>
			<Confirm
				visible={confirm.show}
				onClose={() => setConfirm({ show: false, id: '' })}
				handleDelete={handleDelete}
			></Confirm>
		</div>
	);
};

export default Dashboard;
