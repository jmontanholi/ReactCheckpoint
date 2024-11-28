import { screen, within } from "@testing-library/react";
import HomePage from "./Home";
import { renderWithProviders } from "../../utils/testUtils";

const renderHomePage = () => {
  return renderWithProviders(<HomePage />, {});
};

describe("Home page", () => {
  test("Renders a welcome message", () => {
    renderHomePage();
    expect(screen.getByText(/welcome to/i)).toBeInTheDocument();
  });

  test("Renders a logo", () => {
    renderHomePage();
    expect(screen.getByRole("heading")).toHaveTextContent(/cottage core/i);
  });

  test("Renders a call to action", () => {
    renderHomePage();

    expect(screen.getByRole("link")).toHaveTextContent(/browse products/i);
  });
});
