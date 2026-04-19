import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import components
import MainFrame from "./components/MainFrame";

// import pages
import MainPage from "./features/main/MainPage";
import AboutPage from "./features/AboutPage";

import ProductsPage from "./features/products/MainProductsPage";
import ProductPage from "./features/products/product/ProductPage";

import Login, { action as LoginAction } from "./features/user/LoginPage";
import ErrorPage from "./features/ErrorPage";
import NotFoundPage from "./features/NotFound";

// import { useQuery } from "@tanstack/react-query";
// import { fetchProductsData } from "./services/firebase";
// import FallBackLoader from "./components/FallbackLoader";
import "./App.css";

// intialize query client
const queryClient = new QueryClient();

/* 
const queryLoader = (params?: Params) => {
  return queryClient.ensureQueryData({
    queryKey: ["allProducts", params?.productCategory, params?.id],
    queryFn: async () => {
      if (params?.productCategory) {
        return await fetchProductsData({
          category: params?.productCategory,
        });
      }
      if (params?.productID) {
        return await fetchProductsData({
          category: params.productId,
        });
      }
      if (params === undefined) {
        return await fetchProductsData({});
      }
    },
    // During this time, no new network requests will be made
    staleTime: Infinity,
    // How long the data stays in memory after the component unmounts
    gcTime: 10 * 60 * 1000,
  });
};
*/

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainFrame />} errorElement={<ErrorPage />}>
      <Route
        index
        element={<MainPage />}
        /*
        loader={() => queryLoader()} 
        hydrateFallbackElement={
          <section className="loader-section">
            <FallBackLoader />
          </section>
        }
        */
      />
      <Route path="about" element={<AboutPage />} />
      {/*path="products/:productCategory?" path makes it optional allowing all products or just specific category  */}
      <Route
        path="products/:productCategory?"
        element={<ProductsPage />}
        /*
        loader={({ params }) =>
          queryClient.ensureQueryData({
            queryKey: ["allProducts", params.productCategory],
            queryFn: async () =>
              await fetchProductsData({
                category: params.productCategory,
              }),
            // During this time, no new network requests will be made
            staleTime: Infinity,
            // How long the data stays in memory after the component unmounts
            gcTime: 10 * 60 * 1000,
          })
        }
        hydrateFallbackElement={
          <section className="loader-section">
            <FallBackLoader />
          </section>
        }
        */
      >
        {/* <Route path=":productCategory" element={<ProductsPage />} /> */}
      </Route>
      <Route
        path="product/:productID"
        element={<ProductPage />}
        /*
        loader={({ params }) =>
          queryClient.ensureQueryData({
            queryKey: [params.productID],
            queryFn: async () =>
              await fetchProductsData({
                id: params.productID,
              }),
            // During this time, no new network requests will be made
            staleTime: Infinity,
            // How long the data stays in memory after the component unmounts
            gcTime: 10 * 60 * 1000,
          })
        }
        hydrateFallbackElement={
          <section className="loader-section">
            <FallBackLoader />
          </section>
        }
        */
      />
      <Route path="login" element={<Login />} action={() => LoginAction} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
