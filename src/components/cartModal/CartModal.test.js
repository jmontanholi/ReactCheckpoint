import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  defaultProduct,
  renderWithProviders,
  secondDefaultProduct,
} from "../../utils/testUtils";
import Header from "../header/Header";
import CartModal from "./CartModal";
import formatNumberWithUserLocale from "../../helpers/numberFormater";

const renderCartModal = (state, width = 1024) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    value: width,
  });

  const preloadedState = state || {
    cart: { products: [], totalPrice: 0 },
  };

  return renderWithProviders(
    <>
      <Header />
      <CartModal />
    </>,
    {
      preloadedState,
    }
  );
};

const openCartModal = async () => {
  const user = userEvent.setup();

  const cartBtn = screen.getByRole("button", { name: /open cart/i });

  await user.click(cartBtn);
};

describe("CartModal", () => {
  // Mock dialog functions as it is not supported in JSDom at the moment
  beforeAll(() => {
    HTMLDialogElement.prototype.show = jest.fn();
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

  test("Is not visible at first", () => {
    renderCartModal();

    expect(screen.queryByTestId("cart-modal")).toBeNull();
  });

  test("Is visible after user clicks on Header's cart button and shows fallback text with no items", async () => {
    renderCartModal();

    await openCartModal();

    expect(screen.getByTestId("cart-modal")).toBeInTheDocument();
    expect(screen.getByLabelText(/no items in cart/i)).toHaveTextContent(
      "No products in the cart, go get some!"
    );
  });

  test("Is visible after user clicks on Header's cart button and shows items in cart with correct quantity", async () => {
    renderCartModal({
      cart: { products: [defaultProduct] },
    });

    await openCartModal();

    expect(screen.getByTestId("cart-modal")).toBeInTheDocument();
    expect(screen.queryByLabelText(/no items in cart/i)).toBeNull();

    expect(screen.getByText(defaultProduct.product.title)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/product quantity/i, { selector: "p" })
    ).toHaveTextContent(defaultProduct.quantity);
  });

  test("Shows items in cart with correct quantity", async () => {
    const product = { ...defaultProduct };
    product.quantity = 2;

    renderCartModal({
      cart: { products: [product] },
    });

    await openCartModal();

    expect(screen.getByText(defaultProduct.product.title)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/product quantity/i, { selector: "p" })
    ).toHaveTextContent(product.quantity);
  });

  test("Shows total price correctly from render", async () => {
    renderCartModal({
      cart: {
        products: [defaultProduct],
        totalPrice: defaultProduct.product.price,
      },
    });

    await openCartModal();

    // Check to see if component renders with correct initial value for total price
    expect(
      screen.getByLabelText(/cart total price/i, { selector: "p" })
    ).toHaveTextContent(
      `Total Price: ${formatNumberWithUserLocale(
        defaultProduct.quantity * defaultProduct.product.price
      )}`
    );
  });

  test("Updates total price when we increase item quantity", async () => {
    const user = userEvent.setup();

    const { store } = renderCartModal({
      cart: {
        products: [defaultProduct],
        totalPrice: defaultProduct.quantity * defaultProduct.product.price,
      },
    });

    await openCartModal();
    const increaseBtn = screen.getByLabelText(/increase/i);

    // Increase item quantity
    await user.click(increaseBtn);

    expect(
      screen.getByLabelText(/cart total price/i, { selector: "p" })
    ).toHaveTextContent(
      `Total Price: ${formatNumberWithUserLocale(
        store.getState().cart.products[0].quantity *
          defaultProduct.product.price
      )}`
    );
  });

  test("Updates total price when we decrease item quantity", async () => {
    const user = userEvent.setup();

    const product = { ...defaultProduct };
    product.quantity = 2;

    const { store } = renderCartModal({
      cart: {
        products: [product],
        totalPrice: product.quantity * product.product.price,
      },
    });

    await openCartModal();

    const decreaseBtn = screen.getByLabelText(/decrease/i);

    // Increase item quantity
    await user.click(decreaseBtn);

    expect(
      screen.getByLabelText(/cart total price/i, { selector: "p" })
    ).toHaveTextContent(
      `Total Price: ${formatNumberWithUserLocale(
        store.getState().cart.products[0].quantity *
          defaultProduct.product.price
      )}`
    );
  });

  test("Shows fallback message when all items are removed from the cart", async () => {
    const user = userEvent.setup();

    const productsArray = [defaultProduct, secondDefaultProduct];
    renderCartModal({
      cart: {
        products: productsArray,
        totalPrice: productsArray.reduce(
          (acc, current) => (acc += current.product.price * current.quantity)
        ),
      },
    });

    await openCartModal();

    const clearCartBtn = screen.getByLabelText(/clear cart/i);

    await user.click(clearCartBtn);

    expect(screen.getByLabelText(/no items in cart/i)).toHaveTextContent(
      "No products in the cart, go get some!"
    );
  });

  test("Closes when user click close button", async () => {
    const user = userEvent.setup();

    renderCartModal({
      cart: {
        products: [defaultProduct],
        totalPrice: defaultProduct.quantity * defaultProduct.product.price,
      },
    });

    await openCartModal();

    const closeModal = screen.getByLabelText(/close modal/i);

    await user.click(closeModal);

    expect(screen.queryByTestId("cart-modal")).toBeNull();
  });
});
