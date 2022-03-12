import axiosClient from './axiosClient';

const productsApi = {
	getAll: (params) => {
		const url = '/products';
		return axiosClient.get(url, { params });
	},
	get: (id) => {
		const url = `/products/${id}`;
		return axiosClient.get(url);
	},
	update: (id, data) => {
		const url = `/admin/product/update/${id}`;
		return axiosClient.put(url, data);
	},
	delete: (id) => {
		const url = `/admin/product/delete/${id}`;
		return axiosClient.delete(url);
	},
};

export default productsApi;
