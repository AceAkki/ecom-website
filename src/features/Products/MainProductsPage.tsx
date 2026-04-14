import { useParams } from "react-router-dom";
import { useShallow } from "zustand/shallow";

import Product from "./components/Product";
import usePaginationMain from "../../hooks/usePaginationMain";
import useproductsStore from "../../store/productsStore";
import { useQuery } from "@tanstack/react-query";
import { productQueries } from "../../services/queries";
import { mainCategories } from "../../services/firebase";
import * as Icon from "@phosphor-icons/react";

import FallBackLoader from "../../components/FallbackLoader";

import "./mainProductsPage.css";
import { useEffect } from "react";

const ProductsPage = () => {
  //const products = useLoaderData();

  // using tanstack query for fetching data over loaderData
  const { productCategory: category } = useParams();
  let { productsData, updateProductsData } = useproductsStore(
    useShallow((state) => ({
      productsData: state.productsData,
      updateProductsData: state.updateProductsData,
    })),
  );
  const hasLocalData = productsData.length > 0;

  const { data, isLoading } = useQuery({
    ...productQueries.categoryData(category),
    enabled: !hasLocalData,
  });

  type mainCategoryKey = keyof typeof mainCategories;

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
    } else if (
      customCategory !== undefined &&
      !Object.keys(mainCategories).includes(customCategory as string)
    ) {
      return productsData.filter(
        (product) => product.category === customCategory,
      );
    } else {
      productsData;
    }
  }

  //const finalData = hasLocalData ? productsData : data;

  const finalData = getFinalData();
  console.log(finalData);

  useEffect(() => {
    if (data && !hasLocalData) {
      updateProductsData(data);
    }
  }, [data, hasLocalData]);

  const {
    getCurrentData,
    getCurrentBtns,
    getPageBtnClassName,
    handlePageBtnClick,
    previousDisabled,
    nextDisabled,
    previousBtn,
    nextBtn,
  } = usePaginationMain({
    mainDataArr: finalData || [], // fallback to empty array
    pageSize: 10,
    enableParams: true,
  });

  const renderBtns = () => {
    return getCurrentBtns().map((pageNum) => {
      return (
        <button
          key={pageNum}
          className={getPageBtnClassName(pageNum)}
          onClick={() => handlePageBtnClick(pageNum)}
        >
          <Icon.FileIcon size={32} /> {pageNum}
        </button>
      );
    });
  };

  // fallback loader is data is not ready or isLoading
  if (isLoading || !data)
    return (
      <section className="loader-section">
        <FallBackLoader />
      </section>
    );
  console.log(getCurrentData().length);

  return (
    <section>
      {getCurrentData().length <= 0 ? (
        <p>Failed to load products</p>
      ) : (
        <>
          <div className="products-wrap">
            {getCurrentData().map((product) => (
              <Product key={product.id} data={product} />
            ))}
          </div>

          <div className="pagination-wrap">
            <button
              disabled={previousDisabled()}
              onClick={previousBtn}
              className="nav-btn"
            >
              <Icon.CaretCircleLeftIcon size={32} />
            </button>

            {renderBtns()}

            <button
              disabled={nextDisabled()}
              onClick={nextBtn}
              className="nav-btn"
            >
              <Icon.CaretCircleRightIcon size={32} />
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default ProductsPage;
