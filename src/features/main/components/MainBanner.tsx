import { Link } from "react-router-dom";
import BGImage from "/src/assets/banner.png";
import "../css/main.css";

const MainBanner = () => {
  return (
    <div className="main-banner-wrap">
      <div className="left-content">
        <div className="txt-content">
          <h1 className="home-title">
            Shop Smarter. <br />
            Live Better.
          </h1>
          <p>
            Discover premium products, unbeatable deals, and fast delivery – all
            in one place.
          </p>
        </div>
        <div className="home-page-btn primary-btn">
          <Link to="/products">Shop Now</Link>
        </div>
        <div className="main-stats">
          <div className="stat-wrap">
            <h5>200+</h5>
            <p>International Brands</p>
          </div>
          <div className="stat-wrap">
            <h5>2000+</h5>
            <p>Hige Quality Products</p>
          </div>
          <div className="stat-wrap">
            <h5>20000+</h5>
            <p>Happy Customers</p>
          </div>
        </div>
      </div>
      <div className="image-wrap">
        <img src={BGImage} alt="" />
      </div>
    </div>
  );
};

export default MainBanner;
