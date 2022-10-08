import Button from '@mui/material/Button';
import React from 'react'
import { IProduct } from '../../../api/mainApi';
import ProductDetail from '../ProductDetail/ProductDetail';
import styles from "../Market.module.scss";

interface IShopItemProps {
    shopItem: IProduct;
}
  

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
        <div className={styles.ecommerceCard}> 
            <div className="card rounded" >
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