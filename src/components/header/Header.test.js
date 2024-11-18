import { screen, waitFor } from "@testing-library/react";
import Header from "./Header";
import userEvent from "@testing-library/user-event";
import { defaultProduct, renderWithProviders } from "../../utils/testUtils";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../store/slices/wishlistSlice";
import {
  addItemToCart,
  removeAllFromCart,
  removeItemFromCart,
} from "../../store/slices/cartSlice";

const renderHeader = (width) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    value: width, // Simulate a smaller screen width
  });

  const preloadedState = {
    wishlist: { products: [] },
    cart: { products: [] },
  };

  return renderWithProviders(<Header />, {
    preloadedState,
  });
};

describe("Header in mobile and tablets", () => {
  test("Renders menu button", () => {
    renderHeader(767);
    const menuBtn = screen.getByRole("button", { name: /open menu/i });
    expect(menuBtn).toBeInTheDocument();
  });

  test("Renders logo", () => {
    renderHeader(767);
    const logo = screen.getByRole("paragraph", {
      name: /logo/i,
    });
    expect(logo).toBeInTheDocument();
  });

  test("Renders rest of menu when user clicks menu button", async () => {
    const user = userEvent.setup();

    renderHeader(767);

    const menuBtn = screen.getByRole("button", { name: /open menu/i });
    await user.click(menuBtn);

    // check if both router links were rendered
    expect(
      screen.getAllByRole("link", { name: /home|products/i })
    ).toHaveLength(2);

    //check if both modal opening buttons were rendered
    expect(
      screen.getAllByRole("button", { name: /open (wishlist|cart)/i })
    ).toHaveLength(2);
  });

  // Is there a better way to test these scenarios since I am basically repeating them on mobile and desktop header??
  test("Renders count above wishlist icon when a product is wishlisted", async () => {
    const user = userEvent.setup();

    const { store } = renderHeader(767);

    const menuBtn = screen.getByRole("button", { name: /open menu/i });
    await user.click(menuBtn);

    // Check to see that wishlist item count is not visible
    expect(
      screen.queryByRole("paragraph", { name: /wishlist item count/i })
    ).toBeNull();

    // Add item to wishlist
    await waitFor(() => {
      store.dispatch(addItemToWishlist(defaultProduct));
    });

    // Check for wishlist item count
    expect(
      await screen.findByRole("paragraph", { name: /wishlist item count/i })
    ).toHaveTextContent(1);
  });

  test("Removes count above wishlist if we remove the item from wishlist", async () => {
    const user = userEvent.setup();

    const { store } = renderHeader(767);

    const menuBtn = screen.getByRole("button", { name: /open menu/i });
    await user.click(menuBtn);

    // Check to see that wishlist item count is not visible
    expect(
      screen.queryByRole("paragraph", { name: /wishlist item count/i })
    ).toBeNull();

    // Add item to wishlist
    await waitFor(() => {
      store.dispatch(addItemToWishlist(defaultProduct));
    });

    // Check for wishlist item count
    expect(
      await screen.findByRole("paragraph", { name: /wishlist item count/i })
    ).toHaveTextContent(1);

    // Remove item from wishlist
    await waitFor(() => {
      store.dispatch(removeItemFromWishlist(defaultProduct));
    });

    // Check to see that wishlist item count is not visible
    expect(
      screen.queryByRole("paragraph", { name: /wishlist item count/i })
    ).toBeNull();
  });

  test("Renders count above cart icon when a product is added to cart", async () => {
    const user = userEvent.setup();

    const { store } = renderHeader(767);

    const menuBtn = screen.getByRole("button", { name: /open menu/i });
    await user.click(menuBtn);

    // Check to see that wishlist item count is not visible
    expect(
      screen.queryByRole("paragraph", { name: /wishlist item count/i })
    ).toBeNull();

    // Add item to wishlist
    await waitFor(() => {
      store.dispatch(addItemToWishlist(defaultProduct));
    });

    // Check for wishlist item count
    expect(
      await screen.findByRole("paragraph", { name: /wishlist item count/i })
    ).toHaveTextContent(1);
  });

  test("Renders count correctly above cart icon when a product is added again to cart", async () => {
    const user = userEvent.setup();

    const { store } = renderHeader(767);

    const menuBtn = screen.getByRole("button", { name: /open menu/i });
    await user.click(menuBtn);

    // Check to see that wishlist item count is not visible
    expect(
      screen.queryByRole("paragraph", { name: /wishlist item count/i })
    ).toBeNull();

    // Add item to wishlist
    await waitFor(() => {
      store.dispatch(addItemToWishlist(defaultProduct));
      store.dispatch(addItemToWishlist(defaultProduct));
      store.dispatch(addItemToWishlist(defaultProduct));
    });

    // Check for wishlist item count
    expect(
      await screen.findByRole("paragraph", { name: /wishlist item count/i })
    ).toHaveTextContent(3);
  });

  test("Removes count above cart if we remove the item from cart", async () => {
    const user = userEvent.setup();

    const { store } = renderHeader(767);

    const menuBtn = screen.getByRole("button", { name: /open menu/i });
    await user.click(menuBtn);

    // Check to see that cart item count is not visible
    expect(
      screen.queryByRole("paragraph", { name: /cart item count/i })
    ).toBeNull();

    // Add item to cart
    await waitFor(() => {
      store.dispatch(addItemToCart(defaultProduct));
    });

    // Check for cart item count
    expect(
      await screen.findByRole("paragraph", { name: /cart item count/i })
    ).toHaveTextContent(1);

    // Remove item from cart
    await waitFor(() => {
      store.dispatch(removeItemFromCart(defaultProduct));
    });

    // Check to see that cart item count is not visible
    expect(
      screen.queryByRole("paragraph", { name: /cart item count/i })
    ).toBeNull();
  });

  test("Removes count above cart if we remove all items from cart", async () => {
    const user = userEvent.setup();

    const { store } = renderHeader(767);

    const menuBtn = screen.getByRole("button", { name: /open menu/i });
    await user.click(menuBtn);

    // Check to see that cart item count is not visible
    expect(
      screen.queryByRole("paragraph", { name: /cart item count/i })
    ).toBeNull();

    // Add item to cart
    await waitFor(() => {
      store.dispatch(addItemToCart(defaultProduct));
      store.dispatch(addItemToCart(defaultProduct));
      store.dispatch(addItemToCart(defaultProduct));
    });

    // Check for cart item count
    expect(
      await screen.findByRole("paragraph", { name: /cart item count/i })
    ).toHaveTextContent(3);

    // Remove item from cart
    await waitFor(() => {
      store.dispatch(removeAllFromCart());
    });

    // Check to see that cart item count is not visible
    expect(
      screen.queryByRole("paragraph", { name: /cart item count/i })
    ).toBeNull();
  });
});

