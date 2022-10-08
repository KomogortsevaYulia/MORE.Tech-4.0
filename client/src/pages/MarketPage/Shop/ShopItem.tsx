import Button from '@mui/material/Button';
import React from 'react'
import { IProduct, IProductWithCustomer } from '../../../api/mainApi';
import ProductDetail from '../ProductDetail/ProductDetail';
import styles from "../Market.module.scss";
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { addToCart } from '../../../store/marketSlice/marketSlice';
interface IShopItemProps {
    shopItem: IProduct;
}
  

const ShopItem : React.FC<IShopItemProps> = ({
    shopItem
}) => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.user);

    const addClick = () => {
        const product = { product: {...shopItem}, user: { ...user } } as IProductWithCustomer;
        dispatch(addToCart(product));
    };

    const [openModal, setOpenModal] = React.useState(false);

    const openModalClick = React.useCallback(
      (product: IProduct) => {
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
                <div className="bg-image card-img-top"
                    data-mdb-ripple-color="light">
                    <img src={shopItem.image} className="w-100"  onClick={() => openModalClick(shopItem)}/>

                </div>
                <div className="card-inner text-center">
                    <a  onClick={() => openModalClick(shopItem)} className="text-reset">
                        <h5 className="card-title mb-2 mt-2">{shopItem.title}</h5>
                    </a>

                    <h6 className="mb-2 mx-auto ">{shopItem.priceRuble}₽</h6>
                </div>
                <button
                    type="button"
                    className="btn btn-info btn-rounded mx-4 mb-2"
                    onClick={addClick}
                >
                    <span>Добавить в корзину </span>
                </button>
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