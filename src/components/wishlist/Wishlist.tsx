import { useSelector } from "react-redux";
import Modal from "../modal/modal";
import { RootState } from "../../store/store";
import ProductCard from "../productCard/ProductCard";

function Wishlist() {
  const wishlistIsOpen = useSelector(
    (state: RootState) => state.modal.wishlistModalIsOpen
  );
  const wishlistedItems = useSelector(
    (state: RootState) => state.wishlist.products
  );

  console.log(wishlistIsOpen);

  return (
    <Modal open={wishlistIsOpen} modal="wishlist">
      <h1>hello wishlist</h1>
      <ul>
        {wishlistedItems.map((item) => (
          <ProductCard product={item} />
        ))}
      </ul>
    </Modal>
  );
}

export default Wishlist;
