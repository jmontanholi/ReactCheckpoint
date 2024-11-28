import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  defaultProduct,
  renderWithProviders,
  secondDefaultProduct,
} from "../../utils/testUtils";
import Header from "../header/Header";
import WishlistModal from "./WishlistModal";

const renderWishlistModal = (state, width = 1024) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    value: width,
  });

  const preloadedState = state || {
    wishlist: { products: [] },
  };

  return renderWithProviders(
    <>
      <Header />
      <WishlistModal />
    </>,
    {
      preloadedState,
    }
  );
};

const openWishlistModal = async () => {
  const user = userEvent.setup();

  const wishlistBtn = screen.getByRole("button", { name: /open wishlist/i });

  await user.click(wishlistBtn);
};

describe("Wishlist modal", () => {
  // Mock dialog functions as it is not supported in JSDom at the moment
  beforeAll(() => {
    HTMLDialogElement.prototype.show = jest.fn();
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

  test("Is not visible at first", () => {
    renderWishlistModal();

    expect(screen.queryByTestId("wishlist-modal")).not.toBeInTheDocument();
  });

  test("Is visible once user clicks wishlist button on header and shows fallback text", async () => {
    renderWishlistModal();

    await openWishlistModal();

    expect(screen.getByTestId("wishlist-modal")).toBeInTheDocument();
    expect(screen.getByLabelText(/no wishlisted products/i)).toHaveTextContent(
      "No wishlisted products, go tag some!"
    );
  });

  test("Renders one product card per product in wishlist", async () => {
    renderWishlistModal({
      wishlist: {
        products: [defaultProduct.product, secondDefaultProduct.product],
      },
    });

    await openWishlistModal();

    const firstProduct = screen.getByTestId(
      `${defaultProduct.product.title}-${defaultProduct.product.id}`
    );
    const secondProduct = screen.getByTestId(
      `${secondDefaultProduct.product.title}-${secondDefaultProduct.product.id}`
    );

    expect(firstProduct).toBeInTheDocument();
    expect(secondProduct).toBeInTheDocument();
  });
});
