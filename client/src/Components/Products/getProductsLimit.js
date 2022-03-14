import productsApi from '../../api/productsApi';

const getProductsLimit = async (quantity) => {
	try {
		const response = await productsApi.getQuantity(quantity);
		return response;
	} catch (error) {
		console.log(error);
	}
};
export default getProductsLimit;
