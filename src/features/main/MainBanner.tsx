import BGImage from "../../assets/banner.png";
import "./main.css";

const MainBanner = () => {
  return (
    <div className="main-banner-wrap">
      <div className="txt-content">
        <h1>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
        <p>
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>
      </div>
      <div className="image-wrap">
        <img src={BGImage} alt="" />
      </div>
    </div>
  );
};

export default MainBanner;
