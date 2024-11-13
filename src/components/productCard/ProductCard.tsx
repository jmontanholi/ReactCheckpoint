import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductInterface } from "../../pages/products/Products";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faCartPlus,
  faStar,
  faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";

import style from "./ProductCard.module.scss";
import formatNumberWithUserLocale from "../../helpers/numberFormater";
import { truncateText } from "../../helpers/truncateText";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../store/slices/wishlistSlice";

interface ProductCardProps {
  product: ProductInterface;
}

function ProductCard({ product }: ProductCardProps) {
  const wishlistedItems = useSelector(
    (state: RootState) => state.wishlist.products
  );

  const itemIsWishlisted = wishlistedItems.find(
    (item) => item.id === product.id
  );

  const dispatch = useDispatch();

  const handleAddToWishlist = () => {
    dispatch(addItemToWishlist(product));
  };

  const handleRemoveFromWishlist = () => {
    dispatch(removeItemFromWishlist(product));
  };

  return (
    <li className={style["product-card"]}>
      <img
        className={style["product-card__image"]}
        src={product.image}
        alt={product.title}
      />
      <FontAwesomeIcon
        aria-label="add to wishlist"
        role="button"
        className={`${style["product-card__heart-icon"]} ${
          itemIsWishlisted ? style["product-card__heart-icon--selected"] : ""
        }`}
        icon={itemIsWishlisted ? solidHeart : regularHeart}
        onClick={() => {
          itemIsWishlisted ? handleRemoveFromWishlist() : handleAddToWishlist();
        }}
      />
      <div className={style["product-card__text-container"]}>
        <p className={style["product-card__title"]}>
          {truncateText(product.title, 25)}
        </p>
        <p className={style["product-card__price"]}>
          {formatNumberWithUserLocale(product.price)}
        </p>

        <div className={style["product-card__rating"]}>
          <FontAwesomeIcon icon={faStar} />
          <p aria-label="ratings">{product.rating.rate}</p>
          <p
            aria-label="ratings count"
            className={style["product-card__rating-count"]}
          >
            ({product.rating.count})
          </p>
        </div>
        <FontAwesomeIcon
          role="button"
          aria-label="add to card"
          className={style["product-card__cart-icon"]}
          icon={faCartPlus}
        />
      </div>
    </li>
  );
}

export default ProductCard;
