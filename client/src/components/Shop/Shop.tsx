import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchProducts } from "../../store/marketSlice/marketSlice";
import ShopItem from "./ShopItem";

export default function Shop() {
    const dispatch = useAppDispatch();


    const { products } = useAppSelector((state) => (state.market));
    React.useEffect(() => {
        console.log(products);
      }, [products]);
    
      React.useEffect(() => {
        dispatch(fetchProducts());
      }, []);

  return (
        <div className="text-center container py-5">

        {products && products?.map((item) => (

            
            <ShopItem shopItem={item}/>

        ))}
        </div>
  );
}