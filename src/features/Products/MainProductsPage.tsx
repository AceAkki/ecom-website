import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
// components imports start
import Product from "./components/Product";
import ProductsFilter from "./components/ProductsFilter";
import FallBackLoader from "../../components/FallbackLoader";
// components imports end

// custom hooks start
import usePaginationMain from "../../hooks/usePaginationMain";
import useProductsData from "./useProductsData";
import useproductsStore from "../../store/productsStore";
// custom hooks end

import type { productType } from "./productTypes";
import * as Icon from "@phosphor-icons/react";
import "./mainProductsPage.css";

const ProductsPage = () => {
  //const products = useLoaderData();

  const { finalData, isLoading } = useProductsData();
  // let { filters, resetFilters } = useproductsStore(
  //   useShallow((state) => ({
  //     filters: state.filters,
  //     resetFilters: state.resetFilters,
  //   })),
  // );
  // let filteredData = finalData.filter((product: productType) => {
  //   if (
  //     filters.priceRange[0] < product.price &&
  //     filters.priceRange[1] > product.price &&
  //     filters.rating > product.rating &&
  //     filters.inStockOnly
  //   ) {
  //     return product;
  //   }
  //   if (filters.brand === product.brand) {
  //     return product;
  //   }
  // });

  // useEffect(() => {
  //   if (finalData.length <= 0) {
  //     setTimeout(() => {
  //       resetFilters();
  //     }, 10000);
  //   }
  // }, [finalData]);
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
    mainDataArr: (finalData as any[]) || [], // fallback to empty array
    pageSize: 10,
    enableParams: true,
  });

  // fallback loader is data is not ready or isLoading
  if (isLoading || !finalData)
    return (
      <section className="loader-section">
        <FallBackLoader />
      </section>
    );

  return (
    <section className="products-main-wrapper">
      {getCurrentData().length <= 0 ? (
        <p>Failed to load products</p>
      ) : (
        <>
          <div>
            <ProductsFilter />
          </div>
          <div>
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

              {getCurrentBtns().map((pageNum) => {
                return (
                  <button
                    key={pageNum}
                    className={getPageBtnClassName(pageNum)}
                    onClick={() => handlePageBtnClick(pageNum)}
                  >
                    <Icon.FileIcon size={32} /> {pageNum}
                  </button>
                );
              })}

              <button
                disabled={nextDisabled()}
                onClick={nextBtn}
                className="nav-btn"
              >
                <Icon.CaretCircleRightIcon size={32} />
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ProductsPage;
