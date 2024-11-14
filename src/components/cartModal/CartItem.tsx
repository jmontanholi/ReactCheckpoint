import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import formatNumberWithUserLocale from "../../helpers/numberFormater";
import { ProductInterface } from "../../pages/products/Products";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import style from "./CartItem.module.scss";
import IconButton from "../iconButton/IconButton";
import { useDispatch } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../store/slices/cartSlice";

interface CartItemInterface {
  product: ProductInterface;
  quantity: number;
}

interface CartItemPropsInterface {
  item: CartItemInterface;
}

function CartItem({ item }: CartItemPropsInterface) {
  const dispatch = useDispatch();

  const handleIncreaseQuantity = () => {
    dispatch(addItemToCart(item.product));
  };

  const handleDecreaseQuantity = () => {
    dispatch(removeItemFromCart(item.product));
  };
  return (
    <li className={style["cart-item"]}>
      <img
        className={style["cart-item__image"]}
        src={item.product.image}
        alt={item.product.title}
      />
      <div className={style["cart-item__content-container"]}>
        <p className={style["cart-item__title"]}>{item.product.title}</p>
        <p className={style["cart-item__description"]}>
          {item.product.description}
        </p>
        <div className={style["cart-item__quantity-container"]}>
          <p className={style["cart-item__price"]}>
            {formatNumberWithUserLocale(item.product.price)}
          </p>
          <IconButton
            className={style["cart-item__button"]}
            handleClick={handleDecreaseQuantity}
            ariaLabel="decrease product quantity"
            icon={faMinus}
          />
          <p className={style["cart-item__quantity"]}>{item.quantity}</p>
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
