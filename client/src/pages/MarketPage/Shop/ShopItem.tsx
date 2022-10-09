import React, { useCallback } from "react";
import { IProduct, IProductWithCustomer } from "../../../api/mainApi";
import ProductDetail from "../ProductDetail/ProductDetail";
import styles from "../Market.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { addToCart } from "../../../store/marketSlice/marketSlice";
import Snackbar from "@mui/material/Snackbar";

import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface IShopItemProps {
  shopItem: IProduct;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ShopItem: React.FC<IShopItemProps> = ({ shopItem }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const addClick = () => {
    const product = {
      product: { ...shopItem },
      user: { ...user },
    } as IProductWithCustomer;
    dispatch(addToCart(product));
    setOpen(true);
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
  const [open, setOpen] = React.useState(false);

  const canBuyByNFT =
    user &&
    shopItem.nftUri &&
    (user.balanceNFT?.balance.some((nft) => nft.uri === shopItem.nftUri) ||
      false);

  const buyByNFT = useCallback(() => {
    //TODO Алек напиши логику пж
  }, []);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div className="col-sm-6 col-lg-4">
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          Товар добавлен в корзину
        </Alert>
      </Snackbar>
      <div className={styles.ecommerceCard}>
        <div className="card rounded">
          <div className="bg-image card-img-top" data-mdb-ripple-color="light">
            <img
              src={shopItem.image}
              alt={shopItem.title}
              className="w-100"
              onClick={() => openModalClick(shopItem)}
            />
          </div>
          <div className="card-inner text-center">
            <h5
              onClick={() => openModalClick(shopItem)}
              className="card-title mb-2 mt-2 text-reset"
            >
              {shopItem.title}
            </h5>

            <h6 className="mb-2 mx-auto ">{shopItem.priceRuble} Digital Ruble</h6>
          </div>
          <button
            type="button"
            className="btn btn-info btn-rounded mx-4 mb-2"
            onClick={addClick}
          >
            <span>Добавить в корзину </span>
          </button>
          {canBuyByNFT && (
            <button
              type="button"
              className="btn btn-info btn-rounded mx-4 mb-2"
              onClick={buyByNFT}
            >
              <span>Купить за NFT </span>
            </button>
          )}
        </div>
      </div>
      <ProductDetail
        open={openModal}
        handleClose={closeModal}
        shopItem={shopItem}
      />
    </div>
  );
};

export default ShopItem;
