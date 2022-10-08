import { Box, Modal } from "@mui/material";
import React from "react";
import { IProduct, IProductWithCustomer } from "../../../api/mainApi";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { addToCart } from "../../../store/marketSlice/marketSlice";

interface IProductDetail {
  open: boolean;
  handleClose: () => void;
  shopItem: IProduct;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const ProductDetail: React.FC<IProductDetail> = ({
  open,
  handleClose,
  shopItem,
}) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);

  const addClick = () => {
    const product = { product: { ...shopItem }, user: { ...user } } as IProductWithCustomer;
    dispatch(addToCart(product));
    handleClose()
  };
  const handleCloseMethod = () => { handleClose() };


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header no-border">
              <i>
                <CloseIcon onClick={handleCloseMethod} />
              </i>
            </div>
            <div className="card no-shadow">
              <div className="card-body p-t-0">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="text-center">
                      <figure>
                        <img
                          className="w-100 rounded float-left"
                          src={shopItem?.image}
                          alt=""
                        ></img>
                      </figure>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <h2 className="card-title font-size-30">
                      {shopItem?.title}
                    </h2>

                    <p className="card-text font-size-18">
                      ₽ {shopItem?.priceRuble}
                    </p>
                    <p
                      className="card-text p-20 bg-light overflow-auto"
                      style={{ height: "10rem" }}
                    >
                      {" "}
                      {shopItem?.description}{" "}
                    </p>
                    <div className="form-group m-t-20">
                      <button
                        type="button"
                        className="btn btn-primary btn-rounded btn-lg "
                        onClick={addClick}
                      >
                        <span>Добавить в корзину</span>
                        <i className="icon dripicons-cart text-white"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ProductDetail;
