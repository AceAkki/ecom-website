import { useParams } from "react-router-dom";
import Product from "./components/Product";
import usePaginationMain from "../../hooks/usePaginationMain";
import { fetchProductsData } from "../../services/firebase";
import { useQuery } from "@tanstack/react-query";
import * as Icon from "@phosphor-icons/react";

import FallBackLoader from "../../components/FallbackLoader";

import "./MainProductsPage.css";

const ProductsPage = () => {
  //const products = useLoaderData();

  // using tanstack query for fetching data over loaderData
  const { productCategory: category, productID: id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["allProducts", category, id],
    queryFn: () => fetchProductsData({ category: category }),
    // During this time, no new network requests will be made
    staleTime: Infinity,
    // How long the data stays in memory after the component unmounts
    gcTime: 10 * 60 * 1000,
  });
  console.log(data);
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
    mainDataArr: data || [], // fallback to empty array
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

  return (
    <section>
      {error ? (
        <p>Error Fetching products data. Try Again Later ! </p>
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
