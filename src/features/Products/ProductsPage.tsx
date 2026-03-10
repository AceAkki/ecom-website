import { useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";

import Product from "./components/Product";
import usePagination from "../../hooks/usePagination";

const ProductsPage = () => {
  const products = useLoaderData();

  let [currentPage, setCurrentPage] = useState<number>(0);
  let [searchParams, setSearchParams] = useSearchParams();

  const pagination = new usePagination({
    mainElemsArray: products,
    ItemComponent: Product,
    pageState: currentPage,
    setPageState: setCurrentPage,
    enableSearchParams: true,
    searchParams: searchParams,
    setSearchParams: setSearchParams,
  });

  let [paginatedArray, navigationArray] = pagination.initPagination();

  return (
    <div>
      <h1>Products Page</h1>
      <div className="products-wrap">{paginatedArray}</div>
      <div className="pagination-wrap">{navigationArray}</div>
    </div>
  );
};

export default ProductsPage;
