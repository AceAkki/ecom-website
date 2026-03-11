import { useLoaderData } from "react-router-dom";

import Product from "./components/Product";
import usePaginationMain from "../../hooks/usePaginationMain";

const ProductsPage = () => {
  const products = useLoaderData();
  const { pageBtnArr, getCurrentData } = usePaginationMain({
    mainDataArr: products,
    pageSize: 10,
    enableParams: true,
  });

  // let [currentPage, setCurrentPage] = useState<number>(0);
  // let [searchParams, setSearchParams] = useSearchParams();

  // const pagination = new PaginationMain({
  //   mainElemsArray: products,
  //   ItemComponent: Product,
  //   pageState: currentPage,
  //   setPageState: setCurrentPage,
  //   enableSearchParams: true,
  //   searchParams: searchParams,
  //   setSearchParams: setSearchParams,
  // });

  // let [paginatedArray, navigationArray] = pagination.initPagination();

  // return (
  //   <div>
  //     <h1>Products Page</h1>
  //     <div className="products-wrap">{paginatedArray}</div>
  //     <div className="pagination-wrap">{navigationArray}</div>
  //   </div>
  // );

  return (
    <div>
      <h1>Products Page</h1>
      <div className="products-wrap">
        {getCurrentData().map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
      <div className="pagination-wrap">{pageBtnArr}</div>
    </div>
  );
};

export default ProductsPage;
