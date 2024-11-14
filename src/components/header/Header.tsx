import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faCartShopping,
  faClose,
  faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";

import style from "./Header.module.scss";
import Logo from "../logo/Logo";
import { RootState } from "../../store/store";
import { openModal } from "../../store/slices/modalSlice";
import WishlistModal from "../wishlistModal/WishlistModal";

const links = [
  {
    content: "Home",
    path: "/",
  },
  {
    content: "Products",
    path: "Products",
  },
];

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.products
  );
  const dispatch = useDispatch();

  const handleBarClick = () => {
    setShowMenu((prev) => !prev);
  };

  const handleClose = () => {
    setShowMenu(false);
  };

  const handleOpenModal = (modal: string) => {
    dispatch(openModal(modal));
    handleClose();
  };

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`${style.header} ${showMenu && style["header--opened-menu"]}`}
    >
      {/* Show Menu button if we are in a widht of less than 1024 */}
      {width < 1024 && (
        <button
          className={style["header__menu-btn"]}
          onClick={handleBarClick}
          aria-label="menu button"
        >
          <FontAwesomeIcon
            className={`${style["header__icon"]}`}
            icon={showMenu ? faClose : faBars}
          />
        </button>
      )}

      {/* Logo component */}
      <Logo className={style["header__logo"]} />

      {/* Show menu items if the showMenu flag is true or if we are in desktop, then it should be shown by default */}
      {(showMenu || width > 1024) && (
        <>
          {links.map((link, index) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={handleClose}
              className={({ isActive }) =>
                `${style["header__link"]} ${
                  style["header__link-" + (index + 1)]
                } ${isActive ? `${style["header__link--active"]}` : ""}`
              }
            >
              {link.content}
            </NavLink>
          ))}

          <button
            aria-label="open wishlist"
            onClick={() => {
              handleOpenModal("wishlistModal");
            }}
            className={`${style["header__icon"]} ${style["header__icon-1"]}`}
          >
            <FontAwesomeIcon icon={false ? regularHeart : solidHeart} />
            <span>{wishlistItems.length}</span>
          </button>

          <button
            className={`${style["header__icon"]} ${style["header__icon-2"]}`}
          >
            <FontAwesomeIcon aria-label="open cart" icon={faCartShopping} />
            <span>{0}</span>
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
