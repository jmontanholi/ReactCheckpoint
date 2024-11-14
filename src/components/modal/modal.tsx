// IMPROVED USING GEMINI PRO 1.5
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/slices/modalSlice";
import { AnimatePresence, motion } from "motion/react";
import style from "./Modal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

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
    dispatch(closeModal(modal));
  };

  const handleClick = (event) => {
    if (!event.target.closest(`.${style["modal__content"]}`)) {
      handleClose();
    }
  };

  if (!modalRoot.current) {
    return null; // Don't render if the modal root isn't found
  }

  return createPortal(
    <>
      {open && (
        <motion.dialog
          className={style["modal__dialog"]}
          onClick={handleClick}
          ref={dialogRef}
          onClose={handleClose}
          key={modal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={style["modal__content"]}
          >
            <FontAwesomeIcon
              aria-label="close modal"
              role="button"
              onClick={handleClose}
              className={style["modal__close"]}
              icon={faClose}
            />
            {children}
          </motion.div>
        </motion.dialog>
      )}
    </>,
    modalRoot.current
  );
};

export default Modal;
