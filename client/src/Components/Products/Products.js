import React from 'react';
import Product from './Product';
import './Products.css';
import { useParams } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import fetchProducts from './getProducts';
import Loading from '../Loading/Loading';

const Products = () => {
	const [products, setProducts] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [cart, setCart] = React.useState([]);
	const params = useParams().productId;
	React.useEffect(() => {
		setLoading(true);
		fetchProducts().then((response) => {
			console.log(response);
			setProducts(response.data);
			setLoading(false);
		});
	}, []);
	return (
		<div className="container">
			{params ? (
				<ProductCard></ProductCard>
			) : !loading ? (
				<section className="grid grid-cols-1 gap-5 md:grid-cols-3">
					{products.map((product, index) => {
						return (
							<Product
								key={index}
								id={product._id}
								name={product.name}
								price={product.price}
								imgUrl={product.imgUrl}
								brand={product.brand}
								size={product.size}
								star={product.star}
							></Product>
						);
					})}
				</section>
			) : (
				<Loading />
			)}
		</div>
	);
};

export default Products;
