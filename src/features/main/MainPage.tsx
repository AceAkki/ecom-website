import { Link } from "react-router-dom";
import MainBanner from "./components/MainBanner";
const MainPage = () => {
  return (
    <>
      <MainBanner />
      <Link to="/products">Products</Link>
    </>
  );
};

export default MainPage;
