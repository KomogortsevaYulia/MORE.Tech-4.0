import * as React from "react";
import { IProduct } from "../../../api/mainApi";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { fetchProducts } from "../../../store/marketSlice/marketSlice";
import ShopItem from "./ShopItem";
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "../Market.module.scss";
import {  Dropdown, Space } from "antd";



export default function Shop() {
  const dispatch = useAppDispatch();

  const { cart } = useAppSelector((state) => state.market);
  const { products } = useAppSelector((state) => state.market);

  const [filteredProducts, setFilteredProducts] = React.useState(products);

  const [maxPrice, setMaxPrice] = React.useState(1);

  React.useEffect(() => {
	if(cart){
	}
  }, [cart]);


  React.useEffect(() => {
    if (products) {
      setMaxPrice(Math.max(...products!.map((item) => item.priceRuble)));
      setPriceMax(maxPrice);
      setFilteredProducts(products);
    }
  }, [products]);

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const filterProducts = () => {
    if (products) {
		if (priceMax === 0){
			setPriceMax(maxPrice);
		}

		setFilteredProducts(
			products!.filter(function (el: IProduct) {
			return el.priceRuble >= priceMin && el.priceRuble <= priceMax;
			})
		);
    }
  };

  const [priceMin, setPriceMin] = React.useState(0);
  const handleChangePriceMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMin(Number(event.target.value));
  };

  const [priceMax, setPriceMax] = React.useState(maxPrice);
  const handleChangePriceMax = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMax(Number(event.target.value));
  };

  React.useEffect(() => {
    if (maxPrice) {
      setPriceMax(maxPrice);
    }
  }, [maxPrice]);

  React.useEffect(() => {
    filterProducts();
  }, [priceMin, priceMax]);


  const menu = (
		<div className={`card bg-primary text-white rounded-3`}>
			<div className="card-body">

				<div className={` ${styles.cartCard} overflow-auto block`}>
					{cart && cart?.map((item) =>(
						<div className={`${styles.cartItem} mb-3 p-2 rounded `} > 
							<div className="d-flex justify-content-between">
								<div className="d-flex flex-row align-items-center justify-content-between w-100">
									<div>
										<img src={item.product.image} className="rounded-3 me-2" style={{ width: "65px" }} alt="Shopping item" />
									</div>

									<div className="flex-row d-flex ">
										<div>
											<p className="small mb-0 text-dark">Название:</p>
											<h5 className="fw-semibold">
												{item.product.title}
											</h5>
										</div>
										<div className="mx-2 text-center">
											<p className="small mb-0 text-dark">Количество:</p>
											<h5 className="fw-semibold">
												{item.product.count}
											</h5>
										</div>
										<div>
											<p className="small mb-0 text-dark">Цена:</p>
											<h5  className="fw-semibold">
												₽{item.product.priceRuble}
											</h5>
										</div>
									</div>

									<div className="d-flex ms-2 flex-row align-items-center"> 
										<a href="#!" style={{ color: "#2e2e2e",  }}>
											<DeleteIcon />
										</a>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				<hr className="my-2"/>

				<div className="d-flex justify-content-center ">
					<h4 className="fw-semibold text-white">Всего: </h4>
					<h4 className="fw-bold text-white">4818.00</h4>
				</div>
				<button type="button" className="btn btn-info btn-block btn-lg d-flex justify-content-center">
					<span className="fw-bold">Оформить</span>
				</button>
			</div>
		</div>
  );

  return (
    
      <div className="container-fluid" >
		
    
		<div className="row">
			<div className="col-lg-3">
				<div className="card">
				<div className="card-body">
					<div className="mb-4 card-title">Фильтры</div>
			<div>
				<h5 className="mb-3">Цена</h5>
				<div className="input-group">
				<span className="input-group-text">c</span>
				<input
					id="minPrice"
					type="number"
					className="form-control"
					placeholder="Min."
					value={priceMin.toString()}
					onChange={handleChangePriceMin}
				></input>
				<span className="input-group-text">по</span>
				<input
					id="maxPrice"
					type="number"
					className="form-control"
					placeholder="Max."
					value={priceMax.toString()}
					onChange={handleChangePriceMax}
				></input>
				</div>

			</div>
		</div>
		</div>
        </div>

		<div className="col-lg-9 card card-body">
			<div className="row flex justify-content-between mb-0 card-title">
				<h4 className="mb-4 text-center w-75">Магазин</h4>
				
				<div className="dropdown w-25">
					<Dropdown overlay={menu}>
						<a onClick={e => e.preventDefault()}>
						<Space>
							Корзина
						</Space>
						</a>
					</Dropdown>
				</div>	
			</div>
			<div className="g-2 row">
				{filteredProducts &&
				filteredProducts?.map((item) => <ShopItem shopItem={item} />)}
			</div>
		</div>
        </div>
      </div>

    
  );
}
