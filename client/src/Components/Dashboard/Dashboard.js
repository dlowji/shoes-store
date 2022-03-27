import React from 'react';
import logo from '../../asset/logoWhite.png';
import Button from '../Button/Button';
import { useOutletContext } from 'react-router-dom';
import './Dashboard.css';
import fetchProducts from '../Products/getProducts';
import EditProduct from './EditProduct';
import AddProduct from './AddProduct';
import ModalBase from '../Portal/ModalBase';
import deleteProduct from '../Products/deleteProduct';
import Loading from '../Loading/Loading';
import getProduct from '../Products/getProduct';
import searchProducts from '../Admin/searchProducts';
import { debounce } from 'lodash';
import ToastMessage from '../Toast/ToastMessage';
import Confirm from '../Toast/Confirm';

const Dashboard = () => {
	const { activeSidebar, setActiveSidebar } = useOutletContext();
	const [products, setProducts] = React.useState([]);
	const [editProduct, setEditProduct] = React.useState(false);
	const [addProduct, setAddProduct] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [product, setProduct] = React.useState({});
	const [toastMessage, setToastMessage] = React.useState({
		show: false,
		title: '',
		message: '',
	});
	const [confirm, setConfirm] = React.useState({
		show: false,
		idDelete: '',
	});
	const handleAddProduct = () => {
		setAddProduct(true);
	};
	const handleEditProduct = (e) => {
		const idProduct = e.target.dataset.id;
		getProduct(idProduct).then((response) => {
			if (response.data) {
				setProduct(response.data);
				console.log(response.data);
				setEditProduct(true);
			}
		});
	};
	const handleDeleteProduct = (e) => {
		setConfirm({
			show: true,
			idDelete: e.target.dataset.id,
		});
	};
	const handleDelete = () => {
		deleteProduct(confirm.idDelete).then((response) => {
			if (response.data.deletedCount === 1) {
				setConfirm({ show: false, isDeleted: '' });
				setToastMessage({
					show: true,
					title: 'success',
					message: 'Product deleted successfully',
				});
				fetchProducts().then((response) => {
					setProducts(response.data);
				});
			} else {
				setConfirm({ show: false, isDeleted: '' });
				setToastMessage({
					show: true,
					title: 'error',
					message: 'Product not deleted',
				});
			}
		});
	};
	const handleSearchInputChange = debounce((e) => {
		if (!e.target.value) {
			fetchProducts().then((response) => {
				setProducts(response.data);
			});
		} else {
			searchProducts(e.target.value).then((response) => {
				console.log(response);
				if (response.data && response.data.length > 0) {
					setProducts(response.data);
				}
			});
		}
	}, 500);
	React.useEffect(() => {
		setLoading(true);
		fetchProducts().then((response) => {
			setProducts(response.data);
			setLoading(false);
		});
	}, []);
	React.useEffect(() => {
		if (toastMessage.show) {
			setTimeout(() => {
				setToastMessage({
					show: false,
					title: '',
					message: '',
				});
			}, 3000);
		}
	}, [toastMessage.show]);
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
				<AddProduct
					setAddProduct={setAddProduct}
					setProducts={setProducts}
					setToastMessage={setToastMessage}
				/>
			</ModalBase>
			<ModalBase visible={editProduct} onClose={() => setEditProduct(false)}>
				<EditProduct
					setEditProduct={setEditProduct}
					setProducts={setProducts}
					product={product}
					setToastMessage={setToastMessage}
				/>
			</ModalBase>
			<Confirm
				visible={confirm.show}
				onClose={() => setConfirm({ show: false, idDelete: '' })}
				handleDelete={handleDelete}
			></Confirm>
			{toastMessage?.show && (
				<ToastMessage
					mounted={toastMessage.show}
					title={toastMessage.title}
					message={toastMessage.message}
				></ToastMessage>
			)}
		</div>
	);
};

export default Dashboard;
