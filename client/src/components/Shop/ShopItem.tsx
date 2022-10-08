import React from 'react'
import { IProduct } from '../../api/mainApi';

interface IShopItemProps {
    shopItem: IProduct;
}
  
const ShopItem : React.FC<IShopItemProps> = ({
    shopItem
}) => {

  return (
    <div className="col-sm-6 col-lg-4">
        
        
        <div className="card rounded">
            <div className="bg-image"
                data-mdb-ripple-color="light">
                <img src={shopItem.image} className="w-100" />

            </div>
            <div className="card-inner text-center">
                <a href="" className="text-reset">
                    <h5 className="card-title mb-3">{shopItem.title}</h5>
                </a>
                <h6 className="mb-3 mx-auto">{shopItem.priceRuble}</h6>
            </div>
        </div>
    </div>
  )
}

export default ShopItem