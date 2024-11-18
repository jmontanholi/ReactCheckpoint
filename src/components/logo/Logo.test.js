import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/testUtils";
import Logo from "./Logo";

const renderLogo = () => {
  const preloadedState = {
    cart: { products: [] },
  };

  return renderWithProviders(<Logo />, {
    preloadedState,
  });
};

describe("Logo", () => {
  test("Renders correctly", () => {
    renderLogo();

    expect(screen.getByRole("paragraph", { name: /logo/i })).toHaveTextContent(
      /cottage core/i
    );
  });
});
