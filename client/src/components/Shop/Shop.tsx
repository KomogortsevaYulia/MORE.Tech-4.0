import * as React from "react";
import { IProduct } from "../../api/mainApi";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchProducts } from "../../store/marketSlice/marketSlice";
import ShopItem from "./ShopItem";

export default function Shop() {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.market);

  const [filteredProducts, setFilteredProducts] = React.useState(products);

  const [maxPrice, setMaxPrice] = React.useState(1);

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

  return (
    <div className="container-fluid">
      <h4 className="mb-4 text-center">Market</h4>
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

        <div className="row g-2 col-lg-9 ">
          {filteredProducts &&
            filteredProducts?.map((item) => <ShopItem shopItem={item} />)}
        </div>
      </div>
    </div>
  );
}
