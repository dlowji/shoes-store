import productsApi from '../../api/productsApi';

const deleteProduct = async (id) => {
	try {
		const response = await productsApi.delete(id);
		return response;
	} catch (error) {
		console.log(error);
	}
};
export default deleteProduct;
