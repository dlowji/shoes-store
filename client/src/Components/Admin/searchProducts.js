import productsApi from '../../api/productsApi';
const searchProducts = async (name) => {
	console.log(name);
	try {
		const response = await productsApi.search(name);
		return response;
	} catch (error) {
		console.log(error);
	}
};
export default searchProducts;
