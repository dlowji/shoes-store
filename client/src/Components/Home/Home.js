import React from 'react';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import getProductsLimit from '../Products/getProductsLimit';
import './home.css';
import SliderCard from './SliderCard';

const Home = () => {
	const [loading, setLoading] = React.useState(false);
	const [products, setProducts] = React.useState(null);
	const navigate = useNavigate();
	React.useEffect(() => {
		setLoading(true);
		getProductsLimit(10).then((response) => {
			console.log(response);
			if (response.data && response.data.length > 0) {
				setProducts(response.data);
				setLoading(false);
			}
		});
	}, []);
	const handleClick = (e) => {
		const idProduct = e.target.dataset.id;
		navigate(`/products/${idProduct}`);
	};
	return (
		<div className="container">
			{!loading && products && products.length > 0 ? (
				<section className="flex flex-col md:grid grid-rows-[220px,220px,440px] grid-cols-4 gap-3">
					<div className="h-[250px] md:h-[450px] w-full rounded-xl overflow-hidden col-start-1 col-end-3 row-start-1 row-end-3 card">
						<img className="object-cover w-full h-full" src={products[0].imgUrl} alt="" />
						<div className="card-content">
							<h2 className="mb-2 text-xl font-semibold text-secondary">Best seller 2020</h2>
							<Button
								text={'Detail'}
								className="bg-transparent"
								onClick={handleClick}
								data-id={products[0]._id}
							></Button>
						</div>
					</div>
					<div className="h-[750px] md:h-[450px] rounded-xl overflow-hidden col-start-3 col-end-5 row-start-1 row-end-3 flex flex-col md:grid grid-rows-2 grid-cols-2 gap-3">
						<div className="w-full col-start-1 col-end-2 row-start-1 row-end-2 overflow-hidden rounded-xl card">
							<img className="object-cover w-full h-full" src={products[1].imgUrl} alt="" />
							<div className="card-content">
								<h2 className="mb-2 text-xl font-semibold text-secondary">Spring 2021</h2>
								<Button
									text={'Detail'}
									className="bg-transparent"
									onClick={handleClick}
									data-id={products[1]._id}
								></Button>
							</div>
						</div>
						<div className="col-start-2 col-end-3 row-start-1 row-end-2 overflow-hidden rounded-xl card">
							<img className="object-cover w-full h-full" src={products[2].imgUrl} alt="" />
							<div className="card-content">
								<h2 className="mb-2 text-xl font-semibold text-secondary">Summer 2021</h2>
								<Button
									text={'Detail'}
									className="bg-transparent"
									onClick={handleClick}
									data-id={products[2]._id}
								></Button>
							</div>
						</div>
						<div className="col-start-1 col-end-3 row-start-2 row-end-3 overflow-hidden rounded-xl card">
							<img className="object-cover w-full h-full" src={products[3].imgUrl} alt="" />
							<div className="card-content">
								<h2 className="mb-2 text-xl font-semibold text-secondary">Winter 2021</h2>
								<Button
									text={'Detail'}
									className="bg-transparent"
									onClick={handleClick}
									data-id={products[3]._id}
								></Button>
							</div>
						</div>
					</div>
					<div className="h-[250px] md:h-[450px] w-full rounded-xl col-start-1 col-end-5 row-start-3 row-end-4">
						<SliderCard products={products.slice(4)} handleClick={handleClick}></SliderCard>
					</div>
				</section>
			) : (
				<Loading></Loading>
			)}
		</div>
	);
};

export default Home;
