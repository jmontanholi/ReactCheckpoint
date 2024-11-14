import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Modal from "../modal/Modal";

import style from "./CartModal.module.scss";
import formatNumberWithUserLocale from "../../helpers/numberFormater";
import CartItem from "./CartItem";
import { removeAllFromCart } from "../../store/slices/cartSlice";

function WishlistModal() {
  const dispatch = useDispatch();

  const cartIsOpen = useSelector(
    (state: RootState) => state.modal.cartModalIsOpen
  );

  const { products: cartItems, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );

  const handleClearCart = () => {
    dispatch(removeAllFromCart());
  };

  return (
    <Modal open={cartIsOpen} modal="cartModal">
      <section
        className={`${style["cart-modal"]} ${
          cartItems.length > 0 ? style["cart-modal__with-items"] : ""
        }`}
      >
        <h1 className={style["cart-modal__title"]}>Cart</h1>

        {cartItems.length > 0 ? (
          <>
            <ul className={style["cart-modal__item-list"]}>
              {cartItems.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </ul>
            <div className={style["cart-modal__price-container"]}>
              <p className={style["cart-modal__total-price"]}>
                Total Price:{" "}
                <span>{formatNumberWithUserLocale(totalPrice)}</span>
              </p>
              <button
                className={style["cart-modal__clear-cart"]}
                onClick={handleClearCart}
              >
                Clear cart
              </button>
            </div>
            <button className={style["cart-modal__checkout"]}>Checkout</button>
          </>
        ) : (
          <p className={style["cart-modal__fallback-text"]}>
            No products in the cart, go get some!
          </p>
        )}
      </section>
    </Modal>
  );
}

export default WishlistModal;
