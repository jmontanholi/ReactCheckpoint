import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faCartShopping,
  faClose,
  faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";

import style from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import Logo from "../logo/Logo.tsx";

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

  const handleBarClick = () => {
    setShowMenu((prev) => !prev);
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
      <div className={`${style["header__logo-container"]}`}>
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

        <Logo />
      </div>

      {(showMenu || width > 1024) && (
        <>
          {links.map((link, index) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `${style["header__link"]} ${
                  style["header__link-" + (index + 1)]
                } ${isActive ? `${style["header__link--active"]}` : ""}`
              }
            >
              {link.content}
            </NavLink>
          ))}

          <FontAwesomeIcon
            aria-label="wishlist button"
            className={`${style["header__icon"]} ${style["header__icon-1"]}`}
            icon={false ? regularHeart : solidHeart}
          />
          <FontAwesomeIcon
            aria-label="cart button"
            className={`${style["header__icon"]} ${style["header__icon-2"]}`}
            icon={faCartShopping}
          />
        </>
      )}
    </header>
  );
}

export default Header;
