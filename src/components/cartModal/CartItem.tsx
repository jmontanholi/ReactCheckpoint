import formatNumberWithUserLocale from "../../helpers/numberFormater";
import { ProductInterface } from "../../pages/products/Products";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import style from "./CartItem.module.scss";
import IconButton from "../iconButton/IconButton";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../store/slices/cartSlice";
import { RootState } from "../../store/store";

interface CartItemPropsInterface {
  productId: number;
}

function CartItem({ productId }: CartItemPropsInterface) {
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.products);
  const item = cartItems.find((item) => item.product.id === productId);

  const handleIncreaseQuantity = () => {
    dispatch(addItemToCart(item.product));
  };

  const handleDecreaseQuantity = () => {
    dispatch(removeItemFromCart(item.product));
  };

  if (!item) return null;

  return (
    <li className={style["cart-item"]}>
      <img
        aria-label="product image"
        className={style["cart-item__image"]}
        src={item.product.image}
        alt={item.product.title}
      />
      <div className={style["cart-item__content-container"]}>
        <p aria-label="product title" className={style["cart-item__title"]}>
          {item.product.title}
        </p>
        <p
          aria-label="product description"
          className={style["cart-item__description"]}
        >
          {item.product.description}
        </p>
        <div className={style["cart-item__quantity-container"]}>
          <p aria-label="product price" className={style["cart-item__price"]}>
            {formatNumberWithUserLocale(item.product.price)}
          </p>
          <IconButton
            className={style["cart-item__button"]}
            handleClick={handleDecreaseQuantity}
            ariaLabel="decrease product quantity"
            icon={faMinus}
          />
          <p
            aria-label="product quantity"
            className={style["cart-item__quantity"]}
          >
            {item.quantity}
          </p>
          <IconButton
            className={style["cart-item__button"]}
            handleClick={handleIncreaseQuantity}
            ariaLabel="increase product quantity"
            icon={faPlus}
          />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
