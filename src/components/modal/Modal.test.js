import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../utils/testUtils";
import Modal from "./Modal";
import { openModal } from "../../store/slices/modalSlice";

const renderModal = (state, width = 1024) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    value: width,
  });

  const preloadedState = state || {
    modal: {
      wishlistModalIsOpen: false,
      cartModalIsOpen: false,
      testModalIsOpen: false,
    },
  };

  return renderWithProviders(
    <Modal title="test" modal="testModal">
      <p>test modal</p>
    </Modal>,
    {
      preloadedState,
    }
  );
};

const openModalFunction = async (store) => {
  await waitFor(() => store.dispatch(openModal("testModal")));
};

describe("Generic Modal", () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.show = jest.fn();
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

  test("Does not show at page render", () => {
    renderModal();

    expect(screen.queryByTestId(/generic modal/i)).toBeNull();
  });

  test("Renders after user triggers a modal open dispatch action", async () => {
    const { store } = renderModal();

    await openModalFunction(store);

    expect(screen.getByTestId(/generic modal/i)).toBeInTheDocument();
  });

  test("Shows correct title", async () => {
    const { store } = renderModal();

    await openModalFunction(store);

    expect(screen.getByLabelText(/modal title/i)).toHaveTextContent("test");
  });

  test("Closes when user click the close button", async () => {
    const user = userEvent.setup();

    const { store } = renderModal();

    await openModalFunction(store);

    const closeBtn = screen.getByLabelText(/close modal/i);

    await user.click(closeBtn);

    expect(screen.queryByTestId(/generic modal/i)).toBeNull();
  });

  test("Closes when user clicks outside the content of the modal", async () => {
    const user = userEvent.setup();

    const { store } = renderModal();

    await openModalFunction(store);

    const modal = screen.getByTestId(/generic modal/i);
    expect(modal).toBeInTheDocument();

    await user.click(modal);

    expect(screen.queryByTestId(/generic modal/i)).not.toBeInTheDocument();
  });
});
