import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductInterface } from "../../pages/products/Products";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faCartPlus,
  faStar,
  faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";

import style from "./ProductCard.module.scss";
import { useState } from "react";
import formatNumberWithUserLocale from "../../helpers/numberFormater";
import { truncateText } from "../../helpers/truncateText";

interface ProductCardProps {
  product: ProductInterface;
}

function ProductCard({ product }: ProductCardProps) {
  const [whishlisted, setWishlisted] = useState(false);

  const handleWishlist = () => {
    setWishlisted((prev) => !prev);
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
          whishlisted ? style["product-card__heart-icon--selected"] : ""
        }`}
        icon={whishlisted ? solidHeart : regularHeart}
        onClick={handleWishlist}
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
