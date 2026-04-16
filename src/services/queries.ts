import { queryOptions } from "@tanstack/react-query";
import { fetchProductsData } from "./firebase";

export const defaultParam = "allProducts";
export const productQueries = {
  allData: () =>
    queryOptions({
      queryKey: [defaultParam] as string[],
      queryFn: () => fetchProductsData({}),
      // During this time, no new network requests will be made
      staleTime: Infinity,
      // How long the data stays in memory after the component unmounts
      gcTime: 10,
    }),
  idData: (id: string) =>
    queryOptions({
      queryKey: [id],
      queryFn: () => fetchProductsData({ id: id }),
      // During this time, no new network requests will be made
      staleTime: Infinity,
      // How long the data stays in memory after the component unmounts
      gcTime: 10,
    }),
  categoryData: (category: string) =>
    queryOptions({
      queryKey: [defaultParam, category],
      queryFn: () => fetchProductsData({ category: category }),
      // During this time, no new network requests will be made
      staleTime: Infinity,
      // How long the data stays in memory after the component unmounts
      gcTime: 10 * 60 * 1000,
    }),
};
