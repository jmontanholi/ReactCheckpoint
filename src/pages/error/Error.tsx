import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Header from "../../components/header/Header";
import style from "./Error.module.scss";

function ErrorPage() {
  const error = useRouteError();
  let content = <h1>Oops!</h1>;

  if (isRouteErrorResponse(error)) {
    content = (
      <div>
        <h1>Oops!</h1>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    );
  } else {
    content = <h1>{(error as Error)?.message}</h1>;
  }
  return (
    <>
      <Header />
      <section className={style["error-page"]}>{content}</section>
    </>
  );
}

export default ErrorPage;
