import style from "./Products.module.scss";
import { QueryClient, queryOptions } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import ProductCard from "../../components/productCard/ProductCard";

export interface ProductInterface {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
}

export const allProductsQuery = queryOptions({
  queryKey: ["products"],
  queryFn: async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/products`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },
});

export const loader = (queryClient: QueryClient) => async () => {
  const products = await queryClient.ensureQueryData(allProductsQuery);
  return products;
};

function ProductsPage() {
  const products = useLoaderData() as ProductInterface[] | null;

  return (
    <section className={style["products-page"]}>
      {products && (
        <ul className={style["products-page__product-list"]}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default ProductsPage;
