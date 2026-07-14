import { queryOptions } from "@tanstack/react-query";
import { fetchProductsData } from "./firebase";

// default url param
export const defaultParam = "allProducts";

// all product queries
export const productQueries = {
  allData: () =>
    queryOptions({
      queryKey: [defaultParam] as string[],
      queryFn: () => fetchProductsData({}),
      staleTime: Infinity,
      gcTime: 10,
    }),
  idData: (id: string) =>
    queryOptions({
      queryKey: [id],
      queryFn: () => fetchProductsData({ id: id }),
      staleTime: Infinity,
      gcTime: 10,
    }),
  categoryData: (category: string) =>
    queryOptions({
      queryKey: [defaultParam, category],
      queryFn: () => fetchProductsData({ category: category }),
      staleTime: Infinity,
      gcTime: 10 * 60 * 1000,
    }),
};
