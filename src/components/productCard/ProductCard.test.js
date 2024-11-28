import { screen } from "@testing-library/react";
import { defaultProduct, renderWithProviders } from "../../utils/testUtils";
import ProductCard from "./ProductCard";
import formatNumberWithUserLocale from "../../helpers/numberFormater";
import userEvent from "@testing-library/user-event";

const renderProductCard = () => {
  const preloadedState = {
    cart: { products: [] },
  };

  return renderWithProviders(<ProductCard product={defaultProduct.product} />, {
    preloadedState,
  });
};

describe("Product Card", () => {
  test("Renders Product image correctly", () => {
    renderProductCard();

    expect(
      screen.getByRole("img", { name: defaultProduct.product.title })
    ).toHaveAttribute("src", defaultProduct.product.image);
  });

  test("Renders Product title correctly", () => {
    renderProductCard();

    expect(screen.getByText(defaultProduct.product.title)).toBeInTheDocument();
  });

  test("Renders Product price correctly", () => {
    renderProductCard();

    expect(
      screen.getByText(formatNumberWithUserLocale(defaultProduct.product.price))
    ).toBeInTheDocument();
  });

  test("Renders Product rating and count correctly", () => {
    renderProductCard();

    expect(
      screen.getByRole("paragraph", { name: "product ratings" })
    ).toHaveTextContent(defaultProduct.product.rating.rate);

    expect(
      screen.getByRole("paragraph", { name: /product ratings count/i })
    ).toHaveTextContent(defaultProduct.product.rating.count);
  });

  test("Renders a button to wishlist the product", () => {
    renderProductCard();

    expect(
      screen.getByRole("button", { name: /add to wishlist/i })
    ).toBeInTheDocument();
  });

  test("Renders a button to add the product to the cart", () => {
    renderProductCard();

    expect(
      screen.getByRole("button", { name: /add to cart/i })
    ).toBeInTheDocument();
  });

  test("Add product to the wishlist when wishlist button is pressed", async () => {
    const user = userEvent.setup();
    const { store } = renderProductCard();

    const wishlistBtn = screen.getByRole("button", {
      name: /add to wishlist/i,
    });

    await user.click(wishlistBtn);

    expect(store.getState().wishlist.products[0].title).toBe(
      defaultProduct.product.title
    );
  });

  test("Add product to the cart when add to cart button is pressed", async () => {
    const user = userEvent.setup();
    const { store } = renderProductCard();

    const cartBtn = screen.getByRole("button", {
      name: /add to cart/i,
    });

    await user.click(cartBtn);

    expect(store.getState().cart.products[0].product.title).toBe(
      defaultProduct.product.title
    );
  });

  test("Add product to item quantity in cart when add to cart button is pressed twice", async () => {
    const user = userEvent.setup();
    const { store } = renderProductCard();

    const cartBtn = screen.getByRole("button", {
      name: /add to cart/i,
    });

    await user.click(cartBtn);

    // Assert we added the product
    expect(store.getState().cart.products.length).toBe(1);

    // "Add" again
    await user.click(cartBtn);

    // Assert only one product should be in the cart, since we are updating the quantity only
    expect(store.getState().cart.products.length).toBe(1);

    // Quantity on added product should be 2
    expect(store.getState().cart.products[0].quantity).toBe(2);
  });
});
