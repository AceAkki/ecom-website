import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { useQuery } from "@tanstack/react-query";

import useproductsStore from "../../store/productsStore";
import { productQueries } from "../../services/queries";
import { mainCategories } from "../../services/firebase";
type mainCategoryKey = keyof typeof mainCategories;

const useProductsData = () => {
  // params
  const { productCategory: category, productID: id } = useParams();

  let { productsData, updateProductsData } = useproductsStore(
    useShallow((state) => ({
      productsData: state.productsData,
      updateProductsData: state.updateProductsData,
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
  }, [data, hasLocalData]);

  return {
    finalData,
    isLoading,
  };
};

export default useProductsData;
