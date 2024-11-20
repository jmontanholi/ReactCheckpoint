// IMPROVED USING GEMINI PRO 1.5
import { MouseEvent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/slices/modalSlice";
import { motion } from "framer-motion";
import style from "./Modal.module.scss";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../iconButton/IconButton";
import { RootState } from "../../store/store";

const Modal: React.FC<{
  children: React.ReactNode;
  modal: string;
  title: string;
}> = ({ children, modal, title }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null); // Correct type for dialogRef.
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.modal[`${modal}IsOpen`]
  );

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!isOpen && dialogRef.current) {
      dialogRef.current.close(); // Close the dialog when open is false
    }
  }, [isOpen]);

  const handleClose = () => {
    dispatch(closeModal(modal));
  };

  const handleClick = (event: MouseEvent) => {
    const target = event.target as Element | null; // Allow for null

    if (target && !target.closest(`.${style["modal__content"]}`)) {
      // Type guard
      handleClose();
    }
  };

  return (
    <>
      {isOpen && (
        <motion.dialog
          data-testid="generic modal"
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
            <h1 aria-label="modal title" className={style["modal__title"]}>
              {title}
            </h1>
            <IconButton
              ariaLabel="close modal"
              handleClick={handleClose}
              className={style["modal__close"]}
              icon={faClose}
            />
            {children}
          </motion.div>
        </motion.dialog>
      )}
    </>
  );
};

export default Modal;
