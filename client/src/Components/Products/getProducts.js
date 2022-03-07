import productsApi from '../../api/productsApi';

const fetchProducts = async () => {
	try {
		const response = await productsApi.getAll();
		return response;
	} catch (error) {
		console.log(error);
	}
};
export default fetchProducts;
