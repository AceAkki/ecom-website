import { useLoaderData } from "react-router-dom";

import Product from "./components/Product";
import usePaginationMain from "../../hooks/usePaginationMain";

const ProductsPage = () => {
  const products = useLoaderData();
  const {
    getCurrentData,
    getCurrentBtns,
    getPageBtnClassName,
    handlePageBtnClick,
    ArrowBtn,
  } = usePaginationMain({
    mainDataArr: products,
    pageSize: 10,
    enableParams: true,
  });

  const renderBtns = () => {
    return getCurrentBtns().map((pageNum) => {
      return (
        <button
          className={getPageBtnClassName(pageNum)}
          onClick={() => handlePageBtnClick(pageNum)}
        >
          Page {pageNum}
        </button>
      );
    });
  };

  return (
    <div>
      <h1>Products Page</h1>
      <div className="products-wrap">
        {getCurrentData().map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
      <div className="pagination-wrap">
        <ArrowBtn type="Prev" isAdd={false} />
        {renderBtns()}
        <ArrowBtn type="Next" isAdd={true} />
      </div>
    </div>
  );
};

export default ProductsPage;
