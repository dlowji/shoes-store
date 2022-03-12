import productsApi from '../../api/productsApi';

const getProduct = async (id) => {
	try {
		const response = await productsApi.get(id);
		return response;
	} catch (error) {
		console.log(error);
	}
};
export default getProduct;
