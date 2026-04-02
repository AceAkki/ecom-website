import { useState } from "react";
import * as Icon from "@phosphor-icons/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Product = ({ data }: { data: any }) => {
  // used for skeleton load
  let [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <div className="product-card">
      <div className="product-image">
        {!isImageLoaded && <Skeleton height="100%" />}
        <img
          src={data?.thumbnail}
          alt=""
          onLoad={() => setIsImageLoaded(true)}
          style={{ display: isImageLoaded ? "block" : "none" }}
        />
      </div>
      <div className="product-info">
        <h2 className="product-name">{data?.title || <Skeleton />}</h2>
        <p className="product-price">{data?.price || <Skeleton />}</p>
      </div>
      <div className="btn-wrap">
        <button className="add-cart">
          <Icon.ShoppingCartSimpleIcon />
        </button>
      </div>
    </div>
  );
};

export default Product;
