import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import MainFrame from "./components/MainFrame";
import MainPage from "./features/MainPage";
import AboutPage from "./features/AboutPage";
import ProductsPage from "./features/Products/ProductsPage";
import { fetchProductsData } from "./services/firebase";
import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainFrame />}>
      <Route index element={<MainPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route
        path="products"
        element={<ProductsPage />}
        loader={async () => {
          let products = await fetchProductsData();
          return products;
        }}
      />
    </Route>,
  ),
);

export default function App() {
  return <RouterProvider router={router} />;
}
