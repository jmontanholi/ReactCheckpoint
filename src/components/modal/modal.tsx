// IMPROVED USING GEMINI PRO 1.5
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../store/slices/modalSlice";

const Modal: React.FC<{
  children: React.ReactNode;
  open: boolean;
  modal: string;
}> = ({ children, open, modal }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null); // Correct type for dialogRef
  const modalRoot = useRef<HTMLElement | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    modalRoot.current = document.getElementById("modal"); // Get the modal root
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    if (open && dialogRef.current && modalRoot.current) {
      // Check all refs
      dialogRef.current.showModal();
    } else if (!open && dialogRef.current) {
      dialogRef.current.close(); // Close the dialog when open is false
    }
  }, [open]);

  const handleClose = () => {
    dispatch(toggleModal(modal));
  };

  const handleClick = (e) => {
    if (e.target.closest(".dialog-content")) {
      console.log(e.target.closest(".dialog-content"));
    }
  };

  if (!modalRoot.current) {
    return null; // Don't render if the modal root isn't found
  }

  return createPortal(
    <dialog onClick={handleClick} ref={dialogRef} onClose={handleClose}>
      <div className="dialog-content">{children}</div>
    </dialog>,
    modalRoot.current
  );
};

export default Modal;