describe("Header in desktop", () => {
  test("Does not render menu button", () => {
    renderHeader(1024);
    const menuBtn = screen.queryByRole("button", { name: /open menu/i });
    expect(menuBtn).not.toBeInTheDocument();
  });

  test("Renders logo", () => {
    renderHeader(1024);
    const logo = screen.getByRole("paragraph", {
      name: /logo/i,
    });
    expect(logo).toBeInTheDocument();
  });

  test("Renders all links", () => {
    renderHeader(1024);

    // check if both router links were rendered
    expect(
      screen.getAllByRole("link", { name: /home|products/i })
    ).toHaveLength(2);
  });

  test("Renders all modal buttons", () => {
    renderHeader(1024);

    //check if both modal opening buttons were rendered
    expect(
      screen.getAllByRole("button", { name: /open (wishlist|cart)/i })
    ).toHaveLength(2);
  });

  test("Renders count above wishlist icon when a product is wishlisted", async () => {
    const { store } = renderHeader(1024);

    // Check to see that wishlist item count is not visible
    expect(
      screen.queryByRole("paragraph", { name: /wishlist item count/i })
    ).toBeNull();

    // Add item to wishlist
    await waitFor(() => {
      store.dispatch(addItemToWishlist(defaultProduct));
    });

    // Check for wishlist item count
    expect(
      await screen.findByRole("paragraph", { name: /wishlist item count/i })
    ).toHaveTextContent(1);
  });

  test("Removes count above wishlist if we remove the item from wishlist", async () => {
    const { store } = renderHeader(1024);
    // Check to see that wishlist item count is not visible
    expect(
      screen.queryByRole("paragraph", { name: /wishlist item count/i })
    ).toBeNull();

    // Add item to wishlist
    await waitFor(() => {
      store.dispatch(addItemToWishlist(defaultProduct));
    });

    // Check for wishlist item count
    expect(
      await screen.findByRole("paragraph", { name: /wishlist item count/i })
    ).toHaveTextContent(1);

    // Remove item from wishlist
    await waitFor(() => {
      store.dispatch(removeItemFromWishlist(defaultProduct));
    });

    // Check to see that wishlist item count is not visible
    expect(
      screen.queryByRole("paragraph", { name: /wishlist item count/i })
    ).toBeNull();
  });

  test("Renders count above cart icon when a product is added to cart", async () => {
    const { store } = renderHeader(1024);

    // Check to see that wishlist item count is not visible
    expect(
      screen.queryByRole("paragraph", { name: /wishlist item count/i })
    ).toBeNull();

    // Add item to wishlist
    await waitFor(() => {
      store.dispatch(addItemToWishlist(defaultProduct));
    });

    // Check for wishlist item count
    expect(
      await screen.findByRole("paragraph", { name: /wishlist item count/i })
    ).toHaveTextContent(1);
  });

  test("Renders count correctly above cart icon when a product is added again to cart", async () => {
    const { store } = renderHeader(1024);

    // Check to see that wishlist item count is not visible
    expect(
      screen.queryByRole("paragraph", { name: /wishlist item count/i })
    ).toBeNull();

    // Add item to wishlist
    await waitFor(() => {
      store.dispatch(addItemToWishlist(defaultProduct));
      store.dispatch(addItemToWishlist(defaultProduct));
      store.dispatch(addItemToWishlist(defaultProduct));
    });

    // Check for wishlist item count
    expect(
      await screen.findByRole("paragraph", { name: /wishlist item count/i })
    ).toHaveTextContent(3);
  });

  test("Removes count above cart if we remove the item from cart", async () => {
    const { store } = renderHeader(1024);

    // Check to see that cart item count is not visible
    expect(
      screen.queryByRole("paragraph", { name: /cart item count/i })
    ).toBeNull();

    // Add item to cart
    await waitFor(() => {
      store.dispatch(addItemToCart(defaultProduct));
    });

    // Check for cart item count
    expect(
      await screen.findByRole("paragraph", { name: /cart item count/i })
    ).toHaveTextContent(1);

    // Remove item from cart
    await waitFor(() => {
      store.dispatch(removeItemFromCart(defaultProduct));
    });

    // Check to see that cart item count is not visible
    expect(
      screen.queryByRole("paragraph", { name: /cart item count/i })
    ).toBeNull();
  });

  test("Removes count above cart if we remove all items from cart", async () => {
    const { store } = renderHeader(1024);

    // Check to see that cart item count is not visible
    expect(
      screen.queryByRole("paragraph", { name: /cart item count/i })
    ).toBeNull();

    // Add item to cart
    await waitFor(() => {
      store.dispatch(addItemToCart(defaultProduct));
      store.dispatch(addItemToCart(defaultProduct));
      store.dispatch(addItemToCart(defaultProduct));
    });

    // Check for cart item count
    expect(
      await screen.findByRole("paragraph", { name: /cart item count/i })
    ).toHaveTextContent(3);

    // Remove item from cart
    await waitFor(() => {
      store.dispatch(removeAllFromCart());
    });

    // Check to see that cart item count is not visible
    expect(
      screen.queryByRole("paragraph", { name: /cart item count/i })
    ).toBeNull();
  });
});
