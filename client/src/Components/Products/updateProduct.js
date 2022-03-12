import productsApi from '../../api/productsApi';

const updateProduct = async (id, data) => {
	try {
		const response = await productsApi.update(id, data);
		return response;
	} catch (error) {
		console.log(error);
	}
};
export default updateProduct;
