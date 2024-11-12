import React from "react";

import style from "./Home.module.scss";
import Logo from "../../components/logo/Logo.tsx";

function HomePage() {
  return (
    <section className={style.home}>
      <div className={style["home__text-container"]}>
        <h1>
          Welcome to <Logo />
        </h1>
        <p>
          We are having a <span>50%</span> sale in most products!
        </p>
        <button>Browse products</button>
      </div>
    </section>
  );
}

export default HomePage;
