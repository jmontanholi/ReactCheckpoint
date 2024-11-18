import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Modal from "../modal/Modal";

import style from "./CartModal.module.scss";
import formatNumberWithUserLocale from "../../helpers/numberFormater";
import CartItem from "./CartItem";
import { removeAllFromCart } from "../../store/slices/cartSlice";

function WishlistModal() {
  const dispatch = useDispatch();

  const { products: cartItems, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );

  const handleClearCart = () => {
    dispatch(removeAllFromCart());
  };

  return (
    <Modal title="cart" modal="cartModal">
      <section
        aria-label="cart modal"
        className={`${style["cart-modal"]} ${
          cartItems.length > 0 ? style["cart-modal__with-items"] : ""
        }`}
        data-testid="cart-modal"
      >
        {cartItems.length > 0 ? (
          <>
            <ul className={style["cart-modal__item-list"]}>
              {cartItems.map((item) => (
                <CartItem key={item.product.id} productId={item.product.id} />
              ))}
            </ul>
            <div className={style["cart-modal__price-container"]}>
              <p
                aria-label="cart total price"
                className={style["cart-modal__total-price"]}
              >
                Total Price:{" "}
                <span>{formatNumberWithUserLocale(totalPrice)}</span>
              </p>
              <button
                className={style["cart-modal__clear-cart"]}
                onClick={handleClearCart}
                aria-label="clear cart"
              >
                Clear cart
              </button>
            </div>
            <button className={style["cart-modal__checkout"]}>Checkout</button>
          </>
        ) : (
          <p
            aria-label="no items in cart"
            className={style["cart-modal__fallback-text"]}
          >
            No products in the cart, go get some!
          </p>
        )}
      </section>
    </Modal>
  );
}

export default WishlistModal;
