import * as React from "react";
import { IProduct } from "../../../api/mainApi";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { fetchProducts } from "../../../store/marketSlice/marketSlice";
import ShopItem from "./ShopItem";
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "../Market.module.scss";
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Space } from "antd";



export default function Shop() {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.market);
  const { products } = useAppSelector((state) => state.market);

  const [filteredProducts, setFilteredProducts] = React.useState(products);

  const [maxPrice, setMaxPrice] = React.useState(1);

  React.useEffect(() => {
	if(cart){
		console.log(cart)
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
	<div className="card">
		<div className="card-body"> 
		{cart && cart?.map((item) =>(

			<div className={`${styles.cartItem} mb-3 p-2 rounded ${styles.cartCard}`}> 
				<div className="d-flex justify-content-between">
					<div className="d-flex flex-row align-items-center">
						<div>
							<img
							src={item.image}
							className="rounded-3" style={{ width: "65px" }}
							alt="Shopping item" />
						</div>
						<div className="ms-3">
							<h5 >
							{item.title}
							</h5>
							<p className="small mb-0">discription</p>
						</div>
						</div>
						<div className="d-flex flex-row align-items-center">
						<div style={{ width: "50px" }}>
							<h5  className="fw-normal mb-0">
							{item.count}
							</h5>
						</div>
						<div style={{ width: "80px" }}>
							<h5  className="mb-0">
							₽{item.priceRuble}
							</h5>
						</div>
						<a href="#!" style={{ color: "#2e2e2e",  }}>
							<DeleteIcon />
						</a>
					</div>
				</div>
			</div>
		))}
		
		</div>
	</div> 
  );

  return (
    
      <div className="container-fluid" >
		
    
		<div className="row">
			<div className="col-lg-3">
				<div className="card">
				<div className="card-body">
					<div className="mb-4 card-title">Filter</div>
			<div>
				<h5 className="mb-3">Price</h5>
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
				<div className="mt-4 pt-3">
				<h5 className="mb-3">Price</h5>
				</div>
			</div>
		</div>
		</div>
        </div>

		<div className="col-lg-9 ">
			<div className="row flex justify-content-between mb-0">
				<h4 className="mb-4 text-center w-75">Market</h4>
				
				<div className="dropdown w-25">
					<Dropdown overlay={menu}>
						<a onClick={e => e.preventDefault()}>
						<Space>
							Cart
							<DownOutlined />
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
