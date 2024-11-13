import { useRouteError } from "react-router-dom";
import Header from "../../components/header/Header";
import style from "./Error.module.scss";

function ErrorPage() {
  let error = useRouteError();

  console.log(error);
  return (
    <>
      <Header />
      <section className={style["error-page"]}>
        <h1>Error page</h1>
      </section>
    </>
  );
}

export default ErrorPage;
