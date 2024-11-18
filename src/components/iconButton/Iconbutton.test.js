import { screen, within } from "@testing-library/react";
import { renderWithProviders } from "../../utils/testUtils";
import IconButton from "./IconButton";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import userEvent from "@testing-library/user-event";

const testFunction = jest.fn(() => 1);

const renderIconBtn = (icon, ariaLabel, handleClick = testFunction) => {
  const preloadedState = {
    cart: { products: [] }, // Preload the store with the item
  };

  return renderWithProviders(
    <IconButton handleClick={handleClick} icon={icon} ariaLabel={ariaLabel} />,
    {
      preloadedState,
    }
  );
};

describe("Icon button", () => {
  test("Renders an icon wrapped by a button", () => {
    const ariaLabel = "return one";
    renderIconBtn(faHeart, ariaLabel);

    const button = screen.getByRole("button", { name: ariaLabel });
    const icon = within(button).getByTestId(ariaLabel);

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  test("Calls the passed function when clicked", async () => {
    const user = userEvent.setup();
    const ariaLabel = "return one";

    renderIconBtn(faHeart, ariaLabel);

    const button = screen.getByRole("button", { name: ariaLabel });

    await user.click(button);

    expect(testFunction).toHaveBeenCalled();
  });

  test("Renders the correct icon", async () => {
    const ariaLabel = "return one";

    renderIconBtn(faHeart, ariaLabel);

    expect(screen.getByTestId(ariaLabel)).toHaveClass("fa-heart");
  });
});
