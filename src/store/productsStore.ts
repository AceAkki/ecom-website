import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { productType } from "../features/products/productTypes";

interface productsStore {
  productsData: productType[];
  updateProductsData: (data: productType[]) => void;
  filters: FilterState;
  updateFilters: (newFilters: Partial<FilterState>) => void;
  resetFilters: () => void;
}

interface FilterState {
  priceRange: [number, number];
  rating: number;
  brand: string;
  inStockOnly: boolean;
}

const initialFilters: FilterState = {
  priceRange: [0, 1000],
  rating: 1,
  brand: "All",
  inStockOnly: true,
};

const useproductsStore = create<productsStore>()(
  persist(
    (set) => ({
      productsData: [],
      updateProductsData: (data) =>
        set(() => ({
          productsData: data,
        })),
      filters: initialFilters,
      updateFilters: (newFilters) =>
        set((state) => ({ filters: { ...state.filters, ...newFilters } })),
      resetFilters: () => set({ filters: initialFilters }),
    }),
    {
      name: "products-data",
    },
  ),
);

export default useproductsStore;
