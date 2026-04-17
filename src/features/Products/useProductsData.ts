import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useShallow } from "zustand/shallow";

import useproductsStore from "../../store/productsStore";
import { useQuery } from "@tanstack/react-query";
import { productQueries } from "../../services/queries";
import { mainCategories } from "../../services/firebase";
import type { productType } from "./productTypes";
type mainCategoryKey = keyof typeof mainCategories;

const useProductsData = () => {
  // params
  const { productCategory: category, productID: id } = useParams();

  let { productsData, updateProductsData, filters, resetFilters } =
    useproductsStore(
      useShallow((state) => ({
        productsData: state.productsData,
        updateProductsData: state.updateProductsData,
        filters: state.filters,
        resetFilters: state.resetFilters,
      })),
    );
  const hasLocalData = productsData.length > 0;

  // using tanstack query for fetching data over loaderData
  const { data, isLoading } = useQuery(
    category !== undefined
      ? {
          ...productQueries.categoryData(category),
          enabled: !hasLocalData,
        }
      : id !== undefined
        ? { ...productQueries.idData(id), enabled: !hasLocalData }
        : { ...productQueries.allData(), enabled: !hasLocalData },
  );

  // either from local or fetch data
  function getFinalData() {
    let customCategory = category?.toLowerCase() as mainCategoryKey;
    if (!hasLocalData) return data;
    if (
      hasLocalData &&
      customCategory !== undefined &&
      Object.keys(mainCategories).includes(customCategory as string)
    ) {
      return productsData.filter((product) =>
        mainCategories[customCategory].includes(product.category),
      );
    }
    if (
      hasLocalData &&
      customCategory !== undefined &&
      Object.keys(mainCategories).includes(customCategory as string)
    ) {
      return productsData.filter((product) =>
        mainCategories[customCategory].includes(product.category),
      );
    } else if (id !== undefined) {
      return productsData.find((product) => product.id === parseInt(id));
    } else {
      return productsData;
    }
  }

  const finalData = getFinalData();

  useEffect(() => {
    if (data && !hasLocalData && category === undefined) {
      updateProductsData(data);
    }
    if (finalData.length <= 0) {
      setTimeout(() => {
        resetFilters();
      }, 10000);
    }
  }, [data, hasLocalData, finalData]);

  return {
    finalData,
    isLoading,
  };
};

export default useProductsData;
