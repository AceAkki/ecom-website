import { useEffect, useMemo } from "react";
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
  let { filters, resetFilters } = useproductsStore(
    useShallow((state) => ({
      filters: state.filters,
      resetFilters: state.resetFilters,
    })),
  );
  let filteredData = useMemo(() => {
    if (!finalData) return [];
    return finalData.filter((product: productType) => {
      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];

      const matchesRating = product.rating >= filters.rating;
      const matchesStock = filters.inStockOnly
        ? product.availabilityStatus
        : true;
      const matchesBrand =
        filters.brand === product.brand || filters.brand === "All";
      return matchesPrice && matchesRating && matchesStock && matchesBrand;
    });
  }, [finalData, filters]);
  console.log(filteredData);

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
    mainDataArr: (filteredData as any[]) || [], // fallback to empty array
    pageSize: 12,
    enableParams: true,
  });

  useEffect(() => {
    if (finalData && finalData.length === 0 && !isLoading) {
      const timer = setTimeout(() => resetFilters(), 5000);
      return () => clearTimeout(timer);
    }
  }, [finalData, isLoading, resetFilters]);

  // fallback loader is data is not ready or isLoading
  if (isLoading || !finalData)
    return (
      <section className="loader-section">
        <FallBackLoader />
      </section>
    );

  return (
    <section className="products-main-wrapper">
      <>
        <div>
          <ProductsFilter finalData={finalData} />
        </div>
        {filteredData.length <= 0 ? (
          <div className="no-results">
            <p>No products match your filters.</p>
            <button onClick={resetFilters}>Clear All Filters</button>
          </div>
        ) : (
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
                    {/* <Icon.FileIcon size={32} /> */}
                    {pageNum}
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
        )}
      </>
    </section>
  );
};

export default ProductsPage;
