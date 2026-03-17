import { Link } from "react-router-dom";
import MainBanner from "./main/MainBanner";
const MainPage = () => {
  return (
    <>
      <h1>Main Page</h1>
      <MainBanner />
      <Link to="/products">Products</Link>
    </>
  );
};

export default MainPage;
