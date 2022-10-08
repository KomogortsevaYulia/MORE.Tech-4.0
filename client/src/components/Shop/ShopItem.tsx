import React from 'react'
import { IProduct } from '../../api/mainApi';

interface IShopItemProps {
    shopItem: IProduct;
}
  
const ShopItem : React.FC<IShopItemProps> = ({
    shopItem
}) => {

  return (
    <div className="col-lg-4 col-md-12 mb-4">
        
        <div className="card rounded">
            <div className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                data-mdb-ripple-color="light">
                <img src={shopItem.image}
                className="w-100" />
                <a href="#!">
                {/* <div className="mask">
                    <div className="d-flex justify-content-start align-items-end h-100">
                    <h5><span className="badge bg-primary ms-2">New</span></h5>
                    </div>
                </div> */}
                <div className="hover-overlay">
                    <div className="mask" ></div>
                </div>
                </a>
            </div>
            <div className="card-body">
                <a href="" className="text-reset">
                <h5 className="card-title mb-3">{shopItem.title}</h5>
                </a>
                <h6 className="mb-3">{shopItem.priceRuble}</h6>
            </div>
        </div>
    </div>
  )
}

export default ShopItem