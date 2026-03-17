import BGImage from "../../assets/banner.png";
const MainBanner = () => {
  return (
    <div className="main-banner-wrap">
      <div className="txt-content">
        <h1>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
      </div>
      <div className="image-wrap">
        <img src={BGImage} alt="" />
      </div>
    </div>
  );
};

export default MainBanner;
