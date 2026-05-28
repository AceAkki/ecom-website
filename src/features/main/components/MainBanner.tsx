import { Link } from "react-router-dom";
import { motion } from "motion/react";

import BGImage from "/src/assets/banner.png";
import "../css/main.css";

const MainBanner = () => {
  return (
    <section className="main-banner-wrap">
      <div className="left-content">
        <div className="txt-content">
          <motion.h1
            className="home-title"
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ amount: 1 }}
          >
            Shop Smarter. <br />
            Live Better !
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ amount: 1 }}
          >
            Discover premium products, unbeatable deals, and fast delivery – all
            in one place.
          </motion.p>
        </div>
        <div className="home-page-btn">
          <Link to="/products">Shop Now</Link>
        </div>
        <motion.div
          className="main-stats"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ amount: 1 }}
        >
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
        </motion.div>
      </div>
      <div className="image-wrap">
        <img src={BGImage} alt="" />
      </div>
    </section>
  );
};

export default MainBanner;
