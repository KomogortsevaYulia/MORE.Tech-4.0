import Button from '@mui/material/Button';
import React from 'react'
import { IProduct } from '../../api/mainApi';
import ProductDetail from '../../pages/MarketPage/ProductDetail/ProductDetail';

interface IShopItemProps {
    shopItem: IProduct;
}
  

// .ecommerce-application .ecommerce-card:hover {
//     -webkit-transform: translateY(-5px);
//     transform: translateY(-5px);
//     -webkit-box-shadow: 0 4px 25px 0 rgb(34 41 47 / 25%);
//     box-shadow: 0 4px 25px 0rgba(34,41,47,.25);
// }


const ShopItem : React.FC<IShopItemProps> = ({
    shopItem
}) => {
    const [openModal, setOpenModal] = React.useState(false);

    const openModalClick = React.useCallback(
      (user: IProduct) => {
        setOpenModal(true);
        
      },
      [setOpenModal]
    );
  
    const closeModal = React.useCallback(() => {
      setOpenModal(false);
    }, [setOpenModal]);

    return (
    <div className="col-sm-6 col-lg-4">
        
        
        <div className="card rounded">
            <div className="bg-image"
                data-mdb-ripple-color="light">
                <img src={shopItem.image} className="w-100"  onClick={() => openModalClick(shopItem)}/>

            </div>
            <div className="card-inner text-center">
                <a  onClick={() => openModalClick(shopItem)} className="text-reset">
                    <h5 className="card-title mb-3">{shopItem.title}</h5>
                </a>

                <h6 className="mb-3 mx-auto ">{shopItem.priceRuble}₽</h6>
            </div>
        </div>
        <ProductDetail
            open={openModal}
            handleClose={closeModal}
            shopItem={shopItem}
        />
    </div>
    
  )
}

export default ShopItem