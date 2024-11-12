import { createBrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import ProductsPage from "./pages/products/Products.tsx";
import HomePage from "./pages/home/Home.tsx";
import ErrorPage from "./pages/error/Error.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
