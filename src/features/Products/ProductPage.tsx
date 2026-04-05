import { useLoaderData, useParams } from "react-router-dom";
import { fetchProductsData } from "../../services/firebase";
import { useQuery } from "@tanstack/react-query";

const ProductPage = () => {
  // using tanstack query for fetching data over loaderData
  const { productCategory: category, productID: id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: [category, id],
    queryFn: () => fetchProductsData({ category: category }),
    // During this time, no new network requests will be made
    staleTime: Infinity,
    // How long the data stays in memory after the component unmounts
    gcTime: 10,
  });
  console.log(data, error, isLoading);

  return (
    <section>
      <h1>Product Page</h1>
    </section>
  );
};

export default ProductPage;
