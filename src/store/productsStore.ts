import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { productType } from "../features/products/productTypes";

interface productsStore {
  productsData: productType[];
  updateProductsData: (data: productType[]) => void;
  currentData: productType[];
  updateCurrentData: (data: productType[]) => void;
}

const useproductsStore = create<productsStore>()(
  persist(
    (set) => ({
      productsData: [],
      updateProductsData: (data) =>
        set(() => ({
          productsData: data,
        })),
      currentData: [],
      updateCurrentData: (data) =>
        set(() => ({
          currentData: data,
        })),
    }),
    {
      name: "products-data",
    },
  ),
);

export default useproductsStore;
