import { useLoaderData, useParams } from "react-router-dom";

import Product from "./components/Product";
import usePaginationMain from "../../hooks/usePaginationMain";
import { fetchProductsData } from "../../services/firebase";
import { useQuery } from "@tanstack/react-query";
import * as Icon from "@phosphor-icons/react";

const ProductsPage = () => {
  //const products = useLoaderData();

  // using tanstack query for fetching data over loaderData
  const categoryParam = useParams();
  console.log(categoryParam.productCategory);

  const { data, error } = useQuery({
    queryKey: ["allProducts"],
    queryFn: fetchProductsData,
  });

  console.log(data, error);

  if (error) return;

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
    mainDataArr: data,
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

  return (
    <section>
      <h1>Products Page</h1>
      {error ? (
        <p>Error Fetching products data. Try Again Later </p>
      ) : (
        <>
          <div className="products-wrap">
            {getCurrentData().map((product) => (
              <Product key={product.id} data={product} />
            ))}
          </div>

          <div className="pagination-wrap">
            <button disabled={previousDisabled()} onClick={previousBtn}>
              <Icon.CaretCircleLeftIcon size={32} />
            </button>

            {renderBtns()}

            <button disabled={nextDisabled()} onClick={nextBtn}>
              <Icon.CaretCircleRightIcon size={32} />
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default ProductsPage;
