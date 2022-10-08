import * as React from "react";
import { IProduct } from "../../api/mainApi";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchProducts } from "../../store/marketSlice/marketSlice";
import ShopItem from "./ShopItem";




export default function Shop() {
	const dispatch = useAppDispatch();
	const { products } = useAppSelector((state) => (state.market));
	const [filteredProducts, setFilteredProducts] = React.useState(products);
	const [maxPrice, setMaxPrice] = React.useState(1);
    React.useEffect(() => {
		if(products){
			setMaxPrice(Math.max(...products!.map(item => item.priceRuble)));
			setPriceMax(maxPrice)
			filterProducts([null]);
		}
    }, [products]);

    React.useEffect(() => {
        dispatch(
			fetchProducts()
		);
    }, []);

	const filterProducts = (query : any[]) => {
		if (query[1] === 0){
			setPriceMax(maxPrice);
		}

		else if (query[0] === null){ 
			return setFilteredProducts(products)
		}
		
		setFilteredProducts(
			products!.filter( function(el:IProduct){
				return el.priceRuble >= query[0] && 
				el.priceRuble <= query[1]  
			})
		)
		console.log(filteredProducts)
	}

	const [priceMin, setPriceMin] = React.useState(0);
	const handleChangePriceMin = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPriceMin(Number(event.target.value));
		filterProducts([priceMin,priceMax])
	};

	const [priceMax, setPriceMax] = React.useState(maxPrice);
	const handleChangePriceMax = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPriceMax(Number(event.target.value));
		filterProducts([priceMin,priceMax])
	};


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

						<div className="">
							<label className="form-label">Price</label>

							<div className="input-group">
								<span className="input-group-text">c</span>
								<input id="minPrice" type="number" className="form-control" placeholder="Min." value={priceMin} onChange={handleChangePriceMin}></input>
								<span className="input-group-text">по</span>
								<input id="maxPrice" type="number" className="form-control" placeholder="Max." value={priceMax} onChange={handleChangePriceMax}></input>
							</div>
						</div>

                    </div>
                    <div className="mt-4 pt-3">
                          <h5 className="mb-3">Price</h5>
                    </div>
                </div>
            </div>
        </div>

			<div className="row g-2 col-lg-9 ">
				{filteredProducts && filteredProducts?.map((item) => (
					<ShopItem shopItem={item}/>

				))}
			</div>
        </div>
    </div>
  );
}