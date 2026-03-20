import { Link } from "react-router-dom";
import MainBanner from "./components/MainBanner";
import CategorySection from "./components/CategorySection";
const MainPage = () => {
  return (
    <>
      <MainBanner />
      <CategorySection />
      <Link to="/products">Products</Link>
    </>
  );
};

export default MainPage;
