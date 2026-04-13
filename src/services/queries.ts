import { queryOptions } from "@tanstack/react-query";
import { fetchProductsData } from "./firebase";

export const productQueries = {
  idData: (id?: string) =>
    queryOptions({
      queryKey: [id],
      queryFn: () => fetchProductsData({ id: id }),
      // During this time, no new network requests will be made
      staleTime: Infinity,
      // How long the data stays in memory after the component unmounts
      gcTime: 10,
    }),
  categoryData: (category?: string) =>
    queryOptions({
      queryKey: ["allProducts", category],
      queryFn: () => fetchProductsData({ category: category }),
      // During this time, no new network requests will be made
      staleTime: Infinity,
      // How long the data stays in memory after the component unmounts
      gcTime: 10 * 60 * 1000,
    }),
};
