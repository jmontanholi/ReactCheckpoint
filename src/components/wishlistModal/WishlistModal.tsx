import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ProductCard from "../productCard/ProductCard";
import Modal from "../modal/Modal";

import style from "./WishlistModal.module.scss";

function WishlistModal() {
  const wishlistIsOpen = useSelector(
    (state: RootState) => state.modal.wishlistModalIsOpen
  );
  const wishlistedItems = useSelector(
    (state: RootState) => state.wishlist.products
  );

  return (
    <Modal open={wishlistIsOpen} modal="wishlistModal">
      <section className={style["wishlist-modal"]}>
        <h1 className={style["wishlist-modal__title"]}>Wishlist</h1>
        {wishlistedItems.length > 0 ? (
          <ul className={style["wishlist-modal__item-list"]}>
            {wishlistedItems.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </ul>
        ) : (
          <p className={style["wishlist-modal__fallback-text"]}>
            No wishlisted items, go tag some products!
          </p>
        )}
      </section>
    </Modal>
  );
}

export default WishlistModal;