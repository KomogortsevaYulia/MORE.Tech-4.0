import { Box, Modal, Button } from "@mui/material";
import React from "react";
import { IProduct, IProductWithCustomer, IUser } from "../../../api/mainApi";
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

  const { products } = useAppSelector((state) => state.market);
  const { user } = useAppSelector((state) => state.user);

  const [transferType, setTransferType] = React.useState("rubles");

  const addClick = () => {
    const product = { ...shopItem, user: { ...user } } as IProductWithCustomer;
    dispatch(addToCart(product));
  };

  const makeTransfer = () => {
    if (transferType === "rubles") {
      // dispatch(
      //   transferRubles({
      //     amount: +rublesAmount,
      //     toPublicKey: currentUser!.publicKey,
      //     fromPrivateKey: user!.privateKey,
      //     userId: user!.id,
      //     toId: currentUser!.id,
      //   })
      // );
    } else {
    }

    handleClose();
  };

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
                <CloseIcon onClick={makeTransfer} />
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
                      ₽{shopItem?.priceRuble}
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
                        className="btn btn-primary btn-rounded btn-lg w-250 m-b-20"
                        onClick={addClick}
                      >
                        <span>Add to Cart</span>
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

// {/* <div className="modal-dialog modal-dialog modal-lg modal-dialog-centered" role="document">
//           <div className="modal-content">
//             <div className="modal-header">
//               <div className="col-lg-6">
//                 <img src="/viho/static/media/01.1c4b908d3e7e83a875ed.jpg" alt="" className="img-fluid media"></img>

//                 </div>
//                 <div className="product-details text-start col-lg-6">
//                   <h4>Man</h4>
//                   <ul className="simple-list rating-pro d-flex flex-row list-group">
//                     <li className="list-group-item"> <i className="fa fa-star font-warning"></i></li>
//                     <li className="list-group-item"> <i className="fa fa-star font-warning"></i></li>
//                     <li className="list-group-item"> <i className="fa fa-star font-warning"></i></li>
//                     <li className="list-group-item"> <i className="fa fa-star font-warning"></i></li>
//                     <li className="list-group-item"> <i className="fa fa-star font-warning"></i></li>
//                     </ul>
//                     <div className="product-price">$206<del>$350.00</del></div>
//                     <div className="product-view"><h6 className="f-w-600">Product Details</h6><p className="mb-0">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
//                     </p>
//                     </div>
//                     <div className="product-size">
//                       <ul className="list-group">
//                         <li className="list-group-item"> <button type="button"  title="" className="btn btn-outline-light">M</button></li>
//                         <li className="list-group-item"> <button type="button"  title="" className="btn btn-outline-light">L</button></li>
//                         <li className="list-group-item"> <button type="button"  title="" className="btn btn-outline-light">Xl</button></li>
//                         </ul>
//                         </div>
//                         <div className="product-qnty">
//                           <h6 className="f-w-600">Quantity</h6>
//                         <div className="input-group w-50" >
// 							<button type="button" className="bootstrap-touchspin-down btn btn-primary"><i className="fa fa-minus"></i></button>
// 							<span className="bootstrap-touchspin-prefix input-group-text"></span>
// 							<input name="quantity" type="text" className="touchspin text-center form-control" value="1"></input>
// 							<button type="button" className="bootstrap-touchspin-up btn btn-primary"><i className="fa fa-plus"></i></button>
// 							</div>
// 								<div className="addcart-btn">
// 									<a className="btn btn-primary me-3" href="/viho/app/ecommerce/cart">Add to Cart</a><a className="btn btn-primary" href="/viho/app/ecommerce/product-page/5">View Details</a>
// 								</div>
// 								</div>
// 								</div>
// 								</div>
// 								<button type="button" className="btn-close btn btn-transprant"></button>
// 								</div>
// 								</div>

// 								style="padding-right: 17px; display: block;"*/}
