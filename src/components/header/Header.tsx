import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faCartShopping,
  faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";

import style from "./Header.module.scss";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className={style.header}>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/products"}>Products</NavLink>
      <p className={`${style["header__logo"]}`}>cottage core</p>
      {/* This is how we should use the icons */}
      <FontAwesomeIcon
        className={`${style["header__icon"]}`}
        icon={false ? regularHeart : solidHeart}
      />
      <FontAwesomeIcon
        className={`${style["header__icon"]}`}
        icon={faCartShopping}
      />
    </header>
  );
}

export default Header;
