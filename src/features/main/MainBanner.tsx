import BGImage from "../../assets/banner.png";
import "./main.css";

const MainBanner = () => {
  return (
    <div className="main-banner-wrap">
      <div className="left-content">
        <div className="txt-content">
          <h1 className="home-title">FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
          <p>
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
        </div>
        <div className="home-page-btn">Shop Now</div>
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
