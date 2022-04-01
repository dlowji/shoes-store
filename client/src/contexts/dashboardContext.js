import { createContext, useContext, useState } from 'react';
import { debounce } from 'lodash';
import getProduct from '../Components/Products/getProduct';
import deleteProduct from '../Components/Products/deleteProduct';
import fetchProducts from '../Components/Products/getProducts';
import searchProducts from '../Components/Admin/searchProducts';
import { useToastMessage } from './toastMessageContext';
const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
	const [products, setProducts] = useState([]);
	const [editProduct, setEditProduct] = useState(false);
	const [addProduct, setAddProduct] = useState(false);
	const [loading, setLoading] = useState(false);
	const [product, setProduct] = useState({});
	const [confirm, setConfirm] = useState({
		show: false,
		idDelete: '',
		sizeDelete: '',
	});

	const { toastMessage, setToastMessage } = useToastMessage();
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
			sizeDelete: e.target.dataset.sizeBuy,
		});
	};
	const handleDelete = () => {
		deleteProduct(confirm.idDelete).then((response) => {
			if (response.data.deletedCount === 1) {
				console.log(toastMessage);
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
	return (
		<DashboardContext.Provider
			value={{
				products,
				setProducts,
				editProduct,
				setEditProduct,
				addProduct,
				setAddProduct,
				loading,
				setLoading,
				product,
				setProduct,
				confirm,
				setConfirm,
				handleAddProduct,
				handleEditProduct,
				handleDeleteProduct,
				handleSearchInputChange,
				handleDelete,
			}}
		>
			{children}
		</DashboardContext.Provider>
	);
};

const useDashboardContext = () => {
	const context = useContext(DashboardContext);
	if (typeof context === 'undefined') {
		throw new Error('useDashboardContext must be used within a DashboardProvider');
	}
	return context;
};

export { DashboardProvider, useDashboardContext };
