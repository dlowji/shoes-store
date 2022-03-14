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

const Dashboard = () => {
	const { activeSidebar, setActiveSidebar } = useOutletContext();
	const [products, setProducts] = React.useState([]);
	const [editProduct, setEditProduct] = React.useState(false);
	const [addProduct, setAddProduct] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [product, setProduct] = React.useState({});
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
		const idProduct = e.target.dataset.id;
		deleteProduct(idProduct).then((response) => {
			if (response.data.deletedCount === 1) {
				fetchProducts().then((response) => {
					setProducts(response.data);
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
	return (
		<div
			className={`mb-[30px] mr-0 ml-0 px-5 transition-all duration-500 ease-in-out md:mx-auto max-w-[1400px]`}
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
				{!loading ? (
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
										></Button>
										<Button
											text="Delete product"
											className="mt-3 text-primary"
											data-id={item._id}
											onClick={handleDeleteProduct}
										></Button>
									</div>
								</div>
							);
						})}
						<div
							className="flex flex-col items-center justify-center p-3 cursor-pointer bg-secondary rounded-xl min-h-[400px]"
							onClick={handleAddProduct}
						>
							<i className="fa-solid fa-plus text-[50px]"></i>
						</div>
					</>
				) : (
					<Loading></Loading>
				)}
			</div>
			<ModalBase visible={addProduct} onClose={() => setAddProduct(false)}>
				<AddProduct setAddProduct={setAddProduct} setProducts={setProducts} />
			</ModalBase>
			<ModalBase visible={editProduct} onClose={() => setEditProduct(false)}>
				<EditProduct setEditProduct={setEditProduct} setProducts={setProducts} product={product} />
			</ModalBase>
		</div>
	);
};

export default Dashboard;
