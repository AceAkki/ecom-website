// components imports start
import Product from "./components/Product";
import ProductsFilter from "./components/ProductsFilter";
import FallBackLoader from "../../components/FallbackLoader";
// components imports end

// custom hooks start
import usePaginationMain from "../../hooks/usePaginationMain";
import useProductsData from "./useProductsData";
// custom hooks end

import * as Icon from "@phosphor-icons/react";
import "./mainProductsPage.css";

const ProductsPage = () => {
  //const products = useLoaderData();

  const { finalData, isLoading } = useProductsData();
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
            <ProductsFilter currentData={finalData} />
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

              {renderBtns()}

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
