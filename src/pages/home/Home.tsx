import style from "./Home.module.scss";
import Logo from "../../components/logo/Logo";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className={style.home}>
      <div className={style["home__text-container"]}>
        <p className={style["home__title"]}>
          <span className={style["home__title-text"]}>Welcome to</span>
        </p>
        <Logo />
        <p className={style["home__text"]}>
          Our brand worries about providing the best clothes and experience to
          people that admire and want to be a part of a community centered in
          cottage vibes
        </p>
        <p className={style["home__subtitle"]}>
          We are having a{" "}
          <span className={style["home__subtitle-span"]}>50%</span> sale in most
          products!
        </p>
        <Link to={"/products"} className={style["home__cta"]}>
          Browse products
        </Link>
      </div>
    </section>
  );
}

export default HomePage;
