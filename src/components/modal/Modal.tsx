// IMPROVED USING GEMINI PRO 1.5
import { ForwardedRef, forwardRef, MouseEvent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/slices/modalSlice";
import { motion } from "framer-motion";
import style from "./Modal.module.scss";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../iconButton/IconButton";
import { RootState } from "../../store/store";

interface ModalPropsInterface {
  children: React.ReactNode;
  modal: string;
  title: string;
}

const Modal = forwardRef(function Modal(
  { children, modal, title }: ModalPropsInterface,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.modal[`${modal}IsOpen`]
  );

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      document.querySelector("body").style.overflow = "hidden";
      dialogRef.current.showModal();
    }
  }, [isOpen]);

  const handleClose = () => {
    document.querySelector("body").style.overflow = "auto";
    dispatch(closeModal());
  };

  const handleClick = (event: MouseEvent) => {
    const target = event.target as Element | null;

    if (target && !target.closest(`.${style["modal__content"]}`)) {
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
            <h2 aria-label="modal title" className={style["modal__title"]}>
              {title}
            </h2>
            <IconButton
              ref={ref}
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
});

export default Modal;
