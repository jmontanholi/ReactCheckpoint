import { screen } from "@testing-library/react";
import {
  defaultProduct,
  renderWithProviders,
  secondDefaultProduct,
} from "../../utils/testUtils";
import ProductsPage from "./Products";
import { useLoaderData } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLoaderData: jest.fn(),
}));

const renderProductsPage = (state) => {
  const preloadedState = state || {
    wishlist: { products: [] },
  };

  useLoaderData.mockReturnValue([
    defaultProduct.product,
    secondDefaultProduct.product,
  ]);

  return renderWithProviders(<ProductsPage />, preloadedState);
};

describe("Products page", () => {
  test("Renders the products correctly", () => {
    renderProductsPage();

    const firstProduct = screen.queryByTestId(
      `${defaultProduct.product.title}-${defaultProduct.product.id}`
    );
    const secondProduct = screen.queryByTestId(
      `${secondDefaultProduct.product.title}-${secondDefaultProduct.product.id}`
    );

    expect(firstProduct).toBeInTheDocument();
    expect(secondProduct).toBeInTheDocument();
  });
});
