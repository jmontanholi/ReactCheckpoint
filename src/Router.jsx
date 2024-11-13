import { createBrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import ProductsPage from "./pages/products/Products.tsx";
import HomePage from "./pages/home/Home.tsx";
import ErrorPage from "./pages/error/Error.tsx";
import { QueryClient } from "@tanstack/react-query";

import { loader as productsLoader } from "./pages/products/Products.tsx";

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/products",
        loader: productsLoader(queryClient),
        element: <ProductsPage />,
      },
    ],
  },
]);

export default router;
