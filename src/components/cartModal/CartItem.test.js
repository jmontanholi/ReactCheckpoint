import { screen } from "@testing-library/react";
import CartItem from "./CartItem";
import userEvent from "@testing-library/user-event";
import { defaultProduct, renderWithProviders } from "../../utils/testUtils";
import formatNumberWithUserLocale from "../../helpers/numberFormater";

const renderCartItem = (item = defaultProduct) => {
  const preloadedState = {
    cart: { products: [item] }, // Preload the store with the item
  };

  return renderWithProviders(<CartItem productId={item.product.id} />, {
    preloadedState,
  });
};

describe("CartItem", () => {
  test("Renders image", async () => {
    renderCartItem();

    expect(await screen.findByRole("img")).toBeInTheDocument();
  });

  test("Renders price with correct formating", () => {
    renderCartItem();

    expect(
      screen.getByText(formatNumberWithUserLocale(defaultProduct.product.price))
    ).toHaveTextContent("€55.99");
  });

  test("Renders decrease and increase buttons", () => {
    renderCartItem();

    expect(
      screen.getAllByRole("button", { name: /decrease|increase/i })
    ).toHaveLength(2);
  });

  test("Renders product title", () => {
    renderCartItem();

    expect(screen.getByText(defaultProduct.product.title)).toBeInTheDocument();
  });

  test("Renders product description", () => {
    renderCartItem();

    expect(
      screen.getByText(defaultProduct.product.description)
    ).toBeInTheDocument();
  });

  test("Renders product price", () => {
    renderCartItem();

    expect(
      screen.getByText(formatNumberWithUserLocale(defaultProduct.product.price))
    ).toBeInTheDocument();
  });

  test("Renders product quantity", () => {
    renderCartItem();

    expect(
      screen.getByRole("paragraph", { name: /quantity/i })
    ).toHaveTextContent(defaultProduct.quantity);
  });

  test("increases quantity when increase button is clicked", async () => {
    const user = userEvent.setup();
    renderCartItem();

    const increaseBtn = screen.getByRole("button", { name: /increase/i });
    const quantityParagraph = screen.getByRole("paragraph", {
      name: /quantity/i,
    });

    await user.click(increaseBtn);

    expect(quantityParagraph).toHaveTextContent(2);

    await user.click(increaseBtn);

    expect(quantityParagraph).toHaveTextContent(3);
  });

  test("decreases quantity when decrease button is clicked", async () => {
    const user = userEvent.setup();
    const item = { ...defaultProduct };
    item.quantity = 2;
    renderCartItem(item);

    const decreaseBtn = screen.getByRole("button", { name: /decrease/i });
    const quantityParagraph = screen.getByRole("paragraph", {
      name: /quantity/i,
    });

    await user.click(decreaseBtn);

    expect(quantityParagraph).toHaveTextContent(1);
  });

  test("Removes item when quantity is 1 and drecease button is clicked", async () => {
    const user = userEvent.setup();
    renderCartItem();

    const decreaseBtn = screen.getByRole("button", { name: /decrease/i });

    await user.click(decreaseBtn);

    expect(
      screen.queryByRole("paragraph", { name: /title/i })
    ).not.toBeInTheDocument();
  });
});
