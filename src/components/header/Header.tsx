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

import { motion } from "framer-motion";
import IconButton from "../iconButton/IconButton";

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
  const dispatch = useDispatch();

  // State for opening and closing menu on mobile
  const [showMenu, setShowMenu] = useState(false);

  // State for checking if we should render menu button on mobile or expanded menu on desktop
  const [width, setWidth] = useState(window.innerWidth);

  const wishlistItemsCount = useSelector(
    (state: RootState) => state.wishlist.products.length
  );

  const cartItemsCount = useSelector((state: RootState) =>
    state.cart.products.reduce(
      (accumulator, current) => accumulator + current.quantity,
      0
    )
  );

  // Open and close menu on mobile
  const handleToggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  /**
   *
   * @param modal string representing which modal to open with the dispatch
   * Function for dispatching action to open a modal dynamically and then closing the menu
   */
  const handleOpenModal = (modal: string) => {
    dispatch(openModal(modal));

    // Only handleToggleMenu if we are in mobile and have an expandable menu
    width < 1024 && handleToggleMenu();
  };

  useEffect(() => {
    // Check for width size for help on rendering correct content
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
        <IconButton
          ariaLabel="open menu"
          handleClick={handleToggleMenu}
          icon={showMenu ? faClose : faBars}
          className={`${style["header__icon"]} ${style["header__menu-btn"]}`}
        />
      )}

      {/* Logo component */}
      <Logo className={style["header__logo"]} />

      {/* Show menu items if the showMenu flag is true or if we are in desktop, then it should be shown by default */}
      {(showMenu || width >= 1024) && (
        <>
          {links.map((link, index) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={handleToggleMenu}
              className={({ isActive }) =>
                `${style["header__link"]} ${
                  style["header__link-" + (index + 1)]
                } ${isActive ? `${style["header__link--active"]}` : ""}`
              }
            >
              {link.content}
            </NavLink>
          ))}
          <div
            className={`${style["header__icon"]} ${style["header__icon-1"]}`}
          >
            <IconButton
              ariaLabel="open wishlist"
              handleClick={() => {
                handleOpenModal("wishlistModal");
              }}
              icon={false ? regularHeart : solidHeart}
            />
            {wishlistItemsCount > 0 && (
              <motion.p
                aria-label="wishlist item count"
                key={wishlistItemsCount}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1.2 }}
              >
                {wishlistItemsCount}
              </motion.p>
            )}
          </div>
          <div
            className={`${style["header__icon"]} ${style["header__icon-2"]}`}
          >
            <IconButton
              ariaLabel="open cart"
              handleClick={() => {
                handleOpenModal("cartModal");
              }}
              icon={faCartShopping}
            />
            {cartItemsCount > 0 && (
              <motion.p
                aria-label="cart item count"
                key={cartItemsCount}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1.2 }}
              >
                {cartItemsCount}
              </motion.p>
            )}
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
