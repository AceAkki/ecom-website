import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import MainFrame from "./components/MainFrame";
import MainPage from "./features/main/MainPage";
import AboutPage from "./features/AboutPage";
import ErrorPage from "./features/ErrorPage";
import ProductsPage from "./features/Products/ProductsPage";

import { fetchProductsData } from "./services/firebase";
import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FallBackLoader from "./components/FallbackLoader";
import NotFoundPage from "./features/NotFound";
// import { useQuery } from "@tanstack/react-query";

// intialize query client
const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainFrame />} errorElement={<ErrorPage />}>
      <Route index element={<MainPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route
        path="products"
        element={<ProductsPage />}
        loader={({ params }) =>
          queryClient.ensureQueryData({
            queryKey: ["allProducts", params.productCategory],
            queryFn: () => fetchProductsData(params.productCategory),
          })
        }
        hydrateFallbackElement={
          <section className="loader-section">
            <FallBackLoader />
          </section>
        }
      >
        <Route path=":productCategory" element={<ProductsPage />} />
      </Route>

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
