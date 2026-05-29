import { useState } from "react";
import { Link } from "react-router-dom";

import { motion } from "motion/react";
import { useShallow } from "zustand/react/shallow";
import useCurrencyStore from "../../../store/currencyStore";

import * as Icon from "@phosphor-icons/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import type { productType } from "../productTypes";

const Product = ({ data }: { data: productType }) => {
  // used for skeleton load
  let [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const { currentMultipler, currentCurrencySymbol } = useCurrencyStore(
    useShallow((state) => ({
      currentMultipler: state.currentMultipler,
      currentCurrencySymbol: state.currentCurrencySymbol,
    })),
  );
  return (
    <motion.div
      className="product-card"
      // whileHover={{
      //   scale: [1, 1.1, 1],
      //   rotateZ: [0, -1, 1, 0],
      //   transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      //   transitionEnd: { scale: 1, rotateZ: 0 },
      // }}
      // // Will be used when gesture ends
      // transition={{ type: "spring", stiffness: 300, damping: 20 }}
      animate={isHovering ? "hover" : "rest"}
      variants={{
        rest: {
          scale: 1,
          rotateZ: 0,
          transition: { duration: 0.3 },
        },
        hover: {
          scale: 1.1,
          rotateZ: [-1, 1],
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      <div className="product-image">
        {!isImageLoaded && <Skeleton height="100%" />}
        <Link to={`/product/${data.id}`} className="product-link">
          <img
            src={data.thumbnail}
            alt=""
            onLoad={() => setIsImageLoaded(true)}
            style={{ display: isImageLoaded ? "block" : "none" }}
          />
        </Link>
      </div>
      <div className="product-info">
        <h2 className="product-name">
          <Link to={`/product/${data.id}`} className="product-link">
            {data.title || <Skeleton />}
          </Link>
          <br />
          <span className="product-brand"> {data.brand} </span>
        </h2>
        <p className="product-price">
          {currentCurrencySymbol}{" "}
          {(data.price * currentMultipler).toFixed(2) || <Skeleton />}
        </p>
      </div>
      <div className="btn-wrap">
        <button className="add-cart">
          <Icon.ShoppingCartSimpleIcon />
        </button>
      </div>
    </motion.div>
  );
};

export default Product;
