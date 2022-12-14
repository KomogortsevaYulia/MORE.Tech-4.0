import * as React from "react";
import { IProduct } from "../../../api/mainApi";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  addOrder,
  clearCart,
  fetchProducts,
} from "../../../store/marketSlice/marketSlice";
import ShopItem from "./ShopItem";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../Market.module.scss";
import { Dropdown } from "antd";
import { deleteFromCart } from "../../../store/marketSlice/marketSlice";
import { Badge, IconButton } from "@mui/material";
import { changeBalance } from "../../../store/userSlice/userSlice";
import {
  transferNft,
  transferRubles,
} from "../../../store/transactionsSlice/transactionsSlice";
import { fetchUsers } from "../../../store/adminSlice/adminSlice";

export default function Shop() {
  const dispatch = useAppDispatch();

  const { cart } = useAppSelector((state) => state.market);
  const { user } = useAppSelector((state) => state.user);
  const { users } = useAppSelector((state) => state.admin);
  const cartCount = cart.reduce(
    (count, product) => (count += product.count),
    0
  );
  const { products } = useAppSelector((state) => state.market);

  const [filteredProducts, setFilteredProducts] = React.useState(products);

  const [maxPrice, setMaxPrice] = React.useState(1);

  const [totalPay, setTotalPay] = React.useState(1);

  const deleteClick = (product: IProduct) => {
    dispatch(deleteFromCart(product));
  };

  React.useEffect(() => {
    if (cart) {
      setTotalPay(
        [
          ...cart.map((item) =>
            item.product.nftUri ? 0 : item.product.priceRuble * item.count
          ),
        ].reduce((a, b) => a + b, 0)
      );
    }
  }, [cart]);

  React.useEffect(() => {
    if (products) {
      setMaxPrice(Math.max(...products!.map((item) => item.priceRuble)));
      setPriceMax(maxPrice);
      setFilteredProducts(products);
    }
  }, [products, maxPrice]);

  React.useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchUsers());
  }, []);

  const [priceMin, setPriceMin] = React.useState(0);
  const handleChangePriceMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMin(Number(event.target.value));
  };

  const [priceMax, setPriceMax] = React.useState(maxPrice);
  const handleChangePriceMax = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMax(Number(event.target.value));
  };

  React.useEffect(() => {
    if (maxPrice) {
      setPriceMax(maxPrice);
    }
  }, [maxPrice]);

  const filterProducts = React.useCallback(() => {
    if (products) {
      if (priceMax === 0) {
        setPriceMax(maxPrice);
      }

      setFilteredProducts(
        products!.filter(function (el: IProduct) {
          return el.priceRuble >= priceMin && el.priceRuble <= priceMax;
        })
      );
    }
  }, [maxPrice, priceMax, priceMin, products]);

  React.useEffect(() => {
    filterProducts();
  }, [priceMin, priceMax, filterProducts]);

  const addOrders = () => {
    const sum = cart.reduce(
      (prev, value) =>
        prev +
        (value.product.nftUri ? 0 : value.count * value.product.priceRuble),
      0
    );
    dispatch(addOrder(cart));
    dispatch(changeBalance(-sum));
    if (sum > 0) {
      dispatch(
        transferRubles({
          amount: sum,
          fromPrivateKey: user!.privateKey,
          userId: user!.id,
          why: "?????????????? ?? ????????????????????????",
          toId: users!.find((u) => u.roleId === 1)!.id,
          toPublicKey: users!.find((u) => u.roleId === 1)!.publicKey,
        })
      );
    }

    cart.forEach((item) => {
      if (item.product.nftUri) {
        dispatch(
          transferNft({
            fromPrivateKey: user!.privateKey,
            toPublicKey: users!.find((u) => u.roleId === 1)!.publicKey,
            nft: user!.balanceNFT.balance.find(
              (nft) => nft.uri === item.product.nftUri
            )!,
            toId: users!.find((u) => u.roleId === 1)!.id,
            userId: user!.id,
            why: "?????????????? ?? ????????????????????????",
          })
        );
      }
    });

    dispatch(clearCart());
  };

  const menu = (
    <div className={`card bg-primary text-white rounded-3`}>
      <div className="card-body">
        <div className={` ${styles.cartCard} overflow-auto block`}>
          {cart &&
            cart?.map((item) => (
              <div
                key={item.product.id}
                className={`${styles.cartItem} mb-3 p-2 rounded `}
              >
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-row align-items-center justify-content-between w-100">
                    <div>
                      <img
                        src={item.product.image}
                        className="rounded-3 me-2"
                        style={{ width: "65px" }}
                        alt="Shopping item"
                      />
                    </div>

                    <div className="flex-row d-flex ">
                      <div>
                        <p className="small mb-0 text-dark">????????????????:</p>
                        <h5 className="fw-semibold">{item.product.title}</h5>
                      </div>
                      <div className="mx-2 text-center">
                        <p className="small mb-0 text-dark">????????????????????:</p>
                        <h5 className="fw-semibold">{item.count}</h5>
                      </div>
                      <div>
                        <p className="small mb-0 text-dark">????????:</p>
                        <h5 className="fw-semibold">
                          {item.product.nftUri ? (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                paddingBottom: "8px",
                              }}
                            >
                              x{item.count}
                              <img
                                src={item.product.nftUri}
                                alt="?????? ?????? ???????? ????????????"
                                style={{
                                  width: 48,
                                  height: 48,
                                  borderRadius: "100%",
                                }}
                              />
                            </div>
                          ) : (
                            <>??? {item.product.priceRuble}</>
                          )}
                        </h5>
                      </div>
                    </div>

                    <div className="deleteBtn d-flex ms-2 flex-row align-items-center">
                      <IconButton
                        onClick={() => deleteClick(item.product)}
                        aria-label="delete"
                        style={{ color: "#2e2e2e" }}
                      >
                        <DeleteIcon className={styles.deleteBtn} />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <hr className="my-2" />

        <div className="d-flex justify-content-center ">
          <h4 className="fw-semibold text-white">??????????: </h4>
          <h4 className="fw-bold text-white"> {totalPay}</h4>
        </div>
        <button
          type="button"
          className="btn btn-info btn-block btn-lg d-flex justify-content-center"
          onClick={addOrders}
        >
          <span className="fw-bold">????????????????</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="container-fluid">
      <div>
        <div className="flex-row d-flex justify-content-between mb-0 card-title card card-body mb-4">
          <div className="flex-row d-flex w-25">
            <h5 className="mt-2 me-2">???????? </h5>
            <div className="input-group">
              <span className="input-group-text">c</span>
              <input
                id="minPrice"
                type="number"
                className="form-control"
                placeholder="Min."
                value={priceMin.toString()}
                onChange={handleChangePriceMin}
              ></input>
              <span className="input-group-text">????</span>
              <input
                id="maxPrice"
                type="number"
                className="form-control w-25"
                placeholder="Max."
                value={priceMax.toString()}
                onChange={handleChangePriceMax}
              ></input>
            </div>
          </div>

          <div className="dropdown ">
            {cartCount ? (
              <Badge badgeContent={cartCount > 0 && cartCount} color="primary">
                <Dropdown overlay={menu}>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="btn btn-info"
                  >
                    ??????????????{" "}
                  </button>
                </Dropdown>
              </Badge>
            ) : (
              <Dropdown overlay={menu}>
                <button
                  onClick={(e) => e.preventDefault()}
                  className="btn btn-info"
                >
                  ??????????????{" "}
                </button>
              </Dropdown>
            )}
          </div>
        </div>

        <div className="col-full card card-body">
          <div className="g-2 row">
            {filteredProducts &&
              filteredProducts?.map((item) => (
                <ShopItem key={item.id} shopItem={item} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
